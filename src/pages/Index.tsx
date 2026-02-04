import MatrixRain from '@/components/MatrixRain';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ScheduleSection from '@/components/ScheduleSection';
import GamesSection from '@/components/GamesSection';
import PrizesSection from '@/components/PrizesSection';
import RegistrationForm from '@/components/RegistrationForm';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MatrixRain />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <GamesSection />
        <PrizesSection />
        <RegistrationForm />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
