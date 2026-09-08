import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export interface LeasingWynik {
  kwotaFinansowana: number;
  wartoscWykupu: number;
  rataKapitalowa: number;
  odsetkiMiesieczne: number;
  rataMiesieczna: number;
}

export function obliczLeasing(
  wartoscPrzedmiotu: number,
  wplataWlasnaProc: number,
  wykupProc: number,
  okresMiesiecy: number,
  oprocentowanieRoczne: number
): LeasingWynik {
  const kwotaFinansowana = wartoscPrzedmiotu * (1 - wplataWlasnaProc / 100);
  const wartoscWykupu = wartoscPrzedmiotu * (wykupProc / 100);
  const rataKapitalowa = (kwotaFinansowana - wartoscWykupu) / okresMiesiecy;
  const odsetkiMiesieczne = (kwotaFinansowana * oprocentowanieRoczne) / 100 / 12;
  return {
    kwotaFinansowana,
    wartoscWykupu,
    rataKapitalowa,
    odsetkiMiesieczne,
    rataMiesieczna: rataKapitalowa + odsetkiMiesieczne,
  };
}

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const wplata = parseLocaleNumber(values.wplata);
  const wykup = parseLocaleNumber(values.wykup);
  const okres = parseLocaleNumber(values.okres);
  const oprocentowanie = parseLocaleNumber(values.oprocentowanie);

  if ([wartosc, wplata, wykup, okres, oprocentowanie].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (wartosc <= 0) return { results: [], error: "Wartość przedmiotu musi być większa od zera." };
  if (wplata < 0 || wplata > 100) return { results: [], error: "Wpłata własna musi być z zakresu 0–100%." };
  if (wykup < 0 || wykup > 100) return { results: [], error: "Wartość wykupu musi być z zakresu 0–100%." };
  if (okres <= 0) return { results: [], error: "Okres leasingu musi być większy od zera." };
  if (oprocentowanie < 0) return { results: [], error: "Oprocentowanie nie może być ujemne." };

  const wynik = obliczLeasing(wartosc, wplata, wykup, okres, oprocentowanie);

  return {
    results: [
      { label: "Rata miesięczna (orientacyjnie)", value: formatCurrency(wynik.rataMiesieczna), highlight: true },
      { label: "Kwota finansowana", value: formatCurrency(wynik.kwotaFinansowana) },
      { label: "Wartość wykupu", value: formatCurrency(wynik.wartoscWykupu) },
    ],
  };
}

export const leasingConfig: CalculatorConfig = {
  slug: "leasing",
  name: "Kalkulator raty leasingu",
  shortName: "Leasing",
  shortDescription: "Oszacuj orientacyjną wysokość miesięcznej raty leasingu.",
  metaDescription: "Kalkulator leasingu online: oszacuj miesięczną ratę leasingu na podstawie wartości przedmiotu, wpłaty własnej, wykupu i oprocentowania.",
  category: "finanse",
  tags: ["leasing", "rata", "finanse", "firma", "samochód"],
  fields: [
    { id: "wartosc", label: "Wartość przedmiotu leasingu", type: "number", unit: "zł", defaultValue: "100000" },
    { id: "wplata", label: "Wpłata własna", type: "number", unit: "%", defaultValue: "10" },
    { id: "wykup", label: "Wartość wykupu", type: "number", unit: "%", defaultValue: "20" },
    { id: "okres", label: "Okres leasingu", type: "number", unit: "mies.", defaultValue: "36" },
    { id: "oprocentowanie", label: "Oprocentowanie roczne", type: "number", unit: "%", defaultValue: "6" },
  ],
  calculate,
  intro:
    "Kalkulator leasingu szacuje orientacyjną wysokość miesięcznej raty na podstawie wartości przedmiotu, wpłaty własnej, wartości wykupu, okresu umowy i oprocentowania. Rzeczywista oferta leasingodawcy może się różnić o dodatkowe opłaty i marże.",
  howTo: [
    "Podaj wartość przedmiotu leasingu (np. samochodu lub maszyny).",
    "Wpisz procent wpłaty własnej oraz wartość wykupu na koniec umowy.",
    "Podaj okres leasingu w miesiącach i roczne oprocentowanie.",
  ],
  formula:
    "Kwota finansowana = Wartość × (1 − wpłata własna/100). Rata kapitałowa = (kwota finansowana − wartość wykupu) / okres. Rata = rata kapitałowa + kwota finansowana × oprocentowanie / 100 / 12.",
  examples: [
    { input: "100 000 zł, wpłata 10%, wykup 20%, 36 mies., 6%", output: "≈ 2394,44 zł/mies." },
    { input: "50 000 zł, wpłata 0%, wykup 10%, 24 mies., 8%", output: "≈ 2208,33 zł/mies." },
  ],
  faq: [
    {
      q: "Czy wynik odpowiada dokładnie racie z oferty leasingodawcy?",
      a: "Nie — to uproszczone wyliczenie orientacyjne. Rzeczywiste raty uwzględniają dodatkowo marżę, ubezpieczenie, opłaty manipulacyjne i sposób naliczania odsetek konkretnego leasingodawcy.",
    },
    {
      q: "Co to jest wartość wykupu w leasingu?",
      a: "To kwota, za jaką po zakończeniu umowy leasingobiorca może wykupić przedmiot na własność. Im wyższa wartość wykupu, tym niższa rata w trakcie trwania umowy.",
    },
  ],
};
