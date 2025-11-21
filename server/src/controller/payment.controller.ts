import dotenv from "dotenv"
dotenv.config()
import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/order.model";
import { ApiError } from "../utils/ApiError";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

 
export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.productImage],
        },
        unit_amount: Math.round(item.totalPrice * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Payment failed", error });
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
    new ApiError(404,err.message)
    console.log("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const orderData = {
      user: session.metadata.userId,
      items: JSON.parse(session.metadata.items),
      totalAmount: session.amount_total / 100,
      paymentId: session.payment_intent,
      status: "Paid",
    };

    await Order.create(orderData);
  }

  res.json({ received: true });
};
