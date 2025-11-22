import { axiosInstance } from "./axiosInstance";

export const getMyOrderApi = async () => {
  const res = await axiosInstance.get("/api/v1/order/my-orders");
  return res.data;   
};
