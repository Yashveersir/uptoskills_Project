import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { fetchCourses, selectCourse } from "../store/slices/courseSlice";

export const useCourses = () => {
  const dispatch = useDispatch();
  const { items, loading, error, selectedCourse } = useSelector((state) => state.courses);

  const getCourses = useCallback(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const getCourseById = useCallback((id) => {
    dispatch(selectCourse(id));
  }, [dispatch]);

  return {
    courses: items,
    loading,
    error,
    selectedCourse,
    getCourses,
    getCourseById,
  };
};
