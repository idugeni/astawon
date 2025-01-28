// src/app/layout.tsx
import { Poppins } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/config/metadata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata = {
  ...defaultMetadata,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      data-theme="business"
      lang="id"
      className={`${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
        </Suspense>

        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </main>

        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
