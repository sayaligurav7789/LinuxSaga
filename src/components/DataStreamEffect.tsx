import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface DataStreamEffectProps {
  children: React.ReactNode;
  className?: string;
  streamCount?: number;
}

const DataStreamEffect = ({ children, className = '', streamCount = 5 }: DataStreamEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [streams, setStreams] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    if (isInView) {
      const newStreams = Array.from({ length: streamCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5
      }));
      setStreams(newStreams);
    }
  }, [isInView, streamCount]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Data streams */}
      {isInView && streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 w-px h-full pointer-events-none z-10"
          style={{ left: `${stream.left}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1, delay: stream.delay }}
        >
          <motion.div
            className="w-full h-8 bg-gradient-to-b from-transparent via-primary to-transparent"
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 0.8, delay: stream.delay, ease: "easeIn" }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DataStreamEffect;
