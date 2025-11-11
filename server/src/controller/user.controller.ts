import { Request, Response } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import UserModel from "../models/user.model";
import {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  SignupSchema,
  UpdateProfileZodSchema,
  UserLoginZodSchema,
  VerifyOtpSchema,
  ResendOtpSchema,
} from "../zodSchema/UserZodSchema";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";
import { sendToken } from "../utils/SendToken";
import { AuthRequest } from "../types/Auth.interface";
import { uploadToCloudinary } from "../config/cloudinary.config";
import { generateWelcomeEmailTemplate } from "../emailTemplates/welcomeEmail";
import { GeneratePasswordResetEmail } from "../emailTemplates/passwordReset";
import { GenerateVerifyEmailTemplate } from "../emailTemplates/verifyEmail";
import {
  sendPasswordChangedNotification,
  sendNewLoginNotification,
  sendProfileUpdatedNotification,
} from "../emailTemplates/accountNotification";
import { sendEmail } from "../emailTemplates/SendEmail";
import { OtpModel } from "../models/OtpModel";
import crypto from "crypto";

// ============================================
// REGISTER USER
// ============================================
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = SignupSchema.safeParse(req.body);

    if (!parsed.success) {
      const zodError: ZodError = parsed.error;
      const formattedErrors = zodError.issues.map((issue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      });
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { fullName, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
      isActive: false, // Set to false until email is verified
    });

    // Generate OTP for email verification
    const otp = crypto.randomInt(100000, 999999).toString();
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&otp=${otp}`;

    // Save OTP to database
    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    });

    // Send verification email
    const verificationEmailHtml = GenerateVerifyEmailTemplate({
      userName: user.fullName,
      verificationUrl,
      verificationCode: otp,
    });

    await sendEmail({
      email: user.email,
      subject: "Verify Your Email - Nexonic",
      html: verificationEmailHtml,
    });

    // Send token (but user won't have full access until verified)
    sendToken({
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      statusCode: 201,
      res,
      message: "User registered successfully. Please verify your email.",
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
        "User registered successfully. Please check your email to verify your account."
      )
    );
  }
);

// ============================================
// VERIFY EMAIL WITH OTP
// ============================================
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const parsed = VerifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new ApiError(400, "Invalid input", formattedErrors);
  }

  const { email, otp } = parsed.data;

  // Find user
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Find valid OTP
  const otpRecord = await OtpModel.findOne({
    userId: user._id,
    otp,
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Activate user account
  user.isActive = true;
  await user.save();

  // Delete used OTP
  await OtpModel.deleteOne({ _id: otpRecord._id });

  // Send welcome email
  const welcomeEmailHtml = generateWelcomeEmailTemplate({
    userName: user.fullName,
    dashboardUrl: process.env.FRONTEND_URL!,
  });

  await sendEmail({
    email: user.email,
    subject: "Welcome to Nexonic! 🎉",
    html: welcomeEmailHtml,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, { isActive: true }, "Email verified successfully")
    );
});

// ============================================
// RESEND OTP
// ============================================
export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const parsed = ResendOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new ApiError(400, "Invalid input", formattedErrors);
  }

  const { email } = parsed.data;

  // Find user
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if user is already verified
  if (user.isActive) {
    throw new ApiError(400, "Email is already verified");
  }

  // Delete any existing OTPs for this user
  await OtpModel.deleteMany({ userId: user._id });

  // Generate new OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&otp=${otp}`;

  // Save new OTP
  await OtpModel.create({
    userId: user._id,
    otp,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  });

  // Resend verification email
  const verificationEmailHtml = GenerateVerifyEmailTemplate({
    userName: user.fullName,
    verificationUrl,
    verificationCode: otp,
  });

  await sendEmail({
    email: user.email,
    subject: "Verify Your Email - Nexonic",
    html: verificationEmailHtml,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Verification code has been resent to your email"
      )
    );
});

