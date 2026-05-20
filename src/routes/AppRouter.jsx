import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Dashboard/Home";
import Dashboard from "../pages/Dashboard/Dashboard";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/Courses/CourseDetails";
import WatchCourse from "../pages/Courses/WatchCourse";

import AdminOverview from "../pages/Admin/AdminOverview";
import AdminCourses from "../pages/Admin/AdminCourses";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminAnalytics from "../pages/Admin/AdminAnalytics";
import AdminSettings from "../pages/Admin/AdminSettings";
import DashboardSettings from "../pages/Dashboard/Settings";

import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

import AuthLayout from "../layouts/AuthLayout";

import DashboardLayout from "../layouts/DashboardLayout";

import EmptyState from "../components/common/EmptyState";

import { useSelector } from "react-redux";

// Page Title Setter Component
const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | AI Learn` : "AI Learn";
  }, [title]);
  return null;
};

const SettingsRedirector = () => {
  const { role } = useSelector((state) => state.auth);
  return <Navigate to={role === "admin" ? "/admin/settings" : "/dashboard/settings"} replace />;
};

// Animated Route Wrapper
const AnimatedRoute = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnimatedRoute><PageTitle title="Home" /><Home /></AnimatedRoute>} />

          <Route
            path="courses"
            element={
              <AnimatedRoute>
                <PageTitle title="Courses" />
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              </AnimatedRoute>
            }
          />

          <Route
            path="courses/:id"
            element={
              <AnimatedRoute>
                <PageTitle title="Course Details" />
                <PrivateRoute>
                  <CourseDetails />
                </PrivateRoute>
              </AnimatedRoute>
            }
          />

          <Route
            path="watch/:id"
            element={
              <AnimatedRoute>
                <PageTitle title="Learning" />
                <PrivateRoute>
                  <WatchCourse />
                </PrivateRoute>
              </AnimatedRoute>
            }
          />
        </Route>

        <Route
          path="/dashboard"
          element={
            <AnimatedRoute>
              <PageTitle title="Dashboard" />
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            </AnimatedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="wishlist" element={<AnimatedRoute><EmptyState title="Wishlist Coming Soon" desc="You'll be able to save your favorite courses here." /></AnimatedRoute>} />
          <Route path="history" element={<AnimatedRoute><EmptyState title="Learning History Coming Soon" desc="Track your progress and completed lessons." /></AnimatedRoute>} />
          <Route path="certificates" element={<AnimatedRoute><EmptyState title="Certificates Coming Soon" desc="View and download your earned certificates." /></AnimatedRoute>} />
        </Route>

        {/* Admin Layout Routes */}
        <Route
          path="/admin"
          element={
            <AnimatedRoute>
              <PageTitle title="Admin Panel" />
              <PrivateRoute adminOnly>
                <AdminLayout />
              </PrivateRoute>
            </AnimatedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AnimatedRoute><PageTitle title="Login" /><Login /></AnimatedRoute>} />
          <Route path="/register" element={<AnimatedRoute><PageTitle title="Register" /><Register /></AnimatedRoute>} />
          <Route path="/forgot-password" element={<AnimatedRoute><PageTitle title="Forgot Password" /><ForgotPassword /></AnimatedRoute>} />
        </Route>

        {/* Global Redirects */}
        <Route
          path="/settings"
          element={
            <AnimatedRoute>
              <PageTitle title="Settings" />
              <PrivateRoute>
                <SettingsRedirector />
              </PrivateRoute>
            </AnimatedRoute>
          }
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<AnimatedRoute><PageTitle title="404 Not Found" /><NotFound /></AnimatedRoute>} />

      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;