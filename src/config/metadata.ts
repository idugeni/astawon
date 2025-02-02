// src/config/metadata.ts
import { Metadata } from "next";

export const siteConfig = {
  name: "ASTAWON",
  description:
    "ASTAWON adalah platform digital yang dirancang untuk mempermudah pengelolaan informasi dan penyampaian perkembangan terkini tentang Rutan Wonosobo.",
  url: "https://astawon.vercel.app",
};

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteConfig.name} | HUMAS RUTAN WONOSOBO`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};
