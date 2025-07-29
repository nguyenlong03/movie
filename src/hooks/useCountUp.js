import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Parse the end value to extract number
  const parseEndValue = (value) => {
    if (typeof value === 'string') {
      if (value.includes('M+')) {
        return 1;
      } else if (value.includes('/5')) {
        return 4.8;
      } else if (value.includes(',')) {
        return 10000;
      } else if (value.includes('+')) {
        const num = parseInt(value.replace('+', ''));
        return num;
      }
    }
    return parseFloat(value) || 0;
  };

  const numericEnd = parseEndValue(end);

  // Format the display value
  const formatValue = (currentValue) => {
    if (typeof end === 'string') {
      if (end.includes('M+')) {
        return `${currentValue.toFixed(1)}M+`;
      } else if (end.includes('/5')) {
        return `${currentValue.toFixed(1)}/5`;
      } else if (end.includes(',')) {
        return `${Math.floor(currentValue).toLocaleString()}+`;
      } else if (end.includes('+')) {
        return `${Math.floor(currentValue)}+`;
      }
    }
    return Math.floor(currentValue).toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
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
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        setCount(numericEnd * easeOutCubic);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isVisible, numericEnd, duration]);

  return {
    value: formatValue(count),
    ref: elementRef
  };
};

export default useCountUp;
