<<<<<<< HEAD

=======
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
import express from "express";
import { getMentorsController } from "../controllers/mentorController.js";

const router = express.Router();

<<<<<<< HEAD
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

=======
router.get("/", getMentorsController);

export default router;
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
