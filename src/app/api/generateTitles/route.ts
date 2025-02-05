import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    'API Key tidak ditemukan. Pastikan variabel lingkungan NEXT_PUBLIC_GEMINI_API_KEY telah diset.'
  );
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-thinking-exp-01-21',
});

const generationConfig = {
  temperature: 2,
  topP: 1,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
  stopSequences: ['6.'],
};

const systemInstruction = `
Anda adalah seorang ahli SEO dan copywriter profesional yang berspesialisasi dalam membuat judul berita yang menarik dan optimal untuk SEO.

Kriteria judul yang harus dipenuhi:
- Panjang Judul: 60-80 kata
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

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();
    if (!userInput) {
      return NextResponse.json(
        { error: 'Input tidak boleh kosong' },
        { status: 400 }
      );
    }

    let attempt = 0;
    let titles: string[] = [];
    let success = false;
    const startTime = Date.now();
    let timeout = 60 * 1000;

    while (attempt < 3 && !success) {
      attempt++;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const chatSession = model.startChat({ generationConfig, history: [] });
        const prompt = `
${systemInstruction}

Buatkan 5 judul berita yang SEO-friendly dengan deskripsi berikut: "${userInput}"

Format judul:
1. [Judul 1]
2. [Judul 2]
3. [Judul 3]
4. [Judul 4]
5. [Judul 5]
`;

        const result = await chatSession.sendMessage(prompt);
        clearTimeout(timeoutId);

        const responseText = result.response.text();
        if (!responseText)
          throw new Error('Model tidak mengembalikan respons.');

        titles = responseText
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

        success = titles.length === 5;
      } catch (error) {
        console.error(
          `Percobaan ${attempt} gagal setelah ${timeout / 1000} detik:`,
          error
        );
        if (attempt < 3) {
          timeout += 60 * 1000;
        } else {
          return NextResponse.json(
            { error: 'Gagal menghasilkan judul setelah 3 kali percobaan.' },
            { status: 500 }
          );
        }
      }
    }

    const processDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    return NextResponse.json({ titles, processDuration }, { status: 200 });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan dalam pemrosesan.' },
      { status: 500 }
    );
  }
}
