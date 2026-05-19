import { motion } from "framer-motion";
import { Users, BookOpen, UserPlus, CheckCircle, AlertTriangle, Activity, Plus, FileText, CheckSquare, Clock, ArrowUpRight } from "lucide-react";
import Button from "../../components/common/Button";

const AdminOverview = () => {
  // New 6 KPIs based on UI/UX Enhancement Guide
  const stats = [
    { label: "Total Active Users", value: "2,543", icon: Users, accentColor: "border-status-success", bgLight: "bg-status-success/10", iconColor: "text-status-success" },
    { label: "Total Courses", value: "48", icon: BookOpen, accentColor: "border-secondary-500", bgLight: "bg-secondary-500/10", iconColor: "text-secondary-500" },
    { label: "Enrollments This Week", value: "156", icon: UserPlus, accentColor: "border-primary-500", bgLight: "bg-primary-500/10", iconColor: "text-primary-500" },
    { label: "Course Completion %", value: "68%", icon: CheckCircle, accentColor: "border-status-success", bgLight: "bg-status-success/10", iconColor: "text-status-success" },
    { label: "Pending Approvals", value: "12", icon: AlertTriangle, accentColor: "border-status-error", bgLight: "bg-status-error/10", iconColor: "text-status-error" },
    { label: "System Health", value: "Optimal", icon: Activity, accentColor: "border-status-success", bgLight: "bg-status-success/10", iconColor: "text-status-success" },
  ];

  const recentActivities = [
    { id: 1, user: "Ayan Khan", action: "enrolled in", target: "CSS Mastery", time: "2 mins ago" },
    { id: 2, user: "Sarah Smith", action: "completed", target: "Python for Data Science", time: "15 mins ago" },
    { id: 3, user: "John Admin", action: "updated", target: "Course permissions", time: "1 hour ago" },
    { id: 4, user: "Rahul Sharma", action: "joined", target: "the platform", time: "3 hours ago" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="p-8 md:p-12 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">Admin Dashboard</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Welcome back. Here is your system overview.</p>
      </header>

      {/* 6 KPI Metric Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className={`bg-white dark:bg-neutral-900 border-l-4 ${stat.accentColor} border-y border-r border-y-neutral-200 border-r-neutral-200 dark:border-y-neutral-800 dark:border-r-neutral-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-neutral-500 dark:text-neutral-400 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
              <div className={`${stat.bgLight} p-2 rounded-md`}>
                <stat.icon className={stat.iconColor} size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        <motion.button variants={itemVariants} className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-95">
          <Plus size={18} />
          New Course
        </motion.button>
        <motion.button variants={itemVariants} className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-95">
          <Plus size={18} />
          New Intern
        </motion.button>
        <motion.button variants={itemVariants} className="flex items-center justify-center gap-2 bg-transparent border-2 border-secondary-500 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 font-medium py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95">
          <CheckSquare size={18} />
          Approve Pending
        </motion.button>
        <motion.button variants={itemVariants} className="flex items-center justify-center gap-2 bg-transparent border-2 border-secondary-500 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 font-medium py-3 px-6 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95">
          <FileText size={18} />
          View Reports
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">Platform Performance</h2>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Performance Analytics Chart Placeholder</p>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-6">Recent Activity</h2>
          <div className="space-y-5">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                <div>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-snug">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">{activity.user}</span> {activity.action} <span className="text-secondary-600 dark:text-secondary-400 font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-neutral-400">
                    <Clock size={12} />
                    <span className="text-[10px] font-medium uppercase">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-xs font-semibold text-primary-500 group">
            View All Activity
            <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;