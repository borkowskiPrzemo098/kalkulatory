import { CalculatorConfig } from "@/calculators/types";
import { getCategoryBySlug } from "@/lib/categories";
import { getRelatedCalculators } from "@/calculators/registry";
import Breadcrumbs from "./Breadcrumbs";
import CalculatorForm from "./CalculatorForm";
import CalculatorExplanation from "./CalculatorExplanation";
import CalculatorFAQ from "./CalculatorFAQ";
import RelatedCalculators from "./RelatedCalculators";
import AdPlaceholder from "./AdPlaceholder";

export default function CalculatorLayout({ config }: { config: CalculatorConfig }) {
  const category = getCategoryBySlug(config.category);
  const related = getRelatedCalculators(config);

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
    url: `https://kalkulatory-online.example/kalkulatory/${config.slug}`,
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

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {config.name}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{config.shortDescription}</p>

      <AdPlaceholder label="Reklama" className="mt-6" />

      <div className="mt-8">
        <CalculatorForm slug={config.slug} />
      </div>

      <p className="mt-4 text-xs text-muted-2">
        Wynik ma charakter orientacyjny i nie stanowi porady finansowej, medycznej ani prawnej.
      </p>

      <AdPlaceholder label="Reklama" className="mt-10" />

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
