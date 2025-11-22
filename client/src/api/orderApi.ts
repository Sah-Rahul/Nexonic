import { axiosInstance } from "./axiosInstance";

export const getMyOrderApi = async () => {
  const res = await axiosInstance.get("/api/v1/order/my-orders");
  return res.data;
};

export const getAllOrderApi = async () => {
  const res = await axiosInstance.get("/api/v1/order/");
  return res.data;
};

export const updateOrderStatusApi = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const res = await axiosInstance.put(`/api/v1/order/${id}`, {
      status,
  });
  return res.data;
};
