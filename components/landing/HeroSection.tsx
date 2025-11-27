import Image from 'next/image'
import { SiX, SiLinkedin, SiGithub, SiBuymeacoffee, SiYoutube, SiLeetcode, SiGmail, SiTryhackme } from "react-icons/si";
import { Download } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { href: "https://github.com/buddhsen-tripathi", icon: SiGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/buddhsen-tripathi", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://twitter.com/btr1pathi", icon: SiX, label: "Twitter/X" },
  { href: "https://leetcode.com/u/buddhsen", icon: SiLeetcode, label: "LeetCode" },
  { href: "https://tryhackme.com/p/btripathi", icon: SiTryhackme, label: "TryHackMe" },
  { href: "https://www.youtube.com/@64TechBits", icon: SiYoutube, label: "YouTube" },
  { href: "https://buymeacoffee.com/buddhsentripathi", icon: SiBuymeacoffee, label: "Buy Me a Coffee" },
  { href: "mailto:buddhsen.work@gmail.com", icon: SiGmail, label: "Email" },
];

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12 md:mb-16">
      {/* Profile Image */}
      <div className="relative group">
        <div className="w-48 h-48 relative flex-shrink-0 rounded-full overflow-hidden shadow-lg ring-4 ring-background group-hover:ring-primary/20 transition-all duration-300">
          <Image
            src="/profpic.webp"
            alt="Buddhsen Tripathi"
            fill
            className="object-cover transition-transform duration-300"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center md:items-start space-y-4 flex-1">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            Buddhsen Tripathi
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm md:text-base">
            <span className="text-primary">Full-Stack Developer</span>
            <span className="text-foreground">•</span>
            <span className="text-primary">MS CS @ NYU</span>
            <span className="text-foreground">•</span>
            <span className="text-primary">New York, USA</span>
          </div>
        </div>

        <p className="max-w-2xl text-center md:text-left text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">MS Computer Science student at NYU</span> and <span className="text-foreground font-medium">full-stack developer with 2+ years of experience</span> building 
          scalable enterprise applications. Skilled in{' '}
          <span className="text-foreground font-medium">Java, C++, and TypeScript</span>{' '}
          with expertise in cloud infrastructure and microservices architecture.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            href="mailto:buddhsen.work@gmail.com"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg focus-ring flex items-center gap-2"
          >
            Get in Touch
          </a>
          <Link
            href="/Resume.pdf"
            className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg focus-ring flex items-center gap-2"
          >
            <Download size={16} />
            Resume
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 focus-ring rounded-lg p-1"
              aria-label={label}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
