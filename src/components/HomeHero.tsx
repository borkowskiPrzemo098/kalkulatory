"use client";

import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export default function HomeHero({ calculatorCount }: { calculatorCount: number }) {
  const count = useCountUp(calculatorCount);

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 70% 20%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 70% 20%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "color-mix(in srgb, var(--accent) 14%, transparent)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-border-strong bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
            {calculatorCount} darmowych kalkulatorów
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Kalkulatory online
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Darmowe kalkulatory do szybkich i prostych obliczeń. Bez rejestracji, bez zbędnych kroków —
            wpisujesz liczby, dostajesz wynik.
          </p>
          <div className="mt-8 max-w-md">
            <SearchBox autoFocus />
          </div>
        </div>

        <div className="relative hidden lg:block" aria-hidden>
          <div className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-2">
              <span>Kalkulator VAT</span>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">na żywo</span>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm">
                <span className="text-muted">Kwota netto</span>
                <span className="font-medium text-foreground">1 000,00 zł</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm">
                <span className="text-muted">Stawka VAT</span>
                <span className="font-medium text-foreground">23%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm">
                <span className="font-medium text-accent">Kwota brutto</span>
                <span className="font-display text-lg font-semibold text-accent">1 230,00 zł</span>
              </div>
            </div>
            <div className="mt-6 flex items-baseline gap-2 border-t border-border pt-5">
              <span className="font-display text-3xl font-semibold text-foreground">{count}</span>
              <span className="text-sm text-muted">gotowych kalkulatorów w serwisie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
