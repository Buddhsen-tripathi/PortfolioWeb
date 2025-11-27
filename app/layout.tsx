import { ThemeProvider } from 'next-themes'
import { Navbar, ScrollProgress, Footer } from '@/components/layout'
import './globals.css'
 

export const metadata = {
  title: 'Buddhsen Tripathi',
  description: 'Full Stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'Portfolio', 'Buddhsen Tripathi', 'Software Engineer', 'Web Developer', 'Java', 'Web Security'],
  authors: [{ name: 'Buddhsen Tripathi' }],
  creator: 'Buddhsen Tripathi',
  metadataBase: new URL('https://buddhsentripathi.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buddhsentripathi.com',
    title: 'Buddhsen Tripathi',
    description: 'Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    siteName: 'Buddhsen Tripathi Portfolio',
    images: [
      {
        url: '/default-image.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buddhsen Tripathi',
    description: 'Full stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    creator: '@btr1pathi',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/profpic.webp" as="image" />
      </head>
      <body className={`font-sans bg-background text-foreground max-w-[1000px] mx-auto pt-12 flex flex-col min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="theme"
        > 
          <ScrollProgress />
          <Navbar />
          <main className="flex-grow">
            <div className="max-w-[1000px] mx-auto px-4 py-12">
                {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
        <div className='mb-32 md:mb-16'></div>
      </body>
    </html>
  )
}