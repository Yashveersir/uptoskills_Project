import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    enrollCourseController,
    getMyCoursesController
} from "../controllers/enrollmentController.js";

const router = express.Router();


// ENROLL IN COURSE
router.post("/:courseId",authMiddleware,enrollCourseController);


// GET MY COURSES
router.get("/my-courses",authMiddleware,getMyCoursesController);

export default router;