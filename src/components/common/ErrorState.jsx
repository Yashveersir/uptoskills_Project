import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this content.",
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-status-error/30 bg-status-error/5 px-6 py-16 text-center dark:bg-status-error/10">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-status-error/20 bg-white text-status-error shadow-sm dark:bg-neutral-800">
        <AlertCircle size={32} strokeWidth={1.5} />
      </div>
      <h2 className="mb-2 text-xl font-medium text-neutral-900 dark:text-neutral-50">{title}</h2>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{message}</p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="border-status-error/30 text-status-error hover:bg-status-error/10"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
