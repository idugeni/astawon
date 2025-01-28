import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaSquareXTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-base-200'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Logo Image */}
        <div className='text-center mb-6'>
          <Image
            src='/next.svg'
            alt='Next.js Logo'
            width={100}
            height={100}
            className='mx-auto'
          />
        </div>

        {/* Description */}
        <div className='text-center text-sm mb-6'>
          <p className='max-w-5xl mx-auto text-base-content/80'>
            Platform ini dirancang khusus sebagai alat bantu untuk memudahkan
            pekerjaan anggota humas dalam memberikan informasi terkini dan
            terpercaya kepada masyarakat seputar kegiatan dan perkembangan Rutan
            Wonosobo.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className='flex justify-center gap-6 mb-6'>
          <Link
            href='https://facebook.com/rutanwonosobo'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='group p-3 bg-white rounded-full shadow-md transition-all hover:bg-blue-600 hover:text-white'>
              <FaFacebook className='text-blue-600 text-lg transition group-hover:text-white' />
            </div>
          </Link>
          <Link
            href='https://x.com/RutanWonosobo'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='group p-3 bg-white rounded-full shadow-md transition-all hover:bg-neutral-900 hover:text-white'>
              <FaSquareXTwitter className='text-neutral-900 text-lg transition group-hover:text-white' />
            </div>
          </Link>
          <Link
            href='https://www.instagram.com/rutanwonosobo/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='group p-3 bg-white rounded-full shadow-md transition-all hover:bg-pink-500 hover:text-white'>
              <FaInstagram className='text-pink-500 text-lg transition group-hover:text-white' />
            </div>
          </Link>
          <Link
            href='https://www.youtube.com/@rutanwonosobo9933'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='group p-3 bg-white rounded-full shadow-md transition-all hover:bg-red-600 hover:text-white'>
              <FaYoutube className='text-red-600 text-lg transition group-hover:text-white' />
            </div>
          </Link>
        </div>

        {/* Footer Text */}
        <div className='text-center text-sm text-base-content/70'>
          <p>
            © {currentYear} ASTAWON - Humas Rutan Wonosobo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
