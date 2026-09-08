import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/calculators/registry";
import CalculatorCard from "@/components/CalculatorCard";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Strona główna" },
          { href: "/kalkulatory", label: "Kalkulatory" },
          { href: `/kategorie/${category.slug}`, label: category.name },
        ]}
      />

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{category.description}</p>

      <AdPlaceholder className="mt-6" />

      {items.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CalculatorCard key={c.slug} config={c} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-border-strong px-4 py-6 text-sm text-muted">
          W tej kategorii nie ma jeszcze żadnych kalkulatorów — wkrótce się to zmieni.
        </p>
      )}
    </div>
  );
}
