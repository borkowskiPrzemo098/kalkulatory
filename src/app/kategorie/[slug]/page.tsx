import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import { getCalculatorsByCategory } from "@/calculators/registry";
import PartsList from "@/components/PartsList";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `Kalkulatory: ${category.name}`,
    description: category.description,
    alternates: { canonical: `/kategorie/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getCalculatorsByCategory(category.slug);
  const Icon = categoryIcons[category.slug];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Start" },
          { href: "/kategorie", label: "Kategorie" },
          { href: `/kategorie/${category.slug}`, label: category.name },
        ]}
      />

      <header className="mt-4 flex max-w-3xl items-start gap-4">
        {Icon && (
          <span aria-hidden className="mt-1 hidden h-14 w-14 shrink-0 items-center justify-center border-[1.5px] border-frame bg-paper text-green sm:flex">
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </span>
        )}
        <div>
          <h1 className="display text-[clamp(2rem,6vw,3.25rem)] text-ink">{category.name}</h1>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-2">{category.description}</p>
        </div>
      </header>

      <div className="mt-10">
        {items.length > 0 ? (
          <PartsList items={items} showCategory={false} />
        ) : (
          <p className="hatch border border-hair-strong px-4 py-8 text-center">
            <span className="bg-table px-2 text-[1rem] text-ink-2">
              W tej kategorii nie ma jeszcze kalkulatorów — wkrótce się to zmieni.
            </span>
          </p>
        )}
      </div>

      <AdPlaceholder className="mt-12" />
    </div>
  );
}
