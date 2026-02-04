import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TerminalRevealProps {
  children: React.ReactNode;
  command?: string;
  delay?: number;
}

const TerminalReveal = ({ children, command = "cat", delay = 0 }: TerminalRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showContent, setShowContent] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    const fullCommand = `$ ${command}`;
    let currentIndex = 0;

    const timeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullCommand.length) {
          setTypedCommand(fullCommand.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setShowCursor(false);
            setShowContent(true);
          }, 200);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, command, delay]);

  return (
    <div ref={ref} className="relative">
      {/* Terminal header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.3, delay }}
        className="font-mono text-sm text-primary mb-2"
      >
        {typedCommand}
        {showCursor && <span className="animate-pulse">█</span>}
      </motion.div>

      {/* Content reveal */}
      <motion.div
        initial={{ opacity: 0, height: 0, y: 20 }}
        animate={showContent ? { opacity: 1, height: 'auto', y: 0 } : { opacity: 0, height: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TerminalReveal;
