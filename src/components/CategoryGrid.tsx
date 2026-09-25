import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";

function countLabel(n: number) {
  if (n === 1) return "1 kalkulator";
  const lastTwo = n % 100;
  const last = n % 10;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} kalkulatory`;
  return `${n} kalkulatorów`;
}

/**
 * Spis arkuszy: kategorie jako wiersze tej samej siatki etykiet co wykaz kalkulatorów
 * (strefa | nazwa i liczba | przykładowe arkusze | strzałka).
 */
export default function CategoryGrid({ withDescriptions = false }: { withDescriptions?: boolean }) {
  return (
    <ul className="border-t-[1.5px] border-frame">
      {categories.map((cat, i) => {
        const items = calculators.filter((c) => c.category === cat.slug);
        const Icon = categoryIcons[cat.slug];
        const zone = `${"ABC"[Math.floor(i / 3)]}${(i % 3) + 1}`;
        const samples = items.slice(0, 3).map((c) => c.shortName ?? c.name.replace(/^Kalkulator\s+/i, ""));
        return (
          <li key={cat.slug} className="border-b border-hair">
            <Link
              href={`/kategorie/${cat.slug}`}
              className="focus-ring group grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-1 py-4 transition-colors duration-150 hover:bg-green-tint sm:gap-x-5 sm:px-3 md:grid-cols-[4.5rem_minmax(0,16rem)_minmax(0,1fr)_auto]"
            >
              <span className="caps flex items-center gap-2 text-[0.72rem] text-ink-3">
                {Icon && <Icon className="h-4 w-4 translate-y-[1px] text-green" strokeWidth={1.75} aria-hidden />}
                {zone}
              </span>
              <span className="min-w-0">
                <span className="block text-[1.1rem] font-bold text-ink group-hover:text-green">{cat.name}</span>
                <span className="caps mt-1 block text-[0.7rem] text-ink-3">{countLabel(items.length)}</span>
                <span className="mt-1.5 block text-[0.88rem] leading-snug text-ink-2 md:hidden">{samples.join(" · ")}</span>
              </span>
              <span className="hidden min-w-0 md:block">
                <span className="block text-[0.95rem] leading-snug text-ink-2">{samples.join(" · ")}</span>
                {withDescriptions && (
                  <span className="mt-1 block text-[0.88rem] leading-snug text-ink-3">{cat.description}</span>
                )}
              </span>
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
