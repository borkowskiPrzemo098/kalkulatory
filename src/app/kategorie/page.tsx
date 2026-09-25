import type { Metadata } from "next";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "Kategorie kalkulatorów",
  description:
    "Przeglądaj darmowe kalkulatory online pogrupowane w kategorie: finanse, zdrowie, matematyka, dom, motoryzacja i więcej.",
  alternates: { canonical: "/kategorie" },
};

export default function KategoriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/kategorie", label: "Kategorie" }]} />

      <header className="mt-4 max-w-3xl">
        <h1 className="display text-[clamp(2rem,6vw,3.25rem)] text-ink">Kategorie kalkulatorów</h1>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-2">
          {calculators.length} kalkulatorów w {categories.length} kategoriach. Wybierz dziedzinę, żeby zobaczyć
          wszystkie narzędzia, które do niej należą.
        </p>
      </header>

      <div className="mt-10">
        <CategoryGrid withDescriptions />
      </div>
    </div>
  );
}
