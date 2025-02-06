'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from '@/hooks/useMetadata';

// Konfigurasi API
const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent';
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const systemInstruction = `
Anda adalah seorang ahli SEO dan copywriter profesional yang berspesialisasi dalam membuat judul berita yang menarik dan optimal untuk SEO.

⚠️ PENTING: Panjang judul **HARUS** antara **80-120 karakter**.
- **Judul tidak boleh kurang dari 80 karakter.**
- **Judul tidak boleh lebih dari 120 karakter.**
- Jika perlu, lakukan penyesuaian kata agar tetap dalam rentang ini tanpa mengubah makna.

### Kriteria Judul yang Harus Dipenuhi:
1. **Panjang Judul**:
   - **Minimal 80 karakter, maksimal 120 karakter (Wajib).**
   - Pastikan jumlah karakter sesuai sebelum menyajikan hasil.
2. **Struktur Bahasa**:
   - Gunakan **kalimat aktif**.
   - **Hindari singkatan atau akronim yang tidak umum.**
   - **Hindari kalimat tanya atau kalimat negatif.**
   - Gunakan **bahasa baku dan jelas**.
3. **Optimasi SEO**:
   - **Judul harus mengandung kata kunci utama** dan sinonimnya.
   - Gunakan **power words** untuk meningkatkan daya tarik.
   - **Membangun citra positif** terhadap topik yang diangkat.
4. **Daya Tarik Pembaca**:
   - Judul harus **informatif dan menarik**.
   - Gunakan teknik copywriting untuk **meningkatkan klik dan engagement**.
   - Buat **judul yang unik dan memancing rasa ingin tahu**.

### Format Output yang Diharapkan:
- **Hasil harus berupa daftar judul tanpa kalimat pembuka atau penutup.**
- **Setiap judul harus dimulai dengan angka dan diakhiri dengan titik.**
- Contoh: \n  1. Ini adalah contoh judul yang sesuai dengan aturan.
  2. Judul lainnya yang juga memenuhi kriteria.

### Catatan Tambahan:
- **Dilarang menyalin judul dari sumber lain.**
- **Hindari clickbait yang menyesatkan.**
- **Pastikan hasil akhir sesuai dengan semua kriteria di atas sebelum disajikan.**
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
          .replace(/[^\w\s.,:]/g, '')
          .trim()
      )
      .filter((title) => title.length > 5);
  };

  const fetchWithTimeout = (
    url: string,
    options: RequestInit,
    timeout: number
  ) => {
    return Promise.race([
      fetch(url, options),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      ),
    ]);
  };

  const generateTitlesWithRetry = async (
    userInput: string,
    maxAttempts = 3
  ): Promise<string[]> => {
    let timeout = 60000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const prompt = `${systemInstruction}

        Hasilkan 5 judul artikel berita sesuai dengan konteks "${userInput}"
        
        ### Format Output:
        1. [Judul 1].
        2. [Judul 2].
        3. [Judul 3].
        4. [Judul 4].
        5. [Judul 5].
        
        ⚠️ PENTING:
        - Jangan tambahkan kalimat pembuka atau penutup.
        - Pastikan panjang judul antara **80-120 karakter**.
        - Hanya tampilkan daftar judul dalam format di atas.
        `;

        const response = await fetchWithTimeout(
          `${API_ENDPOINT}?key=${API_KEY}`,
          {
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
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                stopSequences: ['6.'],
              },
            }),
          },
          timeout
        );

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
      } catch (error: unknown) {
        let errorMessage = 'Terjadi kesalahan yang tidak diketahui';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = String(error);
        }
        if (attempt === maxAttempts) {
          throw new Error(errorMessage);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    throw new Error('Gagal setelah semua percobaan ulang.');
  };

  const generateTitles = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTitles([]);
    setAlertSuccess('');
    setAlertInfo(
      'Sedang memproses permintaan Anda, ini mungkin memerlukan waktu beberapa saat...'
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
        )} detik, silakan periksa dan jika kurang sesuai, silakan ulangi prosesnya.`
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
            <legend className='fieldset-legend font-semibold text-lg'>
              Masukan Deskripsi
            </legend>
            <textarea
              className='textarea textarea-bordered min-h-36 w-full resize-none focus:ring-0 focus:border-transparent'
              placeholder='Masukkan deskripsi yang mencakup kata kunci dan topik, seperti: "Kegiatan Pembinaan Kemandirian di Rutan Wonosobo"'
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
                <span className='loading loading-spinner'></span>
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
          <div
            role='alert'
            className='alert alert-info alert-soft flex justify-center items-center text-center'
          >
            <span dangerouslySetInnerHTML={{ __html: alertInfo }} />
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
          <div
            role='alert'
            className='alert alert-success alert-soft flex justify-center items-center text-center'
          >
            <span dangerouslySetInnerHTML={{ __html: alertSuccess }} />
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
