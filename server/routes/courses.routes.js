import { Router } from "express";
import courseService from "../services/course.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

const router = Router();

const parseId = (value) => {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
};

router.get("/", async (req, res) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const courses = await courseService.getCourses({ search });
    return sendSuccess(res, courses);
  } catch (err) {
    return sendError(res, "Failed to fetch courses", 500, err);
  }
});

router.get("/mentors", async (req, res) => {
  try {
    const mentors = await courseService.getMentors();
    return sendSuccess(res, mentors);
  } catch (err) {
    return sendError(res, "Failed to fetch mentors", 500, err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await courseService.getCategories();
    return sendSuccess(res, categories);
  } catch (err) {
    return sendError(res, "Failed to fetch categories", 500, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return sendError(res, "Invalid course ID", 400);

    const course = await courseService.getCourseById(id);
    return sendSuccess(res, course);
  } catch (err) {
    if (err.status === 404 || err.name === "NotFoundError") {
      return sendError(res, err.message || "Course not found", 404);
    }
    return sendError(res, "Failed to fetch course", 500, err);
  }
});

export default router;
