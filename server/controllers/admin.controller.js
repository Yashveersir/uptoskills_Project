/**
 * server/controllers/admin.controller.js
 * ─────────────────────────────────────────────────────────────────────
 * Admin Route Handlers / Controller
 * 
 * Coordinates HTTP requests, invokes the AdminService, and formats 
 * JSON responses using the standard utility response format.
 * ─────────────────────────────────────────────────────────────────────
 */

import adminService from "../services/admin.service.js";
import { parseId } from "../utils/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

class AdminController {
  async getStats(req, res, next) {
    try {
      const stats = await adminService.getStats();
      return sendSuccess(res, stats);
    } catch (err) {
      next(err);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      const analytics = await adminService.getAnalytics();
      return sendSuccess(res, analytics);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await adminService.getUsers();
      return sendSuccess(res, users);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await adminService.createUser(req.body);
      return sendSuccess(res, user, 201);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return sendError(res, "Invalid user ID", 400);

      const user = await adminService.updateUser(id, req.body);
      return sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return sendError(res, "Invalid user ID", 400);

      await adminService.deleteUser(id, req.user.id);
      return sendSuccess(res, { message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getCourses(req, res, next) {
    try {
      const courses = await adminService.getCourses();
      return sendSuccess(res, courses);
    } catch (err) {
      next(err);
    }
  }

  async createCourse(req, res, next) {
    try {
      const course = await adminService.createCourse(req.body, req.user.id);
      return sendSuccess(res, course, 201);
    } catch (err) {
      next(err);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return sendError(res, "Invalid course ID", 400);

      const course = await adminService.updateCourse(id, req.body);
      return sendSuccess(res, course);
    } catch (err) {
      next(err);
    }
  }

  async updateCourseStatus(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return sendError(res, "Invalid course ID", 400);

      const course = await adminService.updateCourseStatus(id, req.body.isPublished);
      return sendSuccess(res, course);
    } catch (err) {
      next(err);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return sendError(res, "Invalid course ID", 400);

      await adminService.deleteCourse(id);
      return sendSuccess(res, { message: "Course deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default new AdminController();
