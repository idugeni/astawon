// src/app/about/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCss3Alt,
  FaCloud,
  FaBrain,
  FaFacebook,
  FaSquareXTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/utils/MetadataContext';

export default function AboutPage() {
  useMetadata(
    'About',
    'Platform ini dirancang khusus sebagai alat bantu untuk memudahkan pekerjaan anggota humas dalam memberikan informasi terkini dan terpercaya kepada masyarakat seputar kegiatan dan perkembangan Rutan Wonosobo.'
  );

  return (
    <div className='min-h-screen font-sans antialiased'>
      <Navbar />
      <div
       
        className='min-h-screen bg-base-100 p-8 sm:p-16 transition-all duration-700 ease-in-out'
      >
        <section className='max-w-7xl mx-auto'>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-6 pb-2 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text'>
            Tentang ASTAWON
          </h1>

          <p className='leading-relaxed text-center mb-8'>
            ASTAWON adalah platform digital yang dikelola oleh Humas Rutan
            Wonosobo. Dirancang untuk mempermudah anggota humas memberikan
            informasi terpercaya kepada masyarakat tentang Rutan Wonosobo.
          </p>

          <div className='mt-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {/* Card for Next.js */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-blue-500 mb-4'>
                  <FaReact />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  Next.js
                </h3>
                <p className='text-sm text-center'>
                  Untuk pengembangan front-end yang cepat dan responsif.
                </p>
              </div>

              {/* Card for Node.js */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-green-500 mb-4'>
                  <FaNodeJs />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  Node.js
                </h3>
                <p className='text-sm text-center'>
                  Untuk pengelolaan server dan API dengan performa tinggi.
                </p>
              </div>

              {/* Card for Firebase */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-yellow-500 mb-4'>
                  <FaDatabase />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  Firebase
                </h3>
                <p className='text-sm text-center'>
                  Platform cloud yang handal untuk autentikasi dan penyimpanan
                  data.
                </p>
              </div>

              {/* Card for Tailwind CSS */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-purple-500 mb-4'>
                  <FaCss3Alt />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  Tailwind CSS
                </h3>
                <p className='text-sm text-center'>
                  Untuk desain UI yang responsif dan mudah disesuaikan.
                </p>
              </div>

              {/* Card for Vercel */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-cyan-500 mb-4'>
                  <FaCloud />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  Vercel
                </h3>
                <p className='text-sm text-center'>
                  Untuk penyebaran dan hosting aplikasi yang cepat dan efisien.
                </p>
              </div>

              {/* Card for AI API */}
              <div className='card glass w-full bg-base-200 p-6 rounded-lg shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out'>
                <div className='flex items-center justify-center text-4xl text-yellow-500 mb-4'>
                  <FaBrain />
                </div>
                <h3 className='text-lg font-semibold mb-2 text-center'>
                  AI API
                </h3>
                <p className='text-sm text-center'>
                  Integrasi kecerdasan buatan untuk analisis data otomatis.
                </p>
              </div>
            </div>
          </div>

          {/* Author Box */}
          <div className='mt-16 flex justify-center'>
            <div className='card glass w-full max-w-xl bg-base-200 p-8 rounded-lg shadow-xl'>
              <Image
                src='/author.jpeg'
                alt='Author'
                width={120}
                height={120}
                className='mx-auto rounded-full border-4 border-gray-300'
              />
              <h3 className='text-xl font-bold text-center mt-4'>
                Eliyanto Sarage
              </h3>
              <div className='text-center mt-2'>
                <div className='badge badge-soft badge-primary'>
                  Full Stack Developer
                </div>
              </div>
              <div className='flex justify-center space-x-6 mt-6'>
                <Link
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='group p-3 bg-white rounded-full shadow-md transition hover:bg-blue-600'>
                    <FaFacebook className='text-blue-600 text-lg transition group-hover:text-white' />
                  </div>
                </Link>
                <Link
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='group p-3 bg-white rounded-full shadow-md transition hover:bg-neutral-900'>
                    <FaSquareXTwitter className='text-neutral-900 text-lg transition group-hover:text-white' />
                  </div>
                </Link>
                <Link
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='group p-3 bg-white rounded-full shadow-md transition hover:bg-pink-500'>
                    <FaInstagram className='text-pink-500 text-lg transition group-hover:text-white' />
                  </div>
                </Link>
                <Link
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='group p-3 bg-white rounded-full shadow-md transition hover:bg-gray-800'>
                    <FaGithub className='text-gray-800 text-lg transition group-hover:text-white' />
                  </div>
                </Link>
              </div>
              <p className='mt-6 text-center text-sm leading-relaxed italic font-mono'>
                &quot;Jangan berhenti belajar dan mencoba hal baru. Dunia terus
                bergerak maju, dan kita harus siap untuk berkembang
                bersama.&quot;
              </p>
            </div>
          </div>
          {/* End of Author Box */}
        </section>
      </div>
      <Footer />
    </div>
  );
}
