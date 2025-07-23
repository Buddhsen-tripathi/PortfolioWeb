import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import remarkfrontmatter from 'remark-frontmatter'
import RelatedBlogs from '@/components/RelatedBlogs'
import BackToTopButton from '@/components/BacktoTopButton'
import ReadAloudButton from './ReadAloudButton'
import ViewCounter from '@/components/ViewCounter'
import { getReadingTime } from '@/lib/utils'
import NewsletterSubscription from '@/components/NewsletterSubscription'
import SocialShare from '../SocialShare'
import { AdScript } from '@/components/AdScript'
import { mdxComponents } from '@/components/MdxComponents'
import TableOfContents from '@/components/TableOfContents'
import { getBlogPostFromS3, getBlogSlugsFromS3 } from '@/lib/r2Client'

// Fetch the list of slugs (paths to blog posts) from S3
export async function generateStaticParams() {
  const slugs = await getBlogSlugsFromS3()
  return slugs
}

export type paramsType = Promise<{ slug: string }>;

// Blog Post component that renders the content
export default async function BlogPost({ params }: { params: paramsType }) {
  // Fetch the blog content and data from S3
  const { content, data } = await getBlogPostFromS3((await params).slug)

  return (
    <div className="space-y-8">
      <meta name="title" content={`${data.title} - Buddhsen Tripathi`} />
      <meta name="description" content={`${data.excerpt}`} />
      <meta property="og:url" content={`https://buddhsentripathi.com/blogs/${data.slug}`} />
      <meta property="og:image" content="https://buddhsentripathi.com/default-image-blogs.webp" />
      <title>{`${data.title} - Buddhsen Tripathi`}</title>

      <AdScript />

      <div className="flex justify-between items-center">
        <Link href="/blogs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>
        <ReadAloudButton content={content} />
      </div>

      <h1 className="text-3xl font-bold">{data.title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>{data.date}</span>
        <span>•</span>
        <ViewCounter slug={data.slug} readOnly={false} />
        <span>•</span>
        <span>{getReadingTime(content)} min read</span>
      </div>

      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-20">
          <TableOfContents content={content} />
        </div>
      </div>
      {/* Render the MDX content */}
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight],
            remarkPlugins: [remarkGfm, remarkfrontmatter],
          },
        }}
        components={{
          ...mdxComponents,
          SocialShare: SocialShare
        }}
      />

      {/* Social Share component */}
      <SocialShare
        url={`https://buddhsentripathi.com/blogs/${data.slug}`}
        title={data.title}
      />

      <hr className="my-8 border-t" />

      {/* Newsletter subscription component */}
      <NewsletterSubscription />

      <hr className="my-8 border-t" />

      {/* Related Blogs component */}
      <RelatedBlogs currentSlug={(await params).slug} currentTitle={data.title} />

      {/* Back to Top button */}
      <BackToTopButton />
    </div>
  )
}
