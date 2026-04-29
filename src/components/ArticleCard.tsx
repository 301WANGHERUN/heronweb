import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import TagBadge from "./TagBadge";

export default function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-accent)] transition-colors">
      <time className="text-xs text-[var(--color-muted)] font-mono">
        {post.date}
      </time>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-lg font-semibold mt-1 mb-2 hover:text-[var(--color-accent)] transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-[var(--color-muted)] mb-3 line-clamp-2">
        {post.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
