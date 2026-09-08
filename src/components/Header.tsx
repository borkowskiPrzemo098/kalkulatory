import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="focus-ring flex shrink-0 items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-contrast"
            aria-hidden
          >
            K
          </span>
          <span className="hidden sm:inline">Kalkulatory Online</span>
        </Link>

        <div className="ml-auto hidden max-w-sm flex-1 sm:block">
          <SearchBox compact id="calculator-search-desktop" />
        </div>

        <nav className="flex items-center gap-1 text-sm" aria-label="Nawigacja główna">
          <Link
            href="/kalkulatory"
            className="focus-ring rounded-md px-3 py-2 font-medium text-foreground hover:bg-accent-soft hover:text-accent"
          >
            Wszystkie kalkulatory
          </Link>
        </nav>
      </div>
      <div className="border-t border-border px-4 py-2 sm:hidden">
        <SearchBox compact id="calculator-search-mobile" />
      </div>
    </header>
  );
}
