import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import hackerVideo from '@/assets/hacker-hero.mp4';

const HeroSection = () => {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ⏳ Countdown Timer (Feb 14)
  const targetDate = new Date('2026-02-14T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  return (
    <section className="relative min-h-screen overflow-hidden cyber-wrapper">

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src={hackerVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
      </div>

      {/* Centered Cyber Title + Command */}
      <div className="centered z-20 text-center">

        {/* Terminal Command ABOVE title */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-black/40 backdrop-blur-sm text-sm text-primary">
            <span>$</span>
            <span>./start_workshop --date="3-4 Feb"</span>
            <span className="terminal-cursor"></span>
          </span>
        </div>

        {/* Title */}
        <span className="cyber-text" data-text="LINUX SAGA">
          LINUX SAGA
        </span>

      </div>

      {/* Rest of Content Below Title */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto mt-20 md:mt-[55vh]">

        {/* ⏳ COUNTDOWN TIMER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-3 rounded-xl bg-card/50 border border-primary/30 backdrop-blur-sm text-center min-w-[80px]"
            >
              <div className="text-2xl font-bold text-primary text-glow">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-6"
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

  <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">

    <div className="relative inline-block">
    <button
      onClick={scrollToRegister}
      className="cyber-push-btn"
    >
      Register Now – ₹150
    </button>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="absolute -top-6 left-1/2 -translate-x-1/2"
    >
      <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
    </motion.div>
  </div>

  <button
    onClick={() =>
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
    }
    className="cyber-push-btn secondary"
  >
    View Schedule
  </button>

</div>
      </div>

    </section>
  );
};

export default HeroSection;