import { FolderOpen } from "lucide-react";

const EmptyState = ({ 
  title = "No data found", 
  desc = "There's nothing to show here at the moment.",
  icon: Icon = FolderOpen,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6 bg-neutral-50 dark:bg-neutral-900/30 rounded-[2.5rem] border border-dashed border-neutral-200 dark:border-neutral-800">
      <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 dark:text-neutral-400 shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-display font-bold mb-2 text-neutral-900 dark:text-neutral-50">{title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm mb-8 leading-relaxed">{desc}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;