import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
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

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
      isActive: false,
    });

    const otp = crypto.randomInt(100000, 999999).toString();
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&otp=${otp}`;

    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    });

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

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response) => {
  const parsed = VerifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new ApiError(400, "Invalid input", formattedErrors);
  }

  const { email, otp } = parsed.data;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otpRecord = await OtpModel.findOne({
    userId: user._id,
    otp,
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  user.isActive = true;
  await user.save();

  await OtpModel.deleteOne({ _id: otpRecord._id });

  const welcomeEmailHtml = generateWelcomeEmailTemplate({
    userName: user.fullName,
    dashboardUrl: process.env.FRONTEND_URL!,
  });

  await sendEmail({
    email: user.email,
    subject: "Welcome to Nexonic!",
    html: welcomeEmailHtml,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, { isActive: true }, "Email verified successfully")
    );
});

export const resendOtp = asyncHandler(
  async (req: Request, res: Response) => {
  const parsed = ResendOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new ApiError(400, "Invalid input", formattedErrors);
  }

  const { email } = parsed.data;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isActive) {
    throw new ApiError(400, "Email is already verified");
  }

  await OtpModel.deleteMany({ userId: user._id });

  const otp = crypto.randomInt(100000, 999999).toString();
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?email=${email}&otp=${otp}`;

  await OtpModel.create({
    userId: user._id,
    otp,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  });

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
      new ApiResponse(200, "Verification code has been resent to your email")
    );
});

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
    console.log("------------------->", process.env.ADMIN_EMAIL);
    console.log("-------------------->", process.env.ADMIN_PASSWORD);

    const userAgent = req.headers["user-agent"] || "Unknown Device";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string) || req.ip || "Unknown IP";

    let device = "Unknown Device";
    if (userAgent.includes("Chrome")) device = "Chrome Browser";
    else if (userAgent.includes("Firefox")) device = "Firefox Browser";
    else if (userAgent.includes("Safari")) device = "Safari Browser";
    else if (userAgent.includes("Edge")) device = "Edge Browser";

    sendNewLoginNotification(
      user.fullName,
      user.email,
      device,
      "Location detection available with IP service",
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

export const logoutUser = asyncHandler(
  async (req: Request, res: Response) => {
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

    await OtpModel.deleteMany({ userId: user._id });

    const otp = crypto.randomInt(100000, 999999).toString();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&otp=${otp}`;

    await OtpModel.create({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    });

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
          `Password reset code sent to your ${email}. Please check your inbox.`
        )
      );
  }
);

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

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const otpRecord = await OtpModel.findOne({
      userId: user._id,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      throw new ApiError(400, "Invalid or expired OTP");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await OtpModel.deleteOne({ _id: otpRecord._id });

    sendPasswordChangedNotification(user.fullName, user.email, sendEmail).catch(
      (err) =>
        console.error("Failed to send password change notification:", err)
    );

    res.status(200).json(
      new ApiResponse(
        200,

        "Password reset successfully. You can now log in with your new password."
      )
    );
  }
);

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

    sendPasswordChangedNotification(user.fullName, user.email, sendEmail).catch(
      (err) =>
        console.error("Failed to send password change notification:", err)
    );

    res.status(200).json(new ApiResponse(200, "Password updated successfully"));
  }
);

export const getMe = asyncHandler(
  async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await UserModel.findById(userId).select(
    "-password -resetPasswordToken -resetPasswordExpires"
  );
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
