/**
 * src/hooks/useAuth.js
 * ─────────────────────────────────────────────────────────────────────
 * Authentication hook — wraps Redux auth state and API calls.
 *
 * Returns: { user, role, token, isAuthenticated, loading,
 *            login, logout, register, updateProfile }
 * ─────────────────────────────────────────────────────────────────────
 */

import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, logout as logoutAction, updateUser } from "../store/slices/authSlice";
import { loginUser, registerUser, updateUserProfile } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { ROLES } from "../utils/constants";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, isAuthenticated, user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);

  // ── Login ────────────────────────────────────────────────────────────
  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);
      dispatch(loginAction({ token: data.token, user: data.user, role: data.user?.role }));
      toast.success(`Welcome back, ${data.user?.name || ""}!`);
      navigate(data.user?.role === ROLES.ADMIN ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed. Check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  // ── Register ─────────────────────────────────────────────────────────
  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      if (data.token) {
        dispatch(loginAction({ token: data.token, user: data.user, role: data.user?.role }));
        toast.success(`Welcome to AI Learn, ${data.user?.name || ""}! Your account is ready.`);
        navigate("/dashboard");
      } else {
        toast.success("Registration successful! Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Registration failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────
  const logout = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ── Update Profile ────────────────────────────────────────────────────
  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(data);
      dispatch(updateUser(updatedUser));
      toast.success("Profile updated successfully!");
      return updatedUser;
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update profile."));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    role,
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile,
  };
};
