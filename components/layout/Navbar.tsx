'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toZonedTime, format as formatTz } from 'date-fns-tz'
import { Moon, Sun, Clock, Menu, X } from 'lucide-react'

const Navbar = memo(() => {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50
          setScrolled(isScrolled)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore - View Transitions API is not yet in all TS definitions
    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      return
    }

    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [theme, setTheme])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  if (!mounted) {
    return null
  }

  const timeZone = 'America/New_York'
  const zonedTime = toZonedTime(currentTime, timeZone)
  const formattedTime = formatTz(zonedTime, 'HH:mm')

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      scrolled
        ? 'bg-background/95 shadow-md border-b border-border'
        : 'bg-background/90 border-b border-transparent'
    }`}>
      <div className="max-w-[1000px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Time Display - Left (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock size={16} className="text-primary" />
            <a
              href='https://www.google.com/search?q=time'
              target='_blank'
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              {formattedTime}
            </a>
          </div>

          {/* Home Button - Left (Mobile) */}
          <Link
            href="/"
            className="md:hidden flex items-center text-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-sm transition-all duration-200 font-medium text-sm ${
                pathname === '/'
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground hover:text-primary hover:bg-accent/50'
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/projects"
              className={`px-4 py-2 rounded-sm transition-all duration-200 font-medium text-sm ${
                pathname === '/projects'
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground hover:text-primary hover:bg-accent/50'
              }`}
            >
              Projects
            </Link>
            
            <Link
              href="/blogs"
              className={`px-4 py-2 rounded-sm transition-all duration-200 font-medium text-sm ${
                pathname === '/blogs'
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground hover:text-primary hover:bg-accent/50'
              }`}
            >
              Blogs
            </Link>
          
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="relative flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-300 focus-ring overflow-hidden ml-2"
            >
              <Sun
                className={`absolute transition-all duration-500 transform ${
                  theme === 'dark'
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
                size={18}
              />
              <Moon
                className={`absolute transition-all duration-500 transform ${
                  theme === 'dark'
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                }`}
                size={18}
              />
            </button>
          </div>

          {/* Mobile Controls - Right */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-300 focus-ring overflow-hidden"
            >
              <Sun
                className={`absolute transition-all duration-500 transform ${
                  theme === 'dark'
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
                size={18}
              />
              <Moon
                className={`absolute transition-all duration-500 transform ${
                  theme === 'dark'
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                }`}
                size={18}
              />
            </button>

            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="flex items-center justify-center w-9 h-9 rounded-sm text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-300 focus-ring"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/projects"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-sm transition-all duration-200 font-medium text-sm ${
                pathname === '/projects'
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground hover:text-primary hover:bg-accent/50'
              }`}
            >
              Projects
            </Link>
            
            <Link
              href="/blogs"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-sm transition-all duration-200 font-medium text-sm ${
                pathname === '/blogs'
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground hover:text-primary hover:bg-accent/50'
              }`}
            >
              Blogs
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
