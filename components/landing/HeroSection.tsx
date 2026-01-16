'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiX, SiLinkedin, SiGithub, SiBuymeacoffee, SiYoutube, SiLeetcode, SiGmail, SiTryhackme } from "react-icons/si"

const socialLinks = [
  { href: "https://github.com/buddhsen-tripathi", icon: SiGithub, label: "GitHub", display: "@buddhsen-tripathi" },
  { href: "https://linkedin.com/in/buddhsen-tripathi", icon: SiLinkedin, label: "LinkedIn", display: "@buddhsen-tripathi" },
  { href: "https://twitter.com/btr1pathi", icon: SiX, label: "Twitter/X", display: "@btr1pathi" },
  { href: "https://leetcode.com/u/buddhsen", icon: SiLeetcode, label: "LeetCode", display: "@buddhsen" },
  { href: "https://tryhackme.com/p/btripathi", icon: SiTryhackme, label: "TryHackMe", display: "@btripathi" },
  { href: "https://www.youtube.com/@64TechBits", icon: SiYoutube, label: "YouTube", display: "@64TechBits" },
  { href: "https://buymeacoffee.com/buddhsentripathi", icon: SiBuymeacoffee, label: "Buy Me a Coffee", display: "@buddhsentripathi" },
  { href: "mailto:buddhsen.work@gmail.com", icon: SiGmail, label: "Email", display: "buddhsen.work@gmail.com" },
]

interface LinkTextProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
}

const LinkText = ({ href, children, className = "", target }: LinkTextProps) => (
  <Link
    href={href}
    target={target}
    className={`relative inline-flex items-center gap-0.5 font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full ${className}`}
  >
    <span>{children}</span>
    <ArrowUpRight className="h-3.5 w-3.5" />
  </Link>
)

export default function Hero() {
  return (
    <section className="space-y-8 duration-1000 animate-in fade-in fill-mode-both">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-start gap-4 pb-2">
        <div className="relative h-fit w-fit flex-shrink-0">
          <Image
            src="/profpic.jpg"
            alt="Buddhsen Tripathi"
            width={64}
            height={64}
            className="rounded-full transition-all hover:grayscale"
            priority
          />
          <div className="absolute bottom-0 left-12 cursor-default select-none rounded-full bg-background px-1 py-0.5 text-sm shadow">
            {"🚀"}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-snug tracking-tighter text-primary">
            Buddhsen Tripathi
          </h1>
          <p className="mt-1 text-base font-normal leading-snug text-muted-foreground">
            Full-Stack Developer • MS CS @ NYU
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 animation-delay-300">
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          about me.
        </h2>
        <div className="prose max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
          <p>
            Hey there! I&apos;m a software professional passionate about building
            scalable, user-centric applications with expertise in cloud infrastructure
            and microservices architecture.
          </p>
          <p>
            Currently pursuing my{" "}
            <LinkText href="https://engineering.nyu.edu/academics/programs/computer-science-ms" target="_blank">
              MS in Computer Science at NYU
            </LinkText>
            {" "}with 2+ years of experience in full-stack development. In my free time, I enjoy{" "}
            <Link href="#projects" className="text-primary hover:underline">
              building side projects
            </Link>
            , exploring cybersecurity, and contributing to open-source.
          </p>
        </div>
      </div>

      {/* Social Links Section */}
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
    </section>
  )
}
