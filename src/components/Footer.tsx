import Link from "next/link";
import { categories } from "@/lib/categories";
import { calculators } from "@/calculators/registry";
import Logo from "./Logo";

const legalLinks = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
  { href: "/regulamin", label: "Regulamin" },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 pb-20 text-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-[1.0625rem] leading-relaxed text-white/75">
            {calculators.length} darmowych kalkulatorów online. Bez konta, bez wysyłania danych — wszystko liczy się w
            Twojej przeglądarce.
          </p>
        </div>

        <div>
          <h2 className="text-[1.0625rem] font-extrabold text-sun">Kategorie</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[1rem] md:grid-cols-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategorie/${c.slug}`} className="focus-ring rounded text-white/85 hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[1.0625rem] font-extrabold text-sun">Informacje</h2>
          <ul className="mt-4 grid gap-3 text-[1rem]">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="focus-ring rounded text-white/85 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-1 px-4 py-5 text-[0.875rem] text-white/60 sm:grid-cols-[auto_1fr] sm:gap-6 sm:px-6">
          <span className="font-semibold text-white/80">© {new Date().getFullYear()} Kalkulatory Online</span>
          <span>Wyniki mają charakter orientacyjny i nie zastępują porady specjalisty (finansowej, prawnej ani medycznej).</span>
        </div>
      </div>
    </footer>
  );
}
