import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  delay?: number;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const GlitchText = ({ children, className = '', delay = 0, glitchIntensity = 'medium' }: GlitchTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01アイウエオ';
  
  const intensityConfig = {
    low: { iterations: 2, speed: 30 },
    medium: { iterations: 3, speed: 25 },
    high: { iterations: 5, speed: 20 }
  };

  useEffect(() => {
    if (!isInView) return;

    const { iterations, speed } = intensityConfig[glitchIntensity];
    let currentIndex = 0;
    let iterationCount = 0;

    const timeout = setTimeout(() => {
      setIsGlitching(true);
      
      const interval = setInterval(() => {
        if (currentIndex <= children.length) {
          const revealed = children.slice(0, currentIndex);
          const remaining = children.slice(currentIndex);
          
          const glitched = remaining
            .split('')
            .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
            .join('');
          
          setDisplayText(revealed + glitched);
          
          iterationCount++;
          if (iterationCount >= iterations) {
            currentIndex++;
            iterationCount = 0;
          }
        } else {
          clearInterval(interval);
          setDisplayText(children);
          setIsGlitching(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, children, delay, glitchIntensity]);

  return (
    <motion.span
      ref={ref}
      className={`${className} ${isGlitching ? 'glitch' : ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {displayText || children.split('').map(() => ' ').join('')}
    </motion.span>
  );
};

export default GlitchText;