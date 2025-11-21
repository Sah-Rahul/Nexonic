export interface TotalRevenueResponse {
  data: {
    totalRevenue: number;
  };
}

export interface OrderStatsResponse {
  data: {
    totalOrders: number;
    delivered: number;
    inProgress: number;
    cancelled: number;
    totalRevenue: number;

  };
}

export interface MonthlyRevenueResponse {
  data: {
    monthlyRevenue: {
      month: string;
      revenue: number;
    }[];
  };
}

export interface MonthlyOrdersResponse {
  data: {
    monthlyOrders: {
      month: string;
      orders: number;
    }[];
  };
}

export interface CategoryStatsResponse {
  data: {
    categories: {
      category: string;
      count: number;
    }[];
  };
}
