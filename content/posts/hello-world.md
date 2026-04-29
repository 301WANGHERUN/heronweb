---
title: "Hello World: Building a Blog with Next.js"
date: 2026-04-29
tags: ["nextjs", "react", "typescript"]
description: "A walkthrough of building a statically-generated developer blog using Next.js App Router, Tailwind CSS, and Markdown."
---

## Why Static Generation?

Static site generation is ideal for blogs. Pages are pre-built at deploy time, serving instantly to every visitor.

## The Stack

- **Next.js** — App Router with `output: 'export'`
- **Tailwind CSS** — Utility-first styling
- **Markdown** — Content authored as `.md` files

## Code Example

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
};
```

This is just the beginning — more posts coming soon.
