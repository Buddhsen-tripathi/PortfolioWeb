## Project Overview

This is my personal portfolio website, built with Next.js (App Router), Tailwind CSS, and TypeScript. It's designed to showcase my projects, skills, and host a technical blog, along with several interactive tools and applications. The focus is on performance, SEO, and a modern developer experience.

## Features

-   **Next.js App Router:** Leverages Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal performance and SEO.
-   **Blog:** Self-hosted blog with posts written in MDX ([`app/blogs/`](app/blogs/page.tsx)).
    -   View counters for blog posts ([`components/ViewCounter.tsx`](components/ViewCounter.tsx), [`app/api/views/route.ts`](app/api/views/route.ts)).
    -   Read-aloud functionality for blog posts ([`app/blogs/[slug]/ReadAloudButton.tsx`](app/blogs/[slug]/ReadAloudButton.tsx)).
-   **Interactive Tools & Pages:**
    -   **Code Runner:** A simple browser game ([`app/code-runner/page.tsx`](app/code-runner/page.tsx)).
    -   **Twitter/X Spam Check:** Analyzes Twitter/X user activity for spam-like behavior using AI ([`app/spam-or-not/page.tsx`](app/spam-or-not/page.tsx)).
    -   **Linkedinfy My Post:** Helps optimize posts for LinkedIn ([`app/linkedinfy-my-post/page.tsx`](app/linkedinfy-my-post/page.tsx)).
    -   **Japanese Lucky Birthday Rankings:** A fun tool to check birthday luck ([`app/2025-birthday-rankings/page.tsx`](app/2025-birthday-rankings/page.tsx)).
-   **Styling:** Modern UI styled with Tailwind CSS ([`tailwind.config.ts`](tailwind.config.ts)) and shadcn/ui components ([`components/ui/`](components/ui/)).
-   **Dark Mode:** Theme toggling for light/dark mode support ([`components/theme-provider.tsx`](components/theme-provider.tsx)).
-   **Newsletter Subscription:** Integration for newsletter sign-ups ([`app/newsletter/page.tsx`](app/newsletter/page.tsx), [`components/NewsletterSubscription.tsx`](components/NewsletterSubscription.tsx)).
-   **RSS Feed:** Automatically generated RSS feed for blog posts ([`app/feed.xml/route.ts`](app/feed.xml/route.ts)).

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (v15+ with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Backend/Database (for dynamic content like views):** [Supabase](https://supabase.io/)
-   **Content:** [MDX](https://mdxjs.com/) for blog posts
-   **External APIs:**
    -   [Google Gemini API](https://ai.google.dev/): For AI-powered features in and Spam Check.
    -   [Exa API](https://exa.ai/): For fetching Twitter/X data in the Spam Check tool.
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
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the main page by modifying [`app/page.tsx`](app/page.tsx). The page auto-updates as you edit the file.

## Environment Variables

This project requires the following environment variables to be set in a `.env.local` file in the root directory for full functionality:

-   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project public anon key.
-   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase project service role key (used for admin tasks like incrementing view counts and newsletter subscriptions).
-   `GEMINI_API_KEY`: Your Google Gemini API key (used for AI features like resume suggestions in the Spam Check tool).
-   `EXA_API_KEY`: Your Exa API key (used for the Twitter/X Spam Check tool to retrieve tweets).

Example `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
EXA_API_KEY=YOUR_EXA_API_KEY
```

## Project Structure

A brief overview of the key directories:

-   **`app/`**: Contains all the routes, pages, and API endpoints, following the Next.js App Router structure.
    -   `app/api/`: API routes (e.g., for view counts, spam checks, resume suggestions).
    -   `app/blogs/`: Blog-related pages, MDX posts are in `app/blogs/posts/`.
    -   `app/(tools)/`: Directories for interactive tools like `code-runner/`, `spam-or-not/`, `linkedinfy-my-post/`.
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
