import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function tetnoKarvonen(wiek: number, tetnoSpoczynkowe: number, intensywnoscProc: number): number {
  const hrMax = 220 - wiek;
  return (hrMax - tetnoSpoczynkowe) * (intensywnoscProc / 100) + tetnoSpoczynkowe;
}

function calculate(values: Record<string, string>) {
  const wiek = parseLocaleNumber(values.wiek);
  const spoczynkowe = parseLocaleNumber(values.spoczynkowe);

  if ([wiek, spoczynkowe].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (wiek <= 0 || wiek > 120) return { results: [], error: "Podaj prawidłowy wiek." };
  if (spoczynkowe <= 0 || spoczynkowe > 220) return { results: [], error: "Podaj prawidłowe tętno spoczynkowe." };

  const hrMax = 220 - wiek;
  const strefy = [
    { label: "Strefa 1 — regeneracja (50–60% HRmax)", min: 50, max: 60 },
    { label: "Strefa 2 — spalanie tłuszczu (60–70% HRmax)", min: 60, max: 70 },
    { label: "Strefa 3 — wytrzymałość tlenowa (70–80% HRmax)", min: 70, max: 80 },
    { label: "Strefa 4 — próg beztlenowy (80–90% HRmax)", min: 80, max: 90 },
    { label: "Strefa 5 — maksymalna (90–100% HRmax)", min: 90, max: 100 },
  ];

  const results = [
    { label: "Tętno maksymalne (szacunkowo)", value: `${formatNumber(hrMax, 0)} ud./min`, highlight: true },
    ...strefy.map((s) => ({
      label: s.label,
      value: `${formatNumber(tetnoKarvonen(wiek, spoczynkowe, s.min), 0)}–${formatNumber(tetnoKarvonen(wiek, spoczynkowe, s.max), 0)} ud./min`,
    })),
  ];

  return { results };
}

export const tetnoTreningoweConfig: CalculatorConfig = {
  slug: "tetno-treningowe",
  name: "Kalkulator tętna treningowego",
  shortName: "Tętno treningowe",
  shortDescription: "Wyznacz strefy tętna treningowego metodą Karvonena.",
  metaDescription: "Kalkulator tętna treningowego online: oblicz strefy tętna (spalanie tłuszczu, wytrzymałość, próg beztlenowy) metodą Karvonena.",
  category: "zdrowie",
  tags: ["tętno", "trening", "zdrowie", "bieganie", "kardio"],
  fields: [
    { id: "wiek", label: "Wiek", type: "number", unit: "lat", defaultValue: "30" },
    { id: "spoczynkowe", label: "Tętno spoczynkowe", type: "number", unit: "ud./min", defaultValue: "60" },
  ],
  calculate,
  intro:
    "Kalkulator wyznacza strefy tętna treningowego metodą Karvonena, uwzględniającą tętno spoczynkowe — dzięki temu strefy są dopasowane indywidualnie, a nie tylko do wieku.",
  howTo: ["Podaj swój wiek.", "Podaj tętno spoczynkowe (zmierzone rano, przed wstaniem z łóżka).", "Wynik pokaże tętno maksymalne i zakresy poszczególnych stref treningowych."],
  formula: "HRmax = 220 − wiek. Tętno w strefie = (HRmax − tętno spoczynkowe) × intensywność% + tętno spoczynkowe (wzór Karvonena).",
  examples: [{ input: "30 lat, tętno spoczynkowe 60", output: "HRmax = 190, strefa 3 (70–80%): 151–164 ud./min" }],
  faq: [
    {
      q: "Czym różni się metoda Karvonena od prostego procentu HRmax?",
      a: "Metoda Karvonena uwzględnia rezerwę tętna (różnicę między tętnem maksymalnym a spoczynkowym), co daje dokładniejsze, bardziej zindywidualizowane strefy niż liczenie samego procentu HRmax.",
    },
    {
      q: "Czy wynik zastępuje konsultację z lekarzem lub trenerem?",
      a: "Nie. To orientacyjne wyliczenie — osoby z chorobami serca lub rozpoczynające intensywny trening powinny skonsultować się z lekarzem.",
    },
  ],
};
