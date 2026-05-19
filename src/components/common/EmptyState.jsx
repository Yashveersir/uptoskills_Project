import { FolderOpen } from "lucide-react";

const EmptyState = ({ 
  title = "No data found", 
  desc = "There's nothing to show here at the moment.",
  icon: Icon = FolderOpen,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-6 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900/30">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h2 className="mb-2 text-xl font-medium text-neutral-900 dark:text-neutral-50">{title}</h2>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{desc}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
