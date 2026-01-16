import Link from 'next/link';
import { getAllBlogPosts } from '@/app/blogs/utils';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ViewCounter from '@/components/common/ViewCounter';

export default async function FeaturedPosts() {
  const blogPosts = await getAllBlogPosts();

  return (
    <section className="space-y-6 duration-1000 animate-in fade-in fill-mode-both animation-delay-[1100ms]">
      <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
        recent blogs.
      </h2>

      <div className="space-y-4">
        {blogPosts.slice(0, 3).map((post) => {
          return (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block"
            >
              <article className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-normal text-primary group-hover:underline transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time>{post.date}</time>
                  <span>•</span>
                  <ViewCounter slug={post.slug} readOnly={true} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt && post.excerpt.length > 120
                    ? `${post.excerpt.substring(0, 120)}...`
                    : post.excerpt || ''}
                </p>
              </article>
            </Link>
          );
        })}
      </div>

      <Link 
        href="/blogs" 
        className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
          view all blogs
        </span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
