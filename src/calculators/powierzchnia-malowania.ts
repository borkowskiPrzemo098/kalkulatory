import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function powierzchniaDoMalowania(dlugoscM: number, szerokoscM: number, wysokoscM: number, powOtworowM2: number): number {
  const obwod = 2 * (dlugoscM + szerokoscM);
  return obwod * wysokoscM - powOtworowM2;
}

function calculate(values: Record<string, string>) {
  const dlugosc = parseLocaleNumber(values.dlugosc);
  const szerokosc = parseLocaleNumber(values.szerokosc);
  const wysokosc = parseLocaleNumber(values.wysokosc);
  const otwory = parseLocaleNumber(values.otwory) || 0;

  if ([dlugosc, szerokosc, wysokosc].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj wymiary pomieszczenia." };
  if (dlugosc <= 0 || szerokosc <= 0 || wysokosc <= 0) return { results: [], error: "Wymiary muszą być większe od zera." };
  if (otwory < 0) return { results: [], error: "Powierzchnia okien i drzwi nie może być ujemna." };

  const powierzchnia = powierzchniaDoMalowania(dlugosc, szerokosc, wysokosc, otwory);
  if (powierzchnia < 0) return { results: [], error: "Powierzchnia okien i drzwi nie może być większa niż powierzchnia ścian." };

  return { results: [{ label: "Powierzchnia do malowania", value: `${formatNumber(powierzchnia, 2)} m²`, highlight: true }] };
}

export const powierzchniaMalowaniaConfig: CalculatorConfig = {
  slug: "powierzchnia-malowania",
  name: "Kalkulator powierzchni malowania ścian",
  shortName: "Powierzchnia malowania",
  shortDescription: "Oblicz powierzchnię ścian do pomalowania, uwzględniając okna i drzwi.",
  metaDescription: "Kalkulator powierzchni malowania ścian online: oblicz metry kwadratowe ścian do pomalowania na podstawie wymiarów pomieszczenia.",
  category: "dom",
  tags: ["malowanie", "ściany", "remont", "dom", "powierzchnia"],
  fields: [
    { id: "dlugosc", label: "Długość pomieszczenia", type: "number", unit: "m", defaultValue: "4" },
    { id: "szerokosc", label: "Szerokość pomieszczenia", type: "number", unit: "m", defaultValue: "5" },
    { id: "wysokosc", label: "Wysokość ścian", type: "number", unit: "m", defaultValue: "2.5" },
    { id: "otwory", label: "Powierzchnia okien i drzwi", type: "number", unit: "m²", defaultValue: "4" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza powierzchnię ścian do pomalowania na podstawie wymiarów pomieszczenia, pomniejszoną o powierzchnię okien i drzwi. Wynik ułatwia oszacowanie ilości potrzebnej farby.",
  howTo: [
    "Podaj długość i szerokość pomieszczenia oraz wysokość ścian.",
    "Podaj łączną powierzchnię okien i drzwi (do odjęcia).",
    "Wynik pokaże powierzchnię ścian przeznaczoną do malowania.",
  ],
  formula: "Powierzchnia = 2 × (długość + szerokość) × wysokość − powierzchnia okien i drzwi.",
  examples: [{ input: "4×5 m, wysokość 2,5 m, otwory 4 m²", output: "41 m²" }],
  faq: [
    {
      q: "Czy uwzględnić sufit?",
      a: "Nie, kalkulator liczy tylko powierzchnię ścian. Powierzchnię sufitu (do malowania lub tapetowania) oblicz osobno jako iloczyn długości i szerokości pomieszczenia.",
    },
    {
      q: "Co jeśli nie znam dokładnej powierzchni okien i drzwi?",
      a: "Możesz przyjąć wartość 0 i doliczyć zapas farby ręcznie, albo oszacować powierzchnię typowego okna (ok. 1,5 m²) i drzwi (ok. 1,6 m²).",
    },
  ],
};
