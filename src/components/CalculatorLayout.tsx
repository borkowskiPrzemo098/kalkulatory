import { CalculatorConfig } from "@/calculators/types";
import { getCategoryBySlug } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import { getRelatedCalculators } from "@/calculators/registry";
import Breadcrumbs from "./Breadcrumbs";
import CalculatorForm from "./CalculatorForm";
import CalculatorExplanation from "./CalculatorExplanation";
import CalculatorFAQ from "./CalculatorFAQ";
import RelatedCalculators from "./RelatedCalculators";
import AdPlaceholder from "./AdPlaceholder";
import ThemedBanner from "./ThemedBanner";

export default function CalculatorLayout({ config }: { config: CalculatorConfig }) {
  const category = getCategoryBySlug(config.category);
  const related = getRelatedCalculators(config);
  const CategoryIcon = categoryIcons[config.category];

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.name,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: config.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PLN",
    },
    url: `https://borkowskiprzemo098.github.io/kalkulatory/kalkulatory/${config.slug}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { href: "/", label: "Strona główna" },
          { href: "/kalkulatory", label: "Kalkulatory" },
          ...(category ? [{ href: `/kategorie/${category.slug}`, label: category.name }] : []),
          { href: `/kalkulatory/${config.slug}`, label: config.shortName ?? config.name },
        ]}
      />

      <div className="mt-4 flex items-start gap-3">
        {CategoryIcon && (
          <span
            aria-hidden
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"
          >
            <CategoryIcon className="h-5.5 w-5.5" strokeWidth={1.75} />
          </span>
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {config.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{config.shortDescription}</p>
        </div>
      </div>

      <AdPlaceholder label="Reklama" className="mt-6" />

      <div className="mt-8">
        <CalculatorForm slug={config.slug} />
      </div>

      <p className="mt-4 text-xs text-muted-2">
        Wynik ma charakter orientacyjny i nie stanowi porady finansowej, medycznej ani prawnej.
      </p>

      {category && CategoryIcon && (
        <ThemedBanner
          className="mt-10"
          icon={CategoryIcon}
          href={`/kategorie/${category.slug}`}
          eyebrow={category.name}
          title={`Więcej kalkulatorów z kategorii ${category.name}`}
          text={category.description}
        />
      )}

      <article className="prose-config">
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground">{config.intro}</p>
        <CalculatorExplanation config={config} />
      </article>

      <AdPlaceholder label="Reklama" className="mt-10" />

      <CalculatorFAQ items={config.faq} calculatorName={config.name} />

      <div className="mt-12">
        <RelatedCalculators items={related} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
    </div>
  );
}
