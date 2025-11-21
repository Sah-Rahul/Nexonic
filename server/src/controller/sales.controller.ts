import { Request, Response } from "express";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";

export const getTotalSales = async (req: Request, res: Response) => {
  const total = await Order.aggregate([
    { $match: { paymentStatus: "Paid" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalSales: total[0]?.totalSales || 0 },
        "Total sales fetched"
      )
    );
};

export const getMonthlySales = async (req: Request, res: Response) => {
  const months = await Order.aggregate([
    { $match: { paymentStatus: "Paid" } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        sales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, months, "Monthly sales fetched"));
};

export const getCategorySales = async (req: Request, res: Response) => {
  const data = await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$productDetails.category",
        totalSales: { $sum: "$orderItems.quantity" },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Category sales fetched"));
};
