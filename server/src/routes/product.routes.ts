import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductsByCategory, getRelatedProduct, updateProduct } from "../controller/product.controller";
import { upload } from "../middleware/multer.middleware";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";
 
const productRouter = Router();


productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.get("/related-product/:id", getRelatedProduct);

productRouter.get("/category/:category", getProductsByCategory);
 
productRouter.post("/create-product", isAuthenticated, isAdmin, upload.single("productImage"), createProduct);

productRouter.put("/update-product/:id", isAuthenticated, isAdmin, upload.single("productImage"), updateProduct);

productRouter.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct);

export default productRouter;
