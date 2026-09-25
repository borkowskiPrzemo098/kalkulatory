import Link from "next/link";
import { CalculatorConfig } from "@/calculators/types";
import { getCalculatorIcon } from "@/lib/calculator-icons";

/**
 * Duże klikalne kafle kalkulatorów: ikona + nazwa, bez opisów (mało tekstu).
 * `size="compact"` — mniejsze kafle do długich list (wszystkie kalkulatory, powiązane).
 */
export default function CalculatorTiles({
  items,
  size = "large",
  className = "",
  columns,
}: {
  items: CalculatorConfig[];
  size?: "large" | "compact";
  className?: string;
  /** Nadpisuje domyślną siatkę kolumn (np. jedna kolumna w bocznym panelu). */
  columns?: string;
}) {
  const large = size === "large";
  return (
    <ul
      className={`grid gap-3 sm:gap-4 ${
        columns ?? (large ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3")
      } ${className}`}
    >
      {items.map((c) => {
        const Icon = getCalculatorIcon(c.slug, c.category);
        return (
          <li key={c.slug} className="min-w-0">
            <Link
              href={`/kalkulatory/${c.slug}`}
              className={`tile focus-ring group flex h-full ${
                large ? "flex-col gap-4 p-4 sm:p-5" : "items-center gap-4 p-3.5"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-2xl transition-colors duration-200 ${
                  large
                    ? "h-14 w-14 bg-green-700 text-white group-hover:bg-green-800"
                    : "h-12 w-12 bg-green-100 text-green-700 group-hover:bg-green-700 group-hover:text-white"
                }`}
              >
                <Icon className={large ? "h-7 w-7" : "h-6 w-6"} strokeWidth={2} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className={`block font-bold leading-tight text-ink ${large ? "text-[1.125rem] sm:text-[1.25rem]" : "text-[1.0625rem]"}`}>
                  {c.name}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
