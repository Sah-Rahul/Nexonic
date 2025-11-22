import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Search,
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { getOrderStatsApi, getTotalRevenueApi } from "@/api/statsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrderApi, updateOrderStatusApi } from "@/api/orderApi";
import { toast } from "sonner";

type OrderStatus = "Cancelled" | "Shipped" | "Processing" | "Delivered";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data: orderData, isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrderApi,
  });

  const orders = orderData?.data || [];

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatusApi({ id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      toast.success("Order status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });

  const { data: totalRevenue } = useQuery({
    queryKey: ["stats", "totalRevenue"],
    queryFn: getTotalRevenueApi,
  });

  const { data: orderStats } = useQuery({
    queryKey: ["stats", "orderStats"],
    queryFn: getOrderStatsApi,
  });

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerId?.fullName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.buyerId?.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter((o: any) => o.orderStatus === "Delivered").length,
    shipped: orders.filter((o: any) => o.orderStatus === "Shipped").length,
    inProgress: orders.filter((o: any) => o.orderStatus === "Processing")
      .length,
    cancelled: orders.filter((o: any) => o.orderStatus === "Cancelled").length,
    totalRevenue: orders
      .filter((o: any) => o.isPaid)
      .reduce((sum: number, o: any) => sum + o.totalPrice, 0),
  };

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      Delivered: {
        variant: "default",
        icon: CheckCircle,
        className: "bg-green-500 hover:bg-green-600",
      },
      Shipped: {
        variant: "default",
        icon: Truck,
        className: "bg-blue-500 hover:bg-blue-600",
      },
      Processing: {
        variant: "secondary",
        icon: Clock,
        className: "bg-yellow-500 hover:bg-yellow-600",
      },
      Cancelled: {
        variant: "destructive",
        icon: XCircle,
        className: "",
      },
    };

    const config = statusConfig[status] || statusConfig["Processing"];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPaymentBadge = (isPaid: boolean) => {
    return (
      <Badge variant={isPaid ? "default" : "secondary"}>
        {isPaid ? "Paid" : "Pending"}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    updateStatus({ id: orderId, status: newStatus });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const TotalRevenue =
    (totalRevenue?.data?.totalRevenue ?? 0) *
    (orderStats?.data?.totalOrders ?? 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">
            Track and manage all customer orders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.delivered}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.cancelled}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                Rs {TotalRevenue}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>
                  Complete list of customer orders
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order: any) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium font-mono text-sm">
                        #{order._id.slice(-8)}
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium">
                              {order.buyerId?.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.buyerId?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">
                        Rs {order.totalPrice?.toLocaleString()}
                      </TableCell>
                      <TableCell>{getPaymentBadge(order.isPaid)}</TableCell>
                      <TableCell>{order.items?.length || 0}</TableCell>
                      <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                              Update Status
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(order._id, "Processing")
                              }
                              disabled={
                                isUpdating || order.orderStatus === "Processing"
                              }
                            >
                              <Clock className="w-3 h-3 mr-2" /> Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(order._id, "Shipped")
                              }
                              disabled={
                                isUpdating || order.orderStatus === "Shipped"
                              }
                            >
                              <Truck className="w-3 h-3 mr-2" /> Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(order._id, "Delivered")
                              }
                              disabled={
                                isUpdating || order.orderStatus === "Delivered"
                              }
                            >
                              <CheckCircle className="w-3 h-3 mr-2" /> Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(order._id, "Cancelled")
                              }
                              disabled={
                                isUpdating || order.orderStatus === "Cancelled"
                              }
                              className="text-red-600"
                            >
                              <XCircle className="w-3 h-3 mr-2" /> Cancelled
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredOrders.map((order: any) => (
                <Card key={order._id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg font-mono">
                          #{order._id.slice(-8)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Update Status
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "Processing")
                            }
                            disabled={
                              isUpdating || order.orderStatus === "Processing"
                            }
                          >
                            <Clock className="w-3 h-3 mr-2" /> Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "Shipped")
                            }
                            disabled={
                              isUpdating || order.orderStatus === "Shipped"
                            }
                          >
                            <Truck className="w-3 h-3 mr-2" /> Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "Delivered")
                            }
                            disabled={
                              isUpdating || order.orderStatus === "Delivered"
                            }
                          >
                            <CheckCircle className="w-3 h-3 mr-2" /> Delivered
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order._id, "Cancelled")
                            }
                            disabled={
                              isUpdating || order.orderStatus === "Cancelled"
                            }
                            className="text-red-600"
                          >
                            <XCircle className="w-3 h-3 mr-2" /> Cancelled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        src={
                          order.buyerId?.profile ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                        alt={order.buyerId?.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{order.buyerId?.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.buyerId?.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold">
                          Rs {order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Items:</span>
                        <span>{order.items?.length || 0}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {getPaymentBadge(order.isPaid)}
                      {getStatusBadge(order.orderStatus)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-10">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Orders;
