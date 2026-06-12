<<<<<<< HEAD

=======
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    markLessonCompleteController,
    getCourseProgressController,
    updateLessonTimeController
} from "../controllers/progressController.js";

const router = express.Router();

<<<<<<< HEAD
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
=======

// MARK LESSON COMPLETE
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
router.post(
    "/:lessonId",
    authMiddleware,
    markLessonCompleteController
);

<<<<<<< HEAD
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
=======

// GET COURSE PROGRESS
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseProgressController
);

<<<<<<< HEAD
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
=======
// UPDATE LESSON TIME
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
router.post(
    "/:lessonId/time",
    authMiddleware,
    updateLessonTimeController
);

<<<<<<< HEAD
export default router;

=======
export default router;
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
