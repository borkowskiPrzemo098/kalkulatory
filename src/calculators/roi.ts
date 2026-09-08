import { CalculatorConfig } from "./types";
import { formatPercent, parseLocaleNumber } from "@/lib/format";

export function obliczRoi(wartoscZysku: number, kosztInwestycji: number): number {
  return ((wartoscZysku - kosztInwestycji) / kosztInwestycji) * 100;
}

function calculate(values: Record<string, string>) {
  const zysk = parseLocaleNumber(values.zysk);
  const koszt = parseLocaleNumber(values.koszt);

  if ([zysk, koszt].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (koszt <= 0) return { results: [], error: "Koszt inwestycji musi być większy od zera." };
  if (zysk < 0) return { results: [], error: "Wartość zwrotu nie może być ujemna." };

  const roi = obliczRoi(zysk, koszt);

  return { results: [{ label: "ROI (zwrot z inwestycji)", value: formatPercent(roi), highlight: true }] };
}

export const roiConfig: CalculatorConfig = {
  slug: "roi",
  name: "Kalkulator ROI",
  shortName: "ROI",
  shortDescription: "Oblicz ROI — procentowy zwrot z inwestycji.",
  metaDescription: "Kalkulator ROI online: oblicz Return on Investment — procentowy zwrot z inwestycji na podstawie kosztu i uzyskanego zysku.",
  category: "biznes",
  tags: ["roi", "inwestycja", "zwrot", "biznes", "finanse"],
  fields: [
    { id: "zysk", label: "Wartość zwrotu (przychód z inwestycji)", type: "number", unit: "zł", defaultValue: "1500" },
    { id: "koszt", label: "Koszt inwestycji", type: "number", unit: "zł", defaultValue: "1000" },
  ],
  calculate,
  intro:
    "ROI (Return on Investment) to jeden z najpopularniejszych wskaźników rentowności, pokazujący procentowy zwrot z zainwestowanego kapitału. Kalkulator pomaga szybko ocenić opłacalność inwestycji, projektu lub kampanii.",
  howTo: ["Podaj wartość zwrotu (całkowity przychód lub wartość uzyskaną z inwestycji).", "Podaj koszt poniesionej inwestycji.", "Wynik pokaże procentowy ROI."],
  formula: "ROI (%) = ((wartość zwrotu − koszt inwestycji) / koszt inwestycji) × 100%.",
  examples: [{ input: "1500 zł zwrotu, 1000 zł kosztu", output: "ROI = 50%" }],
  faq: [
    {
      q: "Co oznacza ujemny ROI?",
      a: "Ujemny ROI oznacza, że inwestycja przyniosła stratę — wartość zwrotu była niższa niż poniesiony koszt.",
    },
    {
      q: "Czy ROI uwzględnia czas trwania inwestycji?",
      a: "Nie, podstawowy wskaźnik ROI nie uwzględnia czasu — do porównywania inwestycji o różnym horyzoncie czasowym lepiej użyć rocznej stopy zwrotu (ROI annualizowanego).",
    },
  ],
};
