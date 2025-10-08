import React, { useState } from "react";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../store/slices/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(forgotPassword(email));
      setIsSubmitted(true);
    } catch (err) {
      console.error("Reset link error", err);
      setError("Failed to send reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleBackToLogin = () => {
  //     console.log("Navigating back to login...");
  //     // Ideally use: navigate('/login') if using React Router
  //   };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="max-w-md w-full p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 space-y-6">
          <div className="flex flex-col items-center">
            <FiCheckCircle className="w-12 h-12 text-teal-400 mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white text-center">
              Success!
            </h2>
            <p className="text-sm text-slate-400 text-center">
              We've sent a reset link to{" "}
              <span className="text-teal-400 font-medium">{email}</span>. Please
              check your inbox.
            </p>
          </div>
          {/* <button
            onClick={handleBackToLogin}
            className="w-full py-3 rounded-xl font-semibold bg-teal-400 text-slate-900 hover:bg-teal-300 transition"
          >
            ← Back to Login
          </button> */}
        </div>
      </div>
    );
  }

  // ✅ Form State
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="max-w-md w-full p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="p-3 bg-teal-500/20 rounded-full mb-4">
            <FiLock className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-sm text-slate-400 text-center">
            Enter your email to receive a secure link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-slate-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-slate-700 bg-slate-700 text-white rounded-xl placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 cursor-pointer rounded-xl font-semibold transition flex justify-center items-center ${
              isLoading
                ? "bg-teal-600 opacity-75 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-400 text-slate-900"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-slate-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="text-center">
          {/* <button
            onClick={handleBackToLogin}
            className="text-sm text-slate-500 hover:text-teal-400"
          >
            ← Back to Login
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
