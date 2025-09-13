import express from "express";
import {
  authorizedRoles,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post(
  "/create-product",
  isAuthenticated,
  authorizedRoles("Admin"),
  createProduct
);
productRouter.get(
  "/",
  isAuthenticated,
  authorizedRoles("Admin"),
  fetchAllProducts
);
productRouter.put(
  "/product/update/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  updateProduct
);
productRouter.delete(
  "/product/delete/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteProduct
);
productRouter.get(
  "/get-single-product/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  getSingleProduct
);
export default productRouter;
