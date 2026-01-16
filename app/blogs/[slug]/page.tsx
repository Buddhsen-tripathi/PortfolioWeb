import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import remarkfrontmatter from 'remark-frontmatter'
import { RelatedBlogs, mdxComponents, TableOfContents } from '@/components/blog'
import { BackToTopButton, ViewCounter, NewsletterSubscription } from '@/components/common'
import { getReadingTime } from '@/lib/utils'
import SocialShare from '../SocialShare'
import { getBlogPostFromS3, getBlogSlugsFromS3 } from '@/lib/r2Client'
import { Metadata } from 'next'

// Fetch the list of slugs (paths to blog posts) from S3
export async function generateStaticParams() {
  const slugs = await getBlogSlugsFromS3()
  return slugs
}

export type paramsType = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await getBlogPostFromS3(slug)

  return {
    title: `${data.title} - Buddhsen Tripathi`,
    description: data.excerpt,
    openGraph: {
      title: `${data.title} - Buddhsen Tripathi`,
      description: data.excerpt,
      url: `https://buddhsentripathi.com/blogs/${data.slug}`,
      type: 'article',
      publishedTime: data.date,
      authors: ['Buddhsen Tripathi'],
      images: [
        {
          url: 'https://buddhsentripathi.com/default-image-blogs.webp',
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} - Buddhsen Tripathi`,
      description: data.excerpt,
      images: ['https://buddhsentripathi.com/default-image-blogs.webp'],
    },
  }
}

// Blog Post component that renders the content
export default async function BlogPost({ params }: { params: paramsType }) {
  // Fetch the blog content and data from S3
  const { content, data } = await getBlogPostFromS3((await params).slug)

  return (
    <div className="space-y-6 duration-1000 animate-in fade-in fill-mode-both">
      <div className="flex justify-between items-center">
        <Link href="/blogs" className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
            back to blogs
          </span>
        </Link>
      </div>

      <h1 className="font-serif text-2xl font-medium italic leading-snug text-primary">{data.title}</h1>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
      <div className="mdx-content">
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
      </div>

      {/* Social Share component */}
      <SocialShare
        url={`https://buddhsentripathi.com/blogs/${data.slug}`}
        title={data.title}
      />

      <hr className="my-6 border-t border-border" />

      {/* Newsletter subscription component */}
      <NewsletterSubscription />

      <hr className="my-6 border-t border-border" />

      {/* Related Blogs component */}
      <RelatedBlogs currentSlug={(await params).slug} currentTitle={data.title} />

      {/* Back to Top button */}
      <BackToTopButton />
    </div>
  )
}
