import { motion } from "framer-motion";
import { Users, BookOpen, CheckCircle, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import Button from "../../components/common/Button";

const AdminOverview = () => {
  const stats = [
    { label: "Total Users", value: "2,543", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+12.5%" },
    { label: "Active Courses", value: "48", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+3.2%" },
    { label: "Pending Approvals", value: "12", icon: CheckCircle, color: "text-amber-400", bg: "bg-amber-500/10", trend: "-2.4%" },
    { label: "Revenue", value: "$12,840", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10", trend: "+18.7%" },
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
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">Admin Dashboard</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Welcome back, here's what's happening today.</p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="bg-white dark:bg-neutral-900 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xl shadow-black/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-white dark:bg-neutral-900 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 shadow-xl shadow-black/20"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">Platform Performance</h2>
            <Button variant="outline" size="sm" className="text-xs">View Report</Button>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl bg-white/5">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm italic">Performance Analytics Chart Placeholder</p>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-neutral-900 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 shadow-xl shadow-black/20"
        >
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-accent-500 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                <div>
                  <p className="text-sm text-neutral-900 dark:text-neutral-50 leading-snug">
                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="text-accent-400 font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-neutral-500 dark:text-neutral-400">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-10 text-xs font-bold uppercase tracking-widest text-primary-400 group">
            View All Activity
            <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;