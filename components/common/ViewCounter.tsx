'use client'

import { useEffect } from 'react'
import { useViews } from './ViewsContext'
import { Users } from 'lucide-react'

interface ViewCounterProps {
  slug?: string
  readOnly?: boolean
  type?: 'views' | 'visitors'
}

export default function ViewCounter({ slug, readOnly = false, type = 'views' }: ViewCounterProps) {
  const { getViews, incrementViews } = useViews()
  
  // Use special slug for site visitors, or provided slug for page views
  const effectiveSlug = type === 'visitors' ? '_site_visitors' : slug
  
  if (!effectiveSlug) return null
  
  const count = getViews(effectiveSlug)

  useEffect(() => {
    if (!readOnly && effectiveSlug) {
      incrementViews(effectiveSlug)
    }
  }, [effectiveSlug, readOnly, incrementViews])

  if (count === null) {
    return <span>{type === 'visitors' ? '...' : '...'}</span>
  }

  if (type === 'visitors') {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Users size={14} />
        <span>{count.toLocaleString()} visitors</span>
      </span>
    )
  }

  return <span>{count} views</span>
}
