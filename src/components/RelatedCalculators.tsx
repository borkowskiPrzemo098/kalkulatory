import { CalculatorConfig } from "@/calculators/types";
import PartsList from "./PartsList";

export default function RelatedCalculators({ items }: { items: CalculatorConfig[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="caps mb-3 text-[0.72rem] text-ink-2">
        Powiązane kalkulatory
      </h2>
      <PartsList items={items} showCategory={false} compact />
    </section>
  );
}
