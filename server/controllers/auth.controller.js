import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password || password.trim().length < 6) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  // Check if user already exists
  const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    return next(new ErrorHandler("User already exists with this email.", 409));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  const result = await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, avatar, reset_password_token, reset_password_expire, created_at`,
    [name, email, hashedPassword]
  );

  const user = result.rows[0];

  // Send token with clean user object
  sendToken(user, 201, res, "User registered successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //   Validate input
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }

  if (password.trim().length < 6) {
    return next(
      new ErrorHandler("Password must be at least 6 characters.", 400)
    );
  }

  //   Find user by email
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const user = result.rows[0];

  //   Compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  //   Send token with user
  sendToken(user, 200, res, "User logged in successfully");
});

export const getMe = catchAsyncError(async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),  
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
