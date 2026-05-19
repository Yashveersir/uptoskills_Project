import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    await register(formData);
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
            Create Account
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Join the elite community of AI-powered learners
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

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Alex Johnson"
            value={formData.name}
            onChange={handleChange}
            icon={User}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
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

          <div className="pt-2">
            <Button 
              type="submit" 
              variant="primary"
              isLoading={loading} 
            className="w-full py-4 text-base"
            >
              Get Started
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
