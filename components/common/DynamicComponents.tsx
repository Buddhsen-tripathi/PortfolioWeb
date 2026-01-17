'use client'

import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
export const DynamicTableOfContents = dynamic(
  () => import('@/components/blog/TableOfContents'),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse h-32 bg-gray-200 rounded" />
  }
)

export const DynamicBackToTopButton = dynamic(
  () => import('@/components/common/BackToTopButton'),
  { 
    ssr: false,
    loading: () => null
  }
)
