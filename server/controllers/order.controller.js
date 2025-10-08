import database from "../config/db.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { generatePaymentIntent } from "../utils/generatePaymentIntent.js";

export const placeNewOrder = catchAsyncError(async (req, res, next) => {
  const {
    full_name,
    state,
    city,
    country,
    address,
    pincode,
    phone,
    orderedItems,
  } = req.body;

  // Validate inputs
  if (
    !full_name ||
    !state ||
    !city ||
    !country ||
    !address ||
    !pincode ||
    !phone ||
    !orderedItems ||
    orderedItems.length === 0
  ) {
    return next(
      new ErrorHandler(
        "Please provide complete shipping and product details",
        400
      )
    );
  }

  const items = Array.isArray(orderedItems)
    ? orderedItems
    : JSON.parse(orderedItems);

  if (!items || items.length === 0) {
    return next(new ErrorHandler("No items in cart", 400));
  }

  const productIds = items.map((item) => item.product.id);

  const { rows: products } = await database.query(
    `SELECT id, price, stock, name FROM products WHERE id = ANY($1::uuid[])`,
    [productIds]
  );

  let total_price = 0;
  const tax_rate = 0.05;
  const shipping_price = 2;

  const values = [];
  const placeholders = [];

  items.forEach((item, index) => {
    const product = products.find((p) => p.id === item.product.id);

    if (!product) {
      throw new ErrorHandler(
        `Product not found for ID: ${item.product.id}`,
        400
      );
    }

    if (item.quantity > product.stock) {
      throw new ErrorHandler(
        `Only ${product.stock} units available for ${product.name}`,
        400
      );
    }

    const itemTotal = product.price * item.quantity;
    total_price += itemTotal;

    const offset = index * 6;

    values.push(
      null,
      product.id,
      item.quantity,
      product.price,
      item.product.images[0]?.url || "",
      product.name
    );

    placeholders.push(
      `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${
        offset + 5
      }, $${offset + 6})`
    );
  });

  // Calculate total with tax and shipping
  const taxAmount = total_price * tax_rate;
  const grandTotal = total_price + taxAmount + shipping_price;

  // Convert to cents for Stripe
  const amountInCents = Math.round(grandTotal * 100);

  if (amountInCents > 99999999) {
    return next(
      new ErrorHandler(
        "Total amount exceeds Stripe's maximum limit of $999,999.99",
        400
      )
    );
  }

  const orderResult = await database.query(
    `
    INSERT INTO orders (buyer_id, total_price, tax_price, shipping_price)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [req.user.id, grandTotal, tax_rate, shipping_price]
  );

  const orderId = orderResult.rows[0].id;

  // Update order ID in values
  for (let i = 0; i < values.length; i += 6) {
    values[i] = orderId;
  }

  // Insert order items
  await database.query(
    `
    INSERT INTO order_items (order_id, product_id, quantity, price, image, title)
    VALUES ${placeholders.join(", ")}
    RETURNING *
    `,
    values
  );

  // Insert shipping info
  await database.query(
    `
    INSERT INTO shipping_info (order_id, full_name, state, city, country, address, pincode, phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
    [orderId, full_name, state, city, country, address, pincode, phone]
  );

  // Call Stripe Payment Intent
  const paymentResponse = await generatePaymentIntent(orderId, amountInCents);

  if (!paymentResponse.success) {
    return next(new ErrorHandler("Payment failed. Try again.", 500));
  }

  // Final response
  res.status(200).json({
    success: true,
    message: "Order placed successfully. Please proceed to payment.",
    paymentIntent: paymentResponse.clientSecret,
    total_price: grandTotal,
  });
});

export const fetchSingleOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.id;

  // Validate orderId
  if (!orderId) {
    return next(new ErrorHandler("Order ID is required", 400));
  }

  const query = `
    SELECT
      o.*,
      COALESCE(
        json_agg(
          json_build_object(
            'order_item_id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL), '[]'
      ) AS order_items,
      json_build_object(
        'full_name', s.full_name,
        'state', s.state,
        'city', s.city,
        'country', s.country,
        'address', s.address,
        'pincode', s.pincode,
        'phone', s.phone
      ) AS shipping_info
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN shipping_info s ON o.id = s.order_id
    WHERE o.id = $1
    GROUP BY o.id, s.id;
  `;

  const { rows } = await database.query(query, [orderId]);

  if (rows.length === 0) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order: rows[0],
  });
});

export const fetchMyOrders = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      o.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'order_item_id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'image', oi.image,
            'title', oi.title
          )
        ) FILTER (WHERE oi.id IS NOT NULL), '[]'
      ) AS order_items,
      json_build_object(
        'full_name', s.full_name,
        'state', s.state,
        'city', s.city,
        'country', s.country,
        'address', s.address,
        'pincode', s.pincode,
        'phone', s.phone
      ) AS shipping_info
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN shipping_info s ON o.id = s.order_id
    WHERE o.buyer_id = $1
    GROUP BY o.id, s.id
    ORDER BY o.created_at DESC;
  `;

  const { rows } = await database.query(query, [userId]);

  res.status(200).json({
    success: true,
    orders: rows,
  });
});

export const fetchAllOrders = catchAsyncError(async (req, res, next) => {
  const query = `
    SELECT 
      o.*,
      COALESCE(
        json_agg(
          json_build_object(
            'order_item_id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'image', oi.image,
            'title', oi.title
          )
        ) FILTER (WHERE oi.id IS NOT NULL), '[]'
      ) AS order_items,
      json_build_object(
        'full_name', s.full_name,
        'state', s.state,
        'city', s.city,
        'country', s.country,
        'address', s.address,
        'pincode', s.pincode,
        'phone', s.phone
      ) AS shipping_info
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN shipping_info s ON o.id = s.order_id
    GROUP BY o.id, s.id
    ORDER BY o.created_at DESC;
  `;

  const { rows } = await database.query(query);

  res.status(200).json({
    success: true,
    orders: rows,
  });
});

export const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // Basic validation
  if (!status) {
    return next(new ErrorHandler("Status is required", 400));
  }

  // Optional: validate allowed statuses
  const allowedStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  if (!allowedStatuses.includes(status)) {
    return next(new ErrorHandler("Invalid order status", 400));
  }

  // Update query
  const updateQuery = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`;
  const { rows } = await database.query(updateQuery, [status, id]);

  if (rows.length === 0) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order: rows[0],
  });
});


export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const { rows } = await database.query(query, [id]);

  if (rows.length === 0) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user: rows[0],
  });
});
