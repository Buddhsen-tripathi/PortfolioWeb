'use client'

import { useEffect } from 'react'
import { useViews } from './ViewsContext'

export default function ViewCounter({ slug, readOnly = false }: { slug: string, readOnly?: boolean }) {
  const { getViews, incrementViews } = useViews()
  const views = getViews(slug)

  useEffect(() => {
    if (!readOnly) {
      incrementViews(slug)
    }
  }, [slug, readOnly, incrementViews])

  return <span>{views !== null ? `${views} views` : '...'}</span>
}
