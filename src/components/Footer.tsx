import { motion } from 'framer-motion';
import { Terminal, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Games', href: '#games' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Register', href: '#register' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold">
                <span className="text-primary">Linux</span>
                <span className="text-secondary">Core</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              DYPCET Chapter
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students with Linux and open-source technologies through hands-on workshops and community events.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:linuxcore@dypcet.ac.in"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                linuxcore@dypcet.ac.in
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-secondary" />
                DYPCET Campus, Kolhapur
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-muted-foreground text-sm mb-3">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive" /> by LinuxCore Team
            </p>
            <p>
              © {currentYear} LinuxSaga 1.0 | All rights reserved
            </p>
            <p className="font-mono text-xs">
              <span className="text-primary">root@linuxsaga</span>:<span className="text-secondary">~</span>$ █
            </p>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
    </footer>
  );
};

export default Footer;
