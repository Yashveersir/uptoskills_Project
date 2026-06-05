
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import upload from "../middleware/uploadMiddleware.js";

import {
    dashboardController,
    getAllUsersController,
    searchUsersController,
    getAllCoursesAdminController,
    getAllEnrollmentsController,
    userAnalyticsController,
    courseAnalyticsController,
    completionAnalyticsController,
    pendingApprovalCountController
} from "../controllers/adminController.js";

import {
    createCourseController,
    updateCourseController,
    deleteCourseController,
    getPendingCourseCountController,
    approveCourseController,
    rejectCourseController
} from "../controllers/courseController.js";

import {
    uploadCourseThumbnailController,
    uploadVideoController
} from "../controllers/uploadController.js";

import {
    getMentorsController,
    createMentorController
} from "../controllers/mentorController.js";

import {
    exportUsersReportController,
    exportCoursesReportController,
    exportEnrollmentsReportController
} from "../controllers/reportController.js";

import {
    createLessonController
} from "../controllers/lessonController.js";

const router = express.Router();

/////////////////////////////////////////////////////
// DASHBOARD & ANALYTICS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 */
router.get(
    "/dashboard",
    authMiddleware,
    adminOnly,
    dashboardController
);

/**
 * @swagger
 * /api/admin/user-analytics:
 *   get:
 *     summary: Get user analytics
 *     tags: [Admin]
 */
router.get(
    "/user-analytics",
    authMiddleware,
    adminOnly,
    userAnalyticsController
);

/**
 * @swagger
 * /api/admin/course-analytics:
 *   get:
 *     summary: Get course analytics
 *     tags: [Admin]
 */
router.get(
    "/course-analytics",
    authMiddleware,
    adminOnly,
    courseAnalyticsController
);

/**
 * @swagger
 * /api/admin/completion-analytics:
 *   get:
 *     summary: Get completion analytics
 *     tags: [Admin]
 */
router.get(
    "/completion-analytics",
    authMiddleware,
    adminOnly,
    completionAnalyticsController
);

/**
 * @swagger
 * /api/admin/pending-count:
 *   get:
 *     summary: Get pending courses count
 *     tags: [Admin]
 */
router.get(
    "/pending-count",
    authMiddleware,
    adminOnly,
    pendingApprovalCountController
);

/////////////////////////////////////////////////////
// USERS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin Users]
 */
router.get(
    "/users",
    authMiddleware,
    adminOnly,
    getAllUsersController
);

/**
 * @swagger
 * /api/admin/users/search:
 *   get:
 *     summary: Search users
 *     tags: [Admin Users]
 */
router.get(
    "/users/search",
    authMiddleware,
    adminOnly,
    searchUsersController
);

/////////////////////////////////////////////////////
// REPORT EXPORTS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/export/users:
 *   get:
 *     summary: Export users CSV report
 *     tags: [Reports]
 */
router.get(
    "/export/users",
    authMiddleware,
    adminOnly,
    exportUsersReportController
);

/**
 * @swagger
 * /api/admin/export/courses:
 *   get:
 *     summary: Export courses CSV report
 *     tags: [Reports]
 */
router.get(
    "/export/courses",
    authMiddleware,
    adminOnly,
    exportCoursesReportController
);

/**
 * @swagger
 * /api/admin/export/enrollments:
 *   get:
 *     summary: Export enrollments CSV report
 *     tags: [Reports]
 */
router.get(
    "/export/enrollments",
    authMiddleware,
    adminOnly,
    exportEnrollmentsReportController
);

/////////////////////////////////////////////////////
// MENTORS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/mentors:
 *   post:
 *     summary: Create mentor
 *     tags: [Mentors]
 */
router.post(
    "/mentors",
    authMiddleware,
    adminOnly,
    createMentorController
);

/**
 * @swagger
 * /api/admin/mentors:
 *   get:
 *     summary: Get all mentors
 *     tags: [Mentors]
 */
router.get(
    "/mentors",
    authMiddleware,
    adminOnly,
    getMentorsController
);

/////////////////////////////////////////////////////
// LESSONS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/lessons:
 *   post:
 *     summary: Create lesson
 *     tags: [Lessons]
 */
router.post(
    "/lessons",
    authMiddleware,
    adminOnly,
    createLessonController
);

/**
 * @swagger
 * /api/admin/lesson-video/{lessonId}:
 *   post:
 *     summary: Upload lesson video
 *     tags: [Lessons]
 */
router.post(
    "/lesson-video/:lessonId",
    authMiddleware,
    adminOnly,
    upload.single("video"),
    uploadVideoController
);

/////////////////////////////////////////////////////
// COURSES
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 */
router.get(
    "/courses",
    authMiddleware,
    adminOnly,
    getAllCoursesAdminController
);

/**
 * @swagger
 * /api/admin/courses:
 *   post:
 *     summary: Create course
 *     tags: [Courses]
 */
router.post(
    "/courses",
    authMiddleware,
    adminOnly,
    createCourseController
);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Courses]
 */
router.put(
    "/courses/:id",
    authMiddleware,
    adminOnly,
    updateCourseController
);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 */
router.delete(
    "/courses/:id",
    authMiddleware,
    adminOnly,
    deleteCourseController
);

/**
 * @swagger
 * /api/admin/pending-courses:
 *   get:
 *     summary: Get pending courses count
 *     tags: [Courses]
 */
router.get(
    "/pending-courses",
    authMiddleware,
    adminOnly,
    getPendingCourseCountController
);

/**
 * @swagger
 * /api/admin/approve-course/{id}:
 *   post:
 *     summary: Approve course
 *     tags: [Courses]
 */
router.post(
    "/approve-course/:id",
    authMiddleware,
    adminOnly,
    approveCourseController
);

/**
 * @swagger
 * /api/admin/reject-course/{id}:
 *   post:
 *     summary: Reject course
 *     tags: [Courses]
 */
router.post(
    "/reject-course/:id",
    authMiddleware,
    adminOnly,
    rejectCourseController
);

/**
 * @swagger
 * /api/admin/course-thumbnail/{courseId}:
 *   post:
 *     summary: Upload course thumbnail
 *     tags: [Courses]
 */
router.post(
    "/course-thumbnail/:courseId",
    authMiddleware,
    adminOnly,
    upload.single("thumbnail"),
    uploadCourseThumbnailController
);

/////////////////////////////////////////////////////
// ENROLLMENTS
/////////////////////////////////////////////////////

/**
 * @swagger
 * /api/admin/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 */
router.get(
    "/enrollments",
    authMiddleware,
    adminOnly,
    getAllEnrollmentsController
);

export default router;

