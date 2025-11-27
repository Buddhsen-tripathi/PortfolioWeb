import React from 'react'

// Function to generate ID from text
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Custom heading components that auto-generate IDs
const createHeading = (level: number) => {
  const HeadingComponent = ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : ''
    const headingId = id || generateId(text)
    
    const Tag = `h${level}` as React.ElementType
    
    return (
      <Tag
        id={headingId}
        className={`
          scroll-mt-20 group relative
          ${level === 1 ? 'text-3xl font-bold mt-8 mb-4' : ''}
          ${level === 2 ? 'text-2xl font-semibold text-primary my-4' : ''}
          ${level === 3 ? 'text-xl font-semibold text-primary my-4' : ''}
          ${level === 4 ? 'text-lg font-medium mt-4 mb-2' : ''}
          ${level === 5 ? 'text-base font-medium mt-3 mb-2' : ''}
          ${level === 6 ? 'text-sm font-medium mt-2 mb-1' : ''}
        `}
        {...props}
      >
        {children}
        {/* Anchor link that appears on hover */}
        <a
          href={`#${headingId}`}
          className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
          aria-label={`Link to ${text}`}
        >
          #
        </a>
      </Tag>
    )
  }
  
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

// Export custom MDX components
export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  // Add other custom components as needed
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
}
