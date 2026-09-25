import Link from "next/link";
import SearchBox from "./SearchBox";
import Logo from "./Logo";

const nav = [
  { href: "/kalkulatory", label: "Kalkulatory" },
  { href: "/kategorie", label: "Kategorie" },
];

export default function Header() {
  return (
    <header className="relative z-40 border-b-[1.5px] md:sticky md:top-0 border-frame bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="focus-ring shrink-0" aria-label="Kalkulatory Online — strona główna">
          <Logo />
        </Link>

        <div className="ml-auto hidden w-full max-w-sm sm:block">
          <SearchBox compact id="calculator-search-desktop" />
        </div>

        <nav className="hidden items-center md:flex" aria-label="Nawigacja główna">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring caps flex h-16 items-center border-l border-hair px-4 text-[0.72rem] text-ink-2 transition-colors duration-150 hover:bg-green-tint hover:text-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
