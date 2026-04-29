# Personal Tech Blog - Design Spec

## Summary

A developer's technical blog built with Next.js (App Router + Static Export), React, and Tailwind CSS.
Dark-first visual style with Hero layout homepage. Content authored as Markdown files in the repo,
rendered statically at build time. Deployed to GitHub Pages via GitHub Actions.

## Requirements

### Core

- Long-form technical articles rendered from Markdown files under `content/posts/`
- Hero-style homepage: avatar/name, tagline, social links, recent article list with pagination
- Article detail page with code highlighting (Shiki), auto-generated TOC sidebar, tag badges, date
- Tags system: each article has tags, `/tags/[tag]` lists matching articles, tag pages statically generated
- Archive page: chronological list grouped by year
- About page: personal introduction
- Dark/light theme toggle, dark as default
- Mobile responsive

### Secondary

- Full-text client-side search via Fuse.js, invoked with Cmd+K shortcut
- Giscus comments on article pages (GitHub Discussions backend)
- RSS feed (`rss.xml`) generated at build time
- Code blocks with language label and copy button

### Out of Scope

- CMS / online editing
- User authentication
- Analytics
- Newsletter
- Dynamic server-side features (SSR, API routes, server actions)

## Tech Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | Next.js (App Router) | Static generation for SEO, React ecosystem |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Theme | next-themes | Dark-first, SSR-safe theme persistence |
| Content | Markdown + gray-matter + remark + rehype | Standard blog content pipeline |
| Code highlight | rehype-pretty-code (Shiki) | Accurate syntax highlighting, dual-theme |
| Search | Fuse.js | Client-side fuzzy search, no server needed |
| Comments | Giscus | Free, GitHub-backed, no DB |
| Deployment | GitHub Pages via GitHub Actions | Free, simple, auto-deploy on push |
| Package manager | npm | Default, no extra setup |

## Architecture

### Directory Structure

```
/
├── content/
│   └── posts/                    # All articles as .md files
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: Header, Footer, ThemeProvider
│   │   ├── page.tsx              # Home: Hero + paginated article list
│   │   ├── posts/[slug]/page.tsx # Article detail + TOC + comments
│   │   ├── tags/[tag]/page.tsx   # Articles filtered by tag
│   │   ├── archive/page.tsx      # All articles grouped by year
│   │   └── about/page.tsx        # About page
│   ├── components/
│   │   ├── Header.tsx            # Nav + theme toggle + search trigger
│   │   ├── Footer.tsx            # Social links, RSS link, copyright
│   │   ├── ThemeToggle.tsx       # Dark/light switch
│   │   ├── SearchDialog.tsx      # Cmd+K search modal
│   │   ├── Hero.tsx              # Homepage hero section
│   │   ├── ArticleCard.tsx       # Article preview card
│   │   ├── ArticleContent.tsx    # Rendered Markdown body
│   │   ├── CodeBlock.tsx         # Code block with copy + language
│   │   ├── TableOfContents.tsx   # Auto-generated from headings
│   │   ├── TagBadge.tsx          # Clickable tag chip
│   │   └── GiscusComments.tsx    # Giscus comment widget
│   └── lib/
│       ├── posts.ts              # Read & parse markdown files
│       ├── markdown.ts           # remark/rehype pipeline
│       ├── search.ts             # Build search index
│       └── rss.ts                # Generate rss.xml
├── public/
├── next.config.ts                # output: 'export'
├── tailwind.config.ts
└── package.json
```

### Content Pipeline

```
content/posts/*.md
  → gray-matter (parse frontmatter)
  → remark + rehype (markdown → HTML)
  → rehype-pretty-code (code highlighting with Shiki)
  → Static HTML pages at build time
```

Frontmatter schema:
```yaml
title: string
date: YYYY-MM-DD
tags: string[]
description: string
---

Article body in Markdown...
```

### Routes

| Route | Page | Data Source |
|-------|------|-------------|
| `/` | Home: Hero + paginated article list | All posts metadata, sorted by date desc |
| `/posts/[slug]` | Article detail | Single post full content |
| `/tags/[tag]` | Articles by tag | Posts filtered by tag |
| `/archive` | All articles by year | All posts grouped by year |
| `/about` | About page | Static content |
| `/rss.xml` | RSS feed | All posts metadata + content |

### Build Output

`next.config.ts`:
```ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // GitHub Pages doesn't support next/image optimization
};
```

Output written to `out/`, deployed from there.

## Data Flow

### Build Time

1. `lib/posts.ts` reads all `.md` files from `content/posts/`
2. Each file: gray-matter extracts frontmatter, markdown body passed through remark/rehype
3. `generateStaticParams()` produces `[slug]` params for `posts/[slug]/page.tsx` and `[tag]` params for `tags/[tag]/page.tsx`
4. `lib/search.ts` builds a Fuse.js index and writes `public/search-index.json`
5. `lib/rss.ts` generates `public/rss.xml`
6. Next.js static export writes all pages to `out/`

### Client Runtime

- Page navigations: no full reload, Next.js Link + client-side routing
- Theme toggle: next-themes manages class on `<html>`, Tailwind `dark:` variants respond
- Search: `SearchDialog` loads `search-index.json`, runs Fuse.js fuzzy search, renders results as links
- Comments: Giscus `<script>` loads in `GiscusComments`, renders GitHub Discussions thread matching page path

## Design Notes

- **Dark-first**: Default theme is dark, toggle allows switching to light. `next-themes` persists preference in localStorage.
- **Responsive**: Mobile-first. Hero stacks vertically on small screens. TOC moves below content or collapses on narrow viewports.
- **Performance**: All pages pre-rendered as static HTML, no JS needed for initial render. Hydration adds interactivity (theme toggle, search, comments).
- **SEO**: Each article gets its own `<title>`, `<meta description>`, and Open Graph tags via Next.js Metadata API.

## Deployment

GitHub Actions workflow:
1. Trigger on push to `main`
2. Checkout → setup Node → `npm ci` → `npm run build`
3. Deploy `out/` to `gh-pages` branch (using `peaceiris/actions-gh-pages`)
4. GitHub Pages serves from `gh-pages` branch
