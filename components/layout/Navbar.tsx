'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'

const Navbar = memo(() => {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      scrolled
        ? 'bg-background/95 shadow-md border-b border-border'
        : 'bg-background/90 border-b border-transparent'
    }`}>
      <div className="max-w-[800px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Home Link - Left (Desktop) */}
          <Link
            href="/"
            className={`hidden md:flex relative text-sm font-medium transition-all duration-300 ${
              pathname === '/'
                ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-primary'
                : 'text-muted-foreground hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full'
            }`}
          >
            home
          </Link>

          {/* Home Button - Left (Mobile) */}
          <Link
            href="/"
            className="md:hidden flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            home
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/projects"
              className={`relative text-sm font-medium transition-all duration-300 ${
                pathname === '/projects'
                  ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-primary'
                  : 'text-muted-foreground hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full'
              }`}
            >
              projects
            </Link>
            
            <Link
              href="/blogs"
              className={`relative text-sm font-medium transition-all duration-300 ${
                pathname === '/blogs'
                  ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-primary'
                  : 'text-muted-foreground hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full'
              }`}
            >
              blogs
            </Link>
          
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="relative flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-300 focus-ring overflow-hidden"
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
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-300 focus-ring overflow-hidden"
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
              className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-300 focus-ring"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/projects"
              onClick={closeMobileMenu}
              className={`relative block text-sm font-medium transition-all duration-300 ${
                pathname === '/projects'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              projects
            </Link>
            
            <Link
              href="/blogs"
              onClick={closeMobileMenu}
              className={`relative block text-sm font-medium transition-all duration-300 ${
                pathname === '/blogs'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              blogs
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
