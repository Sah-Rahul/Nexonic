import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.get("/logout", isAuthenticated, logout);
AuthRouter.get("/me", isAuthenticated, getMe);
AuthRouter.post("/password-forgot", isAuthenticated, forgotPassword);
AuthRouter.put("/reset-password/:token", isAuthenticated, resetPassword);
AuthRouter.put("/update-password", isAuthenticated, updatePassword);
AuthRouter.put("/profile-update", isAuthenticated, updateProfile);

export default AuthRouter;
