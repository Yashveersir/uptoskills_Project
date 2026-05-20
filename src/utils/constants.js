/**
 * src/utils/constants.js
 * ─────────────────────────────────────────────────────────────────────
 * Shared application-level constants.
 *
 * Avoid magic strings and numbers scattered across components.
 * Any value used in 2+ places belongs here.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── User Roles ────────────────────────────────────────────────────────
export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  INSTRUCTOR: "instructor",
};

// ── Course Levels ─────────────────────────────────────────────────────
export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

// ── Course Categories ─────────────────────────────────────────────────
export const COURSE_CATEGORIES = [
  "Development",
  "Design",
  "Career",
  "Data Science",
  "AI & ML",
  "Business",
  "Marketing",
];

// ── Enrollment Status ─────────────────────────────────────────────────
export const ENROLLMENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  PAUSED: "paused",
};

// ── Course Status (admin) ─────────────────────────────────────────────
export const COURSE_STATUS = {
  LIVE: "Live",
  PENDING: "Pending",
};

// ── Pagination ────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;

// ── Fallback Assets ───────────────────────────────────────────────────
export const FALLBACK_COURSE_IMAGE =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop";

export const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=6366f1&color=fff&name=User";


