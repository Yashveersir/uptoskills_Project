/**
 * server/controllers/auth.controller.js
 * ─────────────────────────────────────────────────────────────────────
 * Authentication Controller
 * 
 * Maps express request objects to AuthService calls, sending standard success
 * payloads, and letting global errorHandler catch any thrown exceptions.
 * ─────────────────────────────────────────────────────────────────────
 */
import authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

/**
 * Handle POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  return sendSuccess(res, result);
});

/**
 * Handle POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.register({ name, email, password });
  return sendSuccess(res, result, 201);
});
