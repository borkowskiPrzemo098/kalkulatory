# Jak dodać nowy kalkulator (5–10 minut)

Ten dokument opisuje, jak dodać nowy kalkulator do serwisu. Dzięki architekturze
opartej na rejestrze (`src/calculators/registry.ts`) dodanie kalkulatora sprowadza
się do napisania jednego pliku z logiką/konfiguracją i zarejestrowania go — reszta
(strona, SEO, breadcrumbs, FAQ, powiązane kalkulatory, sitemap) działa automatycznie.

## Krok po kroku

### 1. Utwórz plik kalkulatora

Utwórz `src/calculators/<slug>.ts`, np. `src/calculators/przelicznik-dlugosci.ts`.

Plik eksportuje obiekt `CalculatorConfig` (typ w `src/calculators/types.ts`) oraz
czyste funkcje obliczeniowe (łatwe do przetestowania jednostkowo).

```ts
import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Czysta funkcja obliczeniowa — łatwa do testowania.
export function metryNaKm(metry: number): number {
  return metry / 1000;
}

function calculate(values: Record<string, string>) {
  const metry = parseLocaleNumber(values.metry);

  if (Number.isNaN(metry)) {
    return { results: [], error: "Podaj długość w metrach." };
  }
  if (metry < 0) {
    return { results: [], error: "Długość nie może być ujemna." };
  }

  return {
    results: [
      { label: "Kilometry", value: `${formatNumber(metryNaKm(metry), 3)} km`, highlight: true },
    ],
  };
}

export const przelicznikDlugosciConfig: CalculatorConfig = {
  slug: "przelicznik-dlugosci",
  name: "Przelicznik metrów na kilometry",
  shortName: "Metry → km",
  shortDescription: "Przelicz metry na kilometry.",
  metaDescription: "Kalkulator online: przelicz metry na kilometry szybko i za darmo.",
  category: "przeliczniki", // patrz src/lib/categories.ts
  tags: ["długość", "metry", "kilometry", "przelicznik"],
  fields: [
    { id: "metry", label: "Długość", type: "number", unit: "m", defaultValue: "1000" },
  ],
  calculate,
  intro: "Krótki, konkretny opis SEO — co robi kalkulator i do czego się przydaje.",
  howTo: ["Wpisz długość w metrach.", "Wynik pojawi się automatycznie."],
  formula: "km = m / 1000.",
  examples: [{ input: "1000 m", output: "1 km" }],
  faq: [{ q: "Jak przeliczyć metry na kilometry?", a: "Podziel liczbę metrów przez 1000." }],
};
```

### 2. Zarejestruj kalkulator

W `src/calculators/registry.ts`:

```ts
import { przelicznikDlugosciConfig } from "./przelicznik-dlugosci";

export const calculators: CalculatorConfig[] = [
  // ...istniejące kalkulatory,
  przelicznikDlugosciConfig,
];
```

To wszystko — strona `/kalkulatory/przelicznik-dlugosci` zostanie automatycznie
wygenerowana (SSG), pojawi się na liście `/kalkulatory`, w kategorii
`/kategorie/przeliczniki`, w wyszukiwarce oraz w sekcji „Powiązane kalkulatory”
innych kalkulatorów z tymi samymi tagami/kategorią, a także w `sitemap.xml`.

### 3. Dodaj testy jednostkowe

Utwórz `src/calculators/przelicznik-dlugosci.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { metryNaKm } from "./przelicznik-dlugosci";

describe("przelicznik długości", () => {
  it("1000 m = 1 km", () => {
    expect(metryNaKm(1000)).toBe(1);
  });
});
```

Uruchom `npm run test`.

### 4. Sprawdź build

```bash
npm run build
```

## Typy pól formularza

- `number` — pole tekstowe z `inputMode="decimal"`, obsługuje polski format liczb
  (przecinek dziesiętny) dzięki `parseLocaleNumber`.
- `select` — lista rozwijana (`options: [{ value, label }]`).
- `date` — pole daty (natywny `<input type="date">`).

Pole może zależeć od wartości innego pola poprzez `dependsOn: { field, value }` —
przydatne przy kalkulatorach z kilkoma trybami (patrz `procenty.ts` lub `vat.ts`).

## Zasady

- Logika obliczeniowa musi być czystą funkcją (bez efektów ubocznych), aby dało się
  ją łatwo testować.
- Zawsze waliduj dane wejściowe: puste pola, wartości ujemne bez sensu, dzielenie
  przez zero, nieprawidłowe daty — zwracaj czytelny komunikat w polu `error`,
  nigdy nie pozwalaj na `NaN`/`Infinity` w wyniku.
- Używaj `formatNumber` / `formatCurrency` / `formatPercent` z `src/lib/format.ts`
  do formatowania liczb w polskim standardzie.
- Kategorie muszą być jedną z wartości zdefiniowanych w `src/lib/categories.ts`.
- Treści (`intro`, `howTo`, `faq`, `examples`) mają być konkretne, bez lania wody,
  bez fałszywych statystyk czy fikcyjnych opinii.
