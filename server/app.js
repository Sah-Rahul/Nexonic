// ---------------------- Imports ----------------------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import Stripe from "stripe";

import { createAllTables } from "./utils/createTables.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Routes
import userAuth from "./routes/userAuth.routes.js";
import productRouter from "./routes/product.routes.js";
import adminRouter from "./routes/admin.routes.js";
import orderRouter from "./routes/order.routes.js";

// DB
import database from "./config/db.js";

// Config
dotenv.config({ path: "./config/config.env" });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe Webhook Route
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("✅ Webhook verified:", event.type);
    } catch (error) {
      console.error("❌ Webhook verification failed:", error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const paymentIntent_client_secret = paymentIntent.client_secret;

      try {
        //  Update payment status
        const updatedPaymentStatus = "Paid";
        const paymentTableUpdateResult = await database.query(
          `UPDATE payments 
           SET payment_status = $1 
           WHERE payment_intent_id = $2 
           RETURNING *`,
          [updatedPaymentStatus, paymentIntent_client_secret]
        );

        //  Update order paid_at timestamp
        const orderId = paymentTableUpdateResult.rows[0].order_id;
        await database.query(
          `UPDATE orders 
           SET paid_at = NOW() 
           WHERE id = $1`,
          [orderId]
        );

        //  Fetch ordered items
        const { rows: orderedItems } = await database.query(
          `SELECT product_id, quantity 
           FROM order_items 
           WHERE order_id = $1`,
          [orderId]
        );

        //  Reduce product stock
        for (const item of orderedItems) {
          await database.query(
            `UPDATE products 
             SET stock = stock - $1 
             WHERE id = $2`,
            [item.quantity, item.product_id]
          );
        }

        console.log("✅ Payment processed & stock updated.");
      } catch (error) {
        console.error("❌ Error in payment handler:", error);
        return res.status(500).send("Internal Server Error");
      }
    }

    // Respond to Stripe
    res.status(200).json({ received: true });
  }
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    credentials: true,
  })
);

app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  })
);

// Create Tables
createAllTables();

// Routes
app.use("/api/v1/auth", userAuth);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/order", orderRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;
