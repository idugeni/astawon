// src/app/page.tsx
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';

export const metadata: Metadata = {
  title: 'ASTAWON - HUMAS RUTAN WONOSOBO',
  description:
    'ASTAWON adalah platform digital yang dirancang untuk mempermudah pengelolaan informasi dan penyampaian perkembangan terkini tentang Rutan Wonosobo.',
};

export default function HomePage() {
  return (
    <div data-theme='night' className='min-h-screen font-sans antialiased'>
      <main>
        <HeroSection />
        <FeaturedSection />
      </main>
    </div>
  );
}
