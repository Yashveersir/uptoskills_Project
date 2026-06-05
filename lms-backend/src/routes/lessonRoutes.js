
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import enrolledOnly from "../middleware/enrolledOnly.js";

import {
    getLessonsByCourseController,
    searchLessonsController
} from "../controllers/lessonController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson APIs
 */

/**
 * @swagger
 * /api/lessons/course/{courseId}:
 *   get:
 *     summary: Get lessons of an enrolled course
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lessons fetched successfully
 *       403:
 *         description: User not enrolled
 */
router.get(
    "/course/:courseId",
    authMiddleware,
    enrolledOnly,
    getLessonsByCourseController
);

/**
 * @swagger
 * /api/lessons/search:
 *   get:
 *     summary: Search lessons
 *     tags: [Lessons]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lessons fetched successfully
 */
router.get(
    "/search",
    authMiddleware,
    searchLessonsController
);

export default router;

/*
TEST

GET http://localhost:5000/api/lessons/search?keyword=react

GET http://localhost:5000/api/lessons/search?courseId=1

GET http://localhost:5000/api/lessons/search?page=1&limit=5
*/

