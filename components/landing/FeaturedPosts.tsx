import Link from 'next/link';
import { getAllBlogPosts } from '@/app/blogs/utils';
import { ArrowRight } from 'lucide-react';
import ViewCounter from '@/components/common/ViewCounter';

export default async function FeaturedPosts() {
  const blogPosts = await getAllBlogPosts();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-5 text-tracking-tight">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {blogPosts.slice(0, 2).map((post) => {
          return (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="block h-full focus-ring rounded-sm"
            >
              <article className="p-6 bg-background/40 rounded-sm shadow-sm shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-primary/20 hover:border-primary/30 cursor-pointer flex flex-col h-full group relative overflow-hidden text-card-foreground">
                <div className="space-y-4 flex-grow relative z-10">
                  <div>
                    <h3 className="text-xl font-semibold pb-1 text-foreground text-tracking-normal group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <time>{post.date}</time>
                      <span>•</span>
                      <span>
                        <ViewCounter slug={post.slug} readOnly={true} />
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt && post.excerpt.length > 150
                      ? `${post.excerpt.substring(0, 150)}...`
                      : post.excerpt || ''}
                  </p>
                </div>
                <span className="text-primary self-start pt-1 relative z-10 inline-flex items-center group-hover:text-primary/80 transition-colors">
                  Read more
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </article>
            </Link>
          );
        })}
      </div>

      <div className="mt-4">
        <Link href="/blogs" className="block focus-ring rounded-sm">
          <div className="group w-full rounded-sm border border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-accent/30 transition-colors px-4 py-3 flex items-center justify-center gap-2">
            <span className="text-sm font-medium">View more</span>
            <ArrowRight className="w-4 h-4 inline-block transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>
    </section>
  );
}
