import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import Hero from './components/sections/Hero';
import AboutMe from './components/sections/AboutMe';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import { observeWebVitals, throttle } from './utils/performance';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  // Global scroll management and section detection with performance optimization
  const handleScroll = useCallback(throttle(() => {
    if (isScrolling) return;

    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact', 'blog'];
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, 100), [isScrolling]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, []);

  // Set up scroll listener and performance monitoring
  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'development') {
      observeWebVitals();
    }

    // Optimized scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set active section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ErrorBoundary fallbackMessage="Something went wrong with the portfolio. Please refresh the page.">
      <div className="min-h-screen bg-slate-900 text-gray-100 overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        <ErrorBoundary fallbackMessage="Navigation failed to load.">
          <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
        </ErrorBoundary>
        
        <main id="main-content" role="main" className="relative">
          <ErrorBoundary fallbackMessage="Hero section failed to load.">
            <div id="hero">
              <Hero />
            </div>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="About section failed to load.">
            <section 
              id="about" 
              className="py-20 px-4"
              aria-label="About me section"
            >
              <AboutMe />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Skills section failed to load.">
            <section 
              id="skills" 
              className="py-20 px-4"
              aria-label="Technical skills section"
            >
              <Skills />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Projects section failed to load.">
            <section 
              id="projects" 
              className="py-20 px-4"
              aria-label="Portfolio projects section"
            >
              <Projects />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Experience section failed to load.">
            <section 
              id="experience" 
              className="py-20 px-4"
              aria-label="Professional experience section"
            >
              <Experience />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Certifications section failed to load.">
            <section 
              id="certifications" 
              className="py-20 px-4"
              aria-label="Professional certifications section"
            >
              <Certifications />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Contact section failed to load.">
            <section 
              id="contact" 
              className="py-20 px-4"
              aria-label="Contact information section"
            >
              <Contact />
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary fallbackMessage="Blog section failed to load.">
            <section 
              id="blog" 
              className="py-20 px-4"
              aria-label="Blog section"
            >
              <Blog />
            </section>
          </ErrorBoundary>
        </main>
        
        <ErrorBoundary fallbackMessage="Footer failed to load.">
          <Footer />
        </ErrorBoundary>
        
        <ErrorBoundary fallbackMessage="Back to top button failed to load.">
          <BackToTop />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;
