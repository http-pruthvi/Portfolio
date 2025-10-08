import { useState, useEffect, useRef } from 'react';
// Import useReducedMotion from animations utils
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return false;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export function useScrollAnimation(threshold = 0.1, rootMargin = '0px', options = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    
    const {
        once = true,
        delay = 0,
        triggerOnce = true
    } = options;

    useEffect(() => {
        // If reduced motion is preferred, show immediately
        if (prefersReducedMotion) {
            setIsVisible(true);
            setHasAnimated(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (triggerOnce && hasAnimated) return;
                    
                    if (delay > 0) {
                        setTimeout(() => {
                            setIsVisible(true);
                            if (once) setHasAnimated(true);
                        }, delay);
                    } else {
                        setIsVisible(true);
                        if (once) setHasAnimated(true);
                    }
                } else if (!once && !triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin, hasAnimated, once, delay, triggerOnce, prefersReducedMotion]);

    const reset = () => {
        setIsVisible(false);
        setHasAnimated(false);
    };

    return {
        elementRef,
        isVisible,
        hasAnimated,
        prefersReducedMotion,
        reset
    };
}
