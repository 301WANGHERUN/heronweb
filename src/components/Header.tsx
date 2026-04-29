"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export default function Header({
  onSearchOpen,
}: {
  onSearchOpen: () => void;
}) {
  return (
    <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)]/90 backdrop-blur z-40">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          {"<DevBlog />"}
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors text-[var(--color-muted)] text-sm hidden sm:flex items-center gap-2"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <kbd className="text-xs font-mono">Cmd+K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
