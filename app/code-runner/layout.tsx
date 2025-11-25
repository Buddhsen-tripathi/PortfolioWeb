import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code Runner - Dodge the Bugs Game | Buddhsen Tripathi',
  description: 'Play Code Runner, a fun game where you dodge coding bugs and compete for high scores. Test your reflexes and climb the leaderboard!',
  keywords: ['code runner', 'coding game', 'bug dodging game', 'programming game', 'web game', 'browser game', 'leaderboard game'],
  authors: [{ name: 'Buddhsen Tripathi' }],
  openGraph: {
    title: 'Code Runner - Dodge the Bugs Game',
    description: 'Challenge yourself in this addictive coding-themed game. Dodge bugs, score points, and compete with other players!',
    url: 'https://buddhsentripathi.com/code-runner',
    siteName: 'Buddhsen Tripathi',
    images: [
      {
        url: 'https://buddhsentripathi.com/code-runner.webp',
        width: 1200,
        height: 630,
        alt: 'Code Runner Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Runner - Dodge the Bugs Game',
    description: 'Challenge yourself in this addictive coding-themed game. Dodge bugs, score points, and compete with other players!',
    images: ['https://buddhsentripathi.com/code-runner.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#1a1a1a',
}

export default function CodeRunnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
