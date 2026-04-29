import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <p>&copy; {new Date().getFullYear()} DevBlog. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/rss.xml" className="hover:text-[var(--color-fg)] transition-colors">
            RSS
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
