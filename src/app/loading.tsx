'use client';

import { useState, useEffect } from 'react';
import { useMetadata } from '@/hooks/useMetadata';

export default function Loading() {
  useMetadata('Memuat...', 'Memuat halaman...');
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShow(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      data-theme='night'
      className={`fixed inset-0 w-screen h-screen flex items-center justify-center bg-base-200 z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='flex flex-col items-center'>
        <span
          className='loading loading-spinner w-10 h-10'
          aria-label='Memuat...'
        ></span>
        <p className='mt-3 text-white text-sm font-medium'>Memuat halaman...</p>
      </div>
    </div>
  );
}
