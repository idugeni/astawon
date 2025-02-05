'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

export default function ArticleTitleGenerator() {
  useMetadata(
    'Pembuat Judul',
    'Dapatkan judul artikel yang menarik dengan AI'
  );

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');

  const generateTitles = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTitles([]);
    setAlertSuccess('');
    setAlertInfo(
      'Sedang memproses permintaan Anda. Model AI "Gemini 2.0 Flash Thinking" sedang menghasilkan judul, ini mungkin memerlukan waktu beberapa detik...'
    );

    const startTime = Date.now();

    try {
      const response = await fetch('/api/generateTitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) throw new Error('Failed to generate titles');

      const data = await response.json();
      setTitles(data.titles);
      setAlertInfo('');

      const processDuration = (Date.now() - startTime) / 1000;
      setAlertSuccess(
        `Judul berhasil dibuat dalam ${processDuration.toFixed(
          2
        )} detik menggunakan Model AI "Gemini 2.0 Flash Thinking"`
      );
    } catch (error) {
      console.error(error);
      setAlertInfo(
        'Terjadi kesalahan dalam proses pembuatan judul. Silakan coba lagi nanti.'
      );
    }

    setLoading(false);
  };

  // Fungsi untuk menangani tekan Enter di textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateTitles();
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <div className='w-full flex justify-between mb-4'>
        <Link
          href='/dashboard/article'
          className='btn btn-neutral gap-2 flex items-center'
        >
          <FaArrowLeft /> Kembali
        </Link>
        <Link
          href='/dashboard/article/article-generator'
          className='btn btn-neutral gap-2 flex items-center'
        >
          Buat Berita <FaArrowRight />
        </Link>
      </div>

      <div className='w-full mb-8'>
        <h1 className='text-4xl font-bold text-center'>Pembuat Judul</h1>
      </div>

      <div className='w-full bg-base-100 shadow-xl p-6 rounded-lg'>
        <div className='w-full mb-4'>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Masukan Deskripsi</legend>
            <textarea
              className='textarea min-h-36 w-full resize-none border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary focus:outline-none'
              placeholder='Masukkan deskripsi yang mencakup kata kunci dan topik. Contoh : "Bimbingan Kerohanian di Rutan Wonosobo"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <div className='fieldset-label text-xs text-base-content'>
              Jelaskan konten yang Anda perlukan untuk membuat judul
            </div>
          </fieldset>
        </div>

        <div className='w-full mb-4'>
          <button
            className='btn btn-primary w-full transition-all duration-300'
            onClick={generateTitles}
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <span className='loading loading-infinity loading-lg text-primary'></span>
                <span className='ml-2'>Sedang membuat judul...</span>
              </div>
            ) : titles.length > 0 ? (
              'Hasilkan Lagi'
            ) : (
              'Buat Judul'
            )}
          </button>
        </div>

        {alertInfo && (
          <div role='alert' className='alert alert-info alert-soft mt-4'>
            <span>{alertInfo}</span>
          </div>
        )}

        {titles.length > 0 && (
          <div className='w-full mt-8'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Judul Artikel</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {titles.map((title, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td>
                      <button
                        className='btn btn-sm btn-secondary rounded-sm'
                        onClick={() => {
                          navigator.clipboard.writeText(title);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }}
                      >
                        Salin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {alertSuccess && (
          <div role='alert' className='alert alert-success alert-soft mt-4'>
            <span>{alertSuccess}</span>
          </div>
        )}
      </div>

      {showToast && (
        <div className='toast toast-top toast-end'>
          <div className='alert alert-success'>
            <span>Judul berhasil disalin!</span>
          </div>
        </div>
      )}
    </div>
  );
}
