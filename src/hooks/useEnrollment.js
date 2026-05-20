/**
 * src/hooks/useEnrollment.js
 * ─────────────────────────────────────────────────────────────────────
 * Enrollment hook — handles enrolling in courses and checking status.
 *
 * Usage:
 *   const { enrolled, enrollment, checkStatus, enroll, loading } = useEnrollment(courseId);
 * ─────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { enrollCourse, checkEnrollmentStatus } from "../api";
import { getErrorMessage } from "../utils/errorHandler";
import { useAuth } from "./useAuth";

export const useEnrollment = (courseId) => {
  const { isAuthenticated } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkStatus = useCallback(async () => {
    if (!isAuthenticated || !courseId) return;

    try {
      const data = await checkEnrollmentStatus(courseId);
      setEnrolled(data.enrolled);
      setEnrollment(data.enrollment);
    } catch (err) {
      console.error("Failed to check enrollment status:", err);
      // Fail silently for status checks so we don't spam toasts on page load
    }
  }, [courseId, isAuthenticated]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const enroll = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to enroll in this course.");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await enrollCourse(courseId);
      setEnrolled(true);
      setEnrollment(data.enrollment);
      toast.success("Successfully enrolled in the course!");
      return true;
    } catch (err) {
      const msg = getErrorMessage(err, "Failed to enroll. Please try again.");
      setError(msg);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    enrolled,
    enrollment,
    loading,
    error,
    checkStatus,
    enroll,
  };
};
