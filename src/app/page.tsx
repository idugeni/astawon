// src/app/page.tsx
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
}