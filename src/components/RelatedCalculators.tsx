import { CalculatorConfig } from "@/calculators/types";
import CalculatorTiles from "./CalculatorTiles";

export default function RelatedCalculators({ items }: { items: CalculatorConfig[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">
        Powiązane kalkulatory
      </h2>
      <CalculatorTiles items={items} size="compact" className="mt-5" columns="grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-1" />
    </section>
  );
}
