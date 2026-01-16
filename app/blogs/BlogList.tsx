'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
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
        className="flex gap-3"
        variants={searchVariants}
      >
        {/* Search Bar */}
        <motion.div 
          className="relative flex-1"
        >
          <motion.input
            type="text"
            placeholder="search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 px-3 pr-9 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground transition-colors"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2"
            animate={{ 
              rotate: searchQuery ? 15 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>

        {/* Sort Dropdown */}
        <motion.select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'newest' | 'oldest' | 'mostread')}
          className="h-9 px-3 text-sm border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
        >
          <option value="newest">newest</option>
          <option value="oldest">oldest</option>
          <option value="mostread">most read</option>
        </motion.select>
      </motion.div>

      {/* Blog List */}
      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div 
            key="blog-grid"
            className="space-y-6"
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
                  whileTap={{ scale: 0.99 }}
                  className="h-full"
                >
                  <Link href={`/blogs/${post.slug}`} className="group block">
                    <motion.article 
                      className="space-y-1"
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <motion.h2 
                          className="font-normal text-primary group-hover:underline transition-colors"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {post.title}
                        </motion.h2>
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <time>{post.date}</time>
                        <span>•</span>
                        <ViewCounter slug={post.slug} readOnly={true} />
                      </div>
                      
                      <motion.p 
                        className="text-sm text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {post.excerpt.length > 120
                          ? `${post.excerpt.substring(0, 120)}...`
                          : post.excerpt}
                      </motion.p>
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
            className="py-8"
          >
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No matching blog posts found. Try adjusting your search.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}