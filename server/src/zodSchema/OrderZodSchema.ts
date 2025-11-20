import { z } from "zod";

export const OrderItemZodSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
});

export type OrderItemType = z.infer<typeof OrderItemZodSchema>;

export const ShippingAddressZodSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});
export type ShippingAddressType = z.infer<typeof ShippingAddressZodSchema>;

export const OrderZodSchema = z.object({
  buyerId: z.string().min(1, "Buyer ID is required"),
  totalPrice: z.number().min(0, "Total price must be >= 0"),
  orderStatus: z
    .enum(["Processing", "Shipped", "Delivered", "Cancelled"])
    .default("Processing"),
  paidAt: z
    .string()
    .datetime({ message: "Paid date must be a valid datetime string" })
    .optional(),
  items: z.array(OrderItemZodSchema).min(1, "Order must have at least one item"),
  shippingAddress: ShippingAddressZodSchema,
  paymentMethod: z.string().min(1, "Payment method is required"),
  isPaid: z.boolean().default(false),
  deliveredAt: z
    .string()
    .datetime({ message: "Delivered date must be a valid datetime string" })
    .optional(),
});

export type OrderType = z.infer<typeof OrderZodSchema>;
