import express from "express";
import {
  addReviewOnProducts,
  deleteReview,
  editReview,
  getAverageReviews,
  getFiveStarReviews,
  getLowRatedReviews,
  getTotalReviews,
} from "../controller/review.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const reviewRouter = express.Router();

reviewRouter.use(isAuthenticated);

reviewRouter.post("/add-review/:id", addReviewOnProducts);

reviewRouter.delete("/delete-review/:id", deleteReview);

reviewRouter.put("/edit-review/:id", editReview);

reviewRouter.get("/total/:id", getTotalReviews);

reviewRouter.get("/average/:id", getAverageReviews);

reviewRouter.get("/5star/:id", getFiveStarReviews);

reviewRouter.get("/lowrated/:id", getLowRatedReviews);

export default reviewRouter;
