import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Medal, Gift, Star, CheckCircle, Lock, Unlock, Sparkles } from 'lucide-react';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';

interface PrizeCard {
  id: string;
  title: string;
  icon: typeof Trophy;
  color: string;
  glowColor: string;
  description: string;
  reward: string;
  unlocked: boolean;
}

const PrizesSection = () => {
  const [prizes, setPrizes] = useState<PrizeCard[]>([
    {
      id: 'ctf',
      title: 'CTF Champions',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      glowColor: 'shadow-[0_0_30px_rgba(234,179,8,0.5)]',
      description: 'Top performers in Capture The Flag',
      reward: 'Special Prize Cards',
      unlocked: false
    },
    {
      id: 'quiz',
      title: 'Quiz Masters',
      icon: Medal,
      color: 'from-primary to-secondary',
      glowColor: 'shadow-[0_0_30px_rgba(0,255,136,0.5)]',
      description: 'Highest scorers in Linux Quiz',
      reward: 'Exciting Rewards',
      unlocked: false
    },
    {
      id: 'all',
      title: 'All Participants',
      icon: Award,
      color: 'from-secondary to-accent',
      glowColor: 'shadow-[0_0_30px_rgba(0,212,255,0.5)]',
      description: 'Everyone who completes the workshop',
      reward: 'E-Certificate',
      unlocked: false
    }
  ]);

  const [allUnlocked, setAllUnlocked] = useState(false);

  const unlockPrize = (id: string) => {
    setPrizes(prev => {
      const updated = prev.map(prize => 
        prize.id === id ? { ...prize, unlocked: true } : prize
      );
      if (updated.every(p => p.unlocked)) {
        setAllUnlocked(true);
      }
      return updated;
    });
  };

  const unlockAll = () => {
    setPrizes(prev => prev.map(prize => ({ ...prize, unlocked: true })));
    setAllUnlocked(true);
  };

  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="medium">chmod</GlitchText>{' '}
            <span className="text-secondary">+x</span>{' '}
            <span className="text-accent">rewards.sh</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Unlock the treasure chests to reveal your rewards!
          </p>
          
          {/* Unlock All Button */}
          {!allUnlocked && (
            <motion.button
              onClick={unlockAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 rounded-full text-primary font-mono text-sm hover:border-primary hover:shadow-neon transition-all"
            >
              <Unlock className="w-4 h-4" />
              sudo unlock --all
            </motion.button>
          )}
        </HackerReveal>

        {/* Prize Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group perspective-1000"
            >
              <motion.div
                onClick={() => !prize.unlocked && unlockPrize(prize.id)}
                className={`relative h-72 cursor-pointer preserve-3d transition-all duration-700 ${
                  prize.unlocked ? 'rotate-y-180' : ''
                }`}
                whileHover={!prize.unlocked ? { scale: 1.02, rotateY: 5 } : {}}
                whileTap={!prize.unlocked ? { scale: 0.98 } : {}}
              >
                {/* Front - Locked State */}
                <div className={`absolute inset-0 backface-hidden cyber-card rounded-lg p-8 text-center flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all ${
                  prize.unlocked ? 'invisible' : ''
                }`}>
                  {/* Lock Icon Container */}
                  <motion.div 
                    className="relative mb-6"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl bg-muted/50 flex items-center justify-center border border-muted-foreground/20 group-hover:border-primary/50 transition-colors">
                      <Lock className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    {/* Sparkle effects on hover */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                  </motion.div>

                  <h3 className="font-display text-lg font-bold text-muted-foreground mb-2">
                    ???
                  </h3>
                  <p className="text-muted-foreground/60 text-sm mb-4">
                    Click to unlock
                  </p>
                  
                  <div className="inline-flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full text-sm text-muted-foreground/60">
                    <Gift className="w-4 h-4" />
                    <span>Hidden Reward</span>
                  </div>

                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="h-px bg-primary/50 animate-cyber-scan" />
                  </div>
                </div>

                {/* Back - Unlocked State */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 ${
                  prize.unlocked ? '' : 'invisible'
                }`}>
                  <AnimatePresence>
                    {prize.unlocked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`cyber-card rounded-lg p-8 text-center h-full flex flex-col border-2 border-primary/50 ${prize.glowColor}`}
                      >
                        {/* Unlocked Icon */}
                        <motion.div 
                          className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center`}
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", delay: 0.4 }}
                        >
                          <prize.icon className="w-10 h-10 text-background" />
                        </motion.div>
                        
                        <motion.h3 
                          className="font-display text-xl font-bold text-foreground mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {prize.title}
                        </motion.h3>
                        <motion.p 
                          className="text-muted-foreground text-sm mb-4 flex-grow"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          {prize.description}
                        </motion.p>
                        
                        <motion.div 
                          className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Gift className="w-4 h-4 text-primary" />
                          <span className="text-primary font-semibold">{prize.reward}</span>
                        </motion.div>

                        {/* Floating particles */}
                        <div className="absolute top-4 right-4">
                          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Certificate highlight - only show when all unlocked */}
        <AnimatePresence>
          {allUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="cyber-card rounded-lg p-8 cyber-border-cyan relative overflow-hidden">
                {/* Celebration effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 animate-pulse" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="w-24 h-24 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center border border-secondary/30"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(0,212,255,0.3)",
                          "0 0 40px rgba(0,212,255,0.5)",
                          "0 0 20px rgba(0,212,255,0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Award className="w-12 h-12 text-secondary" />
                    </motion.div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      🎉 All Rewards Unlocked!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Register now to claim your rewards and receive your participation certificate!
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="flex items-center gap-1 text-sm text-primary">
                        <CheckCircle className="w-4 h-4" /> Verified
                      </span>
                      <span className="flex items-center gap-1 text-sm text-secondary">
                        <Star className="w-4 h-4" /> Digital
                      </span>
                      <span className="flex items-center gap-1 text-sm text-accent">
                        <Gift className="w-4 h-4" /> Shareable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};

export default PrizesSection;
