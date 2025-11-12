import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Response } from "express";
import { AuthRequest } from "../types/Auth.interface";
import ReviewModel from "../models/review.model";
import ProductModel from "../models/product.model";

export const addReviewOnProducts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const userId = req.user?.id;
    const { rating, review } = req.body;

    if (!rating && !review) {
      throw new ApiError(400, "Please provide rating or review.");
    }

    const alreadyExistReview = await ReviewModel.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyExistReview) {
      throw new ApiError(400, "You have already reviewed this product");
    }

    const reviewDoc = await ReviewModel.create({
      user: userId,
      product: productId,
      rating,
      review,
    });

    await ProductModel.findByIdAndUpdate(productId, {
      $push: { Reviews: reviewDoc._id, Rating: rating },
    });

    const populatedReview = await ReviewModel.findById(reviewDoc._id)
      .populate("user", "fullName email profile")
      .lean();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          populatedReview,
          "Review added successfully with user info"
        )
      );
  }
);

export const editReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const userId = req.user?.id;
    const { rating, review } = req.body;

    if (!rating && !review) {
      throw new ApiError(400, "Rating or review is required to update");
    }

    const existingReview = await ReviewModel.findOneAndUpdate(
      { user: userId, product: productId },
      { rating, review },
      { new: true }
    ).populate("user", "fullName email profile");

    if (!existingReview) {
      throw new ApiError(404, "Review not found for this user");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existingReview.toObject(),
          "Review updated successfully"
        )
      );
  }
);

export const deleteReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    const userId = req.user?.id;

    const existingReview = await ReviewModel.findOneAndDelete({
      user: userId,
      product: productId,
    }).populate("user", "fullName email profile");

    if (!existingReview) {
      throw new ApiError(404, "Review not found for this user");
    }

    await ProductModel.findByIdAndUpdate(productId, {
      $pull: { Reviews: existingReview._id },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existingReview.toObject(),
          "Review deleted successfully"
        )
      );
  }
);
