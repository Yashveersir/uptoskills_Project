/**
 * server/routes/users.routes.js
 * ─────────────────────────────────────────────────────────────────────
 * Authenticated User Routes (Fully Refactored)
 * ─────────────────────────────────────────────────────────────────────
 */
import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getProfile,
  updateProfile,
  updateSettings,
  getEnrollments,
} from "../controllers/user.controller.js";

const router = Router();

// Protect all routes
router.use(authenticate);

router.get("/me", getProfile);
router.put("/me", updateProfile);
router.put(["/settings", "/me/settings"], updateSettings);
router.get("/me/enrollments", getEnrollments);

export default router;
