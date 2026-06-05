import express from "express";

import { authMiddleware }
from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import adminOnly
from "../middleware/adminOnly.js";

import {
    dashboardController,
    getAllUsersController,
    searchUsersController,
    getAllCoursesAdminController,
    getAllEnrollmentsController
} from "../controllers/adminController.js";

import {createLessonController} from "../controllers/lessonController.js";


import {
    createCourseController,
    updateCourseController,
    deleteCourseController,
    getPendingCourseController,
    approveCourseController,
    rejectCourseController
} from "../controllers/courseController.js";

import { uploadCourseThumbnailController } from "../controllers/uploadController.js";


import {getMentorsController,createMentorController} from "../controllers/mentorController.js";

const router = express.Router();


// DASHBOARD
router.get( "/dashboard",authMiddleware,adminOnly,dashboardController);


// USERS
router.get("/users",authMiddleware,adminOnly,getAllUsersController);

// CREATE MENTOR (ADMIN ONLY)
router.post("/mentors",authMiddleware,adminOnly,createMentorController);

// GET MENTORS (ADMIN ONLY)
router.get("/mentors",authMiddleware,adminOnly,getMentorsController);

// CREATE LESSON (ADMIN ONLY)
router.post("/lessons",authMiddleware,adminOnly,createLessonController);


// COURSES
router.get("/courses",getAllCoursesAdminController);


// ENROLLMENTS
router.get("/enrollments",authMiddleware,adminOnly,getAllEnrollmentsController);

// CREATE COURSE
router.post("/courses",authMiddleware,adminOnly,createCourseController);

// UPLOAD COURSE THUMNAIL
router.post("/course-thumbnail/:courseId", authMiddleware,adminOnly,  upload.single("thumbnail"),
    uploadCourseThumbnailController);

// UPDATE COURSE
router.put("/courses/:id",authMiddleware,adminOnly,updateCourseController);

// DELETE COURSE
router.delete( "/courses/:id",authMiddleware,adminOnly,deleteCourseController);

// PENDING COURSES
router.get("/pending-courses", authMiddleware, adminOnly, getPendingCourseController);

// APPROVE COURSE
router.post("/approve-course/:id", authMiddleware, adminOnly, approveCourseController);   

// REJECT COURSE
router.post("/reject-course/:id", authMiddleware, adminOnly, rejectCourseController);

// SEARCH USERS
router.get("/users/search", authMiddleware, adminOnly, searchUsersController);

// search all users
//GET http://localhost:5000/api/admin/users/search

// search user by name
// GET http://localhost:5000/api/admin/users/search?name=Juned

//serach user by email
// GET http://localhost:5000/api/admin/users/search?email=junedshaikh581@gmail.com


// search user by role
//GET http://localhost:5000/api/admin/users/search?role=user

// search with pagination
// GET http://localhost:5000/api/admin/users/search?page=1&limit=5

//Combined filters
// GET http://localhost:5000/api/admin/users/search?name=Juned&role=user&page=1&limit=5


export default router;