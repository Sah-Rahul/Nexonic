import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import { ErrorHandler } from "./errorMiddleware.js";
import db from "../config/db.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.headers?.authorization?.split(" ")[1] ||
    req.body?.token;

  // Token missing
  if (!token) {
    return next(new ErrorHandler("Unauthorized: Token is required", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get user from DB
    const userResult = await db.query(`SELECT * FROM users WHERE id = $1`, [
      decoded.id,
    ]);

    if (userResult.rows.length === 0) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = userResult.rows[0];

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Access denied. Role '${
            req.user?.role || "Unknown"
          }' is not authorized.`,
          403
        )
      );
    }
    next();
  };
};
