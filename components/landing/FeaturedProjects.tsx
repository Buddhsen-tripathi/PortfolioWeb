'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BsArrowUpRight, BsArrowRight } from "react-icons/bs";
import { usePathname } from 'next/navigation'
import ViewCounter from '@/components/common/ViewCounter';

const projects = [
  {
    title: "DeepFind.Me",
    image: "/dfme.webp",
    description: "Deepfind.me is an educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    github: null,
    demo: "https://deepfind.me",
    technologies: ["Next.Js", "NestJs", "MySQL","AWS", "Web Crypto API", "OpenAI API"],
    active: true,
  },
  {
    title: "OpenVScan",
    image: "/openvscan.avif",
    description: "OpenVScan is a web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
    github: "https://github.com/Buddhsen-tripathi/openvscan",
    demo: "https://www.openvscan.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
    active: true,
  },
  {
    title: "Clonvo",
    image: "/clonvo.webp",
    description: "Developed the website for Clonvo, an organisation which offers business solutions for AI and web development.",
    github: null,
    demo: "https://clonvo.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
    active: false,
  },
  {
    title: "openai-api-helper",
    image: "/openai-helper.webp",
    description: "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
    github: "https://github.com/Buddhsen-tripathi/openai-api-helper",
    demo: "https://www.npmjs.com/package/openai-api-helper",
    technologies: ["JavaScript", "TypeScript"],
    active: false,
  },
  {
    title: "SmartText Enhancer",
    image: "/sme.webp",
    description: "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    github: null,
    demo: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
    technologies: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
    active: false,
  }
];

const funProjects = [
  {
    title: "Twitter/X Spam Check",
    image: "/spam-or-not.webp",
    description: "Enter a Twitter/X username to analyze their recent activity for potential spam-like behavior using AI.",
    github: null,
    demo: "https://www.buddhsentripathi.com/spam-or-not",
    technologies: [],
    path: "spam-or-not"
  },
  {
    title: "Code Runner",
    image: "/code-runner.webp",
    description: "A fast-paced game where you dodge bugs and climb the leaderboard. Sharpen your reflexes and aim for the top.",
    github: null,
    demo: "https://www.buddhsentripathi.com/code-runner",
    technologies: [],
    path: "code-runner"
  }
];

export default function FeaturedProjects() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-foreground text-tracking-tight">Projects</h1>
      
      {/* Grid Layout for Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.slice(0, isHomePage ? 2 : projects.length).map((project, index) => (
          <div 
            key={project.title} 
            className="flex flex-col bg-card rounded-lg overflow-hidden shadow-md shadow-primary/15 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 border border-border hover:border-primary/30 group"
          >
            {/* Image with fixed aspect ratio */}
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300"
                priority={index < 2}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="text-xl font-semibold text-foreground text-tracking-normal group-hover:text-primary transition-colors flex-1">
                  {project.title}
                </h3>
                {project.active ? (
                  <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-slate-500/20 text-slate-700 dark:text-slate-400 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">
                    <span className="inline-block w-2 h-2 bg-slate-500 rounded-full"></span>
                    Inactive
                  </span>
                )}
              </div>
              <p className="mb-4 text-muted-foreground leading-relaxed text-sm flex-1">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-secondary dark:bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="bg-secondary dark:bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex space-x-4 pt-2 border-t border-border">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary/80 hover:text-primary hover:underline focus-ring rounded transition-colors text-sm flex items-center gap-1"
                  >
                    <BsArrowUpRight /> Github
                  </a>
                )}
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary/80 hover:text-primary hover:underline focus-ring rounded transition-colors text-sm flex items-center gap-1"
                >
                  <BsArrowUpRight /> Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isHomePage && (
        <div className="mt-6 flex justify-center w-full">
          <Link href="/projects" className="w-full focus-ring rounded-lg">
            <div className="w-full bg-card text-card-foreground rounded-lg shadow-md hover:shadow-lg shadow-primary/15 transition-all py-3 border border-border flex items-center justify-center gap-2 hover:text-primary/80 hover:bg-accent/30">
              <span>View more</span>
              <BsArrowRight className="inline-block" />
            </div>
          </Link>
        </div>
      )}

      {/* Fun X Projects Section */}
      {!isHomePage && (
        <section className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-foreground font-serif text-tracking-tight">𝕏 Projects</h2>
          <h3
            className="text-lg font-semibold mb-4 text-foreground text-tracking-normal"
            aria-label="I make random projects to engage my Twitter/X community"
          >
            Random projects to engage my 𝕏 community (
            <a 
              href="https://x.com/intent/follow?screen_name=btr1pathi" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 focus-ring px-1 rounded transition-colors"
            >
              @btr1pathi
            </a>
            )
          </h3>
          
          {/* Grid Layout for Fun Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {funProjects.map((project) => (
              <div 
                key={project.title} 
                className="flex flex-col bg-card rounded-lg overflow-hidden shadow-md shadow-primary/15 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 border border-border hover:border-primary/30 group"
              >
                {/* Image with fixed aspect ratio */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-xl font-semibold mb-2 text-foreground text-tracking-normal group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground leading-relaxed text-sm flex-1">
                    {project.description}
                  </p>

                  {project.path && (
                    <div className="mb-4">
                      <ViewCounter slug={project.path} readOnly={true} />
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex space-x-4 pt-2 border-t border-border">
                    <Link 
                      href={`/${project.path}`} 
                      className="text-primary/80 hover:text-primary hover:underline focus-ring rounded transition-colors text-sm flex items-center gap-1"
                    >
                      <BsArrowUpRight /> Live
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
