import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this content.",
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6 bg-red-50/30 dark:bg-red-900/10 rounded-[2.5rem] border border-dashed border-red-200 dark:border-red-900/30">
      <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-6 border border-red-100 dark:border-red-900/20">
        <AlertCircle size={32} strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-display font-bold mb-2 text-neutral-900 dark:text-neutral-50">{title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm mb-8 leading-relaxed">{message}</p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
