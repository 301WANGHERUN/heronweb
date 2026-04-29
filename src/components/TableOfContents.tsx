"use client";

import type { TocItem } from "@/lib/markdown";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-20 w-56 shrink-0 self-start">
      <h3 className="text-sm font-semibold mb-3 text-[var(--color-muted)] uppercase tracking-wide">
        On this page
      </h3>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors block py-0.5"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
