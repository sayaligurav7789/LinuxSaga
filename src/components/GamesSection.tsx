import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Brain, Trophy, Users, Clock, Zap, Gamepad2, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';

const GamesSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const games = [
    {
      id: 'ctf',
      title: 'Capture The Flag',
      subtitle: 'CTF Challenge',
      icon: Flag,
      color: 'from-primary to-secondary',
      borderColor: 'border-primary',
      features: [
        { icon: Users, text: 'Beginner-friendly cybersecurity challenge' },
        { icon: Zap, text: 'Tasks based on Linux commands & security' },
        { icon: Flag, text: 'Find hidden flags to score points' },
        { icon: Trophy, text: 'Encourages teamwork and problem-solving' }
      ],
      badge: 'HACK & WIN'
    },
    {
      id: 'quiz',
      title: 'Linux Quiz Game',
      subtitle: 'Test Your Knowledge',
      icon: Brain,
      color: 'from-secondary to-accent',
      borderColor: 'border-secondary',
      features: [
        { icon: Brain, text: 'Interactive quiz on workshop topics' },
        { icon: Clock, text: 'Multiple-choice questions' },
        { icon: Zap, text: 'Live leaderboard' },
        { icon: Trophy, text: 'Rewards for top scorers' }
      ],
      badge: 'COMPETE & LEARN'
    }
  ];

  return (
    <section id="games" className="py-24 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="high">sudo</GlitchText>{' '}
            <span className="text-secondary">./games</span>{' '}
            <span className="text-accent">--start</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Put your skills to the test with exciting challenges and competitions
          </p>
        </HackerReveal>

        {/* Main Interactive Game Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cyber-card rounded-xl overflow-hidden border-2 border-primary/50 hover:border-primary hover:shadow-neon transition-all duration-500 group cursor-pointer text-left"
          >
            {/* Animated Background */}
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Scan Line Effect */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-px bg-primary/50 animate-cyber-scan" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                {/* Icon Container */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:animate-pulse">
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-float opacity-60" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-secondary rounded-full animate-float animation-delay-1000 opacity-60" />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block text-xs font-mono bg-primary/20 border border-primary/30 px-3 py-1 rounded-full text-primary mb-3">
                    🎮 SPECIAL ACTIVITIES
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Enter The Arena
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Challenge yourself with CTF and Quiz competitions. Click to explore the games!
                  </p>
                  
                  {/* Game Badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="text-xs font-mono bg-card border border-primary/30 px-2 py-1 rounded text-primary flex items-center gap-1">
                      <Flag className="w-3 h-3" /> CTF
                    </span>
                    <span className="text-xs font-mono bg-card border border-secondary/30 px-2 py-1 rounded text-secondary flex items-center gap-1">
                      <Brain className="w-3 h-3" /> Quiz
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all hidden md:block" />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-8 py-4 bg-muted/30 border-t border-border flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="text-primary">⚡</span>
                Hands-on Labs
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-2">
                <span className="text-secondary">🔴</span>
                Live Demos
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Games Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-primary/30">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <span className="text-primary">$</span> ./special_activities
              </DialogTitle>
              <DialogDescription>
                Choose your challenge and prove your skills!
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="ctf" className="w-full mt-4">
              <TabsList className="w-full grid grid-cols-2 bg-muted/50">
                <TabsTrigger value="ctf" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono">
                  <Flag className="w-4 h-4 mr-2" />
                  CTF Challenge
                </TabsTrigger>
                <TabsTrigger value="quiz" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground font-mono">
                  <Brain className="w-4 h-4 mr-2" />
                  Quiz Game
                </TabsTrigger>
              </TabsList>

              {games.map((game) => (
                <TabsContent key={game.id} value={game.id} className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Game Header */}
                      <div className={`p-6 rounded-t-lg bg-gradient-to-r ${game.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded text-white/80">
                              {game.badge}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-white mt-2">
                              {game.title}
                            </h3>
                            <p className="text-white/70 text-sm">{game.subtitle}</p>
                          </div>
                          <game.icon className="w-16 h-16 text-white/80" />
                        </div>
                      </div>

                      {/* Game Features */}
                      <div className={`p-6 rounded-b-lg border-2 ${game.borderColor} border-t-0 bg-card/50`}>
                        <div className="space-y-4">
                          {game.features.map((feature, idx) => (
                            <motion.div
                              key={feature.text}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className={`p-2 rounded-lg ${game.id === 'ctf' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                                <feature.icon className={`w-5 h-5 ${game.id === 'ctf' ? 'text-primary' : 'text-secondary'}`} />
                              </div>
                              <span className="text-foreground">
                                {feature.text}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 flex justify-center">
                          <Button
                            onClick={() => {
                              setIsOpen(false);
                              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`font-mono ${game.id === 'ctf' ? 'bg-primary hover:bg-primary/80' : 'bg-secondary hover:bg-secondary/80'}`}
                          >
                            <Trophy className="w-4 h-4 mr-2" />
                            Register to Compete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};

export default GamesSection;
