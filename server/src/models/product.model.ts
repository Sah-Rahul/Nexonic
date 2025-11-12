import mongoose from "mongoose";
import { AllowedCategories } from "../constants/category.constant";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    KeyFeatures: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: AllowedCategories,
      required: true,
    },
    Rating: {
      type: [Number],
      default: [],
    },
    Reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
    },
    relatedProducts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    productImage: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
