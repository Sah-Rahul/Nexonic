 import { Router } from "express";
import { changePassword, forgotPassword, getMe, loginUser, logoutUser, registerUser, resendOtp, resetPassword, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
 
const userRouter = Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

// Protected routes
userRouter.post("/logout", isAuthenticated, logoutUser);
userRouter.put("/update-profile", isAuthenticated, upload.single("avatar"), updateProfile);
userRouter.post("/change-password", isAuthenticated, changePassword);
userRouter.get("/me", isAuthenticated, getMe);

export default userRouter;