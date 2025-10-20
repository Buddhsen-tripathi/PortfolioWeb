import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'Buddhsen Tripathi',
  description: 'Full Stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
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
        <link rel="preload" href="/dfme.webp" as="image" />
        <link rel="preload" href="/clonvo.webp" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${geist.className} bg-background text-foreground max-w-[1200px] mx-auto pt-12 flex flex-col min-h-screen antialiased`}>
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
        </ThemeProvider>
        <div className='mb-32 md:mb-16'></div>
      </body>
    </html>
  )
}