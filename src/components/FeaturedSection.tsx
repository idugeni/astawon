import React from "react";
import { FaNewspaper, FaUsers, FaPhotoFilm } from "react-icons/fa6";

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
  return (
    <section
      data-theme="business"
      className="relative py-24 bg-gradient-to-br from-slate-900 to-slate-800 w-full px-4 md:px-8 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] from-emerald-400/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute w-[800px] h-[800px] -top-[300px] -right-[400px] from-blue-400/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mx-auto mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-300 to-blue-400 text-transparent bg-clip-text">
            Layanan Unggulan
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mt-4 leading-relaxed">
            Temukan kemudahan akses layanan publik melalui portal digital kami
            yang dirancang untuk memberikan pengalaman terbaik bagi masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/30 to-green-400/30" />
              </div>

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center transform transition-transform duration-500">
                    {service.icon &&
                      React.createElement(service.icon, {
                        className: "w-8 h-8 text-white",
                      })}
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <button className="flex items-center text-blue-400 hover:text-blue-300 font-medium">
                    <span>Selengkapnya</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
