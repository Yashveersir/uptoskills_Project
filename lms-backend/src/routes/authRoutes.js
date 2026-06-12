<<<<<<< HEAD

import express from "express";

import {
  registerController,
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

import { authMiddleware } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

import {
  otpLimiter,
  loginLimiter
} from "../middleware/rateLimitMiddleware.js";

import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from "../validators/authValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 */
router.post(
  "/register",
  otpLimiter,
  validate(registerSchema),
  registerController
);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify registration OTP
 *     tags: [Authentication]
 */
router.post(
  "/verify-otp",
  otpLimiter,
  validate(verifyOtpSchema),
  verifyOtpController
);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend registration OTP
 *     tags: [Authentication]
 */
router.post(
  "/resend-otp",
  otpLimiter,
  validate(resendOtpSchema),
  resendOtpController
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login using email and password
 *     tags: [Authentication]
 */
router.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  loginController
);

/**
 * @swagger
 * /api/auth/send-login-otp:
 *   post:
 *     summary: Send login OTP
 *     tags: [Authentication]
 */
router.post(
  "/send-login-otp",
  otpLimiter,
  validate(forgotPasswordSchema),
  sendLoginOtpController
);

/**
 * @swagger
 * /api/auth/verify-login-otp:
 *   post:
 *     summary: Verify login OTP
 *     tags: [Authentication]
 */
router.post(
  "/verify-login-otp",
  otpLimiter,
  validate(verifyOtpSchema),
  verifyLoginOtpController
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset OTP
 *     tags: [Authentication]
 */
router.post(
  "/forgot-password",
  otpLimiter,
  validate(forgotPasswordSchema),
  forgotPasswordController
);

/**
 * @swagger
 * /api/auth/verify-reset-otp:
 *   post:
 *     summary: Verify reset password OTP
 *     tags: [Authentication]
 */
router.post(
  "/verify-reset-otp",
  otpLimiter,
  validate(verifyOtpSchema),
  verifyResetOtpController
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 */
router.post(
  "/reset-password",
  otpLimiter,
  validate(resetPasswordSchema),
  resetPasswordController
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 */
router.post(
  "/logout",
  authMiddleware,
  logoutController
);

export default router;
=======
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
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
