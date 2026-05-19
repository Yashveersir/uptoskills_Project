import React, { useId } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { adminClasses } from "../../designTokens";

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = "", 
  containerClassName = "", 
  id, 
  icon: Icon,
  rightElement,
  isValid,
  helperText,
  ...props 
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedBy = error || helperText ? `${inputId}-feedback` : undefined;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`
            block w-full rounded-lg border border-neutral-200 dark:border-neutral-800 
            bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm text-neutral-900 dark:text-neutral-50
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            transition-all duration-200 ease-in-out shadow-sm
            focus:border-primary-500
            disabled:cursor-not-allowed disabled:opacity-50
            ${Icon ? "pl-11" : ""}
            ${rightElement || isValid || error ? "pr-12" : ""}
            ${adminClasses.focus}
            ${error ? "border-status-error focus:border-status-error focus:ring-status-error/20" : ""}
            ${isValid ? "border-status-success focus:border-status-success focus:ring-status-success/20" : ""}
            ${className}
          `}
          {...props}
        />
        {isValid && !rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-status-success">
            <CheckCircle2 size={18} aria-hidden="true" />
          </div>
        )}
        {error && !rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-status-error">
            <AlertCircle size={18} aria-hidden="true" />
          </div>
        )}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p id={describedBy} className={`mt-1 text-xs ${error ? "text-status-error" : "text-neutral-500 dark:text-neutral-400"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
