import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na metry na sekundę.
export const JEDNOSTKI_PREDKOSCI: Record<string, number> = {
  ms: 1,
  kmh: 1 / 3.6,
  mph: 0.44704,
  wezel: 0.514444444,
};

export const ETYKIETY_PREDKOSCI: Record<string, string> = {
  ms: "metry na sekundę (m/s)",
  kmh: "kilometry na godzinę (km/h)",
  mph: "mile na godzinę (mph)",
  wezel: "węzły (kn)",
};

export function przeliczPredkosc(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wMs = wartosc * JEDNOSTKI_PREDKOSCI[zJednostki];
  return wMs / JEDNOSTKI_PREDKOSCI[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "kmh";
  const naJednostke = values.naJednostke || "mph";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Prędkość nie może być ujemna." };

  const wynik = przeliczPredkosc(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_PREDKOSCI[naJednostke]}`, value: formatNumber(wynik, 4), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_PREDKOSCI).map(([value, label]) => ({ value, label }));

export const predkoscConfig: CalculatorConfig = {
  slug: "predkosc",
  name: "Przelicznik prędkości",
  shortName: "Prędkość",
  shortDescription: "Przelicz jednostki prędkości: m/s, km/h, mph, węzły.",
  metaDescription: "Przelicznik jednostek prędkości online: m/s, km/h, mph, węzły (kn) — szybkie i darmowe przeliczanie prędkości.",
  category: "przeliczniki",
  tags: ["prędkość", "km/h", "mph", "węzły", "przelicznik"],
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "100" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "kmh", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "mph", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik prędkości pozwala szybko przeliczyć wartość między popularnymi jednostkami: metrami na sekundę, kilometrami na godzinę, milami na godzinę i węzłami.",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (m/s): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "100 km/h", output: "≈ 62,14 mph" },
    { input: "1 węzeł", output: "≈ 1,852 km/h" },
  ],
  faq: [
    { q: "Ile km/h to jeden węzeł?", a: "Jeden węzeł (mila morska na godzinę) to ok. 1,852 km/h." },
    { q: "Jak przeliczyć km/h na m/s?", a: "Podziel wartość w km/h przez 3,6, np. 36 km/h = 10 m/s." },
  ],
};
