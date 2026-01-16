import { ViewCounter } from '@/components/common'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-[800px] mx-auto px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Buddhsen Tripathi. All rights reserved.
          </p>
          <ViewCounter type="visitors" readOnly={false} />
        </div>
      </div>
    </footer>
  )
}