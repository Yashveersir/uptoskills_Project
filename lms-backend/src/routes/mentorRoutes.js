
import express from "express";
import { getMentorsController } from "../controllers/mentorController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentors
 *   description: Mentor APIs
 */

/**
 * @swagger
 * /api/mentors:
 *   get:
 *     summary: Get all mentors
 *     tags: [Mentors]
 *     responses:
 *       200:
 *         description: List of mentors
 */
router.get("/", getMentorsController);

export default router;

