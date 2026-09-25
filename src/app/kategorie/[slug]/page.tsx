import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import { getCalculatorsByCategory } from "@/calculators/registry";
import CalculatorTiles from "@/components/CalculatorTiles";
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
    <div>
      <header className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8">
          <div className="[&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/50">
            <Breadcrumbs
              items={[
                { href: "/", label: "Start" },
                { href: "/kategorie", label: "Kategorie" },
                { href: `/kategorie/${category.slug}`, label: category.name },
              ]}
            />
          </div>
          <div className="mt-6 flex items-center gap-4">
            {Icon && (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sun text-green-950 sm:h-20 sm:w-20">
                <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} aria-hidden />
              </span>
            )}
            <div>
              <h1 className="display text-[clamp(2.1rem,8vw,3.5rem)]">{category.name}</h1>
              <p className="mt-1 text-[1.0625rem] font-semibold text-white/80">
                {items.length} {items.length === 1 ? "kalkulator" : "kalkulatorów"}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-snug text-white/85">{category.description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        {items.length > 0 ? (
          <CalculatorTiles items={items} />
        ) : (
          <p className="rounded-2xl bg-mist px-5 py-8 text-center text-[1.0625rem] text-ink-2">
            W tej kategorii nie ma jeszcze kalkulatorów — wkrótce się to zmieni.
          </p>
        )}
        <AdPlaceholder className="mt-12" />
      </div>
    </div>
  );
}
