
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    markLessonCompleteController,
    getCourseProgressController,
    updateLessonTimeController
} from "../controllers/progressController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Course Progress APIs
 */

/**
 * @swagger
 * /api/progress/{lessonId}:
 *   post:
 *     summary: Mark lesson as completed
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson marked completed
 *       404:
 *         description: Lesson not found
 */
router.post(
    "/:lessonId",
    authMiddleware,
    markLessonCompleteController
);

/**
 * @swagger
 * /api/progress/course/{courseId}:
 *   get:
 *     summary: Get course progress
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course progress fetched
 */
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseProgressController
);

/**
 * @swagger
 * /api/progress/{lessonId}/time:
 *   post:
 *     summary: Update lesson watch time
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Time updated successfully
 */
router.post(
    "/:lessonId/time",
    authMiddleware,
    updateLessonTimeController
);

export default router;

