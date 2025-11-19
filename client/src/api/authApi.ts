import { axiosInstance } from "./axiosInstance";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

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

export const verifyEmailApi = async (
  { otp }: { otp: string }) => {
  const { data } = await axiosInstance.post("/api/v1/auth/verify-email", {
    otp,
  });
  return data;
};

export const resendOtpApi = async () => {
  const { data } = await axiosInstance.post("/api/v1/auth/resend-otp");
  return data;
};

export const forgotPasswordpApi = async (
  { email }: { email: String }) => {
  const { data } = await axiosInstance.post("/api/v1/auth/forgot-password", {
    email,
  });
  return data;
};

export const getTotalUsers = async () => {
  const { data } = await axiosInstance.get("/api/v1/auth/users");
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/api/v1/auth/me");
  return data;
};

export const changePassword = async (
  passwordData: PasswordData) => {
  const { data } = await axiosInstance.post(
    "/api/v1/auth/change-password",
    passwordData
  );
  return data;
};

export const updateProfile = async (
  formData: FormData) => {
  const { data } = await axiosInstance.put(
    "/api/v1/auth/update-profile",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};
