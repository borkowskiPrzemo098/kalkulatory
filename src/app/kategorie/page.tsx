import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kategorie kalkulatorów",
  description:
    "Przeglądaj darmowe kalkulatory online pogrupowane w kategorie: finanse, zdrowie, matematyka, dom, motoryzacja i więcej.",
  alternates: { canonical: "/kategorie" },
};

export default function KategoriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/kategorie", label: "Kategorie" }]} />

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Kategorie kalkulatorów
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        {calculators.length} kalkulatorów pogrupowanych w {categories.length} kategorii. Wybierz kategorię, aby
        zobaczyć wszystkie kalkulatory, które do niej należą.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const count = calculators.filter((c) => c.category === cat.slug).length;
          const Icon = categoryIcons[cat.slug];
          return (
            <Link
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="focus-ring flex flex-col rounded-xl border border-border bg-surface p-5 hover:border-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                {Icon && <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />}
              </span>
              <div className="mt-3 font-medium text-foreground">{cat.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{cat.description}</p>
              <div className="mt-3 text-xs font-medium text-muted-2">
                {count} {count === 1 ? "kalkulator" : "kalkulatorów"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
