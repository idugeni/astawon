// src/components/HeroSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket, FaFile } from 'react-icons/fa6';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center">
      <Image
        src="/hero.jpg"
        alt="Hero Background"
        fill
        className="absolute inset-0 object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-neutral/25 backdrop-blur-xs"></div>
      <div className="relative z-10 text-center text-white px-4 md:px-8 mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-transparent bg-clip-text">
            ASTAWON
          </span>
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Platform digital yang dikelola oleh{' '}
          <span className="bg-gradient-to-br from-green-400 to-yellow-500 text-transparent bg-clip-text">
            Humas Rutan Wonosobo
          </span>
        </h2>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed mx-auto">
          Platform ini dirancang khusus sebagai{' '}
          <span className="bg-gradient-to-br from-pink-500 to-orange-400 text-transparent bg-clip-text font-medium">
            alat bantu
          </span>{' '}
          untuk memudahkan pekerjaan anggota humas dalam memberikan informasi terkini dan terpercaya kepada masyarakat seputar kegiatan dan perkembangan{' '}
          <span className="bg-gradient-to-br from-blue-500 to-green-300 text-transparent bg-clip-text font-medium">
            Rutan Wonosobo
          </span>.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 sm:justify-center">
          <Link href="/login" className="btn btn-primary rounded-full py-3 px-8">
            <FaRocket className="mr-2" />
            Get Started
          </Link>
          <Link href="/about" className="btn btn-secondary rounded-full py-3 px-8">
            <FaFile className="mr-2" />
            Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}