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
    <div className="space-y-8 duration-1000 animate-in fade-in fill-mode-both">
      <header className="space-y-2">
        <h1 className="font-serif text-xl font-medium italic text-foreground">blogs.</h1>
        <p className="text-sm text-muted-foreground">Latest articles and tutorials</p>
      </header>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="inline-flex gap-4 bg-transparent p-0 h-auto mb-6">
          <TabsTrigger 
            value="technical" 
            className="relative px-0 py-1 bg-transparent text-sm font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:-bottom-0.5 data-[state=active]:after:left-0 data-[state=active]:after:h-[1.5px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary transition-colors"
          >
            technical
          </TabsTrigger>
          <TabsTrigger 
            value="personal" 
            className="relative px-0 py-1 bg-transparent text-sm font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:-bottom-0.5 data-[state=active]:after:left-0 data-[state=active]:after:h-[1.5px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary transition-colors"
          >
            personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="animate-fade-in">
          {technicalPosts.length > 0 ? (
            <BlogList blogPosts={technicalPosts} />
          ) : (
            <div className="py-8">
              <p className="text-sm text-muted-foreground">No technical articles published yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="personal" className="animate-fade-in">
          {personalPosts.length > 0 ? (
            <BlogList blogPosts={personalPosts} />
          ) : (
            <div className="py-8">
              <p className="text-sm text-muted-foreground">No personal blogs published yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewsletterSubscription />

      <BackToTopButton />
    </div>
  )
}