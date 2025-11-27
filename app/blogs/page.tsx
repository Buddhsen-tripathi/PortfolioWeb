import { getAllBlogPosts, type BlogPost } from './utils'
import BlogList from './BlogList'
import { BackToTopButton, NewsletterSubscription } from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs - Buddhsen Tripathi',
  description: 'Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.',
  openGraph: {
    title: 'Blogs - Buddhsen Tripathi',
    description: 'Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.',
    url: 'https://buddhsentripathi.com/blogs',
    siteName: 'Buddhsen Tripathi',
    images: [
      {
        url: 'https://buddhsentripathi.com/default-image-blogs.webp',
        width: 1200,
        height: 630,
        alt: 'Blogs - Buddhsen Tripathi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs - Buddhsen Tripathi',
    description: 'Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.',
    images: ['https://buddhsentripathi.com/default-image-blogs.webp'],
  },
}

export default async function BlogPage() {
  const allPosts: BlogPost[] = await getAllBlogPosts()

  // Filter posts based on the 'type' property directly
  const technicalPosts = allPosts.filter(post => post.type !== 'personal');
  const personalPosts = allPosts.filter(post => post.type === 'personal');

  return (
    <div className="container max-w-4xl space-y-8">
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