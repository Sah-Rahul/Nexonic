import express from "express";
import {
  isAuthenticated,
  authorizedRoles,
} from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  dashboardStats,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get(
  "/getallusers",
  isAuthenticated,
  authorizedRoles("Admin"),
  getAllUsers
);
adminRouter.delete(
  "/deleteusers/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteUser
);
adminRouter.get(
  "/fetch-dashboardStats",
  isAuthenticated,
  authorizedRoles("Admin"),
  dashboardStats
);

export default adminRouter;
