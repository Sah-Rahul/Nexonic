import cloudinary from "../config/cloudinary.config.js";
import db from "../config/db.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";

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
