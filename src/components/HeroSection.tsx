// src/components/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";
import { FaRocket, FaFile, FaRegStar, FaWaveSquare } from "react-icons/fa6";

export default function HeroSection() {
  return (
    <section data-theme="business" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover transform scale-110"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base-100/90 via-base-100/40 to-base-100/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-base-100/20 to-base-100/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
        <FaWaveSquare className="absolute bottom-20 left-1/4 text-primary/30 w-16 h-16 animate-pulse" />
        <FaRegStar className="absolute top-32 right-32 text-secondary/30 w-12 h-12 animate-spin-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto backdrop-blur-lg rounded-3xl border border-white/10 bg-base-100/20 p-8 shadow-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-text-shine">
              ASTAWON
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Inovasi Digital Humas Rutan Wonosobo
            </span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 font-medium text-neutral-content">
            Platform terintegrasi untuk transformasi digital layanan informasi
            <span className="mx-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              berbasis transparansi
            </span>
            dan
            <span className="mx-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent font-bold">
              akuntabilitas publik
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="btn btn-primary btn-lg group rounded-full px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              <FaRocket className="mr-3 text-xl animate-bounce group-hover:animate-none" />
              <span className="text-lg font-bold">Mulai Sekarang</span>
            </Link>

            <Link
              href="/about"
              className="btn btn-glass btn-lg group rounded-full px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FaFile className="mr-3 text-xl transition-transform group-hover:rotate-12" />
              <span className="text-lg font-bold">E-Dokumen</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
