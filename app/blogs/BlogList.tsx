'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ViewCounter } from '@/components/common';

export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  type?: string;
}

export default function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<'newest' | 'oldest' | 'mostread'>('newest');
  const [viewsData, setViewsData] = useState<Record<string, number>>({});

  // Initialize and sync views from localStorage
  useEffect(() => {
    const initializeViews = () => {
      const viewsMap: Record<string, number> = {};
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      const now = Date.now();
      
      // Iterate through localStorage and extract all views-cache entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('views-cache-')) {
          const slug = key.replace('views-cache-', '');
          const cached = localStorage.getItem(key);
          if (cached) {
            try {
              const data = JSON.parse(cached);
              // Check if cache is still valid
              if (now - data.timestamp < CACHE_DURATION) {
                viewsMap[slug] = data.views || 0;
              }
            } catch (e) {
              console.error(`Failed to parse views cache for ${slug}:`, e);
            }
          }
        }
      }
      
      setViewsData(viewsMap);
    };

    initializeViews();
  }, []);

  // Sort posts based on sortType
  const sortedPosts = [...blogPosts].sort((a, b) => {
    switch (sortType) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'mostread':
        return (viewsData[b.slug] || 0) - (viewsData[a.slug] || 0);
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Update filter type to use BlogPost
  const filteredPosts = sortedPosts.filter((post: BlogPost) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const searchVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const noResultsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Search and Sort Bar */}
      <motion.div 
        className="flex gap-4"
        variants={searchVariants}
      >
        {/* Search Bar */}
        <motion.div 
          className="relative flex-1"
        >
          <motion.input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-background transition-all duration-300"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute right-3 top-2.5"
            animate={{ 
              rotate: searchQuery ? 15 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>

        {/* Sort Dropdown */}
        <motion.select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'newest' | 'oldest' | 'mostread')}
          className="px-4 py-2 border rounded-lg shadow-sm shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-background transition-all duration-300 cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostread">Most Read</option>
        </motion.select>
      </motion.div>

      {/* Blog List */}
      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div 
            key="blog-grid"
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  layout
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Link href={`/blogs/${post.slug}`} className="block h-full focus-ring rounded-lg">
                    <motion.article 
                      className="p-6 bg-card rounded-lg shadow-md shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30 cursor-pointer flex flex-col h-full group relative overflow-hidden text-card-foreground"
                      transition={{ duration: 0.2 }}
                    >
                      
                      <div className="space-y-4 flex-grow relative z-10">
                        <div>
                          <motion.h2 
                            className="text-xl font-semibold pb-1 text-foreground text-tracking-normal group-hover:text-primary transition-colors"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {post.title}
                          </motion.h2>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <motion.time
                              className="transition-opacity"
                              initial={{ opacity: 0.6 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {post.date}
                            </motion.time>
                            <span>•</span>
                            <motion.span
                              className="transition-opacity"
                              initial={{ opacity: 0.6 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <ViewCounter slug={post.slug} readOnly={true} />
                            </motion.span>
                          </div>
                        </div>
                        
                        <motion.p 
                          className="text-muted-foreground leading-relaxed"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {post.excerpt.length > 150
                            ? `${post.excerpt.substring(0, 150)}...`
                            : post.excerpt}
                        </motion.p>
                      </div>
                      
                      <motion.span 
                        className="text-primary self-start pt-1 relative z-10 inline-flex items-center group-hover:text-primary/80 transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        Read more 
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="ml-1"
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            variants={noResultsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center py-12 bg-card rounded-lg border border-border"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-6xl mb-4"
            >
              🔍
            </motion.div>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No matching blog posts found in this section.
            </motion.p>
            <motion.p 
              className="text-muted-foreground text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Try adjusting your search terms
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}