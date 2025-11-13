import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordpApi } from "@/api/authApi";
import toast from "react-hot-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (email: string) => forgotPasswordpApi({ email }),
    onSuccess: (data) => {
      console.log(data)
      toast.success(data.message || "Reset link sent in your email !");
      setIsSubmitted(true);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to send reset link.");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    mutation.mutate(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // ✅ Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative">
                <div className="absolute top-0 left-1/4 animate-bounce">
                  <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="relative mx-auto w-72 h-72 bg-linear-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-75"></div>
                  <div className="absolute inset-4 rounded-full border-4 border-white/30 animate-pulse"></div>

                  <div className="relative z-10 text-white text-center">
                    <Mail className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold">Email Sent!</h3>
                    <p className="text-sm mt-2 opacity-90">Check Your Inbox</p>
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
                  <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <h2 className="text-3xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Success!
                </h2>
                <p className="text-gray-600">Reset link sent successfully</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  Check Your Email
                </h2>

                <p className="text-gray-600 mb-2">
                  We've sent a password reset link to:
                </p>
                <p className="text-teal-600 font-semibold text-lg mb-6">
                  {email}
                </p>

                <div className="w-full p-4 bg-teal-50 rounded-xl border border-teal-100 mb-6">
                  <p className="text-sm text-gray-600">
                    📧 Click the link in the email to reset your password. The
                    link will expire in 10 minutes.
                  </p>
                </div>

                <div className="space-y-3 w-full">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email?
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-teal-600 cursor-pointer hover:text-teal-700 font-semibold text-sm underline"
                  >
                    Try another email
                  </button>
                </div>

                <Link
                  to="/login"
                  className="mt-6 inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Form Screen
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="relative">
              <div className="absolute top-0 left-1/4 animate-bounce">
                <div className="w-20 h-20 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="relative mx-auto w-72 h-72 bg-linear-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping opacity-75"></div>
                <div className="absolute inset-4 rounded-full border-4 border-white/30 animate-pulse"></div>

                <div className="relative z-10 text-white text-center">
                  <ShieldCheck className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold">Reset Password</h3>
                  <p className="text-sm mt-2 opacity-90">Secure Recovery</p>
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
                <Zap className="w-10 h-10 text-orange-400" />
              </div>
            </div>

            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600">
                No worries, we'll help you reset it
              </p>
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
                to="/login"
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </Link>
              <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Reset Password
              </h2>
              <p className="text-gray-500">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={mutation.isPending}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className={`w-full bg-linear-to-r cursor-pointer from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                  ${
                    mutation.isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-purple-600 hover:to-pink-600"
                  }
                `}
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-xs text-gray-600 text-center">
                The reset link will be valid for 10 minutes
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
