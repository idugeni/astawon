'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MetadataProvider, useMetadata } from '@/utils/MetadataContext';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useMetadata(
    process.env.NEXT_PUBLIC_APP_TITLE || 'ASTAWON - HUMAS RUTAN WONOSOBO',
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      'Platform ini dirancang khusus sebagai alat bantu untuk memudahkan pekerjaan anggota humas dalam memberikan informasi terkini dan terpercaya kepada masyarakat seputar kegiatan dan perkembangan Rutan Wonosobo.'
  );

  return (
    <html data-theme="corporate" lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <React.StrictMode>
          <MetadataProvider>{children}</MetadataProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
