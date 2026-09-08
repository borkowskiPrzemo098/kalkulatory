import Link from "next/link";
import { CalculatorConfig } from "@/calculators/types";

export default function CalculatorCard({ config }: { config: CalculatorConfig }) {
  return (
    <Link
      href={`/kalkulatory/${config.slug}`}
      className="focus-ring group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
        {config.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{config.shortDescription}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
        Oblicz
        <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
