import Hero from '@/components/HeroSection'
import Skills from '@/components/Experience'
import FeaturedProjects from '@/components/FeaturedProjects'
import FeaturedPosts from '@/components/FeaturedPosts'
import Contact from '@/components/Contact'
import NewsletterSubscription from '@/components/NewsletterSubscription'

export default function Home() {
  return (
    <main className="flex-1">
      <section className="px-6 py-4 space-y-16">
        <Hero />
        <Skills />
        <FeaturedProjects />
        <FeaturedPosts />
        <NewsletterSubscription />
        <Contact />
      </section>
    </main>
  )
}