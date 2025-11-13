import React, { useState } from "react";
import { Mail, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi, resendOtpApi } from "@/api/authApi";

interface VerifyEmailProps {
  email?: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyMutation = useMutation({
    mutationFn: (data: { otp: string }) => verifyEmailApi(data),
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully!");
      navigate("/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "OTP verification failed.");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtpApi,
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.message || "OTP sent successfully!");
      setOtp("");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to resend OTP.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }
    verifyMutation.mutate({ otp });
  };

  const handleResend = () => {
    resendMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="relative">
              <div className="absolute top-0 left-1/4 animate-bounce">
                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="relative mx-auto w-72 h-72 bg-linear-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 rounded-full border-4 border-teal-300 animate-ping opacity-75"></div>
                <div className="absolute inset-4 rounded-full border-4 border-white/30 animate-pulse"></div>

                <div className="relative z-10 text-white text-center">
                  <ShieldCheck className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold">Verify Email</h3>
                  <p className="text-sm mt-2 opacity-90">Secure & Fast</p>
                </div>
              </div>

              <div
                className="absolute top-1/4 right-0 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
              </div>

              <div
                className="absolute bottom-1/4 right-1/4 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-16 h-16 bg-linear-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Email Verification
              </h2>
              <p className="text-gray-600">Keep your account secure with OTP</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-8">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <h2 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-500">
                We've sent a 6-digit code to your email
              </p>
              <p className="text-teal-600 font-semibold mt-1">
                check your inbox
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Enter 6-Digit OTP
              </label>
              <div className="flex justify-center scale-125">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={
                    verifyMutation.isPending || resendMutation.isPending
                  }
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="w-10 h-10 text-xl font-bold"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-10 h-10 text-xl font-bold"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-10 h-10 text-xl font-bold"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="w-10 h-10 text-xl font-bold"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-10 h-10 text-xl font-bold"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-10 h-10 text-xl font-bold"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="mb-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendMutation.isPending}
                className="text-teal-600 cursor-pointer hover:text-teal-700 font-semibold text-sm underline disabled:opacity-50"
              >
                {resendMutation.isPending ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            <button
              type="submit"
              disabled={verifyMutation.isPending || otp.length !== 6}
              className={`w-full bg-linear-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                ${
                  verifyMutation.isPending || otp.length !== 6
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-teal-600 hover:to-blue-600"
                }
              `}
            >
              {verifyMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="text-xs text-gray-600 text-center">
                This code will expire in 10 minutes for security reasons
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
