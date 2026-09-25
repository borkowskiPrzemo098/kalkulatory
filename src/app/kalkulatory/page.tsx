import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import PartsList from "@/components/PartsList";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "Wszystkie kalkulatory",
  description: "Pełna lista darmowych kalkulatorów online: finanse, zdrowie, matematyka, motoryzacja i więcej.",
  alternates: { canonical: "/kalkulatory" },
};

export default function KalkulatoryPage() {
  const groups = categories
    .map((cat) => ({ cat, items: calculators.filter((c) => c.category === cat.slug) }))
    .filter(({ items }) => items.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/kalkulatory", label: "Kalkulatory" }]} />

      <header className="mt-4 max-w-3xl">
        <h1 className="display text-[clamp(2rem,6vw,3.25rem)] text-ink">Wszystkie kalkulatory</h1>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-2">
          {calculators.length} darmowych kalkulatorów w {groups.length} kategoriach. Każdy ma własny numer rysunku,
          wzór i przykład.
        </p>
      </header>

      {/* Spis arkuszy: skok do kategorii */}
      <nav aria-label="Spis kategorii" className="mt-8 flex flex-wrap gap-2">
        {groups.map(({ cat, items }) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className="focus-ring inline-flex items-center gap-2 border border-hair-strong bg-paper px-3 py-2 text-[0.9rem] font-semibold text-ink transition-colors duration-150 hover:border-green hover:text-green"
          >
            {cat.name}
            <span className="caps text-[0.7rem] text-ink-3">{items.length}</span>
          </a>
        ))}
      </nav>

      <AdPlaceholder className="mt-8" />

      <div className="mt-12 space-y-14">
        {groups.map(({ cat, items }) => {
          const Icon = categoryIcons[cat.slug];
          return (
            <section key={cat.slug} id={cat.slug} aria-labelledby={`cat-${cat.slug}`} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 pb-3">
                <h2 id={`cat-${cat.slug}`} className="condensed flex items-center gap-3 text-[1.6rem] font-bold text-ink">
                  {Icon && <Icon className="h-6 w-6 text-green" strokeWidth={1.75} aria-hidden />}
                  {cat.name}
                </h2>
                <Link href={`/kategorie/${cat.slug}`} className="focus-ring caps pb-1.5 text-[0.7rem] text-green hover:underline">
                  Strona kategorii
                </Link>
              </div>
              <PartsList items={items} showCategory={false} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
