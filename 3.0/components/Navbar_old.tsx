'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toZonedTime, format as formatTz } from 'date-fns-tz'
import { Moon, Sun, Home, User, FolderOpen, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const timeZone = 'Asia/Kolkata'
  const zonedTime = toZonedTime(currentTime, timeZone)
  const formattedTime = formatTz(zonedTime, 'HH:mm')
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-3">        {/* Mobile Oval Bottom Navigation */}
        <div className="md:hidden relative mobile-navbar-float">          {/* Oval container with enhanced glassmorphism effect */}
          <div className="relative mx-3 mb-4 p-5 glass-morphism cosmic-glow rounded-full border border-white/20 dark:border-white/10 shadow-2xl mobile-nav-container">
            {/* Enhanced cosmic glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-indigo-500/30 blur-xl animate-pulse"></div>              {/* Main navigation row */}
            <div className="relative flex justify-around items-center mb-5 gap-2"><Link 
                href="/"                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 transform nav-item-hover min-h-[80px] min-w-[70px] ${
                  pathname === '/' 
                    ? 'text-white dark:text-white bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 scale-110' 
                    : 'text-gray-900 dark:text-gray-100 hover:text-white dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                }`}
              >
                <Home size={28} className="drop-shadow-lg nav-icon" />
                <span className="text-sm font-semibold tracking-wide">Home</span>
              </Link>
                <Link 
                href="/projects" 
                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 transform nav-item-hover min-h-[80px] min-w-[70px] ${
                  pathname === '/projects' 
                    ? 'text-white dark:text-white bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 scale-110' 
                    : 'text-gray-900 dark:text-gray-100 hover:text-white dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                }`}
              >
                <FolderOpen size={28} className="drop-shadow-lg nav-icon" />
                <span className="text-sm font-semibold tracking-wide">Projects</span>
              </Link>
                <Link 
                href="/blogs" 
                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all duration-300 transform nav-item-hover min-h-[80px] min-w-[70px] ${
                  pathname === '/blogs' 
                    ? 'text-white dark:text-white bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 scale-110' 
                    : 'text-gray-900 dark:text-gray-100 hover:text-white dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                }`}
              >
                <BookOpen size={28} className="drop-shadow-lg nav-icon" />
                <span className="text-sm font-semibold tracking-wide">Blogs</span>
              </Link>
                {/* Enhanced Theme Switch */}
              <div className="flex flex-col items-center space-y-2 min-h-[80px] min-w-[70px] justify-center">
                <div 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-14 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-indigo-600 dark:to-purple-700 rounded-full cursor-pointer transition-all duration-300 shadow-lg theme-switch-glow hover:scale-110"
                >
                  {/* Enhanced switch track with visible background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-500/50 dark:from-gray-700/50 dark:to-gray-800/50"></div>
                  
                  {/* Switch handle with enhanced icons */}
                  <div className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
                  }`}>
                    <Sun className={`h-3.5 w-3.5 text-yellow-500 transition-all duration-300 ${
                      theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                    }`} />
                    <Moon className={`absolute h-3.5 w-3.5 text-purple-400 transition-all duration-300 ${
                      theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                    }`} />
                  </div>
                </div>
                <span className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">Theme</span>
              </div>
            </div>
          </div>
        </div>        {/* Desktop Bottom Navigation */}
        <div className="hidden md:flex justify-between items-center desktop-navbar-glow rounded-2xl shadow-2xl px-6 py-4 relative">
          {/* Enhanced cosmic glow effect for desktop */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-indigo-500/15 blur-lg pointer-events-none animate-pulse"></div>
            {/* Left section with time and footer info */}
          <div className="relative flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-white/70">
              <Clock size={16} className="drop-shadow-lg animate-pulse" />
              <a 
                href='https://www.google.com/search?q=time' 
                target='_blank'
                className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium hover:scale-105"
              >
                Local time: {formattedTime}
              </a>
            </div>
            
            {/* Footer content integrated into desktop navbar */}
            <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-white/60 border-l border-gray-300 dark:border-white/20 pl-4">
              <span>© 2025 Buddhsen Tripathi</span>
              <a 
                href="https://twitter.com/btr1pathi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-900 dark:hover:text-white/90 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://topmate.io/buddhsentripathi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gray-900 dark:hover:text-white/90 transition-colors"
              >
                Topmate
              </a>
            </div>
          </div>
          
          <div className="relative flex items-center space-x-6">
            <Link 
              href="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                pathname === '/' 
                  ? 'text-white bg-gradient-to-r from-purple-500/80 to-blue-500/80 shadow-lg shadow-purple-500/30 scale-105' 
                  : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10'
              }`}
            >
              <Home size={18} className="drop-shadow-lg" />
              <span className="font-semibold">Home</span>
            </Link>
            
            <Link 
              href="/projects" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                pathname === '/projects' 
                  ? 'text-white bg-gradient-to-r from-purple-500/80 to-blue-500/80 shadow-lg shadow-purple-500/30 scale-105' 
                  : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10'
              }`}
            >
              <FolderOpen size={18} className="drop-shadow-lg" />
              <span className="font-semibold">Projects</span>
            </Link>
            
            <Link 
              href="/blogs" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                pathname === '/blogs' 
                  ? 'text-white bg-gradient-to-r from-purple-500/80 to-blue-500/80 shadow-lg shadow-purple-500/30 scale-105' 
                  : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10'
              }`}
            >
              <BookOpen size={18} className="drop-shadow-lg" />
              <span className="font-semibold">Blogs</span>
            </Link>
            
            {/* Enhanced Desktop Theme Switch */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-14 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-indigo-600 dark:to-purple-700 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 theme-switch-glow"
              >
                {/* Enhanced switch track with visible background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-500/50 dark:from-gray-700/50 dark:to-gray-800/50"></div>
                
                {/* Switch handle with enhanced icons */}
                <div className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
                }`}>
                  <Sun className={`h-4 w-4 text-yellow-500 transition-all duration-300 ${
                    theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                  }`} />
                  <Moon className={`absolute h-4 w-4 text-purple-400 transition-all duration-300 ${
                    theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                  }`} />
                </div>
                
                {/* Enhanced track icons for better visibility */}
                <Sun className="absolute left-1.5 top-1.5 h-4 w-4 text-yellow-300/70 pointer-events-none animate-pulse" />
                <Moon className="absolute right-1.5 top-1.5 h-4 w-4 text-purple-300/70 pointer-events-none animate-pulse" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-white/70">Theme</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}