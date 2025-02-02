'use client'
import { useEffect } from 'react'
import { siteConfig } from '@/config/metadata'

export function useMetadata(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} - ${siteConfig.name}`
    
    const metaDescription = document.querySelector("meta[name='description']")
    const prevDescription = metaDescription ? metaDescription.getAttribute('content') : ''
    
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = description
        document.head.appendChild(meta)
      }
    }

    return () => {
      document.title = siteConfig.name
      if (metaDescription) {
        metaDescription.setAttribute('content', prevDescription || siteConfig.description || '')
      }
    }
  }, [title, description])
}
