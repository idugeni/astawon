// src/config/metadata.ts
import { Metadata } from 'next';

export const siteConfig = {
  name: 'ASTAWON',
  description:
    'ASTAWON adalah platform digital yang dirancang untuk mempermudah pengelolaan informasi dan penyampaian perkembangan terkini tentang Rutan Wonosobo.',
  url: 'https://astawon.vercel.app',
  shortUrl: 'astawon.vercel.app',
};

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} | HUMAS RUTAN WONOSOBO`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'id_ID',
    url: siteConfig.url,
    images: [
      {
        url: `https://${siteConfig.shortUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};
