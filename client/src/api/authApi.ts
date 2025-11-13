import { axiosInstance } from "./axiosInstance";

export const signupUserApi = async (formData: {
  fullName: String;
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/api/v1/auth/register", formData);
  return data;
};

export const loginUserApi = async (formData: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/api/v1/auth/login", formData);
  return data;
};

export const verifyEmailApi = async ({ otp }: { otp: string }) => {
  const { data } = await axiosInstance.post("/api/v1/auth/verify-email", { otp });
  return data;
};

export const resendOtpApi = async () => {
  const { data } = await axiosInstance.post("/api/v1/auth/resend-otp");
  return data;
};

export const forgotPasswordpApi = async ({email}: { email: String}) => {
  const { data } = await axiosInstance.post("/api/v1/auth/forgot-password", { email });
  return data;
};
