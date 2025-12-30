import { HeroSection, Experience, FeaturedProjects, FeaturedPosts } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'

export default function Home() {
  return (
    <main className="flex-1">
      <section className="space-y-16">
        <HeroSection />
        <Experience />
        <FeaturedProjects />
        <FeaturedPosts />
        <NewsletterSubscription />
      </section>
    </main>
  )
}