// ============================================
// LOGIN USER
// ============================================
export const loginUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = UserLoginZodSchema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }

    // Check if email is verified
    if (!user.isActive) {
      throw new ApiError(
        403,
        "Please verify your email before logging in. Check your inbox for the verification code."
      );
    }

    const isAdmin = email === process.env.ADMIN_EMAIL;

    let passwordValid = false;
    if (isAdmin) {
      passwordValid = password === process.env.ADMIN_PASSWORD;
    } else {
      passwordValid = await bcrypt.compare(password, user.password);
    }

    if (!passwordValid) {
      throw new ApiError(400, "Invalid email or password");
    }

    // Get device and location info (you can enhance this with a proper IP geolocation service)
    const userAgent = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string) || req.ip || "Unknown IP";

    // Extract basic device info from user agent
    let device = "Unknown Device";
    if (userAgent.includes("Chrome")) device = "Chrome Browser";
    else if (userAgent.includes("Firefox")) device = "Firefox Browser";
    else if (userAgent.includes("Safari")) device = "Safari Browser";
    else if (userAgent.includes("Edge")) device = "Edge Browser";

    // Send new login notification (async, don't wait)
    sendNewLoginNotification(
      user.fullName,
      user.email,
      device,
      "Location detection available with IP service", // You can integrate MaxMind or similar
      ipAddress,
      sendEmail
    ).catch((err) => console.error("Failed to send login notification:", err));

    return sendToken({
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: isAdmin ? "admin" : user.role,
        profile: user.profile,
      },
      statusCode: 200,
      res,
      message: isAdmin ? "Welcome Admin" : `Welcome back ${user.fullName}`,
    });
  }
);

// ============================================
// LOGOUT USER
// ============================================
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ============================================
// UPDATE PROFILE
// ============================================
export const updateProfile = asyncHandler(
  async (req: AuthRequest & { file?: Express.Multer.File }, res: Response) => {
    const parsed = UpdateProfileZodSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new ApiError(400, "Invalid input", errors);
    }

    const { fullName, bio } = parsed.data;
    const userId = req.user?.id;
    if (!userId) throw new ApiError(401, "Unauthorized");

    let avatarUrl: string | undefined;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      avatarUrl = result.secure_url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        ...(avatarUrl && { profile: avatarUrl }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) throw new ApiError(404, "User not found");

    // Send profile updated notification (async)
    sendProfileUpdatedNotification(
      updatedUser.fullName,
      updatedUser.email,
      sendEmail
    ).catch((err) =>
      console.error("Failed to send profile update notification:", err)
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  }
);

// ============================================
// FORGOT PASSWORD
// ============================================
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = ForgotPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new ApiError(400, "Invalid input", formattedErrors);
    }
    const { email } = parsed.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User with this email does not exist");
    }

    // Delete any existing OTPs for password reset
    await OtpModel.deleteMany({ userId: user._id });

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&otp=${otp}`;

    // Save OTP
    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    });

    // Send password reset email
    const emailHtml = GeneratePasswordResetEmail({
      userName: user.fullName,
      resetUrl: resetPasswordUrl,
      resetCode: otp,
      expiryMinutes: 30,
    });

    await sendEmail({
      email: user.email,
      subject: "Reset Your Nexonic Password",
      html: emailHtml,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Password reset code sent to your email. Please check your inbox."
        )
      );
  }
);

// ============================================
// RESET PASSWORD (with OTP)
// ============================================
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = VerifyOtpSchema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { email, otp, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long");
    }

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Find valid OTP
    const otpRecord = await OtpModel.findOne({
      userId: user._id,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      throw new ApiError(400, "Invalid or expired OTP");
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete used OTP
    await OtpModel.deleteOne({ _id: otpRecord._id });

    // Send password changed notification
    sendPasswordChangedNotification(user.fullName, user.email, sendEmail).catch(
      (err) =>
        console.error("Failed to send password change notification:", err)
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Password reset successfully. You can now log in with your new password."
        )
      );
  }
);

// ============================================
// CHANGE PASSWORD (for logged-in users)
// ============================================
export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = ChangePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { currentPassword, newPassword } = parsed.data;

    const user = await UserModel.findById(req?.user?.id);
    if (!user) throw new ApiError(404, "User not found");

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      throw new ApiError(400, "Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Send password changed notification
    sendPasswordChangedNotification(user.fullName, user.email, sendEmail).catch(
      (err) =>
        console.error("Failed to send password change notification:", err)
    );

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password updated successfully"));
  }
);

// ============================================
// GET CURRENT USER
// ============================================
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await UserModel.findById(userId).select(
    "-password -resetPasswordToken -resetPasswordExpires"
  );
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
