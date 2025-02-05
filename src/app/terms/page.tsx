import React from 'react';
import { Metadata } from 'next';
import { defaultMetadata, siteConfig } from '@/config/metadata';

export const generateMetadata = (): Metadata => {
  return {
    ...defaultMetadata,
    title: `Terms of Service - ${siteConfig.name}`,
    description: 'Read the terms of service for ASTAWON platform.',
  };
};

export default function TermsPage() {
  return (
    <section className='min-h-screen bg-base-200 p-8 sm:p-16 transition-all duration-700 ease-in-out'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Terms of Service</h1>
        <p className='text-lg opacity-75'>
          Effective Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className='card bg-base-100 shadow-xl mb-6'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'>Acceptance of Terms</h2>
          <p className='text-base-content/90'>
            By accessing ASTAWON platform, you agree to comply with these Terms
            of Service and all applicable laws governing information management
            for Rutan Wonosobo.
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h3 className='text-xl font-semibold mb-3'>
              User Responsibilities
            </h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Maintain account confidentiality</li>
              <li>Provide accurate institutional information</li>
              <li>Adhere to official communication protocols</li>
            </ul>
          </div>
        </div>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h3 className='text-xl font-semibold mb-3'>Prohibited Actions</h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Unauthorized data sharing</li>
              <li>Distribution of misinformation</li>
              <li>Reverse engineering platform components</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='card bg-base-100 shadow-xl mt-6'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'>Service Modifications</h2>
          <p className='mb-4'>
            We reserve the right to modify or discontinue services with 30
            days&apos; notice. Continued use after changes constitutes
            acceptance of new terms.
          </p>
          <div className='alert alert-warning'>
            <span>
              Violations may result in account suspension and legal action
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
