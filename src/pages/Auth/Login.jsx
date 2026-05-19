import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    await login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 py-12 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 md:p-10 shadow-card"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6 shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">AI Learn</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Sign in to continue your AI learning journey
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

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <div className="space-y-1">
            <div className="flex justify-between mb-1 ml-1">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          <Button 
            type="submit" 
            variant="primary"
            isLoading={loading} 
            className="w-full py-4 text-base"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
              Create one for free
            </Link>
          </p>
        </div>

        {/* Demo Credentials Helper */}
        <div className="mt-8 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2 text-center">Demo Access</p>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
              <span>User: demo@gmail.com</span>
              <span className="font-mono">123456</span>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
              <span>Admin: admin@gmail.com</span>
              <span className="font-mono">admin123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
