import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { mentors } from "../../constants/mentorData";
import { Play, Sparkles, ChevronRight, X, Loader2 } from "lucide-react";
import { getCourseById } from "../../api";

const WatchCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState(localStorage.getItem(`notes-${id}`) || "");
  const [selectedMentor, setSelectedMentor] = useState(mentors[0]);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showMentorSwitch, setShowMentorSwitch] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const data = await getCourseById(id);
        setCourse(data);
        if (data.lessons && data.lessons.length > 0) {
          const normalizedLessons = data.lessons.map((lesson) => ({
            ...lesson,
            video: lesson.video || lesson.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4",
            duration: lesson.duration || "15:00",
            description: lesson.description || "No description provided for this lesson.",
          }));
          setLessons(normalizedLessons);
          
          const saved = localStorage.getItem(`lesson-${id}`);
          let initialLesson = null;
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              initialLesson = normalizedLessons.find((lesson) => lesson.id === parsed.id);
            } catch {
              localStorage.removeItem(`lesson-${id}`);
            }
          }
          setCurrentLesson(initialLesson || normalizedLessons[0]);
        } else {
          // Fallback to static mock lessons if course has no lessons yet
          const fallbackLessons = [
            {
              id: 1,
              title: "01. Introduction to the Masterclass",
              duration: "12:45",
              video: "https://www.w3schools.com/html/mov_bbb.mp4",
              description: "In this opening lesson, your AI mentor introduces the core concepts and the roadmap for your journey ahead."
            },
            {
              id: 2,
              title: "02. Core Principles & Philosophy",
              duration: "18:20",
              video: "https://www.w3schools.com/html/movie.mp4",
              description: "Deep dive into the underlying philosophy and industry-standard principles that drive success in this field."
            }
          ];
          setLessons(fallbackLessons);
          setCurrentLesson(fallbackLessons[0]);
        }

        if (data.teacher) {
          const matched = mentors.find(
            (m) => m.name.toLowerCase() === data.teacher.toLowerCase()
          );
          if (matched) {
            setSelectedMentor(matched);
          }
        }
      } catch (err) {
        console.error("Failed to load course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
       if (isSaving) setIsSaving(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSaving]);

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem(`notes-${id}`, e.target.value);
    setIsSaving(true);
  };

  const handleMentorSwitch = (mentor) => {
    setSelectedMentor(mentor);
    setShowMentorSwitch(false);
    setIsVideoLoading(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
          <span className="font-bold tracking-widest uppercase text-xs text-neutral-500">Loading course...</span>
        </div>
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 p-6">
        <p className="text-xl font-bold mb-4">Course not found or has no content</p>
        <Button to="/" variant="primary">Return Home</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      
      {/* Main Content Area (Video & Info) */}
      <div className="flex-1 overflow-y-auto">
        <div className="aspect-video w-full bg-black relative group">
          <video
            key={`${currentLesson.id}-${selectedMentor.id}`}
            src={currentLesson.video}
            controls
            autoPlay
            onLoadedData={() => setIsVideoLoading(false)}
            onLoadStart={() => setIsVideoLoading(true)}
            className="w-full h-full object-contain"
          />
          
          <AnimatePresence>
            {isVideoLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10"
              >
                <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-primary-500 rounded-full animate-spin mb-4" />
                <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Switching AI Persona...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Persona Badge */}
          <div className="absolute top-6 right-6 z-20">
            <motion.div 
              layout
              className="px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 flex items-center gap-3 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 animate-pulse" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-none mb-1">AI Persona Active</p>
                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-50 leading-none">{selectedMentor.name}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          {/* AI Notice Section */}
          <div className="mb-10 p-6 rounded-[2rem] bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20 flex flex-col md:flex-row items-center gap-6">
             <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-primary-600 shadow-sm">
                <Sparkles size={24} />
             </div>
             <div className="flex-1">
               <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-1 uppercase tracking-wider">AI-Generated Persona</p>
               <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                 The visuals and voice of <span className="text-neutral-900 dark:text-neutral-50 font-bold">{selectedMentor.name}</span> are synthesized using proprietary AI models. 
                 Educational content is curated for high-fidelity pedagogy.
               </p>
             </div>
             <Button 
               variant="outline" 
               size="sm" 
               className="rounded-xl font-bold"
               onClick={() => setShowMentorSwitch(true)}
             >
               Switch Teacher
             </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600">Module 01</span>
                <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-xs text-neutral-500 font-bold uppercase">Lesson {lessons.findIndex(l => l.id === currentLesson.id) + 1 || 1} of {lessons.length}</span>
              </div>
              <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                {currentLesson.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-display font-bold mb-4 text-neutral-900 dark:text-neutral-50">Lesson Overview</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-lg mb-12">
                {currentLesson.description}
              </p>

              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] p-10 border border-neutral-200 dark:border-neutral-800 shadow-soft">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50">Quick Notes</h3>
                  {isSaving && (
                    <span className="text-[10px] uppercase font-bold text-primary-600 animate-pulse tracking-widest">Synced to Cloud</span>
                  )}
                </div>
                <textarea
                  value={notes}
                  onChange={handleNoteChange}
                  placeholder="Capture key insights from your mentor..."
                  className="w-full h-48 bg-white dark:bg-neutral-950 rounded-2xl p-6 text-neutral-900 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all resize-none leading-relaxed shadow-sm"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Your Mentor</h3>
                <motion.div 
                  key={selectedMentor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-soft overflow-hidden relative group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-primary-500/10" />
                  
                  <div className="flex items-center gap-5 mb-6">
                    <img 
                      src={selectedMentor.image} 
                      alt={selectedMentor.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
                    />
                    <div>
                      <p className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 leading-tight">{selectedMentor.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mt-1">{selectedMentor.role}</p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 italic">
                    "{selectedMentor.description}"
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-tighter">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6 rounded-xl font-bold"
                  onClick={() => setShowMentorSwitch(true)}
                >
                  Explore Other Mentors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-full lg:w-96 bg-neutral-50 dark:bg-neutral-900/30 border-l border-neutral-200 dark:border-neutral-800 flex flex-col">
        <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-transparent">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-4">Curriculum</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-bold uppercase">Progress</span>
              <span className="text-xs text-primary-600 font-bold">25%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => {
                setCurrentLesson(lesson);
                localStorage.setItem(`lesson-${id}`, JSON.stringify(lesson));
                setIsVideoLoading(true);
              }}
              className={`w-full group p-5 rounded-2xl transition-all flex items-start gap-4 border text-left ${
                currentLesson.id === lesson.id
                  ? "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-800 shadow-sm"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800/50 border-transparent"
              }`}
            >
              <div className={`mt-1 w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-all ${
                currentLesson.id === lesson.id 
                  ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 text-white shadow-lg shadow-primary-500/20" 
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700"
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold mb-1 transition-colors ${
                  currentLesson.id === lesson.id ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200"
                }`}>
                  {lesson.title.includes(". ") ? lesson.title.split('. ')[1] : lesson.title}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Play size={10} className={currentLesson.id === lesson.id ? "text-primary-600" : "text-neutral-400"} fill="currentColor" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{lesson.duration}</span>
                  </div>
                </div>
              </div>
              {currentLesson.id === lesson.id && (
                <ChevronRight size={16} className="text-primary-600 self-center" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Switch Overlay */}
      <AnimatePresence>
        {showMentorSwitch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          >
            <div 
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-xl" 
              onClick={() => setShowMentorSwitch(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-5xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
              <div className="p-10 md:p-16">
                <button onClick={() => setShowMentorSwitch(false)} className="absolute top-8 right-8 p-3 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-neutral-400">
                  <X size={24} />
                </button>

                <div className="text-center mb-16">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600 mb-4 inline-block">Elite Personalization</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-4">Choose Your Virtual Mentor</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                    Switch teacher personas instantly. Our AI will seamlessly re-generate the educational experience with your chosen icon's voice and appearance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mentors.map((mentor) => (
                    <button
                      key={mentor.id}
                      onClick={() => handleMentorSwitch(mentor)}
                      className={`group p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden flex flex-col ${
                        selectedMentor.id === mentor.id
                          ? "bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-900/30"
                          : "bg-neutral-50 dark:bg-neutral-900/50 border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-5 mb-6">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name}
                          className={`w-16 h-16 rounded-2xl object-cover transition-all duration-700 ${
                            selectedMentor.id === mentor.id ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                          }`}
                        />
                        <div>
                          <p className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-lg">{mentor.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600">{mentor.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 flex-1">
                        {mentor.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.slice(0, 2).map(skill => (
                          <span key={skill} className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.1em] px-2 py-1 bg-white dark:bg-neutral-800 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                      {selectedMentor.id === mentor.id && (
                        <div className="absolute top-4 right-4">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchCourse;
