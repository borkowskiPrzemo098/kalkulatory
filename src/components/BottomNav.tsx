"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, Search, LayoutGrid, X } from "lucide-react";
import SearchBox from "./SearchBox";

const items = [
  { href: "/", label: "Start", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/kalkulatory",
    label: "Kalkulatory",
    icon: Calculator,
    match: (p: string) => p.startsWith("/kalkulatory"),
  },
  {
    href: "/kategorie",
    label: "Kategorie",
    icon: LayoutGrid,
    match: (p: string) => p.startsWith("/kategorie"),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Zmiana strony zamyka panel wyszukiwania.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (!searchOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <div className="md:hidden">
      {searchOpen && (
        <div
          role="dialog"
          aria-label="Szukaj kalkulatora"
          className="fixed inset-x-0 bottom-16 z-50 border-t-[1.5px] border-frame bg-paper px-3 pb-3 pt-2.5 shadow-[0_-12px_28px_-10px_rgba(8,59,51,0.3)]"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="caps text-[0.7rem] text-ink-2">Szukaj kalkulatora</p>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Zamknij wyszukiwanie"
              className="focus-ring -mr-1 flex h-9 w-9 items-center justify-center text-ink-2"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <SearchBox compact autoFocus dropUp id="calculator-search-mobile" />
        </div>
      )}

      <nav
        aria-label="Nawigacja mobilna"
        className="fixed inset-x-0 bottom-0 z-40 border-t-[1.5px] border-frame bg-paper"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4">
          {items.map((item, i) => {
            const active = !searchOpen && item.match(pathname ?? "");
            const Icon = item.icon;
            return (
              <li key={item.href} className={i > 0 ? "border-l border-hair" : ""}>
                <Link
                  href={item.href}
                  className={`focus-ring relative flex h-16 flex-col items-center justify-center gap-1 ${
                    active ? "text-green" : "text-ink-2"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {active && <span aria-hidden className="absolute inset-x-4 top-0 h-[3px] bg-green" />}
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                  <span className="caps text-[0.7rem]">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="border-l border-hair">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              className={`focus-ring relative flex h-16 w-full flex-col items-center justify-center gap-1 ${
                searchOpen ? "text-green" : "text-ink-2"
              }`}
            >
              {searchOpen && <span aria-hidden className="absolute inset-x-4 top-0 h-[3px] bg-green" />}
              <Search className="h-5 w-5" strokeWidth={searchOpen ? 2.25 : 1.75} aria-hidden />
              <span className="caps text-[0.7rem]">Szukaj</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
