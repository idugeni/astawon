'use client';

import { useState, useEffect } from 'react';
export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  if (!show) return null;

  return (
    <div
      data-theme='night'
      className='fixed inset-0 w-screen h-screen flex items-center justify-center bg-base-200 z-50'
    >
      <span className='loading loading-infinity text-primary w-8 h-8'></span>
    </div>
  );
}
