import { motion } from 'framer-motion';
import { Terminal, Cpu, FolderTree, Globe } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  };

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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two days of intensive learning, hands-on practice, and exciting challenges
          </p>
        </HackerReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30 md:-translate-x-1/2" />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {sessions.map((session, index) => (
              <motion.div
                key={session.title}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary z-10 md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_hsl(var(--primary))]" />

                {/* Card */}
                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <DataStreamEffect streamCount={5}>
                    <div
                      className={`cyber-card rounded-lg p-6 border-l-4 ${session.color} hover:shadow-neon transition-all duration-300 group`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <session.icon className={`w-6 h-6 ${session.iconColor}`} />
                          <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                            {session.title}
                          </h3>
                        </div>
                        {session.badge && (
                          <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded-sm animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
                            {session.badge}
                          </span>
                        )}
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
                  </DataStreamEffect>
                </div>

                {/* Media side */}
                <div className="hidden md:flex md:w-[45%] justify-center items-center">
                  {session.video && (
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        filter: [
                          'drop-shadow(0 0 10px rgba(74, 222, 128, 0.2))',
                          'drop-shadow(0 0 20px rgba(74, 222, 128, 0.4))',
                          'drop-shadow(0 0 10px rgba(74, 222, 128, 0.2))',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative w-80 h-80 md:w-[520px] md:h-[520px] opacity-90 hover:opacity-100 transition-all duration-500"
                    >
                      <video
                        src={session.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain mix-blend-screen"
                      />

                      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
    </section>
  );
};

export default ScheduleSection;