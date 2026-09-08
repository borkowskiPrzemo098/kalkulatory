import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function tempoMinNaKm(dystansKm: number, czasMinut: number): number {
  return czasMinut / dystansKm;
}

export function predkoscKmH(dystansKm: number, czasMinut: number): number {
  return dystansKm / (czasMinut / 60);
}

function formatTempo(minutyNaKm: number): string {
  const minuty = Math.floor(minutyNaKm);
  const sekundy = Math.round((minutyNaKm - minuty) * 60);
  const sekundyStr = sekundy.toString().padStart(2, "0");
  return `${minuty}:${sekundyStr} min/km`;
}

function calculate(values: Record<string, string>) {
  const dystans = parseLocaleNumber(values.dystans);
  const godziny = parseLocaleNumber(values.godziny) || 0;
  const minuty = parseLocaleNumber(values.minuty) || 0;
  const sekundy = parseLocaleNumber(values.sekundy) || 0;

  if (Number.isNaN(dystans)) return { results: [], error: "Podaj dystans." };
  if (dystans <= 0) return { results: [], error: "Dystans musi być większy od zera." };
  if ([godziny, minuty, sekundy].some((v) => Number.isNaN(v) || v < 0)) return { results: [], error: "Podaj prawidłowy czas (godziny, minuty, sekundy)." };

  const czasMinut = godziny * 60 + minuty + sekundy / 60;
  if (czasMinut <= 0) return { results: [], error: "Czas musi być większy od zera." };

  const tempo = tempoMinNaKm(dystans, czasMinut);
  const predkosc = predkoscKmH(dystans, czasMinut);

  return {
    results: [
      { label: "Tempo (pace)", value: formatTempo(tempo), highlight: true },
      { label: "Średnia prędkość", value: `${formatNumber(predkosc, 2)} km/h` },
    ],
  };
}

export const tempoBieguConfig: CalculatorConfig = {
  slug: "tempo-biegowe",
  name: "Kalkulator tempa biegowego (pace)",
  shortName: "Tempo biegowe",
  shortDescription: "Oblicz tempo biegu (min/km) i średnią prędkość na podstawie dystansu i czasu.",
  metaDescription: "Kalkulator tempa biegowego (pace) online: oblicz tempo w min/km oraz średnią prędkość na podstawie dystansu i czasu biegu.",
  category: "zdrowie",
  tags: ["bieganie", "tempo", "pace", "prędkość", "trening", "zdrowie"],
  fields: [
    { id: "dystans", label: "Dystans", type: "number", unit: "km", defaultValue: "10" },
    { id: "godziny", label: "Godziny", type: "number", defaultValue: "0" },
    { id: "minuty", label: "Minuty", type: "number", defaultValue: "50" },
    { id: "sekundy", label: "Sekundy", type: "number", defaultValue: "0" },
  ],
  calculate,
  intro:
    "Kalkulator tempa biegowego przelicza pokonany dystans i czas biegu na tempo (min/km) oraz średnią prędkość (km/h) — przydatny do planowania treningów i analizowania wyników.",
  howTo: ["Podaj pokonany dystans w kilometrach.", "Podaj czas biegu (godziny, minuty, sekundy).", "Wynik pokaże tempo w min/km oraz prędkość w km/h."],
  formula: "Tempo (min/km) = czas (min) / dystans (km). Prędkość (km/h) = dystans (km) / czas (h).",
  examples: [
    { input: "10 km w 50 min", output: "5:00 min/km, 12 km/h" },
    { input: "5 km w 25 min", output: "5:00 min/km, 12 km/h" },
  ],
  faq: [
    {
      q: "Co to jest tempo (pace) w bieganiu?",
      a: "Tempo to czas potrzebny na pokonanie jednego kilometra, wyrażony w minutach i sekundach — im niższa wartość, tym szybszy bieg.",
    },
    {
      q: "Jak przeliczyć tempo na prędkość?",
      a: "Prędkość w km/h można obliczyć jako 60 podzielone przez tempo w min/km, np. tempo 5:00 min/km odpowiada prędkości 12 km/h.",
    },
  ],
};
