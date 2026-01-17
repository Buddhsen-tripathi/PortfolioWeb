'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight, Check } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ViewCounter } from '@/components/common'
import { useViews } from '@/components/common/ViewsContext';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getViews, prefetchViews } = useViews();

  // Prefetch all blog post views for sorting
  useEffect(() => {
    const slugs = blogPosts.map(post => post.slug);
    prefetchViews(slugs);
  }, [blogPosts, prefetchViews]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sort posts based on sortType
  const sortedPosts = [...blogPosts].sort((a, b) => {
    switch (sortType) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'mostread':
        const viewsA = getViews(a.slug) || 0;
        const viewsB = getViews(b.slug) || 0;
        return viewsB - viewsA;
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
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2
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
      <div className="flex gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 px-3 pr-9 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-9 px-3 text-sm border border-border rounded-sm bg-background text-foreground hover:bg-muted focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer flex items-center gap-2"
          >
            <Check className="w-3 h-3" />
            <span>{sortType}</span>
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1 w-32 border border-border rounded-sm bg-background shadow-lg overflow-hidden z-50"
              >
                {(['newest', 'oldest', 'most read'] as const).map((option) => {
                  const value = option === 'most read' ? 'mostread' : option;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setSortType(value as 'newest' | 'oldest' | 'mostread');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors flex items-center justify-between ${
                        sortType === value ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      <span>{option}</span>
                      {sortType === value && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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