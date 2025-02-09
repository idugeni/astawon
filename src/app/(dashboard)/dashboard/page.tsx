import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';
import { FaRegNewspaper, FaClipboardList, FaChartLine, FaUsers, FaCogs } from 'react-icons/fa';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Dashboard - ${siteConfig.name}`,
    description: 'Platform AI canggih untuk Humas Rutan Wonosobo, menghadirkan otomatisasi pembuatan berita dan judul dengan teknologi mutakhir yang mendukung efisiensi dan profesionalisme.',
  };
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mx-auto">
      <p className="text-justify leading-relaxed text-base-content w-full mb-8">
        Selamat datang di platform inovatif yang dirancang khusus untuk Humas Rutan Wonosobo. Sistem berbasis kecerdasan buatan ini memungkinkan otomatisasi pembuatan berita dan judul dengan tingkat akurasi tinggi. Dengan teknologi API canggih, kami memberikan solusi modern yang membantu meningkatkan efisiensi kerja serta memastikan informasi yang dipublikasikan tetap relevan, profesional, dan berkualitas tinggi. Nikmati kemudahan dalam mengelola berita dengan kualitas terbaik.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-8 bg-primary shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-primary-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-content rounded-full mb-6">
            <FaRegNewspaper className="text-4xl text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-primary-content mb-4">Pembuatan Judul Otomatis</h2>
          <p className="text-sm text-justify text-primary-content mb-4">
            Teknologi AI kami secara otomatis menghasilkan judul berita yang menarik dan sesuai dengan standar jurnalistik. Dengan analisis cerdas, sistem memastikan bahwa setiap judul relevan dengan isi berita, meningkatkan daya tarik dan keterbacaan oleh publik. Fitur ini membantu menjaga konsistensi dan keakuratan dalam pembuatan konten.
          </p>
          <p className="text-sm text-justify text-primary-content">
            Dengan menggunakan teknologi mutakhir, kami membantu Anda menciptakan judul yang efektif untuk memikat perhatian pembaca, sehingga berita Anda lebih mudah ditemukan dan dibaca oleh audiens.
          </p>
        </div>

        <div className="p-8 bg-secondary shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-secondary-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-secondary-content rounded-full mb-6">
            <FaClipboardList className="text-4xl text-secondary" />
          </div>
          <h2 className="text-2xl font-semibold text-secondary-content mb-4">Generasi Berita Terstruktur</h2>
          <p className="text-sm text-justify text-secondary-content mb-4">
            Dengan sistem pemrosesan otomatis, berita yang dihasilkan memiliki struktur profesional dan sesuai dengan standar komunikasi humas. Cukup masukkan data penting, dan sistem akan menyusun berita dengan format yang rapi, jelas, dan mudah dipahami. Hal ini sangat menghemat waktu dan usaha dalam menulis berita.
          </p>
          <p className="text-sm text-justify text-secondary-content">
            Kami memastikan bahwa setiap artikel yang dihasilkan memenuhi standar kualitas tinggi, baik dalam hal gaya bahasa maupun format, memudahkan Anda dalam distribusi informasi kepada publik.
          </p>
        </div>

        <div className="p-8 bg-accent shadow-lg rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-accent-focus w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-accent-content rounded-full mb-6">
            <FaChartLine className="text-4xl text-accent" />
          </div>
          <h2 className="text-2xl font-semibold text-accent-content mb-4">Optimasi Konten</h2>
          <p className="text-sm text-justify text-accent-content mb-4">
            AI kami tidak hanya menghasilkan konten, tetapi juga mengoptimalkannya agar lebih menarik, informatif, dan sesuai dengan audiens target. Dengan fitur ini, setiap berita yang dipublikasikan akan memiliki dampak yang lebih besar dan efektif dalam menyampaikan informasi.
          </p>
          <p className="text-sm text-justify text-accent-content">
            Dengan menggunakan teknik analisis mendalam dan pengoptimalan konten, kami membantu memastikan bahwa artikel Anda memiliki kualitas yang lebih baik dan lebih mudah ditemukan oleh audiens yang tepat.
          </p>
        </div>
      </div>

      {/* Additional Section - Benefits of using the platform */}
      <div className="mt-16 p-8 bg-neutral shadow-lg rounded-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">Manfaat Menggunakan Platform Kami</h2>
        <ul className="list-disc list-inside text-base-content">
          <li><strong>Meningkatkan Efisiensi:</strong> Hemat waktu dalam pembuatan berita dan judul dengan sistem otomatis yang cerdas.</li>
          <li><strong>Kualitas Terjamin:</strong> Konten yang dihasilkan sesuai dengan standar jurnalistik dan profesional.</li>
          <li><strong>Hemat Waktu:</strong> Otomatisasi yang memungkinkan Anda lebih fokus pada hal-hal penting lainnya.</li>
          <li><strong>Berita Lebih Relevan:</strong> Setiap berita yang dibuat selalu mengikuti perkembangan terbaru dan relevansi dengan audiens.</li>
        </ul>
      </div>

      {/* Additional Section - How it Works */}
      <div className="mt-16 p-8 bg-primary shadow-lg rounded-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-primary-content mb-6">Cara Kerja Sistem Kami</h2>
        <p className="text-lg text-justify text-primary-content mb-4">
          Sistem kami bekerja dengan mengumpulkan data yang relevan dan menerapkan algoritma AI canggih untuk menghasilkan konten yang sesuai dengan kebutuhan Anda. Proses ini dimulai dengan memasukkan data dasar, diikuti dengan analisis otomatis untuk menghasilkan struktur berita yang sempurna.
        </p>
        <p className="text-lg text-justify text-primary-content">
          Selanjutnya, teknologi AI kami akan mengoptimalkan konten untuk memastikan keterbacaan yang maksimal dan daya tarik audiens yang lebih tinggi. Sistem terus belajar dan berkembang, memastikan bahwa konten yang dihasilkan semakin baik seiring berjalannya waktu.
        </p>
      </div>
    </div>
  );
}
