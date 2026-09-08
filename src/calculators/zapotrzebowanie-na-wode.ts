import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function dziennaDawkaWodyMl(wagaKg: number, minutyAktywnosci: number): number {
  return wagaKg * 33 + (minutyAktywnosci / 30) * 350;
}

function calculate(values: Record<string, string>) {
  const waga = parseLocaleNumber(values.waga);
  const aktywnosc = parseLocaleNumber(values.aktywnosc);

  if ([waga, aktywnosc].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (waga <= 0) return { results: [], error: "Waga musi być większa od zera." };
  if (aktywnosc < 0) return { results: [], error: "Czas aktywności nie może być ujemny." };

  const mililitry = dziennaDawkaWodyMl(waga, aktywnosc);

  return {
    results: [
      { label: "Orientacyjne dzienne zapotrzebowanie na wodę", value: `${formatNumber(mililitry / 1000, 2)} l`, highlight: true },
      { label: "W mililitrach", value: `${formatNumber(mililitry, 0)} ml` },
    ],
  };
}

export const zapotrzebowanieNaWodeConfig: CalculatorConfig = {
  slug: "zapotrzebowanie-na-wode",
  name: "Kalkulator zapotrzebowania na wodę",
  shortName: "Zapotrzebowanie na wodę",
  shortDescription: "Oszacuj orientacyjną dzienną ilość wody do wypicia na podstawie wagi i aktywności.",
  metaDescription: "Kalkulator zapotrzebowania na wodę online: oblicz orientacyjną dzienną dawkę płynów na podstawie wagi ciała i czasu aktywności fizycznej.",
  category: "zdrowie",
  tags: ["woda", "nawodnienie", "zdrowie", "dieta", "aktywność"],
  fields: [
    { id: "waga", label: "Waga ciała", type: "number", unit: "kg", defaultValue: "70" },
    { id: "aktywnosc", label: "Czas aktywności fizycznej dziennie", type: "number", unit: "min", defaultValue: "30" },
  ],
  calculate,
  intro:
    "Kalkulator szacuje orientacyjną dzienną ilość płynów, jaką warto wypić, uwzględniając wagę ciała i czas aktywności fizycznej. Rzeczywiste zapotrzebowanie zależy też od temperatury otoczenia, stanu zdrowia i diety — to nie jest porada medyczna.",
  howTo: ["Podaj swoją wagę ciała.", "Podaj dzienny czas aktywności fizycznej w minutach.", "Wynik pokaże orientacyjną dawkę wody w litrach i mililitrach."],
  formula: "Zapotrzebowanie (ml) = waga(kg) × 33 + (minuty aktywności / 30) × 350.",
  examples: [
    { input: "70 kg, 60 min aktywności", output: "≈ 3,01 l" },
    { input: "80 kg, brak aktywności", output: "≈ 2,64 l" },
  ],
  faq: [
    {
      q: "Czy ten wynik jest poradą medyczną?",
      a: "Nie. To orientacyjne oszacowanie ogólnego zapotrzebowania na płyny. Osoby z chorobami nerek, serca lub innymi schorzeniami powinny skonsultować ilość przyjmowanych płynów z lekarzem.",
    },
    {
      q: "Czy do dziennej dawki wliczają się inne napoje?",
      a: "Tak, do bilansu płynów wlicza się także wodę zawartą w innych napojach i pokarmach, choć czysta woda pozostaje najlepszym źródłem nawodnienia.",
    },
  ],
};
