export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Buddhsen Tripathi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
