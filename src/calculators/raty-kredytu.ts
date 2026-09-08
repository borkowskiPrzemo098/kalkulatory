import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function obliczRateAnnuitetowa(kwota: number, oprocentowanieRoczne: number, liczbaRat: number): number {
  const stopaMiesieczna = oprocentowanieRoczne / 100 / 12;
  if (stopaMiesieczna === 0) return kwota / liczbaRat;
  const licznik = kwota * stopaMiesieczna * Math.pow(1 + stopaMiesieczna, liczbaRat);
  const mianownik = Math.pow(1 + stopaMiesieczna, liczbaRat) - 1;
  return licznik / mianownik;
}

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const oprocentowanie = parseLocaleNumber(values.oprocentowanie);
  const liczbaRat = parseLocaleNumber(values.liczbaRat);

  if ([kwota, oprocentowanie, liczbaRat].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij kwotę kredytu, oprocentowanie i liczbę rat." };
  }
  if (kwota <= 0) return { results: [], error: "Kwota kredytu musi być większa od zera." };
  if (oprocentowanie < 0) return { results: [], error: "Oprocentowanie nie może być ujemne." };
  if (!Number.isInteger(liczbaRat) || liczbaRat <= 0) {
    return { results: [], error: "Liczba rat musi być dodatnią liczbą całkowitą." };
  }
  if (liczbaRat > 600) return { results: [], error: "Podaj realistyczną liczbę rat (maks. 600 miesięcy)." };

  const rata = obliczRateAnnuitetowa(kwota, oprocentowanie, liczbaRat);
  const calkowitaKwota = rata * liczbaRat;
  const sumaOdsetek = calkowitaKwota - kwota;

  return {
    results: [
      { label: "Rata miesięczna (annuitetowa)", value: formatCurrency(rata), highlight: true },
      { label: "Suma odsetek", value: formatCurrency(sumaOdsetek) },
      { label: "Całkowita kwota do spłaty", value: formatCurrency(calkowitaKwota) },
    ],
  };
}

export const ratyKredytuConfig: CalculatorConfig = {
  slug: "raty-kredytu",
  name: "Kalkulator rat kredytu",
  shortName: "Raty kredytu",
  shortDescription: "Oblicz wysokość raty annuitetowej, sumę odsetek i całkowity koszt kredytu.",
  metaDescription:
    "Kalkulator rat kredytu online: podaj kwotę, oprocentowanie i liczbę rat, otrzymaj wysokość raty annuitetowej, sumę odsetek i całkowitą kwotę do spłaty. Wynik orientacyjny.",
  category: "finanse",
  tags: ["kredyt", "rata", "pożyczka", "oprocentowanie", "odsetki", "finanse"],
  popular: true,
  fields: [
    { id: "kwota", label: "Kwota kredytu", type: "number", defaultValue: "20000" },
    { id: "oprocentowanie", label: "Oprocentowanie nominalne roczne", type: "number", unit: "%", defaultValue: "9.5" },
    { id: "liczbaRat", label: "Liczba rat (miesięcy)", type: "number", defaultValue: "36" },
  ],
  calculate,
  intro:
    "Kalkulator rat kredytu oblicza wysokość miesięcznej raty w systemie annuitetowym (stała rata przez cały okres kredytowania), sumę odsetek oraz całkowitą kwotę do spłaty. Wynik ma charakter orientacyjny i nie uwzględnia dodatkowych opłat, prowizji ani ubezpieczeń — rzeczywista oferta banku może się różnić.",
  howTo: [
    "Wpisz kwotę kredytu.",
    "Wpisz nominalne roczne oprocentowanie.",
    "Wpisz liczbę rat (w miesiącach) — wynik przeliczy się automatycznie.",
  ],
  formula:
    "Rata = K × r × (1+r)^n / ((1+r)^n − 1), gdzie K to kwota kredytu, r to miesięczna stopa procentowa (oprocentowanie roczne / 12 / 100), a n to liczba rat.",
  examples: [{ input: "20 000 zł, 9,5% rocznie, 36 rat", output: "Rata ≈ 640,66 zł, odsetki ≈ 3 063,74 zł" }],
  faq: [
    {
      q: "Czym jest rata annuitetowa?",
      a: "To rata o stałej wysokości przez cały okres spłaty kredytu — na początku spłaty większą jej część stanowią odsetki, a z czasem coraz większą część stanowi kapitał.",
    },
    {
      q: "Czy wynik uwzględnia prowizję i ubezpieczenie kredytu?",
      a: "Nie. Kalkulator liczy wyłącznie ratę kapitałowo-odsetkową na podstawie podanego oprocentowania nominalnego. Rzeczywista oferta banku (RRSO) może zawierać dodatkowe koszty.",
    },
  ],
};
