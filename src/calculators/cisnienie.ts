import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Współczynniki przeliczenia jednostki na paskale.
export const JEDNOSTKI_CISNIENIA: Record<string, number> = {
  pa: 1,
  hpa: 100,
  bar: 100000,
  atm: 101325,
  psi: 6894.757293168,
  mmhg: 133.322387415,
};

export const ETYKIETY_CISNIENIA: Record<string, string> = {
  pa: "paskale (Pa)",
  hpa: "hektopaskale (hPa)",
  bar: "bary",
  atm: "atmosfery (atm)",
  psi: "funty na cal² (psi)",
  mmhg: "milimetry słupa rtęci (mmHg)",
};

export function przeliczCisnienie(wartosc: number, zJednostki: string, naJednostke: string): number {
  const wPa = wartosc * JEDNOSTKI_CISNIENIA[zJednostki];
  return wPa / JEDNOSTKI_CISNIENIA[naJednostke];
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "bar";
  const naJednostke = values.naJednostke || "psi";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość do przeliczenia." };
  if (wartosc < 0) return { results: [], error: "Ciśnienie nie może być ujemne." };

  const wynik = przeliczCisnienie(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY_CISNIENIA[naJednostke]}`, value: formatNumber(wynik, 4), highlight: true }] };
}

const OPCJE_JEDNOSTEK = Object.entries(ETYKIETY_CISNIENIA).map(([value, label]) => ({ value, label }));

export const cisnienieConfig: CalculatorConfig = {
  slug: "cisnienie",
  name: "Przelicznik ciśnienia",
  shortName: "Ciśnienie",
  shortDescription: "Przelicz jednostki ciśnienia: paskale, hektopaskale, bary, atmosfery, psi, mmHg.",
  metaDescription: "Przelicznik jednostek ciśnienia online: Pa, hPa, bar, atm, psi, mmHg — szybkie i darmowe przeliczanie ciśnienia, np. w oponach.",
  category: "przeliczniki",
  tags: ["ciśnienie", "bar", "psi", "opony", "przelicznik"],
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "2.2" },
    { id: "zJednostki", label: "Z jednostki", type: "select", defaultValue: "bar", options: OPCJE_JEDNOSTEK },
    { id: "naJednostke", label: "Na jednostkę", type: "select", defaultValue: "psi", options: OPCJE_JEDNOSTEK },
  ],
  calculate,
  intro: "Przelicznik ciśnienia pozwala szybko przeliczyć wartość między jednostkami: paskale, hektopaskale, bary, atmosfery, psi i mmHg — przydatny np. przy sprawdzaniu ciśnienia w oponach.",
  howTo: ["Podaj wartość do przeliczenia.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "Wartość przeliczana jest przez wspólną jednostkę bazową (paskal): wynik = wartość × współczynnik(z) / współczynnik(na).",
  examples: [
    { input: "2,2 bar (ciśnienie w oponie)", output: "≈ 31,9 psi" },
    { input: "1 atm", output: "≈ 1,013 bar" },
  ],
  faq: [
    { q: "Ile psi ma 1 bar?", a: "Jeden bar to ok. 14,5 psi." },
    { q: "Do czego przydaje się przelicznik ciśnienia?", a: "Najczęściej wykorzystywany jest do przeliczania ciśnienia w oponach samochodowych (psi ↔ bar) oraz w meteorologii (hPa)." },
  ],
};
