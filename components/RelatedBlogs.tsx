import Link from 'next/link'
import { getAllBlogPostsFromS3, BlogPostData } from '@/lib/r2Client'

interface RelatedBlogsProps {
  currentSlug: string
  currentTitle: string
}

async function getAllPosts(): Promise<BlogPostData[]> {
  return await getAllBlogPostsFromS3()
}

function jaccardSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.split(' '))
  const set2 = new Set(str2.split(' '))
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  return intersection.size / union.size
}

export default async function RelatedBlogs({ currentSlug, currentTitle }: RelatedBlogsProps) {
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      similarity: jaccardSimilarity(currentTitle, post.title)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-foreground text-tracking-tight">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block p-6 border border-border rounded-lg shadow-md shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30 transition-all bg-card focus-ring"
          >
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors text-tracking-normal">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {post.date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}