'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

export default function ArticleTitleGenerator() {
  useMetadata('Title Generator', 'Generate SEO-optimized article titles with AI');

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const maxRetries = 3;

  const generateTitles = async (retryCount = 0) => {
    if (!input) return;
    setLoading(true);
    setTitles([]);
    setAlertSuccess('');
    setAlertInfo('Sedang memproses permintaan Anda. Model AI "Gemini 2.0 Flash Thinking" sedang menghasilkan judul, ini mungkin memerlukan waktu beberapa detik...');

    try {
      const timeoutDuration = Math.floor(Math.random() * 3000) + 10000; // Acak antara 10-12 detik
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

      const response = await fetch('/api/generateTitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Failed to generate titles');

      const data = await response.json();
      setTitles(data.titles);
      setAlertInfo('');
      setAlertSuccess(`Judul berhasil dibuat dalam ${timeoutDuration / 1000} detik.`);
    } catch (error) {
      console.error(error);
      if (retryCount < maxRetries) {
        generateTitles(retryCount + 1);
      } else {
        setAlertInfo('Terjadi kesalahan dalam proses pembuatan judul. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-8'>
      <div className='w-full flex justify-between mb-4'>
        <Link href='/dashboard/article' className='btn btn-ghost gap-2 flex items-center'>
          <FaArrowLeft /> Kembali
        </Link>
        <Link href='/dashboard/next-page' className='btn btn-ghost gap-2 flex items-center'>
          Lanjut <FaArrowRight />
        </Link>
      </div>

      <div className='w-full max-w-4xl bg-base-100 shadow-xl p-6 rounded-lg'>
        <div className='w-full mb-4'>
          <h1 className='text-4xl font-bold text-center'>Title Generator</h1>
        </div>

        <div className='w-full mb-4'>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Input Description</legend>
            <textarea
              className='textarea glass min-h-36 w-full resize-none border-none focus:outline-none shadow-md'
              placeholder='Enter a description that includes keyword and topic'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <div className='fieldset-label text-xs text-base-content'>
              Describe the content you need to create a title for
            </div>
          </fieldset>
        </div>

        <div className='w-full mb-4'>
          <button
            className='btn btn-primary w-full transition-all duration-300'
            onClick={() => generateTitles()}
            disabled={loading}
          >
            {loading ? 'Sedang membuat judul...' : 'Generate'}
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
