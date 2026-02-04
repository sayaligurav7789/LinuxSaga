import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface HackerRevealProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'fade-up' | 'glitch-in' | 'scan' | 'matrix' | 'decrypt';
  delay?: number;
  stagger?: number;
}

const HackerReveal = ({ 
  children, 
  className = '', 
  effect = 'fade-up',
  delay = 0,
  stagger = 0
}: HackerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -20]);

  const effectVariants = {
    'fade-up': {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, delay: delay + stagger, ease: "easeOut" }
      }
    },
    'glitch-in': {
      hidden: { opacity: 0, x: -20, skewX: 5 },
      visible: { 
        opacity: 1, 
        x: 0, 
        skewX: 0,
        transition: { 
          duration: 0.4, 
          delay: delay + stagger,
          type: "spring",
          stiffness: 100
        }
      }
    },
    'scan': {
      hidden: { 
        opacity: 0, 
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' 
      },
      visible: { 
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: { duration: 0.6, delay: delay + stagger }
      }
    },
    'matrix': {
      hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
      visible: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        transition: { duration: 0.5, delay: delay + stagger }
      }
    },
    'decrypt': {
      hidden: { opacity: 0, rotateX: 90 },
      visible: { 
        opacity: 1, 
        rotateX: 0,
        transition: { 
          duration: 0.5, 
          delay: delay + stagger,
          type: "spring",
          stiffness: 80
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={effectVariants[effect]}
    >
      {children}
    </motion.div>
  );
};

export default HackerReveal;
