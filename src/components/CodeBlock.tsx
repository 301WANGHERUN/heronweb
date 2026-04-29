"use client";

export default function CodeBlock({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="group relative"
    />
  );
}
