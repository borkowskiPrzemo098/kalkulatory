import { CalculatorConfig } from "./types";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/format";

export function zuzycieEnergiiKwh(mocW: number, godzinDziennie: number, dni: number): number {
  return (mocW * godzinDziennie * dni) / 1000;
}

function calculate(values: Record<string, string>) {
  const moc = parseLocaleNumber(values.moc);
  const godziny = parseLocaleNumber(values.godziny);
  const dni = parseLocaleNumber(values.dni);
  const cena = parseLocaleNumber(values.cena);

  if ([moc, godziny, dni, cena].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (moc <= 0) return { results: [], error: "Moc urządzenia musi być większa od zera." };
  if (godziny < 0 || godziny > 24) return { results: [], error: "Liczba godzin dziennie musi być z zakresu 0–24." };
  if (dni <= 0) return { results: [], error: "Liczba dni musi być większa od zera." };
  if (cena < 0) return { results: [], error: "Cena energii nie może być ujemna." };

  const kwh = zuzycieEnergiiKwh(moc, godziny, dni);
  const koszt = kwh * cena;

  return {
    results: [
      { label: "Koszt zużycia energii", value: formatCurrency(koszt), highlight: true },
      { label: "Zużycie energii", value: `${formatNumber(kwh, 2)} kWh` },
    ],
  };
}

export const zuzycieEnergiiUrzadzenConfig: CalculatorConfig = {
  slug: "zuzycie-energii-urzadzen",
  name: "Kalkulator zużycia energii urządzeń",
  shortName: "Zużycie energii urządzeń",
  shortDescription: "Oblicz zużycie prądu (kWh) i koszt pracy urządzenia elektrycznego.",
  metaDescription: "Kalkulator zużycia energii elektrycznej online: oblicz zużycie prądu w kWh i koszt eksploatacji urządzenia na podstawie mocy i czasu pracy.",
  category: "dom",
  tags: ["prąd", "energia elektryczna", "kwh", "rachunek za prąd", "dom"],
  fields: [
    { id: "moc", label: "Moc urządzenia", type: "number", unit: "W", defaultValue: "2000" },
    { id: "godziny", label: "Czas pracy dziennie", type: "number", unit: "godz.", defaultValue: "1" },
    { id: "dni", label: "Liczba dni", type: "number", defaultValue: "30" },
    { id: "cena", label: "Cena energii", type: "number", unit: "zł/kWh", defaultValue: "0.8" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza zużycie energii elektrycznej (w kWh) oraz koszt pracy danego urządzenia elektrycznego na podstawie jego mocy, czasu użytkowania i ceny energii z taryfy.",
  howTo: [
    "Podaj moc urządzenia w watach (znajdziesz na tabliczce znamionowej).",
    "Podaj średni dzienny czas pracy urządzenia oraz liczbę dni.",
    "Podaj cenę energii elektrycznej z Twojej taryfy (zł/kWh).",
  ],
  formula: "Zużycie (kWh) = moc (W) × godziny dziennie × liczba dni / 1000. Koszt = zużycie × cena za kWh.",
  examples: [{ input: "2000 W, 1 godz./dzień, 30 dni, 0,80 zł/kWh", output: "60 kWh, 48 zł" }],
  faq: [
    {
      q: "Gdzie znajdę moc urządzenia?",
      a: "Moc podana jest zwykle na tabliczce znamionowej urządzenia lub w jego specyfikacji technicznej — wyrażona w watach (W) lub kilowatach (kW, gdzie 1 kW = 1000 W).",
    },
    {
      q: "Jak sprawdzić cenę energii z mojej taryfy?",
      a: "Cenę za kWh znajdziesz na rachunku za prąd od dostawcy energii — może się różnić w zależności od taryfy i pory dnia.",
    },
  ],
};
