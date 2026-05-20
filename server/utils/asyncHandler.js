/**
 * server/utils/asyncHandler.js
 * ─────────────────────────────────────────────────────────────────────
 * Express Async Router Handler Wrapper
 * 
 * Eliminates repetitive try-catch blocks in route handlers by forwarding
 * errors to Express's global next() middleware.
 * ─────────────────────────────────────────────────────────────────────
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
