import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function odsetkiZaOpoznienie(kwota: number, stawkaRoczna: number, dni: number): number {
  return (kwota * (stawkaRoczna / 100) * dni) / 365;
}

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const stawka = parseLocaleNumber(values.stawka);
  const dni = parseLocaleNumber(values.dni);

  if ([kwota, stawka, dni].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (kwota < 0) return { results: [], error: "Kwota zaległości nie może być ujemna." };
  if (stawka < 0) return { results: [], error: "Stawka odsetek nie może być ujemna." };
  if (dni < 0) return { results: [], error: "Liczba dni opóźnienia nie może być ujemna." };

  const odsetki = odsetkiZaOpoznienie(kwota, stawka, dni);

  return {
    results: [
      { label: "Odsetki za opóźnienie", value: formatCurrency(odsetki), highlight: true },
      { label: "Kwota z odsetkami", value: formatCurrency(kwota + odsetki) },
    ],
  };
}

export const odsetkiUstawoweConfig: CalculatorConfig = {
  slug: "odsetki-ustawowe",
  name: "Kalkulator odsetek ustawowych za opóźnienie",
  shortName: "Odsetki za opóźnienie",
  shortDescription: "Oblicz wysokość odsetek za opóźnienie w płatności przy podanej stawce rocznej.",
  metaDescription: "Kalkulator odsetek za opóźnienie w płatności: podaj kwotę, stawkę roczną i liczbę dni zwłoki, aby obliczyć należne odsetki.",
  category: "finanse",
  tags: ["odsetki", "opóźnienie", "faktura", "finanse", "windykacja"],
  fields: [
    { id: "kwota", label: "Kwota zaległości", type: "number", unit: "zł", defaultValue: "1000" },
    {
      id: "stawka",
      label: "Roczna stawka odsetek",
      type: "number",
      unit: "%",
      defaultValue: "11.5",
      helpText: "Wpisz obowiązującą stawkę odsetek ustawowych lub umownych — sprawdź aktualną wysokość, ponieważ zmienia się okresowo.",
    },
    { id: "dni", label: "Liczba dni opóźnienia", type: "number", defaultValue: "30" },
  ],
  calculate,
  intro:
    "Kalkulator pozwala obliczyć wysokość odsetek naliczanych za nieterminową zapłatę (np. za fakturę), na podstawie kwoty zaległości, rocznej stawki procentowej i liczby dni opóźnienia.",
  howTo: [
    "Podaj kwotę zaległej płatności.",
    "Wpisz roczną stawkę odsetek — sprawdź aktualnie obowiązującą stawkę odsetek ustawowych.",
    "Podaj liczbę dni opóźnienia w zapłacie.",
  ],
  formula: "Odsetki = Kwota × (stawka roczna / 100) × liczba dni / 365.",
  examples: [
    { input: "1000 zł, stawka 11,5%, 30 dni", output: "≈ 9,45 zł odsetek" },
    { input: "5000 zł, stawka 12%, 90 dni", output: "≈ 147,95 zł odsetek" },
  ],
  faq: [
    {
      q: "Jaka jest wysokość odsetek ustawowych za opóźnienie?",
      a: "Stawka odsetek ustawowych zmienia się okresowo w zależności od stopy referencyjnej NBP — przed obliczeniem sprawdź jej aktualną wysokość. Wynik kalkulatora ma charakter orientacyjny i nie stanowi porady prawnej.",
    },
    {
      q: "Czy kalkulator uwzględnia lata przestępne?",
      a: "Nie, do uproszczenia obliczeń przyjęto rok liczący 365 dni, co jest standardową praktyką w tego typu wyliczeniach orientacyjnych.",
    },
  ],
};
