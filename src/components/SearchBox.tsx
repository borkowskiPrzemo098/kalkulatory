"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
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
  id?: string;
  /** Lista wyników nad polem (panel przy dolnej krawędzi ekranu). */
  dropUp?: boolean;
}

export default function SearchBox({ compact = false, autoFocus = false, id = "calculator-search", dropUp = false }: SearchBoxProps) {
  const dropClass = dropUp ? "bottom-full mb-1" : "top-full mt-1";
  const resultsId = `${id}-results`;
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
        <label htmlFor={id} className="sr-only">
          Szukaj kalkulatora
        </label>
        <div className="relative">
          <Search
            aria-hidden
            strokeWidth={2}
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-green ${compact ? "left-3 h-4 w-4" : "left-4 h-5 w-5"}`}
          />
          <input
            ref={inputRef}
            id={id}
            type="search"
            inputMode="search"
            autoFocus={autoFocus}
            placeholder={compact ? "Szukaj kalkulatora…" : "Np. VAT, BMI, raty kredytu…"}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => query.trim().length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            className={`w-full border bg-paper text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-3 focus:border-green focus:shadow-[inset_0_0_0_1px_var(--green)] ${
              compact
                ? "h-10 border-hair-strong pl-9 pr-3 text-[0.95rem]"
                : "h-14 border-[1.5px] border-frame pl-12 pr-4 text-[1.1rem] font-medium"
            }`}
            role="combobox"
            aria-expanded={open}
            aria-controls={resultsId}
            aria-autocomplete="list"
            autoComplete="off"
          />
        </div>
      </form>

      {open && results.length > 0 && (
        <ul
          id={resultsId}
          className={`absolute left-0 right-0 z-50 ${dropClass} max-h-80 overflow-auto border-[1.5px] border-frame bg-paper shadow-[0_12px_28px_-8px_rgba(8,59,51,0.28)]`}
          role="listbox"
        >
          {results.map((r) => (
            <li key={r.slug} role="option" aria-selected="false" className="border-b border-hair last:border-b-0">
              <Link
                href={`/kalkulatory/${r.slug}`}
                className="focus-ring block px-4 py-3 hover:bg-green-tint"
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className="block text-[0.98rem] font-semibold text-ink">{r.name}</span>
                <span className="mt-0.5 block truncate text-[0.82rem] text-ink-3">{r.shortDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className={`absolute left-0 right-0 z-50 ${dropClass} border-[1.5px] border-frame bg-paper px-4 py-3 text-[0.95rem] text-ink-2 shadow-[0_12px_28px_-8px_rgba(8,59,51,0.28)]`}>
          Brak wyników dla „{query}”. Spróbuj krótszego słowa, np. „vat” albo „procent”.
        </div>
      )}
    </div>
  );
}
