'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MetadataProvider, useMetadata } from '@/utils/MetadataContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useMetadata(
    'ASTAWON - HUMAS RUTAN WONOSOBO',
    'Platform ini dirancang khusus sebagai alat bantu untuk memudahkan pekerjaan anggota humas dalam memberikan informasi terkini dan terpercaya kepada masyarakat seputar kegiatan dan perkembangan Rutan Wonosobo.'
  );

  return (
    <html lang='id' data-theme='night'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MetadataProvider>{children}</MetadataProvider>
      </body>
    </html>
  );
}
