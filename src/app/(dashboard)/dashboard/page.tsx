import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';
import { FaRegNewspaper, FaClipboardList, FaChartLine } from 'react-icons/fa';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Dashboard - ${siteConfig.name}`,
    description: 'Platform AI canggih untuk Humas Rutan Wonosobo, menghadirkan otomatisasi pembuatan berita dan judul dengan teknologi mutakhir yang mendukung efisiensi dan profesionalisme.',
  };
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-justify leading-relaxed text-base-content w-full">
        Selamat datang di platform inovatif yang dirancang khusus untuk Humas Rutan Wonosobo. Sistem berbasis kecerdasan buatan ini memungkinkan otomatisasi pembuatan berita dan judul dengan tingkat akurasi tinggi. Dengan teknologi API canggih, kami memberikan solusi modern yang membantu meningkatkan efisiensi kerja serta memastikan informasi yang dipublikasikan tetap relevan, profesional, dan berkualitas tinggi.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="p-6 bg-primary shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-primary-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-content rounded-full mb-4">
            <FaRegNewspaper className="text-4xl text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-primary-content">Pembuatan Judul Otomatis</h2>
          <p className="mt-2 text-sm text-justify text-primary-content">
            Teknologi AI kami secara otomatis menghasilkan judul berita yang menarik dan sesuai dengan standar jurnalistik. Dengan analisis cerdas, sistem memastikan bahwa setiap judul relevan dengan isi berita, meningkatkan daya tarik dan keterbacaan oleh publik.
          </p>
        </div>

        <div className="p-6 bg-secondary shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-secondary-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-secondary-content rounded-full mb-4">
            <FaClipboardList className="text-4xl text-secondary" />
          </div>
          <h2 className="text-2xl font-semibold text-secondary-content">Generasi Berita Terstruktur</h2>
          <p className="mt-2 text-sm text-justify text-secondary-content">
            Dengan sistem pemrosesan otomatis, berita yang dihasilkan memiliki struktur profesional dan sesuai dengan standar komunikasi humas. Cukup masukkan data penting, dan sistem akan menyusun berita dengan format yang rapi, jelas, dan mudah dipahami.
          </p>
        </div>

        <div className="p-6 bg-accent shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-accent-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-accent-content rounded-full mb-4">
            <FaChartLine className="text-4xl text-accent" />
          </div>
          <h2 className="text-2xl font-semibold text-accent-content">Optimasi Konten</h2>
          <p className="mt-2 text-sm text-justify text-accent-content">
            AI kami tidak hanya menghasilkan konten, tetapi juga mengoptimalkannya agar lebih menarik, informatif, dan sesuai dengan audiens target. Dengan fitur ini, setiap berita yang dipublikasikan akan memiliki dampak yang lebih besar dan efektif dalam menyampaikan informasi.
          </p>
        </div>
      </div>
    </div>
  );
}
