'use client';

import { useState } from 'react';
import { FaArrowLeft, FaPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';
import { useMetadata } from "@/hooks/useMetadata";

// Helper function to handle timeout and retries
const fetchWithTimeout = async (url: string, options: RequestInit, retries: number = 3, timeout: number = 60000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries}`);
      return fetchWithTimeout(url, options, retries - 1, timeout); // Retry
    }
    throw error;
  }
};

export default function ArticleGenerator() {
  useMetadata("Article Generator", "Generate article content with AI");

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    introduction: string;
    mainBody: string;
    quote: string;
    conclusion: string;
  } | null>(null);

  const generateArticle = async () => {
    if (!title) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetchWithTimeout('/api/generateArticles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const data = await response.json();
      setGeneratedArticle(data);
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
      <div className='w-full mb-4'>
        <Link href='/dashboard/article' className='btn btn-ghost gap-2'>
          <FaArrowLeft /> Kembali
        </Link>
      </div>

      <div className='w-full max-w-4xl bg-base-100 shadow-xl p-6 rounded-lg'>
        <div className='flex flex-col items-start'>
          <h1 className='text-4xl font-bold text-center w-full mb-6'>
            Article Generator
          </h1>

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

          <Link
            href='#'
            className={`btn btn-primary w-full transition-all duration-300 ${loading ? 'loading' : ''}`}
            onClick={generateArticle}
            aria-disabled={loading || !title}
          >
            {loading ? (
              <>
                <span className='loading loading-spinner'></span>Generating Article...
              </>
            ) : (
              <>
                <FaPenToSquare className='mr-2' />
                Generate Article
              </>
            )}
          </Link>

          {error && (
            <div className='alert alert-error mt-4 w-full'>
              <span>{error}</span>
            </div>
          )}

          {generatedArticle && (
            <div className='w-full mt-8'>
              <h2 className='text-2xl font-semibold mb-4'>{generatedArticle.title}</h2>

              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Introduction</h3>
                <p className='prose max-w-none'>{generatedArticle.introduction}</p>
              </div>

              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Main Body</h3>
                <p className='prose max-w-none'>{generatedArticle.mainBody}</p>
              </div>

              {generatedArticle.quote && (
                <div className='mb-6'>
                  <h3 className='text-xl font-medium mb-2'>Quote</h3>
                  <p className='prose max-w-none'>{generatedArticle.quote}</p>
                </div>
              )}

              <div className='mb-6'>
                <h3 className='text-xl font-medium mb-2'>Conclusion</h3>
                <p className='prose max-w-none'>{generatedArticle.conclusion}</p>
              </div>

              <div className='flex justify-end mt-4'>
                <Link
                  href="#"
                  className='btn btn-secondary'
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${generatedArticle.title}\n\n${generatedArticle.introduction}\n\n${generatedArticle.mainBody}\n\n${generatedArticle.quote ? `QUOTE:\n${generatedArticle.quote}\n\n` : ''}${generatedArticle.conclusion}`
                    )
                  }
                >
                  Copy Full Article
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
