// src/components/FeaturedSection.tsx
import React from 'react';
import { FaNewspaper, FaUsers, FaPhotoFilm } from 'react-icons/fa6';

const services = [
  {
    title: 'Informasi Publik',
    description: 'Akses informasi terkini tentang kebijakan dan kegiatan Rutan Wonosobo.',
    icon: FaNewspaper,
  },
  {
    title: 'Pelayanan Pengunjung',
    description: 'Informasi jadwal kunjungan dan prosedur yang perlu diperhatikan.',
    icon: FaUsers,
  },
  {
    title: 'Pusat Media',
    description: 'Galeri foto dan video kegiatan di Rutan Wonosobo.',
    icon: FaPhotoFilm,
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-base-100 w-full px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pb-2 bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
            Layanan Kami
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            Kami menyediakan berbagai layanan untuk memudahkan akses informasi dan pelayanan kepada masyarakat terkait dengan Rutan Wonosobo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body p-6 md:p-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center mb-4 group">
                  {service.icon && React.createElement(service.icon, {
                    className: 'w-8 h-8 text-blue-400 transition-colors duration-300 ease-in-out group-hover:text-green-400',
                  })}
                </div>
                <h3 className="card-title text-lg md:text-xl font-bold mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}