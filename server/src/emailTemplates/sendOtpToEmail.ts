import crypto from "crypto";
import { OtpModel } from "../models/OtpModel";
import { sendEmail } from "../emailTemplates/SendEmail";

export const sendOtpToEmail = async (userId: string, email: string) => {
  const otp = crypto.randomInt(100000, 999999).toString();

  await OtpModel.create({
    userId,
    otp,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
  });

  const html = `
    <h2>Email Verification</h2>
    <p>Your OTP for verification is <b>${otp}</b></p>
    <p>This OTP will expire in <b>15 minutes</b>.</p>
  `;

  await sendEmail({
    email,
    subject: "Verify Your Email - Nexonic",
    html,
  });
};
