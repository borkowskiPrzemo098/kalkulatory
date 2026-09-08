import { CalculatorConfig } from "./types";
import { parseLocaleNumber } from "@/lib/format";

export function przeliczGodzine(godzina: number, minuta: number, przesuniecieGodzin: number): { godzina: number; dzien: "ten sam dzień" | "dzień wcześniej" | "dzień później" } {
  let calkowiteMinuty = godzina * 60 + minuta + przesuniecieGodzin * 60;
  let dzienOffset = 0;
  const minutWDobie = 24 * 60;
  while (calkowiteMinuty < 0) {
    calkowiteMinuty += minutWDobie;
    dzienOffset -= 1;
  }
  while (calkowiteMinuty >= minutWDobie) {
    calkowiteMinuty -= minutWDobie;
    dzienOffset += 1;
  }
  const dzien = dzienOffset === 0 ? "ten sam dzień" : dzienOffset > 0 ? "dzień później" : "dzień wcześniej";
  return { godzina: calkowiteMinuty / 60, dzien };
}

function formatGodzina(godzinaDziesietna: number): string {
  const g = Math.floor(godzinaDziesietna);
  const m = Math.round((godzinaDziesietna - g) * 60);
  return `${g.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function calculate(values: Record<string, string>) {
  const godzina = parseLocaleNumber(values.godzina);
  const minuta = parseLocaleNumber(values.minuta) || 0;
  const przesuniecie = parseLocaleNumber(values.przesuniecie);

  if (Number.isNaN(godzina)) return { results: [], error: "Podaj godzinę." };
  if (godzina < 0 || godzina > 23) return { results: [], error: "Godzina musi być z zakresu 0–23." };
  if (Number.isNaN(minuta) || minuta < 0 || minuta > 59) return { results: [], error: "Minuty muszą być z zakresu 0–59." };
  if (Number.isNaN(przesuniecie)) return { results: [], error: "Podaj przesunięcie strefy czasowej w godzinach." };

  const { godzina: wynikGodzina, dzien } = przeliczGodzine(godzina, minuta, przesuniecie);

  return {
    results: [
      { label: "Godzina w drugiej strefie", value: formatGodzina(wynikGodzina), highlight: true },
      { label: "Dzień", value: dzien },
    ],
  };
}

export const strefyCzasoweConfig: CalculatorConfig = {
  slug: "strefy-czasowe",
  name: "Przelicznik stref czasowych",
  shortName: "Strefy czasowe",
  shortDescription: "Przelicz godzinę na inną strefę czasową na podstawie różnicy godzin.",
  metaDescription: "Przelicznik stref czasowych online: przelicz godzinę z jednej strefy czasowej na inną na podstawie ręcznie podanego przesunięcia godzinowego.",
  category: "czas-i-data",
  tags: ["strefa czasowa", "godzina", "czas", "podróże", "czas i data"],
  fields: [
    { id: "godzina", label: "Godzina", type: "number", defaultValue: "12" },
    { id: "minuta", label: "Minuta", type: "number", defaultValue: "0" },
    { id: "przesuniecie", label: "Różnica stref czasowych", type: "number", unit: "godz.", defaultValue: "-6", helpText: "Podaj różnicę w godzinach między strefą docelową a źródłową (może być ujemna)." },
  ],
  calculate,
  intro:
    "Przelicznik stref czasowych pozwala szybko obliczyć, która godzina jest w innej strefie czasowej, na podstawie podanej ręcznie różnicy godzinowej między strefami — bez potrzeby korzystania z zewnętrznych baz stref czasowych.",
  howTo: ["Podaj aktualną godzinę i minutę w strefie źródłowej.", "Podaj różnicę godzin między strefą docelową a źródłową (np. -6 dla Nowego Jorku względem Warszawy w okresie zimowym).", "Wynik pokaże godzinę w drugiej strefie oraz informację, czy to ten sam dzień."],
  formula: "Godzina docelowa = godzina źródłowa + różnica stref czasowych (z uwzględnieniem przejścia przez północ).",
  examples: [{ input: "12:00, różnica −6 godzin", output: "06:00, ten sam dzień" }],
  faq: [
    {
      q: "Skąd wziąć różnicę godzin między strefami?",
      a: "Różnicę czasu między konkretnymi miastami czy krajami można sprawdzić w dowolnym źródle podającym aktualne przesunięcia stref czasowych (pamiętaj, że część krajów zmienia czas na letni/zimowy).",
    },
    {
      q: "Czy kalkulator uwzględnia automatycznie czas letni/zimowy?",
      a: "Nie — różnicę godzin (uwzględniającą ewentualny czas letni) należy podać samodzielnie, ponieważ zależy ona od aktualnie obowiązujących w danym kraju przepisów.",
    },
  ],
};
