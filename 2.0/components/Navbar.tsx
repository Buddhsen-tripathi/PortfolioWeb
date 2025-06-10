'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toZonedTime, format as formatTz } from 'date-fns-tz'
import { Moon, Sun, Home, Clock, Code2, UserPen } from 'lucide-react'

const Navbar = memo(() => {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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

  const toggleTheme = useCallback(() => {
    if (setTheme && theme) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }, [theme, setTheme])

  if (!mounted) {
    return null
  }

  const timeZone = 'Asia/Kolkata'
  const zonedTime = toZonedTime(currentTime, timeZone)
  const formattedTime = formatTz(zonedTime, 'HH:mm')

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        {/* Ultra-Sleek Mobile Navigation */}
        <div className="md:hidden relative">
          {/* Crispy glass container */}
          <div className={`relative mx-2 mb-2 p-2 rounded-2xl border border-border shadow-2xl backdrop-blur-xl transition-all duration-300 ${scrolled
              ? 'bg-background/95 border-border/60'
              : 'bg-background/90 border-border/30'
            }`}>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-lg"></div>
            
            {/* Navigation items - horizontal layout */}
            <div className="relative flex justify-center items-center space-x-4 mb-2">
              <Link
                href="/"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80 hover:scale-105'
                  }`}
              >
                <Home size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              <Link
                href="/projects"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/projects'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80 hover:scale-105'
                  }`}
              >
                <Code2 size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              <Link
                href="/blogs"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/blogs'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80 hover:scale-105'
                  }`}
              >
                <UserPen size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              {/* Ultra-minimal Theme Switch */}
              <div className="flex flex-col items-center space-y-1.5">
                <div
                  onClick={toggleTheme}
                  className="relative w-11 h-7 bg-secondary hover:bg-secondary/80 rounded-full cursor-pointer transition-all duration-300 shadow-inner hover:scale-110 border border-border"
                >
                  {/* Minimal switch handle */}
                  <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow-md transition-all duration-300 flex items-center justify-center border border-border ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                    }`}>
                    <Sun className={`h-3 w-3 text-yellow-500 transition-all duration-300 ${theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                      }`} />
                    <Moon className={`absolute h-3 w-3 text-foreground transition-all duration-300 ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                      }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Compact footer */}
            <div className="relative border-t border-border pt-2">
              <div className="flex justify-between items-center text-xs">
                <div className="text-muted-foreground font-medium">
                  © 2025 Buddhsen T
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/btr1pathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://topmate.io/buddhsentripathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    Topmate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-Sleek Desktop Navigation */}
        <div className={`hidden md:flex justify-between items-center rounded-xl shadow-2xl px-6 py-3 relative border border-border backdrop-blur-xl transition-all duration-300 ${scrolled
            ? 'bg-background/95 border-border/60'
            : 'bg-background/90 border-border/30'
          }`}>
          {/* Subtle glow effect for desktop */}
          <div className="absolute inset-0 rounded-xl bg-primary/5 blur-sm pointer-events-none"></div>
          
          {/* Left section with time and footer info */}
          <div className="relative flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-foreground">
              <Clock size={16} className="drop-shadow-sm" />
              <a
                href='https://www.google.com/search?q=time'
                target='_blank'
                className="hover:text-primary transition-all duration-300 font-medium hover:scale-105"
              >
                {formattedTime}
              </a>
            </div>
            
            {/* Footer content */}
            <div className="flex items-center space-x-4 text-xs text-muted-foreground border-l border-border pl-4">
              <span className="font-medium">© 2025 Buddhsen Tripathi</span>
              <a
                href="https://twitter.com/btr1pathi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                Twitter
              </a>
              <a
                href="https://topmate.io/buddhsentripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                Topmate
              </a>
            </div>
          </div>
          
          {/* Right section with navigation */}
          <div className="relative flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${pathname === '/'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            > 
              <span className="font-semibold text-sm">Home</span>
            </Link>
            
            <Link
              href="/projects"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${pathname === '/projects'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            >
              <span className="font-semibold text-sm">Projects</span>
            </Link>
            
            <Link
              href="/blogs"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${pathname === '/blogs'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            >
              <span className="font-semibold text-sm">Blogs</span>
            </Link>
            
            {/* Minimal Desktop Theme Switch */}
            <div className="flex items-center space-x-3">
              <div
                onClick={toggleTheme}
                className="relative w-12 h-6 bg-secondary hover:bg-secondary/80 rounded-full cursor-pointer transition-all duration-300 shadow-inner hover:scale-105 border border-border"
              >
                {/* Clean switch handle */}
                <div className={`absolute top-0.5 w-5 h-5 bg-background rounded-full shadow-md transition-all duration-300 flex items-center justify-center border border-border ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  }`}>
                  <Sun className={`h-3 w-3 text-yellow-500 transition-all duration-300 ${theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                    }`} />
                  <Moon className={`absolute h-3 w-3 text-foreground transition-all duration-300 ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                    }`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar