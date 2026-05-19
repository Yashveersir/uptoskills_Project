import { BarChart3, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, LineChart, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const AdminAnalytics = () => {
  const stats = [
    { label: "Total Revenue", value: "$45,231", trend: "+12.5%", isUp: true, icon: <DollarSign size={20} /> },
    { label: "Active Students", value: "2,845", trend: "+18.2%", isUp: true, icon: <Users size={20} /> },
    { label: "Course Completion", value: "86%", trend: "-2.4%", isUp: false, icon: <TrendingUp size={20} /> },
    { label: "Platform Rating", value: "4.9", trend: "+0.1%", isUp: true, icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2 tracking-tight">Performance Analytics</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Real-time insights into platform growth and learner engagement.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-900 p-8 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 shadow-soft"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${
                stat.isUp 
                  ? "text-green-600 bg-green-50 dark:bg-green-500/10" 
                  : "text-red-600 bg-red-50 dark:bg-red-500/10"
              }`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-[2.5rem] p-10 border border-neutral-200 dark:border-neutral-800 shadow-soft">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-3">
               <LineChart size={24} className="text-primary-500" />
               Enrollment Growth
            </h3>
            <select className="bg-neutral-50 dark:bg-neutral-800 border-none rounded-xl px-4 py-2 text-xs font-bold text-neutral-500 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 35, 80, 55, 90, 70, 45, 60, 35, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="bg-gradient-to-t from-blue-600/20 to-orange-400/20 dark:from-blue-600/10 dark:to-orange-400/10 rounded-t-lg group-hover:from-blue-600 group-hover:to-orange-400 transition-all cursor-pointer border-t-2 border-orange-400/50"
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h*12} Learners
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <span key={m} className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-10 border border-neutral-200 dark:border-neutral-800 shadow-soft">
          <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-10 flex items-center gap-3">
             <PieChart size={24} className="text-accent-500" />
             Categories
          </h3>
          <div className="space-y-8">
            {[
              { label: "MERN Stack", percent: 85, color: "bg-blue-500" },
              { label: "Python Dev", percent: 65, color: "bg-orange-500" },
              { label: "AI & ML", percent: 45, color: "bg-purple-500" },
              { label: "UI/UX Design", percent: 30, color: "bg-pink-500" },
            ].map(cat => (
              <div key={cat.label}>
                <div className="flex justify-between text-xs font-bold mb-3">
                  <span className="text-neutral-600 dark:text-neutral-300 uppercase tracking-widest">{cat.label}</span>
                  <span className="text-neutral-400">{cat.percent}%</span>
                </div>
                <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    className={`h-full ${cat.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
