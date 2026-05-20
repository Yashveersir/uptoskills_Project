import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, getUserEnrollments } from "../../api";
import Button from "../../components/common/Button";
import ProgressBar from "../../components/common/ProgressBar";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import courseData from "../../constants/courseData";
import { motion } from "framer-motion";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      // 1. Fetch public courses for recommendations
      const publicData = await getCourses();
      setCourses(publicData || []);

      // 2. Fetch user's actual enrollments
      try {
        const enrolledData = await getUserEnrollments();
        setEnrolledCourses(enrolledData || []);
      } catch (err) {
        console.warn("Failed to fetch user enrollments, using demo fallback:", err);
        // Fallback to slice of courseData as enrolled
        const fallbackEnrolled = courseData.slice(0, 2).map((c, i) => ({
          ...c,
          progress: i === 0 ? 65 : 32,
          courseId: c.id
        }));
        setEnrolledCourses(fallbackEnrolled);
      }
    } catch (err) {
      console.error("API error in dashboard:", err);
      // Fallback everything to demo data
      setCourses(courseData);
      const fallbackEnrolled = courseData.slice(0, 2).map((c, i) => ({
        ...c,
        progress: i === 0 ? 65 : 32,
        courseId: c.id
      }));
      setEnrolledCourses(fallbackEnrolled);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const stats = [
    { label: "Courses In Progress", value: "3", icon: <Play className="text-white" size={20} />, trend: "+1 this week", bg: "bg-primary-500" },
    { label: "Hours Learned", value: "12.4", icon: <Clock className="text-white" size={20} />, trend: "85% of goal", bg: "bg-secondary-500" },
    { label: "Points Earned", value: "1,250", icon: <Award className="text-white" size={20} />, trend: "Top 10%", bg: "bg-status-success" },
  ];

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <ErrorState 
          onRetry={fetchCourses}
          title="Unable to load your courses"
          message="We encountered an error while loading your dashboard. Please try again."
        />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50"
          >
            Welcome back, Learner
          </motion.h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
            You have completed <span className="text-primary-600 dark:text-primary-400 font-bold">65%</span> of your weekly goal. Keep it up!
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-900/30 hover:bg-primary-50 dark:hover:bg-primary-900/10">
            <Sparkles size={16} className="mr-2" />
            AI Recommendations
          </Button>
          <Link to="/courses">
            <Button variant="primary" size="sm">Browse Courses</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {loading ? Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2" />
            <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        )) : stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${stat.bg}`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-status-success bg-status-success/10 px-2.5 py-1 rounded-full flex items-center uppercase tracking-wider border border-status-success/20">
                <TrendingUp size={12} className="mr-1" />
                {stat.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">Continue Learning</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors flex items-center gap-1 group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 flex gap-6">
                <div className="w-full sm:w-40 h-28 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 animate-pulse" />
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-full animate-pulse mt-8" />
                </div>
              </div>
            ))}
          </div>
        ) : enrolledCourses.length === 0 ? (
          <EmptyState 
            icon={BookOpen}
            title="No courses in progress"
            desc="Start your learning journey by enrolling in a course."
            action={
              <Link to="/courses">
                <Button variant="primary" size="sm">Browse Courses</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.slice(0, 2).map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 shadow-card hover:shadow-cardHover hover:border-primary-500/30 flex flex-col sm:flex-row gap-6 transition-all focus-within:ring-2 focus-within:ring-primary-500 outline-none"
              >
                <div className="w-full sm:w-40 h-28 rounded-2xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800 relative group">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{course.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Instructor: {course.teacher || "AI Mentor"}</p>
                  <div className="mt-auto">
                    <ProgressBar progress={course.progress} size="sm" showLabel />
                  </div>
                </div>
                <div className="sm:self-center">
                  <Link to={`/watch/${course.courseId || course.id}`} className="focus:outline-none">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-all shadow-md shadow-primary-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                    >
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">Recommended for You</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <EmptyState 
            icon={Star}
            title="Start your first course"
            desc="Browse our catalog and find a course that matches your interests."
            action={
              <Link to="/courses">
                <Button variant="primary" size="sm">Explore Courses</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 group shadow-card hover:shadow-cardHover hover:border-primary-500/30 transition-all flex flex-col focus-within:ring-2 focus-within:ring-primary-500">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest border border-neutral-200 dark:border-neutral-800 shadow-sm">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-secondary-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-status-warning" fill="currentColor" />
                      <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6 line-clamp-2 h-12 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{course.title}</h3>
                  <div className="mt-auto">
                    <Link to={`/courses/${course.id}`} className="focus:outline-none">
                      <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold hover:bg-primary-50 border-neutral-200 dark:border-neutral-800 dark:hover:bg-primary-900/20 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500">Course Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </motion.div>
  );
};

export default Dashboard;