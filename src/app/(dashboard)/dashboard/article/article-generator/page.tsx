// src/app/(dashboard)/dashboard/article/article-generator/page.tsx
'use client';

import { useState } from 'react';
import { FaArrowLeft, FaSpinner, FaPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// API Configuration
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const generationConfig = {
  temperature: 2,
  topP: 1,
  topK: 40,
  maxOutputTokens: 8192,
};

interface ArticleSection {
  title: string;
  content: string;
}

export default function ArticleGenerator() {
  useDocumentTitle("Article Generator");

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedArticle, setGeneratedArticle] = useState<{
    introduction: string;
    sections: ArticleSection[];
    conclusion: string;
    metaDescription: string;
  } | null>(null);

  const generateArticle = async () => {
    if (!title) return;

    setLoading(true);
    setError('');

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
                     1. Judul: ${title}
                     2. Intro singkat (1-2 kalimat) yang langsung menyampaikan inti berita.
                     3. Paragraf utama yang mengandung 3-4 kalimat yang memberikan informasi lebih lanjut.
                     4. Sertakan kutipan dari sumber terkait jika ada.
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
                     [Jika ada kutipan dari sumber]
  
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

      setGeneratedArticle({
        introduction,
        sections: [
          { title: 'Main Body', content: mainBody },
          { title: 'Quote', content: quote },
        ],
        conclusion,
        metaDescription: '',
      });
    } catch (error) {
      console.error('Error generating article:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate article'
      );
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
        <div className='flex flex-col items-start'>
          {/* Judul */}
          <h1 className='text-4xl font-bold text-center w-full mb-6'>
            Article Generator
          </h1>

          {/* Input Section */}
          <div className='w-full mb-4'>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Input Article Title</legend>
              <textarea
                className='textarea glass min-h-36 w-full resize-none border-none focus:outline-none focus:border-none shadow-md'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter your article title'
              />
              <div className='fieldset-label'>
                Enter the title of the article, and AI will generate the results
                automatically.
              </div>
            </fieldset>
          </div>

          {/* Tombol Generate */}
          <button
            className={`btn btn-primary w-full transition-all duration-300 ${
              loading ? 'loading' : ''
            }`}
            onClick={generateArticle}
            disabled={loading || !title}
          >
            {loading ? (
              <>
                <FaSpinner className='animate-spin mr-2' />
                Generating Article...
              </>
            ) : (
              <>
                <FaPenToSquare className='mr-2' />
                Generate Article
              </>
            )}
          </button>

          {/* Error Handling */}
          {error && (
            <div className='alert alert-error mt-4 w-full'>
              <span>{error}</span>
            </div>
          )}

          {/* Hasil Output */}
          {generatedArticle && (
            <div className='w-full mt-8'>
              <h2 className='text-2xl font-semibold mb-4'>Generated Article</h2>

              {/* Introduction */}
              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Introduction</h3>
                <p className='prose max-w-none'>
                  {generatedArticle.introduction}
                </p>
              </div>

              {/* Sections */}
              {generatedArticle.sections.map((section, index) => (
                <div key={index} className='mb-6'>
                  <h3 className='text-xl font-medium mb-2'>{section.title}</h3>
                  <p className='prose max-w-none'>{section.content}</p>
                </div>
              ))}

              {/* Conclusion */}
              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Conclusion</h3>
                <p className='prose max-w-none'>
                  {generatedArticle.conclusion}
                </p>
              </div>

              {/* Meta Description */}
              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Meta Description</h3>
                <p className='prose max-w-none'>
                  {generatedArticle.metaDescription}
                </p>
              </div>

              {/* Copy Button */}
              <div className='flex justify-end mt-4'>
                <button
                  className='btn btn-secondary'
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${
                        generatedArticle.introduction
                      }\n\n${generatedArticle.sections
                        .map((s) => `${s.title}\n${s.content}`)
                        .join('\n\n')}\n\n${generatedArticle.conclusion}`
                    )
                  }
                >
                  Copy Full Article
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
