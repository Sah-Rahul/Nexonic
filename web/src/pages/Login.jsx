import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { loginSchema } from "../validation/loginSchema";
 
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log("✅ Login Data:", formData);
    alert("Login Successful!");
  };

  // Handle input change and clear specific field error
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this specific field when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Side - Illustration/Animation */}
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Animated Shopping Illustration */}
            <div className="relative">
              {/* Floating Shopping Bag */}
              <div className="absolute top-0 left-1/4 animate-bounce">
                <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Main Circle with Animation */}
              <div className="relative mx-auto w-72 h-72 bg-teal-500 rounded-full flex items-center justify-center">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-4 border-teal-300 animate-ping opacity-75"></div>
                <div className="absolute inset-4 rounded-full border-4 border-teal-400 animate-pulse"></div>

                {/* Center Icon */}
                <div className="relative z-10 text-white text-center">
                  <Lock className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold">Secure Login</h3>
                </div>
              </div>

              {/* Floating Sparkles */}
              <div
                className="absolute top-1/4 right-0 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </div>

              {/* Floating Zap */}
              <div
                className="absolute bottom-1/4 right-1/4 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                <Zap className="w-10 h-10 text-orange-400" />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to Nexonic
              </h2>
              <p className="text-gray-600">
                Your favorite shopping destination
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300"
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-teal-600 mb-2">Login</h2>
              <p className="text-gray-500">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-gray-400'} transition-colors`} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${errors.password ? 'text-red-500' : 'text-gray-400'} transition-colors`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-teal-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login Now
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;