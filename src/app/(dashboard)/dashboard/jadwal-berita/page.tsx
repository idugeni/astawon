import { LuCalendar, LuUsers, LuLayoutList, LuNewspaper } from 'react-icons/lu';
import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Jadwal Berita - ${siteConfig.name}`,
    description: 'Jadwal berita hari ini',
  };
};

export default function JadwalBerita() {
  const jadwalHarian = [
    { hari: 'Senin', petugas: 'Mugiwara' },
    { hari: 'Selasa', petugas: 'Mugiwara' },
    { hari: 'Rabu', petugas: 'Setyarifqi' },
    { hari: 'Kamis', petugas: 'Setyarifqi' },
    { hari: 'Jumat', petugas: 'Ibnu Abd' },
    { hari: 'Sabtu', petugas: 'Ibnu Abd' },
    { hari: 'Minggu', petugas: 'Yosh' },
  ];

  const hariIni = new Date().getDay();

  const isOnline = (index: number) => {
    return hariIni === ((index + 1) % 7);
  };

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center mx-auto'>
      {/* Bagian Atas - Header */}
      <div className='w-full mb-8 text-center'>
        <div className='card bg-primary text-primary-content shadow-xl mb-6 p-6 w-full'>
          <h1 className='text-3xl font-bold mb-2'>Jadwal Berita</h1>
          <p className='text-primary-content/80 text-lg'>
            Manajemen Penugasan Tim Berita
          </p>
        </div>
      </div>

      {/* Bagian Utama - Jadwal Berita */}
      <div className='card bg-base-100 shadow-xl mb-6 w-full'>
        <div className='card-body'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-3 bg-primary/10 rounded-xl'>
              <LuCalendar className='w-8 h-8 text-primary' />
            </div>
            <h2 className='card-title text-xl'>Jadwal Harian</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {jadwalHarian.map((jadwal, index) => (
              <div
                key={index}
                className={`card bg-base-200 hover:bg-base-300 transition-colors duration-300 w-full ${isOnline(index) ? 'border-4 border-primary' : ''
                  }`}
              >
                <div className='card-body p-4 flex items-center justify-between'>
                  <div className='avatar avatar-placeholder'>
                    <div className='w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center'>
                      <span className='text-xl font-semibold'>
                        {jadwal.petugas.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <span className='font-medium text-lg'>{jadwal.hari}</span>
                    <div className='badge badge-primary badge-sm mt-2'>
                      <LuUsers className='w-4 h-4' />
                      {jadwal.petugas}
                    </div>
                    {/* Menambahkan Status Online atau Offline */}
                    <div
                      className={`badge badge-sm mt-2 ${isOnline(index) ? 'badge-success' : 'badge-error'
                        }`}
                    >
                      {isOnline(index) ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bagian Bawah - Desain Template dan Penanggung Jawab Website */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full'>
        {/* Desain Template */}
        <div className='col-span-1 w-full'>
          <div className='card bg-base-100 shadow-xl w-full'>
            <div className='card-body'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='p-3 bg-secondary/10 rounded-xl'>
                  <LuLayoutList className='w-8 h-8 text-secondary' />
                </div>
                <h2 className='card-title text-xl'>Desain Template Ucapan</h2>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-4 bg-secondary/10 rounded-xl'>
                  <div className='avatar avatar-placeholder'>
                    <div className='bg-secondary text-secondary-content rounded-full w-12'>
                      <span className='text-xl font-semibold'>Y</span>
                    </div>
                  </div>
                  <div>
                    <p className='font-semibold text-xl text-secondary'>
                      Yosh
                    </p>
                    <p className='text-sm text-base-content/70'>
                      Template Designer
                    </p>
                  </div>
                </div>
                <div className='divider'></div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-lg mb-3'>
                    Deskripsi Tugas
                  </h4>
                  <ul className='list-disc list-inside space-y-1 text-base-content/70'>
                    <li className='flex items-start gap-2'>
                      <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                      <span>Membuat desain template ucapan</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                      <span>Memperbarui template secara berkala</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                      <span>Menyesuaikan dengan kebutuhan konten</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Penanggung Jawab Website */}
        <div className='col-span-1 w-full'>
          <div className='card bg-base-100 shadow-xl w-full'>
            <div className='card-body'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='p-3 bg-accent/10 rounded-xl'>
                  <LuNewspaper className='w-8 h-8 text-accent' />
                </div>
                <h2 className='card-title text-xl'>
                  Penanggung Jawab Website
                </h2>
              </div>
              <div className='space-y-6'>
                <div className='flex flex-wrap gap-6'>
                  <div className='card w-full bg-base-200 shadow'>
                    <div className='card-body'>
                      <div className='flex items-center gap-4'>
                        <div className='avatar avatar-placeholder'>
                          <div className='bg-accent text-accent-content rounded-full w-16'>
                            <span className='text-2xl font-semibold'>S</span>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <h3 className='text-2xl font-semibold'>Sarage</h3>
                          <p className='text-base-content/70'>
                            Website Administrator
                          </p>
                          <div className='mt-2 flex flex-wrap gap-2'>
                            <span className='badge badge-accent badge-sm'>
                              Web Development
                            </span>
                            <span className='badge badge-accent badge-sm'>
                              System Maintenance
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='card w-full bg-base-200 shadow'>
                    <div className='card-body'>
                      <h4 className='font-medium text-lg mb-3'>
                        Tanggung Jawab
                      </h4>
                      <ul className='space-y-3 text-base-content/70'>
                        <li className='flex items-start gap-2'>
                          <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                          <span>
                            Memastikan website berjalan dengan optimal
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                          <span>Menangani masalah teknis yang muncul</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                          <span>
                            Melakukan pembaruan dan pemeliharaan sistem
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <div className='w-2 h-2 mt-2 rounded-full bg-accent'></div>
                          <span>Mengawasi keamanan website</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
