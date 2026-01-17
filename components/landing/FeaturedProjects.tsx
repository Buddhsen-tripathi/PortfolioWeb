'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import ViewCounter from '@/components/common/ViewCounter'

const parseProjectStatus = (status: 'live' | 'building' | 'completed'): string => {
  switch (status) {
    case 'live':
      return 'Live'
    case 'building':
      return 'Building'
    case 'completed':
      return 'Completed'
    default:
      return ''
  }
}

const projects = [
  {
    title: "DeepFind.Me",
    description: "Deepfind.me is an educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    github: null,
    demo: "https://deepfind.me",
    technologies: ["Next.Js", "NestJs", "PostgreSQL", "Docker", "AWS", "Web Crypto API", "OpenAI API"],
    status: "live" as const,
  },
  {
    title: "Bucket0",
    description: "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface.",
    github: null,
    demo: "https://bucket0.com",
    technologies: ["Next.Js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "OpenVScan",
    description: "OpenVScan is a web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
    github: "https://github.com/Buddhsen-tripathi/openvscan",
    demo: "https://www.openvscan.com",
    technologies: ["Next.Js", "NestJs", "TypeScript", "Tailwind CSS"],
    status: "building" as const,
  },
  {
    title: "Clonvo",
    description: "Developed the website for Clonvo, an organisation which offers business solutions for AI and web development.",
    github: null,
    demo: "https://clonvo.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "openai-api-helper",
    description: "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
    github: "https://github.com/Buddhsen-tripathi/openai-api-helper",
    demo: "https://www.npmjs.com/package/openai-api-helper",
    technologies: ["JavaScript", "TypeScript"],
    status: "completed" as const,
  },
  {
    title: "SmartText Enhancer",
    description: "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    github: null,
    demo: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
    technologies: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
    status: "completed" as const,
  }
]

const funProjects = [
  {
    title: "Twitter/X Spam Check",
    description: "Enter a Twitter/X username to analyze their recent activity for potential spam-like behavior using AI.",
    github: null,
    demo: "https://www.buddhsentripathi.com/spam-or-not",
    technologies: [],
    path: "spam-or-not"
  },
  {
    title: "Code Runner",
    description: "A fast-paced game where you dodge bugs and climb the leaderboard. Sharpen your reflexes and aim for the top.",
    github: null,
    demo: "https://www.buddhsentripathi.com/code-runner",
    technologies: [],
    path: "code-runner"
  }
]

interface LinkTextProps {
  href: string
  children: React.ReactNode
  className?: string
}

const LinkText = ({ href, children, className = "" }: LinkTextProps) => (
  <Link
    href={href}
    target="_blank"
    className={`relative inline-flex items-center gap-0.5 text-sm font-normal text-muted-foreground transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full ${className}`}
  >
    <span>{children}</span>
    <ArrowUpRight className="h-3 w-3" />
  </Link>
)

export default function FeaturedProjects() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <section className="space-y-8 duration-1000 animate-in fade-in fill-mode-both animation-delay-900" id="projects">
      {isHomePage && (
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          projects.
        </h2>
      )}

      {/* Projects List */}
      <div className="space-y-6">
        {projects.slice(0, isHomePage ? 3 : projects.length).map((project) => (
          <div
            key={project.title}
            className="space-y-2 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-normal capitalize text-primary">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="text-xs text-muted-foreground opacity-70 hidden sm:inline">
                    [{parseProjectStatus(project.status)}]
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center justify-start gap-3 text-sm">
                {project.demo && (
                  <LinkText href={project.demo}>
                    live
                  </LinkText>
                )}
                {project.github && (
                  <LinkText href={project.github}>
                    github
                  </LinkText>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm font-normal text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
                  >
                    [{tech}]
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {isHomePage && (
        <Link
          href="/projects"
          className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
            view all projects
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      {/* Fun X Projects Section */}
      {!isHomePage && (
        <div className="space-y-6 pt-8">
          <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
            𝕏 projects.
          </h2>
          <p className="text-sm text-muted-foreground">
            Small projects to engage my 𝕏 community (
            <a
              href="https://x.com/intent/follow?screen_name=btr1pathi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @btr1pathi
            </a>
            )
          </p>

          <div className="space-y-6">
            {funProjects.map((project) => (
              <div
                key={project.title}
                className="space-y-2 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-normal capitalize text-primary">
                    {project.title}
                  </h3>
                  <LinkText href={`/${project.path}`}>
                    try it
                  </LinkText>
                </div>

                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {project.path && (
                  <div className="pt-1">
                    <ViewCounter slug={project.path} readOnly={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
