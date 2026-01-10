'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react'

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
const BATCH_DELAY = 50 // ms to wait before batching requests

export function ViewsProvider({ children }: { children: ReactNode }) {
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({})
  const pendingSlugsRef = useRef<Set<string>>(new Set())
  const batchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fetchingRef = useRef<Set<string>>(new Set())

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

  // Save to cache
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
  const fetchBatch = useCallback(async (slugs: string[]) => {
    if (slugs.length === 0) return

    // Mark as fetching to prevent duplicate requests
    slugs.forEach(slug => fetchingRef.current.add(slug))

    try {
      const res = await fetch(`/api/views/batch?slugs=${slugs.join(',')}`)
      if (res.ok) {
        const data = await res.json()
        setViewsMap(prev => {
          const updated = { ...prev, ...data.views }
          saveCache(updated)
          return updated
        })
      }
    } catch (error) {
      console.error('Error fetching views:', error)
    } finally {
      slugs.forEach(slug => fetchingRef.current.delete(slug))
    }
  }, [saveCache])

  // Schedule batch fetch
  const scheduleBatchFetch = useCallback(() => {
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current)
    }

    batchTimeoutRef.current = setTimeout(() => {
      const slugsToFetch = Array.from(pendingSlugsRef.current)
      pendingSlugsRef.current.clear()
      if (slugsToFetch.length > 0) {
        fetchBatch(slugsToFetch)
      }
    }, BATCH_DELAY)
  }, [fetchBatch])

  // Prefetch views for multiple slugs
  const prefetchViews = useCallback(async (slugs: string[]) => {
    setViewsMap(current => {
      const slugsToFetch = slugs.filter(
        slug => !(slug in current) && !fetchingRef.current.has(slug)
      )
      
      if (slugsToFetch.length > 0) {
        slugsToFetch.forEach(slug => pendingSlugsRef.current.add(slug))
        scheduleBatchFetch()
      }
      
      return current
    })
  }, [scheduleBatchFetch])

  // Get views for a single slug
  const getViews = useCallback((slug: string): number | null => {
    setViewsMap(current => {
      if (!(slug in current) && !pendingSlugsRef.current.has(slug) && !fetchingRef.current.has(slug)) {
        pendingSlugsRef.current.add(slug)
        scheduleBatchFetch()
      }
      return current
    })
    
    return viewsMap[slug] ?? null
  }, [viewsMap, scheduleBatchFetch])

  // Increment views for a slug (once per session)
  const incrementViews = useCallback(async (slug: string) => {
    const sessionKey = `viewed-${slug}`
    
    // Check if already viewed this session
    if (sessionStorage.getItem(sessionKey)) {
      // Already counted, just fetch current count if not in cache
      if (!pendingSlugsRef.current.has(slug) && !fetchingRef.current.has(slug)) {
        setViewsMap(current => {
          if (!(slug in current)) {
            pendingSlugsRef.current.add(slug)
            scheduleBatchFetch()
          }
          return current
        })
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
        // Mark as viewed for this session
        sessionStorage.setItem(sessionKey, 'true')
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }, [saveCache, scheduleBatchFetch])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current)
      }
    }
  }, [])

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
