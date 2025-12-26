import { Router } from "express";
import {
  fetchAllOrders,
  fetchMyOrders, 
  fetchSingleOrder, 
  updateOrderStatus,
} from "../controller/order.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const orderRouter = Router();

/* USER */
orderRouter.get("/my-orders", isAuthenticated, fetchMyOrders);
orderRouter.get("/:id", isAuthenticated, fetchSingleOrder);

/* ADMIN */
orderRouter.get("/", isAuthenticated, isAdmin, fetchAllOrders);
orderRouter.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);

export default orderRouter;
