import { useState, useEffect, useRef, useCallback } from 'react';

export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false
  } = options;

  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const frozen = useRef(false);

  const updateEntry = useCallback((entries) => {
    const [entry] = entries;
    
    if (frozen.current && !entry.isIntersecting) {
      return;
    }

    setEntry(entry);
    setIsVisible(entry.isIntersecting);

    if (freezeOnceVisible && entry.isIntersecting) {
      frozen.current = true;
    }
  }, [freezeOnceVisible]);

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current || !node) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, updateEntry]);

  const reset = useCallback(() => {
    frozen.current = false;
    setEntry(null);
    setIsVisible(false);
  }, []);

  return {
    elementRef,
    entry,
    isVisible,
    reset
  };
}
