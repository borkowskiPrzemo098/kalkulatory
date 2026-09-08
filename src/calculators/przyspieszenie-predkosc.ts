import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function przyspieszenieMs2(predkoscPoczatkowaKmh: number, predkoscKoncowaKmh: number, czasSekund: number): number {
  const v1 = predkoscPoczatkowaKmh / 3.6;
  const v2 = predkoscKoncowaKmh / 3.6;
  return (v2 - v1) / czasSekund;
}

function calculate(values: Record<string, string>) {
  const v1 = parseLocaleNumber(values.v1);
  const v2 = parseLocaleNumber(values.v2);
  const czas = parseLocaleNumber(values.czas);

  if ([v1, v2, czas].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (v1 < 0 || v2 < 0) return { results: [], error: "Prędkości nie mogą być ujemne." };
  if (czas <= 0) return { results: [], error: "Czas musi być większy od zera." };

  const a = przyspieszenieMs2(v1, v2, czas);

  return {
    results: [
      { label: "Przyspieszenie", value: `${formatNumber(a, 2)} m/s²`, highlight: true },
      { label: "Przyspieszenie", value: `${formatNumber(a * 3.6, 2)} km/h na sekundę` },
    ],
  };
}

export const przyspieszeniePredkoscConfig: CalculatorConfig = {
  slug: "przyspieszenie-predkosc",
  name: "Kalkulator przyspieszenia",
  shortName: "Przyspieszenie",
  shortDescription: "Oblicz przyspieszenie pojazdu na podstawie zmiany prędkości i czasu.",
  metaDescription: "Kalkulator przyspieszenia online: oblicz przyspieszenie pojazdu (m/s²) na podstawie prędkości początkowej, końcowej i czasu, np. przy przyspieszaniu 0-100 km/h.",
  category: "motoryzacja",
  tags: ["przyspieszenie", "prędkość", "samochód", "motoryzacja", "fizyka"],
  fields: [
    { id: "v1", label: "Prędkość początkowa", type: "number", unit: "km/h", defaultValue: "0" },
    { id: "v2", label: "Prędkość końcowa", type: "number", unit: "km/h", defaultValue: "100" },
    { id: "czas", label: "Czas przyspieszania", type: "number", unit: "s", defaultValue: "10" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza przyspieszenie pojazdu na podstawie prędkości początkowej, prędkości końcowej i czasu, jaki upłynął między nimi — np. popularny wskaźnik przyspieszenia 0-100 km/h podawany w danych technicznych samochodów.",
  howTo: ["Podaj prędkość początkową i końcową w km/h.", "Podaj czas przyspieszania w sekundach.", "Wynik pokaże przyspieszenie w m/s²."],
  formula: "a = (v2 − v1) / t, gdzie prędkości są przeliczone z km/h na m/s (podzielone przez 3,6).",
  examples: [{ input: "0→100 km/h w 10 s", output: "≈ 2,78 m/s²" }],
  faq: [
    {
      q: "Dlaczego prędkość dzieli się przez 3,6?",
      a: "To standardowy przelicznik z km/h na m/s: 1 km/h = 1000 m / 3600 s = 1/3,6 m/s.",
    },
    {
      q: "Co oznacza wynik w m/s²?",
      a: "Pokazuje, o ile metrów na sekundę rośnie prędkość pojazdu każdej sekundy — im wyższa wartość, tym dynamiczniejsze przyspieszenie.",
    },
  ],
};
