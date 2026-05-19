import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings 
} from "lucide-react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

const AdminLayout = () => {
  const menuItems = [
    { label: "Overview", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { label: "Courses", icon: <BookOpen size={20} />, path: "/admin/courses" },
    { label: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { label: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
    { label: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar menuItems={menuItems} baseTitle="Admin Panel" exitPath="/" />

        {/* Main Content */}
        <main className="flex-1 lg:pl-64 transition-all duration-300">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
