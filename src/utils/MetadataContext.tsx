"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import Head from "next/head";

interface MetadataContextProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const MetadataContext = createContext<MetadataContextProps>({
  setTitle: () => {},
  setDescription: () => {},
});

export function MetadataProvider({ children }: { children: ReactNode }) {
  const setTitle = (title: string) => {
    document.title = `${title} - ASTAWON`;
  };

  const setDescription = (description: string) => {
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      (metaDescription as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
  };

  return (
    <MetadataContext.Provider value={{ setTitle, setDescription }}>
      <Head>
        <title>ASTAWON - HUMAS RUTAN WONOSOBO</title>
        <meta
          name="description"
          content="Aplikasi resmi untuk informasi dan pelayanan Humas Rutan Wonosobo."
        />
      </Head>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata(title: string, description?: string) {
  const { setTitle, setDescription } = useContext(MetadataContext);

  useEffect(() => {
    setTitle(title);
    if (description) {
      setDescription(description);
    }
  }, [title, description, setTitle, setDescription]);
}
