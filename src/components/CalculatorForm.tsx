"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, ShieldCheck } from "lucide-react";
import { CalculatorConfig } from "@/calculators/types";
import { getCalculatorBySlug } from "@/calculators/registry";
import CalculatorInput from "./CalculatorInput";
import CalculatorSelect from "./CalculatorSelect";
import CalculatorResult from "./CalculatorResult";
import { trackEvent } from "@/lib/analytics";

function buildDefaultValues(config: CalculatorConfig): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of config.fields) {
    values[field.id] = field.defaultValue ?? "";
  }
  return values;
}

function isFieldVisible(field: CalculatorConfig["fields"][number], values: Record<string, string>): boolean {
  if (!field.dependsOn) return true;
  return values[field.dependsOn.field] === field.dependsOn.value;
}

export default function CalculatorForm({ slug }: { slug: string }) {
  const config = getCalculatorBySlug(slug) as CalculatorConfig;
  const storageKey = `kalkulator:${config.slug}`;
  const [values, setValues] = useState<Record<string, string>>(() => buildDefaultValues(config));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    trackEvent("calculator_view", { calculator: config.slug });
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, string>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- jednorazowe odczytanie zapisanych wartości z localStorage po zamontowaniu komponentu (dane nie są dostępne podczas renderowania na serwerze).
        setValues((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // localStorage niedostępny (np. tryb prywatny) — pomiń zapamiętywanie.
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.slug]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // Ignorowane — brak dostępu do localStorage nie powinien przerywać działania kalkulatora.
    }
  }, [values, hydrated, storageKey]);

  const outcome = useMemo(() => {
    const result = config.calculate(values);
    if (result.results.length > 0) {
      trackEvent("calculation_performed", { calculator: config.slug });
    }
    return result;
  }, [values, config]);

  function handleFieldChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  function handleClear() {
    setValues(buildDefaultValues(config));
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }

  const visibleFields = config.fields.filter((f) => isFieldVisible(f, values));

  return (
    <section aria-labelledby="calc-title" className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-6">
      <h2 id="calc-title" className="sr-only">
        {config.name} — dane i wynik
      </h2>

      {/* Na telefonie wynik stoi nad polami: klawiatura go nie zasłania. */}
      <div className="order-1 rounded-3xl bg-green-700 p-5 text-white shadow-[var(--shadow-float)] sm:p-7 md:order-2 md:sticky md:top-24">
        <CalculatorResult results={outcome.results} error={outcome.error} />
        <p className="mt-5 flex items-center gap-2 border-t border-white/15 pt-4 text-[0.9375rem] text-white/80">
          <ShieldCheck className="h-5 w-5 shrink-0 text-sun" strokeWidth={2.25} aria-hidden />
          Liczone w Twojej przeglądarce — nic nie wysyłamy.
        </p>
      </div>

      <div className="tile order-2 space-y-6 p-5 sm:p-7 md:order-1">
        {visibleFields.map((field) =>
          field.type === "select" ? (
            <CalculatorSelect
              key={field.id}
              field={field}
              value={values[field.id] ?? ""}
              onChange={(v) => handleFieldChange(field.id, v)}
            />
          ) : (
            <CalculatorInput
              key={field.id}
              field={field}
              value={values[field.id] ?? ""}
              onChange={(v) => handleFieldChange(field.id, v)}
            />
          )
        )}
        <button
          type="button"
          onClick={handleClear}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-xl border-2 border-line px-5 text-[1rem] font-bold text-ink-2 transition-colors duration-150 hover:border-green-700 hover:text-green-800"
        >
          <RotateCcw className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          Wyczyść
        </button>
      </div>
    </section>
  );
}
