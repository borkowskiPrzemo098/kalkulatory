import { FaqItem } from "@/calculators/types";

export default function CalculatorFAQ({ items, calculatorName }: { items: FaqItem[]; calculatorName: string }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      <h2 id="faq-heading" className="font-display text-xl font-semibold text-foreground">
        Najczęstsze pytania — {calculatorName.toLowerCase()}
      </h2>
      <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item) => (
          <div key={item.q} className="px-5 py-4">
            <dt className="font-medium text-foreground">{item.q}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
