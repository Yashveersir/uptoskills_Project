/**
 * src/api/courseApi.js
 * ─────────────────────────────────────────────────────────────────────
 * Public Course APIs (no authentication required)
 * ─────────────────────────────────────────────────────────────────────
 */

import api, { unwrap } from "./axios";

export const getCourses = async (params = {}) => {
  const response = await api.get("/courses", { params });
  return unwrap(response);
};

export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return unwrap(response);
};

export const getCategories = async () => {
  const response = await api.get("/courses/categories");
  return unwrap(response);
};

export const getMentors = async () => {
  const response = await api.get("/courses/mentors");
  return unwrap(response);
};