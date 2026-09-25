import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalculatorConfig } from "@/calculators/types";
import { getDrawingNumber } from "@/calculators/registry";
import { getCategoryBySlug } from "@/lib/categories";

/**
 * Wykaz części: kalkulatory jako wiersze tabeli rysunkowej (nr, nazwa z opisem, kategoria),
 * zamiast siatki jednakowych kart.
 */
export default function PartsList({
  items,
  showCategory = true,
  compact = false,
}: {
  items: CalculatorConfig[];
  showCategory?: boolean;
  compact?: boolean;
}) {
  return (
    <ul className="border-t-[1.5px] border-frame">
      {items.map((c) => {
        const category = getCategoryBySlug(c.category);
        return (
          <li key={c.slug} className="border-b border-hair">
            <Link
              href={`/kalkulatory/${c.slug}`}
              className={`focus-ring group grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 transition-colors duration-150 hover:bg-green-tint sm:gap-x-5 ${
                compact ? "px-1 py-3" : "px-1 py-4 sm:px-3"
              } ${showCategory ? "md:grid-cols-[4.5rem_minmax(0,1fr)_9rem_auto]" : ""}`}
            >
              <span className="caps text-[0.72rem] text-ink-3 group-hover:text-green">{getDrawingNumber(c.slug)}</span>
              <span className="min-w-0">
                <span className={`block font-semibold text-ink group-hover:text-green ${compact ? "text-[0.98rem]" : "text-[1.06rem]"}`}>
                  {c.name}
                </span>
                {!compact && <span className="mt-1 block text-[0.9rem] leading-snug text-ink-2">{c.shortDescription}</span>}
              </span>
              {showCategory && (
                <span className="caps hidden text-[0.7rem] text-ink-3 md:block">{category?.name}</span>
              )}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 self-center text-green transition-transform duration-200 ease-out group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
