import type { Metadata } from "next";
import { getPostsByYear, getAllTags } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  const byYear = getPostsByYear();
  const years = Object.keys(byYear).sort().reverse();
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Archive</h1>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-10">
          {allTags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {years.map((year) => (
        <section key={year} className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-[var(--color-muted)]">
            {year}
          </h2>
          <div className="grid gap-4">
            {byYear[year].map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
