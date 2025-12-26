import Stripe from "stripe";
import { Request, Response } from "express";
import { AuthRequest } from "../types/Auth.interface";
import Order from "../models/order.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }

    // log for debugging
    console.log("Cart Items:====================>", cartItems);
    console.log("User ID:=======================>", req.user.id);

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "npr",
        product_data: {
          name: item.title,
          images: item.productImage ? [item.productImage] : [],
        },
        unit_amount: Math.round((item.price || 0) * 100), 
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId: req.user.id,
        itemsCount: cartItems.length.toString(),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return res
      .status(500)
      .json({ message: "Stripe checkout failed", error: error.message });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    await Order.create({
      buyerId: session.metadata.userId,
      items: JSON.parse(session.metadata.items),
      totalAmount: session.amount_total / 100,
      paymentId: session.payment_intent,
      isPaid: true,
      paidAt: new Date(),
      orderStatus: "Processing",
    });
  }

  res.json({ received: true });
};
