/**
 * server/controllers/user.controller.js
 * ─────────────────────────────────────────────────────────────────────
 * User Management Controller
 * 
 * Maps HTTP request params to UserService methods and manages the responses.
 * ─────────────────────────────────────────────────────────────────────
 */
import userService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

/**
 * Handle GET /api/users/me
 */
export const getProfile = asyncHandler(async (req, res) => {
  const result = await userService.getProfile(req.user.id);
  return sendSuccess(res, result);
});

/**
 * Handle PUT /api/users/me
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;
  const result = await userService.updateProfile(req.user.id, { name, bio, avatar });
  return sendSuccess(res, result);
});

/**
 * Handle PUT /api/users/settings
 */
export const updateSettings = asyncHandler(async (req, res) => {
  const { theme } = req.body;
  const result = await userService.updateSettings(req.user.id, { theme });
  return sendSuccess(res, result);
});

/**
 * Handle GET /api/users/me/enrollments
 */
export const getEnrollments = asyncHandler(async (req, res) => {
  const result = await userService.getEnrollments(req.user.id);
  return sendSuccess(res, result);
});
