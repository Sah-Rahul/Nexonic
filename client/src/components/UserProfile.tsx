import { useState } from "react";
import {
  User,
  Mail,
  ShoppingCart,
  Heart,
  Edit2,
  Save,
  X,
  Camera,
  Package,
  LogOut,
  Settings,
  MapPin,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Star,
  Clock,
  CreditCard,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Layout from "./Layout";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.cart);
  console.log(user);
  const [userData, setUserData] = useState({
    fullName: "Rahul Sah",
    email: "rahul@nexonic.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Founder & CEO at Nexonic | Building the future of e-commerce | Tech enthusiast passionate about innovation and user experience",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RahulSah",
    role: "admin",
    joinedDate: "January 2024",
    membershipTier: "Platinum",
  });

  const [tempUserData, setTempUserData] = useState(userData);

  const stats = [
    {
      icon: Package,
      label: "Total Orders",
      value: "142",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: "28",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
    },
    {
      icon: ShoppingCart,
      label: "Cart Items",
      value: "8",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
    },
    {
      icon: Award,
      label: "Rewards",
      value: "2,450",
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      product: "Wireless Headphones Pro",
      date: "Mar 15, 2024",
      status: "Delivered",
      amount: 12999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
    },
    {
      id: "ORD-2024-002",
      product: "Smart Watch Ultra",
      date: "Mar 10, 2024",
      status: "In Transit",
      amount: 24999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    },
    {
      id: "ORD-2024-003",
      product: "Laptop Stand Premium",
      date: "Mar 5, 2024",
      status: "Processing",
      amount: 3499,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100",
    },
  ];

  const cartItems = [
    {
      id: 1,
      name: "Gaming Mouse RGB",
      price: 3499,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 8999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200",
      rating: 4.8,
    },
    {
      id: 3,
      name: '4K Monitor 27"',
      price: 24999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200",
      rating: 4.9,
    },
  ];

  const wishlistItems = [
    {
      id: 4,
      name: "USB-C Hub Pro",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200",
      rating: 4.6,
      discount: 15,
    },
    {
      id: 5,
      name: "Wireless Charger",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1591290619762-c588f5b6a5cf?w=200",
      rating: 4.4,
      discount: 20,
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200",
      rating: 4.7,
      discount: 10,
    },
    {
      id: 7,
      name: "Phone Case Premium",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200",
      rating: 4.3,
      discount: 25,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    {
      id: "orders",
      label: "Orders",
      icon: Package,
      badge: recentOrders.length,
    },
    { id: "cart", label: "Cart", icon: ShoppingCart, badge: cartItems.length },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistItems.length,
    },
  ];

  const totalCartValue = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-5xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  My Account
                </h1>
                <p className="text-slate-300 text-lg">
                  Welcome back, {userData.fullName}! 👋
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      className={`w-6 h-6 bg-linear-to-br ${stat.color} bg-clip-text text-transparent`}
                      style={{
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                      }}
                    />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl sticky top-6">
                <div className="text-center mb-6 relative">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                      <img
                        src={userData.avatar}
                        alt={userData.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-linear-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white/30">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold text-white mt-4">
                    {userData.fullName}
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    {userData.email}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-400 to-yellow-500 shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">
                      {userData.membershipTier} Member
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="text-sm text-white truncate">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm text-white">{userData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="text-sm text-white">{userData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400">Member Since</p>
                      <p className="text-sm text-white">
                        {userData.joinedDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/60 transition-all hover:scale-105">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-white font-medium">
                      Settings
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/60 transition-all hover:scale-105">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-white font-medium">
                      Analytics
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="flex border-b border-white/20 bg-white/5 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-[120px] py-4 px-4 font-semibold transition-all relative ${
                          activeTab === tab.id
                            ? "text-cyan-400 bg-white/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Icon className="w-5 h-5" />
                          <span className="hidden sm:inline">{tab.label}</span>
                          {(tab.badge ?? 0) > 0 && (
                            <span className="bg-linear-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                              {tab.badge}
                            </span>
                          )}
                        </div>
                        {activeTab === tab.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">
                          Profile Overview
                        </h3>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setUserData(tempUserData);
                                setIsEditing(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setTempUserData(userData);
                                setIsEditing(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempUserData.fullName}
                              onChange={(e) =>
                                setTempUserData({
                                  ...tempUserData,
                                  fullName: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                              {userData.fullName}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Email
                          </label>
                          <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                            {userData.email}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempUserData.phone}
                              onChange={(e) =>
                                setTempUserData({
                                  ...tempUserData,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                              {userData.phone}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Location
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempUserData.location}
                              onChange={(e) =>
                                setTempUserData({
                                  ...tempUserData,
                                  location: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                              {userData.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Bio
                        </label>
                        {isEditing ? (
                          <textarea
                            value={tempUserData.bio}
                            onChange={(e) =>
                              setTempUserData({
                                ...tempUserData,
                                bio: e.target.value,
                              })
                            }
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all resize-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-white/5 rounded-xl text-white border border-white/10">
                            {userData.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "orders" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">
                        Recent Orders
                      </h3>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all"
                          >
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-white mb-1">
                                    {order.product}
                                  </h4>
                                  <p className="text-sm text-slate-400">
                                    Order #{order.id}
                                  </p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    order.status === "Delivered"
                                      ? "bg-green-500/20 text-green-400"
                                      : order.status === "In Transit"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-cyan-400 font-bold">
                                  Rs{order.amount.toLocaleString()}
                                </p>
                                <p className="text-sm text-slate-400 flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {order.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "cart" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">
                          Shopping Cart
                        </h3>
                        <span className="text-slate-400">
                          {cartItems.length} items
                        </span>
                      </div>

                      <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-white mb-1">
                                    {item.name}
                                  </h4>
                                  <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm text-slate-300">
                                      {item.rating}
                                    </span>
                                  </div>
                                </div>
                                <button className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-cyan-400 font-bold text-lg">
                                  ₹{item.price.toLocaleString()}
                                </p>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-1">
                                  <button className="text-white hover:text-cyan-400">
                                    -
                                  </button>
                                  <span className="text-white font-medium">
                                    {item.quantity}
                                  </span>
                                  <button className="text-white hover:text-cyan-400">
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-400/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-semibold text-lg">
                            Subtotal
                          </span>
                          <span className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Rs{totalCartValue.toLocaleString()}
                          </span>
                        </div>
                        <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "wishlist" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">
                          My Wishlist
                        </h3>
                        <span className="text-slate-400">
                          {wishlistItems.length} items
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {wishlistItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 hover:shadow-2xl transition-all group"
                          >
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                              />
                              <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-all">
                                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                              </button>
                              {item.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-linear-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  {item.discount}% OFF
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-white mb-2">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-1 mb-3">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm text-slate-300">
                                  {item.rating}
                                </span>
                              </div>
                              <p className="text-cyan-400 font-bold text-lg mb-3">
                                Rs{item.price.toLocaleString()}
                              </p>
                              <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
