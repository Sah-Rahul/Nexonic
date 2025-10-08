import database from "../config/db.js";
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function generatePaymentIntent(orderId, amountInCents) {
  try {
    if (!amountInCents || isNaN(amountInCents)) {
      console.error("Invalid amount passed to Stripe:", amountInCents);
      return {
        success: false,
        message: "Invalid amount for payment.",
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
    });

    await database.query(
      `INSERT INTO payments (order_id, payment_type, payment_status, payment_intent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [orderId, "Online", "Pending", paymentIntent.client_secret]
    );

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("Payment Error:", error.message || error);
    return {
      success: false,
      message: "Payment Failed.",
    };
  }
}
