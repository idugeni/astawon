'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FaNewspaper,
  FaUsers,
  FaPhotoFilm,
  FaRocket,
  FaFile,
} from 'react-icons/fa6';
import Link from 'next/link';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div data-theme='night' className='min-h-screen font-sans antialiased'>
      <Navbar />

      <main className='flex flex-col w-full'>
        {/* Hero Section */}
        <section
          className={`relative w-full min-h-[90vh] bg-cover bg-center bg-fixed flex items-center justify-center ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-700`}
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        >
          <div className='absolute inset-0 bg-neutral/25 backdrop-blur-xs'></div>

          <div className='relative z-10 text-center text-white px-4 md:px-8 max-w-5xl mx-auto'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 transition-all duration-700'>
              <span className='bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-transparent bg-clip-text inline-block'>
                ASTAWON
              </span>
            </h1>

            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4 transition-all duration-700 delay-100'>
              Platform digital yang dikelola oleh{' '}
              <span className='bg-gradient-to-br from-green-400 to-yellow-500 text-transparent bg-clip-text'>
                Humas Rutan Wonosobo
              </span>
            </h2>

            <p className='text-base md:text-lg lg:text-xl leading-relaxed mx-auto transition-all duration-700 delay-200'>
              Platform ini dirancang khusus sebagai{' '}
              <span className='bg-gradient-to-br from-pink-500 to-orange-400 text-transparent bg-clip-text font-medium'>
                alat bantu
              </span>{' '}
              untuk memudahkan pekerjaan anggota humas dalam memberikan
              informasi terkini dan terpercaya kepada masyarakat seputar
              kegiatan dan perkembangan{' '}
              <span className='bg-gradient-to-br from-blue-500 to-green-300 text-transparent bg-clip-text font-medium'>
                Rutan Wonosobo
              </span>
              .
            </p>

            {/* Buttons Section */}
            <div className='mt-8 flex flex-col sm:flex-row sm:space-x-4 sm:justify-center transition-all duration-500 ease-in-out'>
              <Link
                href='/login'
                className='btn btn-primary btn-soft rounded-full py-3 px-8 mb-4 sm:mb-0 transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-blue-500 hover:to-green-500 hover:text-white hover:shadow-md'
              >
                <FaRocket className='mr-2' />
                Get Started
              </Link>
              <Link
                href='/about'
                className='btn btn-secondary btn-outline rounded-full py-3 px-8 transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-md'
              >
                <FaFile className='mr-2' />
                Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className='py-20 bg-base-100 w-full px-4 md:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center max-w-2xl mx-auto mb-16'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pb-2 bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text'>
                Layanan Kami
              </h2>
              <p className='text-base md:text-lg text-gray-400'>
                Kami menyediakan berbagai layanan untuk memudahkan akses
                informasi dan pelayanan kepada masyarakat terkait dengan Rutan
                Wonosobo
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'>
              {[
                {
                  title: 'Informasi Publik',
                  description:
                    'Akses informasi terkini tentang kebijakan dan kegiatan Rutan Wonosobo.',
                  icon: FaNewspaper,
                },
                {
                  title: 'Pelayanan Pengunjung',
                  description:
                    'Informasi jadwal kunjungan dan prosedur yang perlu diperhatikan.',
                  icon: FaUsers,
                },
                {
                  title: 'Pusat Media',
                  description:
                    'Galeri foto dan video kegiatan di Rutan Wonosobo.',
                  icon: FaPhotoFilm,
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className='card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <div className='card-body p-6 md:p-8 flex flex-col items-center'>
                    {/* Centered Icon Container */}
                    <div className='w-16 h-16 rounded-full bg-base-300 flex items-center justify-center mb-4 group'>
                      <service.icon className='w-8 h-8 text-blue-400 transition-colors duration-300 ease-in-out group-hover:text-green-400' />
                    </div>
                    {/* Centered Title */}
                    <h3 className='card-title text-lg md:text-xl font-bold mb-3 text-center'>
                      {service.title}
                    </h3>
                    {/* Justified Description */}
                    <p className='text-base text-gray-300 leading-relaxed text-center'>
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
