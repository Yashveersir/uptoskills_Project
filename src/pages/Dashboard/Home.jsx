import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Button from "../../components/common/Button";
import Features from "../../components/ui/Features";
import { mentors } from "../../constants/mentorData";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 overflow-hidden bg-neutral-50 dark:bg-neutral-900/20">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="text-center max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10 border border-primary-100 dark:border-primary-500/20 shadow-sm">
              AI-Powered Skill Transformation
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.95] mb-10 tracking-tighter text-neutral-900 dark:text-neutral-50"
          >
            Master skills with <br />
            <span className="block font-serif italic font-normal text-primary-500">
              AI Virtual Mentors
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Immerse yourself in a world-class educational experience. Learn from virtual personas of icons like Shah Rukh Khan & Deepika Padukone, powered by elite AI technology.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 rounded-2xl">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 rounded-2xl">
                    Explore Courses
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/courses">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 rounded-2xl">
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 rounded-2xl">
                    Start for Free
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <Features />

      {/* ================= MENTORS SHOWCASE ================= */}
      <section className="py-24 px-6 bg-white dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 mb-4 inline-block">
                Virtual AI Personas
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                Learn from the <span className="text-primary-500">Legendary Icons</span>
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                Experience high-pedagogical standards through high-fidelity virtual avatars of world-renowned icons. Elite training, redesigned.
              </p>
            </div>
            <Link to="/courses">
               <Button variant="ghost" className="group text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl">
                 Explore All Programs 
                 <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
               </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    Active AI Persona
                  </div>
                </div>
                <div className="p-8">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-500 mb-2">{mentor.role}</p>
                   <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{mentor.name}</h3>
                   <div className="h-1 w-8 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4 transition-all group-hover:w-full group-hover:bg-primary-500/30" />
                   <p className="text-xs text-neutral-400">World-Class Instruction</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 px-6">
         <div className="max-w-6xl mx-auto rounded-[3.5rem] bg-neutral-900 dark:bg-neutral-900 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-neutral-900/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight tracking-tight">
               {isAuthenticated ? "Accelerate Your Career Today" : "Ready to launch your corporate career?"}
            </h2>
            
            <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
               {isAuthenticated 
                 ? "Continue your journey and stay ahead with the latest industry skills curated by world-class AI experts."
                 : "Join thousands of successful candidates who transformed their skills with our elite AI-powered training."
               }
            </p>

            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
               <Button variant="primary" size="lg" className="px-12 py-5 text-lg hover:scale-105 transition-all rounded-2xl">
                  {isAuthenticated ? "Go to Dashboard" : "Enroll Now for Free"}
               </Button>
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;