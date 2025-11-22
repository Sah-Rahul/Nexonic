import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Edit2, Save, X } from "lucide-react";
import Layout from "./Layout";
import type { WishlistProduct } from "@/redux/slices/Wishlist";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderApi } from "@/api/orderApi";

const UserProfile = () => {
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
    phone: "+91 98765 43210",
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
    { label: "Total Orders", value: data?.data?.length || 0 },
    { label: "Wishlist", value: wishlistProducts.length },
    { label: "Cart Items", value: products.length },
    { label: "Rewards", value: "2,450" },
  ];

  const getOrderStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Processing: "bg-yellow-100 text-yellow-700",
      Shipped: "bg-blue-100 text-blue-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-6 p-6 bg-white min-h-screen">
        <Card className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {userData.fullName} 👋
            </p>
          </div>
          <Button variant="destructive" size="sm">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <CardHeader>
                <CardTitle className="text-lg">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>{userData.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
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
                    >
                      <Edit2 className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUserData(tempUserData);
                          setIsEditing(false);
                        }}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.fullName}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          fullName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-muted-foreground">{userData.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.phone}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-muted-foreground">{userData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  {isEditing ? (
                    <Input
                      value={tempUserData.location}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          location: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-muted-foreground">{userData.location}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Bio</label>
                  {isEditing ? (
                    <Textarea
                      value={tempUserData.bio}
                      onChange={(e) =>
                        setTempUserData({
                          ...tempUserData,
                          bio: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-muted-foreground">{userData.bio}</p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6 space-y-4">
              <CardTitle className="mb-4 text-xl font-semibold">
                My Orders
              </CardTitle>

              {!data || data.length === 0 ? (
                <p className="text-muted-foreground">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {data.data?.map((order: any) => (
                    <Card key={order._id} className="p-4 space-y-4 border">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">
                            Order ID:{" "}
                            <span className="text-muted-foreground">
                              {order._id}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Status:
                            </span>
                            {getOrderStatusBadge(order.orderStatus)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Paid At:{" "}
                            {new Date(order.paidAt).toLocaleDateString()}
                          </p>
                        </div>

                        <p className="font-bold text-lg">
                          Rs {order.totalPrice.toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item: any) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.productId.productImage}
                                alt={item.productId.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">
                                  {item.productId.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>

                            <p className="font-semibold">
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
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <CardTitle>Shopping Cart</CardTitle>

                {products.length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty.</p>
                ) : (
                  products.map((item) => (
                    <Card
                      key={item._id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productImage}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          {item.discount > 0 && (
                            <p className="text-sm text-green-500">
                              -{item.discount}% OFF
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="font-bold text-black">
                        Rs{(item.quantity * item.price).toLocaleString()}
                      </p>
                    </Card>
                  ))
                )}

                {products.length > 0 && (
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-lg">
                      Subtotal: Rs
                      {products
                        .reduce(
                          (sum, item) => sum + item.quantity * item.price,
                          0
                        )
                        .toLocaleString()}
                    </p>
                    <Button>Proceed to Checkout</Button>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <CardTitle>Wishlist</CardTitle>

                {wishlistProducts.length === 0 ? (
                  <p className="text-muted-foreground">
                    Your wishlist is empty.
                  </p>
                ) : (
                  wishlistProducts.map((item) => (
                    <Card
                      key={item._id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productImage}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          {item.discount > 0 && (
                            <p className="text-sm text-green-500">
                              -{item.discount}% OFF
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
