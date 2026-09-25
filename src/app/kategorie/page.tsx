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
    <div>
      <header className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-8">
          <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/kategorie", label: "Kategorie" }]} />
          <h1 className="display mt-5 text-[clamp(2rem,7vw,3.25rem)] text-ink">Kategorie kalkulatorów</h1>
          <p className="mt-2 text-[1.125rem] text-ink-2">
            {calculators.length} kalkulatorów w {categories.length} kategoriach. Wybierz, co chcesz policzyć.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <CategoryGrid withDescriptions />
      </div>
    </div>
  );
}
