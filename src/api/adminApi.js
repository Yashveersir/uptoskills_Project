/**
 * src/api/adminApi.js
 * ─────────────────────────────────────────────────────────────────────
 * Admin-only API calls (requires admin JWT).
 * ─────────────────────────────────────────────────────────────────────
 */

import api, { unwrap } from "./axios";

// ── Dashboard & Analytics ─────────────────────────────────────────────

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return unwrap(response);
};

export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return unwrap(response);
};

// ── User Management ───────────────────────────────────────────────────

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");
  return unwrap(response);
};

export const createUser = async (data) => {
  const response = await api.post("/admin/users", data);
  return unwrap(response);
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/admin/users/${id}`, data);
  return unwrap(response);
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return unwrap(response);
};

// ── Course Management ─────────────────────────────────────────────────

export const getAdminCourses = async () => {
  const response = await api.get("/admin/courses");
  return unwrap(response);
};

export const createCourse = async (data) => {
  const response = await api.post("/admin/courses", data);
  return unwrap(response);
};

export const updateCourse = async (id, data) => {
  const response = await api.put(`/admin/courses/${id}`, data);
  return unwrap(response);
};

export const updateCourseStatus = async (id, isPublished) => {
  const response = await api.patch(`/admin/courses/${id}/status`, { isPublished });
  return unwrap(response);
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/admin/courses/${id}`);
  return unwrap(response);
};
