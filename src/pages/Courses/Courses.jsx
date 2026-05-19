import { useState, useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import CourseCard from "../../components/ui/CourseCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import EmptyState from "../../components/common/EmptyState";
import Input from "../../components/common/Input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, LayoutGrid, BookOpen, Compass } from "lucide-react";

const Courses = () => {
  const { courses, loading, getCourses } = useCourses();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch courses via hook
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  // Filter Logic
  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                         course.teacher.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || course.type === activeTab;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;

    return matchesSearch && matchesTab && matchesLevel && matchesCategory;
  });

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All Categories", "Development", "Design"];
  const tabs = [
    { name: "All", icon: LayoutGrid },
    { name: "Course", icon: BookOpen },
    { name: "Learning Path", icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pb-20 transition-colors duration-300">

      {/* ================= HERO ================= */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-neutral-900 dark:text-neutral-50 tracking-tight">
              Master Your <span className="text-primary-500">Future</span>
            </h1>

            <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Unlock your potential with industry-leading courses taught by AI-powered mentors. From design to development, we've got you covered.
            </p>

            <Input
              type="text"
              icon={Search}
              placeholder="What do you want to learn today?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              containerClassName="max-w-2xl mx-auto"
              className="py-5 text-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </motion.div>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          {/* Tabs */}
          <div className="flex bg-neutral-50 dark:bg-neutral-900 p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 outline-none ${
                  activeTab === tab.name 
                    ? "bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700" 
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
                }`}
              >
                <tab.icon size={16} />
                {tab.name === "Course" ? "Courses" : tab.name}
              </button>
            ))}
          </div>

          {/* Filters Toggle & Results Count */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="text-sm font-medium text-neutral-400">
              Showing <span className="text-neutral-900 dark:text-neutral-50 font-bold">{filteredCourses.length}</span> results
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-bold text-sm focus-visible:ring-2 focus-visible:ring-primary-500 outline-none ${
                showFilters 
                  ? "bg-primary-500 text-white border-primary-500 dark:bg-primary-500 dark:text-white dark:border-primary-500" 
                  : "bg-transparent text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 pb-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Difficulty Level</label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all focus-visible:ring-2 focus-visible:ring-primary-500 outline-none ${
                          selectedLevel === level 
                            ? "bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-500/10 dark:border-primary-500/30 dark:text-primary-400" 
                            : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all focus-visible:ring-2 focus-visible:ring-primary-500 outline-none ${
                          selectedCategory === category 
                            ? "bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-500/10 dark:border-primary-500/30 dark:text-primary-400" 
                            : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <EmptyState 
            title="No courses found"
            desc="Try adjusting your search or filters to find what you're looking for."
            action={
              <button 
                onClick={() => {
                  setSearch("");
                  setActiveTab("All");
                  setSelectedLevel("All Levels");
                  setSelectedCategory("All Categories");
                }}
                className="text-primary-600 font-bold hover:underline transition-all text-sm focus-visible:ring-2 focus-visible:ring-primary-500 outline-none rounded"
              >
                Reset all filters
              </button>
            }
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
