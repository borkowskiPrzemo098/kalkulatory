import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na metry.
export const JEDNOSTKI_DLUGOSCI: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  cal: 0.0254,
  stopa: 0.3048,
  jard: 0.9144,
  mila: 1609.344,
};

export const ETYKIETY_DLUGOSCI: Record<string, string> = {
  mm: "milimetry",
  cm: "centymetry",
  m: "metry",
  km: "kilometry",
  cal: "cale",
  stopa: "stopy",
  jard: "jardy",
  mila: "mile",
};

export function przeliczDlugosc(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wMetrach = wartosc * JEDNOSTKI_DLUGOSCI[zJednostki];
  return wMetrach / JEDNOSTKI_DLUGOSCI[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "m";
  const naJednostke = values.naJednostke || "km";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Długość nie może być ujemna." };

  const wynik = przeliczDlugosc(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_DLUGOSCI[naJednostke]}`, value: formatNumber(wynik, 6), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_DLUGOSCI).map(([value, label]) => ({ value, label }));

export const dlugoscConfig: CalculatorConfig = {
  slug: "dlugosc",
  name: "Przelicznik długości",
  shortName: "Długość",
  shortDescription: "Przelicz jednostki długości: milimetry, centymetry, metry, kilometry, cale, stopy, jardy, mile.",
  metaDescription: "Przelicznik jednostek długości online: mm, cm, m, km, cale, stopy, jardy, mile — szybkie i darmowe przeliczanie.",
  category: "przeliczniki",
  tags: ["długość", "metry", "kilometry", "cale", "stopy", "przelicznik"],
  popular: true,
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "1000" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "m", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "km", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik długości pozwala szybko przeliczyć wartość między popularnymi jednostkami metrycznymi (mm, cm, m, km) oraz anglosaskimi (cale, stopy, jardy, mile).",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (metr): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "1000 m", output: "1 km" },
    { input: "1 mila", output: "≈ 1609,344 m" },
  ],
  faq: [
    { q: "Ile metrów ma jedna mila?", a: "Jedna mila lądowa (angielska) to dokładnie 1609,344 metra." },
    { q: "Ile cali ma jeden metr?", a: "Jeden metr to ok. 39,37 cala (1 cal = 2,54 cm)." },
  ],
};
