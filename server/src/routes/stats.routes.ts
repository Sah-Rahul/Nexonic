import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { getCategoryStats, getMonthlyOrders, getMonthlyRevenue, getOrderStats, getTotalRevenue } from "../controller/stats.contrller";

const statsRouter = Router();

statsRouter.get("/total-revenue", isAuthenticated,   getTotalRevenue);

statsRouter.get("/get/stats", isAuthenticated,   getOrderStats);

statsRouter.get("/monthly-revenue",   getMonthlyRevenue);

statsRouter.get("/monthly-orders",   getMonthlyOrders);

statsRouter.get("/category-stats",   getCategoryStats);

export default statsRouter;
