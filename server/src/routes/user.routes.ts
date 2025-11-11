 import { Router } from "express";
import { changePassword, forgotPassword, getMe, loginUser, logoutUser, registerUser, resendOtp, resetPassword, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
 
const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.post("/logout", isAuthenticated, logoutUser);
router.put("/update-profile", isAuthenticated, upload.single("avatar"), updateProfile);
router.post("/change-password", isAuthenticated, changePassword);
router.get("/me", isAuthenticated, getMe);

export default router;