import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na metry kwadratowe.
export const JEDNOSTKI_POWIERZCHNI: Record<string, number> = {
  cm2: 0.0001,
  m2: 1,
  ar: 100,
  hektar: 10000,
  km2: 1000000,
  akr: 4046.8564224,
};

export const ETYKIETY_POWIERZCHNI: Record<string, string> = {
  cm2: "centymetry kwadratowe",
  m2: "metry kwadratowe",
  ar: "ary",
  hektar: "hektary",
  km2: "kilometry kwadratowe",
  akr: "akry",
};

export function przeliczPowierzchnie(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wM2 = wartosc * JEDNOSTKI_POWIERZCHNI[zJednostki];
  return wM2 / JEDNOSTKI_POWIERZCHNI[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "m2";
  const naJednostke = values.naJednostke || "hektar";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Powierzchnia nie może być ujemna." };

  const wynik = przeliczPowierzchnie(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_POWIERZCHNI[naJednostke]}`, value: formatNumber(wynik, 6), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_POWIERZCHNI).map(([value, label]) => ({ value, label }));

export const powierzchniaConfig: CalculatorConfig = {
  slug: "powierzchnia",
  name: "Przelicznik powierzchni",
  shortName: "Powierzchnia",
  shortDescription: "Przelicz jednostki powierzchni: metry kwadratowe, ary, hektary, kilometry kwadratowe, akry.",
  metaDescription: "Przelicznik jednostek powierzchni online: cm², m², ar, hektar, km², akr — szybkie i darmowe przeliczanie powierzchni działek i gruntów.",
  category: "przeliczniki",
  tags: ["powierzchnia", "hektar", "ar", "działka", "przelicznik"],
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "5000" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "m2", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "hektar", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik powierzchni ułatwia przeliczanie działek i gruntów między metrami kwadratowymi, arami, hektarami, kilometrami kwadratowymi oraz akrami.",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (m²): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "5000 m²", output: "0,5 ha" },
    { input: "1 hektar", output: "100 arów" },
  ],
  faq: [
    { q: "Ile metrów kwadratowych ma hektar?", a: "Jeden hektar to 10 000 m² (100 arów)." },
    { q: "Ile m² ma ar?", a: "Jeden ar to 100 m² — tyle, ile kwadrat o boku 10 metrów." },
  ],
};
