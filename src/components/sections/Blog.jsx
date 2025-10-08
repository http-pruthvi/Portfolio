import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  staggerContainer, 
  fadeInUp,
  scaleIn,
  createResponsiveVariants,
  floating,
  pulse
} from '../../utils/animations';

const Blog = () => {
  const { elementRef, isVisible, prefersReducedMotion } = useScrollAnimation(0.3);

  // Create responsive animation variants
  const containerVariants = createResponsiveVariants(staggerContainer)(prefersReducedMotion);
  const fadeInVariants = createResponsiveVariants(fadeInUp)(prefersReducedMotion);
  const cardVariants = createResponsiveVariants(scaleIn)(prefersReducedMotion);

  return (
    <section 
      id="blog" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-800"
      ref={elementRef}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Section Title */}
          <motion.div variants={fadeInVariants}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                Blog
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-accent-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Coming Soon Content */}
          <motion.div 
            variants={fadeInVariants}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-accent-400 opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-accent-400 opacity-30"></div>
            
            <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/30 shadow-2xl">
              <motion.div 
                variants={fadeInVariants}
                className="space-y-6"
              >
                {/* Main Coming Soon Message */}
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  Coming Soon: Insights, Tutorials & AI Experiments
                </h3>
                
                {/* Subtitle */}
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  I'm preparing to share my journey through code, creativity, and curiosity. 
                  Stay tuned for deep dives into AI projects, development tutorials, and 
                  experimental tech adventures.
                </p>

                {/* Future Content Preview */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    variants={cardVariants}
                    className="bg-primary-700/30 rounded-lg p-4 border border-gray-600/20"
                    whileHover={!prefersReducedMotion ? { 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <motion.div 
                      className="text-accent-400 text-2xl mb-2"
                      {...(!prefersReducedMotion ? floating : {})}
                    >
                      🤖
                    </motion.div>
                    <h4 className="text-white font-medium mb-1">AI Insights</h4>
                    <p className="text-gray-400 text-sm">Machine learning experiments and discoveries</p>
                  </motion.div>
                  
                  <motion.div 
                    variants={cardVariants}
                    className="bg-primary-700/30 rounded-lg p-4 border border-gray-600/20"
                    whileHover={!prefersReducedMotion ? { 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <motion.div 
                      className="text-accent-400 text-2xl mb-2"
                      {...(!prefersReducedMotion ? pulse : {})}
                    >
                      💻
                    </motion.div>
                    <h4 className="text-white font-medium mb-1">Dev Tutorials</h4>
                    <p className="text-gray-400 text-sm">Step-by-step guides and best practices</p>
                  </motion.div>
                  
                  <motion.div 
                    variants={cardVariants}
                    className="bg-primary-700/30 rounded-lg p-4 border border-gray-600/20"
                    whileHover={!prefersReducedMotion ? { 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <motion.div 
                      className="text-accent-400 text-2xl mb-2"
                      {...(!prefersReducedMotion ? floating : {})}
                    >
                      🔬
                    </motion.div>
                    <h4 className="text-white font-medium mb-1">Tech Experiments</h4>
                    <p className="text-gray-400 text-sm">Exploring cutting-edge technologies</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Notification Signup Placeholder */}
          <motion.div 
            variants={fadeInVariants}
            className="mt-8"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">Building something amazing...</span>
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          {/* Playful Message */}
          <motion.div 
            variants={fadeInVariants}
            className="mt-6"
          >
            <p className="text-gray-400 italic text-base font-light">
              "Great content is brewing... like good coffee, it takes time ☕"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;