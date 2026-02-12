import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Terminal, Upload, User, Mail, Phone, Building, Gauge, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '@/hooks/use-toast';
import HackerReveal from './HackerReveal';
import GlitchText from './GlitchText';
import DataStreamEffect from './DataStreamEffect';
import QRImage from '@/assets/QR.png';
import PenguinImage from '@/assets/RegiPenguin.png';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    experience: 'beginner'
  });
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      setPaymentFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

    if (!paymentFile) {
      toast({
        title: "Payment screenshot required",
        description: "Please upload your payment screenshot",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();

      // key must be "image"
      form.append("image", paymentFile);

      // append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: form
      });

      if (!res.ok) throw new Error("Submission failed");

      toast({
        title: "Registration Successful 🎉",
        description: "Welcome to LinuxSaga 1.0!"
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        experience: 'beginner'
      });
      setPaymentFile(null);

    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit registration",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.1 * i, duration: 0.4, type: "spring", stiffness: 100 }
    })
  };

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4">
        <HackerReveal effect="decrypt" className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-muted-foreground">$</span>{' '}
            <GlitchText className="text-primary text-glow-sm" glitchIntensity="high">./register</GlitchText>{' '}
            <span className="text-secondary">--user</span>{' '}
            <span className="text-foreground">"you"</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Secure your spot now! Limited seats available.
          </p>
        </HackerReveal>

        <DataStreamEffect streamCount={10} className="max-w-5xl mx-auto">
          <HackerReveal effect="matrix" delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="cyber-card rounded-lg overflow-hidden">
              {/* Terminal header */}
              <motion.div 
                className="p-4 border-b border-border flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-1.5">
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-destructive"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-accent"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="text-muted-foreground text-sm ml-2">registration@linuxsaga:~</span>
              </motion.div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Registration Fee */}
                <motion.div 
                  className="text-center mb-8 p-4 rounded-lg bg-primary/10 border border-primary/30 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-muted-foreground text-sm relative z-10">Registration Fee</p>
                  <motion.p 
                    className="font-display text-4xl font-bold text-primary text-glow relative z-10"
                    animate={{ 
                      textShadow: [
                        '0 0 10px hsl(var(--primary))',
                        '0 0 30px hsl(var(--primary))',
                        '0 0 10px hsl(var(--primary))'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ₹150
                  </motion.p>
                </motion.div>

                {/* Form Fields with staggered animation */}
                {[
                  { id: 'fullName', label: 'Full Name', icon: User, iconColor: 'text-primary', placeholder: 'Enter your full name', type: 'text' },
                  { id: 'email', label: 'Email Address', icon: Mail, iconColor: 'text-secondary', placeholder: 'you@example.com', type: 'email' },
                  { id: 'phone', label: 'Phone Number', icon: Phone, iconColor: 'text-accent', placeholder: '+91 XXXXXXXXXX', type: 'tel' },
                  { id: 'college', label: 'College / Organization', icon: Building, iconColor: 'text-primary', placeholder: 'Your college or organization', type: 'text' }
                ].map((field, index) => (
                  <motion.div 
                    key={field.id}
                    className="space-y-2"
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={formFieldVariants}
                  >
                    <Label htmlFor={field.id} className="flex items-center gap-2 text-muted-foreground">
                      <field.icon className={`w-4 h-4 ${field.iconColor}`} />
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      required
                      placeholder={field.placeholder}
                      className="bg-input border-border focus:border-primary focus:ring-primary transition-all focus:shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
                    />
                  </motion.div>
                ))}

                {/* Experience Level */}
                <motion.div 
                  className="space-y-2"
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                >
                  <Label htmlFor="experience" className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="w-4 h-4 text-secondary" />
                    Experience Level
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'beginner', label: 'Beginner', icon: Terminal, activeColor: 'border-primary bg-primary/10 text-primary' },
                      { value: 'intermediate', label: 'Intermediate', icon: Gauge, activeColor: 'border-secondary bg-secondary/10 text-secondary' }
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.experience === option.value
                            ? option.activeColor
                            : 'border-border bg-input text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option.value}
                          checked={formData.experience === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <option.icon className="w-5 h-5" />
                        <span className="font-semibold">{option.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Payment Screenshot Upload */}
                <motion.div 
                  className="space-y-2"
                  custom={5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formFieldVariants}
                >
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Upload className="w-4 h-4 text-accent" />
                    Payment Screenshot (Required)
                  </Label>
                  <motion.div
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.01, borderColor: 'hsl(var(--primary))' }}
                    whileTap={{ scale: 0.99 }}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                      paymentFile
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {paymentFile ? (
                      <motion.div 
                        className="flex flex-col items-center gap-2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-12 h-12 text-primary" />
                        </motion.div>
                        <p className="text-primary font-semibold">{paymentFile.name}</p>
                        <p className="text-muted-foreground text-sm">Click to change</p>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Upload className="w-12 h-12 text-muted-foreground" />
                        </motion.div>
                        <p className="text-muted-foreground">
                          <span className="text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-muted-foreground text-sm">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <AlertCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Complete payment of ₹150 and upload the screenshot as proof.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg py-6 neon-hover pulse-glow disabled:opacity-50 relative overflow-hidden"
                  >
                    {/* Button glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        <Terminal className="w-5 h-5" />
                        Complete Registration
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
              </div>

              {/* QR Code Card */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="cyber-card rounded-lg overflow-hidden h-full flex flex-col items-center justify-center p-8">
                  {/* Terminal header */}
                  <motion.div 
                    className="w-full p-4 border-b border-border flex items-center gap-2 -m-8 mb-8 px-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex gap-1.5">
                      <motion.span 
                        className="w-3 h-3 rounded-full bg-destructive"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.span 
                        className="w-3 h-3 rounded-full bg-accent"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.span 
                        className="w-3 h-3 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                    <span className="text-muted-foreground text-sm ml-2">qr@payment:~</span>
                  </motion.div>

                  <div className="flex flex-col items-center justify-center gap-6 w-full">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                      className="relative p-4 rounded-lg"
                    >
                      <img
                        src={PenguinImage}
                        alt="Registration Penguin"
                        className="w-48 h-auto relative z-10"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65, type: "spring", stiffness: 100 }}
                      className="relative p-4 bg-white rounded-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-lg" />
                      <img
                        src={QRImage}
                        alt="Payment QR Code"
                        className="w-48 h-48 relative z-10"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className="text-center"
                    >
                      <h3 className="font-display text-lg font-bold text-primary mb-2">Payment QR Code</h3>
                      <p className="text-muted-foreground text-sm">Scan to complete</p>
                      <p className="text-muted-foreground text-sm">your registration payment</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/30 w-full justify-center"
                    >
                      <p className="text-primary text-sm font-semibold">Amount: ₹150</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </HackerReveal>
        </DataStreamEffect>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default RegistrationForm;