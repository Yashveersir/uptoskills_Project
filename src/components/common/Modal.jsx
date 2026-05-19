import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6" role="presentation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizes[size]} overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-overlay dark:border-neutral-800 dark:bg-neutral-900`}
          >
            <header className="flex items-start justify-between gap-4 border-b border-neutral-200 p-6 dark:border-neutral-800">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-xl font-medium text-neutral-900 dark:text-neutral-50">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Close modal" className="px-2">
                <X size={18} />
              </Button>
            </header>
            <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
            {footer && (
              <footer className="flex flex-col-reverse gap-3 border-t border-neutral-200 p-6 dark:border-neutral-800 sm:flex-row sm:justify-end">
                {footer}
              </footer>
            )}
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
