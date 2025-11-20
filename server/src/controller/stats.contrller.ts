import { Request, Response } from "express";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/AsyncHandler";

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
