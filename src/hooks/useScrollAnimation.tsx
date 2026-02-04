import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationOptions {
  offset?: [string, string];
  smooth?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { offset = ["start end", "end start"], smooth = 50 } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: smooth,
    restDelta: 0.001
  });

  return { ref, scrollYProgress, smoothProgress };
};

export const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export const useOpacityFade = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
};

export const useScaleOnScroll = (value: MotionValue<number>) => {
  return useTransform(value, [0, 0.5, 1], [0.8, 1, 0.8]);
};
