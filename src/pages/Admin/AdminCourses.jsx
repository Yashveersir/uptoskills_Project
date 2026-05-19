import { useState, useEffect, useCallback } from "react";
import { getCourses } from "../../api/courseApi";
import { mentors } from "../../constants/mentorData";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    teacherId: mentors[0].id
  });

  const fetchCourses = useCallback(async () => {
    try {
      const data = await getCourses();
      const enhancedData = data.map(c => ({
        ...c,
        status: c.id % 3 === 0 ? "Pending" : "Live",
        enrollment: "1.2k"
      }));
      setCourses(enhancedData);
    } catch (err) {
      console.error("Error:", err);
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
      enrollment: "0",
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

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
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

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-soft">
        <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-96">
            <Input 
              type="text" 
              placeholder="Search courses or mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background-header dark:bg-neutral-800/30">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 w-12">
                  <input type="checkbox" className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                </th>
                <th className="px-4 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Course Content</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">AI Mentor</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-neutral-700">Enrollment ↕</th>
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
              ) : filteredCourses.map((course) => (
                <motion.tr layout key={course.id} className="hover:bg-primary-50 dark:hover:bg-neutral-800/40 transition-colors group">
                  <td className="px-8 py-6">
                    <input type="checkbox" className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={course.image} 
                          alt="" 
                          className="w-14 h-14 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
                          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"}
                        />
                        {course.status === "Pending" && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                            <AlertCircle size={10} className="text-neutral-900 dark:text-neutral-50" />
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
                  <td className="px-8 py-6 text-sm text-neutral-900 dark:text-neutral-50 font-bold">{course.enrollment}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      course.status === "Live" 
                        ? "bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                        : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {course.status === "Pending" && (
                        <button 
                          onClick={() => handleApprove(course.id)}
                          className="p-2.5 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-all"
                          title="Approve Course"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 hover:bg-primary-500/10 text-neutral-400 hover:text-primary-600 transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 hover:bg-red-500/10 text-neutral-400 hover:text-red-600 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredCourses.length === 0 && !loading && (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-4">
                <BookOpen size={48} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">No Courses Found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md">We couldn't find any courses matching your current filters or search query. Try adjusting them or create a new course.</p>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                + Create Course
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">Create AI Course</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-400 hover:text-primary-600 transition-colors">
                    <X size={24} />
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
                      <CheckCircle2 className="absolute right-4 top-[2.4rem] text-status-success" size={18} />
                    )}
                    {formData.title.length === 0 && (
                       <p className="text-xs text-status-error mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12}/> Title is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 ml-1">Curriculum Overview <span className="text-status-error">*</span></label>
                    <textarea 
                      required
                      placeholder="What will students learn in this course?"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/50 border focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 h-32 resize-none ${formData.description.length > 10 ? 'border-status-success' : 'border-neutral-200 dark:border-neutral-800'}`}
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
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 ml-1">AI Mentor</label>
                      <div className="relative">
                        <select 
                          value={formData.teacherId}
                          onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-neutral-900 dark:text-neutral-50 text-sm appearance-none cursor-pointer"
                        >
                          {mentors.map(m => (
                            <option key={m.id} value={m.id} className="bg-white dark:bg-neutral-900">{m.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl shadow-xl shadow-primary-500/20 font-bold">Launch AI Course</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCourses;