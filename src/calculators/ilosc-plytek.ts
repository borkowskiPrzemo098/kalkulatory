import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function liczbaPlytek(powierzchniaM2: number, plytkaM2: number, zapasProc: number): number {
  return Math.ceil((powierzchniaM2 / plytkaM2) * (1 + zapasProc / 100));
}

function calculate(values: Record<string, string>) {
  const powierzchnia = parseLocaleNumber(values.powierzchnia);
  const dlugoscCm = parseLocaleNumber(values.dlugoscCm);
  const szerokoscCm = parseLocaleNumber(values.szerokoscCm);
  const zapas = parseLocaleNumber(values.zapas);

  if ([powierzchnia, dlugoscCm, szerokoscCm, zapas].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (powierzchnia <= 0) return { results: [], error: "Powierzchnia musi być większa od zera." };
  if (dlugoscCm <= 0 || szerokoscCm <= 0) return { results: [], error: "Wymiary płytki muszą być większe od zera." };
  if (zapas < 0) return { results: [], error: "Zapas nie może być ujemny." };

  const plytkaM2 = (dlugoscCm / 100) * (szerokoscCm / 100);
  const sztuk = liczbaPlytek(powierzchnia, plytkaM2, zapas);

  return {
    results: [
      { label: "Liczba potrzebnych płytek", value: `${formatNumber(sztuk, 0)} szt.`, highlight: true },
      { label: "Powierzchnia jednej płytki", value: `${formatNumber(plytkaM2, 4)} m²` },
    ],
  };
}

export const iloscPlytekConfig: CalculatorConfig = {
  slug: "ilosc-plytek",
  name: "Kalkulator ilości płytek",
  shortName: "Ilość płytek",
  shortDescription: "Oblicz, ile płytek potrzeba do wyłożenia danej powierzchni, z zapasem.",
  metaDescription: "Kalkulator ilości płytek online: oblicz liczbę płytek ceramicznych potrzebną do wyłożenia powierzchni, z uwzględnieniem zapasu na docinki.",
  category: "dom",
  tags: ["płytki", "remont", "łazienka", "podłoga", "dom"],
  fields: [
    { id: "powierzchnia", label: "Powierzchnia do wyłożenia", type: "number", unit: "m²", defaultValue: "20" },
    { id: "dlugoscCm", label: "Długość płytki", type: "number", unit: "cm", defaultValue: "30" },
    { id: "szerokoscCm", label: "Szerokość płytki", type: "number", unit: "cm", defaultValue: "30" },
    { id: "zapas", label: "Zapas na docinki i ubytki", type: "number", unit: "%", defaultValue: "10" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza liczbę płytek potrzebnych do wyłożenia danej powierzchni, na podstawie wymiarów pojedynczej płytki i zalecanego zapasu na docinki oraz ewentualne uszkodzenia.",
  howTo: [
    "Podaj powierzchnię pomieszczenia do wyłożenia płytkami.",
    "Podaj wymiary jednej płytki (długość i szerokość w cm).",
    "Ustal zapas procentowy na docinki (zwykle 10–15%).",
  ],
  formula: "Liczba płytek = ⌈(powierzchnia / powierzchnia jednej płytki) × (1 + zapas/100)⌉.",
  examples: [{ input: "20 m², płytka 30×30 cm, zapas 10%", output: "245 szt." }],
  faq: [
    {
      q: "Jaki zapas na docinki jest optymalny?",
      a: "Przy prostym układaniu na wprost wystarczy 5–10%, przy układzie po przekątnej lub w skomplikowanych pomieszczeniach warto przyjąć 15–20%.",
    },
    {
      q: "Czy kalkulator uwzględnia fugi?",
      a: "Nie liczy dokładnie szerokości fug — dla uproszczenia przyjmuje nominalne wymiary płytki, co przy typowych fugach daje wynik z niewielkim marginesem bezpieczeństwa.",
    },
  ],
};
