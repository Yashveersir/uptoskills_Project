import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    markLessonCompleteController,
    getCourseProgressController,
    updateLessonTimeController
} from "../controllers/progressController.js";

const router = express.Router();


// MARK LESSON COMPLETE
router.post(
    "/:lessonId",
    authMiddleware,
    markLessonCompleteController
);


// GET COURSE PROGRESS
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseProgressController
);

// UPDATE LESSON TIME
router.post(
    "/:lessonId/time",
    authMiddleware,
    updateLessonTimeController
);

export default router;