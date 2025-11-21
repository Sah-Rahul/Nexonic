import type { CategoryStatsResponse, MonthlyOrdersResponse, MonthlyRevenueResponse, OrderStatsResponse, TotalRevenueResponse } from "@/types/stats.types";
import { axiosInstance } from "./axiosInstance";

 

export const getTotalRevenueApi = async () => {
  const { data } = await axiosInstance.get<TotalRevenueResponse>("/api/v1/stats/total-revenue");
  return data;
};

export const getOrderStatsApi = async () => {
  const { data } = await axiosInstance.get<OrderStatsResponse>("/api/v1/stats/get/stats");
  return data;
};

export const getMonthlyRevenue = async () => {
  const { data } = await axiosInstance.get<MonthlyRevenueResponse>(
    "/api/v1/stats/monthly-revenue"
  );
  return data;
};

export const getMonthlyOrders = async () => {
  const { data } = await axiosInstance.get<MonthlyOrdersResponse>(
    "/api/v1/stats/monthly-orders"
  );
  return data;
};

export const getCategoryStats = async () => {
  const { data } = await axiosInstance.get<CategoryStatsResponse>(
    "/api/v1/stats/category-stats"
  );
  return data;
};

export const getTotalSalesApi = async () => {
  const { data } = await axiosInstance.get("/api/v1/sales/total");
  return data;
};

export const getMonthlySalesApi = async () => {
  const { data } = await axiosInstance.get("/api/v1/sales/monthly");
  return data;
};

export const getCategorySalesApi = async () => {
  const { data } = await axiosInstance.get("/api/v1/sales/category");
  return data;
};