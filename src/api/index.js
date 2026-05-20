/**
 * src/api/index.js
 * ─────────────────────────────────────────────────────────────────────
 * Barrel export for all API modules.
 *
 * Allows clean, single-line imports in components and hooks:
 *
 *   import { loginUser, getCourses, getAdminStats } from "../api";
 *
 * Instead of:
 *   import { loginUser } from "../api/authApi";
 *   import { getCourses } from "../api/courseApi";
 *   import { getAdminStats } from "../api/adminApi";
 * ─────────────────────────────────────────────────────────────────────
 */

export * from "./authApi";
export * from "./courseApi";
export * from "./enrollmentApi";
export * from "./adminApi";

// Named export of the raw axios instance (for custom calls)
export { default as apiClient } from "./axios";
