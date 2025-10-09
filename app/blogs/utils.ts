import { getAllBlogPostsFromS3, BlogPostData } from '@/lib/r2Client'

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  type?: string
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogPosts = await getAllBlogPostsFromS3()
  
  return blogPosts.map((post: BlogPostData) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    type: (post as any).type, // Add type casting for type field if it exists
  }))
}