'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import ViewCounter from '@/components/ViewCounter';

export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  type?: string;
}

export default function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Update filter type to use BlogPost
  const filteredPosts = blogPosts.filter((post: BlogPost) =>
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
      {/* Search Bar */}
      <motion.div 
        className="relative"
        variants={searchVariants}
      >
        <motion.input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-background transition-all duration-300 motion-search-input"
          whileFocus={{ 
            scale: 1.02
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <motion.div
          className="absolute right-3 top-3"
          animate={{ 
            rotate: searchQuery ? 15 : 0,
            scale: searchQuery ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </motion.div>
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
                  whileHover={{ 
                    backgroundColor: "rgba(0, 128, 0, 0.6)",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Link href={`/blogs/${post.slug}`} className="block h-full">
                    <motion.article 
                      className="motion-blog-card p-6 bg-card rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full group relative overflow-hidden"
                      transition={{ duration: 0.2 }}
                    >
                      {/* Subtle background animation on hover */}
                      <motion.div
                        className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="space-y-4 flex-grow relative z-10">
                        <div>
                          <motion.h2 
                            className="text-xl font-semibold pb-1 motion-blog-title"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {post.title}
                          </motion.h2>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <motion.time
                              className="motion-blog-meta"
                              initial={{ opacity: 0.6 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {post.date}
                            </motion.time>
                            <span>•</span>
                            <motion.span
                              className="motion-blog-meta"
                              initial={{ opacity: 0.6 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <ViewCounter slug={post.slug} readOnly={true} />
                            </motion.span>
                          </div>
                        </div>
                        
                        <motion.p 
                          className="text-muted-foreground motion-blog-excerpt"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {post.excerpt.length > 150
                            ? `${post.excerpt.substring(0, 150)}...`
                            : post.excerpt}
                        </motion.p>
                      </div>
                      
                      <motion.span 
                        className="text-primary self-start pt-1 relative z-10 inline-flex items-center motion-read-more"
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
            className="text-center py-12"
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