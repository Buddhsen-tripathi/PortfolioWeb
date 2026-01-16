'use client'

import { ArrowUpRight } from 'lucide-react'
import { SiX, SiLinkedin, SiGithub, SiBuymeacoffee, SiYoutube, SiLeetcode, SiGmail, SiTryhackme, SiCodeforces } from "react-icons/si"

const socialLinks = [
  { href: "https://github.com/buddhsen-tripathi", icon: SiGithub, label: "GitHub", display: "@buddhsen-tripathi" },
  { href: "https://linkedin.com/in/buddhsen-tripathi", icon: SiLinkedin, label: "LinkedIn", display: "@buddhsen-tripathi" },
  { href: "https://twitter.com/btr1pathi", icon: SiX, label: "Twitter/X", display: "@btr1pathi" },
  { href: "https://leetcode.com/u/buddhsen", icon: SiLeetcode, label: "LeetCode", display: "@buddhsen" },
  { href: "https://tryhackme.com/p/btripathi", icon: SiTryhackme, label: "TryHackMe", display: "@btripathi" },
  { href: "https://codeforces.com/profile/Buddhsen", icon: SiCodeforces, label: "Codeforces", display: "@Buddhsen" }
]

export default function Socials() {
  return (
    <div className="space-y-4 animation-delay-500">
      <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
        socials.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialLinks.map(({ href, icon: Icon, label, display }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 text-sm text-muted-foreground transition-all hover:text-primary group"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
              {display}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        ))}
      </div>
    </div>
  )
}
