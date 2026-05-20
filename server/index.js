/**
 * server/index.js
 * ─────────────────────────────────────────────────────────────────────
 * Express Application Entry Point
 *
 * This file ONLY does three things:
 *   1. Create the Express app and configure global middleware
 *   2. Mount all route files under their base paths
 *   3. Start listening on the configured port
 *
 * Add new feature areas by creating a new file in /routes and
 * mounting it here — no other file needs to change.
 * ─────────────────────────────────────────────────────────────────────
 */

import express from "express";
import cors from "cors";
import { PORT, CLIENT_ORIGIN } from "./config/env.js";

// ── Route files ───────────────────────────────────────────────────────
import authRoutes       from "./routes/auth.routes.js";
import courseRoutes     from "./routes/courses.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import userRoutes       from "./routes/users.routes.js";
import adminRoutes      from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// ── App setup ─────────────────────────────────────────────────────────
const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

// ── Security Headers ──────────────────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ── Health check ──────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Mount routes ──────────────────────────────────────────────────────
app.use("/api/auth",        authRoutes);
app.use("/api/courses",     courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/users",       userRoutes);
app.use("/api/admin",       adminRoutes);

// ── 404 handler ───────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

export default app;