import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Posts tagged "${tag}"` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/archive"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors mb-4 inline-block"
      >
        &larr; All tags
      </Link>
      <h1 className="text-2xl font-bold mb-6">
        Posts tagged <span className="text-[var(--color-accent)]">#{tag}</span>
      </h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
