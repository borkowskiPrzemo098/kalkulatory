"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatNumber, parseLocaleNumber } from "@/lib/format";
import { fieldControl, fieldFrame } from "./CalculatorInput";
import DimensionLine from "./DimensionLine";

/** Działający mini-arkusz na stronie głównej: „ile to jest X% z Y”. */
export default function HeroDemo() {
  const [pct, setPct] = useState("15");
  const [base, setBase] = useState("250");

  const p = parseLocaleNumber(pct);
  const b = parseLocaleNumber(base);
  const valid = Number.isFinite(p) && Number.isFinite(b);
  const value = valid ? formatNumber((p / 100) * b, 2) : "—";

  return (
    <div className="border-[1.5px] border-frame bg-paper">
      <div className="flex items-center justify-between border-b border-hair-strong px-4 py-2.5">
        <p className="caps text-[0.7rem] text-ink-2">Ile to jest procent z liczby?</p>
        <p className="caps text-[0.7rem] text-ink-3">KO-001</p>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] items-end gap-3 px-4 pt-4">
        <div>
          <label htmlFor="hero-pct" className="caps mb-1.5 block text-[0.7rem] text-ink-2">
            Procent
          </label>
          <div className={fieldFrame}>
            <input
              id="hero-pct"
              inputMode="decimal"
              autoComplete="off"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              className={fieldControl}
            />
            <span aria-hidden className="caps flex items-center border-l border-hair px-2.5 text-[0.72rem] text-green">
              %
            </span>
          </div>
          <DimensionLine animKey={pct} className="mt-1.5" />
        </div>
        <span className="caps pb-8 text-[0.7rem] text-ink-3">z</span>
        <div>
          <label htmlFor="hero-base" className="caps mb-1.5 block text-[0.7rem] text-ink-2">
            Liczby
          </label>
          <div className={fieldFrame}>
            <input
              id="hero-base"
              inputMode="decimal"
              autoComplete="off"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className={fieldControl}
            />
          </div>
          <DimensionLine animKey={base} className="mt-1.5" />
        </div>
      </div>
      <div className="px-4 pb-4 pt-5" aria-live="polite">
        <p className="caps text-[0.7rem] text-ink-3">Wynik</p>
        <p className="display mt-1 text-[clamp(2.4rem,9vw,3.4rem)] text-green">{value}</p>
        <DimensionLine animKey={value} className="mt-2" />
      </div>
      <Link
        href="/kalkulatory/procenty"
        className="focus-ring group flex items-center justify-between border-t-[1.5px] border-frame px-4 py-3 text-[1rem] font-semibold text-green transition-colors duration-150 hover:bg-green-tint hover:text-green-deep"
      >
        Pełny kalkulator procentów
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={2} />
      </Link>
    </div>
  );
}
