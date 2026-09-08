import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

const SKLADKA_ZUS_PROC = 13.71; // emerytalna 9,76% + rentowa 1,5% + chorobowa 2,45%
const SKLADKA_ZDROWOTNA_PROC = 9;
const KOSZTY_UZYSKANIA = 250;
const KWOTA_ZMNIEJSZAJACA_MIES = 300;
const STAWKA_PIT_PROC = 12;

export interface WynagrodzenieWynik {
  zus: number;
  zdrowotna: number;
  zaliczkaPit: number;
  netto: number;
}

export function bruttoNaNettoUproszczony(brutto: number): WynagrodzenieWynik {
  const zus = brutto * (SKLADKA_ZUS_PROC / 100);
  const podstawaZdrowotna = brutto - zus;
  const zdrowotna = podstawaZdrowotna * (SKLADKA_ZDROWOTNA_PROC / 100);
  const podstawaOpodatkowania = Math.floor(brutto - zus - KOSZTY_UZYSKANIA);
  const zaliczkaPit = Math.max(0, Math.round(podstawaOpodatkowania * (STAWKA_PIT_PROC / 100)) - KWOTA_ZMNIEJSZAJACA_MIES);
  const netto = brutto - zus - zdrowotna - zaliczkaPit;
  return { zus, zdrowotna, zaliczkaPit, netto };
}

function calculate(values: Record<string, string>) {
  const brutto = parseLocaleNumber(values.brutto);

  if (Number.isNaN(brutto)) return { results: [], error: "Podaj wynagrodzenie brutto." };
  if (brutto < 0) return { results: [], error: "Wynagrodzenie nie może być ujemne." };

  const wynik = bruttoNaNettoUproszczony(brutto);

  return {
    results: [
      { label: "Wynagrodzenie netto (na rękę)", value: formatCurrency(wynik.netto), highlight: true },
      { label: "Składki ZUS (pracownik)", value: formatCurrency(wynik.zus) },
      { label: "Składka zdrowotna", value: formatCurrency(wynik.zdrowotna) },
      { label: "Zaliczka na podatek PIT", value: formatCurrency(wynik.zaliczkaPit) },
    ],
  };
}

export const wynagrodzenieNettoBruttoConfig: CalculatorConfig = {
  slug: "wynagrodzenie-netto-brutto",
  name: "Kalkulator wynagrodzenia netto/brutto",
  shortName: "Wynagrodzenie netto",
  shortDescription: "Uproszczone przeliczenie pensji brutto na kwotę netto na rękę dla umowy o pracę.",
  metaDescription: "Kalkulator wynagrodzenia netto z brutto: uproszczone przeliczenie pensji z umowy o pracę z uwzględnieniem ZUS i zaliczki na PIT.",
  category: "finanse",
  tags: ["wynagrodzenie", "netto", "brutto", "pensja", "zus", "pit", "finanse"],
  popular: true,
  fields: [{ id: "brutto", label: "Wynagrodzenie brutto", type: "number", unit: "zł", defaultValue: "5000" }],
  calculate,
  intro:
    "Kalkulator przelicza wynagrodzenie brutto z umowy o pracę na kwotę netto wypłacaną na rękę, uwzględniając w uproszczony sposób składki ZUS finansowane przez pracownika, składkę zdrowotną oraz zaliczkę na podatek dochodowy (PIT, drugi próg podatkowy pominięty).",
  howTo: ["Wpisz kwotę wynagrodzenia brutto z umowy o pracę.", "Wynik pokaże orientacyjną kwotę netto oraz rozbicie na składki i podatek."],
  formula:
    "ZUS ≈ 13,71% brutto. Zdrowotna = 9% × (brutto − ZUS). Zaliczka PIT = 12% × (brutto − ZUS − 250 zł) − 300 zł (kwota zmniejszająca, nie mniej niż 0). Netto = brutto − ZUS − zdrowotna − zaliczka PIT.",
  examples: [
    { input: "5000 zł brutto", output: "≈ 3738,20 zł netto" },
    { input: "8000 zł brutto", output: "≈ 5783,91 zł netto" },
  ],
  faq: [
    {
      q: "Czy to dokładne wyliczenie listy płac?",
      a: "Nie. To uproszczone przybliżenie dla standardowej umowy o pracę bez ulg, drugiego progu podatkowego, PPK czy indywidualnych okoliczności. Dokładną kwotę wylicza dział kadr lub kalkulator ZUS/urzędu skarbowego — wynik nie stanowi porady podatkowej.",
    },
    {
      q: "Czy kalkulator uwzględnia drugi próg podatkowy (32%)?",
      a: "Nie, zakłada stawkę 12% obowiązującą do pierwszego progu podatkowego, co dotyczy większości typowych wynagrodzeń.",
    },
    {
      q: "Czy wynik uwzględnia PPK?",
      a: "Nie, kalkulator nie odlicza wpłat na Pracownicze Plany Kapitałowe — jeśli jesteś ich uczestnikiem, rzeczywiste netto będzie niższe.",
    },
  ],
};
