"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { CalculatorConfig } from "@/calculators/types";
import { getCalculatorBySlug, getDrawingNumber } from "@/calculators/registry";
import { getCategoryBySlug } from "@/lib/categories";
import CalculatorInput from "./CalculatorInput";
import CalculatorSelect from "./CalculatorSelect";
import CalculatorResult from "./CalculatorResult";
import Sheet from "./Sheet";
import { trackEvent } from "@/lib/analytics";

function buildDefaultValues(config: CalculatorConfig): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of config.fields) {
    values[field.id] = field.defaultValue ?? "";
  }
  return values;
}

/** Wzór zapisany zdaniami → jedno równanie na linię. */
function formulaLines(formula: string): string[] {
  return formula
    .split(/(?<!\b(?:ok|np|tj|ew|zob))\.\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ0-9])/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

function isFieldVisible(field: CalculatorConfig["fields"][number], values: Record<string, string>): boolean {
  if (!field.dependsOn) return true;
  return values[field.dependsOn.field] === field.dependsOn.value;
}

export default function CalculatorForm({ slug }: { slug: string }) {
  const config = getCalculatorBySlug(slug) as CalculatorConfig;
  const category = getCategoryBySlug(config.category);
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
    <Sheet labelledBy="calc-sheet-title">
      <h2 id="calc-sheet-title" className="sr-only">
        {config.name} — dane i wynik
      </h2>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:grid-rows-[auto_1fr]">
        {/* Na telefonie wynik stoi nad polami: nie chowa go klawiatura. */}
        <div className="order-2 space-y-5 px-4 py-5 sm:px-6 sm:py-6 md:col-start-1 md:row-span-2 md:row-start-1">
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
        </div>

        <div className="order-1 border-b border-frame bg-[color-mix(in_srgb,var(--green-tint)_45%,white)] px-4 py-5 sm:px-6 sm:py-6 md:col-start-2 md:row-start-1 md:border-b-0 md:border-l">
          <p className="caps mb-2.5 text-[0.7rem] text-green">Wynik</p>
          <CalculatorResult results={outcome.results} error={outcome.error} />
        </div>

        {/* Strefa adnotacji: wzór i pierwszy przykład w obrębie arkusza (na telefonie pod polami) */}
        {config.formula && (
          <div className="order-3 border-t border-hair-strong px-4 pb-6 pt-4 sm:px-6 md:col-start-2 md:row-start-2 md:border-l md:border-l-frame md:border-t-hair-strong md:bg-[color-mix(in_srgb,var(--green-tint)_45%,white)]">
              <section aria-labelledby="formula-heading">
                <h2 id="formula-heading" className="caps flex items-center gap-2 text-[0.72rem] text-green">
                  <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-frame text-[0.7rem]">
                    A
                  </span>
                  Wzór
                </h2>
                <div className="mt-3 space-y-1.5">
                  {formulaLines(config.formula).map((line) => (
                    <p key={line} className="text-[1.02rem] font-medium leading-snug text-ink">
                      {line}
                    </p>
                  ))}
                </div>
                {config.examples[0] && (
                  <p className="mt-4 text-[0.92rem] leading-snug text-ink-2">
                    <span className="caps mr-2 text-[0.7rem] text-ink-3">Przykład</span>
                    {config.examples[0].input} → <span className="font-semibold text-ink">{config.examples[0].output}</span>
                  </p>
                )}
              </section>
          </div>
        )}
      </div>

      {/* Tabliczka rysunkowa */}
      <div className="grid grid-cols-2 border-t-[1.5px] border-frame text-[0.8rem] sm:grid-cols-[auto_1fr_1fr_auto]">
        <div className="border-r border-hair-strong px-4 py-2.5 sm:px-5">
          <p className="caps text-[0.7rem] text-ink-3">Nr rysunku</p>
          <p className="caps mt-0.5 text-[0.85rem] text-ink">{getDrawingNumber(config.slug)}</p>
        </div>
        <div className="px-4 py-2.5 sm:border-r sm:border-hair-strong sm:px-5">
          <p className="caps text-[0.7rem] text-ink-3">Kategoria</p>
          {category ? (
            <Link href={`/kategorie/${category.slug}`} className="focus-ring mt-0.5 block font-semibold text-green underline decoration-green/30 hover:decoration-green">
              {category.name}
            </Link>
          ) : (
            <p className="mt-0.5 font-semibold text-ink">—</p>
          )}
        </div>
        <div className="col-span-2 border-t border-hair-strong px-4 py-2.5 sm:col-span-1 sm:border-r sm:border-t-0 sm:px-5">
          <p className="caps text-[0.7rem] text-ink-3">Obliczenia</p>
          <p className="mt-0.5 font-semibold text-ink">W Twojej przeglądarce</p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="focus-ring col-span-2 flex min-h-12 items-center justify-center gap-2 border-t border-hair-strong px-5 text-green transition-colors duration-150 hover:bg-green-tint hover:text-green-deep sm:col-span-1 sm:border-t-0"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
          <span className="caps text-[0.75rem]">Wyczyść</span>
        </button>
      </div>
    </Sheet>
  );
}
