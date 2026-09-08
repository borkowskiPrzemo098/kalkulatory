import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function iloscFarbyLitry(powierzchniaM2: number, wydajnoscM2NaLitr: number, liczbaWarstw: number): number {
  return (powierzchniaM2 / wydajnoscM2NaLitr) * liczbaWarstw;
}

function calculate(values: Record<string, string>) {
  const powierzchnia = parseLocaleNumber(values.powierzchnia);
  const wydajnosc = parseLocaleNumber(values.wydajnosc);
  const warstwy = parseLocaleNumber(values.warstwy);

  if ([powierzchnia, wydajnosc, warstwy].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (powierzchnia <= 0) return { results: [], error: "Powierzchnia musi być większa od zera." };
  if (wydajnosc <= 0) return { results: [], error: "Wydajność farby musi być większa od zera." };
  if (warstwy <= 0) return { results: [], error: "Liczba warstw musi być większa od zera." };

  const litry = iloscFarbyLitry(powierzchnia, wydajnosc, warstwy);

  return {
    results: [
      { label: "Potrzebna ilość farby", value: `${formatNumber(litry, 2)} l`, highlight: true },
      { label: "Zaokrąglone opakowania (10 l)", value: `${Math.ceil(litry / 10)} × 10 l` },
    ],
  };
}

export const zuzycieFarbyConfig: CalculatorConfig = {
  slug: "zuzycie-farby",
  name: "Kalkulator zużycia farby",
  shortName: "Zużycie farby",
  shortDescription: "Oblicz, ile litrów farby potrzebujesz do pomalowania danej powierzchni.",
  metaDescription: "Kalkulator zużycia farby online: oblicz potrzebną ilość farby w litrach na podstawie powierzchni, wydajności produktu i liczby warstw.",
  category: "dom",
  tags: ["farba", "malowanie", "remont", "dom"],
  fields: [
    { id: "powierzchnia", label: "Powierzchnia do pomalowania", type: "number", unit: "m²", defaultValue: "41" },
    { id: "wydajnosc", label: "Wydajność farby", type: "number", unit: "m²/l", defaultValue: "10", helpText: "Wydajność podana jest na opakowaniu farby." },
    { id: "warstwy", label: "Liczba warstw", type: "number", defaultValue: "2" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza, ile litrów farby będzie potrzebnych do pomalowania danej powierzchni, uwzględniając wydajność konkretnej farby (podaną na opakowaniu) oraz liczbę planowanych warstw.",
  howTo: [
    "Podaj powierzchnię do pomalowania (możesz użyć kalkulatora powierzchni malowania ścian).",
    "Podaj wydajność farby w m² na litr, zgodnie z informacją na opakowaniu.",
    "Podaj liczbę warstw, jaką planujesz nałożyć.",
  ],
  formula: "Ilość farby (l) = (powierzchnia / wydajność) × liczba warstw.",
  examples: [{ input: "41 m², wydajność 10 m²/l, 2 warstwy", output: "8,2 l farby" }],
  faq: [
    {
      q: "Czy warto kupić farbę z zapasem?",
      a: "Tak, warto doliczyć ok. 5–10% zapasu na poprawki, nierówności podłoża i różnice w rzeczywistej wydajności farby.",
    },
    {
      q: "Skąd wziąć wydajność farby?",
      a: "Wydajność (ile m² pokrywa 1 litr) podana jest zwykle na etykiecie opakowania farby — zależy od koloru, podłoża i sposobu aplikacji.",
    },
  ],
};
