import { HelpCircle, Plus } from "lucide-react";
import { FaqItem } from "@/calculators/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl border-2 border-line bg-white open:border-green-200 open:bg-green-50">
          <summary className="focus-ring flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[1.0625rem] font-bold text-ink">
            <span>{item.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Plus aria-hidden className="faq-plus h-5 w-5 transition-transform duration-200 ease-out" strokeWidth={2.5} />
            </span>
          </summary>
          <p className="max-w-[68ch] px-5 pb-5 text-[1.0625rem] leading-relaxed text-ink-2">{item.a}</p>
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
      <h2 id="faq-heading" className="flex items-center gap-3 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <HelpCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </span>
        Najczęściej zadawane pytania
      </h2>
      <div className="mt-5">
        <FaqList items={items} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
