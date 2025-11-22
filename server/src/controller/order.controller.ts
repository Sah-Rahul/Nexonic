import asyncHandler from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { OrderZodSchema, OrderType } from "../zodSchema/OrderZodSchema";
import { ApiError } from "../utils/ApiError";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
import { AuthRequest } from "../types/Auth.interface";

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const parsed = OrderZodSchema.safeParse(req.body);

  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new ApiError(400, "Invalid input", formattedErrors);
  }

  const orderData: OrderType = parsed.data;

  const order = await Order.create(orderData);

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

export const fetchSingleOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid order ID");
    }

    const order = await Order.findById(id)
      .populate("buyerId")
      .populate("items.productId");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order fetched successfully"));
  }
);

export const fetchMyOrders = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    const orders = await Order.find({ buyerId: userId })
      .populate("items.productId", "title productImage price")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "My orders fetched successfully"));
  }
);

export const fetchAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find()
      .populate("buyerId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "All orders fetched successfully"));
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
