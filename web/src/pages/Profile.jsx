import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, logout } from "../store/slices/authSlice";
import { Edit, Camera, Mail, User, Image, Save, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    avatar: authUser?.avatar || "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    if (formData.avatar) updatedData.append("avatar", formData.avatar);
    if (formData.password) updatedData.append("password", formData.password);

    dispatch(updateProfile(updatedData));
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full transform hover:scale-105 transition-all duration-300">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <User className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h3>
          <p className="text-red-500 mb-6">Please login to see your profile.</p>
          <Link to={"/"}>
            <button className="px-6 py-3 cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
              <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Side - Avatar Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                {/* Avatar with Animation */}
                <div className="relative group mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping opacity-50"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-purple-400 animate-pulse"></div>

                    {/* Avatar Image */}

                    <img
                      src={
                        formData.avatar ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="Profile"
                      className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto object-cover"
                    />

                    {/* Camera Icon Overlay */}
                    <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              avatar: e.target.files[0],
                            })
                          }
                        />
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {authUser.name}
                  </h3>
                  <p className="text-sm text-gray-500">{authUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 py-2 cursor-pointer px-5 bg-red-500"
              >
                Logout
              </button>
            </div>

            {/* Right Side - Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <Edit className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Profile
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Section */}
                  <div>
                    <label className="block text-sm font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdatingProfile}
                      className="flex-1 flex items-center gap-2 justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
      </div>
    </Layout>
  );
};

export default Profile;
