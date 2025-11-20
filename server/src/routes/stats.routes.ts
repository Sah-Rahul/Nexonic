import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { getTotalRevenue } from "../controller/stats.contrller";

const statsRouter = Router();

statsRouter.get("/total-revenue", isAuthenticated, isAdmin, getTotalRevenue);

export default statsRouter;
