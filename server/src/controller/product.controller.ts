import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { ProductZodSchema } from "../zodSchema/ProductZodSchema";
import { uploadToCloudinary } from "../config/cloudinary.config";
import ProductModel from "../models/product.model";
import { AuthRequest } from "../types/Auth.interface";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    if (typeof req.body.KeyFeatures === "string") {
      try {
        req.body.KeyFeatures = JSON.parse(req.body.KeyFeatures);
        if (!Array.isArray(req.body.KeyFeatures)) {
          throw new Error();
        }
      } catch {
        throw new ApiError(
          400,
          "Invalid KeyFeatures format: must be a JSON array"
        );
      }
    }

    if (req.body.price) {
      const parsedPrice = Number(req.body.price);
      if (isNaN(parsedPrice)) {
        throw new ApiError(400, "Invalid price format: must be a number");
      }
      req.body.price = parsedPrice;
    }

    if (req.body.discount) {
      const parsedDiscount = Number(req.body.discount);
      if (isNaN(parsedDiscount)) {
        throw new ApiError(400, "Invalid discount format: must be a number");
      }
      req.body.discount = parsedDiscount;
    }

    const parsed = ProductZodSchema.safeParse(req.body);

    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map((issue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      });
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { title, description, price, category, KeyFeatures, discount } =
      parsed.data;

    if (!req.file || !req.file.buffer) {
      throw new ApiError(400, "Product image is required");
    }

    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "productImage"
    );

    const product = await ProductModel.create({
      title,
      description,
      price,
      category,
      KeyFeatures,
      discount,
      productImage: uploadedImage.secure_url,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, product.toObject(), "Product created successfully")
      );
  }
);

export const updateProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (typeof req.body.KeyFeatures === "string") {
      try {
        req.body.KeyFeatures = JSON.parse(req.body.KeyFeatures);
      } catch (error) {
        throw new ApiError(
          400,
          "Invalid KeyFeatures format: must be a JSON array"
        );
      }
    }
    const UpdateProductZodSchema = ProductZodSchema.partial();

    const parsed = UpdateProductZodSchema.safeParse(req.body);

    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map((issue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      });
      throw new ApiError(400, "Invalid input", formattedErrors);
    }

    const { title, description, price, category, KeyFeatures, discount } =
      parsed.data;
    const productId = req.params.id;
    if (!productId) throw new ApiError(400, "Product ID is required");

    let productImage: string | undefined;
    if (req.file && req.file.buffer) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "productImage"
      );
      productImage = uploadedImage.secure_url;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
        category,
        KeyFeatures,
        discount,
        ...(productImage && { productImage }),
      },
      { new: true }
    );

    if (!updatedProduct) throw new ApiError(404, "Product not found");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedProduct.toObject(),
          "Product updated successfully"
        )
      );
  }
);

export const deleteProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const productId = req.params.id;
    if (!productId) throw new ApiError(400, "Product ID is required");

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) throw new ApiError(404, "Product not found");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          deletedProduct.toObject(),
          "Product deleted successfully"
        )
      );
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    if (!productId) throw new ApiError(400, "Product ID is required");

    const product = await ProductModel.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    res
      .status(200)
      .json(
        new ApiResponse(200, product.toObject(), "Product fetched successfully")
      );
  }
);

export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await ProductModel.find({});
    res.status(200).json(
      new ApiResponse(
        200,
        products.map((p) => p.toObject()),
        "Products fetched successfully"
      )
    );
  }
);
