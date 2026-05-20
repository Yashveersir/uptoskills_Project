/**
 * src/api/axios.js
 * ─────────────────────────────────────────────────────────────────────
 * Configured Axios instance shared across all API modules.
 *
 * Features:
 *  - Attaches the JWT Bearer token to every request automatically
 *  - Handles 401 Unauthorized by clearing auth state and redirecting
 *  - Extracts human-readable error messages from server responses
 * ─────────────────────────────────────────────────────────────────────
 */

import axios from "axios";
import { clearAuthData } from "../utils/tokenStorage";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Request interceptor: attach JWT ───────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle errors ──────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Session expired or invalid token — force logout
    if (error.response?.status === 401) {
      clearAuthData();
      // Only redirect if we're not already on an auth page
      if (!window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/register")) {
        window.location.href = "/login";
      }
    }

    // Extract the clearest possible error message for the UI
    const serverMessage = error.response?.data?.error     // { success: false, error: "..." }
                       || error.response?.data?.message;  // legacy shape fallback

    if (serverMessage) {
      error.message = serverMessage;
    } else if (error.code === "ECONNREFUSED" || error.message === "Network Error") {
      error.message = "Cannot connect to server. Make sure the backend is running on port 5000.";
    }

    return Promise.reject(error);
  }
);

/** Helper — unwrap the server envelope { success, data } → data */
export const unwrap = (response) => response.data?.data ?? response.data;

export default api;