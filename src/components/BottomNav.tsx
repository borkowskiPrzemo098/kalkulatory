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
          className="fixed inset-x-0 bottom-[4.5rem] z-50 mx-2 rounded-2xl border border-line bg-white px-3 pb-3 pt-2.5 shadow-[var(--shadow-float)]"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[1rem] font-bold text-ink">Szukaj kalkulatora</p>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Zamknij wyszukiwanie"
              className="focus-ring -mr-1 flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:bg-mist"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <SearchBox compact autoFocus dropUp id="calculator-search-mobile" />
        </div>
      )}

      <nav
        aria-label="Nawigacja mobilna"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white shadow-[0_-8px_24px_-16px_rgba(4,38,31,0.4)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4">
          {items.map((item) => {
            const active = !searchOpen && item.match(pathname ?? "");
            const Icon = item.icon;
            return (
              <li key={item.href} className="">
                <Link
                  href={item.href}
                  className={`focus-ring flex h-[4.5rem] flex-col items-center justify-center gap-1 ${active ? "text-green-800" : "text-ink-3"}`}
                  aria-current={active ? "page" : undefined}
                >
                  
                  <span className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-150 ${active ? "bg-green-100" : ""}`}>
                    <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} aria-hidden />
                  </span>
                  <span className="text-[0.8125rem] font-bold">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              className={`focus-ring flex h-[4.5rem] w-full flex-col items-center justify-center gap-1 ${searchOpen ? "text-green-800" : "text-ink-3"}`}
            >
              
              <span className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-150 ${searchOpen ? "bg-green-100" : ""}`}>
                <Search className="h-6 w-6" strokeWidth={searchOpen ? 2.5 : 2} aria-hidden />
              </span>
              <span className="text-[0.8125rem] font-bold">Szukaj</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
