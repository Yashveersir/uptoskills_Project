import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings,
  Heart,
  Clock,
  Award
} from "lucide-react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

const DashboardLayout = () => {
  const menuItems = [
    { label: "Overview", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { label: "My Courses", icon: <BookOpen size={20} />, path: "/courses" },
    { label: "Wishlist", icon: <Heart size={20} />, path: "/dashboard/wishlist" },
    { label: "Learning History", icon: <Clock size={20} />, path: "/dashboard/history" },
    { label: "Certificates", icon: <Award size={20} />, path: "/dashboard/certificates" },
    { label: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar menuItems={menuItems} baseTitle="Learner Dashboard" exitPath="/" />

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

export default DashboardLayout;
