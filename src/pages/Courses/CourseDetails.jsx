import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import Button from "../../components/common/Button";
import { motion } from "framer-motion";
import { Clock, BarChart, Star, Users, CheckCircle2, PlayCircle, Globe, Award, ShieldCheck } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const { courses, selectedCourse: course, loading, getCourses, getCourseById } = useCourses();

  useEffect(() => {
    if (courses.length === 0) {
      getCourses();
    } else {
      getCourseById(Number(id));
    }
  }, [id, courses.length, getCourses, getCourseById]);

  if (loading || (!course && courses.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-neutral-500 dark:text-neutral-400 font-display font-medium animate-pulse">Initializing course environment...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6">
        <div className="w-24 h-24 bg-white dark:bg-neutral-900 rounded-3xl flex items-center justify-center mb-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
           <Globe className="text-neutral-500 dark:text-neutral-400" size={48} />
        </div>
        <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-4">Course not found</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 text-center max-w-md">The course you are looking for might have been moved, deleted, or you might have followed a broken link.</p>
        <Link to="/courses">
          <Button variant="primary" size="lg">Explore Other Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-32">
      {/* ================= HERO HEADER ================= */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <div className="absolute inset-0 -z-10">
           <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-20 blur-sm dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 via-neutral-50 to-neutral-50 dark:from-neutral-950/80 dark:via-neutral-950 dark:to-neutral-950" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-600 dark:text-secondary-400 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                {course.type}
              </span>
              <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <BarChart size={14} className="text-primary-500" />
                {course.level}
              </span>
              <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <Globe size={14} className="text-primary-500" />
                English
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-bold text-neutral-900 dark:text-neutral-50 max-w-5xl mb-10 leading-[1.1] tracking-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-primary-500/30 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
                   <img src={course.image} alt={course.teacher} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-0.5">Instructor</p>
                  <p className="text-neutral-900 dark:text-neutral-50 font-bold">{course.teacher}</p>
                </div>
              </div>

              <div className="h-10 w-px bg-neutral-300 dark:bg-neutral-700 hidden md:block" />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-status-warning fill-status-warning" />
                  <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">{course.rating}</span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-secondary-500" />
                  <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">{course.students}</span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Students</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* ================= MAIN CONTENT ================= */}
        <div className="lg:col-span-2 space-y-16">
          <section>
            <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-8 flex items-center gap-3">
              About this course
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-xl leading-relaxed font-light">
              {course.description}
            </p>
          </section>

          <section className="p-8 md:p-10 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-card">
            <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-8">What you'll master</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Comprehensive understanding of core concepts",
                "Advanced implementation strategies",
                "Industry-standard best practices",
                "Hands-on architectural design",
                "Performance optimization techniques",
                "Real-world problem solving"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-status-success/10 border border-status-success/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={14} className="text-status-success" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-8">Curriculum</h3>
             <div className="space-y-4">
                {[
                  { title: "Introduction & Setup", lessons: "4 Lessons", duration: "45m" },
                  { title: "Core Fundamentals", lessons: "8 Lessons", duration: "2h 15m" },
                  { title: "Advanced Techniques", lessons: "12 Lessons", duration: "3h 30m" },
                  { title: "Final Project & Certification", lessons: "2 Lessons", duration: "1h 00m" }
                ].map((module, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30 hover:shadow-md focus-within:ring-2 focus-within:ring-primary-500 transition-all cursor-pointer outline-none">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 transition-colors">
                             {i + 1}
                          </div>
                          <div>
                             <h4 className="text-neutral-900 dark:text-neutral-50 font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{module.title}</h4>
                             <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold mt-1">{module.lessons} • {module.duration}</p>
                          </div>
                       </div>
                       <PlayCircle size={20} className="text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* ================= SIDEBAR / CTA ================= */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-32"
          >
            <div className="p-8 md:p-10 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5">
                 <Award size={120} className="text-primary-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50">Free</div>
                  <div className="px-3 py-1 rounded-lg bg-status-success/10 text-status-success text-[10px] font-bold uppercase tracking-widest border border-status-success/20">
                    Open Access
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                    <Clock size={18} className="text-primary-500" />
                    <span className="text-sm font-medium"><span className="text-neutral-900 dark:text-neutral-50 font-bold">{course.duration}</span> of high-quality content</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                    <Award size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">Professional Certificate</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                    <ShieldCheck size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">Lifetime access to updates</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                    <PlayCircle size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">Access on mobile and TV</span>
                  </div>
                </div>

                <Link to={`/watch/${course.id}`} className="block mb-6 focus:outline-none">
                  <Button variant="primary" className="w-full py-5 text-lg shadow-xl shadow-primary-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500" size="lg">
                    Enroll for Free
                  </Button>
                </Link>

                <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Join {course.students} Students
                </p>
              </div>
            </div>

            <div className="mt-8 p-8 rounded-lg bg-secondary-50 dark:bg-secondary-900/10 border border-secondary-100 dark:border-secondary-900/20 text-center shadow-sm">
               <p className="text-secondary-600 dark:text-secondary-400 text-xs font-bold uppercase tracking-widest mb-2">100% Satisfaction Guarantee</p>
               <p className="text-neutral-500 dark:text-neutral-400 text-[10px] leading-relaxed">Risk-free learning with our curated AI-driven masterclass curriculum.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
