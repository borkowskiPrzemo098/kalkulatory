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

/** Kategorie jako duże kafle z ikoną i liczbą kalkulatorów. */
export default function CategoryGrid({ withDescriptions = false }: { withDescriptions?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {categories.map((cat, i) => {
        const count = calculators.filter((c) => c.category === cat.slug).length;
        const Icon = categoryIcons[cat.slug];
        return (
          <li
            key={cat.slug}
            className={`min-w-0 ${categories.length % 2 === 1 && i === categories.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <Link
              href={`/kategorie/${cat.slug}`}
              className="tile focus-ring group flex h-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16">
                {Icon && <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} aria-hidden />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.125rem] font-bold leading-tight text-ink sm:text-[1.25rem]">{cat.name}</span>
                <span className="mt-1.5 inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-[0.875rem] font-semibold text-green-800">
                  {countLabel(count)}
                </span>
                {withDescriptions && (
                  <span className="mt-2 hidden text-[0.9375rem] leading-snug text-ink-3 sm:block">{cat.description}</span>
                )}
              </span>
              <ArrowRight
                aria-hidden
                className="hidden h-5 w-5 shrink-0 text-green-700 transition-transform duration-200 group-hover:translate-x-1 sm:block"
                strokeWidth={2.25}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
