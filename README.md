## Project Overview

This is my personal portfolio website built with Next.js (App Router), Tailwind CSS, and TypeScript. It showcases projects and experience, hosts a technical blog (MDX), and includes a couple of interactive tools. The focus is performance, SEO, and a clean developer experience.

## Features

### Core Pages
-   **Home:** Hero section with bio, social links, work experience, featured projects, and newsletter subscription
-   **Projects:** Showcases active projects and inactive projects.
-   **Blog:** Technical and personal articles with tabbed navigation, view counters, and social sharing

### Blog System
-   Self-hosted blog with posts written in MDX stored on Cloudflare R2
-   Basic view counters for blog posts
-   Table of contents, related posts, and social sharing
-   RSS feed and sitemap generation

### Interactive Tools
-   **Code Runner:** A fast-paced browser game where you dodge bugs and climb the leaderboard
-   **Twitter/X Spam Check:** Analyzes a Twitter/X account for spam-like behavior using AI (Gemini + Exa)

### Additional Features
-   **Dark/Light Mode:** Theme toggling via `next-themes`
-   **Newsletter Subscription:** Email sign-ups backed by Supabase
-   **Visitor Counter:** Track unique site visitors
-   **SEO Optimized:** Open Graph tags, Twitter cards, RSS feed, and sitemap
-   **Analytics:** Google Analytics integration
-   **Animations:** Smooth transitions with Framer Motion

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js](https://nextjs.org/) v16+ (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [Supabase](https://supabase.io/) (views & subscribers) |
| **Storage** | [Cloudflare R2](https://www.cloudflare.com/r2/) (blog content & images) |
| **Content** | [MDX](https://mdxjs.com/) with next-mdx-remote |
| **AI APIs** | [Google Gemini](https://ai.google.dev/), [Exa](https://exa.ai/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/buddhsen-tripathi/PortfolioWeb.git
    cd PortfolioWeb
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or: yarn install / pnpm install / bun install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory with your credentials (see Environment Variables section below).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run migrate-blogs` | Migrate blog posts to R2 |

## Environment Variables

Create a `.env.local` file with the following variables:

### Required
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_URL` | Supabase URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

### Optional (for full functionality)
| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key (Spam Check) |
| `EXA_API_KEY` | Exa API key (Spam Check) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_BASE_URL` | Allowed origins (comma-separated) |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key |
| `R2_BUCKET_NAME` | R2 bucket name for blog content |
| `R2_ACCOUNT_ID` | Cloudflare account ID |

## Project Structure

```
├── app/
│   ├── api/                  # API routes
│   │   ├── leaderboard/      # Game leaderboard
│   │   ├── spam-or-not/      # Spam analysis API
│   │   ├── subscribe/        # Newsletter subscription
│   │   ├── views/            # Blog view counter
│   │   └── visitors/         # Visitor tracking
│   ├── blogs/                # Blog pages & MDX utilities
│   ├── code-runner/          # Browser game
│   ├── newsletter/           # Newsletter page
│   ├── projects/             # Projects listing
│   ├── spam-or-not/          # Spam checker tool
│   ├── feed.xml/             # RSS feed route
│   ├── sitemap.xml/          # Sitemap route
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── blog/                 # Blog components (MDX, ToC, etc.)
│   ├── common/               # Shared components
│   ├── landing/              # Home page sections
│   ├── layout/               # Navbar, Footer, ScrollProgress
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── r2Client.ts           # Cloudflare R2 integration
│   ├── supabaseClient.ts     # Supabase browser client
│   ├── supabaseServer.ts     # Supabase server client
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
└── scripts/                  # Migration scripts
```

## Connect

-   **Website:** [buddhsentripathi.com](https://buddhsentripathi.com)
-   **GitHub:** [@buddhsen-tripathi](https://github.com/buddhsen-tripathi)
-   **LinkedIn:** [buddhsen-tripathi](https://linkedin.com/in/buddhsen-tripathi)
-   **Twitter/X:** [@btr1pathi](https://twitter.com/btr1pathi)

## License

This project is open source under the [MIT License](LICENSE).

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
-   [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
-   [Supabase](https://supabase.com/docs) - Open source Firebase alternative
-   [Cloudflare R2](https://developers.cloudflare.com/r2/) - Object storage

Built with ❤️ by [Buddhsen Tripathi](https://buddhsentripathi.com)
