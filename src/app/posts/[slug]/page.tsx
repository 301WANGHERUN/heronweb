import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMarkdown, extractToc } from "@/lib/markdown";
import ArticleContent from "@/components/ArticleContent";
import TableOfContents from "@/components/TableOfContents";
import TagBadge from "@/components/TagBadge";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const toc = extractToc(html);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
          <time className="font-mono">{post.date}</time>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </header>

      <div className="lg:flex lg:gap-8">
        <TableOfContents items={toc} />
        <div className="min-w-0 flex-1">
          <ArticleContent html={html} />
        </div>
      </div>
    </article>
  );
}
