import { z } from "zod";

export const AddressZodSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(10),
  street: z.string().min(6, "Street is required"),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(4),
  country: z.string().min(6),
  isDefault: z.boolean().optional(),
});

export const SignupSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

export type SignupType = z.infer<typeof SignupSchema>;

export const UserLoginZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserLoginType = z.infer<typeof UserLoginZodSchema>;

export const UpdateProfileZodSchema = z.object({
  fullName: z.string().min(4).optional(),
  profile: z.string().url().optional(),
  bio: z.string().max(160).optional(),
});

export type UpdateProfileType = z.infer<typeof UpdateProfileZodSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Valid email required"),
});
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export const VerifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const ResendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});
