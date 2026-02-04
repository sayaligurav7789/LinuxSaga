import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface CyberScanRevealProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  delay?: number;
  scanColor?: string;
}

const CyberScanReveal = ({ 
  children, 
  direction = 'vertical', 
  delay = 0,
  scanColor = 'primary'
}: CyberScanRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scanVariants = {
    hidden: {
      clipPath: direction === 'vertical' 
        ? 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
    },
    visible: {
      clipPath: direction === 'vertical'
        ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Scan line */}
      <motion.div
        className={`absolute z-20 pointer-events-none ${
          direction === 'vertical' 
            ? `left-0 right-0 h-0.5 bg-${scanColor}` 
            : `top-0 bottom-0 w-0.5 bg-${scanColor}`
        }`}
        style={{
          boxShadow: `0 0 20px hsl(var(--${scanColor})), 0 0 40px hsl(var(--${scanColor}))`
        }}
        initial={{ 
          top: direction === 'vertical' ? '0%' : undefined,
          left: direction === 'horizontal' ? '0%' : undefined,
          opacity: 0 
        }}
        animate={isInView ? {
          top: direction === 'vertical' ? '100%' : undefined,
          left: direction === 'horizontal' ? '100%' : undefined,
          opacity: [0, 1, 1, 0]
        } : {
          top: direction === 'vertical' ? '0%' : undefined,
          left: direction === 'horizontal' ? '0%' : undefined,
          opacity: 0
        }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />

      {/* Content with clip mask */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={scanVariants}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CyberScanReveal;
