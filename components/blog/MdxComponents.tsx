import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

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
          ${level === 1 ? 'text-2xl font-medium leading-snug text-primary mt-8 mb-4' : ''}
          ${level === 2 ? 'text-lg font-medium leading-snug text-primary mt-8 mb-3' : ''}
          ${level === 3 ? 'text-base font-medium leading-snug text-primary mt-6 mb-2' : ''}
          ${level === 4 ? 'text-sm font-medium text-primary mt-4 mb-2' : ''}
          ${level === 5 ? 'text-xs font-medium text-primary mt-3 mb-1' : ''}
          ${level === 6 ? 'text-xs font-medium text-muted-foreground mt-2 mb-1' : ''}
        `}
        style={level <= 3 ? { fontFamily: 'Georgia, serif', fontStyle: 'italic' } : undefined}
        {...props}
      >
        {children}
        {/* Anchor link that appears on hover */}
        <a
          href={`#${headingId}`}
          className="absolute -left-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary text-sm"
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
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 space-y-1 mb-4 marker:text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 space-y-1 mb-4 marker:text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-sm text-muted-foreground leading-relaxed pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-primary pl-4 my-4 text-sm text-muted-foreground italic" {...props}>
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-0.5 text-primary font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          {...props}
        >
          {children}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      )
    }
    return (
      <Link
        href={href || '#'}
        className="relative text-primary font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        {...props}
      >
        {children}
      </Link>
    )
  },
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Check if this is inline code (no className from syntax highlighter)
    const isInline = !className
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 text-xs bg-muted/50 text-foreground rounded font-mono border border-border" {...props}>
          {children}
        </code>
      )
    }
    // For code blocks, let the pre handle styling
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-4 p-4 bg-zinc-900 dark:bg-zinc-900 border border-border rounded-lg overflow-x-auto text-sm font-mono [&_code]:text-zinc-100 [&_code]:bg-transparent" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src}
      alt={alt}
      className="my-6 rounded-lg max-w-full h-auto"
      loading="lazy"
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-6 border-t border-border" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border last:border-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider bg-muted/30" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
}
