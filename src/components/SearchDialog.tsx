"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Fuse, { type FuseResult } from "fuse.js";
import Link from "next/link";
import type { SearchEntry } from "@/lib/search";

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<SearchEntry>[]>([]);
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<SearchEntry> | null>(null);

  useEffect(() => {
    if (open && index.length === 0) {
      fetch("/search-index.json")
        .then((r) => r.json())
        .then((data: SearchEntry[]) => {
          setIndex(data);
          fuseRef.current = new Fuse(data, {
            keys: ["title", "description", "tags"],
            threshold: 0.3,
          });
        });
    }
  }, [open, index.length]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const search = useCallback(
    (q: string) => {
      setQuery(q);
      if (q.trim() && fuseRef.current) {
        setResults(fuseRef.current.search(q).slice(0, 8));
      } else {
        setResults([]);
      }
    },
    []
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center border-b border-[var(--color-border)] px-4">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="text-[var(--color-muted)] shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-3 py-3.5 bg-transparent text-[var(--color-fg)] outline-none text-sm"
          />
          <kbd
            className="text-xs text-[var(--color-muted)] font-mono border border-[var(--color-border)] rounded px-1.5 py-0.5 shrink-0"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            ESC
          </kbd>
        </div>
        {results.length > 0 && (
          <ul className="py-2">
            {results.map((r) => (
              <li key={r.item.slug}>
                <Link
                  href={`/posts/${r.item.slug}`}
                  onClick={onClose}
                  className="block px-4 py-2.5 hover:bg-[var(--color-card)] transition-colors"
                >
                  <div className="text-sm font-medium">{r.item.title}</div>
                  <div className="text-xs text-[var(--color-muted)] mt-0.5 line-clamp-1">
                    {r.item.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && index.length > 0 && (
          <div className="px-4 py-8 text-center text-sm text-[var(--color-muted)]">
            No results for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
