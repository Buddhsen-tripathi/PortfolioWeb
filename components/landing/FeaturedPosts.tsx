import Link from 'next/link';
import { getAllBlogPosts } from '@/app/blogs/utils';
import { BsArrowRight } from 'react-icons/bs';
import { createClient } from '@/lib/supabaseServer';
import ViewCounter from '@/components/common/ViewCounter';

export default async function FeaturedPosts() {
  const blogPosts = await getAllBlogPosts();
  const supabase = await createClient();

  const { data: viewsData } = await supabase.from('views').select('slug, count');

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-foreground text-tracking-tight">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.slice(0, 2).map((post) => {
          return (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="block group focus-ring rounded-lg h-full"
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-md shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30 h-full flex flex-col">
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
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        <ViewCounter slug={post.slug} readOnly={true} />
                      </span>
                    </div>
                    <span className="text-primary group-hover:text-primary/80 group-hover:underline ml-4 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center w-full">
        <Link href="/blogs" className="w-full focus-ring rounded-lg">
          <div className="w-full bg-card text-card-foreground rounded-lg shadow-md shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 py-3 flex items-center justify-center gap-2 hover:text-primary/80 hover:bg-accent/30">
            <span>View more</span>
            <BsArrowRight className="inline-block" />
          </div>
        </Link>
      </div>
    </section>
  );
}
