'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

interface ViewsCache {
  views: Record<string, number>
  timestamp: number
}

interface ViewsContextType {
  getViews: (slug: string) => number | null
  incrementViews: (slug: string) => Promise<void>
  prefetchViews: (slugs: string[]) => Promise<void>
}

const ViewsContext = createContext<ViewsContextType | null>(null)

const CACHE_KEY = 'views-cache-all'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function ViewsProvider({ children }: { children: ReactNode }) {
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({})
  const [pendingSlugs, setPendingSlugs] = useState<Set<string>>(new Set())

  // Load cache on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const data: ViewsCache = JSON.parse(cached)
        if (Date.now() - data.timestamp < CACHE_DURATION) {
          setViewsMap(data.views)
        } else {
          localStorage.removeItem(CACHE_KEY)
        }
      }
    } catch {
      localStorage.removeItem(CACHE_KEY)
    }
  }, [])

  // Save to cache whenever viewsMap changes
  const saveCache = useCallback((views: Record<string, number>) => {
    try {
      const cacheData: ViewsCache = {
        views,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch {}
  }, [])

  // Batch fetch views for multiple slugs
  const prefetchViews = useCallback(async (slugs: string[]) => {
    // Filter out slugs we already have
    const slugsToFetch = slugs.filter(slug => !(slug in viewsMap))
    
    if (slugsToFetch.length === 0) return

    try {
      const res = await fetch(`/api/views/batch?slugs=${slugsToFetch.join(',')}`)
      if (res.ok) {
        const data = await res.json()
        setViewsMap(prev => {
          const updated = { ...prev, ...data.views }
          saveCache(updated)
          return updated
        })
      }
    } catch (error) {
      console.error('Error prefetching views:', error)
    }
  }, [viewsMap, saveCache])

  // Get views for a single slug (returns cached value or null if not loaded)
  const getViews = useCallback((slug: string): number | null => {
    if (slug in viewsMap) {
      return viewsMap[slug]
    }
    
    // Queue this slug for fetching if not already pending
    if (!pendingSlugs.has(slug)) {
      setPendingSlugs(prev => new Set(prev).add(slug))
    }
    
    return null
  }, [viewsMap, pendingSlugs])

  // Batch fetch pending slugs
  useEffect(() => {
    if (pendingSlugs.size === 0) return

    const timeout = setTimeout(() => {
      const slugsToFetch = Array.from(pendingSlugs)
      setPendingSlugs(new Set())
      prefetchViews(slugsToFetch)
    }, 50) // Small debounce to batch multiple requests

    return () => clearTimeout(timeout)
  }, [pendingSlugs, prefetchViews])

  // Increment views for a slug
  const incrementViews = useCallback(async (slug: string) => {
    const sessionKey = `viewed-${slug}`
    
    // Check if already viewed this session
    if (sessionStorage.getItem(sessionKey)) {
      // Just fetch current count if not in cache
      if (!(slug in viewsMap)) {
        try {
          const res = await fetch(`/api/views?slug=${slug}`)
          if (res.ok) {
            const data = await res.json()
            setViewsMap(prev => {
              const updated = { ...prev, [slug]: data.views }
              saveCache(updated)
              return updated
            })
          }
        } catch {}
      }
      return
    }

    try {
      const res = await fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      
      if (res.ok) {
        const data = await res.json()
        setViewsMap(prev => {
          const updated = { ...prev, [slug]: data.views }
          saveCache(updated)
          return updated
        })
        sessionStorage.setItem(sessionKey, 'true')
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }, [viewsMap, saveCache])

  return (
    <ViewsContext.Provider value={{ getViews, incrementViews, prefetchViews }}>
      {children}
    </ViewsContext.Provider>
  )
}

export function useViews() {
  const context = useContext(ViewsContext)
  if (!context) {
    throw new Error('useViews must be used within a ViewsProvider')
  }
  return context
}
