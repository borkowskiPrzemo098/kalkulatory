import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function zuzyciePaliwaLitry(dystansKm: number, spalanieL100km: number): number {
  return (dystansKm * spalanieL100km) / 100;
}

function calculate(values: Record<string, string>) {
  const dystans = parseLocaleNumber(values.dystans);
  const spalanie = parseLocaleNumber(values.spalanie);

  if ([dystans, spalanie].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (dystans <= 0) return { results: [], error: "Dystans musi być większy od zera." };
  if (spalanie <= 0) return { results: [], error: "Spalanie musi być większe od zera." };

  const litry = zuzyciePaliwaLitry(dystans, spalanie);

  return { results: [{ label: "Zużyte paliwo na trasę", value: `${formatNumber(litry, 2)} l`, highlight: true }] };
}

export const zuzyciePaliwaTrasaConfig: CalculatorConfig = {
  slug: "zuzycie-paliwa-trasa",
  name: "Kalkulator zużycia paliwa na trasę",
  shortName: "Zużycie paliwa na trasę",
  shortDescription: "Oblicz, ile litrów paliwa zużyjesz na daną trasę.",
  metaDescription: "Kalkulator zużycia paliwa na trasę online: oblicz liczbę litrów paliwa potrzebną na przejazd danego dystansu przy znanym spalaniu.",
  category: "motoryzacja",
  tags: ["paliwo", "spalanie", "trasa", "samochód", "motoryzacja"],
  fields: [
    { id: "dystans", label: "Dystans trasy", type: "number", unit: "km", defaultValue: "300" },
    { id: "spalanie", label: "Średnie spalanie", type: "number", unit: "l/100km", defaultValue: "7" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza, ile litrów paliwa zużyje samochód na danej trasie, na podstawie długości trasy i średniego spalania pojazdu. Przydatny przy planowaniu ile paliwa zatankować przed podróżą.",
  howTo: ["Podaj długość trasy w kilometrach.", "Podaj średnie spalanie samochodu w l/100km.", "Wynik pokaże ilość paliwa potrzebną na trasę."],
  formula: "Zużyte paliwo (l) = dystans (km) / 100 × spalanie (l/100km).",
  examples: [{ input: "300 km, spalanie 7 l/100km", output: "21 l" }],
  faq: [
    {
      q: "Czy warto doliczyć zapas paliwa?",
      a: "Tak, rzeczywiste spalanie może się różnić w zależności od stylu jazdy, warunków drogowych i pogodowych — warto doliczyć margines bezpieczeństwa, szczególnie na trasach bez stacji paliw.",
    },
    {
      q: "Jak sprawdzić rzeczywiste spalanie mojego auta?",
      a: "Najdokładniej obliczysz je, dzieląc ilość zatankowanego paliwa przez przejechany dystans i mnożąc przez 100.",
    },
  ],
};
