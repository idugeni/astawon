'use client';
import { useState } from 'react';
import { FaNewspaper, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent';
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Prompt sistem dalam bahasa Indonesia
const systemInstruction = `
Anda adalah jurnalis profesional yang ahli dalam menulis berita untuk media sosial. Tugas Anda adalah membuat konten berita yang menarik, faktual, dan terstruktur secara profesional berdasarkan judul yang diberikan.

Persyaratan Utama:
1. Struktur Artikel:
   - Paragraf Pembuka: Mulai dengan hook yang kuat yang menjawab 5W1H (Apa, Siapa, Di mana, Kapan, Mengapa, Bagaimana)
   - Isi: 3-4 paragraf dengan detail pendukung, konteks, dan dampak
   - Kutipan: Sertakan 1 kutipan yang relevan dengan atribusi yang tepat, dan sematkan "Kepala Rutan Wonosobo" sebagai pembuat kutipan
   - Kesimpulan: Rangkum poin-poin kunci dan implikasi ke depan
   - Hashtag: Gunakan hashtag berikut: #kemenimipas #guardandguide #infoimipas #pemasyarakatan

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
   - Panjang total artikel: **2000-2200 karakter** (Pastikan artikel Anda sesuai dengan panjang ini)

4. Pedoman Format:
   - Mulai dengan lokasi dan tanggal: "Wonosobo - [Paragraf Pembuka].(DD/MM) todayDate"
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
    - Langsung mulai dengan judul artikel yang diberikan
    - Gunakan bahasa Indonesia baku dan benar
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
    return text
      .replace(/^```html\s*/, '')
      .replace(/```\s*$/, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(
        /(<(p|h[1-6]|div|blockquote|li|ul|ol|pre|table)[^>]*>)\s+/g,
        '$1'
      )
      .replace(/\s+(<\/(p|h[1-6]|div|blockquote|li|ul|ol|pre|table)>)/g, '$1')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/&amp;/g, '&amp;')
      .replace(/<\/p>\s*\.\s*<p>/g, '</p>\n<p>')
      .trim();
  };

  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `(${day}/${month})`;
  };

  const constructPrompt = (title: string) => {
    const todayDate = getFormattedDate();

    return `${systemInstruction}

Buatlah sebuah artikel berita dengan judul "${title}" sesuai dengan ketentuan yang sudah dijelaskan

Format Output:
    <p class="text-lg md:text-xl font-bold mb-6">${title}</p>
    <p class="mb-4 text-justify">[Paragraf Pembuka dengan Lokasi dan Tanggal].${todayDate}</p>
    <p class="mb-4 text-justify">[Paragraf Pendukung dengan Konteks]</p>
    <p class="mb-4 text-justify">[Kutipan Ahli dan Analisis]</p>
    <p class="mb-4 text-justify">[Dampak dan Implikasi]</p>
    <p class="mb-4 text-justify">[Paragraf Penutup]</p>
    <p class="mb-4 text-justify">[Hashtag]</p>

PENTING:
- Langsung buat dari bagian : <p class="text-lg md:text-xl font-bold mb-6">${title}</p>
- Jangan tambahkan kalimat pembuka atau penutup.
- Panjang artikel (wajib) antara **2000 karakter** sampai **2200 karakter**
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
              temperature: 1,
              topP: 0.95,
              topK: 64,
              maxOutputTokens: 8192,
              stopSequences: ['<p class="mb-4 text-justify">[Hashtag]</p>'],
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
    setAlertInfo('Sedang menghasilkan artikel Anda, mohon tunggu...');

    const startTime = Date.now();

    try {
      const generatedArticle = await generateArticleWithRetry(input);
      setArticle(generatedArticle);
      setAlertInfo('');

      const processDuration = (Date.now() - startTime) / 1000;
      setAlertSuccess(
        `Artikel berhasil dibuat dalam ${processDuration.toFixed(
          2
        )} detik. AI dapat melakukan kesalahan, jadi pastikan untuk memeriksa kembali artikel Anda sebelum digunakan.`
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
      const tempElement = document.createElement('div');
      tempElement.innerHTML = article;

      let formattedText = tempElement.innerHTML
        .replace(/<\/p>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/\n+/g, '\n')
        .replace(/[ ]+/g, ' ')
        .trim();

      formattedText = formattedText.replace(/^\s+/gm, '');
      formattedText = formattedText.replace(/\n/g, '\n\n');

      await navigator.clipboard.writeText(formattedText);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError('Gagal menyalin artikel ke clipboard');
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center max-w-7xl mx-auto'>
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
        <div
          tabIndex={0}
          className='collapse collapse-arrow bg-base-100 border border-base-300'
        >
          <div className='collapse-title font-semibold flex items-center gap-2'>
            <FaNewspaper /> Detail Artikel Berita
          </div>
          <div className='collapse-content text-sm'>
            <ul className='list-disc pl-4 space-y-2'>
              <li>
                Artikel telah diformat sesuai standar jurnalistik profesional.
              </li>
              <li>
                Panjang artikel disesuaikan untuk performa optimal di media
                sosial (Instagram, Facebook, dan Twitter), berkisar antara{' '}
                <strong>2.000 - 2.200 karakter</strong>.
              </li>
              <li>
                Memuat kutipan yang relevan dan telah diberi atribusi dengan
                benar.
              </li>
              <li>
                Sudah mencakup hashtag yang relevan untuk meningkatkan
                jangkauan.
              </li>
              <li>
                Struktur artikel mengikuti <strong>piramida terbalik</strong>{' '}
                agar informasi penting tersampaikan lebih dulu.
              </li>
            </ul>
          </div>
        </div>
        <div className='form-control w-full'>
          <textarea
            className='textarea textarea-bordered min-h-24 w-full resize-none focus:ring-0 focus:border-transparent'
            placeholder='Masukkan judul artikel Anda di sini...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && !e.shiftKey && generateArticle()
            }
            disabled={loading}
          />
          {error && (
            <p className='text-error text-sm text-center mt-2'>{error}</p>
          )}
        </div>

        <div className='flex flex-col gap-4 md:flex-row md:gap-6'>
          <button
            className='btn btn-primary w-full md:flex-1'
            onClick={generateArticle}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className='loading loading-spinner'></span>
                <span className='ml-2'>Membuat Artikel...</span>
              </>
            ) : (
              'Buat Artikel'
            )}
          </button>

          {article && (
            <button
              className='btn btn-soft w-full md:w-auto'
              onClick={copyToClipboard}
            >
              Salin ke Clipboard
            </button>
          )}
        </div>

        {alertInfo && (
          <div
            role='alert'
            className='alert alert-info alert-soft flex justify-center items-center text-center'
          >
            <span>{alertInfo}</span>
          </div>
        )}

        {article && (
          <div className='mt-8 prose prose-sm md:prose-base w-full'>
            <div dangerouslySetInnerHTML={{ __html: article }} />
          </div>
        )}

        {alertSuccess && (
          <div
            role='alert'
            className='alert alert-success alert-soft flex justify-center items-center text-center'
          >
            <span>{alertSuccess}</span>
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
