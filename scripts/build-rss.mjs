import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://username.github.io";
const SITE_TITLE = "DevBlog";
const SITE_DESCRIPTION = "A developer's technical blog";

const postsDir = path.join(process.cwd(), "content", "posts");
const files = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))
  : [];

const items = files
  .map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      title: data.title ?? slug,
      date: data.date ? new Date(data.date) : new Date(0),
      description: data.description ?? "",
      slug,
      content,
    };
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

const rssXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/posts/${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

const outDir = path.join(process.cwd(), "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "rss.xml"), rssXml);
console.log("RSS feed written");

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
