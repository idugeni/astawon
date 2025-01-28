'use client';

import { useMetadata } from '@/utils/MetadataContext';

export default function Dashboard() {
  useMetadata(
    'Dashboard',
    'ASTAWON is an innovative platform designed specifically to support the management of information and services related to the Public Relations of Wonosobo Detention Center, offering efficiency, speed, and reliability in administrative tasks.'
  );

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8'>
      <main className='w-full font-mono text-justify transition-all duration-300'>
        <p className='mb-6 text-base leading-relaxed'>
          ASTAWON is an innovative platform specifically developed to support
          the management of information and services related to the Public
          Relations of Wonosobo Detention Center. By utilizing the latest
          technology, we provide solutions that make it easier for users to
          access essential features relevant to their daily needs. This platform
          is designed to deliver efficiency, speed, and reliability in
          completing administrative tasks.
        </p>
        <p className='mb-6 text-base leading-relaxed'>
          This platform not only focuses on user-friendliness but also ensures
          data security. We employ high-level encryption and modern security
          protocols to safeguard the confidentiality of information stored
          within the system. With this approach, ASTAWON strives to provide a
          sense of security and comfort for every user in their activities.
        </p>
        <p className='mb-6 text-base leading-relaxed'>
          During its development, ASTAWON involved various professionals in the
          fields of technology and public management to ensure the best quality
          service. We understand the importance of collaboration between
          technology and human needs, so every feature we offer is designed to
          be truly relevant and provide tangible positive impacts.
        </p>
        <p className='mb-6 text-base leading-relaxed'>
          We are also committed to continuous innovation. Through regular
          updates, we introduce more advanced features that are relevant to the
          times. In the near future, ASTAWON will integrate artificial
          intelligence technology to provide deeper data analysis and more
          accurate insights for users.
        </p>
        <p className='text-base leading-relaxed'>
          With the presence of ASTAWON, we hope to become a trusted partner for
          you in managing information and services. Thank you for your support.
          Let us move together toward a better future with user-friendly and
          impactful technology.
        </p>
      </main>
    </div>
  );
}
