import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na kilogramy.
export const JEDNOSTKI_WAGI: Record<string, number> = {
  mg: 0.000001,
  g: 0.001,
  dag: 0.01,
  kg: 1,
  tona: 1000,
  funt: 0.45359237,
  uncja: 0.028349523125,
};

export const ETYKIETY_WAGI: Record<string, string> = {
  mg: "miligramy",
  g: "gramy",
  dag: "dekagramy",
  kg: "kilogramy",
  tona: "tony",
  funt: "funty (lb)",
  uncja: "uncje (oz)",
};

export function przeliczWage(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wKg = wartosc * JEDNOSTKI_WAGI[zJednostki];
  return wKg / JEDNOSTKI_WAGI[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "kg";
  const naJednostke = values.naJednostke || "funt";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Waga nie może być ujemna." };

  const wynik = przeliczWage(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_WAGI[naJednostke]}`, value: formatNumber(wynik, 6), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_WAGI).map(([value, label]) => ({ value, label }));

export const wagaConfig: CalculatorConfig = {
  slug: "waga",
  name: "Przelicznik wagi",
  shortName: "Waga",
  shortDescription: "Przelicz jednostki masy: miligramy, gramy, kilogramy, tony, funty, uncje.",
  metaDescription: "Przelicznik jednostek wagi online: mg, g, dag, kg, tony, funty (lb), uncje (oz) — szybkie i darmowe przeliczanie masy.",
  category: "przeliczniki",
  tags: ["waga", "masa", "kilogramy", "funty", "przelicznik"],
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "70" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "kg", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "funt", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik wagi pozwala szybko przeliczyć masę między jednostkami metrycznymi (mg, g, kg, tony) a anglosaskimi (funty, uncje).",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (kilogram): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "70 kg", output: "≈ 154,32 funta" },
    { input: "1 funt", output: "≈ 0,4536 kg" },
  ],
  faq: [
    { q: "Ile kilogramów ma jeden funt?", a: "Jeden funt (lb) to dokładnie 0,45359237 kilograma." },
    { q: "Ile gramów ma jedna uncja?", a: "Jedna uncja (oz) to ok. 28,35 grama." },
  ],
};
