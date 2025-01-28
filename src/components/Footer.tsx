import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-theme="night" className="bg-gradient-to-r from-primary/10 to-secondary/10 relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <Link href="/" className="mb-6">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-center lg:text-left text-base-content/80 mb-6">
              Platform komunikasi resmi Lembaga Pemasyarakatan Kelas IIB Wonosobo 
              di bawah Kementerian Hukum dan HAM RI.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20 text-xl"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/3 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="footer-title text-lg font-semibold mb-4">Tautan Cepat</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.url}
                      className="link link-hover text-base-content/70 hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="footer-title text-lg font-semibold mb-4">Kontak</h3>
              <ul className="space-y-3 text-base-content/70">
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary shrink-0" />
                  Jl. Kyai Tambak Deres No.12, Wonosobo, Jawa Tengah
                </li>
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-primary shrink-0" />
                  (0286) 321654
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-primary shrink-0" />
                  humas@rutanwonosobo.go.id
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:w-1/3">
            <h3 className="footer-title text-lg font-semibold mb-4">
              Berlangganan Newsletter
            </h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="input input-bordered input-primary w-full"
              />
              <button
                type="submit"
                className="btn btn-primary btn-outline w-full"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
          <p>
            © {currentYear} ASTAWON - Humas Rutan Wonosobo. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="link link-hover">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="link link-hover">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/rutanwonosobo',
    icon: <FaFacebook className="text-blue-600" />,
  },
  {
    name: 'Twitter',
    url: 'https://x.com/RutanWonosobo',
    icon: <FaTwitter className="text-neutral-900" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/rutanwonosobo/',
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@rutanwonosobo9933',
    icon: <FaYoutube className="text-red-600" />,
  },
];

const quickLinks = [
  { title: 'Tentang Kami', url: '/about' },
  { title: 'Berita & Artikel', url: '/news' },
  { title: 'Layanan Publik', url: '/services' },
  { title: 'Karir', url: '/career' },
  { title: 'FAQ', url: '/faq' },
  { title: 'Kontak', url: '/contact' },
];

export default Footer;