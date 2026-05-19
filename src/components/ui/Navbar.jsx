import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import Button from "../common/Button";
import ThemeToggle from "../common/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, LogOut, BookOpen, Settings, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const exploreRef = useRef(null);
  const profileRef = useRef(null);

  const { isAuthenticated, role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    ...(isAuthenticated ? [
      { label: "Courses", path: "/courses" },
      { label: "Dashboard", path: "/dashboard" },
    ] : []),
  ];

  const exploreCategories = [
    { label: "Python Development", icon: <BookOpen size={16} /> },
    { label: "MERN Stack", icon: <BookOpen size={16} /> },
    { label: "AI & Machine Learning", icon: <BookOpen size={16} /> },
    { label: "UI/UX Design", icon: <BookOpen size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 transition-transform group-hover:rotate-12">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              AI <span className="text-primary-600">Learn</span>
            </h1>
          </Link>

          {/* Explore Dropdown */}
          <div className="hidden lg:block relative" ref={exploreRef}>
            <button 
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isExploreOpen 
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10" 
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              Explore
              <ChevronDown size={16} className={`transition-transform duration-300 ${isExploreOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 overflow-hidden"
                >
                  <div className="p-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 px-4">
                    Top Categories
                  </div>
                  {exploreCategories.map((cat) => (
                    <button
                      key={cat.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-primary-600">
                        {cat.icon}
                      </div>
                      {cat.label}
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <Link 
                      to="/courses" 
                      onClick={() => setIsExploreOpen(false)}
                      className="block px-4 py-3 text-center text-sm font-semibold text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors"
                    >
                      View All Courses
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex gap-2 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.path 
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10" 
                    : "text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-neutral-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden md:block mx-2" />

          {/* Theme Toggle & Auth */}
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all"
                >
                  <User size={20} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 overflow-hidden"
                    >
                      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 mb-2">
                        <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 truncate">
                          {user?.name || "Learner Account"}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                          {user?.email || (role === "admin" ? "Administrator" : "Student")}
                        </p>
                      </div>

                      <Link 
                        to={role === "admin" ? "/admin" : "/dashboard"}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        {role === "admin" ? "Admin Panel" : "Dashboard"}
                      </Link>

                      <Link 
                        to={role === "admin" ? "/admin/settings" : "/dashboard/settings"} 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Settings size={16} />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hidden sm:flex rounded-xl">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="rounded-xl shadow-lg shadow-primary-500/20">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;