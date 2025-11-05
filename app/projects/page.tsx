import FeaturedProjects from '@/components/FeaturedProjects'

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <meta name="title" content="Projects - Buddhsen Tripathi" />
      <meta name="description" content="Read the latest articles and tutorials on technology, programming, and more." />
      <meta property="og:url" content="https://buddhsentripathi.com/projects" />
      <meta property="og:image" content="https://buddhsentripathi.com/default-image-project.webp" />
      <title>Projects - Buddhsen Tripathi</title>
      <FeaturedProjects />
      {/* Add more projects here if needed */}
    </div>
  )
}