import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllBlogPosts, type BlogPost } from './utils'
import BlogList from './BlogList'
import BackToTopButton from '@/components/BacktoTopButton'
import NewsletterSubscription from '@/components/NewsletterSubscription'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdScript } from '@/components/AdScript'

export default async function BlogPage() {
  const allPosts: BlogPost[] = await getAllBlogPosts()

  // Filter posts based on the 'type' property directly
  const technicalPosts = allPosts.filter(post => post.type !== 'personal');
  const personalPosts = allPosts.filter(post => post.type === 'personal');

  return (
    <div className="container max-w-4xl space-y-8">
      <meta name="title" content="Blogs - Buddhsen Tripathi" />
      <meta name="description" content="Read the latest articles, tutorials, and personal thoughts on technology, programming, and more." />
      <meta property="og:url" content="https://buddhsentripathi.com/blogs" />
      <meta property="og:image" content="https://buddhsentripathi.com/default-image-blogs.webp" />
      <title>Blogs - Buddhsen Tripathi</title>

      <AdScript/>

      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground text-tracking-tight">Blogs</h1>
        <p className="text-muted-foreground leading-relaxed">Latest articles and tutorials</p>
      </header>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted border border-border rounded-lg p-1">
          <TabsTrigger 
            value="technical" 
            className="bg-transparent text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 ease-in-out rounded-lg focus-ring"
          >
            Technical
          </TabsTrigger>
          <TabsTrigger 
            value="personal" 
            className="bg-transparent text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 ease-in-out rounded-lg focus-ring"
          >
            Personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="animate-fade-in">
          {technicalPosts.length > 0 ? (
            <BlogList blogPosts={technicalPosts} />
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground italic text-lg">No technical articles published yet.</p>
              <p className="text-muted-foreground text-sm mt-2">Check back soon for new content!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="personal" className="animate-fade-in">
          {personalPosts.length > 0 ? (
            <BlogList blogPosts={personalPosts} />
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground italic text-lg">No personal blogs published yet.</p>
              <p className="text-muted-foreground text-sm mt-2">Personal stories and thoughts coming soon!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewsletterSubscription />

      <BackToTopButton />
    </div>
  )
}