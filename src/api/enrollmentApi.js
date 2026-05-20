/**
 * src/api/enrollmentApi.js
 * ─────────────────────────────────────────────────────────────────────
 * Enrollment API calls (authentication required).
 * ─────────────────────────────────────────────────────────────────────
 */

import api, { unwrap } from "./axios";

/**
 * Enroll the currently authenticated user in a course.
 */
export const enrollCourse = async (courseId) => {
  const response = await api.post(`/enrollments/${courseId}`);
  return unwrap(response);
};

/**
 * Check whether the current user is enrolled in a given course.
 */
export const checkEnrollmentStatus = async (courseId) => {
  const response = await api.get(`/enrollments/${courseId}/status`);
  return unwrap(response);
};
