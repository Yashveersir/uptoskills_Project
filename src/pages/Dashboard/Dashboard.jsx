import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../api/courseApi";
import Button from "../../components/common/Button";
import ProgressBar from "../../components/common/ProgressBar";
import SkeletonCard from "../../components/common/SkeletonCard";
import { motion } from "framer-motion";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        // Simulating enrolled courses with progress
        const enrolled = data.slice(0, 3).map((c, i) => ({
          ...c,
          progress: i === 0 ? 65 : i === 1 ? 32 : 12
        }));
        setCourses(enrolled);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const stats = [
    { label: "Courses In Progress", value: "3", icon: <Play className="text-white" size={20} />, trend: "+1 this week", bg: "bg-gradient-to-br from-blue-500 to-indigo-600" },
    { label: "Hours Learned", value: "12.4", icon: <Clock className="text-white" size={20} />, trend: "85% of goal", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
    { label: "Points Earned", value: "1,250", icon: <Award className="text-white" size={20} />, trend: "Top 10%", bg: "bg-gradient-to-br from-orange-400 to-red-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400"
          >
            Welcome back, Learner! 👋
          </motion.h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
            You have completed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 font-bold">65%</span> of your weekly goal. Keep it up!
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl">
            <Sparkles size={16} className="mr-2 text-blue-600" />
            AI Recommendations
          </Button>
          <Link to="/courses">
            <Button size="sm" className="rounded-xl">Browse Courses</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-soft"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${stat.bg}`}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full flex items-center uppercase tracking-wider border border-green-200 dark:border-green-500/20">
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
          <Link to="/courses" className="text-sm font-semibold text-blue-600 hover:text-orange-500 transition-colors flex items-center gap-1 group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? [1,2].map(i => <div key={i} className="h-40 bg-neutral-100 dark:bg-neutral-800 rounded-3xl animate-pulse" />) :
          courses.slice(0, 2).map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-neutral-900 rounded-[2rem] p-6 border border-neutral-200 dark:border-neutral-800 shadow-soft hover:shadow-elevated hover:border-indigo-500/30 flex flex-col sm:flex-row gap-6 transition-all"
            >
              <div className="w-full sm:w-40 h-28 rounded-2xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800 relative group">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-400 transition-all">{course.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Lesson: Advanced AI Implementation</p>
                <div className="mt-auto">
                  <ProgressBar progress={course.progress} size="sm" showLabel />
                </div>
              </div>
              <div className="sm:self-center">
                <Link to={`/watch/${course.id}`}>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 text-white flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <Play size={20} fill="currentColor" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
         <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">Recommended for You</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? [1,2,3].map(i => <SkeletonCard key={i} />) :
            courses.map(course => (
              <div key={course.id} className="bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 group shadow-soft hover:shadow-elevated hover:border-indigo-500/30 transition-all flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 uppercase tracking-widest border border-neutral-200 dark:border-neutral-800 shadow-sm">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-neutral-500 dark:text-neutral-400">
                     <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-indigo-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{course.students}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-orange-400" fill="currentColor" />
                        <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">{course.rating}</span>
                     </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6 line-clamp-2 h-12 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-orange-400 transition-all">{course.title}</h3>
                  <div className="mt-auto">
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-orange-400 hover:text-white hover:border-transparent transition-all">Course Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default Dashboard;