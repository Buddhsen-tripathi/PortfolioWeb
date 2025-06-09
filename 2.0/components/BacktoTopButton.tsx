'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-32 md:bottom-20 right-8 p-3 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } bg-primary text-white dark:bg-white dark:text-black`}
      aria-label="Back to Top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}