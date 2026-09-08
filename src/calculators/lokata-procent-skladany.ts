import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function wartoscKoncowaLokaty(kapital: number, oprocentowanieRoczne: number, lata: number, kapitalizacjeRocznie: number): number {
  const n = kapitalizacjeRocznie;
  const r = oprocentowanieRoczne / 100;
  return kapital * Math.pow(1 + r / n, n * lata);
}

function calculate(values: Record<string, string>) {
  const kapital = parseLocaleNumber(values.kapital);
  const oprocentowanie = parseLocaleNumber(values.oprocentowanie);
  const lata = parseLocaleNumber(values.lata);
  const kapitalizacja = parseLocaleNumber(values.kapitalizacja);

  if ([kapital, oprocentowanie, lata, kapitalizacja].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (kapital < 0) return { results: [], error: "Wpłacony kapitał nie może być ujemny." };
  if (oprocentowanie < 0) return { results: [], error: "Oprocentowanie nie może być ujemne." };
  if (lata <= 0) return { results: [], error: "Liczba lat musi być większa od zera." };

  const koncowa = wartoscKoncowaLokaty(kapital, oprocentowanie, lata, kapitalizacja);
  const zysk = koncowa - kapital;

  return {
    results: [
      { label: "Kwota końcowa", value: formatCurrency(koncowa), highlight: true },
      { label: "Zysk odsetkowy", value: formatCurrency(zysk) },
      { label: "Wpłacony kapitał", value: formatCurrency(kapital) },
    ],
  };
}

export const lokataProcentSkladanyConfig: CalculatorConfig = {
  slug: "lokata-procent-skladany",
  name: "Kalkulator lokaty (procent składany)",
  shortName: "Lokata / procent składany",
  shortDescription: "Oblicz, ile zarobisz na lokacie dzięki procentowi składanemu.",
  metaDescription: "Kalkulator lokaty online: oblicz wartość końcową oszczędności z procentem składanym przy różnej częstotliwości kapitalizacji.",
  category: "finanse",
  tags: ["lokata", "oszczędności", "procent składany", "finanse", "inwestycje"],
  fields: [
    { id: "kapital", label: "Wpłacony kapitał", type: "number", unit: "zł", defaultValue: "10000" },
    { id: "oprocentowanie", label: "Oprocentowanie roczne", type: "number", unit: "%", defaultValue: "5" },
    { id: "lata", label: "Okres oszczędzania", type: "number", unit: "lat", defaultValue: "3" },
    {
      id: "kapitalizacja",
      label: "Częstotliwość kapitalizacji odsetek",
      type: "select",
      defaultValue: "12",
      options: [
        { value: "1", label: "Roczna" },
        { value: "4", label: "Kwartalna" },
        { value: "12", label: "Miesięczna" },
        { value: "365", label: "Dzienna" },
      ],
    },
  ],
  calculate,
  intro:
    "Kalkulator lokaty pokazuje, ile pieniędzy zgromadzisz dzięki oprocentowaniu i efektowi procentu składanego — odsetki są doliczane do kapitału i same zaczynają procentować.",
  howTo: [
    "Podaj wpłacany kapitał i roczne oprocentowanie lokaty.",
    "Wybierz okres oszczędzania w latach oraz częstotliwość kapitalizacji odsetek.",
    "Wynik pokaże kwotę końcową oraz sam zysk odsetkowy.",
  ],
  formula: "Kwota końcowa = Kapitał × (1 + oprocentowanie/n)^(n × lata), gdzie n to liczba kapitalizacji w roku.",
  examples: [
    { input: "10 000 zł, 5% rocznie, 3 lata, kapitalizacja roczna", output: "≈ 11 576,25 zł" },
    { input: "1000 zł, 12% rocznie, 1 rok, kapitalizacja miesięczna", output: "≈ 1126,83 zł" },
  ],
  faq: [
    {
      q: "Co to jest procent składany?",
      a: "To mechanizm, w którym naliczone odsetki dopisywane są do kapitału i w kolejnym okresie same zaczynają procentować, dzięki czemu zysk rośnie szybciej niż przy odsetkach prostych.",
    },
    {
      q: "Czy częstsza kapitalizacja zawsze daje więcej zysku?",
      a: "Tak, przy tym samym oprocentowaniu nominalnym częstsza kapitalizacja (np. miesięczna zamiast rocznej) daje nieznacznie wyższy zysk końcowy.",
    },
    {
      q: "Czy wynik uwzględnia podatek Belki?",
      a: "Nie, kalkulator pokazuje zysk brutto przed opodatkowaniem 19% podatkiem od zysków kapitałowych.",
    },
  ],
};
