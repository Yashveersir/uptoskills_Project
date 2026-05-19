import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== "admin") {
    toast.error("You are not authorized to access this section.");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;