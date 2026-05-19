import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-950 px-6 text-center relative overflow-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10rem] md:text-[15rem] font-display font-black leading-none text-neutral-100 dark:text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          404
        </span>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6 relative">
          Lost in <span className="font-serif italic font-normal text-primary-500">Digital Space</span>
        </h1>
        
        <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md mx-auto mb-10 leading-relaxed relative">
          The module or lesson you're looking for doesn't exist. Our AI couldn't synthesize this page for you.
        </p>

        <Link to="/" className="relative z-10">
          <Button variant="primary" size="lg" className="px-10">
            Return to Learning
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
