/**
 * src/hooks/useAdmin.js
 * ─────────────────────────────────────────────────────────────────────
 * Admin data hook — fetches and manages admin panel data.
 *
 * Handles loading, error, and toast feedback so admin page
 * components only worry about rendering, not data logic.
 *
 * Usage:
 *   const { stats, loading, error, refreshStats } = useAdmin();
 * ─────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getAdminStats,
  getAnalytics,
  getAdminUsers,
  getAdminCourses,
  createCourse,
  updateCourse,
  updateCourseStatus,
  deleteCourse,
  updateUser,
  deleteUser,
} from "../api";
import { getErrorMessage } from "../utils/errorHandler";

// ── Stats & Analytics ─────────────────────────────────────────────────

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { stats, loading, error, refresh: fetch };
};

export const useAdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { analytics, loading, error, refresh: fetch };
};

// ── User Management ───────────────────────────────────────────────────

export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const editUser = async (id, data) => {
    try {
      const updated = await updateUser(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
      toast.success("User updated successfully");
      return updated;
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update user"));
      throw err;
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete user"));
      throw err;
    }
  };

  return { users, loading, error, refresh: fetchUsers, editUser, removeUser };
};

// ── Course Management ─────────────────────────────────────────────────

export const useAdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminCourses();
      setCourses(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const addCourse = async (data) => {
    try {
      const created = await createCourse(data);
      setCourses((prev) => [created, ...prev]);
      toast.success("Course created successfully");
      return created;
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create course"));
      throw err;
    }
  };

  const editCourse = async (id, data) => {
    try {
      const updated = await updateCourse(id, data);
      setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
      toast.success("Course updated successfully");
      return updated;
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update course"));
      throw err;
    }
  };

  const toggleCourseStatus = async (id, isPublished) => {
    try {
      await updateCourseStatus(id, isPublished);
      setCourses((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: isPublished ? "Live" : "Pending" } : c
        )
      );
      toast.success(`Course ${isPublished ? "published" : "unpublished"}`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update course status"));
      throw err;
    }
  };

  const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success("Course deleted successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete course"));
      throw err;
    }
  };

  return {
    courses,
    loading,
    error,
    refresh: fetchCourses,
    addCourse,
    editCourse,
    toggleCourseStatus,
    removeCourse,
  };
};
