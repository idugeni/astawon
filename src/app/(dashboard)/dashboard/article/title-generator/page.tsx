'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

// Konfigurasi API
const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent';
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const systemPrompt = `
Anda adalah seorang ahli SEO dan copywriter profesional yang berspesialisasi dalam membuat judul berita yang menarik dan optimal untuk SEO.

Kriteria judul yang harus dipenuhi:
- Panjang Judul: 70-100 karakter
- Gunakan kata-kata yang kuat dan spesifik
- Hindari penggunaan singkatan atau istilah yang tidak umum
- Gunakan kalimat aktif
- Hindari kalimat tanya
- Gunakan bahasa baku
- Mengandung kata kunci utama
- Optimal untuk SEO
- Informatif dan menarik
- Menggunakan power words
- Membangun citra positif
- Menarik perhatian pembaca
`;

export default function ArticleTitleGenerator() {
  useMetadata('Pembuat Judul', 'Dapatkan judul artikel yang menarik dengan AI');

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');

  const processTitlesResponse = (responseText: string) => {
    return responseText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => /^\d+\./.test(line))
      .map((line) =>
        line
          .replace(/^\d+\.\s*/, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/[_~]/g, '')
          .replace(/\s+/g, ' ')
          .replace(/\.$/, '')
          .replace(/[^\w\s.,-]/g, '')
          .trim()
      )
      .filter((title) => title.length > 5);
  };

  const generateTitlesWithRetry = async (
    userInput: string,
    maxAttempts = 3
  ): Promise<string[]> => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const prompt = `${systemPrompt}
  
  Buatkan 5 judul berita yang SEO-friendly dengan deskripsi berikut: "${userInput}"
  
  Format judul:
  1. [Judul 1]
  2. [Judul 2]
  3. [Judul 3]
  4. [Judul 4]
  5. [Judul 5]

  Perhatikan hal berikut :
  - Pastikan anda hanya menulis langsung list judul yang dibutuhkan langsung tanpa ada kalimat tambahan dari response anda.
  - To the Point, yaitu list judul saja
  `;

        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 2,
              topP: 1,
              topK: 64,
              maxOutputTokens: 8192,
              stopSequences: ['6.'],
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate content');
        }

        const result = await response.json();
        const responseText = result.candidates[0].content.parts[0].text;

        if (!responseText) {
          throw new Error('Model tidak mengembalikan respons.');
        }

        const processedTitles = processTitlesResponse(responseText);
        if (processedTitles.length === 5) {
          return processedTitles;
        }

        throw new Error('Invalid number of titles generated');
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Fallback return jika semua percobaan gagal
    throw new Error('Failed after all retry attempts');
  };

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
      const generatedTitles = await generateTitlesWithRetry(input);
      setTitles(generatedTitles);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateTitles();
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      {/* Rest of the JSX remains exactly the same */}
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
