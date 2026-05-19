import courseData from "../constants/courseData";

/**
 * 🚀 API Simulation (Returns the detailed course data)
 * In a real app, this would be an axios.get('/api/courses') call.
 */
export const getCourses = async () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(courseData);
    }, 600);
  });
};
