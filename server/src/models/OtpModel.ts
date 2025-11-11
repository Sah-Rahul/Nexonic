import mongoose, { Schema, Document } from "mongoose";

export interface OtpInterface extends Document {
  userId: mongoose.Types.ObjectId;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<OtpInterface>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 900, // 15 min  
  },
});

export const OtpModel = mongoose.model<OtpInterface>("Otp", otpSchema);
