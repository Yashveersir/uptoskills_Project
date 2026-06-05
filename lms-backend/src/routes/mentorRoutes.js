import express from "express";
import { getMentorsController } from "../controllers/mentorController.js";

const router = express.Router();

router.get("/", getMentorsController);

export default router;