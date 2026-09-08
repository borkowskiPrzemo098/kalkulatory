import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function kosztPodrozy(dystansKm: number, spalanieL100km: number, cenaPaliwa: number): number {
  return (dystansKm * spalanieL100km) / 100 * cenaPaliwa;
}

function calculate(values: Record<string, string>) {
  const dystans = parseLocaleNumber(values.dystans);
  const spalanie = parseLocaleNumber(values.spalanie);
  const cena = parseLocaleNumber(values.cena);

  if ([dystans, spalanie, cena].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (dystans <= 0) return { results: [], error: "Dystans musi być większy od zera." };
  if (spalanie <= 0) return { results: [], error: "Spalanie musi być większe od zera." };
  if (cena <= 0) return { results: [], error: "Cena paliwa musi być większa od zera." };

  const koszt = kosztPodrozy(dystans, spalanie, cena);

  return {
    results: [
      { label: "Koszt podróży", value: formatCurrency(koszt), highlight: true },
      { label: "Zużyte paliwo", value: `${((dystans * spalanie) / 100).toFixed(2)} l` },
    ],
  };
}

export const kosztPodrozyConfig: CalculatorConfig = {
  slug: "koszt-podrozy",
  name: "Kalkulator kosztu podróży samochodem",
  shortName: "Koszt podróży",
  shortDescription: "Oblicz koszt paliwa na podaną trasę na podstawie spalania i ceny paliwa.",
  metaDescription: "Kalkulator kosztu podróży samochodem online: oblicz koszt paliwa na trasę na podstawie dystansu, spalania i ceny paliwa.",
  category: "motoryzacja",
  tags: ["podróż", "paliwo", "koszt", "trasa", "samochód", "motoryzacja"],
  fields: [
    { id: "dystans", label: "Dystans trasy", type: "number", unit: "km", defaultValue: "300" },
    { id: "spalanie", label: "Średnie spalanie", type: "number", unit: "l/100km", defaultValue: "7" },
    { id: "cena", label: "Cena paliwa", type: "number", unit: "zł/l", defaultValue: "6.5" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza koszt paliwa na zaplanowaną trasę na podstawie dystansu, średniego spalania samochodu oraz aktualnej ceny paliwa. Przydatny przy planowaniu podróży i szacowaniu budżetu na wyjazd.",
  howTo: ["Podaj długość planowanej trasy w kilometrach.", "Podaj średnie spalanie Twojego samochodu (l/100km).", "Podaj aktualną cenę paliwa za litr."],
  formula: "Koszt = (dystans / 100) × spalanie × cena paliwa.",
  examples: [{ input: "300 km, spalanie 7 l/100km, cena 6,50 zł/l", output: "136,50 zł" }],
  faq: [
    {
      q: "Skąd wziąć średnie spalanie mojego samochodu?",
      a: "Możesz sprawdzić je w komputerze pokładowym, dokumentacji technicznej lub obliczyć na podstawie ostatnich tankowań (możesz też skorzystać z kalkulatora spalania paliwa).",
    },
    {
      q: "Czy kalkulator uwzględnia opłaty autostradowe?",
      a: "Nie, kalkulator liczy wyłącznie koszt paliwa. Opłaty za przejazd autostradą, parkingi czy inne koszty należy doliczyć osobno.",
    },
  ],
};
