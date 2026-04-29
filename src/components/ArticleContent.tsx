"use client";

import { useEffect, useRef } from "react";

export default function ArticleContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.querySelectorAll("figure[data-rehype-pretty-code-figure]").forEach((figure) => {
      if (figure.querySelector(".copy-btn")) return;

      const pre = figure.querySelector("pre");
      if (!pre) return;

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-3 right-3 p-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 2000);
        });
      });

      figure.classList.add("relative", "group");
      figure.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
