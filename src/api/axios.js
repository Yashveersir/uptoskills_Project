import axios from "axios";
import store from "../store";
import { logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Auth Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      // Token expired or unauthorized
      if (response.status === 401) {
        store.dispatch(logout());
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        // Other server errors
        const message = response.data?.message || "An unexpected error occurred";
        toast.error(message);
      }
    } else if (error.request) {
      // Network error (no response received)
      toast.error("Network error. Please check your connection.");
    } else {
      // Something else happened
      toast.error("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;