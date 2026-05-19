import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../store/slices/authSlice";
import { loginUser, registerUser } from "../api/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);
      dispatch(loginAction(data));
      toast.success("Login successful!");
      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await registerUser(userData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return {
    token,
    role,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
  };
};
