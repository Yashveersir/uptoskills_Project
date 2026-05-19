import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ShieldCheck, Send } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Fake API delay
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      toast.success("Security link dispatched successfully.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl"
      >
        <div className="mb-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
          
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 border border-primary-100 dark:border-primary-900/30">
             <ShieldCheck size={32} className="text-primary-600 dark:text-primary-400" />
          </div>

          <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 mb-3 tracking-tight">
            Secure Recovery
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
            {isSent 
              ? "We've sent a recovery link to your inbox. Please check your email to proceed."
              : "Enter the email associated with your account and we'll send a secure link to reset your password."
            }
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-medium flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {error}
          </motion.div>
        )}

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Registered Email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
            />

            <Button 
              type="submit" 
              variant="primary"
              isLoading={loading} 
              className="w-full py-4 text-base rounded-2xl"
            >
              <Send size={18} className="mr-2" />
              Send Recovery Link
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
             <div className="p-6 rounded-2xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10 text-center">
                <p className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                  Check <span className="text-neutral-900 dark:text-white">{email}</span> for the link.
                </p>
             </div>
             <Button variant="outline" className="w-full py-4 rounded-2xl border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400" onClick={() => setIsSent(false)}>
               Resend Email
             </Button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Need further assistance? <a href="#" className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
