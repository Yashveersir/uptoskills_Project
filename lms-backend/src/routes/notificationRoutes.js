
import express from "express";

import { authMiddleware }
from "../middleware/authMiddleware.js";

import {
    getNotificationsController,
    markNotificationReadController
}
from "../controllers/notificationController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notification APIs
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    authMiddleware,
    getNotificationsController
);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
router.put(
    "/:id/read",
    authMiddleware,
    markNotificationReadController
);

export default router;

