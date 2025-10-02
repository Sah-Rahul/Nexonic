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
import { Link } from "react-router-dom";
import { signupSchema } from "../validation/signupSchema";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.log("✅ Signup Data:", formData);
    alert("Signup Successful!");
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
      <div className="w-full max-w-6xl flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
        {/* Right Side - Illustration */}
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

        {/* Left Side - Signup Form */}
        <div className="flex-1 w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-orange-600 mb-2">Sign Up</h2>
              <p className="text-gray-500">
                Create your account to get started
              </p>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${errors.name ? 'text-red-500' : 'text-gray-400'} transition-colors`} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.name}</p>
                )}
              </div>

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
                    className={`w-full pl-11 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300`}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300`}
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

              <button
                type="submit"
                className="w-full cursor-pointer bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;