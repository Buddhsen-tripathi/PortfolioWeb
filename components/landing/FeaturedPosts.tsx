import Link from 'next/link';
import { getAllBlogPosts } from '@/app/blogs/utils';
import { BsArrowRight } from 'react-icons/bs';
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
              className="block group focus-ring rounded-sm h-full"
            >
              <div className="bg-background/40 rounded-sm overflow-hidden shadow-sm shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-primary/20 hover:border-primary/30 h-full flex flex-col">
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2 text-foreground text-tracking-normal group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {post.excerpt && post.excerpt.length > 200
                      ? `${post.excerpt.substring(0, 200)}...`
                      : post.excerpt || ''}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center md:gap-2 gap-1">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        <ViewCounter slug={post.slug} readOnly={true} />
                      </span>
                    </div>
                    <span className="shrink-0 inline-flex items-center text-sm text-foreground group-hover:text-primary transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-4">
        <Link href="/blogs" className="block focus-ring rounded-sm">
          <div className="group w-full rounded-sm border border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-accent/30 transition-colors px-4 py-3 flex items-center justify-center gap-2">
            <span className="text-sm font-medium">View more</span>
            <BsArrowRight className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>
    </section>
  );
}
