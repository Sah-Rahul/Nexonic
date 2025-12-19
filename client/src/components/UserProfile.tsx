import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LogOut,
  Edit2,
  Save,
  X,
  Trash2,
  ShoppingBag,
  Heart,
  Package,
  Award,
} from "lucide-react";
import Layout from "./Layout";
import type { WishlistProduct } from "@/redux/slices/Wishlist";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderApi } from "@/api/orderApi";
import { logoutUser } from "@/redux/slices/userSlice";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { removeFromWishlist } from "@/redux/slices/Wishlist";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.cart);
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishList.products
  ) as WishlistProduct[];

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [userData, setUserData] = useState({
    fullName: user?.name || "Rahul Sah",
    email: user?.email || "rahul@nexonic.com",
    phone: "+977 98765 43210",
    location: "Kathmandu, Nepal",
    bio: "Founder & CEO at Nexonic | Building the future of e-commerce",
    avatar: user?.profile || "",
    role: user?.role || "admin",
    joinedDate: "January 2024",
    membershipTier: "Platinum",
  });

  const [tempUserData, setTempUserData] = useState(userData);
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrderApi,
  });

  const stats = [
    {
      label: "Total Orders",
      value: data?.data?.length || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Wishlist",
      value: wishlistProducts.length,
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      label: "Cart Items",
      value: products.length,
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      label: "Rewards",
      value: "2,450",
      icon: Award,
      color: "bg-amber-500",
    },
  ];

  const getOrderStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Shipped: "bg-blue-100 text-blue-800 border-blue-200",
      Delivered: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {status}
      </span>
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Item removed from wishlist");
  };

  return (
    <Layout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
        <Card className="bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">My Account</h1>
              <p className="text-sm text-blue-100 mt-1">
                Welcome back, {userData.fullName} 👋
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              className="cursor-pointer hover:bg-white/20 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-white shadow-md p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="cart"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6 space-y-6 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <Avatar className="w-24 h-24 ring-4 ring-blue-100">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-2xl bg-blue-600 text-white">
                    {userData.fullName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 bg-linear-to-r from-amber-400 to-amber-600 text-white text-xs font-semibold rounded-full">
                      {userData.membershipTier} Member
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="hover:bg-blue-50"
                    >
                      <Edit2 className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          setUserData(tempUserData);
                          setIsEditing(false);
                          toast.success("Profile updated successfully");
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setTempUserData(userData);
                          setIsEditing(false);
                        }}
                      >
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.fullName}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          fullName: e.target.value,
                        })
                      }
                      className="border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-600 p-2 bg-gray-50 rounded">
                      {userData.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-600 p-2 bg-gray-50 rounded">
                    {userData.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.phone}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          phone: e.target.value,
                        })
                      }
                      className="border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-600 p-2 bg-gray-50 rounded">
                      {userData.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.location}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          location: e.target.value,
                        })
                      }
                      className="border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-600 p-2 bg-gray-50 rounded">
                      {userData.location}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Bio
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={tempUserData.bio}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          bio: e.target.value,
                        })
                      }
                      className="border-gray-300 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-gray-600 p-3 bg-gray-50 rounded">
                      {userData.bio}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6 space-y-4 shadow-lg">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
                My Orders
              </CardTitle>

              {!data || data.data?.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No orders found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.data?.map((order: any) => (
                    <Card
                      key={order._id}
                      className="p-5 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">
                            Order ID:{" "}
                            <span className="text-gray-600">{order._id}</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Status:
                            </span>
                            {getOrderStatusBadge(order.orderStatus)}
                          </div>
                          <p className="text-sm text-gray-500">
                            Paid At:{" "}
                            {new Date(order.paidAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-xl text-blue-600">
                          Rs {order.totalPrice.toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item: any) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between bg-linear-to-r from-gray-50 to-gray-100 p-4 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.productId.productImage}
                                alt={item.productId.title}
                                className="w-16 h-16 object-cover rounded-lg shadow-sm"
                              />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {item.productId.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-800">
                              Rs {(item.quantity * item.price).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="cart">
            <Card className="p-6 space-y-4 shadow-lg">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </CardTitle>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {products.map((item) => (
                      <Card
                        key={item._id}
                        className="p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <img
                              src={item.productImage}
                              alt={item.title}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Qty: {item.quantity}
                              </p>
                              {item.discount > 0 && (
                                <p className="text-sm font-semibold text-green-600 mt-1">
                                  -{item.discount}% OFF
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-bold text-lg text-gray-800">
                              Rs {(item.quantity * item.price).toLocaleString()}
                            </p>
                            <Button
                              onClick={() => handleRemoveFromCart(item._id)}
                              variant="destructive"
                              size="icon"
                              className="  cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t-2">
                    <p className="font-bold text-xl text-gray-800">
                      Subtotal: Rs{" "}
                      {products
                        .reduce(
                          (sum, item) => sum + item.quantity * item.price,
                          0
                        )
                        .toLocaleString()}
                    </p>
                    <Link to="/cart">
                      <Button className=" cursor-pointer px-8 py-6 text-lg">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="wishlist">
            <Card className="p-6 space-y-4 shadow-lg">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Wishlist
              </CardTitle>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistProducts.map((item) => (
                    <Card
                      key={item._id}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={item.productImage}
                            alt={item.title}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {item.title}
                            </p>
                            {item.discount > 0 && (
                              <p className="text-sm font-semibold text-green-600 mt-1">
                                -{item.discount}% OFF
                              </p>
                            )}
                            <p className="font-bold text-gray-800 mt-2">
                              Rs {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRemoveFromWishlist(item._id)}
                          variant="destructive"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
