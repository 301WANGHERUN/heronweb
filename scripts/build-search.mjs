import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");
const outDir = path.join(process.cwd(), "public");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))
  : [];

const index = files.map((filename) => {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    tags: data.tags ?? [],
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "1970-01-01",
  };
});

fs.writeFileSync(path.join(outDir, "search-index.json"), JSON.stringify(index));
console.log(`Search index written: ${index.length} entries`);
