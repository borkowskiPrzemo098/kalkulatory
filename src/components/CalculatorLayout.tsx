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
    url: `https://borkowskiprzemo098.github.io/kalkulatory/kalkulatory/${config.slug}`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Start" },
          { href: "/kalkulatory", label: "Kalkulatory" },
          ...(category ? [{ href: `/kategorie/${category.slug}`, label: category.name }] : []),
          { href: `/kalkulatory/${config.slug}`, label: config.shortName ?? config.name },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="display text-[clamp(1.9rem,6vw,3.1rem)] text-ink">{config.name}</h1>
        <p className="mt-2.5 text-[1.02rem] leading-relaxed text-ink-2 sm:text-[1.1rem]">{config.shortDescription}</p>
      </header>

      {/* Reklama pod nagłówkiem tylko od tabletu — na telefonie nie może spychać wyniku w dół. */}
      <AdPlaceholder label="Reklama" className="mt-6 hidden md:flex" />

      <div className="-mx-4 mt-6 sm:mx-0 sm:mt-8">
        <CalculatorForm slug={config.slug} />
      </div>

      <p className="mt-3 text-[0.8rem] leading-snug text-ink-3">
        Wynik ma charakter orientacyjny i nie stanowi porady finansowej, medycznej ani prawnej.
      </p>

      <AdPlaceholder label="Reklama" className="mt-10" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <article className="min-w-0 space-y-12">
          <p className="max-w-[68ch] text-[1.08rem] leading-[1.7] text-ink">{config.intro}</p>
          <CalculatorExplanation config={config} />
          <AdPlaceholder label="Reklama" />
          <CalculatorFAQ items={config.faq} calculatorName={config.name} />
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RelatedCalculators items={related} />
        </aside>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
    </div>
  );
}
