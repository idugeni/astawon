import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Analytics - ${siteConfig.name}`,
    description: 'Monitor your website performance and analytics.',
  };
};

export default function AnalyticsPage() {
  return (
    <div className='flex items-center justify-center h-screen text-lg font-semibold text-base-content'>
      This feature will be available in a future update
    </div>
  );
}
