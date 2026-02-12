import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  Medal,
  Gift,
  Star,
  Lock,
  Unlock
} from 'lucide-react';
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
      description: 'Highest scorers in Linux Quiz Games',
      reward: 'Exciting Rewards',
      unlocked: false
    },
    {
      id: 'games',
      title: 'Game Winners',
      icon: Star,
      color: 'from-accent to-purple-500',
      glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
      description: 'Winners of Linux-themed mini-games',
      reward: 'Swag Kits',
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

  const allUnlocked = useMemo(
    () => prizes.every(p => p.unlocked),
    [prizes]
  );

  const unlockPrize = (id: string) => {
    setPrizes(prev =>
      prev.map(prize =>
        prize.id === id ? { ...prize, unlocked: true } : prize
      )
    );
  };

  const unlockAll = () => {
    setPrizes(prev =>
      prev.map(prize => ({ ...prize, unlocked: true }))
    );
  };

  return (
    <section id="prizes" className="pt-24 pb-32 relative">
      <div className="container mx-auto px-4">

        <HackerReveal effect="decrypt" className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="medium">
              chmod
            </GlitchText>{' '}
            <span className="text-secondary">+x</span>{' '}
            <span className="text-accent">rewards.sh</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Unlock the treasure chests to reveal your rewards!
          </p>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[90rem] mx-auto">

          {prizes.map((prize, index) => (
            <motion.div
              key={prize.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div
                onClick={() => !prize.unlocked && unlockPrize(prize.id)}
                animate={{ rotateY: prize.unlocked ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative h-80 cursor-pointer will-change-transform"
              >

                {/* FRONT */}
                <div
                  className="absolute inset-0 cyber-card rounded-lg p-6 flex flex-col border-2 border-dashed border-muted-foreground/30"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex-1 flex items-center justify-center flex-col text-center">
                    <Lock className="w-10 h-10 text-muted-foreground mb-4" />
                    <h3 className="text-muted-foreground font-bold">???</h3>
                    <p className="text-muted-foreground/60 text-sm mt-2">
                      Click to unlock
                    </p>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className={`absolute inset-0 cyber-card rounded-lg p-6 flex flex-col border-2 border-primary/50 ${prize.glowColor}`}
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 mb-4 rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center`}>
                      <prize.icon className="w-10 h-10 text-background" />
                    </div>

                    <h3 className="font-display text-xl font-bold mb-2">
                      {prize.title}
                    </h3>
                  </div>

                  <div className="flex-1 flex items-center justify-center text-center px-2">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {prize.description}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-sm">
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold">
                        {prize.reward}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PrizesSection;