'use client';

import Link from 'next/link';
import { FaHeading, FaPenFancy } from 'react-icons/fa6';
import { useMetadata } from '@/utils/MetadataContext';

export default function ArticleDashboard() {
  useMetadata(
    'Article Management',
    'Generate and manage SEO-optimized articles with AI assistance.'
  );

  return (
    <div className='p-8 max-w-7xl mx-auto min-h-screen flex flex-col'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Article Management
      </h1>

      <div className='grid md:grid-cols-2 gap-6 justify-center'>
        {/* Title Generator Card */}
        <Link
          href='/dashboard/article/title-generator'
          className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow'
        >
          <div className='card-body flex flex-col items-center text-center'>
            <FaHeading className='w-8 h-8 text-secondary mb-4' />
            <h2 className='card-title'>Title Generator</h2>
            <p className='text-base-content/70'>
              Generate SEO-optimized article titles with AI
            </p>
            <div className='card-actions justify-end mt-4'>
              <button className='btn btn-secondary'>Generate Title</button>
            </div>
          </div>
        </Link>

        {/* Article Generator Card */}
        <Link
          href='/dashboard/article/article-generator'
          className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow'
        >
          <div className='card-body flex flex-col items-center text-center'>
            <FaPenFancy className='w-8 h-8 text-accent mb-4' />
            <h2 className='card-title'>Article Generator</h2>
            <p className='text-base-content/70'>
              Create full SEO-optimized articles with AI
            </p>
            <div className='card-actions justify-end mt-4'>
              <button className='btn btn-accent'>Create Article</button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
