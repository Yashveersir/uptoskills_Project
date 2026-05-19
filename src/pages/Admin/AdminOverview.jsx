import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowUpRight, BookOpen, CheckCircle, CheckSquare, Clock, FileText, Plus, ShieldCheck, UserPlus, Users } from "lucide-react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { adminClasses } from "../../designTokens";

const metrics = [
  { label: "Total Users", value: "2,543", detail: "+12.8% vs last week", icon: Users, tone: "border-status-success text-status-success bg-status-success/10" },
  { label: "Total Courses", value: "48", detail: "7 pending review", icon: BookOpen, tone: "border-secondary-500 text-secondary-600 bg-secondary-500/10" },
  { label: "Enrollments This Week", value: "156", detail: "31 from campaigns", icon: UserPlus, tone: "border-primary-500 text-primary-600 bg-primary-500/10" },
  { label: "Completion Rate", value: "68%", detail: "+4.2% improvement", icon: CheckCircle, tone: "border-status-success text-status-success bg-status-success/10" },
  { label: "Pending Approvals", value: "12", detail: "Needs action today", icon: AlertTriangle, tone: "border-status-warning text-status-warning bg-status-warning/10" },
  { label: "System Health", value: "99.9%", detail: "All services online", icon: Activity, tone: "border-status-info text-status-info bg-status-info/10" },
];

const quickActions = [
  { label: "New Course", icon: Plus, variant: "primary" },
  { label: "New Intern", icon: UserPlus, variant: "primary" },
  { label: "Approve Pending", icon: CheckSquare, variant: "outline" },
  { label: "View Reports", icon: FileText, variant: "outline" },
];

const recentActivities = [
  { id: 1, user: "Ayan Khan", action: "enrolled in CSS Mastery", time: "2 mins ago" },
  { id: 2, user: "Sarah Smith", action: "completed Python for Data Science", time: "15 mins ago" },
  { id: 3, user: "John Admin", action: "approved Frontend Foundations", time: "1 hour ago" },
  { id: 4, user: "Rahul Sharma", action: "joined the intern cohort", time: "3 hours ago" },
];

const AdminOverview = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={adminClasses.label}>Online learning operations</p>
          <h1 className={`${adminClasses.heading} mt-2`}>Admin Dashboard</h1>
          <p className={`${adminClasses.body} mt-2`}>Monitor platform health, approvals, courses, and learner momentum from one workspace.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-status-success/20 bg-status-success/10 px-4 py-3 text-sm font-medium text-status-success">
          <ShieldCheck size={18} />
          Role: Super Admin
        </div>
      </header>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
              <Card interactive className={`border-l-4 p-5 ${metric.tone}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={adminClasses.label}>{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-normal text-neutral-900 dark:text-neutral-50">{metric.value}</p>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{metric.detail}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${metric.tone}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button key={action.label} variant={action.variant} size="lg" className="w-full">
              <Icon size={18} />
              {action.label}
            </Button>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">Platform Performance</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Weekly enrollment and completion trend</p>
            </div>
            <Button variant="ghost" size="sm">
              Details
              <ArrowUpRight size={16} />
            </Button>
          </div>
          <div className="flex h-72 items-end gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950/40">
            {[54, 72, 61, 86, 78, 92, 88].map((height, index) => (
              <div key={height} className="flex flex-1 flex-col justify-end gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="rounded-t-md bg-primary-500/80"
                />
                <span className="text-center text-xs text-neutral-400">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">Recent Activity</h2>
          <div className="mt-6 space-y-5">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="mt-2 h-2 w-2 rounded-full bg-primary-500" />
                <div>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{activity.user}</p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{activity.action}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminOverview;
