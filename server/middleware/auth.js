/**
 * server/middleware/auth.js
 * ─────────────────────────────────────────────────────────────────────
 * JWT authentication and role-based access control middleware.
 *
 * authenticate  — verifies Bearer token, attaches req.user
 * requireAdmin  — blocks non-admin users with 403
 *
 * Usage:
 *   router.get("/protected", authenticate, handler);
 *   router.get("/admin-only", authenticate, requireAdmin, handler);
 * ─────────────────────────────────────────────────────────────────────
 */

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

/**
 * Verifies the Authorization Bearer token.
 * On success, attaches decoded payload to req.user and calls next().
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/**
 * Must be used AFTER authenticate.
 * Blocks any authenticated user whose role is not "admin".
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
