import { useState, useEffect, useCallback, useMemo } from "react";
import { getCourses } from "../../api/courseApi";
import { mentors } from "../../constants/mentorData";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import ErrorState from "../../components/common/ErrorState";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, CheckCircle2, AlertCircle, ChevronDown, Filter, MoreVertical, Archive, Download } from "lucide-react";
import toast from "react-hot-toast";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Table Enhancements State
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    teacherId: mentors[0].id
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getCourses();
      const enhancedData = data.map((c, index) => ({
        ...c,
        id: c.id || index + 1,
        status: index % 3 === 0 ? "Pending" : "Live",
        enrollment: Math.floor(Math.random() * 5000), // Numeric for sorting
      }));
      setCourses(enhancedData);
    } catch (err) {
      console.error("Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const selectedMentor = mentors.find(m => m.id === formData.teacherId);
    
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      teacher: selectedMentor.name,
      status: "Live",
      enrollment: 0,
      availableMentors: mentors.map(m => m.id)
    };

    setCourses([newCourse, ...courses]);
    setIsModalOpen(false);
    setFormData({ title: "", description: "", image: "", teacherId: mentors[0].id });
    toast.success("New AI course created successfully!");
  };

  const handleApprove = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: "Live" } : c));
    toast.success("Course approved and is now live!");
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = useMemo(() => {
    let sortableCourses = [...courses];
    if (sortConfig !== null) {
      sortableCourses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableCourses;
  }, [courses, sortConfig]);

  const filteredCourses = sortedCourses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCourses.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === currentRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentRows.map(c => c.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm("Are you sure you want to delete the selected courses?")) {
      setCourses(courses.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      toast.success("Selected courses deleted.");
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto pt-10">
         <ErrorState onRetry={fetchCourses} title="Unable to Load Courses" message="We encountered an error connecting to the server. Please try again." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2 tracking-tight">Course Management</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Review, approve, and organize platform content.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2 rounded-2xl py-3.5 px-8 shadow-xl shadow-primary-500/20" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create New Course
        </Button>
      </header>

      {/* Table Container */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        
        {/* Toolbar */}
        <div className="p-6 md:px-8 md:py-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-96">
            <Input 
              type="text" 
              placeholder="Search courses or mentors..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              icon={Search}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <Filter size={16} /> Filters
            </Button>
          </div>
        </div>

        {/* Bulk Actions Banner */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-50 dark:bg-primary-500/10 border-b border-primary-100 dark:border-primary-500/20 px-8 py-3 flex justify-between items-center overflow-hidden"
            >
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{selectedIds.length} course(s) selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white text-xs gap-1"><Download size={14}/> Export</Button>
                <Button variant="outline" size="sm" className="bg-white text-xs gap-1"><Archive size={14}/> Archive</Button>
                <Button variant="danger" size="sm" className="text-xs gap-1" onClick={handleBulkDelete}><Trash2 size={14}/> Delete</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-background-header dark:bg-neutral-800/30 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer" 
                    checked={currentRows.length > 0 && selectedIds.length === currentRows.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('title')}>
                  Course Content {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('teacher')}>
                  AI Mentor {sortConfig.key === 'teacher' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('enrollment')}>
                  Enrollment {sortConfig.key === 'enrollment' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="w-4 h-4 bg-neutral-100 dark:bg-neutral-800 rounded" /></td>
                    <td className="px-4 py-6 flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-4 w-48 bg-neutral-100 dark:bg-neutral-800 rounded" />
                        <div className="h-3 w-24 bg-neutral-100 dark:bg-neutral-800 rounded" />
                      </div>
                    </td>
                    <td className="px-8 py-6"><div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded" /></td>
                    <td className="px-8 py-6"><div className="h-4 w-12 bg-neutral-100 dark:bg-neutral-800 rounded" /></td>
                    <td className="px-8 py-6"><div className="h-6 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full" /></td>
                    <td className="px-8 py-6 text-right"><div className="h-4 w-4 bg-neutral-100 dark:bg-neutral-800 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : currentRows.map((course) => (
                <motion.tr layout key={course.id} className={`hover:bg-primary-50 dark:hover:bg-neutral-800/40 transition-colors group ${selectedIds.includes(course.id) ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
                  <td className="px-8 py-6">
                    <input 
                      type="checkbox" 
                      className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                      checked={selectedIds.includes(course.id)}
                      onChange={() => toggleSelect(course.id)} 
                    />
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"} 
                          alt="" 
                          className="w-14 h-14 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
                        />
                        {course.status === "Pending" && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-status-warning rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                            <AlertCircle size={10} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-1 group-hover:text-primary-600 transition-colors">{course.title}</p>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.15em]">AI-Powered Curriculum</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{course.teacher}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-neutral-900 dark:text-neutral-50 font-bold">{course.enrollment.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      course.status === "Live" 
                        ? "bg-status-success/10 text-status-success border-status-success/20"
                        : "bg-status-warning/10 text-status-warning border-status-warning/20"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {course.status === "Pending" && (
                        <button 
                          onClick={() => handleApprove(course.id)}
                          className="p-2.5 rounded-xl bg-status-success/10 border border-status-success/20 hover:bg-status-success/20 text-status-success transition-all"
                          title="Approve Course"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      
                      {/* Three Dot Menu Placeholder */}
                      <div className="relative group/menu">
                         <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 hover:bg-primary-500/10 text-neutral-400 hover:text-primary-600 transition-all focus-visible:ring-2 focus-visible:ring-primary-500 outline-none">
                            <MoreVertical size={16} />
                         </button>
                         {/* Simple CSS-only dropdown for demo */}
                         <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 origin-top-right transform scale-95 group-hover/menu:scale-100">
                            <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"><Edit2 size={14}/> Edit Course</button>
                            <button className="w-full text-left px-4 py-2 text-sm text-status-error hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2" onClick={() => { setCourses(courses.filter(c => c.id !== course.id)); toast.success("Course deleted"); }}><Trash2 size={14}/> Delete</button>
                         </div>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {filteredCourses.length === 0 && !loading && (
            <div className="py-24 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-4 text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                 <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">No Courses Found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm text-sm">We couldn't find any courses matching your search or filters. Try adjusting them or create a new course.</p>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                + Create Course
              </Button>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {!loading && filteredCourses.length > 0 && (
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-neutral-50/50 dark:bg-neutral-800/20">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing <span className="font-bold text-neutral-900 dark:text-neutral-100">{indexOfFirstRow + 1}</span> to <span className="font-bold text-neutral-900 dark:text-neutral-100">{Math.min(indexOfLastRow, filteredCourses.length)}</span> of <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredCourses.length}</span> results
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE MODAL (Unchanged functionality, matching design tokens) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Create AI Course</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 outline-none">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateCourse} className="space-y-6">
                  <div className="relative">
                    <Input 
                      required
                      label="Course Title"
                      type="text" 
                      placeholder="e.g. Mastering Modern Frontend"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={formData.title.length > 0 ? "border-status-success" : ""}
                    />
                    {formData.title.length > 0 && (
                      <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute right-4 top-[2.4rem] text-status-success">
                         <CheckCircle2 size={18} />
                      </motion.div>
                    )}
                    {formData.title.length === 0 && (
                       <p className="text-xs text-status-error mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12}/> Title is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3 ml-1">Curriculum Overview <span className="text-status-error">*</span></label>
                    <textarea 
                      required
                      placeholder="What will students learn in this course?"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className={`w-full px-5 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border focus:ring-2 focus:ring-primary-500 outline-none transition-all text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 h-32 resize-none ${formData.description.length > 10 ? 'border-status-success' : 'border-neutral-200 dark:border-neutral-800'}`}
                    />
                     {formData.description.length > 0 && formData.description.length <= 10 && (
                       <p className="text-xs text-status-error mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12}/> Description must be at least 10 characters</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Cover Image URL"
                      type="url" 
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      icon={ImageIcon}
                    />
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3 ml-1">AI Mentor</label>
                      <div className="relative">
                        <select 
                          value={formData.teacherId}
                          onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-neutral-900 dark:text-neutral-50 text-sm appearance-none cursor-pointer"
                        >
                          {mentors.map(m => (
                            <option key={m.id} value={m.id} className="bg-white dark:bg-neutral-900">{m.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3 justify-end border-t border-neutral-100 dark:border-neutral-800 mt-8">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="primary" className="shadow-md">Launch Course</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminCourses;