// Performance monitoring utilities

// Measure component render time
export const measureRenderTime = (componentName) => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // More than one frame (16ms at 60fps)
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    };
  }
  
  return () => {}; // No-op in production
};

// Debounce function for performance optimization
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

// Throttle function for performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  // Use throttled callback to prevent excessive calls
  const throttledCallback = throttle(callback, 100);

  return new IntersectionObserver(throttledCallback, defaultOptions);
};

// Memory usage monitoring (development only)
export const monitorMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = performance.memory;
    
    console.log('Memory Usage:', {
      used: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    });
  }
};

// Bundle size analyzer helper
export const logBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // This would typically be used with webpack-bundle-analyzer
    console.log('Bundle analysis available in development mode');
  }
};

// Preload critical resources
export const preloadResource = (href, as = 'script', crossorigin = null) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  
  document.head.appendChild(link);
};

// Lazy load non-critical CSS
export const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  
  document.head.appendChild(link);
};

// Performance observer for Core Web Vitals
export const observeWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log('LCP:', lastEntry.startTime);
      }
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('CLS:', clsValue);
      }
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }
  }
};

// React performance profiler wrapper
export const withProfiler = (Component, id) => {
  if (process.env.NODE_ENV === 'development') {
    // Dynamic import to avoid build issues
    return Component; // Simplified for now
  }
  
  return Component;
};

// Image optimization helpers
export const getOptimizedImageUrl = (url, width, height, quality = 80) => {
  // This would typically integrate with an image optimization service
  // For now, return the original URL
  return url;
};

export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Web Vitals monitoring (using dynamic import to reduce bundle size)
export const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  }
};

// Performance observer for monitoring
export const observePerformance = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Monitor Long Tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime
          });
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Longtask observer not supported
  }
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    console.log('Service Worker registered successfully:', registration.scope);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') {
    return;
  }

  // Start performance observation
  observePerformance();
  
  // Register service worker
  registerServiceWorker();
  
  // Report web vitals
  reportWebVitals((metric) => {
    console.log('Web Vital:', metric);
  });
};