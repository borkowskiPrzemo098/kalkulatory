import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function potega(podstawa: number, wykladnik: number): number {
  return Math.pow(podstawa, wykladnik);
}

export function pierwiastek(liczba: number, stopien: number): number {
  if (liczba < 0) {
    if (Number.isInteger(stopien) && stopien % 2 === 1) {
      return -Math.pow(-liczba, 1 / stopien);
    }
    return NaN;
  }
  return Math.pow(liczba, 1 / stopien);
}

function calculate(values: Record<string, string>) {
  const tryb = values.tryb || "potega";

  if (tryb === "potega") {
    const podstawa = parseLocaleNumber(values.podstawa);
    const wykladnik = parseLocaleNumber(values.wykladnik);
    if ([podstawa, wykladnik].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj podstawę i wykładnik." };
    const wynik = potega(podstawa, wykladnik);
    if (!Number.isFinite(wynik)) return { results: [], error: "Wynik jest nieokreślony lub zbyt duży." };
    return { results: [{ label: `${values.podstawa}^${values.wykladnik}`, value: formatNumber(wynik, 6), highlight: true }] };
  }

  const liczba = parseLocaleNumber(values.liczba);
  const stopien = parseLocaleNumber(values.stopien);
  if ([liczba, stopien].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj liczbę i stopień pierwiastka." };
  if (stopien === 0) return { results: [], error: "Stopień pierwiastka nie może być zerem." };
  const wynik = pierwiastek(liczba, stopien);
  if (Number.isNaN(wynik)) return { results: [], error: "Nie da się obliczyć pierwiastka parzystego stopnia z liczby ujemnej." };

  return { results: [{ label: `${values.stopien}-ty pierwiastek z ${values.liczba}`, value: formatNumber(wynik, 6), highlight: true }] };
}

export const pierwiastkiPotegiConfig: CalculatorConfig = {
  slug: "pierwiastki-potegi",
  name: "Kalkulator pierwiastków i potęg",
  shortName: "Pierwiastki / potęgi",
  shortDescription: "Podnieś liczbę do potęgi lub oblicz pierwiastek dowolnego stopnia.",
  metaDescription: "Kalkulator potęg i pierwiastków online: oblicz dowolną potęgę liczby lub pierwiastek n-tego stopnia.",
  category: "matematyka",
  tags: ["potęga", "pierwiastek", "matematyka", "obliczenia"],
  fields: [
    {
      id: "tryb",
      label: "Co obliczyć?",
      type: "select",
      defaultValue: "potega",
      options: [
        { value: "potega", label: "Potęgowanie" },
        { value: "pierwiastek", label: "Pierwiastkowanie" },
      ],
    },
    { id: "podstawa", label: "Podstawa", type: "number", defaultValue: "2", dependsOn: { field: "tryb", value: "potega" } },
    { id: "wykladnik", label: "Wykładnik", type: "number", defaultValue: "10", dependsOn: { field: "tryb", value: "potega" } },
    { id: "liczba", label: "Liczba", type: "number", defaultValue: "27", dependsOn: { field: "tryb", value: "pierwiastek" } },
    { id: "stopien", label: "Stopień pierwiastka", type: "number", defaultValue: "3", dependsOn: { field: "tryb", value: "pierwiastek" } },
  ],
  calculate,
  intro:
    "Kalkulator pozwala szybko obliczyć dowolną potęgę liczby (również z wykładnikiem ułamkowym lub ujemnym) oraz pierwiastek dowolnego stopnia, w tym pierwiastek sześcienny.",
  howTo: [
    "Wybierz potęgowanie lub pierwiastkowanie.",
    "Podaj podstawę i wykładnik (dla potęgi) lub liczbę i stopień pierwiastka.",
    "Wynik pojawi się automatycznie.",
  ],
  formula: "Potęga: a^n. Pierwiastek stopnia n: n√a = a^(1/n).",
  examples: [
    { input: "2^10", output: "1024" },
    { input: "pierwiastek 3. stopnia z 27", output: "3" },
  ],
  faq: [
    {
      q: "Czy można obliczyć pierwiastek z liczby ujemnej?",
      a: "Tak, ale tylko dla nieparzystego stopnia pierwiastka (np. pierwiastek sześcienny z −8 wynosi −2). Pierwiastek parzystego stopnia z liczby ujemnej nie ma rozwiązania w liczbach rzeczywistych.",
    },
    {
      q: "Jak obliczyć pierwiastek kwadratowy?",
      a: "Ustaw stopień pierwiastka na 2 — to standardowy pierwiastek kwadratowy, np. √16 = 4.",
    },
  ],
};
