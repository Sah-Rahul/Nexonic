import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUserApi } from "../api/authApi";
import toast from "react-hot-toast";
import { UserSignupZodSchema } from "../zodValidation/AuthZodSchema";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: String;
    email?: string;
    password?: string;
  }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: signupUserApi,
    onSuccess: (data) => {
      console.log("API response:", data);

      toast.success(data.message || "Signup successful!");

      navigate("/verify-email");
    },
    onError: (err: any) => {
      toast.error(
        `Signup failed: ${err?.response?.data?.message || err.message}`
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const result = UserSignupZodSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: {
        fullName?: String;
        email?: string;
        password?: string;
      } = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as "fullName" | "email" | "password"] =
          err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="relative">
              <div className="relative mx-auto w-72 h-72 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-ping opacity-75"></div>
                <div className="absolute inset-4 rounded-full border-4 border-orange-400 animate-pulse"></div>
                <div className="relative z-10 text-white text-center">
                  <User className="w-24 h-24 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold">Join Us</h3>
                </div>
              </div>
              <div
                className="absolute top-1/4 left-0 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
              </div>
              <div
                className="absolute bottom-1/3 right-0 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Start Shopping Today
              </h2>
              <p className="text-gray-600">Create your account in seconds</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-orange-600 mb-2">
                Sign Up
              </h2>
              <p className="text-gray-500">
                Create your account to get started
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full cursor-pointer bg-orange-500 mt-8 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold
    ${
      mutation.isPending
        ? "opacity-70 cursor-not-allowed"
        : "hover:bg-orange-600"
    }
  `}
            >
              {mutation.isPending ? " Sign in..." : "Sign up"}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
