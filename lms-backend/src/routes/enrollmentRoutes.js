
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    enrollCourseController,
    getMyCoursesController
} from "../controllers/enrollmentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment APIs
 */

/**
 * @swagger
 * /api/enrollments/{courseId}:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully enrolled
 *       400:
 *         description: Enrollment failed
 */
router.post(
    "/:courseId",
    authMiddleware,
    enrollCourseController
);

/**
 * @swagger
 * /api/enrollments/my-courses:
 *   get:
 *     summary: Get enrolled courses of logged-in user
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: User enrolled courses
 */
router.get(
    "/my-courses",
    authMiddleware,
    getMyCoursesController
);

export default router;

