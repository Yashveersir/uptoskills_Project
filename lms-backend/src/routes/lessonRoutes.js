import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import enrolledOnly from "../middleware/enrolledOnly.js";

import {
    
    getLessonsByCourseController,
    searchLessonsController
} from "../controllers/lessonController.js";
import test from "node:test";

const router = express.Router();





// GET LESSONS OF ENROLLED COURSE
router.get("/course/:courseId",authMiddleware,enrolledOnly,getLessonsByCourseController);

// SEARCH LESSONS

router.get("/search",authMiddleware,searchLessonsController);

// // TEST
// GET http://localhost:5000/api/lessons/search?keyword=react
// GET http://localhost:5000/api/lessons/search?courseId=1
// GET http://localhost:5000/api/lessons/search?page=1&limit=5

export default router;


