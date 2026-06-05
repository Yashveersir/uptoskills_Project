import express from "express";

import { registerController ,
    verifyOtpController,
    resendOtpController,
    loginController,
    sendLoginOtpController,
    verifyLoginOtpController,
    forgotPasswordController,
    verifyResetOtpController,
    resetPasswordController,
    logoutController
} from "../controllers/authController.js";

import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify-otp", verifyOtpController);
router.post("/resend-otp", resendOtpController);
router.post("/login", loginController);

// Login by OTP
router.post("/send-login-otp", sendLoginOtpController);
router.post("/verify-login-otp", verifyLoginOtpController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-reset-otp", verifyResetOtpController);
router.post("/reset-password", resetPasswordController);
router.post("/logout", authMiddleware, logoutController);

export default router;