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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 md:p-10 shadow-card"
      >
        <div className="mb-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
          
          <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6 border border-primary-100 dark:border-primary-900/30">
             <ShieldCheck size={32} className="text-primary-600 dark:text-primary-400" />
          </div>

          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-3 tracking-tight">
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
            className="bg-status-error/10 border border-status-error/20 text-status-error p-4 rounded-lg mb-6 text-sm font-medium flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-status-error" />
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
              className="w-full py-4 text-base"
            >
              <Send size={18} className="mr-2" />
              Send Recovery Link
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
             <div className="p-6 rounded-lg bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10 text-center">
                <p className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                  Check <span className="text-neutral-900 dark:text-white">{email}</span> for the link.
                </p>
             </div>
             <Button variant="outline" className="w-full py-4 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400" onClick={() => setIsSent(false)}>
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
