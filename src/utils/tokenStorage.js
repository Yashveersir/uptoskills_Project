/**
 * src/utils/tokenStorage.js
 * ─────────────────────────────────────────────────────────────────────
 * Centralised localStorage helpers for authentication state.
 *
 * Using this module means:
 *   • key names are defined ONCE (never typo "tokn" vs "token")
 *   • clearing auth state is always complete — nothing gets missed
 *   • easy to swap to sessionStorage or a cookie later
 *
 * Usage:
 *   import { getToken, setAuthData, clearAuthData } from "../utils/tokenStorage";
 * ─────────────────────────────────────────────────────────────────────
 */

const KEYS = {
  TOKEN: "token",
  ROLE: "role",
  USER: "user",
};

/** @returns {string|null} The stored JWT token */
export const getToken = () => localStorage.getItem(KEYS.TOKEN);

/** @returns {string|null} The stored user role */
export const getRole = () => localStorage.getItem(KEYS.ROLE);

/**
 * Parse the stored user object.
 * @returns {object|null}
 */
export const getUser = () => {
  const raw = localStorage.getItem(KEYS.USER);
  if (!raw || raw === "undefined") return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/**
 * Persist all auth data after login or registration.
 * @param {string} token
 * @param {string} role
 * @param {object} user
 */
export const setAuthData = (token, role, user) => {
  localStorage.setItem(KEYS.TOKEN, token);
  localStorage.setItem(KEYS.ROLE, role);
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

/**
 * Remove all auth data — call on logout or 401 responses.
 */
export const clearAuthData = () => {
  localStorage.removeItem(KEYS.TOKEN);
  localStorage.removeItem(KEYS.ROLE);
  localStorage.removeItem(KEYS.USER);
};

/**
 * Check whether the user is currently authenticated.
 * @returns {boolean}
 */
export const isAuthenticated = () => !!getToken();
