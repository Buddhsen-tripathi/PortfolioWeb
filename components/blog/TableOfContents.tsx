'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from HTML content (both markdown and HTML syntax)
  useEffect(() => {
    const items: TocItem[] = []

    // First, try to parse HTML heading tags (your current format)
    const htmlHeadingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[1-6]>/gi
    let match

    while ((match = htmlHeadingRegex.exec(content)) !== null) {
      const level = parseInt(match[1])
      const id = match[2]
      // Clean up the text content (remove HTML tags)
      const text = match[3].replace(/<[^>]*>/g, '').trim()
      
      if (id && text) {
        items.push({ id, text, level })
      }
    }

    // If no HTML headings found, fall back to markdown headings
    if (items.length === 0) {
      const markdownHeadingRegex = /^(#{1,6})\s+(.+)$/gm
      
      while ((match = markdownHeadingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        // Generate ID from text for markdown headings
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()

        items.push({ id, text, level })
      }
    }

    // Also look for headings without IDs but with class attributes
    if (items.length === 0) {
      const htmlHeadingNoIdRegex = /<h([1-6])[^>]*class="[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/gi
      
      while ((match = htmlHeadingNoIdRegex.exec(content)) !== null) {
        const level = parseInt(match[1])
        const text = match[2].replace(/<[^>]*>/g, '').trim()
        
        // Generate ID from text
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()

        if (text) {
          items.push({ id, text, level })
        }
      }
    }

    setTocItems(items)
  }, [content])

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      let current = ''
      for (const heading of headings) {
        if (heading && heading.getBoundingClientRect().top <= 100) {
          current = heading.id
        }
      }
      
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <div className="bg-background/40 border rounded-sm p-4 shadow-sm sticky top-20 z-10">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full mb-1 text-left hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          <List size={16} />
          <span className="font-semibold text-sm">Table of Contents</span>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      </button>

      {/* Table of Contents List */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <nav className="space-y-1">
              {tocItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    block w-full text-left text-sm py-2 px-3 rounded hover:bg-muted transition-all duration-200
                    ${activeId === item.id 
                      ? 'text-primary bg-primary/10 border-l-2 border-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  style={{ 
                    paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                    fontSize: item.level === 2 ? '0.875rem' : item.level === 3 ? '0.8125rem' : '0.75rem'
                  }}
                >
                  <span className="block truncate flex items-center gap-2">
                    {item.level === 2 && <span aria-hidden="true">▶</span>}
                    {item.level === 3 && <span aria-hidden="true">▹</span>}
                    {item.level === 4 && <span aria-hidden="true">▸</span>}
                    <span>{item.text}</span>
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
