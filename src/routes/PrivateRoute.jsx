import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useEffect } from "react";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && adminOnly && role !== "admin") {
      toast.error("You are not authorized to access this section.");
    }
  }, [isAuthenticated, adminOnly, role]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;