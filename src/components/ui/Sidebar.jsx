import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ menuItems = [], baseTitle = "Panel", exitPath = "/" }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  // Default menu items if none provided
  const items = menuItems.length > 0 ? menuItems : [
    { label: "Overview", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-24 left-6 z-50">
        <button 
          onClick={toggleMobileSidebar}
          className="p-3 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-20 bottom-0 z-40 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          
          {/* Collapse Toggle (Desktop) */}
          <button 
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full items-center justify-center text-neutral-400 hover:text-primary-600 shadow-sm z-50"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Header */}
          <div className={`mb-8 px-2 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center text-primary-600">
              <LayoutDashboard size={20} />
            </div>
            {!isCollapsed && (
              <span className="font-display font-bold text-neutral-900 dark:text-neutral-50 truncate">
                {baseTitle}
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 outline-none ${
                    isActive 
                      ? "bg-primary-500 text-white dark:bg-primary-500/20 dark:text-primary-400 shadow-md shadow-primary-500/20 dark:shadow-none" 
                      : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50"
                  }`}
                >
                  <div className={`${isActive ? "text-white dark:text-primary-400" : "text-neutral-400 group-hover:text-primary-600"}`}>
                    {item.icon}
                  </div>
                  
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}

                  {isActive && !isCollapsed && (
                    <motion.div 
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white dark:bg-primary-400" 
                    />
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer / Exit */}
          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Link 
              to={exitPath}
              className={`flex items-center gap-3 p-3 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="text-sm font-medium">Exit</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileSidebar}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
