import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container max-w-2xl space-y-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        back
      </Link>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">404</p>
          <h1 className="text-2xl md:text-3xl font-serif italic text-foreground">
            page not found
          </h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground transition-colors"
        >
          return home
        </Link>
      </div>
    </div>
  )
}
