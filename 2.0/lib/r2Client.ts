import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import matter from 'gray-matter'

// Date formatting utilities
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

function convertDateFormat(dateStr: string): string {
  try {
    // Handle different date formats
    let date: Date
    
    // Check if it's in DD-MM-YYYY format
    if (dateStr.includes('-') && dateStr.split('-').length === 3) {
      const parts = dateStr.split('-')
      if (parts[0].length <= 2) {
        // Assume DD-MM-YYYY format
        const [dd, mm, yyyy] = parts.map(Number)
        if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
          date = new Date(yyyy, mm - 1, dd) // Month is 0-indexed in Date constructor
        } else {
          throw new Error('Invalid date parts')
        }
      } else {
        date = new Date(dateStr)
      }
    } else {
      // Try parsing as-is
      date = new Date(dateStr)
    }
    
    // Validate the date
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format encountered: ${dateStr}. Using current date.`)
      date = new Date()
    }
    
    // Format as "day month year" (e.g., "4 Jul 2025")
    const day = date.getDate()
    const month = MONTH_NAMES[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day} ${month} ${year}`
  } catch (error) {
    console.warn(`Error parsing date ${dateStr}:`, error)
    const today = new Date()
    const day = today.getDate()
    const month = MONTH_NAMES[today.getMonth()]
    const year = today.getFullYear()
    return `${day} ${month} ${year}`
  }
}

// Configure S3-compatible client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto', // Cloudflare R2 uses 'auto' region
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'dummy',
  },
  forcePathStyle: true, // Required for R2
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'your-blog-bucket'
const BLOG_PREFIX = 'blogs/' // Prefix for blog posts in R2

// Check if R2 is properly configured
const isR2Configured = () => {
  return !!(
    process.env.R2_ACCESS_KEY_ID && 
    process.env.R2_SECRET_ACCESS_KEY && 
    process.env.R2_BUCKET_NAME &&
    (process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID)
  )
}

export interface BlogPostData {
  title: string
  excerpt: string
  date: string
  slug: string
  type?: string
}

// Get a single blog post from R2
export async function getBlogPostFromS3(slug: string) {
  if (!isR2Configured()) {
    console.warn('R2 not configured, returning empty post')
    return {
      content: '',
      data: { title: 'R2 Not Configured', date: '', excerpt: 'Please configure Cloudflare R2 credentials', slug },
    }
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BLOG_PREFIX}${slug}.mdx`,
    })

    const response = await s3Client.send(command)
    
    if (!response.Body) {
      throw new Error('No content found')
    }

    const content = await response.Body.transformToString()
    const { content: mdxContent, data } = matter(content)

    // Convert and format the date
    const formattedDate = data.date ? convertDateFormat(data.date) : convertDateFormat(new Date().toISOString())

    return {
      content: mdxContent,
      data: { ...data, date: formattedDate, slug } as BlogPostData,
    }
  } catch (error) {
    console.error('Error fetching blog post from R2:', error)
    return {
      content: '',
      data: { title: 'Post Not Found', date: '', excerpt: '', slug },
    }
  }
}

// Get all blog post slugs from R2
export async function getBlogSlugsFromS3() {
  if (!isR2Configured()) {
    console.warn('R2 not configured, returning empty slugs')
    return []
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: BLOG_PREFIX,
    })

    const response = await s3Client.send(command)
    
    if (!response.Contents) {
      return []
    }

    const slugs = response.Contents
      .filter((object) => 
        object.Key && 
        (object.Key.endsWith('.md') || object.Key.endsWith('.mdx'))
      )
      .map((object) => {
        const key = object.Key!
        const filename = key.replace(BLOG_PREFIX, '')
        return {
          slug: filename.replace(/\.mdx?$/, ''),
        }
      })

    return slugs
  } catch (error) {
    console.error('Error fetching blog slugs from R2:', error)
    return []
  }
}

// Get all blog posts metadata from R2
export async function getAllBlogPostsFromS3() {
  if (!isR2Configured()) {
    console.warn('R2 not configured, returning empty posts')
    return []
  }

  try {
    const slugs = await getBlogSlugsFromS3()
    const posts = await Promise.all(
      slugs.map(async ({ slug }) => {
        const { data } = await getBlogPostFromS3(slug)
        return data
      })
    )
    
    // Sort posts by date (newest first)
    return posts
      .filter(post => post.title !== 'Post Not Found')
      .sort((a, b) => {
        // Convert formatted dates back to Date objects for comparison
        const dateA = new Date(a.date.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3'))
        const dateB = new Date(b.date.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3'))
        
        // If date parsing fails, fallback to string comparison
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return b.date.localeCompare(a.date)
        }
        
        return dateB.getTime() - dateA.getTime()
      })
  } catch (error) {
    console.error('Error fetching all blog posts from R2:', error)
    return []
  }
}
