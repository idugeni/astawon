"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaNewspaper, FaUsers, FaPhotoFilm, FaAnglesRight } from "react-icons/fa6";

const services = [
  {
    title: "Informasi Publik",
    description:
      "Akses informasi terkini tentang kebijakan dan kegiatan Rutan Wonosobo.",
    icon: FaNewspaper,
  },
  {
    title: "Pelayanan Pengunjung",
    description:
      "Informasi jadwal kunjungan dan prosedur yang perlu diperhatikan.",
    icon: FaUsers,
  },
  {
    title: "Pusat Media",
    description: "Galeri foto dan video kegiatan di Rutan Wonosobo.",
    icon: FaPhotoFilm,
  },
];

export default function FeaturedSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className="relative py-24 bg-gradient-to-br from-background to-secondary w-full px-4 md:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] from-primary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute w-[800px] h-[800px] -top-[300px] -right-[400px] from-accent/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mx-auto mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 pb-4 bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
            Layanan Unggulan
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 mt-4 leading-relaxed">
            Temukan kemudahan akses layanan publik melalui portal digital kami
            yang dirancang untuk memberikan pengalaman terbaik bagi masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-base-200 backdrop-blur-sm border border-base-content/10 rounded-2xl p-8 transition-all duration-500 hover:border-base-content/20 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center transform transition-all duration-500 group-hover:from-accent group-hover:to-primary">
                    {service.icon &&
                      React.createElement(service.icon, {
                        className: "w-8 h-8 text-base-content transition-colors duration-500 group-hover:text-primary-content",
                      })}
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-base-content mb-4">
                  {service.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex justify-center items-center">
                  <Link href="#" className="btn btn-primary btn-soft rounded-full text-primary hover:text-primary-content font-medium space-x-2">
                    <span>Selengkapnya</span>
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
