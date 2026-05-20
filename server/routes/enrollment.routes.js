/**
 * server/routes/enrollment.routes.js
 * ─────────────────────────────────────────────────────────────────────
 * Enrollment Routes (authentication required)
 *
 * POST /api/enrollments/:courseId        — enroll the current user in a course
 * GET  /api/enrollments/:courseId/status — check if current user is enrolled
 * ─────────────────────────────────────────────────────────────────────
 */

import { Router } from "express";
import prisma from "../db/prisma.js";
import { authenticate } from "../middleware/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

const router = Router();

// All enrollment routes require a valid JWT
router.use(authenticate);

// ── POST /api/enrollments/:courseId ──────────────────────────────────

router.post("/:courseId", async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) return sendError(res, "Invalid course ID", 400);

    const userId = req.user.id;

    // Verify course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return sendError(res, "Course not found", 404);

    // Prevent duplicate enrollments
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
    if (existing) return sendError(res, "Already enrolled in this course", 400);

    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId, status: "active", progress: 0 },
    });

    return sendSuccess(res, { enrollment }, 201);
  } catch (err) {
    if (err.code === "P2002") {
      return sendError(res, "Already enrolled in this course", 400);
    }
    return sendError(res, "Failed to enroll in course", 500, err);
  }
});

// ── GET /api/enrollments/:courseId/status ────────────────────────────

router.get("/:courseId/status", async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) return sendError(res, "Invalid course ID", 400);

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: req.user.id, courseId },
      },
    });

    return sendSuccess(res, {
      enrolled: !!enrollment,
      enrollment: enrollment || null,
    });
  } catch (err) {
    return sendError(res, "Failed to check enrollment status", 500, err);
  }
});

export default router;
