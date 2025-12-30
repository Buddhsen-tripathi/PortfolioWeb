'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState<number | null>(null)

  useEffect(() => {
    const sessionKey = 'site-visited'
    const cacheKey = 'visitors-cache'
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

    const hasVisited = sessionStorage.getItem(sessionKey)

    const getCachedVisitors = (): { visitors: number; timestamp: number } | null => {
      try {
        const cached = localStorage.getItem(cacheKey)
        if (cached) {
          const data = JSON.parse(cached)
          if (Date.now() - data.timestamp < CACHE_DURATION) {
            return data
          }
          localStorage.removeItem(cacheKey)
        }
      } catch {
        localStorage.removeItem(cacheKey)
      }
      return null
    }

    const setCachedVisitors = (count: number) => {
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          visitors: count,
          timestamp: Date.now()
        }))
      } catch {}
    }

    const fetchVisitors = async () => {
      // Check cache first
      const cached = getCachedVisitors()
      if (cached) {
        setVisitors(cached.visitors)
        
        // If already visited this session, don't increment
        if (hasVisited) return
      }

      try {
        if (!hasVisited) {
          // First visit this session - increment counter
          const res = await fetch('/api/visitors', { method: 'POST' })
          const data = await res.json()
          if (res.ok) {
            setVisitors(data.visitors)
            setCachedVisitors(data.visitors)
            sessionStorage.setItem(sessionKey, 'true')
          }
        } else {
          // Already visited - just fetch current count
          const res = await fetch('/api/visitors')
          const data = await res.json()
          if (res.ok) {
            setVisitors(data.visitors)
            setCachedVisitors(data.visitors)
          }
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error)
      }
    }

    fetchVisitors()
  }, [])

  if (visitors === null) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <Users size={14} />
      <span>{visitors.toLocaleString()} visitors</span>
    </span>
  )
}
