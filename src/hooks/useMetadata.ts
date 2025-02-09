'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const metadataTemplate = '%s | Astawon';
const defaultTitle = 'Astawon - Humas Rutan Wonosobo';

export function useMetadata(title = defaultTitle, description = 'Astawon adalah platform digital yang dirancang untuk mempermudah pengelolaan informasi dan penyampaian perkembangan terkini tentang Rutan Wonosobo.') {
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const formattedTitle = metadataTemplate.replace('%s', title);
      document.title = formattedTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description, router]);
}
