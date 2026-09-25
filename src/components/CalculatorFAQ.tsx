import { Plus } from "lucide-react";
import { FaqItem } from "@/calculators/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t-[1.5px] border-frame">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-hair">
          <summary className="focus-ring flex cursor-pointer items-start justify-between gap-4 py-4 text-[1.02rem] font-semibold text-ink hover:text-green">
            <span>{item.q}</span>
            <Plus
              aria-hidden
              className="faq-plus mt-0.5 h-5 w-5 shrink-0 text-green transition-transform duration-200 ease-out"
              strokeWidth={1.75}
            />
          </summary>
          <p className="max-w-[68ch] pb-5 text-[0.98rem] leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export default function CalculatorFAQ({ items }: { items: FaqItem[]; calculatorName?: string }) {
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
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="condensed text-[1.35rem] font-bold tracking-[-0.01em] text-ink">
        Najczęściej zadawane pytania
      </h2>
      <div className="mt-4">
        <FaqList items={items} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
