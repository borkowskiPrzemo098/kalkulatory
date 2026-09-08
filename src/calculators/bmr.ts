import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Wzór Mifflina-St Jeora
export function obliczBMR(masaKg: number, wzrostCm: number, wiekLat: number, plec: "kobieta" | "mezczyzna"): number {
  const baza = 10 * masaKg + 6.25 * wzrostCm - 5 * wiekLat;
  return plec === "mezczyzna" ? baza + 5 : baza - 161;
}

const AKTYWNOSC_MNOZNIKI: Record<string, number> = {
  niska: 1.2,
  lekka: 1.375,
  umiarkowana: 1.55,
  wysoka: 1.725,
  bardzo_wysoka: 1.9,
};

function calculate(values: Record<string, string>) {
  const masa = parseLocaleNumber(values.masa);
  const wzrost = parseLocaleNumber(values.wzrost);
  const wiek = parseLocaleNumber(values.wiek);
  const plec = values.plec === "kobieta" ? "kobieta" : "mezczyzna";
  const aktywnosc = values.aktywnosc || "umiarkowana";

  if ([masa, wzrost, wiek].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij masę ciała, wzrost i wiek." };
  }
  if (masa <= 0 || masa > 500) return { results: [], error: "Podaj realistyczną masę ciała." };
  if (wzrost <= 0 || wzrost > 260) return { results: [], error: "Podaj realistyczny wzrost." };
  if (wiek <= 0 || wiek > 120) return { results: [], error: "Podaj realistyczny wiek." };

  const bmr = obliczBMR(masa, wzrost, wiek, plec);
  const mnoznik = AKTYWNOSC_MNOZNIKI[aktywnosc] ?? 1.55;
  const cpm = bmr * mnoznik;

  return {
    results: [
      { label: "BMR (metabolizm spoczynkowy)", value: `${formatNumber(bmr, 0)} kcal/dobę`, highlight: true },
      { label: "Szacowane zapotrzebowanie całkowite (CPM)", value: `${formatNumber(cpm, 0)} kcal/dobę` },
    ],
  };
}

export const bmrConfig: CalculatorConfig = {
  slug: "bmr",
  name: "Kalkulator BMR",
  shortName: "BMR",
  shortDescription: "Oblicz podstawową przemianę materii (BMR) wzorem Mifflina-St Jeora oraz całkowite zapotrzebowanie kaloryczne.",
  metaDescription:
    "Kalkulator BMR online (wzór Mifflina-St Jeora): oblicz podstawowe zapotrzebowanie kaloryczne i całkowite zapotrzebowanie energetyczne z uwzględnieniem aktywności fizycznej.",
  category: "zdrowie",
  tags: ["bmr", "metabolizm", "kalorie", "zapotrzebowanie kaloryczne", "zdrowie"],
  fields: [
    {
      id: "plec",
      label: "Płeć",
      type: "select",
      defaultValue: "kobieta",
      options: [
        { value: "kobieta", label: "Kobieta" },
        { value: "mezczyzna", label: "Mężczyzna" },
      ],
    },
    { id: "wiek", label: "Wiek", type: "number", unit: "lat", defaultValue: "30" },
    { id: "masa", label: "Masa ciała", type: "number", unit: "kg", defaultValue: "65" },
    { id: "wzrost", label: "Wzrost", type: "number", unit: "cm", defaultValue: "168" },
    {
      id: "aktywnosc",
      label: "Poziom aktywności fizycznej",
      type: "select",
      defaultValue: "umiarkowana",
      options: [
        { value: "niska", label: "Bardzo niska (praca siedząca, brak ruchu)" },
        { value: "lekka", label: "Lekka (1-3 treningi/tydzień)" },
        { value: "umiarkowana", label: "Umiarkowana (3-5 treningów/tydzień)" },
        { value: "wysoka", label: "Wysoka (6-7 treningów/tydzień)" },
        { value: "bardzo_wysoka", label: "Bardzo wysoka (praca fizyczna + treningi)" },
      ],
    },
  ],
  calculate,
  intro:
    "BMR (Basal Metabolic Rate) to ilość energii, jakiej organizm potrzebuje w spoczynku do podtrzymania podstawowych funkcji życiowych. Kalkulator wykorzystuje wzór Mifflina-St Jeora, uznawany za jeden z najdokładniejszych, oraz szacuje całkowite zapotrzebowanie kaloryczne (CPM) na podstawie poziomu aktywności fizycznej.",
  howTo: [
    "Wybierz płeć, wpisz wiek, masę ciała i wzrost.",
    "Wybierz poziom aktywności fizycznej.",
    "Odczytaj BMR oraz szacowane całkowite zapotrzebowanie kaloryczne.",
  ],
  formula:
    "Mężczyźni: BMR = 10 × masa[kg] + 6,25 × wzrost[cm] − 5 × wiek + 5. Kobiety: BMR = 10 × masa[kg] + 6,25 × wzrost[cm] − 5 × wiek − 161. CPM = BMR × współczynnik aktywności.",
  examples: [{ input: "Kobieta, 30 lat, 65 kg, 168 cm, aktywność umiarkowana", output: "BMR ≈ 1 401 kcal, CPM ≈ 2 172 kcal" }],
  faq: [
    {
      q: "Czym różni się BMR od CPM?",
      a: "BMR to zapotrzebowanie energetyczne w całkowitym spoczynku, a CPM (całkowita przemiana materii) uwzględnia dodatkowo codzienną aktywność fizyczną.",
    },
    {
      q: "Czy wynik BMR jest dokładny co do kalorii?",
      a: "Wzór Mifflina-St Jeora daje dobre przybliżenie, ale rzeczywiste zapotrzebowanie zależy też od składu ciała, genetyki i stanu zdrowia. Wynik ma charakter orientacyjny.",
    },
  ],
};
