'use client'
const projects = [
  {
    title: "DeepFind.Me",
    image: "/dfme.webp",
    description: "Deepfind.me is an educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    github: null,
    demo: "https://deepfind.me",
    technologies: ["Next.Js", "NestJs", "Supabase", "Web Crypto API", "OpenAI API"],
  },
  {
    title: "Clonvo",
    image: "/clonvo.avif",
    description: "Developed the website for Clonvo, an organisation which offers business solutions for AI and web development.",
    github: null,
    demo: "https://clonvo.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "openai-api-helper",
    image: "/openai-helper.webp",
    description: "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
    github: "https://github.com/Buddhsen-tripathi/openai-api-helper",
    demo: "https://www.npmjs.com/package/openai-api-helper",
    technologies: ["JavaScript", "TypeScript"],
  },
  {
    title: "SmartText Enhancer",
    image: "/sme.webp",
    description: "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    github: null,
    demo: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
    technologies: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
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

import Image from 'next/image'
import Link from 'next/link'
import { SiGithub } from "react-icons/si";
import { BsArrowUpRight, BsArrowRight } from "react-icons/bs";
import { usePathname } from 'next/navigation'
import ViewCounter from './ViewCounter';

export default function FeaturedProjects() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-foreground text-tracking-tight">Projects</h1>
      <div className="space-y-4">
        {projects.slice(0, isHomePage ? 2 : projects.length).map((project, index) => (
          <div key={project.title} className="flex flex-col md:flex-row gap-6 bg-card rounded-lg overflow-hidden shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:bg-accent/30 border border-border">
            <div className="md:w-2/5 w-full h-full relative">
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                className="w-full h-full object-cover"
                priority={index < 2}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="md:w-3/5 p-4">
              <h3 className="text-xl font-semibold mb-2 text-foreground text-tracking-normal">{project.title}</h3>
              <p className="mb-4 mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="flex space-x-4">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:text-primary/80 hover:underline focus-ring rounded transition-colors"
                  >
                    <SiGithub className="inline-block mr-1" /> GitHub
                  </a>
                )}
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary/80 hover:text-primary hover:underline focus-ring rounded transition-colors"
                >
                  <BsArrowUpRight className="inline-block mr-1" /> Live
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-secondary dark:bg-primary/90 text-primary-foreground px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isHomePage && (
        <div className="mt-4 flex justify-center w-full">
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
        <section className="mt-12">
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
          <div className="space-y-4">
            {funProjects.map((project) => (
              <div key={project.title} className="flex flex-col md:flex-row gap-6 bg-card rounded-lg overflow-hidden shadow-md shadow-primary/15 transition-all hover:shadow-lg hover:bg-accent/30 border border-border">
                <div className="md:w-2/5 w-full h-full relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-4">
                  <h3 className="text-xl font-semibold mb-2 text-foreground text-tracking-normal">{project.title}</h3>
                  <p className="mb-4 mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
                  {project.path && (
                    <p className="mb-4 mt-4">
                      <ViewCounter slug={project.path} readOnly={true} />
                    </p>
                  )}
                  <div className="flex space-x-4">
                    <Link 
                      href={`/${project.path}`} 
                      className="text-primary/80 hover:text-primary hover:underline focus-ring rounded transition-colors"
                    >
                      <BsArrowUpRight className="inline-block mr-1" /> Live
                    </Link>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm border border-border">
                        {tech}
                      </span>
                    ))}
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