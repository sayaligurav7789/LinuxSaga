import { motion } from 'framer-motion';
import { Terminal, Cpu, FolderTree, Globe } from 'lucide-react';
import { useState } from 'react';

import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';
import DataStreamEffect from './DataStreamEffect';

import penguinCoding from '../assets/penguin-coding.mp4';
import penguinHardware from '../assets/penguin-hardware.mp4';
import penguinSecurity from '../assets/penguin-security.mp4';

const ScheduleSection = () => {
  const sessions = [
    {
      title: 'Born to Boot',
      icon: Terminal,
      color: 'border-primary',
      iconColor: 'text-primary',
      date: '3rd Feb | Day 1',
      video: penguinCoding,
      topics: [
        'Linux basics',
        'Open-source concepts',
        'Operating System vs Kernel',
        'Real-life usage of Linux',
      ],
    },
    {
      title: 'Command Quest',
      icon: Cpu,
      color: 'border-secondary',
      iconColor: 'text-secondary',
      date: '3rd Feb | Day 1',
      video: penguinHardware,
      topics: [
        'Essential Linux commands',
        'Linux booting process',
        'Text editors (vi, nano)',
        'Process management',
      ],
    },
    {
      title: 'Files, Folders & Fortresses',
      icon: FolderTree,
      color: 'border-accent',
      iconColor: 'text-accent',
      date: '4th Feb | Day 2',
      video: penguinSecurity,
      topics: [
        'Linux file system structure',
        'Directories and hierarchy',
        'User and group permissions',
      ],
    },
    {
      title: 'Network Nexus',
      icon: Globe,
      color: 'border-primary',
      iconColor: 'text-primary',
      date: '4th Feb | Day 2',
      video: penguinCoding,
      badge: 'LIVE DEMO',
      topics: [
        'Networking fundamentals',
        'SSH (Secure Shell)',
        'UFW firewall basics',
        'Metasploit demonstration',
      ],
    },
  ];

  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="high">
              ls
            </GlitchText>{' '}
            <span className="text-secondary">-la</span>{' '}
            <span className="text-foreground">schedule/</span>
          </h2>
        </HackerReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30 md:-translate-x-1/2" />

          <div className="space-y-12">
            {sessions.map((session, index) => (
              <div
                key={session.title}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary z-10 md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_hsl(var(--primary))]" />

                {/* FLIP CARD */}
                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    index % 2 === 1 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <DataStreamEffect streamCount={5}>
                    <div
                      className={`flip-wrapper ${
                        flippedIndex === index ? 'flipped' : ''
                      }`}
                      onClick={() =>
                        setFlippedIndex(flippedIndex === index ? null : index)
                      }
                    >
                      <div className="flip-inner">

                        {/* FRONT */}
                        <div
                          className={`flip-front cyber-card p-6 border-l-4 ${session.color}`}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <session.icon className={`w-6 h-6 ${session.iconColor}`} />
                            <h3 className="font-display text-xl font-bold">
                              {session.title}
                            </h3>
                          </div>

                          <div className="mb-4">
                            <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                              {session.date}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {session.topics.map((topic) => (
                              <li
                                key={topic}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <span className="text-primary text-xs">»</span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* BACK */}
                        <div
                          className={`flip-back cyber-card border-l-4 ${session.color}`}
                        >
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                              Session
                            </p>
                            <h2 className="text-5xl font-bold text-primary text-glow">
                              {String(index + 1).padStart(2, '0')}
                            </h2>
                          </div>
                        </div>

                      </div>
                    </div>
                  </DataStreamEffect>
                </div>

                {/* VIDEO SIDE (UNCHANGED) */}
                <div className="hidden md:flex md:w-[45%] justify-center items-center">
                  {session.video && (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="relative w-80 h-80 md:w-[520px] md:h-[520px]"
                    >
                      <video
                        src={session.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain mix-blend-screen"
                      />
                    </motion.div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;