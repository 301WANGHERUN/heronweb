import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
    >
      {tag}
    </Link>
  );
}
