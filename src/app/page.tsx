import { getAllPosts } from "@/lib/posts";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";

const POSTS_PER_PAGE = 5;

export default function HomePage() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <>
      <Hero />
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid gap-4">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        {allPosts.length > POSTS_PER_PAGE && (
          <div className="text-center mt-8">
            <a
              href="/archive"
              className="inline-block px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm hover:bg-[var(--color-card)] transition-colors"
            >
              View All Posts &rarr;
            </a>
          </div>
        )}
      </section>
    </>
  );
}
