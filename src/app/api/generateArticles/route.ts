// src/app/api/generateArticles/route.ts
import { NextResponse } from 'next/server';

const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const generationConfig = {
  temperature: 2,
  topP: 1,
  topK: 40,
  maxOutputTokens: 8192,
};

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

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
                  text: `Anda adalah seorang jurnalis profesional yang ahli dalam menulis artikel berita ringkas dan informatif. Anda perlu membuat artikel berita yang padat, dengan struktur yang jelas dan mudah dipahami.

                     Buatkan artikel berita dengan format berikut:
                     1. ${title}
                     2. Intro singkat (1-2 kalimat) yang langsung menyampaikan inti berita.
                     3. Paragraf utama yang mengandung 3-4 kalimat yang memberikan informasi lebih lanjut.
                     5. Artikel harus ringkas, dengan fokus pada informasi yang paling penting.
                     6. Kesimpulan yang menegaskan pesan utama dari berita.

                     Format output harus seperti berikut:
                     HEADLINE:
                     [Judul artikel]

                     INTRODUCTION:
                     [Teks intro]

                     MAIN_BODY:
                     [Paragraf utama]

                     QUOTE:
                     [buat kutipan sesuai dengan konteks berita]

                     CONCLUSION:
                     [Kesimpulan singkat]`,
                },
              ],
            },
          ],
          generationConfig,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate article');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Parse the generated content
    const sections = text.split(/\n(?=[A-Z_]+:)/);
    const introduction =
      sections
        .find((s: string) => s.includes('INTRODUCTION:'))
        ?.split('INTRODUCTION:')[1]
        .trim() || '';
    const mainBody =
      sections
        .find((s: string) => s.includes('MAIN_BODY:'))
        ?.split('MAIN_BODY:')[1]
        .trim() || '';
    const quote =
      sections
        .find((s: string) => s.includes('QUOTE:'))
        ?.split('QUOTE:')[1]
        .trim() || '';
    const conclusion =
      sections
        .find((s: string) => s.includes('CONCLUSION:'))
        ?.split('CONCLUSION:')[1]
        .trim() || '';

    return NextResponse.json({
      title,
      introduction,
      mainBody,
      quote,
      conclusion,
    });
  } catch (error) {
    console.error('Error generating article:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate article' },
      { status: 500 }
    );
  }
}
