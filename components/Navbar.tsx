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

        <div className="md:hidden relative">

          <div className={`relative mx-2 mb-2 p-2 rounded-2xl border border-border shadow-2xl backdrop-blur-xl transition-all duration-300 ${scrolled
              ? 'bg-background/95 border-border/60'
              : 'bg-background/90 border-border/30'
            }`}>

            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-lg"></div>

            <div className="relative flex justify-center items-center space-x-4 mb-2">
              <Link
                href="/"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                  }`}
              >
                <Home size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              <Link
                href="/projects"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/projects'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                  }`}
              >
                <Code2 size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              <Link
                href="/blogs"
                className={`group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform ${pathname === '/blogs'
                    ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                    : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                  }`}
              >
                <UserPen size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </Link>

              <button
                onClick={toggleTheme}
                className="group flex flex-col items-center space-y-1.5 p-2 rounded-xl transition-all duration-200 transform focus-ring text-foreground hover:text-primary-foreground hover:bg-primary/80"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <Sun size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <Moon size={17} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
            </div>

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

        <div className={`hidden md:flex justify-between items-center rounded-xl shadow-2xl px-6 py-3 relative border border-border backdrop-blur-xl transition-all duration-300 ${scrolled
            ? 'bg-background/95 border-border/60'
            : 'bg-background/90 border-border/30'
          }`}>

          <div className="absolute inset-0 rounded-xl bg-primary/5 blur-sm pointer-events-none"></div>

          <div className="relative flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-foreground">
              <Clock size={16} className="drop-shadow-sm" />
              <a
                href='https://www.google.com/search?q=time'
                target='_blank'
                className="hover:text-primary transition-all duration-300 font-medium"
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
          
          <div className="relative flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform ${pathname === '/'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            > 
              <span className="font-semibold text-sm">Home</span>
            </Link>
            
            <Link
              href="/projects"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform ${pathname === '/projects'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            >
              <span className="font-semibold text-sm">Projects</span>
            </Link>
            
            <Link
              href="/blogs"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform ${pathname === '/blogs'
                  ? 'text-primary-foreground bg-primary shadow-lg scale-105'
                  : 'text-foreground hover:text-primary-foreground hover:bg-primary/80'
                }`}
            >
              <span className="font-semibold text-sm">Blogs</span>
            </Link>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:text-primary-foreground hover:bg-primary/80 transition-all duration-300 focus-ring overflow-hidden"
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
        </div>
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar