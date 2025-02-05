'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent';
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Prompt sistem dalam bahasa Indonesia
const systemPrompt = `
Anda adalah jurnalis profesional yang ahli dalam menulis berita untuk media sosial. Tugas Anda adalah membuat konten berita yang menarik, faktual, dan terstruktur secara profesional berdasarkan judul yang diberikan.

Persyaratan Utama:
1. Struktur Artikel:
   - Paragraf Pembuka: Mulai dengan hook yang kuat yang menjawab 5W1H (Apa, Siapa, Di mana, Kapan, Mengapa, Bagaimana)
   - Isi: 3-4 paragraf dengan detail pendukung, konteks, dan dampak
   - Kutipan: Sertakan 1 kutipan yang relevan dengan atribusi yang tepat, dan sematkan "Kepala Rutan Wonosobo" sebagai pembuat kutipan
   - Kesimpulan: Rangkum poin-poin kunci dan implikasi ke depan

2. Gaya Penulisan:
   - Gunakan struktur piramida terbalik
   - Pertahankan pelaporan yang objektif dan seimbang
   - Gunakan kalimat aktif dan bahasa yang jelas
   - Jaga paragraf tetap ringkas (2-3 kalimat)
   - Gunakan kata penghubung antar paragraf

3. Optimasi Media Sosial:
   - Buat kalimat pembuka yang menarik
   - Gunakan bahasa deskriptif yang menciptakan gambaran mental
   - Sertakan statistik relevan jika ada
   - Struktur konten untuk mudah dibaca
   - Pertahankan nada profesional namun mudah diakses

4. Pedoman Format:
   - Mulai dengan lokasi dan tanggal: "Wonosobo - [Paragraf Pembuka] .[Tanggal dalam format (DD/MM) hari ini atau sekarang. contoh: (05/02) pastikan realtime saat ini]"
   - Sertakan atribusi yang tepat untuk kutipan
   - Jaga format yang konsisten
   - Akhiri dengan kesimpulan yang menarik

5. Pedoman Lain:
    - Pastikan artikel Anda informatif dan relevan
    - Gunakan kata-kata yang mudah dimengerti
    - Periksa kembali artikel Anda sebelum dipublikasikan
    - Jangan menyalin artikel dari sumber lain

6. Catatan:
    - Hindari kalimat seperti "Berikut adalah artikel berita yang telah dibuat berdasarkan judul yang diberikan, mengikuti semua persyaratan dan pedoman yang Anda sebutkan:"
    - Jangan menyertakan prompt ini dalam artikel Anda
    - Langsung buat artikel berita yang menarik berdasarkan judul yang diberikan
`;

export default function ArticleGenerator() {
  useMetadata(
    'Generator Artikel Profesional',
    'Buat artikel berita yang dioptimalkan untuk media sosial dengan AI'
  );

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [error, setError] = useState('');

  const formatArticleResponse = (text: string) => {
    text = text.replace(/^```html/g, '');
    text = text.replace(/```$/g, '');
    return text
      .replace(/\n{3,}/g, '\n\n')
      .replace(/(<p[^>]*>)\s+/g, '$1')
      .replace(/\s+(<\/p>)/g, '$1')
      .trim();
  };

  const constructPrompt = (title: string) => {
    return `${systemPrompt}

Judul: "${title}"

Format Output yang Dibutuhkan:
<article class="news-content">
  <h2 class="text-3xl font-bold mb-6">${title}</h2>
  <div class="article-body space-y-4">
    [Paragraf Pembuka dengan Lokasi dan Tanggal]
    [Paragraf Pendukung dengan Konteks]
    [Kutipan Ahli dan Analisis]
    [Dampak dan Implikasi]
    [Paragraf Penutup]
  </div>
</article>
`;
  };

  const generateArticleWithRetry = async (
    userInput: string,
    maxAttempts = 3
  ): Promise<string> => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: constructPrompt(userInput) }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 65536,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Error API: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
          throw new Error('Respons kosong dari model');
        }

        return formatArticleResponse(responseText);
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxAttempts) break;
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      }
    }

    throw lastError || new Error('Gagal setelah semua percobaan');
  };

  const generateArticle = async () => {
    if (!input.trim()) {
      setError('Mohon masukkan judul artikel');
      return;
    }

    setLoading(true);
    setArticle('');
    setError('');
    setAlertSuccess('');
    setAlertInfo('Sedang menghasilkan artikel Anda dengan pemrosesan AI...');

    const startTime = Date.now();

    try {
      const generatedArticle = await generateArticleWithRetry(input);
      setArticle(generatedArticle);
      setAlertInfo('');

      const processDuration = (Date.now() - startTime) / 1000;
      setAlertSuccess(
        `Artikel berhasil dibuat dalam ${processDuration.toFixed(
          2
        )} detik menggunakan Model AI "Gemini 2.0 Flash Thinking"`
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan yang tidak diharapkan'
      );
      setAlertInfo('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(article);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError('Gagal menyalin artikel ke clipboard');
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-4 max-w-7xl mx-auto'>
      <div className='w-full flex justify-between mb-8'>
        <Link href='/dashboard/article' className='btn btn-neutral gap-2'>
          <FaArrowLeft /> Kembali
        </Link>
        <Link
          href='/dashboard/article/title-generator'
          className='btn btn-neutral gap-2'
        >
          Buat Judul <FaArrowRight />
        </Link>
      </div>

      <div className='w-full mb-8'>
        <h1 className='text-4xl font-bold text-center'>Generator Artikel</h1>
        <p className='text-center mt-2 text-gray-600'>
          Buat artikel berita yang menarik untuk media sosial
        </p>
      </div>

      <div className='w-full bg-base-100 shadow-xl p-6 rounded-lg space-y-6'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text text-lg font-semibold'>
              Judul Artikel
            </span>
          </label>
          <textarea
            className='textarea textarea-bordered min-h-24 w-full resize-none focus:ring-none focus:outline-none'
            placeholder='Masukkan judul artikel Anda di sini...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && !e.shiftKey && generateArticle()
            }
            disabled={loading}
          />
          {error && <p className='text-error mt-2'>{error}</p>}
        </div>

        <div className='flex gap-4'>
          <button
            className='btn btn-primary flex-1'
            onClick={generateArticle}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className='loading loading-spinner text-primary loading-lg'></span>
                Membuat Artikel...
              </>
            ) : (
              'Buat Artikel'
            )}
          </button>
          {article && (
            <button className='btn btn-soft' onClick={copyToClipboard}>
              Salin ke Clipboard
            </button>
          )}
        </div>

        {alertInfo && (
          <div role='alert' className='alert alert-info'>
            <span>{alertInfo}</span>
          </div>
        )}

        {alertSuccess && (
          <div role='alert' className='alert alert-success'>
            <span>{alertSuccess}</span>
          </div>
        )}

        {article && (
          <div className='mt-8 prose max-w-none'>
            <div
              className='card bg-base-100 shadow-xl p-6'
              dangerouslySetInnerHTML={{ __html: article }}
            />
          </div>
        )}
      </div>

      {showToast && (
        <div className='toast toast-end'>
          <div className='alert alert-success'>
            <span>Artikel berhasil disalin!</span>
          </div>
        </div>
      )}
    </div>
  );
}
