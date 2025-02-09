'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';  // Import remark-html
import DOMPurify from 'dompurify';
import { useMetadata } from '@/hooks/useMetadata';
import 'github-markdown-css/github-markdown.css';  // GitHub markdown CSS

export default function DocumentationPage() {
  useMetadata('Documentation', 'Documentation page for the admin panel');
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_REPO_OWNER = 'idugeni';
  const GITHUB_REPO_NAME = 'astawon';

  const fetchReadme = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/README.md`
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Try again later.');
        }
        throw new Error(`Failed to fetch README: ${response.status}`);
      }

      const data = await response.json();
      const markdownText = decodeURIComponent(escape(atob(data.content)));

      // Proses Markdown dengan remark dan gunakan remark-html untuk mengonversi ke HTML
      const processedContent = await remark()
        .use(remarkGfm)
        .use(remarkHtml)
        .process(markdownText);

      // Debug: Periksa HTML yang dihasilkan setelah proses remark
      console.log("Processed HTML (after remark):", processedContent.toString());

      // Sanitasi HTML dengan DOMPurify
      const sanitizedHtml = DOMPurify.sanitize(processedContent.toString(), {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img',
          'strong', 'em', 'a', 'p', 'ul', 'ol', 'li', 'div', 'span', 'br', 'pre', 'code'
        ],
        ALLOWED_ATTR: ['src', 'alt', 'title', 'width', 'height'] // Atribut src untuk img harus diizinkan
      });

      // Debug: Periksa HTML setelah sanitasi
      console.log("Sanitized HTML:", sanitizedHtml);

      // Simpan dan tampilkan konten
      localStorage.setItem('readmeContent', sanitizedHtml);
      setReadmeContent(sanitizedHtml);
    } catch (err) {
      setError((err as Error).message || 'Unable to load documentation');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cachedReadme = localStorage.getItem('readmeContent');
    if (cachedReadme) {
      setReadmeContent(cachedReadme);
      setLoading(false);
    } else {
      fetchReadme();
    }
  }, [fetchReadme]);

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
        <div
          className='markdown-body prose p-4'
          dangerouslySetInnerHTML={{ __html: readmeContent }}
        />
      </div>
    </div>
  );
}
