import { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Loading component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center py-12"
  >
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </motion.div>
);

// Error fallback component
const ErrorFallback = ({ error, retry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center py-12"
  >
    <div className="text-center max-w-md">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Failed to load component
      </h3>
      <p className="text-gray-600 mb-4">
        Something went wrong while loading this section.
      </p>
      {retry && (
        <button
          onClick={retry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  </motion.div>
);

// Higher-order component for lazy loading
export const withLazyLoading = (
  importFunc,
  fallbackComponent = LoadingSpinner,
  errorComponent = ErrorFallback
) => {
  const LazyComponent = lazy(importFunc);

  return function WrappedLazyComponent(props) {
    return (
      <Suspense fallback={<fallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Lazy loading wrapper component
const LazyComponentWrapper = ({ 
  children, 
  fallback = <LoadingSpinner />,
  errorFallback = <ErrorFallback />,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Intersection Observer based lazy loading
export const LazySection = ({ 
  children, 
  fallback = <LoadingSpinner />,
  threshold = 0.1,
  rootMargin = '100px',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasLoaded(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div ref={elementRef}>
      {(isVisible || hasLoaded) ? children : fallback}
    </div>
  );
};

export { LoadingSpinner, ErrorFallback };
export default LazyComponentWrapper;