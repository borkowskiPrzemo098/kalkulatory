import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function kwotaNaOsobe(kwotaCalkowita: number, liczbaOsob: number): number {
  return kwotaCalkowita / liczbaOsob;
}

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const osoby = parseLocaleNumber(values.osoby);

  if ([kwota, osoby].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (kwota < 0) return { results: [], error: "Kwota nie może być ujemna." };
  if (osoby <= 0 || !Number.isInteger(osoby)) return { results: [], error: "Liczba osób musi być dodatnią liczbą całkowitą." };

  const naOsobe = kwotaNaOsobe(kwota, osoby);

  return { results: [{ label: "Kwota na osobę", value: formatCurrency(naOsobe), highlight: true }] };
}

export const splitBillConfig: CalculatorConfig = {
  slug: "split-bill",
  name: "Kalkulator podziału rachunku",
  shortName: "Podział rachunku",
  shortDescription: "Podziel rachunek po równo między dowolną liczbę osób.",
  metaDescription: "Kalkulator podziału rachunku (split bill) online: podziel wspólny rachunek po równo między dowolną liczbę osób.",
  category: "inne",
  tags: ["split bill", "rachunek", "podział kosztów", "restauracja"],
  fields: [
    { id: "kwota", label: "Łączna kwota rachunku", type: "number", unit: "zł", defaultValue: "240" },
    { id: "osoby", label: "Liczba osób", type: "number", defaultValue: "4" },
  ],
  calculate,
  intro: "Kalkulator podziału rachunku (split bill) pozwala szybko podzielić wspólny wydatek — np. rachunek w restauracji, koszt wyjazdu czy prezentu — po równo między dowolną liczbę osób.",
  howTo: ["Podaj łączną kwotę do podziału.", "Podaj liczbę osób, między które dzielisz kwotę.", "Wynik pokaże kwotę przypadającą na jedną osobę."],
  formula: "Kwota na osobę = kwota całkowita / liczba osób.",
  examples: [{ input: "240 zł, 4 osoby", output: "60 zł na osobę" }],
  faq: [
    {
      q: "Czy kalkulator uwzględnia różne udziały poszczególnych osób?",
      a: "Nie, kalkulator dzieli kwotę po równo. Jeśli potrzebujesz podziału proporcjonalnego do zamówień poszczególnych osób, zsumuj indywidualne kwoty ręcznie.",
    },
    {
      q: "Czy mogę doliczyć napiwek przed podziałem?",
      a: "Tak, użyj kalkulatora napiwku, aby obliczyć łączną kwotę z napiwkiem, a następnie podziel ją tym kalkulatorem.",
    },
  ],
};
