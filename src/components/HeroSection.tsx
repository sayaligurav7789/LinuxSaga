import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import hackerVideo from '@/assets/hacker-hero.mp4';

const HeroSection = () => {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-bg">
      {/* Background Video */}
      <div className="absolute inset-0 z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={hackerVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-primary">$</span> ./start_workshop --date="3-4 Feb"
            <span className="terminal-cursor text-primary"></span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 techfest-title techfest-scanlines"
        >
          <span className="techfest-glitch text-primary" data-text="LINUX">
            LINUX
          </span>{' '}
          <span className="techfest-glitch text-secondary" data-text="SAGA">
            SAGA
          </span>{' '}
          <span className="techfest-glitch text-accent" data-text="1.0">
            1.0
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto"
        >
          A 2-Day Hands-On Linux Workshop
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8 text-sm"
        >
          <span className="flex items-center gap-2 text-primary">
            <Shield className="w-4 h-4" />
            CTF Challenges
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="flex items-center gap-2 text-secondary">
            <Cpu className="w-4 h-4" />
            Live Demos
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-sm mb-8"
        >
          Organized by <span className="text-primary font-semibold">LinuxCore</span> | DYPCET Chapter
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            onClick={scrollToRegister}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg px-8 py-6 neon-hover pulse-glow"
          >
            <Terminal className="w-5 h-5 mr-2" />
            Register Now - ₹150
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-secondary text-secondary hover:bg-secondary/10 font-display text-lg px-8 py-6"
          >
            View Schedule
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-secondary/10 to-transparent blur-3xl z-0" />
    </section>
  );
};

export default HeroSection;
