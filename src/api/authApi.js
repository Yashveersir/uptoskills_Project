/**
 * src/api/authApi.js
 * ─────────────────────────────────────────────────────────────────────
 * All auth-related API calls.
 *
 * The server wraps every success response as:
 *   { success: true, data: { ... } }
 *
 * We unwrap that envelope here so callers get the payload directly.
 * ─────────────────────────────────────────────────────────────────────
 */

import api, { unwrap } from "./axios";

// ── Auth endpoints ────────────────────────────────────────────────────

/**
 * Login with email + password.
 * Returns { token, user }
 */
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return unwrap(response);
};

/**
 * Register a new student account.
 * Returns { token, user }  (server auto-signs a token on registration)
 */
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return unwrap(response);
};

// ── User profile endpoints ────────────────────────────────────────────

/**
 * Get the currently logged-in user's profile.
 * Returns user object with id, name, email, role, bio, avatar
 */
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return unwrap(response);
};

/**
 * Update the current user's profile (name, bio, avatar).
 * Returns updated user object
 */
export const updateUserProfile = async (data) => {
  const response = await api.put("/users/me", data);
  return unwrap(response);
};

/**
 * Update the current user's settings (notifications, theme, etc.)
 * Returns { success, settings }
 */
export const updateUserSettings = async (data) => {
  const response = await api.put("/users/me/settings", data);
  return unwrap(response);
};

/**
 * Get courses the current user is enrolled in.
 * Returns array of enrollment objects
 */
export const getUserEnrollments = async () => {
  const response = await api.get("/users/me/enrollments");
  return unwrap(response);
};