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
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        {/* Ultra-Sleek Mobile Navigation */}
        <div className="md:hidden relative">
          {/* Crispy glass container */}
          <div className="relative mx-4 mb-6 p-4 sleek-glass-container rounded-2xl border border-white/5 dark:border-white/5 shadow-2xl backdrop-blur-2xl">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 blur-lg"></div>
            
            {/* Navigation items - horizontal layout */}
            <div className="relative flex justify-center items-center space-x-8 mb-4">
              <Link 
                href="/" 
                className={`group flex flex-col items-center space-y-1.5 p-3 rounded-xl transition-all duration-200 transform sleek-nav-item ${
                  pathname === '/' 
                    ? 'text-white bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500/70 hover:to-blue-600/70 hover:scale-105'
                }`}
              >
                <Home size={22} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-bold tracking-tight">Home</span>
              </Link>
              
              <Link 
                href="/projects" 
                className={`group flex flex-col items-center space-y-1.5 p-3 rounded-xl transition-all duration-200 transform sleek-nav-item ${
                  pathname === '/projects' 
                    ? 'text-white bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500/70 hover:to-blue-600/70 hover:scale-105'
                }`}
              >
                <FolderOpen size={22} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-bold tracking-tight">Projects</span>
              </Link>
              
              <Link 
                href="/blogs" 
                className={`group flex flex-col items-center space-y-1.5 p-3 rounded-xl transition-all duration-200 transform sleek-nav-item ${
                  pathname === '/blogs' 
                    ? 'text-white bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                    : 'text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500/70 hover:to-blue-600/70 hover:scale-105'
                }`}
              >
                <BookOpen size={22} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-bold tracking-tight">Blogs</span>
              </Link>
              
              {/* Ultra-minimal Theme Switch */}
              <div className="flex flex-col items-center space-y-1.5">
                <div 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer transition-all duration-300 shadow-inner hover:scale-110 sleek-switch border border-gray-300/50 dark:border-gray-600/50"
                >
                  {/* Minimal switch handle */}
                  <div className={`absolute top-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 flex items-center justify-center border border-gray-200/70 dark:border-gray-600/70 ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                  }`}>
                    <Sun className={`h-3 w-3 text-amber-500 transition-all duration-300 ${
                      theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                    }`} />
                    <Moon className={`absolute h-3 w-3 text-indigo-400 transition-all duration-300 ${
                      theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                    }`} />
                  </div>
                </div>
                <span className="text-xs font-bold tracking-tight text-gray-800 dark:text-gray-200">Theme</span>
              </div>
            </div>
            
            {/* Compact footer */}
            <div className="relative border-t border-gray-200/30 dark:border-gray-600/20 pt-3">
              <div className="flex justify-between items-center text-xs">
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  © 2025 Buddhsen T.
                </div>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com/btr1pathi" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://topmate.io/buddhsentripathi" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium"
                  >
                    Topmate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-Sleek Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center sleek-desktop-navbar rounded-xl shadow-2xl px-6 py-3 relative border border-white/5 dark:border-white/5">
          {/* Subtle glow effect for desktop */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-500/5 blur-sm pointer-events-none"></div>
          
          {/* Left section with time and footer info */}
          <div className="relative flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <Clock size={16} className="drop-shadow-sm" />
              <a 
                href='https://www.google.com/search?q=time' 
                target='_blank'
                className="hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium hover:scale-105"
              >
                {formattedTime}
              </a>
            </div>
            
            {/* Footer content */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 border-l border-gray-300/50 dark:border-gray-600/50 pl-4">
              <span className="font-medium">© 2025 Buddhsen T.</span>
              <a 
                href="https://twitter.com/btr1pathi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium"
              >
                Twitter
              </a>
              <a 
                href="https://topmate.io/buddhsentripathi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium"
              >
                Topmate
              </a>
            </div>
          </div>
          
          {/* Right section with navigation */}
          <div className="relative flex items-center space-x-4">
            <Link 
              href="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                pathname === '/' 
                  ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/70 hover:to-blue-600/70'
              }`}
            >
              <Home size={16} className="drop-shadow-sm" />
              <span className="font-semibold text-sm">Home</span>
            </Link>
            
            <Link 
              href="/projects" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                pathname === '/projects' 
                  ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/70 hover:to-blue-600/70'
              }`}
            >
              <FolderOpen size={16} className="drop-shadow-sm" />
              <span className="font-semibold text-sm">Projects</span>
            </Link>
            
            <Link 
              href="/blogs" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                pathname === '/blogs' 
                  ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 scale-105' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/70 hover:to-blue-600/70'
              }`}
            >
              <BookOpen size={16} className="drop-shadow-sm" />
              <span className="font-semibold text-sm">Blogs</span>
            </Link>
            
            {/* Minimal Desktop Theme Switch */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer transition-all duration-300 shadow-inner hover:scale-105 border border-gray-300/50 dark:border-gray-600/50"
              >
                {/* Clean switch handle */}
                <div className={`absolute top-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 flex items-center justify-center border border-gray-200/70 dark:border-gray-600/70 ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                }`}>
                  <Sun className={`h-3 w-3 text-amber-500 transition-all duration-300 ${
                    theme === 'dark' ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                  }`} />
                  <Moon className={`absolute h-3 w-3 text-indigo-400 transition-all duration-300 ${
                    theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                  }`} />
                </div>
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Theme</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
