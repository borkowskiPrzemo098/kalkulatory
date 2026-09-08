import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function obliczRoas(przychod: number, wydatkiNaReklame: number): number {
  return przychod / wydatkiNaReklame;
}

function calculate(values: Record<string, string>) {
  const przychod = parseLocaleNumber(values.przychod);
  const wydatki = parseLocaleNumber(values.wydatki);

  if ([przychod, wydatki].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (przychod < 0) return { results: [], error: "Przychód nie może być ujemny." };
  if (wydatki <= 0) return { results: [], error: "Wydatki na reklamę muszą być większe od zera." };

  const roas = obliczRoas(przychod, wydatki);

  return {
    results: [
      { label: "ROAS", value: `${formatNumber(roas, 2)}x`, highlight: true },
      { label: "Interpretacja", value: `Każda 1 zł wydana na reklamę przyniosła ${formatNumber(roas, 2)} zł przychodu` },
    ],
  };
}

export const roasConfig: CalculatorConfig = {
  slug: "roas",
  name: "Kalkulator ROAS",
  shortName: "ROAS",
  shortDescription: "Oblicz ROAS — zwrot z wydatków na reklamę.",
  metaDescription: "Kalkulator ROAS online: oblicz Return on Ad Spend — ile przychodu generuje każda złotówka wydana na reklamę.",
  category: "biznes",
  tags: ["roas", "reklama", "marketing", "biznes", "kampania"],
  fields: [
    { id: "przychod", label: "Przychód z kampanii", type: "number", unit: "zł", defaultValue: "5000" },
    { id: "wydatki", label: "Wydatki na reklamę", type: "number", unit: "zł", defaultValue: "1000" },
  ],
  calculate,
  intro:
    "ROAS (Return on Ad Spend) to wskaźnik pokazujący, ile przychodu generuje każda złotówka wydana na reklamę. Kalkulator pomaga ocenić efektywność kampanii marketingowych.",
  howTo: ["Podaj przychód wygenerowany przez kampanię reklamową.", "Podaj wydatki poniesione na tę kampanię.", "Wynik pokaże wskaźnik ROAS."],
  formula: "ROAS = przychód z kampanii / wydatki na reklamę.",
  examples: [{ input: "5000 zł przychodu, 1000 zł wydatków", output: "ROAS = 5x" }],
  faq: [
    {
      q: "Czym różni się ROAS od ROI?",
      a: "ROAS porównuje przychód do wydatków na reklamę (nie uwzględnia kosztu towaru/usługi), a ROI porównuje zysk netto do całkowitych kosztów inwestycji, uwzględniając też koszt produktu.",
    },
    {
      q: "Jaki ROAS jest dobry?",
      a: "Zależy od branży i marży — w e-commerce często przyjmuje się, że ROAS powyżej 4x jest satysfakcjonujący, ale zawsze warto porównać go z marżą i innymi kosztami stałymi.",
    },
  ],
};
