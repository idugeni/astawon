'use client';
import React, { useState, useEffect } from 'react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import DOMPurify from 'dompurify';
import { useMetadata } from '@/hooks/useMetadata';

export default function DocumentationPage() {
  useMetadata('Documentation', 'Documentation page for the admin panel');
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_REPO_OWNER = 'idugeni'; // Ganti dengan pemilik repositori
  const GITHUB_REPO_NAME = 'astawon'; // Ganti dengan nama repositori

  const fetchReadme = async () => {
    setLoading(true);
    setError(null);

    try {
      // Menggunakan API yang benar untuk mendapatkan file README.md dalam base64
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/README.md`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch README: ${response.status}`);
      }

      const data = await response.json();

      // Base64 decode
      const markdownText = atob(data.content);

      // Proses Markdown menjadi HTML menggunakan remark-html
      const processedContent = await remark()
        .use(remarkHtml) // Parse markdown ke HTML
        .process(markdownText);

      // Sanitasi HTML untuk keamanan
      const sanitizedHtml = DOMPurify.sanitize(processedContent.toString());

      setReadmeContent(sanitizedHtml);
    } catch (err) {
      setError((err as Error).message || 'Unable to load documentation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadme();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='skeleton w-3/4 h-40 bg-gray-200 animate-pulse rounded-md'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div role='alert' className='alert alert-error'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className='mx-auto'>
      <h2 className='text-center text-3xl font-bold text-primary mb-6'>
        Project Documentation
      </h2>
      <div className='card bg-[#0d1017] shadow-lg rounded-lg overflow-hidden'>
        <div className='card-body'>
          <article
            className='markdown-body entry-content text-white'
            dangerouslySetInnerHTML={{ __html: readmeContent }}
          />
        </div>
      </div>
    </div>
  );
}
