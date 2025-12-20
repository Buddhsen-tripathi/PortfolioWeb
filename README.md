## Project Overview

This is my personal portfolio website built with Next.js (App Router), Tailwind CSS, and TypeScript. It showcases projects and experience, hosts a technical blog (MDX), and includes a couple of interactive tools. The focus is performance, SEO, and a clean developer experience.

## Features

-   **Next.js App Router:** Uses SSR/SSG where appropriate for performance and SEO.
-   **Home / Projects:** Portfolio landing page + projects listing ([`app/page.tsx`](app/page.tsx), [`app/projects/page.tsx`](app/projects/page.tsx)).
-   **Blog (MDX):** Self-hosted blog with posts written in MDX ([`app/blogs/`](app/blogs/page.tsx)).
    -   View counters for blog posts ([`app/api/views/route.ts`](app/api/views/route.ts)).
    -   Read-aloud functionality for blog posts ([`app/blogs/[slug]/ReadAloudButton.tsx`](app/blogs/[slug]/ReadAloudButton.tsx)).
-   **Interactive Tools:**
    -   **Code Runner:** Small browser game + leaderboard ([`app/code-runner/page.tsx`](app/code-runner/page.tsx), [`app/api/leaderboard/route.ts`](app/api/leaderboard/route.ts)).
    -   **Twitter/X Spam Check:** Analyzes a Twitter/X account for spam-like behavior using AI ([`app/spam-or-not/page.tsx`](app/spam-or-not/page.tsx), [`app/api/spam-or-not/route.ts`](app/api/spam-or-not/route.ts)).
-   **Styling:** Tailwind CSS + shadcn/ui components ([`components/ui/`](components/ui/)).
-   **Dark Mode:** Theme toggling via `next-themes`.
-   **Newsletter Subscription:** Newsletter sign-ups backed by Supabase ([`app/api/subscribe/route.ts`](app/api/subscribe/route.ts)).
-   **SEO/Feeds:** RSS feed + sitemap ([`app/feed.xml/route.ts`](app/feed.xml/route.ts), [`app/sitemap.xml/route.ts`](app/sitemap.xml/route.ts)).
-   **Analytics:** Google Analytics via `NEXT_PUBLIC_GA_ID` (see [`app/layout.tsx`](app/layout.tsx)).

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (v16+ with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Backend/Database (for dynamic content like views):** [Supabase](https://supabase.io/)
-   **Content:** [MDX](https://mdxjs.com/) for blog posts
-   **External APIs:**
    -   [Google Gemini API](https://ai.google.dev/): Used for AI analysis in the Spam Check tool.
    -   [Exa API](https://exa.ai/): Used to fetch Twitter/X content for analysis.
-   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

Follow these steps to get the project running locally:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
    or
    ```bash
    pnpm install
    ```
    or
    ```bash
    bun install
    ```

2.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory. You can copy the structure from `.env.example` if one is provided, or create it manually.
    Populate it with your credentials as described in the "Environment Variables" section below.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    or
    ```bash
    pnpm dev
    ```
    or
    ```bash
    bun run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the main page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

## Environment Variables

This project requires the following environment variables to be set in a `.env.local` file in the root directory for full functionality:

-   `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (client + server).
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key (client + server).
-   `SUPABASE_URL`: Supabase project URL (admin client for server routes).
-   `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (server-only; used by API routes).
-   `GEMINI_API_KEY`: Google Gemini API key (server-only; used by Spam Check).
-   `EXA_API_KEY`: Exa API key (server-only; used by Spam Check).
-   `NEXT_PUBLIC_GA_ID`: Google Analytics measurement ID.
-   `NEXT_PUBLIC_BASE_URL`: Comma-separated list of allowed origins for certain API routes (e.g. `http://localhost:3000,https://buddhsentripathi.com`).

Example `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
EXA_API_KEY=YOUR_EXA_API_KEY
NEXT_PUBLIC_GA_ID=YOUR_GA_MEASUREMENT_ID
```

## Project Structure

A brief overview of the key directories:

-   **`app/`**: Contains all the routes, pages, and API endpoints, following the Next.js App Router structure.
    -   `app/api/`: API routes (e.g., for view counts, spam checks, resume suggestions).
    -   `app/blogs/`: Blog-related pages, MDX posts are in `app/blogs/posts/`.
    -   `app/code-runner/`: Code Runner game.
    -   `app/spam-or-not/`: Twitter/X Spam Check tool.
    -   `app/layout.tsx`: The main layout component.
    -   `app/page.tsx`: The entry page for the portfolio.
    -   `app/globals.css`: Global styles and Tailwind CSS directives.
-   **`components/`**: Shared React components used across the application.
    -   `components/ui/`: UI components from shadcn/ui, as defined in [`components.json`](components.json).
    -   `components/FeaturedProjects.tsx`: Component to display featured projects.
    -   `components/Navbar.tsx`: Site navigation bar.
    -   `components/Footer.tsx`: Site footer.
-   **`lib/`**: Utility functions and library-specific configurations (e.g., Supabase client, helper functions in `lib/utils.ts`).
-   **`public/`**: Static assets like images, favicons, and webmanifest files.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
