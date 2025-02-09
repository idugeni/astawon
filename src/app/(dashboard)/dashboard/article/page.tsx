import Link from 'next/link';
import { FaHeading, FaPenFancy, FaTwitter } from 'react-icons/fa6';
import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Article Dashboard - ${siteConfig.name}`,
    description: 'Manage your articles with ease.',
  };
};

export default function ArticleDashboard() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-8 text-center w-full px-4 md:px-8'>
        Article Management
      </h1>

      <div className='w-full px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Title Generator Card */}
        <Link
          href='/dashboard/article/title-generator'
          className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow w-full'
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
          className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow w-full'
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

        {/* Convert to Tweets (Disabled Card) */}
        <div className='card bg-base-100 shadow-xl opacity-50 cursor-not-allowed w-full'>
          <div className='card-body flex flex-col items-center text-center'>
            <FaTwitter className='w-8 h-8 text-blue-500 mb-4' />
            <h2 className='card-title'>Convert to Tweets</h2>
            <p className='text-base-content/70'>
              Convert your article into tweet-sized content for social media
            </p>
            <div className='card-actions justify-end mt-4'>
              <button className='btn btn-disabled' disabled>Convert</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
