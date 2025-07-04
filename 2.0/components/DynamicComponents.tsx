import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
export const DynamicTableOfContents = dynamic(
  () => import('./TableOfContents'),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse h-32 bg-gray-200 rounded" />
  }
)

export const DynamicReadAloudButton = dynamic(
  () => import('../app/blogs/[slug]/ReadAloudButton'),
  { 
    ssr: false,
    loading: () => <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
  }
)

export const DynamicRelatedBlogs = dynamic(
  () => import('./RelatedBlogs'),
  { 
    loading: () => <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  }
)

export const DynamicBackToTopButton = dynamic(
  () => import('./BacktoTopButton'),
  { 
    ssr: false,
    loading: () => null
  }
)