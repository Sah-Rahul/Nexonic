import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getCategoryStats,
  getMonthlyOrders,
  getMonthlyRevenue,
  getMonthlySalesApi,
  getOrderStatsApi,
  getTotalRevenueApi,
} from "@/api/statsApi";

import { getProductsApi } from "@/api/productApi";
import { getTotalUsers } from "@/api/authApi";
import type { UsersResponse } from "./Users";
import type { MonthlyRevenueResponse } from "@/types/stats.types";

const defaultSalesData = [
  { month: "Jan", sales: 0, revenue: 0, orders: 0 },
  { month: "Feb", sales: 0, revenue: 0, orders: 0 },
  { month: "Mar", sales: 0, revenue: 0, orders: 0 },
  { month: "Apr", sales: 0, revenue: 0, orders: 0 },
  { month: "May", sales: 0, revenue: 0, orders: 0 },
  { month: "Jun", sales: 0, revenue: 0, orders: 0 },
  { month: "Jul", sales: 0, revenue: 0, orders: 0 },
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: totalRevenue } = useQuery({
    queryKey: ["stats", "totalRevenue"],
    queryFn: getTotalRevenueApi,
  });

  const { data: orderStats } = useQuery({
    queryKey: ["stats", "orderStats"],
    queryFn: getOrderStatsApi,
  });

  const { data: monthlyRevenue } = useQuery<MonthlyRevenueResponse>({
    queryKey: ["stats", "monthlyRevenue"],
    queryFn: getMonthlyRevenue,
  });

  const { data: monthlyOrders } = useQuery({
    queryKey: ["stats", "monthlyOrders"],
    queryFn: getMonthlyOrders,
  });

  const { data: categoryStats } = useQuery({
    queryKey: ["stats", "categoryStats"],
    queryFn: getCategoryStats,
  });

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const { data: usersData } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: getTotalUsers,
  });

  const { data: monthlySales } = useQuery({
    queryKey: ["monthlySales"],
    queryFn: getMonthlySalesApi,
  });

  const transformedSalesData =
    monthlyRevenue?.data?.map((item: any) => ({
      month: monthNames[item._id - 1] || `M${item._id}`,
      revenue: item.revenue || 0,
      sales:
        monthlySales?.data?.find((s: any) => s._id === item._id)?.totalSales ||
        0,
      orders:
        monthlyOrders?.data?.find((o: any) => o._id === item._id)
          ?.totalOrders || 0,
    })) || defaultSalesData;

  const palette = ["#5596ff", "#5adbb5", "#fed766", "#ff9671", "#b28dff"];
  const transformedCategoryData = categoryStats?.data?.map(
    (item: any, index: number) => ({
      name: item._id || item.category || `Category ${index + 1}`,
      value: item.totalProducts || item.count || 0,
      color: palette[index % palette.length],
    })
  );

  const recentOrders = (orderStats as any)?.data?.recentOrders || [];
  const TotalRevenue =
    (totalRevenue?.data?.totalRevenue ?? 0) *
    (orderStats?.data?.totalOrders ?? 0);

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Here’s an overview of your business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="border border-white/8 bg-linear-to-br from-[#101010] to-[#181818] shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
              Total Revenue
              <DollarSign className="h-5 w-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              Rs{""} {TotalRevenue?.toLocaleString()}
            </div>
            <p className="text-xs flex items-center gap-1 text-green-400 mt-1">
              <TrendingUp className="h-3 w-3" /> +20.1% this month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/8 bg-linear-to-br from-[#101010] to-[#181818] shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
              Total Users
              <Users className="h-5 w-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {usersData?.data?.totalUsers || 0}
            </div>
            <p className="text-xs flex items-center gap-1 text-green-400 mt-1">
              <TrendingUp className="h-3 w-3" /> +180% growth
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/8 bg-linear-to-br from-[#101010] to-[#181818] shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
              Total Orders
              <ShoppingCart className="h-5 w-5 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {orderStats?.data?.totalOrders || 0}
            </div>
            <p className="text-xs flex items-center gap-1 text-green-400 mt-1">
              <TrendingUp className="h-3 w-3" /> +19% this month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/8 bg-linear-to-br from-[#101010] to-[#181818] shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
              Total Products
              <Package className="h-5 w-5 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {productsData?.length || 0}
            </div>
            <p className="text-xs flex items-center gap-1 text-red-400 mt-1">
              <TrendingDown className="h-3 w-3" /> -2% compared
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="bg-[#111] border border-white/6 shadow-lg">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales & revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transformedSalesData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5596ff" stopOpacity={0.4} />
                    <stop offset="90%" stopColor="#5596ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5adbb5" stopOpacity={0.4} />
                    <stop offset="90%" stopColor="#5adbb5" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#777" />
                <YAxis stroke="#777" />
                <Tooltip
                  contentStyle={{
                    background: "#1c1c1c",
                    color: "#fff",
                    border: "1px solid #333",
                  }}
                />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5596ff"
                  fill="url(#rev)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#5adbb5"
                  fill="url(#sales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border border-white/6 shadow-lg">
          <CardHeader>
            <CardTitle>Orders Analytics</CardTitle>
            <CardDescription>Monthly orders count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transformedSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#777" />
                <YAxis stroke="#777" />
                <Tooltip
                  contentStyle={{
                    background: "#1c1c1c",
                    border: "1px solid #333",
                  }}
                />
                <Legend />

                <Bar dataKey="orders" fill="#5596ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="bg-[#111] border border-white/6 shadow-lg">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transformedCategoryData}
                  cx="50%"
                  cy="50%"
                  dataKey="value"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`
                  }
                >
                  {transformedCategoryData.map((entry: any, i: any) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1c1c1c",
                    border: "1px solid #333",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border border-white/6 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recentOrders.length
                ? recentOrders
                : [
                    {
                      id: "#1234",
                      customer: "John Doe",
                      amount: 120,
                      status: "Completed",
                    },
                    {
                      id: "#1235",
                      customer: "Jane Smith",
                      amount: 90,
                      status: "Pending",
                    },
                  ]
              ).map((o: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-lg bg-[#181818] border border-white/5 hover:bg-[#1f1f1f] transition"
                >
                  <div>
                    <p className="font-medium">
                      {o.user?.fullName || o.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Order #{o._id?.slice(-6) || o.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{o.totalAmount || o.amount}
                    </p>
                    <p
                      className={`text-xs ${
                        ["Completed", "Delivered"].includes(o.status)
                          ? "text-green-400"
                          : o.status === "Pending"
                          ? "text-yellow-400"
                          : o.status === "Cancelled"
                          ? "text-red-400"
                          : "text-blue-400"
                      }`}
                    >
                      {o.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
