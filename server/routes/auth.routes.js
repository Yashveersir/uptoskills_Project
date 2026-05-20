/**
 * server/routes/auth.routes.js
 * ─────────────────────────────────────────────────────────────────────
 * Authentication Routes (With Rate Limiting)
 * ─────────────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// 10 login attempts per 5 minutes
const loginLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again in 5 minutes.",
});

// 5 registrations per 15 minutes
const registerLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many registration attempts. Please try again in 15 minutes.",
});

router.post("/login", loginLimiter, login);
router.post("/register", registerLimiter, register);

export default router;
