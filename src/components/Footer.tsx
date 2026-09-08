import Link from "next/link";
import { categories } from "@/lib/categories";

const legalLinks = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/regulamin", label: "Regulamin" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-contrast"
              aria-hidden
            >
              K
            </span>
            Kalkulatory Online
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Darmowe kalkulatory online do szybkich i prostych obliczeń — bez rejestracji,
            bez zbędnych kroków. Wszystkie obliczenia wykonywane są lokalnie w przeglądarce.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Kategorie</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/kategorie/${c.slug}`} className="focus-ring text-muted hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Informacje</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="focus-ring text-muted hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-2 sm:px-6">
          © {new Date().getFullYear()} Kalkulatory Online. Wyniki mają charakter orientacyjny i nie zastępują
          porady specjalisty (finansowej, prawnej ani medycznej).
        </div>
      </div>
    </footer>
  );
}
