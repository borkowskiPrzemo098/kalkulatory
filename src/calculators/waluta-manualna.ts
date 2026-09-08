import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function przeliczWaluteRecznymKursem(kwota: number, kurs: number): number {
  return kwota * kurs;
}

const WALUTY = [
  { value: "PLN", label: "PLN — polski złoty" },
  { value: "EUR", label: "EUR — euro" },
  { value: "USD", label: "USD — dolar amerykański" },
  { value: "GBP", label: "GBP — funt brytyjski" },
  { value: "CHF", label: "CHF — frank szwajcarski" },
  { value: "CZK", label: "CZK — korona czeska" },
  { value: "INNA", label: "Inna waluta" },
];

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const kurs = parseLocaleNumber(values.kurs);
  const walutaZ = values.walutaZ || "WALUTA A";
  const walutaNa = values.walutaNa || "WALUTA B";

  if ([kwota, kurs].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj kwotę i kurs wymiany." };
  if (kwota < 0) return { results: [], error: "Kwota nie może być ujemna." };
  if (kurs <= 0) return { results: [], error: "Kurs wymiany musi być większy od zera." };

  const wynik = przeliczWaluteRecznymKursem(kwota, kurs);

  return {
    results: [
      { label: `Kwota w walucie ${walutaNa}`, value: `${formatNumber(wynik, 2)} ${walutaNa}`, highlight: true },
      { label: "Zastosowany kurs", value: `1 ${walutaZ} = ${formatNumber(kurs, 4)} ${walutaNa}` },
    ],
  };
}

export const walutaManualnaConfig: CalculatorConfig = {
  slug: "waluta-manualna",
  name: "Przelicznik walut (własny kurs)",
  shortName: "Przelicznik walut",
  shortDescription: "Przelicz kwotę między walutami, wpisując własny (aktualny) kurs wymiany.",
  metaDescription: "Przelicznik walut online z ręcznie wpisywanym kursem: przelicz kwotę na inną walutę, podając samodzielnie aktualny kurs wymiany.",
  category: "przeliczniki",
  tags: ["waluta", "kurs walut", "przelicznik", "pieniądze"],
  fields: [
    { id: "kwota", label: "Kwota", type: "number", defaultValue: "100" },
    { id: "walutaZ", label: "Waluta źródłowa", type: "select", defaultValue: "PLN", options: WALUTY },
    { id: "walutaNa", label: "Waluta docelowa", type: "select", defaultValue: "EUR", options: WALUTY },
    { id: "kurs", label: "Kurs wymiany (ile jednostki docelowej za 1 jednostkę źródłową)", type: "number", defaultValue: "0.23" },
  ],
  calculate,
  intro:
    "Ten przelicznik walut nie korzysta z zewnętrznych, automatycznie aktualizowanych kursów — pozwala samodzielnie wpisać aktualny kurs wymiany (np. sprawdzony w banku lub kantorze) i szybko przeliczyć kwotę na inną walutę.",
  howTo: [
    "Podaj kwotę do przeliczenia oraz kody walut (np. PLN, EUR, USD) — pola informacyjne, możesz wpisać dowolny tekst.",
    "Podaj aktualny kurs wymiany: ile jednostek waluty docelowej odpowiada jednej jednostce waluty źródłowej.",
    "Wynik pokaże przeliczoną kwotę.",
  ],
  formula: "Kwota w walucie docelowej = kwota × kurs wymiany.",
  examples: [{ input: "100 PLN, kurs 1 PLN = 0,23 EUR", output: "23 EUR" }],
  faq: [
    {
      q: "Dlaczego kurs trzeba wpisać ręcznie?",
      a: "Kalkulator działa w pełni lokalnie, bez łączenia się z płatnymi zewnętrznymi serwisami walutowymi — dzięki temu jest szybki i niezależny, ale wymaga samodzielnego sprawdzenia aktualnego kursu, np. w banku lub kantorze.",
    },
    {
      q: "Czy wynik uwzględnia prowizję kantoru lub banku?",
      a: "Nie, wynik to czysta matematyka mnożenia przez podany kurs. Rzeczywista kwota po wymianie w banku lub kantorze może być niższa ze względu na spread i prowizje.",
    },
  ],
};
