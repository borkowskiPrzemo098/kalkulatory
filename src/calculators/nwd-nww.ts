import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function nwd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function nww(a: number, b: number): number {
  const dzielnik = nwd(a, b);
  if (dzielnik === 0) return 0;
  return Math.abs(a * b) / dzielnik;
}

function calculate(values: Record<string, string>) {
  const a = parseLocaleNumber(values.a);
  const b = parseLocaleNumber(values.b);

  if ([a, b].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj dwie liczby całkowite." };
  if (!Number.isInteger(a) || !Number.isInteger(b)) return { results: [], error: "Obie liczby muszą być całkowite." };
  if (a === 0 && b === 0) return { results: [], error: "Obie liczby nie mogą być jednocześnie zerem." };

  return {
    results: [
      { label: "NWD (największy wspólny dzielnik)", value: formatNumber(nwd(a, b), 0), highlight: true },
      { label: "NWW (najmniejsza wspólna wielokrotność)", value: formatNumber(nww(a, b), 0) },
    ],
  };
}

export const nwdNwwConfig: CalculatorConfig = {
  slug: "nwd-nww",
  name: "Kalkulator NWD i NWW",
  shortName: "NWD / NWW",
  shortDescription: "Oblicz największy wspólny dzielnik i najmniejszą wspólną wielokrotność dwóch liczb.",
  metaDescription: "Kalkulator NWD i NWW online: znajdź największy wspólny dzielnik oraz najmniejszą wspólną wielokrotność dwóch liczb całkowitych.",
  category: "matematyka",
  tags: ["nwd", "nww", "matematyka", "podzielność", "ułamki"],
  fields: [
    { id: "a", label: "Pierwsza liczba", type: "number", defaultValue: "24" },
    { id: "b", label: "Druga liczba", type: "number", defaultValue: "36" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza największy wspólny dzielnik (NWD) i najmniejszą wspólną wielokrotność (NWW) dwóch liczb całkowitych metodą Euklidesa. Przydaje się przy skracaniu ułamków i sprowadzaniu do wspólnego mianownika.",
  howTo: ["Podaj dwie liczby całkowite.", "Wynik pokaże NWD i NWW obu liczb."],
  formula: "NWD wyznaczany algorytmem Euklidesa. NWW = |a × b| / NWD(a, b).",
  examples: [
    { input: "24 i 36", output: "NWD = 12, NWW = 72" },
    { input: "4 i 6", output: "NWD = 2, NWW = 12" },
  ],
  faq: [
    {
      q: "Do czego służy NWD?",
      a: "NWD najczęściej wykorzystuje się do skracania ułamków do postaci nieskracalnej — dzieląc licznik i mianownik przez ich NWD.",
    },
    {
      q: "Do czego służy NWW?",
      a: "NWW jest przydatna przy sprowadzaniu ułamków do wspólnego mianownika oraz w zadaniach dotyczących cykli i powtarzalności zdarzeń.",
    },
  ],
};
