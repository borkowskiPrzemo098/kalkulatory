"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { calculators } from "@/calculators/registry";
import { trackEvent } from "@/lib/analytics";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function scoreMatch(query: string, config: (typeof calculators)[number]): number {
  const q = normalize(query);
  const name = normalize(config.name);
  const desc = normalize(config.shortDescription);
  const tags = config.tags.map(normalize);

  if (name.startsWith(q)) return 100;
  if (name.includes(q)) return 80;
  if (tags.some((t) => t.startsWith(q))) return 60;
  if (tags.some((t) => t.includes(q))) return 40;
  if (desc.includes(q)) return 20;
  return 0;
}

interface SearchBoxProps {
  compact?: boolean;
  autoFocus?: boolean;
}

export default function SearchBox({ compact = false, autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    return calculators
      .map((c) => ({ config: c, score: scoreMatch(query, c) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.config);
  }, [query]);

  function handleChange(value: string) {
    setQuery(value);
    setOpen(value.trim().length > 0);
    if (value.trim().length > 1) {
      trackEvent("search_performed", { query: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/kalkulatory/${results[0].slug}`);
      setOpen(false);
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="calculator-search" className="sr-only">
          Szukaj kalkulatora
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            id="calculator-search"
            type="search"
            inputMode="search"
            autoFocus={autoFocus}
            placeholder={compact ? "Szukaj kalkulatora…" : "Np. VAT, BMI, raty kredytu…"}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => query.trim().length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            className="focus-ring w-full rounded-lg border border-border-strong bg-surface py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-2"
            role="combobox"
            aria-expanded={open}
            aria-controls="calculator-search-results"
            aria-autocomplete="list"
            autoComplete="off"
          />
        </div>
      </form>

      {open && results.length > 0 && (
        <ul
          id="calculator-search-results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-lg border border-border bg-surface shadow-lg"
          role="listbox"
        >
          {results.map((r) => (
            <li key={r.slug} role="option" aria-selected="false">
              <Link
                href={`/kalkulatory/${r.slug}`}
                className="focus-ring block px-4 py-2.5 text-sm hover:bg-accent-soft"
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className="font-medium text-foreground">{r.name}</span>
                <span className="ml-2 text-xs text-muted">{r.shortDescription.slice(0, 50)}…</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted shadow-lg">
          Brak wyników dla „{query}”.
        </div>
      )}
    </div>
  );
}
