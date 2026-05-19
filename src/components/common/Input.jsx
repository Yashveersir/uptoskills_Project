import React from "react";

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = "", 
  containerClassName = "", 
  id, 
  icon: Icon,
  rightElement,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

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
          className={`
            block w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 
            bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm text-neutral-900 dark:text-neutral-50
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            transition-all duration-200 ease-in-out shadow-sm
            focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${Icon ? "pl-11" : ""}
            ${rightElement ? "pr-12" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
