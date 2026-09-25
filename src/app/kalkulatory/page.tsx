import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import CalculatorTiles from "@/components/CalculatorTiles";
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
    <div>
      <header className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-8">
          <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/kalkulatory", label: "Kalkulatory" }]} />
          <h1 className="display mt-5 text-[clamp(2rem,7vw,3.25rem)] text-ink">Wszystkie kalkulatory</h1>
          <p className="mt-2 text-[1.125rem] text-ink-2">
            {calculators.length} darmowych kalkulatorów w {groups.length} kategoriach.
          </p>
          <nav aria-label="Przejdź do kategorii" className="mt-6 flex flex-wrap gap-2">
            {groups.map(({ cat, items }) => {
              const Icon = categoryIcons[cat.slug];
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border-2 border-line bg-white px-4 text-[1rem] font-semibold text-ink transition-colors duration-150 hover:border-green-700 hover:text-green-800"
                >
                  {Icon && <Icon className="h-[18px] w-[18px] text-green-700" strokeWidth={2.25} aria-hidden />}
                  {cat.name}
                  <span className="rounded-full bg-green-100 px-2 text-[0.875rem] font-bold text-green-800">{items.length}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <AdPlaceholder />

        <div className="mt-12 space-y-14">
          {groups.map(({ cat, items }) => {
            const Icon = categoryIcons[cat.slug];
            return (
              <section key={cat.slug} id={cat.slug} aria-labelledby={`cat-${cat.slug}`} className="scroll-mt-24">
                <div className="flex items-center justify-between gap-4">
                  <h2 id={`cat-${cat.slug}`} className="flex items-center gap-3 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">
                    {Icon && (
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </span>
                    )}
                    {cat.name}
                  </h2>
                  <Link
                    href={`/kategorie/${cat.slug}`}
                    className="focus-ring group hidden items-center gap-1.5 rounded-lg text-[1rem] font-bold text-green-700 sm:flex"
                  >
                    Kategoria
                    <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
                  </Link>
                </div>
                <CalculatorTiles items={items} size="compact" className="mt-5" />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
