import asyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../types/Auth.interface";
import mongoose from "mongoose";

export const fetchMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ buyerId: req.user!.id })
    .populate("items.productId", "title price productImage")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
};

export const fetchAllOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find()
    .populate("buyerId", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
};

export const fetchSingleOrder = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid order id");
    }

    const order = await Order.findById(id)
      .populate("buyerId", "fullName email")
      .populate("items.productId", "title price productImage");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

 
    if (
      req.user?.role !== "admin" &&
      order.buyerId.toString() !== req.user?.id
    ) {
      throw new ApiError(403, "Access denied");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order fetched successfully"));
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatus.includes(status)) {
      throw new ApiError(400, "Invalid order status");
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = new Date();
      order.isPaid = true;
    }

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order status updated successfully"));
  }
);
