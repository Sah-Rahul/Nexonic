import express from "express";
import {
  authorizedRoles,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";
import {
  fetchAllOrders,
  fetchMyOrders,
  fetchSingleOrder,
  placeNewOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/new", isAuthenticated, placeNewOrder);

orderRouter.get("/my-order", isAuthenticated, fetchMyOrders);

orderRouter.get("/order/:id", isAuthenticated, fetchSingleOrder);

orderRouter.get(
  "/all-order",
  isAuthenticated,
  authorizedRoles("Admin"),
  fetchAllOrders
);

orderRouter.put("/order/:id/status", isAuthenticated, authorizedRoles("admin"), updateOrderStatus);

orderRouter.delete("/delete-order/:id", isAuthenticated, authorizedRoles("admin"), updateOrderStatus);


export default orderRouter;
