import cloudinary from "../config/cloudinary.config.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import db from "../config/db.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const created_by = req.user.id;

  //   Validation
  if (!name || !description || !price || !category || !stock) {
    return next(
      new ErrorHandler("Please provide complete product details.", 400)
    );
  }

  //   Handle Image Uploads
  let uploadedImages = [];

  if (req.files && req.files.images) {
    const images = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Ecommerce_Product_Images",
        width: 1000,
        crop: "scale",
      });

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  //   Save product to DB
  const product = await db.query(
    `INSERT INTO products 
     (name, description, price, category, stock, images, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      name,
      description,
      price,
      category,
      stock,
      JSON.stringify(uploadedImages),
      created_by,
    ]
  );

  //   Send Response
  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    product: product.rows[0],
  });
});

export const fetchAllProducts = catchAsyncError(async (req, res, next) => {
  const { availability, price, category, ratings, search } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];
  let index = 1;

  let paginationPlaceholders = {};

  // Filter by availability
  if (availability === "in-stock") {
    conditions.push(`stock > 5`);
  } else if (availability === "limited") {
    conditions.push(`stock > 0 AND stock <= 5`);
  } else if (availability === "out-of-stock") {
    conditions.push(`stock = 0`);
  }

  // Filter by price
  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    if (minPrice && maxPrice) {
      conditions.push(`price BETWEEN $${index} AND $${index + 1}`);
      values.push(minPrice, maxPrice);
      index += 2;
    }
  }

  // Filter by category
  if (category) {
    conditions.push(`category ILIKE $${index}`);
    values.push(`%${category}%`);
    index++;
  }

  // Filter by rating
  if (ratings) {
    conditions.push(`ratings >= $${index}`);
    values.push(ratings);
    index++;
  }

  // Search by name/description
  if (search) {
    conditions.push(
      `(p.name ILIKE $${index} OR p.description ILIKE $${index})`
    );
    values.push(`%${search}%`);
    index++;
  }

  // Final WHERE clause
  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Total count for pagination
  const totalProductsResult = await db.query(
    `SELECT COUNT(*) FROM products p ${whereClause}`,
    values
  );

  const totalProducts = parseInt(totalProductsResult.rows[0].count);

  // Add pagination
  paginationPlaceholders.limit = `$${index}`;
  values.push(limit);
  index++;

  paginationPlaceholders.offset = `$${index}`;
  values.push(offset);
  index++;

  // Final query with reviews
  const query = `
    SELECT p.*, 
           COUNT(r.id) AS review_count 
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    ${whereClause}
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT ${paginationPlaceholders.limit}
    OFFSET ${paginationPlaceholders.offset}
  `;

  const result = await db.query(query, values);

  // Top Rated Products (>= 4.5)
  const topRatedQuery = `
    SELECT p.*, 
           COUNT(r.id) AS review_count 
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE p.ratings >= 4.5
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT 8
  `;

  const topRatedResult = await db.query(topRatedQuery);

  res.status(200).json({
    success: true,
    products: result.rows,
    totalProducts,
    topRatedProducts: topRatedResult.rows,
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return next(
      new ErrorHandler("Please provide complete product details.", 400)
    );
  }

  const result = await db.query(
    `UPDATE products
     SET name = $1,
         description = $2,
         price = $3,
         category = $4,
         stock = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [name, description, price, category, stock, productId]
  );

  if (result.rows.length === 0) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product: result.rows[0],
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  const result = await db.query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [productId]
  );

  if (result.rows.length === 0) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});

export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const result = await db.query(
    `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.category,
      p.ratings,
      p.images,
      p.stock,
      p.created_by,
      p.created_at,
      p.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'review_id', r.id,
            'rating', r.rating,
            'comment', r.comment,
            'reviewer', json_build_object(
              'id', u.id,
              'name', u.name,
              'avatar', u.avatar
            )
          )
        ) FILTER (WHERE r.id IS NOT NULL), '[]'
      ) AS reviews
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    LEFT JOIN users u ON r.user_id = u.id
    WHERE p.id = $1
    GROUP BY 
      p.id, p.name, p.description, p.price, p.category, p.ratings,
      p.images, p.stock, p.created_by, p.created_at, p.updated_at
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product: result.rows[0],
  });
});

export const postProductReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return next(new ErrorHandler("Please provide rating and comment.", 400));
  }

  //  Verify if the user has purchased this product
  const purchaseCheckQuery = `
    SELECT oi.product_id
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    JOIN payments p ON p.order_id = o.id
    WHERE o.buyer_id = $1
    AND oi.product_id = $2
    AND p.payment_status = 'Paid'
    LIMIT 1
  `;

  const { rows: purchaseRows } = await db.query(purchaseCheckQuery, [
    req.user.id,
    id,
  ]);

  if (purchaseRows.length === 0) {
    return res.status(403).json({
      success: false,
      message: "You can only review a product you've purchased.",
    });
  }

  //  Check if the product exists
  const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);

  if (product.rows.length === 0) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  //  Check if the user already reviewed this product
  const existingReview = await db.query(
    `SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2`,
    [id, req.user.id]
  );

  let review;
  if (existingReview.rows.length > 0) {
    //  Update existing review
    review = await db.query(
      `UPDATE reviews 
       SET rating = $1, comment = $2, updated_at = NOW()
       WHERE product_id = $3 AND user_id = $4
       RETURNING *`,
      [rating, comment, id, req.user.id]
    );
  } else {
    //  Insert new review
    review = await db.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [id, req.user.id, rating, comment]
    );
  }

  //  Recalculate and update average rating for the product
  const allReviews = await db.query(
    `SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = $1`,
    [id]
  );

  const newAvgRating = parseFloat(allReviews.rows[0].avg_rating).toFixed(2);

  await db.query(`UPDATE products SET ratings = $1 WHERE id = $2 RETURNING *`, [
    newAvgRating,
    id,
  ]);

  //  Send response
  res.status(200).json({
    success: true,
    message: "Review submitted successfully.",
    review: review.rows[0],
  });
});

export const deleteReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  //  Check if review exists
  const reviewQuery = await db.query(`SELECT * FROM reviews WHERE id = $1`, [
    id,
  ]);

  if (reviewQuery.rows.length === 0) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  const review = reviewQuery.rows[0];
  const productId = review.product_id;

  //  Delete the review
  await db.query(`DELETE FROM reviews WHERE id = $1`, [id]);

  //  Recalculate average rating for the product
  const allReviews = await db.query(
    `SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = $1`,
    [productId]
  );

  const newAvgRating = allReviews.rows[0].avg_rating
    ? parseFloat(allReviews.rows[0].avg_rating).toFixed(2)
    : 0.0;

  //  Update the product with new rating
  await db.query(`UPDATE products SET ratings = $1 WHERE id = $2`, [
    newAvgRating,
    productId,
  ]);

  //  Send response
  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
});