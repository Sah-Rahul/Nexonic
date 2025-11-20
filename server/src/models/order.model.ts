import mongoose, { Schema, Document, model } from "mongoose";
import { OrderInterface } from "../types/order.interface";

const orderSchema = new Schema<OrderInterface>(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paidAt: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return !value || value <= new Date();
        },
        message: "Paid date cannot be in the future",
      },
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = model<OrderInterface>("Order", orderSchema);
export default Order;
