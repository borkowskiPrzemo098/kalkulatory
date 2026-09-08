import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function wiekLudzkiZwierzecia(wiekZwierzeciaLat: number): number {
  if (wiekZwierzeciaLat <= 0) return 0;
  if (wiekZwierzeciaLat <= 1) return wiekZwierzeciaLat * 15;
  if (wiekZwierzeciaLat <= 2) return 15 + (wiekZwierzeciaLat - 1) * 9;
  return 24 + (wiekZwierzeciaLat - 2) * 4;
}

function calculate(values: Record<string, string>) {
  const wiek = parseLocaleNumber(values.wiek);

  if (Number.isNaN(wiek)) return { results: [], error: "Podaj wiek zwierzęcia." };
  if (wiek < 0) return { results: [], error: "Wiek nie może być ujemny." };
  if (wiek > 30) return { results: [], error: "Podaj realny wiek zwierzęcia (maks. 30 lat)." };

  const wiekLudzki = wiekLudzkiZwierzecia(wiek);

  return {
    results: [{ label: "Wiek w „latach ludzkich”", value: `≈ ${formatNumber(wiekLudzki, 0)} lat`, highlight: true }],
  };
}

export const wiekPsaKotaConfig: CalculatorConfig = {
  slug: "wiek-psa-kota",
  name: "Kalkulator wieku psa/kota w latach ludzkich",
  shortName: "Wiek psa/kota",
  shortDescription: "Przelicz wiek psa lub kota na przybliżony odpowiednik w latach ludzkich.",
  metaDescription: "Kalkulator wieku psa i kota online: przelicz wiek zwierzęcia na przybliżone lata ludzkie według popularnego wzoru.",
  category: "zdrowie",
  tags: ["pies", "kot", "zwierzęta", "wiek", "zdrowie"],
  fields: [{ id: "wiek", label: "Wiek zwierzęcia", type: "number", unit: "lat", defaultValue: "5" }],
  calculate,
  intro:
    "Kalkulator przelicza wiek psa lub kota na przybliżony odpowiednik w latach ludzkich, korzystając z popularnego uproszczonego wzoru: pierwszy rok życia zwierzęcia odpowiada 15 latom ludzkim, drugi rok dodaje kolejne 9, a każdy następny rok — około 4 lata ludzkie.",
  howTo: ["Podaj wiek zwierzęcia w latach.", "Wynik pokaże przybliżony wiek w „latach ludzkich”."],
  formula: "1. rok = 15 lat ludzkich. 2. rok dodaje 9 lat (razem 24). Każdy kolejny rok dodaje ok. 4 lata ludzkie.",
  examples: [
    { input: "2 lata", output: "≈ 24 lata ludzkie" },
    { input: "10 lat", output: "≈ 56 lat ludzkich" },
  ],
  faq: [
    {
      q: "Czy to dokładny przelicznik?",
      a: "Nie, to popularne uproszczenie. Rzeczywiste tempo starzenia zależy od rasy, wielkości i stanu zdrowia zwierzęcia — duże psy starzeją się szybciej niż małe. Skonsultuj się z weterynarzem w kwestiach zdrowotnych.",
    },
    {
      q: "Czy wzór jest taki sam dla psów i kotów?",
      a: "W tym uproszczonym modelu tak, choć w rzeczywistości tempo starzenia różni się w zależności od gatunku i rasy.",
    },
  ],
};
