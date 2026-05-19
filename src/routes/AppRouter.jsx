import { Routes, Route, Navigate } from "react-router-dom";

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

const SettingsRedirector = () => {
  const { role } = useSelector((state) => state.auth);
  return <Navigate to={role === "admin" ? "/admin/settings" : "/dashboard/settings"} replace />;
};

const AppRouter = () => {
  return (
    <Routes>

      {/* Main Layout Routes */}
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route
          path="courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />

        <Route
          path="courses/:id"
          element={
            <PrivateRoute>
              <CourseDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="watch/:id"
          element={
            <PrivateRoute>
              <WatchCourse />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="wishlist" element={<EmptyState title="Wishlist Coming Soon" desc="You'll be able to save your favorite courses here." />} />
        <Route path="history" element={<EmptyState title="Learning History Coming Soon" desc="Track your progress and completed lessons." />} />
        <Route path="certificates" element={<EmptyState title="Certificates Coming Soon" desc="View and download your earned certificates." />} />
      </Route>

      {/* Admin Layout Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute adminOnly>
            <AdminLayout />
          </PrivateRoute>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Global Redirects */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsRedirector />
          </PrivateRoute>
        }
      />

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRouter;