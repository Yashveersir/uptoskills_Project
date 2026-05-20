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
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  const getPasswordScore = (password) => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return checks.filter(Boolean).length;
  };

  const nameValid = formData.name.trim().length >= 2;
  const emailValid = validateEmail(formData.email);
  const passwordScore = getPasswordScore(formData.password);
  const passwordValid = passwordScore >= 3;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setTouched({ name: true, email: true, password: true });

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordValid) {
      setError("Password is too weak. Use 8+ chars with upper, number, and symbol.");
      return;
    }

    await register(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 py-12"
    >
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 md:p-10 shadow-card">
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
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            icon={User}
            isValid={formData.name.length > 0 && nameValid}
            error={touched.name && formData.name.length > 0 && !nameValid ? "Name must be at least 2 characters." : ""}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            icon={Mail}
            isValid={formData.email.length > 0 && emailValid}
            error={touched.email && formData.email.length > 0 && !emailValid ? "Enter a valid email address." : ""}
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              icon={Lock}
              isValid={formData.password.length > 0 && passwordValid}
              error={touched.password && formData.password.length > 0 && !passwordValid ? "Too weak. See requirements below." : ""}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            {/* Password Strength Meter */}
            <div className="mt-2 grid grid-cols-4 gap-1" aria-label="Password strength">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    formData.password.length === 0 
                      ? "bg-neutral-200 dark:bg-neutral-800" 
                      : passwordScore >= step 
                        ? step < 3 ? "bg-status-warning" : "bg-status-success" 
                        : "bg-neutral-200 dark:bg-neutral-800"
                  }`} 
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {[
                { label: "8+ characters", met: formData.password.length >= 8 },
                { label: "Uppercase letter", met: /[A-Z]/.test(formData.password) },
                { label: "Number", met: /[0-9]/.test(formData.password) },
                { label: "Special char", met: /[^A-Za-z0-9]/.test(formData.password) },
              ].map((req) => (
                <span 
                  key={req.label} 
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    req.met ? "text-status-success" : "text-neutral-400"
                  }`}
                >
                  {req.met ? "✓" : "○"} {req.label}
                </span>
              ))}
            </div>
          </div>

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
      </div>
    </motion.div>
  );
};

export default Register;
