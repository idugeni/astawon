// src/hooks/useDocumentTitle.ts
'use client'
import { useEffect } from 'react'
import { siteConfig } from '@/config/metadata'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${siteConfig.name}`
    return () => {
      document.title = siteConfig.name
    }
  }, [title])
}