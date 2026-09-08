import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function obliczBMI(masaKg: number, wzrostCm: number): number {
  const wzrostM = wzrostCm / 100;
  if (wzrostM <= 0) return NaN;
  return masaKg / (wzrostM * wzrostM);
}

export function interpretacjaBMI(bmi: number): string {
  if (bmi < 16) return "wygłodzenie";
  if (bmi < 17) return "wyraźna niedowaga";
  if (bmi < 18.5) return "niedowaga";
  if (bmi < 25) return "waga prawidłowa";
  if (bmi < 30) return "nadwaga";
  if (bmi < 35) return "otyłość I stopnia";
  if (bmi < 40) return "otyłość II stopnia";
  return "otyłość III stopnia";
}

function calculate(values: Record<string, string>) {
  const masa = parseLocaleNumber(values.masa);
  const wzrost = parseLocaleNumber(values.wzrost);

  if (Number.isNaN(masa) || Number.isNaN(wzrost)) {
    return { results: [], error: "Podaj masę ciała i wzrost." };
  }
  if (masa <= 0 || masa > 500) return { results: [], error: "Podaj realistyczną masę ciała (0–500 kg)." };
  if (wzrost <= 0 || wzrost > 260) return { results: [], error: "Podaj realistyczny wzrost w centymetrach (0–260 cm)." };

  const bmi = obliczBMI(masa, wzrost);
  return {
    results: [
      { label: "Twoje BMI", value: formatNumber(bmi, 1), highlight: true },
      { label: "Interpretacja", value: interpretacjaBMI(bmi) },
    ],
  };
}

export const bmiConfig: CalculatorConfig = {
  slug: "bmi",
  name: "Kalkulator BMI",
  shortName: "BMI",
  shortDescription: "Oblicz wskaźnik masy ciała (BMI) na podstawie wzrostu i wagi wraz z interpretacją wyniku.",
  metaDescription:
    "Kalkulator BMI online: podaj wzrost i wagę, otrzymaj wskaźnik masy ciała i jego interpretację. Wynik ma charakter orientacyjny.",
  category: "zdrowie",
  tags: ["bmi", "masa ciała", "waga", "zdrowie", "wskaźnik"],
  popular: true,
  fields: [
    { id: "masa", label: "Masa ciała", type: "number", unit: "kg", defaultValue: "70" },
    { id: "wzrost", label: "Wzrost", type: "number", unit: "cm", defaultValue: "175" },
  ],
  calculate,
  intro:
    "BMI (Body Mass Index, wskaźnik masy ciała) to prosty wskaźnik pozwalający orientacyjnie ocenić, czy masa ciała jest prawidłowa w stosunku do wzrostu. Kalkulator oblicza BMI na podstawie wagi i wzrostu oraz podaje jego interpretację.",
  howTo: ["Wpisz swoją masę ciała w kilogramach.", "Wpisz swój wzrost w centymetrach.", "Odczytaj wynik BMI i jego interpretację."],
  formula: "BMI = masa ciała [kg] / (wzrost [m])².",
  examples: [{ input: "70 kg, 175 cm", output: "BMI ≈ 22,9 — waga prawidłowa" }],
  faq: [
    {
      q: "Czy BMI jest dokładnym wskaźnikiem zdrowia?",
      a: "Nie — BMI jest wskaźnikiem orientacyjnym. Nie uwzględnia proporcji tkanki mięśniowej i tłuszczowej, wieku ani płci. Wynik nie zastępuje konsultacji lekarskiej.",
    },
    {
      q: "Jaki zakres BMI uznaje się za prawidłowy?",
      a: "Zwykle przyjmuje się, że wartości BMI od 18,5 do 24,9 mieszczą się w zakresie wagi prawidłowej dla dorosłych.",
    },
  ],
};
