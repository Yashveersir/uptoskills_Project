/**
 * src/store/slices/authSlice.js
 * ─────────────────────────────────────────────────────────────────────
 * Authentication Redux Slice
 *
 * Uses tokenStorage helpers so localStorage key names and
 * JSON parsing are never duplicated across files.
 * ─────────────────────────────────────────────────────────────────────
 */

import { createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  getRole,
  getUser,
  setAuthData,
  clearAuthData,
} from "../../utils/tokenStorage";

const getInitialState = () => ({
  token: getToken(),
  role: getRole(),
  user: getUser(),
  isAuthenticated: !!getToken(),
});

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    /**
     * Call after successful login or registration.
     * Payload: { token: string, user: object, role?: string }
     */
    login: (state, action) => {
      const { token, user, role } = action.payload;
      const resolvedRole = role || user?.role;

      state.token = token;
      state.role = resolvedRole;
      state.user = user;
      state.isAuthenticated = true;

      setAuthData(token, resolvedRole, user);
    },

    /**
     * Clear all auth state and remove from localStorage.
     */
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;

      clearAuthData();
    },

    /**
     * Update the stored user object (e.g. after profile edit).
     * Payload: partial or full user object.
     */
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Re-persist to keep localStorage in sync
      if (state.token && state.role) {
        setAuthData(state.token, state.role, state.user);
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;