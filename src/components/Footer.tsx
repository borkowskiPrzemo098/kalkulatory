import Link from "next/link";
import { categories } from "@/lib/categories";
import { calculators } from "@/calculators/registry";
import Logo from "./Logo";
import Sheet from "./Sheet";

const legalLinks = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/regulamin", label: "Regulamin" },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="caps text-[0.7rem] text-white/60">{children}</h2>;
}

/** Stopka jako odwrócony arkusz: białe linie na zieleni butelkowej. */
export default function Footer() {
  return (
    <footer className="mt-8 bg-green-night pb-20 pt-6 text-white sm:pt-10 md:pb-10">
      <div className="mx-auto max-w-6xl sm:px-6">
        <Sheet inverted>
        <div className="grid px-5 py-10 sm:px-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="pb-10 sm:px-6 md:pb-0">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
              {calculators.length} darmowych kalkulatorów. Każde obliczenie dzieje się w Twojej przeglądarce — bez
              konta i bez wysyłania danych.
            </p>
          </div>

          <div className="border-t border-white/25 py-8 sm:px-6 md:border-l md:border-t-0 md:py-0">
            <ColumnTitle>Kategorie</ColumnTitle>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.95rem] md:grid-cols-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/kategorie/${c.slug}`} className="focus-ring text-white/85 hover:text-white hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/25 py-8 sm:px-6 md:border-l md:border-t-0 md:py-0">
            <ColumnTitle>Informacje</ColumnTitle>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="focus-ring text-white/85 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-2 border-t-[1.5px] border-white/80 px-5 py-3 text-[0.8rem] text-white/75 sm:grid-cols-[auto_1fr] sm:gap-6 sm:px-6">
          <span className="caps text-white/90">© {new Date().getFullYear()} Kalkulatory Online</span>
          <span>Wyniki mają charakter orientacyjny i nie zastępują porady specjalisty (finansowej, prawnej ani medycznej).</span>
        </div>
        </Sheet>
      </div>
    </footer>
  );
}
