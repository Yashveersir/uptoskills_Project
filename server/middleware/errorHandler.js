/**
 * server/middleware/errorHandler.js
 * ─────────────────────────────────────────────────────────────────────
 * Global Error Handling Middleware
 * 
 * Intercepts all runtime errors thrown in route controllers, categorizes
 * them, logs unexpected anomalies, and returns clean, uniform HTTP responses.
 * ─────────────────────────────────────────────────────────────────────
 */
import { sendError } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Handle Prisma Specific Errors
  if (err.code === "P2002") {
    // Unique constraint violation
    statusCode = 409;
    const field = err.meta?.target ? err.meta.target.join(", ") : "resource";
    message = `A record with this ${field} already exists`;
  } else if (err.code === "P2025") {
    // Record not found
    statusCode = 404;
    message = err.meta?.cause || "Record not found";
  }

  // Log unexpected errors (non-operational developer/system bugs)
  if (!err.isOperational && !err.code) {
    console.error("[Unexpected Error]", err);
  }

  return sendError(res, message, statusCode, !err.isOperational && !err.code ? err : null);
};
