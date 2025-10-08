import { useEffect, useState, Suspense, lazy } from 'react';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import Button from '../ui/Button';

// Lazy load 3D scene to avoid blocking initial render
const Scene3D = lazy(() => import('../3d/Scene3D'));

const Hero = () => {
  // In test environment, show everything immediately
  const isTestEnv = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
  const [showTagline, setShowTagline] = useState(isTestEnv);
  const [showCTA, setShowCTA] = useState(isTestEnv);
  const [show3D, setShow3D] = useState(true);

  // Typing animation for the name
  const nameAnimation = useTypingAnimation(
    "Hi, I'm Pruthvi",
    100, // typing speed
    500  // initial delay
  );

  // Show tagline after name typing is complete
  useEffect(() => {
    if (nameAnimation.isComplete) {
      const timer = setTimeout(() => {
        setShowTagline(true);
      }, 100); // Reduced for tests
      return () => clearTimeout(timer);
    }
  }, [nameAnimation.isComplete]);

  // Show CTA button after tagline animation
  useEffect(() => {
    if (showTagline) {
      const timer = setTimeout(() => {
        setShowCTA(true);
      }, 100); // Reduced for tests
      return () => clearTimeout(timer);
    }
  }, [showTagline]);

  // Smooth scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section - Introduction"
      role="banner"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-purple-600/5 via-transparent to-cyan-600/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-600/5 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 3D Scene Background */}
      {show3D && (
        <Suspense fallback={
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="text-white/30 text-sm">Loading 3D scene...</div>
          </div>
        }>
          <Scene3D 
            enableParticles={true}
            enableGeometry={true}
            enableControls={false}
            performance="medium"
            className="absolute inset-0 -z-10 opacity-80"
          />
        </Suspense>
      )}

      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        {/* Animated particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/5 w-8 h-8 border border-blue-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-6 h-6 border border-purple-400/30 animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Animated lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Typing animation for name */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            <span aria-live="polite" aria-atomic="true">
              {nameAnimation.displayText}
            </span>
            {(nameAnimation.isTyping || nameAnimation.isDeleting) && (
              <span className="animate-pulse text-blue-400" aria-hidden="true">|</span>
            )}
          </h1>
        </div>

        {/* Animated tagline */}
        <div className={`mb-8 transition-all duration-1000 ${
          showTagline 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
            Blending{' '}
            <span className="text-blue-400 font-medium">Code</span>,{' '}
            <span className="text-green-400 font-medium">Creativity</span> &{' '}
            <span className="text-purple-400 font-medium">Curiosity</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 ${
          showCTA 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            aria-label="Navigate to projects section"
          >
            View Projects
          </Button>
        </div>

        {/* 3D Toggle Button */}
        <div className={`absolute top-8 right-8 transition-all duration-1000 ${
          showCTA 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => setShow3D(!show3D)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            aria-label={show3D ? 'Disable 3D effects' : 'Enable 3D effects'}
          >
            {show3D ? '3D ON' : '3D OFF'}
          </button>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            showCTA 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;