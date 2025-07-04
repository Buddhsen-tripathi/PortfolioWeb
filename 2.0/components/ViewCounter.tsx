'use client'

import { useEffect, useState } from 'react'

interface CachedViewData {
  views: number
  timestamp: number
}

export default function ViewCounter({ slug, readOnly = false }: { slug: string, readOnly?: boolean }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const sessionKey = `viewed-${slug}`
    const cacheKey = `views-cache-${slug}`
    const CACHE_DURATION = 5 * 60 * 1000
    
    const hasViewed = sessionStorage.getItem(sessionKey)

    // Check if we have cached data
    const getCachedViews = (): CachedViewData | null => {
      try {
        const cached = localStorage.getItem(cacheKey)
        if (cached) {
          const data: CachedViewData = JSON.parse(cached)
          const now = Date.now()
          
          // Check if cache is still valid
          if (now - data.timestamp < CACHE_DURATION) {
            return data
          } else {
            // Cache expired, remove it
            localStorage.removeItem(cacheKey)
          }
        }
      } catch (error) {
        console.error('Error reading from cache:', error)
        localStorage.removeItem(cacheKey)
      }
      return null
    }

    // Store views in cache
    const setCachedViews = (viewCount: number) => {
      try {
        const cacheData: CachedViewData = {
          views: viewCount,
          timestamp: Date.now()
        }
        localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      } catch (error) {
        console.error('Error storing to cache:', error)
      }
    }

    const fetchViews = async () => {
      // First check cache
      const cachedData = getCachedViews()
      if (cachedData) {
        setViews(cachedData.views)
        return
      }

      // If no cache, fetch from API
      try {
        const res = await fetch(`/api/views?slug=${slug}`)
        const data = await res.json()
        
        if (!res.ok) {
          // If no entry exists, create it
          const createRes = await fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
          })
          const createData = await createRes.json()
          if (createRes.ok) {
            setViews(createData.views)
            setCachedViews(createData.views)
            return
          }
          throw new Error(data.error || 'Failed to fetch views')
        }
        
        setViews(data.views)
        setCachedViews(data.views)
      } catch (error) {
        console.error('Error fetching views:', error)
        // Try to create entry if fetch fails
        try {
          const createRes = await fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug }),
          })
          const createData = await createRes.json()
          if (createRes.ok) {
            setViews(createData.views)
            setCachedViews(createData.views)
            return
          }
        } catch (createError) {
          console.error('Error creating view entry:', createError)
          setViews(0)
        }
      }
    }

    const incrementViews = async () => {
      // Check cache first for immediate display
      const cachedData = getCachedViews()
      if (cachedData) {
        setViews(cachedData.views)
      }

      try {
        const res = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        })
        const data = await res.json()
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to increment views')
        }
        
        setViews(data.views)
        setCachedViews(data.views)
        sessionStorage.setItem(sessionKey, 'true')
      } catch (error) {
        console.error('Error incrementing views:', error)
        // If we had cached data, keep showing it
        if (!cachedData) {
          setViews(0)
        }
      }
    }

    if (readOnly || hasViewed) {
      fetchViews()
    } else {
      incrementViews()
    }
  }, [slug, readOnly])

  return <span>{views !== null ? `${views} views` : 'Loading...'}</span>
}