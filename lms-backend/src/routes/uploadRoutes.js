import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { authMiddleware }
from "../middleware/authMiddleware.js";

import {
    uploadAvatarController
}
from "../controllers/uploadController.js";

const router = express.Router();

router.post("/avatar",authMiddleware,upload.single("avatar"), uploadAvatarController);

export default router;