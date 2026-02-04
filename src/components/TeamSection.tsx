import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';
import CyberScanReveal from './CyberScanReveal';

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="medium">whoami</GlitchText>{' '}
            <span className="text-secondary">--team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate team behind LinuxSaga
          </p>
        </HackerReveal>

        <CyberScanReveal direction="horizontal" delay={0.3}>
          <div className="max-w-4xl mx-auto">
            <div className="cyber-card rounded-lg overflow-hidden">
              {/* Team photo placeholder */}
              <div className="aspect-video bg-gradient-to-br from-card via-muted to-card relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-2">
                    LinuxCore Club
                  </h3>
                  <p className="text-muted-foreground">
                    DYPCET Chapter
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto px-4">
                    A dedicated team of Linux enthusiasts committed to spreading open-source knowledge
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-primary/20 font-mono text-xs">
                [ TEAM_PHOTO_PLACEHOLDER ]
              </div>
              <div className="absolute bottom-4 right-4 text-primary/20 font-mono text-xs">
                resolution: 1920x1080
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-secondary/30" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-secondary/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
            </div>

              {/* Team info */}
              <div className="p-6 text-center">
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Bringing Linux to the masses, one workshop at a time.
                </motion.p>
              </div>
            </div>
          </div>
        </CyberScanReveal>
      </div>
    </section>
  );
};

export default TeamSection;
