import Link from "next/link";
import { CalculatorConfig } from "@/calculators/types";

export default function RelatedCalculators({ items }: { items: CalculatorConfig[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-4">
      <h2 id="related-heading" className="font-display text-xl font-semibold text-foreground">
        Powiązane kalkulatory
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/kalkulatory/${c.slug}`}
              className="focus-ring flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground hover:border-accent hover:text-accent"
            >
              {c.name}
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
