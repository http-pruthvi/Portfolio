import { useState, useEffect, useRef } from 'react';

export function useTypingAnimation(
  text = '',
  speed = 100,
  delay = 0,
  loop = false,
  deleteSpeed = 50,
  deleteDelay = 1000
) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!text) return;

    const startTyping = () => {
      setIsTyping(true);
      setIsDeleting(false);
      setCurrentIndex(0);
      setDisplayText('');
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping && !isDeleting) return;

    const typeCharacter = () => {
      if (isDeleting) {
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
          timeoutRef.current = setTimeout(typeCharacter, deleteSpeed);
        } else {
          setIsDeleting(false);
          if (loop) {
            setTimeout(() => {
              setIsTyping(true);
            }, 500);
          }
        }
      } else {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
          timeoutRef.current = setTimeout(typeCharacter, speed);
        } else {
          setIsTyping(false);
          if (loop) {
            setTimeout(() => {
              setIsDeleting(true);
            }, deleteDelay);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(typeCharacter, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, currentIndex, isTyping, isDeleting, loop, deleteSpeed, deleteDelay]);

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayText('');
    setIsTyping(false);
    setIsDeleting(false);
    setCurrentIndex(0);
  };

  const start = () => {
    reset();
    setIsTyping(true);
  };

  return {
    displayText,
    isTyping,
    isDeleting,
    isComplete: !isTyping && !isDeleting && currentIndex === text.length,
    reset,
    start
  };
}
