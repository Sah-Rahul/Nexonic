import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

interface UserPayload {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface SendTokenOptions {
  user: UserPayload;
  statusCode: number;
  res: Response;
  message?: string;
}

export const sendToken = ({
  user,
  statusCode,
  res,
  message = "Logged in successfully",
}: SendTokenOptions): void => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error("JWT_SECRET_KEY is missing");

  const payload = { id: user.id };

  const options: SignOptions = {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || "5d",
  };

  const token = jwt.sign(payload, secret, options);

  const cookieExpiresInDays = Number(process.env.COOKIES_EXPIRES_IN) || 7;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      expires: new Date(Date.now() + cookieExpiresInDays * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
