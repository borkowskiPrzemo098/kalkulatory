import { CalculatorConfig } from "./types";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/format";

export function rocznyOdpis(wartoscPoczatkowa: number, stawkaProcentowa: number): number {
  return (wartoscPoczatkowa * stawkaProcentowa) / 100;
}

export function okresAmortyzacjiLat(stawkaProcentowa: number): number {
  return 100 / stawkaProcentowa;
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const stawka = parseLocaleNumber(values.stawka);

  if ([wartosc, stawka].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (wartosc < 0) return { results: [], error: "Wartość początkowa nie może być ujemna." };
  if (stawka <= 0) return { results: [], error: "Stawka amortyzacji musi być większa od zera." };

  const roczny = rocznyOdpis(wartosc, stawka);
  const miesieczny = roczny / 12;
  const okres = okresAmortyzacjiLat(stawka);

  return {
    results: [
      { label: "Roczny odpis amortyzacyjny", value: formatCurrency(roczny), highlight: true },
      { label: "Miesięczny odpis amortyzacyjny", value: formatCurrency(miesieczny) },
      { label: "Okres pełnej amortyzacji", value: `${formatNumber(okres, 1)} lat` },
    ],
  };
}

export const amortyzacjaSrodkaTrwalegoConfig: CalculatorConfig = {
  slug: "amortyzacja-srodka-trwalego",
  name: "Kalkulator amortyzacji środka trwałego",
  shortName: "Amortyzacja",
  shortDescription: "Oblicz roczny i miesięczny odpis amortyzacyjny metodą liniową.",
  metaDescription: "Kalkulator amortyzacji liniowej środka trwałego: oblicz roczny i miesięczny odpis oraz okres pełnej amortyzacji.",
  category: "finanse",
  tags: ["amortyzacja", "środek trwały", "firma", "księgowość", "finanse"],
  fields: [
    { id: "wartosc", label: "Wartość początkowa środka trwałego", type: "number", unit: "zł", defaultValue: "12000" },
    { id: "stawka", label: "Roczna stawka amortyzacji", type: "number", unit: "%", defaultValue: "20" },
  ],
  calculate,
  intro:
    "Kalkulator amortyzacji liniowej pozwala szybko obliczyć roczny i miesięczny odpis amortyzacyjny środka trwałego na podstawie jego wartości początkowej i rocznej stawki amortyzacji.",
  howTo: [
    "Podaj wartość początkową środka trwałego (cenę nabycia).",
    "Wpisz roczną stawkę amortyzacji zgodną z wykazem stawek amortyzacyjnych.",
    "Wynik pokaże odpis roczny, miesięczny i okres pełnej amortyzacji.",
  ],
  formula: "Roczny odpis = Wartość początkowa × stawka / 100. Okres amortyzacji (lata) = 100 / stawka.",
  examples: [
    { input: "12 000 zł, stawka 20%", output: "2400 zł/rok, 200 zł/mies., okres 5 lat" },
    { input: "50 000 zł, stawka 10%", output: "5000 zł/rok, okres 10 lat" },
  ],
  faq: [
    {
      q: "Czym jest amortyzacja liniowa?",
      a: "To metoda rozliczania kosztu zakupu środka trwałego w czasie, w której co roku odpisuje się taką samą kwotę, obliczoną jako stały procent wartości początkowej.",
    },
    {
      q: "Skąd wziąć stawkę amortyzacji dla mojego środka trwałego?",
      a: "Stawki określa wykaz rocznych stawek amortyzacyjnych będący załącznikiem do ustawy o podatku dochodowym — zależą od rodzaju środka trwałego. Wynik kalkulatora ma charakter orientacyjny, nie stanowi porady podatkowej.",
    },
  ],
};
