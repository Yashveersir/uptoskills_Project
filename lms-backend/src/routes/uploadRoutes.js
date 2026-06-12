<<<<<<< HEAD

import express from "express";

import upload from "../middleware/uploadMiddleware.js";
import { authMiddleware }
from "../middleware/authMiddleware.js";

import adminOnly
from "../middleware/adminOnly.js";

import {
    uploadAvatarController,
    uploadVideoController,
    uploadPdfController,
    uploadCourseThumbnailController
=======
import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

import {
    uploadAvatarController
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
}
from "../controllers/uploadController.js";

const router = express.Router();

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File Upload APIs
 */

/**
 * @swagger
 * /api/upload/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 */
router.post(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    uploadAvatarController
);

/**
 * @swagger
 * /api/upload/course-thumbnail:
 *   post:
 *     summary: Upload course thumbnail
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Thumbnail uploaded successfully
 */
router.post(
    "/course-thumbnail",
    authMiddleware,
    adminOnly,
    upload.single("thumbnail"),
    uploadCourseThumbnailController
);

/**
 * @swagger
 * /api/upload/video:
 *   post:
 *     summary: Upload lesson video
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 */
router.post(
    "/video",
    authMiddleware,
    adminOnly,
    upload.single("video"),
    uploadVideoController
);

/**
 * @swagger
 * /api/upload/pdf:
 *   post:
 *     summary: Upload lesson PDF
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: PDF uploaded successfully
 */
router.post(
    "/pdf",
    authMiddleware,
    adminOnly,
    upload.single("pdf"),
    uploadPdfController
);

export default router;

=======
router.post("/avatar",authMiddleware,upload.single("avatar"), uploadAvatarController);

export default router;
>>>>>>> 1ef6774424e0176c24819dabdeec33e29d46084a
