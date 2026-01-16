'use client'

import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'

export default function Connect() {

  return (
    <section className="space-y-4 duration-1000 animate-in fade-in fill-mode-both animation-delay-[1300ms]">
      <p className="text-sm text-muted-foreground">
        Interested in working together? Feel free to schedule a meet!
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://cal.com/buddhsen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300"
        >
          <Calendar size={14} />
          schedule a meet
          <ArrowUpRight size={12} />
        </a>
        <Link
          href="/Resume.pdf"
          target="_blank"
          className="relative inline-flex items-center gap-0.5 text-sm font-normal text-muted-foreground transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full"
        >
          <span>Resume</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
