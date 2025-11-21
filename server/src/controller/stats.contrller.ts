import { Request, Response } from "express";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";
import ProductModel from "../models/product.model";

export const getTotalRevenue = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({ isPaid: true });

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalPrice || 0);
    }, 0);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { totalRevenue }, "Revenue fetched successfully")
      );
  }
);

export const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();

  const deliveredOrders = await Order.countDocuments({
    orderStatus: "Delivered",
  });

  const cancelledOrders = await Order.countDocuments({
    orderStatus: "Cancelled",
  });

  const inProgressOrders = await Order.countDocuments({
    orderStatus: { $in: ["Processing", "Shipped"] },
  });

  const paidOrders = await Order.find({ isPaid: true });

  const totalRevenue = paidOrders.reduce((sum, order) => {
    return sum + (order.totalPrice || 0);
  }, 0);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalOrders,
        deliveredOrders,
        inProgressOrders,
        cancelledOrders,
        totalRevenue,
      },
      "Stats fetched successfully"
    )
  );
});

export const getMonthlyRevenue = asyncHandler(async (req, res) => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        revenue: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, revenue, "Monthly revenue fetched"));
});

export const getMonthlyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Monthly orders fetched"));
});

export const getCategoryStats = asyncHandler(async (req, res) => {
  const stats = await ProductModel.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Category stats fetched"));
});
