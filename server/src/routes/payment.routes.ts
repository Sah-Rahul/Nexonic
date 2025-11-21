import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controller/payment.controller";
 
const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);

paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default paymentRouter;
