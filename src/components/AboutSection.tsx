import { motion } from 'framer-motion';
import { Terminal, Calendar, MapPin, Users, Award } from 'lucide-react';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';
import CyberScanReveal from './CyberScanReveal';

const AboutSection = () => {
  const features = [
    {
      icon: Terminal,
      title: 'Hands-on Labs',
      description: 'Interactive practical sessions with real Linux systems',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'All Skill Levels',
      description: 'From beginners to intermediate learners welcome',
      color: 'text-secondary'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'E-Certificate for all participants',
      color: 'text-accent'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="medium">cat</GlitchText>{' '}
            <span className="text-secondary">about.txt</span>
          </h2>
        </HackerReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <CyberScanReveal direction="vertical" delay={0.2}>
            <div className="cyber-card rounded-lg p-8">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm">
                <div className="flex gap-1.5">
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-destructive" 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-accent" 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-primary" 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="ml-2">terminal@linuxsaga:~</span>
              </div>
              
              <p className="text-card-foreground leading-relaxed mb-6">
                <span className="text-primary">LinuxSaga 1.0</span> is a{' '}
                <span className="text-secondary">2-day hands-on Linux workshop</span>{' '}
                designed for beginners and intermediate learners. The workshop focuses on{' '}
                <span className="text-primary">Linux fundamentals</span>,{' '}
                <span className="text-secondary">command-line skills</span>,{' '}
                <span className="text-accent">system concepts</span>, and{' '}
                <span className="text-primary">real-world security demonstrations</span>{' '}
                through interactive sessions, games, and live demos.
              </p>

              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Calendar className="w-5 h-5 text-primary" />
                  <span><span className="text-primary">3rd</span> & <span className="text-primary">4th February</span></span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span>DYPCET Campus</span>
                </motion.div>
              </div>
            </div>
          </CyberScanReveal>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <HackerReveal
                key={feature.title}
                effect="glitch-in"
                delay={0.3}
                stagger={index * 0.15}
              >
                <div className="cyber-card rounded-lg p-6 hover:border-primary/50 transition-all group relative overflow-hidden">
                  {/* Hover scan line */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={false}
                  >
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                      animate={{ y: [0, 100, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className={`p-3 rounded-lg bg-card ${feature.color} group-hover:shadow-neon transition-shadow`}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </HackerReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative grid with parallax */}
      <motion.div 
        className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </section>
  );
};

export default AboutSection;
