import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na litry.
export const JEDNOSTKI_OBJETOSCI: Record<string, number> = {
  ml: 0.001,
  l: 1,
  m3: 1000,
  galonUS: 3.785411784,
  kwartaUS: 0.946352946,
  uncjaPlynuUS: 0.0295735295625,
};

export const ETYKIETY_OBJETOSCI: Record<string, string> = {
  ml: "mililitry",
  l: "litry",
  m3: "metry sześcienne",
  galonUS: "galony (US)",
  kwartaUS: "kwarty (US)",
  uncjaPlynuUS: "uncje płynu (US fl oz)",
};

export function przeliczObjetosc(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wLitrach = wartosc * JEDNOSTKI_OBJETOSCI[zJednostki];
  return wLitrach / JEDNOSTKI_OBJETOSCI[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "l";
  const naJednostke = values.naJednostke || "galonUS";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Objętość nie może być ujemna." };

  const wynik = przeliczObjetosc(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_OBJETOSCI[naJednostke]}`, value: formatNumber(wynik, 6), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_OBJETOSCI).map(([value, label]) => ({ value, label }));

export const objetoscConfig: CalculatorConfig = {
  slug: "objetosc",
  name: "Przelicznik objętości",
  shortName: "Objętość",
  shortDescription: "Przelicz jednostki objętości: mililitry, litry, metry sześcienne, galony, kwarty.",
  metaDescription: "Przelicznik jednostek objętości online: ml, l, m³, galony (US), kwarty (US), uncje płynu — szybkie i darmowe przeliczanie.",
  category: "przeliczniki",
  tags: ["objętość", "litry", "galony", "przelicznik"],
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "10" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "l", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "galonUS", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik objętości pozwala szybko przeliczyć wartość między jednostkami metrycznymi (ml, l, m³) a amerykańskimi jednostkami objętości płynów (galony, kwarty, uncje).",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (litr): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "10 l", output: "≈ 2,642 galona (US)" },
    { input: "1 m³", output: "1000 l" },
  ],
  faq: [
    { q: "Ile litrów ma galon amerykański?", a: "Jeden galon US (płynny) to ok. 3,785 litra. Uwaga: galon brytyjski (imperial) ma inną wartość — ok. 4,546 litra." },
    { q: "Ile litrów ma metr sześcienny?", a: "Jeden metr sześcienny to dokładnie 1000 litrów." },
  ],
};
