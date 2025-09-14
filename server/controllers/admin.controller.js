import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import cloudinary from "../config/cloudinary.config.js";
import db from "../config/db.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;

  const totalUsersResult = await db.query(
    "SELECT COUNT(*) FROM users WHERE role = $1",
    ["User"]
  );

  const totalUsers = parseInt(totalUsersResult.rows[0].count);

  const offset = (page - 1) * 10;

  const usersResult = await db.query(
    "SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
    ["User", 10, offset]
  );

  res.status(200).json({
    success: true,
    totalUsers,
    currentPage: page,
    users: usersResult.rows,
  });
});

export const dashboardStats = catchAsyncError(async (req, res, next) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split("T")[0];

  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  const previousMonthStart = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  // Total Revenue (All Time)
  const totalRevenueAllTimeQuery = await db.query(`
    SELECT SUM(total_price) FROM orders
  `);
  const totalRevenueAllTime =
    parseFloat(totalRevenueAllTimeQuery.rows[0].sum) || 0;

  // Total Users
  const totalUsersCountQuery = await db.query(`
    SELECT COUNT(*) FROM users WHERE role = 'User'
  `);
  const totalUsersCount = parseInt(totalUsersCountQuery.rows[0].count) || 0;

  // Order Status Counts
  const orderStatusCountsQuery = await db.query(`
  SELECT order_status, COUNT(*) FROM orders GROUP BY order_status
`);

  const orderStatusCounts = {
    pending: 0,
    shipping: 0,
    canceled: 0,
    delivered: 0,
  };

  orderStatusCountsQuery.rows.forEach((row) => {
    const status = row.order_status.toLowerCase();
    if (orderStatusCounts.hasOwnProperty(status)) {
      orderStatusCounts[status] = parseInt(row.count);
    }
  });

  // Today's Revenue
  const todayRevenueQuery = await db.query(
    `
    SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = $1
  `,
    [todayDate]
  );
  const todayRevenue = parseFloat(todayRevenueQuery.rows[0].sum) || 0;

  // Yesterday's Revenue
  const yesterdayRevenueQuery = await db.query(
    `
    SELECT SUM(total_price) FROM orders WHERE DATE(created_at) = $1
  `,
    [yesterdayDate]
  );
  const yesterdayRevenue = parseFloat(yesterdayRevenueQuery.rows[0].sum) || 0;

  // Top Selling Products (Yesterday)
  const topProductsQuery = await db.query(
    `
    SELECT 
      oi.product_id, 
      p.name AS product_name, 
      SUM(oi.quantity) AS total_sold 
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    JOIN orders o ON o.id = oi.order_id
    WHERE DATE(o.created_at) = $1
    GROUP BY oi.product_id, p.name
    ORDER BY total_sold DESC
    LIMIT 5
  `,
    [yesterdayDate]
  );
  const topProducts = topProductsQuery.rows;

  // Total Sales of Current Month
  const currentMonthSalesQuery = await db.query(
    `
    SELECT SUM(total_price) AS total
    FROM orders
    WHERE created_at BETWEEN $1 AND $2
  `,
    [currentMonthStart, currentMonthEnd]
  );
  const currentMonthSales =
    parseFloat(currentMonthSalesQuery.rows[0].total) || 0;

  // Revenue of Last Month
  const lastMonthRevenueQuery = await db.query(
    `
    SELECT SUM(total_price) AS total
    FROM orders
    WHERE created_at BETWEEN $1 AND $2
  `,
    [previousMonthStart, previousMonthEnd]
  );
  const lastMonthRevenue = parseFloat(lastMonthRevenueQuery.rows[0].total) || 0;

  // Revenue Growth Percentage
  let revenueGrowth = "0%";
  if (lastMonthRevenue > 0) {
    const growthRate =
      ((currentMonthSales - lastMonthRevenue) / lastMonthRevenue) * 100;
    revenueGrowth = `${growthRate >= 0 ? "+" : ""}${growthRate.toFixed(2)}%`;
  }

  // Monthly Sales (for Line Chart)
  const monthlySalesQuery = await db.query(`
    SELECT
      TO_CHAR(created_at, 'Mon YYYY') AS month,
      DATE_TRUNC('month', created_at) as date,
      SUM(total_price) as totalSales
    FROM orders
    GROUP BY month, date
    ORDER BY date ASC
  `);
  const monthlySales = monthlySalesQuery.rows.map((row) => ({
    month: row.month,
    totalSales: parseFloat(row.totalSales) || 0,
  }));

  // Low Stock Products
  const lowStockProductsQuery = await db.query(`
    SELECT name, stock FROM products WHERE stock <= 5
  `);
  const lowStockProducts = lowStockProductsQuery.rows;

  // New Users This Month
  const newUsersThisMonthQuery = await db.query(
    `
    SELECT COUNT(*) FROM users WHERE created_at >= $1 AND role = 'User'
  `,
    [currentMonthStart]
  );
  const newUsersThisMonth = parseInt(newUsersThisMonthQuery.rows[0].count) || 0;

  // FINAL RESPONSE
  res.status(200).json({
    success: true,
    message: "Dashboard Stats Fetched Successfully",
    totalRevenueAllTime,
    totalUsersCount,
    orderStatusCounts,
    todayRevenue,
    yesterdayRevenue,
    currentMonthSales,
    lastMonthRevenue,
    revenueGrowth,
    monthlySales,
    topProducts,
    lowStockProducts,
    newUsersThisMonth,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const deleteUser = await db.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  if (deleteUser.rows.length === 0) {
    return next(new ErrorHandler("User not found", 404));
  }

  const avatar = deleteUser.rows[0].avatar;

  if (avatar?.public_id) {
    await cloudinary.uploader.destroy(avatar.public_id);
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
