import express from "express";
import {
  addReviewOnProducts,
  deleteReview,
  editReview,
} from "../controller/review.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const reviewRouter = express.Router();

reviewRouter.use(isAuthenticated);

reviewRouter.post("/add-review/:id", addReviewOnProducts);

reviewRouter.delete("/delete-review/:id", deleteReview);

reviewRouter.put("/edit-review/:id", editReview);

export default reviewRouter;
