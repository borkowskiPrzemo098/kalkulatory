import Link from "next/link";
import SearchBox from "./SearchBox";
import Logo from "./Logo";

const nav = [
  { href: "/kalkulatory", label: "Wszystkie kalkulatory" },
  { href: "/kategorie", label: "Kategorie" },
];

export default function Header() {
  return (
    <header className="relative z-40 border-b border-line bg-white md:sticky md:top-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="focus-ring shrink-0 rounded-xl" aria-label="Kalkulatory Online — strona główna">
          <Logo />
        </Link>

        <div className="ml-auto hidden w-full max-w-sm lg:block">
          <SearchBox compact id="calculator-search-desktop" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex lg:ml-0" aria-label="Nawigacja główna">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-xl px-4 py-2.5 text-[1rem] font-semibold text-ink-2 transition-colors duration-150 hover:bg-green-50 hover:text-green-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
