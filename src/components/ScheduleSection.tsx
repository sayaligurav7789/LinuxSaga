import { motion } from 'framer-motion';
import { Terminal, Cpu, FolderTree, Globe } from 'lucide-react';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';
import DataStreamEffect from './DataStreamEffect';

const ScheduleSection = () => {
  const schedule = [
    {
      day: 'Day 1',
      date: '3rd February',
      sessions: [
        {
          title: 'Born to Boot',
          icon: Terminal,
          color: 'border-primary',
          iconColor: 'text-primary',
          topics: [
            'Linux basics',
            'Open-source concepts',
            'Operating System vs Kernel',
            'Real-life usage of Linux'
          ]
        },
        {
          title: 'Command Quest',
          icon: Cpu,
          color: 'border-secondary',
          iconColor: 'text-secondary',
          topics: [
            'Essential Linux commands',
            'Linux booting process',
            'Text editors (vi, nano)',
            'Process management'
          ]
        }
      ]
    },
    {
      day: 'Day 2',
      date: '4th February',
      sessions: [
        {
          title: 'Files, Folders & Fortresses',
          icon: FolderTree,
          color: 'border-accent',
          iconColor: 'text-accent',
          topics: [
            'Linux file system structure',
            'Directories and hierarchy',
            'User and group permissions'
          ]
        },
        {
          title: 'Network Nexus',
          icon: Globe,
          color: 'border-primary',
          iconColor: 'text-primary',
          badge: 'LIVE DEMO',
          topics: [
            'Networking fundamentals',
            'SSH (Secure Shell)',
            'UFW firewall basics',
            'Metasploit demonstration'
          ]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const topicVariants = {
    hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="high">ls</GlitchText>{' '}
            <span className="text-secondary">-la</span>{' '}
            <span className="text-foreground">schedule/</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two days of intensive learning, hands-on practice, and exciting challenges
          </p>
        </HackerReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {schedule.map((day, dayIndex) => (
            <DataStreamEffect key={day.day} streamCount={8}>
              <HackerReveal effect="matrix" delay={dayIndex * 0.2}>
                <div className="cyber-card rounded-lg overflow-hidden group">
                  {/* Day header with animated border */}
                  <motion.div 
                    className="p-6 border-b border-border relative overflow-hidden"
                    whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }}
                  >
                    <motion.div 
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-secondary to-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + dayIndex * 0.2 }}
                    />
                    <div className="flex items-center justify-between">
                      <motion.h3 
                        className="font-display text-2xl font-bold text-primary"
                        whileHover={{ textShadow: '0 0 20px hsl(var(--primary))' }}
                      >
                        {day.day}
                      </motion.h3>
                      <motion.span 
                        className="text-muted-foreground text-sm bg-muted px-3 py-1 rounded"
                        whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                      >
                        {day.date}
                      </motion.span>
                    </div>
                  </motion.div>

                  <div className="p-6 space-y-6">
                    {day.sessions.map((session, sessionIndex) => (
                      <motion.div
                        key={session.title}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.4 + sessionIndex * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                        className={`border-l-2 ${session.color} pl-4 relative`}
                      >
                        {/* Animated pulse on border */}
                        <motion.div 
                          className={`absolute left-0 top-0 w-0.5 bg-gradient-to-b ${
                            session.color === 'border-primary' ? 'from-primary to-transparent' :
                            session.color === 'border-secondary' ? 'from-secondary to-transparent' :
                            'from-accent to-transparent'
                          }`}
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.6 + sessionIndex * 0.1 }}
                        />
                        
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            <session.icon className={`w-5 h-5 ${session.iconColor}`} />
                          </motion.div>
                          <h4 className="font-display text-lg font-semibold text-foreground">
                            {session.title}
                          </h4>
                          {session.badge && (
                            <motion.span 
                              className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded"
                              animate={{ 
                                boxShadow: [
                                  '0 0 5px hsl(var(--primary) / 0.5)',
                                  '0 0 15px hsl(var(--primary) / 0.8)',
                                  '0 0 5px hsl(var(--primary) / 0.5)'
                                ]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {session.badge}
                            </motion.span>
                          )}
                        </div>
                        
                        <motion.ul 
                          className="space-y-2"
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {session.topics.map((topic, topicIndex) => (
                            <motion.li 
                              key={topic} 
                              className="text-muted-foreground text-sm flex items-center gap-2 group/topic"
                              variants={topicVariants}
                              custom={topicIndex}
                            >
                              <motion.span 
                                className="text-primary"
                                whileHover={{ x: 5 }}
                              >
                                →
                              </motion.span>
                              <span className="group-hover/topic:text-foreground transition-colors">
                                {topic}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </HackerReveal>
            </DataStreamEffect>
          ))}
        </div>
      </div>

      {/* Animated background lines */}
      <motion.div 
        className="absolute top-1/2 left-0 w-px h-1/2 bg-gradient-to-b from-primary/50 to-transparent"
        initial={{ height: 0 }}
        whileInView={{ height: '50%' }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-px h-1/2 bg-gradient-to-b from-secondary/50 to-transparent"
        initial={{ height: 0 }}
        whileInView={{ height: '50%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </section>
  );
};

export default ScheduleSection;
