'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/utils/MetadataContext';

const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const generationConfig = {
  temperature: 2,
  topP: 1,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export default function ArticleTitleGenerator() {
  useMetadata(
    'Title Generator',
    'Generate SEO-friendly article titles based on your input description.'
  );

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const generateTitles = async () => {
    if (!input) return;

    setLoading(true);

    try {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error('API key not configured');
      }

      const response = await fetch(
        `${API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Anda adalah seorang ahli SEO dan copywriter profesional yang berspesialisasi dalam membuat judul artikel berita yang menarik dan optimal untuk SEO. 
                     Tugas Anda adalah menghasilkan judul artikel dalam Bahasa Indonesia yang:
                     - Gunakan kata-kata yang kuat dan spesifik
                     - Hindari penggunaan singkatan atau istilah yang tidak umum
                     - Gunakan kalimat aktif
                     - Hindari kalimat tanya
                     - Gunakan bahasa baku
                     - Netral dan tidak didramatisasi
                     - Mengandung kata kunci utama
                     - Optimal untuk SEO
                     - Informatif
                     - Menggunakan power words
                     - Membangun citra positif

                     Buatkan 10 judul artikel SEO-friendly berdasarkan input berikut: ${input}

                     Format output:
                     1. [Judul 1]
                     2. [Judul 2]
                     3. [Judul 3]
                     4. [Judul 4]
                     5. [Judul 5]
                     6. [Judul 6]
                     7. [Judul 7]
                     8. [Judul 8]
                     9. [Judul 9]
                     10. [Judul 10]`,
                  },
                ],
              },
            ],
            generationConfig,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate titles');
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;

      const titlesList = text
        .split('\n')
        .filter((line: string) => line.match(/^\d\./))
        .map((line: string) =>
          line
            .replace(/\*\*/g, '')
            .replace(/^\d\.\s/, '')
            .trim()
        );

      setTitles(titlesList);
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-8'>
      {/* Container untuk Back Button */}
      <div className='w-full mb-4'>
        <Link href='/dashboard/article' className='btn btn-ghost gap-2'>
          <FaArrowLeft /> Kembali
        </Link>
      </div>

      {/* Card Container */}
      <div className='w-full max-w-4xl bg-base-100 shadow-xl p-6 rounded-lg'>
        {/* Container untuk Judul */}
        <div className='w-full mb-4'>
          <h1 className='text-4xl font-bold text-center'>Title Generator</h1>
        </div>

        {/* Container untuk Input Section */}
        <div className='w-full mb-4'>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Input Description</legend>
            <textarea
              className='textarea glass min-h-36 w-full resize-none border-none focus:outline-none focus:border-none shadow-md'
              placeholder='Enter a description that includes keyword and topic'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <div className='fieldset-label'>
              Describe the content you need to create a title for
            </div>
          </fieldset>
        </div>

        {/* Container untuk Tombol Generate */}
        <div className='w-full mb-4'>
          <button
            className='btn btn-primary btn-soft w-full transition-all duration-300'
            onClick={generateTitles}
            disabled={loading || !input}
          >
            {loading ? (
              <>
                <span className='loading loading-infinity loading-xl'></span>
                <span className='ml-2'>Sedang membuat judul...</span>
              </>
            ) : titles.length > 0 ? (
              'Generate Again'
            ) : (
              'Generate'
            )}
          </button>
        </div>

        {/* Container untuk Tabel Judul */}
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
                      <Link
                        href='#'
                        className='btn btn-sm btn-secondary btn-soft rounded-sm'
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(title);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }}
                      >
                        Salin
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Toast Notification */}
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
