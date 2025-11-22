import { Router } from "express";
import {
  fetchAllOrders,
  fetchMyOrders,
  fetchSingleOrder,
  placeOrder,
  updateOrderStatus,
} from "../controller/order.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
 
const orderRouter = Router();

orderRouter.post("/create", isAuthenticated, placeOrder);
orderRouter.get("/my-orders", isAuthenticated, fetchMyOrders);
orderRouter.get("/:id", isAuthenticated, fetchSingleOrder);

// Admin
orderRouter.get("/", isAuthenticated,  fetchAllOrders);
orderRouter.put("/:id", isAuthenticated,  updateOrderStatus);

export default orderRouter;
