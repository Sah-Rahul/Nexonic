 export interface TotalRevenueResponse {
  data: {
    totalRevenue: number;
  };
}

export interface OrderStatsResponse {
  data: {
    totalOrders: number;
    deliveredOrders: number;
    inProgressOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  };
}

export interface MonthlyRevenueResponse {
  data: {
    _id: number;        // month number
    revenue: number;
  }[];
}

export interface MonthlyOrdersResponse {
  data: {
    _id: number;        // month number
    totalOrders: number;
  }[];
}

export interface CategoryStatsResponse {
  data: {
    _id: string;        // category name
    totalSales: number;
  }[];
}
