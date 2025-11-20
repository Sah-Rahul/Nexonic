import mongoose, {  Document, } from "mongoose";


export interface OrderInterface extends Document {
  buyerId: mongoose.Types.ObjectId;
  totalPrice: number;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  isPaid: boolean;
  deliveredAt?: Date;
}