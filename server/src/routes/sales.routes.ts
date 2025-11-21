import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { getCategorySales, getMonthlySales, getTotalSales } from "../controller/sales.controller";
 
const salesRouter = Router();

 
salesRouter.get("/total", isAuthenticated, getTotalSales);

 
salesRouter.get("/monthly", isAuthenticated, getMonthlySales);

 
salesRouter.get("/category", isAuthenticated, getCategorySales);

export default salesRouter;
