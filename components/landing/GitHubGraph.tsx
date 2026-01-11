'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function GitHubGraph({ username }: { username: string }) {
  const [contributions, setContributions] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        const data = await response.json()
        if (data.total && data.total.lastYear !== undefined) {
          setContributions(data.total.lastYear)
        }
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error)
      }
    }
    fetchContributions()
  }, [username])

  // Different chart colors for light/dark mode
  const isDark = mounted && resolvedTheme === 'dark'
  const chartUrl = isDark
    ? `https://ghchart.rshah.org/d97706/${username}` 
    : `https://ghchart.rshah.org/${username}`

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <a 
          href={`https://github.com/${username}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <img 
            src={chartUrl}
            alt={`${username}'s GitHub Contribution Graph`}
            className={`min-w-[720px] w-full ${isDark ? 'invert hue-rotate-180' : ''}`}
          />
        </a>
      </div>
      {contributions !== null && (
        <p className="text-sm text-muted-foreground mt-2">
          <span className="text-foreground font-medium">{contributions.toLocaleString()}</span> contributions in the past year
        </p>
      )}
    </div>
  )
}
