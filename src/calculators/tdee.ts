import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function bmrMifflinStJeor(wagaKg: number, wzrostCm: number, wiekLat: number, plec: "m" | "k"): number {
  const baza = 10 * wagaKg + 6.25 * wzrostCm - 5 * wiekLat;
  return plec === "m" ? baza + 5 : baza - 161;
}

const WSPOLCZYNNIKI_AKTYWNOSCI: Record<string, number> = {
  "1.2": 1.2,
  "1.375": 1.375,
  "1.55": 1.55,
  "1.725": 1.725,
  "1.9": 1.9,
};

export function tdee(bmr: number, wspolczynnikAktywnosci: number): number {
  return bmr * wspolczynnikAktywnosci;
}

function calculate(values: Record<string, string>) {
  const waga = parseLocaleNumber(values.waga);
  const wzrost = parseLocaleNumber(values.wzrost);
  const wiek = parseLocaleNumber(values.wiek);
  const plec = values.plec === "k" ? "k" : "m";
  const aktywnosc = WSPOLCZYNNIKI_AKTYWNOSCI[values.aktywnosc] ?? NaN;

  if ([waga, wzrost, wiek].some((v) => Number.isNaN(v)) || Number.isNaN(aktywnosc)) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (waga <= 0 || wzrost <= 0 || wiek <= 0) return { results: [], error: "Waga, wzrost i wiek muszą być większe od zera." };

  const bmrWartosc = bmrMifflinStJeor(waga, wzrost, wiek, plec);
  const tdeeWartosc = tdee(bmrWartosc, aktywnosc);

  return {
    results: [
      { label: "TDEE — całkowite zapotrzebowanie kaloryczne", value: `${formatNumber(tdeeWartosc, 0)} kcal/dzień`, highlight: true },
      { label: "BMR — podstawowa przemiana materii", value: `${formatNumber(bmrWartosc, 0)} kcal/dzień` },
    ],
  };
}

export const tdeeConfig: CalculatorConfig = {
  slug: "tdee",
  name: "Kalkulator TDEE (zapotrzebowanie kaloryczne)",
  shortName: "TDEE",
  shortDescription: "Oblicz całkowite dobowe zapotrzebowanie kaloryczne uwzględniające aktywność fizyczną.",
  metaDescription: "Kalkulator TDEE online: oblicz całkowite dobowe zapotrzebowanie kaloryczne (BMR × poziom aktywności) metodą Mifflin-St Jeor.",
  category: "zdrowie",
  tags: ["tdee", "kalorie", "dieta", "zdrowie", "bmr", "odchudzanie"],
  popular: true,
  fields: [
    {
      id: "plec",
      label: "Płeć",
      type: "select",
      defaultValue: "m",
      options: [
        { value: "m", label: "Mężczyzna" },
        { value: "k", label: "Kobieta" },
      ],
    },
    { id: "waga", label: "Waga", type: "number", unit: "kg", defaultValue: "80" },
    { id: "wzrost", label: "Wzrost", type: "number", unit: "cm", defaultValue: "180" },
    { id: "wiek", label: "Wiek", type: "number", unit: "lat", defaultValue: "30" },
    {
      id: "aktywnosc",
      label: "Poziom aktywności fizycznej",
      type: "select",
      defaultValue: "1.55",
      options: [
        { value: "1.2", label: "Brak/minimalna aktywność" },
        { value: "1.375", label: "Lekka aktywność (1-3x/tydz.)" },
        { value: "1.55", label: "Umiarkowana aktywność (3-5x/tydz.)" },
        { value: "1.725", label: "Wysoka aktywność (6-7x/tydz.)" },
        { value: "1.9", label: "Bardzo wysoka aktywność / praca fizyczna" },
      ],
    },
  ],
  calculate,
  intro:
    "TDEE (Total Daily Energy Expenditure) to całkowite dobowe zapotrzebowanie kaloryczne — liczba kalorii, jaką organizm zużywa w ciągu dnia z uwzględnieniem podstawowej przemiany materii i aktywności fizycznej. Wynik jest orientacyjny i nie zastępuje konsultacji z dietetykiem.",
  howTo: [
    "Podaj płeć, wagę, wzrost i wiek.",
    "Wybierz poziom aktywności fizycznej najlepiej opisujący Twój styl życia.",
    "Wynik pokaże BMR oraz TDEE.",
  ],
  formula:
    "BMR (Mifflin-St Jeor): mężczyźni = 10×waga + 6,25×wzrost − 5×wiek + 5. Kobiety = 10×waga + 6,25×wzrost − 5×wiek − 161. TDEE = BMR × współczynnik aktywności.",
  examples: [
    { input: "Mężczyzna, 80 kg, 180 cm, 30 lat, aktywność umiarkowana", output: "TDEE ≈ 2759 kcal/dzień" },
    { input: "Kobieta, 65 kg, 165 cm, 28 lat", output: "BMR ≈ 1380 kcal/dzień" },
  ],
  faq: [
    {
      q: "Jak wykorzystać wynik TDEE do odchudzania lub budowania masy?",
      a: "Aby schudnąć, jedz mniej kalorii niż wynosi TDEE (deficyt), aby przybrać na masie — więcej (nadwyżka). Wynik ma charakter orientacyjny — skonsultuj plan żywieniowy z dietetykiem lub lekarzem.",
    },
    {
      q: "Czy wynik jest dokładny?",
      a: "To szacunek oparty na popularnym wzorze Mifflin-St Jeor. Rzeczywiste zapotrzebowanie zależy też od indywidualnego metabolizmu, składu ciała i innych czynników.",
    },
  ],
};
