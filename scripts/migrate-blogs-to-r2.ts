import { config } from 'dotenv'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'

config({ path: '.env.local' })

// This script helps migrate blog posts from local files to Cloudflare R2

// Validate required environment variables
const requiredEnvVars = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:')
  missingVars.forEach(varName => console.error(`   - ${varName}`))
  console.error('\nPlease ensure these are set in your .env.local file')
  process.exit(1)
}

const s3Client = new S3Client({
  region: 'auto', // Cloudflare R2 uses 'auto' region
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!
const BLOG_PREFIX = 'blogs/'

async function uploadBlogPost(filePath: string, fileName: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BLOG_PREFIX}${fileName}`,
      Body: content,
      ContentType: 'text/plain',
    })

    await s3Client.send(command)
    console.log(`✅ Uploaded: ${fileName}`)
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error)
  }
}

async function migrateBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/blogs/posts')
  
  if (!fs.existsSync(postsDirectory)) {
    console.error('❌ Posts directory not found:', postsDirectory)
    return
  }

  const filenames = fs.readdirSync(postsDirectory)
  const blogFiles = filenames.filter(filename => 
    filename.endsWith('.md') || filename.endsWith('.mdx')
  )

  console.log(`Found ${blogFiles.length} blog posts to migrate`)
  console.log(`Starting migration to R2 bucket: ${BUCKET_NAME}`)

  for (const fileName of blogFiles) {
    const filePath = path.join(postsDirectory, fileName)
    await uploadBlogPost(filePath, fileName)
  }

  console.log('✨ Migration completed!')
  console.log(`
📋 Next steps:
1. Verify all files are uploaded to your R2 bucket
2. Update your environment variables (.env.local):
   - R2_ACCOUNT_ID or R2_ENDPOINT
   - R2_ACCESS_KEY_ID  
   - R2_SECRET_ACCESS_KEY
   - R2_BUCKET_NAME
3. Test your blog pages to ensure they work with R2
4. Once confirmed, you can delete the local posts directory
  `)
}

// Run the migration
migrateBlogPosts().catch(console.error)