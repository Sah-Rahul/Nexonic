import { axiosInstance } from "./axiosInstance";

export const getMyOrderApi = async ( ) => {
  const { data } = await axiosInstance.get(`/api/v1/order/my-orders`);
  return data;
};