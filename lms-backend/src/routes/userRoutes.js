
import express from "express";

import {
    getMyProfile,
    updateMyProfile
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Profile APIs
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/me",
    authMiddleware,
    getMyProfile
);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put(
    "/update",
    authMiddleware,
    updateMyProfile
);

export default router;

