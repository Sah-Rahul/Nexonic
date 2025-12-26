import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controller/payment.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);

paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default paymentRouter;
