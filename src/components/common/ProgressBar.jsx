import { motion } from "framer-motion";

const ProgressBar = ({ progress, size = "md", color = "primary", showLabel = false }) => {
  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colors = {
    primary: "bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400",
    accent: "bg-accent-500",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Progress</span>
          <span className="text-xs font-bold text-neutral-900 dark:text-white">{progress}%</span>
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
