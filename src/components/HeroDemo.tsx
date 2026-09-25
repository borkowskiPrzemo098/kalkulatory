"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Percent } from "lucide-react";
import { formatNumber, parseLocaleNumber } from "@/lib/format";
import { fieldControl, fieldFrame } from "./CalculatorInput";

/** Działający mini-kalkulator na stronie głównej: „ile to jest X% z Y”. */
export default function HeroDemo() {
  const [pct, setPct] = useState("15");
  const [base, setBase] = useState("250");

  const p = parseLocaleNumber(pct);
  const b = parseLocaleNumber(base);
  const valid = Number.isFinite(p) && Number.isFinite(b);
  const value = valid ? formatNumber((p / 100) * b, 2) : "—";

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[var(--shadow-float)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <Percent className="h-6 w-6" strokeWidth={2.25} aria-hidden />
        </span>
        <p className="text-[1.125rem] font-bold text-ink">Ile to jest procent z liczby?</p>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.3fr)] items-end gap-2.5">
        <div>
          <label htmlFor="hero-pct" className="mb-1.5 block text-[0.9375rem] font-semibold text-ink-2">
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
            <span aria-hidden className="flex items-center pr-3.5 text-[1.125rem] font-bold text-green-700">
              %
            </span>
          </div>
        </div>
        <span className="pb-4 text-[1rem] font-semibold text-ink-3">z</span>
        <div>
          <label htmlFor="hero-base" className="mb-1.5 block text-[0.9375rem] font-semibold text-ink-2">
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
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-green-700 px-5 py-4 text-white" aria-live="polite">
        <p className="text-[0.9375rem] font-semibold text-white/80">Wynik</p>
        <p key={value} className="result-pop display mt-0.5 text-[clamp(2.4rem,9vw,3.25rem)]">
          {value}
        </p>
      </div>

      <Link
        href="/kalkulatory/procenty"
        className="focus-ring group mt-3 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-[1rem] font-bold text-green-800 transition-colors duration-150 hover:bg-green-100"
      >
        Otwórz pełny kalkulator procentów
        <ArrowRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.25} />
      </Link>
    </div>
  );
}
