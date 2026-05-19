import { motion } from "framer-motion";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  isLoading = false,
  ...props 
}) => {
  // Added focus-visible for accessibility, min-h-[44px] for touch targets
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:pointer-events-none rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 outline-none min-h-[44px]";
  
  const variants = {
    // Updated primary to use design token color (orange)
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md shadow-primary-500/20",
    // Special gradient variant for unique cases
    gradient: "bg-gradient-to-r from-blue-600 via-indigo-500 to-primary-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20",
    accent: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-md shadow-secondary-500/10", // Accent is now teal
    secondary: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700",
    outline: "border-2 border-secondary-500 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/30", // Teal outline
    ghost: "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-500 dark:hover:text-primary-400",
    danger: "bg-status-error text-white hover:bg-red-600 shadow-md shadow-red-500/10",
    white: "bg-white text-neutral-900 hover:bg-neutral-50 shadow-md",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs min-h-[36px]", // smaller touch target for sm
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : children}
    </motion.button>
  );
};

export default Button;