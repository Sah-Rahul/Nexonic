import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendToken } from "../utils/sendToken.js";
import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import { generateEmailTemplate } from "../utils/generateForgotPasswordEmail.js";
import { sendEmail } from "../utils/sendEmail.js";
import cloudinary from "../config/cloudinary.config.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  // Check if user already exists
  const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    return next(new ErrorHandler("User already exists with this email.", 409));
  }

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

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  if (!email) {
    return next(new ErrorHandler("Email is required.", 400));
  }
  if (!frontendUrl) {
    return next(new ErrorHandler("Frontend URL is required.", 400));
  }

  let userResult = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (userResult.rows.length === 0) {
    return next(new ErrorHandler("User not found with this email.", 404));
  }

  const user = userResult.rows[0];

  const { resetToken, hashedToken, resetPasswordExpireTime } =
    generateResetPasswordToken();

  await db.query(
    `UPDATE users SET reset_password_token = $1, reset_password_expire = to_timestamp($2) WHERE email = $3`,
    [hashedToken, resetPasswordExpireTime / 1000, email]
  );

  const resetPasswordUrl = `${frontendUrl}/password/reset/${resetToken}`;
  const message = generateEmailTemplate(resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Nexonic Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    await db.query(
      `UPDATE users SET reset_password_token = NULL, reset_password_expire = NULL WHERE email = $1`,
      [email]
    );
    return next(new ErrorHandler("Email could not be sent.", 500));
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const userResult = await db.query(
    "SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expire > NOW()",
    [resetPasswordToken]
  );

  if (userResult.rows.length === 0) {
    return next(new ErrorHandler("Invalid or expired reset token.", 400));
  }

  const user = userResult.rows[0];
  const { password, confirmPassword } = req.body;

  // Check if both passwords are provided
  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("Both password and confirmPassword are required.", 400)
    );
  }

  // Passwords match check
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  // Length check
  if (
    password.length < 8 ||
    password.length > 16 ||
    confirmPassword.length < 8 ||
    confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await db.query(
    `UPDATE users 
     SET password = $1, reset_password_token = NULL, reset_password_expire = NULL 
     WHERE id = $2 
     RETURNING *`,
    [hashedPassword, user.id]
  );

  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
    user: updatedUser.rows[0],
  });
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.user.id;

  // Validate inputs
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("All password fields are required.", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("New passwords do not match.", 400));
  }

  if (newPassword.length < 8 || newPassword.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  // Fetch user from DB to verify current password
  const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  if (userResult.rows.length === 0) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const user = userResult.rows[0];

  // Check if current password matches
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Current password is incorrect.", 401));
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in DB
  const updatedUserResult = await db.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING id, name, email, role, avatar, created_at",
    [hashedPassword, userId]
  );

  const updatedUser = updatedUserResult.rows[0];

  // Send success response (excluding password)
  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
    user: updatedUser,
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  //  Validate name/email
  if (!name?.trim() || !email?.trim()) {
    return next(new ErrorHandler("Name and email cannot be empty.", 400));
  }

  //  Initialize avatarData object
  let avatarData = {};

  //  Handle avatar update
  if (req.files && req.files.avatar) {
    const { avatar } = req.files;

    // Delete old image from Cloudinary if exists
    if (req.user?.avatar?.public_id) {
      await cloudinary.uploader.destroy(req.user.avatar.public_id);
    }

    // Upload new image
    const newProfileImage = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "Ecommerce_Avatars",
        width: 150,
        crop: "scale",
      }
    );

    // Set new avatar data
    // avatarData = {
    //   public_id: newProfileImage.public_id,
    //   url: newProfileImage.secure_url,
    // };

    avatarData = JSON.stringify({
      public_id: newProfileImage.public_id,
      url: newProfileImage.secure_url,
    });
  }

  //  Update profile (name, email, avatar)
  let userResult;

  if (Object.keys(avatarData).length === 0) {
    userResult = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, userId]
    );
  } else {
    userResult = await db.query(
      "UPDATE users SET name = $1, email = $2, avatar = $3 WHERE id = $4 RETURNING *",
      [name, email, avatarData, userId]
    );
  }

  // 6. Send response
  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user: userResult.rows[0],
  });
});
