import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function kubaturaBetonuM3(dlugoscM: number, szerokoscM: number, grubcoscM: number): number {
  return dlugoscM * szerokoscM * grubcoscM;
}

function calculate(values: Record<string, string>) {
  const dlugosc = parseLocaleNumber(values.dlugosc);
  const szerokosc = parseLocaleNumber(values.szerokosc);
  const grubosc = parseLocaleNumber(values.grubosc);

  if ([dlugosc, szerokosc, grubosc].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (dlugosc <= 0 || szerokosc <= 0 || grubosc <= 0) return { results: [], error: "Wymiary muszą być większe od zera." };

  const objetosc = kubaturaBetonuM3(dlugosc, szerokosc, grubosc);

  return {
    results: [
      { label: "Kubatura betonu", value: `${formatNumber(objetosc, 3)} m³`, highlight: true },
      { label: "Orientacyjnie w litrach", value: `${formatNumber(objetosc * 1000, 0)} l` },
    ],
  };
}

export const kubaturaBetonuConfig: CalculatorConfig = {
  slug: "kubatura-betonu",
  name: "Kalkulator kubatury betonu",
  shortName: "Kubatura betonu",
  shortDescription: "Oblicz ilość betonu (w m³) potrzebną na płytę, fundament lub wylewkę.",
  metaDescription: "Kalkulator kubatury betonu online: oblicz objętość betonu w metrach sześciennych potrzebną na wylewkę, fundament lub płytę.",
  category: "dom",
  tags: ["beton", "fundament", "wylewka", "budowa", "dom"],
  fields: [
    { id: "dlugosc", label: "Długość", type: "number", unit: "m", defaultValue: "5" },
    { id: "szerokosc", label: "Szerokość", type: "number", unit: "m", defaultValue: "4" },
    { id: "grubosc", label: "Grubość warstwy", type: "number", unit: "m", defaultValue: "0.1" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza objętość betonu potrzebną do wykonania płyty, wylewki lub fundamentu na podstawie jego wymiarów — długości, szerokości i grubości warstwy.",
  howTo: ["Podaj długość i szerokość powierzchni betonowania w metrach.", "Podaj grubość warstwy betonu w metrach (np. 0,1 m dla 10 cm).", "Wynik pokaże kubaturę w m³."],
  formula: "Kubatura (m³) = długość × szerokość × grubość.",
  examples: [{ input: "5×4 m, grubość 10 cm", output: "2 m³" }],
  faq: [
    {
      q: "Czy warto zamówić beton z zapasem?",
      a: "Tak, zaleca się doliczenie 5–10% zapasu na nierówności podłoża, ubytki i straty podczas wylewania.",
    },
    {
      q: "Jak przeliczyć centymetry grubości na metry?",
      a: "Podziel wartość w centymetrach przez 100, np. 10 cm = 0,1 m.",
    },
  ],
};
