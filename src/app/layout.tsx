// src/app/layout.tsx
"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

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
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <html
      data-theme="business"
      lang="id"
      className={`${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        {!isDashboard && (
          <Suspense fallback={<LoadingFallback />}>
            <Navbar />
          </Suspense>
        )}

        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </main>

        {!isDashboard && (
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        )}
      </body>
    </html>
  );
}
