import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import CalculatorCard from "@/components/CalculatorCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";

export const metadata: Metadata = {
  title: "Wszystkie kalkulatory",
  description: "Pełna lista darmowych kalkulatorów online: finanse, zdrowie, matematyka, motoryzacja i więcej.",
  alternates: { canonical: "/kalkulatory" },
};

export default function KalkulatoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/kalkulatory", label: "Kalkulatory" }]} />

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Wszystkie kalkulatory
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        {calculators.length} darmowych kalkulatorów online, pogrupowanych w kategorie. Wybierz kalkulator, który Cię
        interesuje.
      </p>

      <AdPlaceholder className="mt-6" />

      <div className="mt-10 space-y-12">
        {categories
          .map((cat) => ({ cat, items: calculators.filter((c) => c.category === cat.slug) }))
          .filter(({ items }) => items.length > 0)
          .map(({ cat, items }) => (
            <section key={cat.slug} aria-labelledby={`cat-${cat.slug}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`cat-${cat.slug}`} className="font-display text-xl font-semibold text-foreground">
                  {cat.name}
                </h2>
                <Link href={`/kategorie/${cat.slug}`} className="focus-ring text-sm font-medium text-accent">
                  Zobacz kategorię →
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <CalculatorCard key={c.slug} config={c} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
