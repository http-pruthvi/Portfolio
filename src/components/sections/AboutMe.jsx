import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AboutMe = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  const fadeInVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
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
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-accent-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            variants={fadeInVariants}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-accent-400 opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-accent-400 opacity-30"></div>
            
            <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/30 shadow-2xl">
              <motion.p 
                variants={fadeInVariants}
                className="text-lg md:text-xl leading-relaxed text-gray-300 font-light"
              >
                Hey! I'm{' '}
                <span className="text-accent-400 font-semibold">Pruthvi</span>, a Computer Engineering student exploring all things tech. 
                From{' '}
                <span className="text-accent-300 font-medium">AI projects</span>{' '}
                and{' '}
                <span className="text-accent-300 font-medium">web/mobile development</span>{' '}
                to{' '}
                <span className="text-accent-300 font-medium">system-level software</span>{' '}
                and{' '}
                <span className="text-accent-300 font-medium">blockchain experiments</span>, 
                I'm always curious, learning, and turning ideas into digital reality.
              </motion.p>
            </div>
          </motion.div>

          {/* Fun Elements */}
          <motion.div 
            variants={fadeInVariants}
            className="flex justify-center items-center space-x-8 mt-12"
          >
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">Currently exploring</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">Always learning</span>
            </div>
          </motion.div>

          {/* Playful Quote */}
          <motion.div 
            variants={fadeInVariants}
            className="mt-8"
          >
            <blockquote className="text-gray-400 italic text-base font-light">
              "Code is poetry, bugs are just... creative interpretations 🐛✨"
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;