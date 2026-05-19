import { Link } from "react-router-dom";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { Clock, BarChart, Star, Users, ArrowRight } from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-primary-600 text-[10px] font-bold uppercase tracking-widest shadow-sm border border-neutral-200 dark:border-neutral-800">
            {course.type || "Free Access"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4">
           <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-wider border border-white/10">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm">
             <img src={course.image} alt={course.teacher} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {course.teacher}
          </p>
        </div>

        <h2 className="text-xl font-display font-bold mb-4 text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight h-14">
          {course.title}
        </h2>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            <Clock size={14} className="text-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            <BarChart size={14} className="text-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            <Users size={14} className="text-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{course.students}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-50">{course.rating}</span>
            <span className="text-[10px] font-bold text-neutral-400 tracking-tighter">({course.reviews})</span>
          </div>

          <Link to={`/courses/${course.id}`}>
            <Button variant="outline" size="sm" className="group/btn gap-2 rounded-xl text-xs">
              View Details
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
