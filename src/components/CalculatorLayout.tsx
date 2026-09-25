import { createElement } from "react";
import { CalculatorConfig } from "@/calculators/types";
import { getCategoryBySlug } from "@/lib/categories";
import { getCalculatorIcon } from "@/lib/calculator-icons";
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
    <div>
      <header className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-8">
          <Breadcrumbs
            items={[
              { href: "/", label: "Start" },
              ...(category ? [{ href: `/kategorie/${category.slug}`, label: category.name }] : []),
              { href: `/kalkulatory/${config.slug}`, label: config.shortName ?? config.name },
            ]}
          />
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white sm:h-16 sm:w-16">
              {createElement(getCalculatorIcon(config.slug, config.category), {
                className: "h-7 w-7 sm:h-8 sm:w-8",
                strokeWidth: 2,
                "aria-hidden": true,
              })}
            </span>
            <div className="min-w-0">
              <h1 className="display text-[clamp(1.9rem,7vw,3rem)] text-ink">{config.name}</h1>
              <p className="mt-2 max-w-[60ch] text-[1.0625rem] leading-snug text-ink-2 sm:text-[1.25rem]">{config.shortDescription}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <CalculatorForm slug={config.slug} />

        <p className="mt-4 text-[0.9375rem] leading-snug text-ink-3">
          Wynik ma charakter orientacyjny i nie stanowi porady finansowej, medycznej ani prawnej.
        </p>

        <AdPlaceholder label="Reklama" className="mt-10" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
          <article className="min-w-0 space-y-12">
            <p className="max-w-[68ch] text-[1.125rem] leading-[1.7] text-ink">{config.intro}</p>
            <CalculatorExplanation config={config} />
            <AdPlaceholder label="Reklama" />
            <CalculatorFAQ items={config.faq} calculatorName={config.name} />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <RelatedCalculators items={related} />
          </aside>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
    </div>
  );
}
