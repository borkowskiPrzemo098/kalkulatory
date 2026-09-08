"use client";

import { useEffect, useMemo, useState } from "react";
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
    <div className="grid gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-7 md:grid-cols-2 md:gap-8">
      <div className="space-y-4">
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
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-muted hover:border-accent hover:text-accent"
        >
          Wyczyść
        </button>
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Wynik</h2>
        <CalculatorResult results={outcome.results} error={outcome.error} />
      </div>
    </div>
  );
}
