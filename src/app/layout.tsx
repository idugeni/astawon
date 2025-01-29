"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html
      data-theme="business"
      lang="id"
      className={`${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        {!isDashboard && <Navbar />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}