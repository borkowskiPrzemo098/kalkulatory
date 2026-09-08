"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, Search, LayoutGrid } from "lucide-react";

const items = [
  { href: "/", label: "Strona główna", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/kalkulatory",
    label: "Kalkulatory",
    icon: Calculator,
    match: (p: string) => p.startsWith("/kalkulatory"),
  },
  {
    href: "/kategorie/finanse",
    label: "Kategorie",
    icon: LayoutGrid,
    match: (p: string) => p.startsWith("/kategorie"),
  },
];

function focusSearch() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => {
    document.getElementById("calculator-search")?.focus();
  }, 300);
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Nawigacja mobilna"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const active = item.match(pathname ?? "");
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`focus-ring flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  active ? "text-accent" : "text-muted"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden
                />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={focusSearch}
            className="focus-ring flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted"
          >
            <Search className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            Szukaj
          </button>
        </li>
      </ul>
    </nav>
  );
}
