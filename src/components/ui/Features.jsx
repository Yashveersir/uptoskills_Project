import { motion } from "framer-motion";
import { Sparkles, Users, Video, Zap, Shield, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Industry-Led Training",
      description: "Our curriculum is designed by corporate experts to ensure you learn exactly what the industry demands today.",
      icon: <Video className="text-primary-600 dark:text-primary-400" />,
      color: "bg-primary-50 dark:bg-primary-900/40"
    },
    {
      title: "Placement Assistance",
      description: "We don't just teach; we help you get placed. Our network of 500+ corporate partners is waiting for skilled candidates like you.",
      icon: <Users className="text-secondary-600 dark:text-secondary-400" />,
      color: "bg-secondary-50 dark:bg-secondary-900/40"
    },
    {
      title: "Hands-on Projects",
      description: "Build a professional portfolio with real-world projects that demonstrate your expertise to potential employers.",
      icon: <Zap className="text-orange-600 dark:text-orange-400" />,
      color: "bg-orange-50 dark:bg-orange-900/40"
    },
    {
      title: "AI-Powered Learning",
      description: "Experience personalized learning paths that adapt to your pace, ensuring you master every concept thoroughly.",
      icon: <Sparkles className="text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-50 dark:bg-blue-900/40"
    },
    {
      title: "Verified Certifications",
      description: "Earn industry-recognized certificates that add significant value to your resume and LinkedIn profile.",
      icon: <Shield className="text-primary-600 dark:text-primary-400" />,
      color: "bg-primary-50 dark:bg-primary-900/40"
    },
    {
      title: "Global Community",
      description: "Join a vibrant community of learners and mentors from around the world, fostering collaboration and growth.",
      icon: <Globe className="text-secondary-600 dark:text-secondary-400" />,
      color: "bg-secondary-50 dark:bg-secondary-900/40"
    }
  ];

  return (
    <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-600 dark:text-secondary-500 mb-4 inline-block"
          >
            The Platform
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white"
          >
            Redefining the <span className="font-serif italic font-normal text-primary-500">Learning Experience</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-secondary-500/30 hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
