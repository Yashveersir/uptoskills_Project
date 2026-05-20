/**
 * server/middleware/rateLimiter.js
 * ─────────────────────────────────────────────────────────────────────
 * Lightweight In-Memory Rate Limiter Middleware
 * 
 * Protects sensitive endpoints (e.g., authentication) from brute-force
 * attacks by limiting the number of requests per IP address.
 * ─────────────────────────────────────────────────────────────────────
 */
import { AppError } from "../utils/errors.js";

const ipRequests = new Map();

// Periodically clean up expired IP records to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequests.entries()) {
    if (now > data.resetTime) {
      ipRequests.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref(); // .unref() keeps the event loop from staying active solely for this timer

/**
 * Express Rate Limiting Middleware
 * @param {object} options
 * @param {number} [options.windowMs=60000] - Time window in milliseconds
 * @param {number} [options.max=5] - Maximum requests allowed per windowMs
 * @param {string} [options.message] - Custom error message
 */
export const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 60 * 1000; // default 1 minute
  const max = options.max || 5; // default 5 requests per minute
  const message = options.message || "Too many requests, please try again later.";

  return (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown-ip";
    const now = Date.now();

    if (!ipRequests.has(ip)) {
      ipRequests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    const data = ipRequests.get(ip);

    if (now > data.resetTime) {
      // Reset window
      data.count = 1;
      data.resetTime = now + windowMs;
      return next();
    }

    data.count += 1;

    if (data.count > max) {
      const retryAfterSeconds = Math.ceil((data.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      return next(new AppError(message, 429));
    }

    next();
  };
};
