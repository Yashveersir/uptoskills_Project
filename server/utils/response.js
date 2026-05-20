/**
 * server/utils/response.js
 * ─────────────────────────────────────────────────────────────────────
 * Standardised HTTP response helpers.
 *
 * Using these keeps every route's response shape consistent so the
 * frontend always knows what to expect.
 *
 * Usage:
 *   import { sendSuccess, sendError } from "../utils/response.js";
 *
 *   sendSuccess(res, data);               → 200 { success: true, data }
 *   sendSuccess(res, data, 201);          → 201 { success: true, data }
 *   sendError(res, "Not found", 404);     → 404 { success: false, error }
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * Send a successful JSON response.
 * @param {import("express").Response} res
 * @param {*} data  - The payload to return
 * @param {number} [statusCode=200]
 */
export const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * Send an error JSON response and log the error server-side.
 * @param {import("express").Response} res
 * @param {string} message - Human-readable error message
 * @param {number} [statusCode=500]
 * @param {Error|null} [err=null] - Original error (for server-side logging only)
 */
export const sendError = (res, message, statusCode = 500, err = null) => {
  if (err) {
    console.error(`[${statusCode}] ${message}:`, err.message || err);
  }
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};
