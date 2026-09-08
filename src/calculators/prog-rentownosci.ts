import { CalculatorConfig } from "./types";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/format";

export function progRentownosciSztuki(kosztyStale: number, cenaJednostkowa: number, kosztZmiennyJednostkowy: number): number {
  return kosztyStale / (cenaJednostkowa - kosztZmiennyJednostkowy);
}

function calculate(values: Record<string, string>) {
  const kosztyStale = parseLocaleNumber(values.kosztyStale);
  const cena = parseLocaleNumber(values.cena);
  const kosztZmienny = parseLocaleNumber(values.kosztZmienny);

  if ([kosztyStale, cena, kosztZmienny].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (kosztyStale < 0) return { results: [], error: "Koszty stałe nie mogą być ujemne." };
  if (cena <= 0) return { results: [], error: "Cena jednostkowa musi być większa od zera." };
  if (kosztZmienny < 0) return { results: [], error: "Koszt zmienny nie może być ujemny." };
  if (cena <= kosztZmienny) return { results: [], error: "Cena sprzedaży musi być wyższa niż jednostkowy koszt zmienny, inaczej próg rentowności nie istnieje." };

  const sztuki = progRentownosciSztuki(kosztyStale, cena, kosztZmienny);
  const przychod = sztuki * cena;

  return {
    results: [
      { label: "Próg rentowności (sztuki)", value: `${formatNumber(Math.ceil(sztuki), 0)} szt.`, highlight: true },
      { label: "Przychód w progu rentowności", value: formatCurrency(przychod) },
    ],
  };
}

export const progRentownosciConfig: CalculatorConfig = {
  slug: "prog-rentownosci",
  name: "Kalkulator progu rentowności",
  shortName: "Próg rentowności",
  shortDescription: "Oblicz próg rentowności (break-even point) — ile sztuk trzeba sprzedać, by pokryć koszty.",
  metaDescription: "Kalkulator progu rentowności (break-even point) online: oblicz liczbę sztuk produktu, jaką trzeba sprzedać, aby pokryć koszty stałe i zmienne.",
  category: "biznes",
  tags: ["próg rentowności", "break-even", "biznes", "finanse firmy"],
  fields: [
    { id: "kosztyStale", label: "Koszty stałe (miesięczne)", type: "number", unit: "zł", defaultValue: "10000" },
    { id: "cena", label: "Cena sprzedaży za sztukę", type: "number", unit: "zł", defaultValue: "50" },
    { id: "kosztZmienny", label: "Koszt zmienny za sztukę", type: "number", unit: "zł", defaultValue: "30" },
  ],
  calculate,
  intro:
    "Próg rentowności (break-even point) to liczba sprzedanych sztuk produktu, przy której przychody pokrywają dokładnie wszystkie koszty — stałe i zmienne. Powyżej tego progu firma zaczyna generować zysk.",
  howTo: [
    "Podaj miesięczne koszty stałe firmy (czynsz, pensje, itp. — niezależne od liczby sprzedanych sztuk).",
    "Podaj cenę sprzedaży jednej sztuki produktu.",
    "Podaj jednostkowy koszt zmienny (materiały, produkcja jednej sztuki).",
  ],
  formula: "Próg rentowności (szt.) = koszty stałe / (cena sprzedaży − koszt zmienny na sztukę).",
  examples: [{ input: "koszty stałe 10 000 zł, cena 50 zł, koszt zmienny 30 zł", output: "500 sztuk" }],
  faq: [
    {
      q: "Co się stanie, jeśli sprzedam mniej sztuk niż wynosi próg rentowności?",
      a: "Oznacza to, że firma poniesie stratę — przychody nie pokryją wszystkich kosztów stałych i zmiennych w danym okresie.",
    },
    {
      q: "Jak obniżyć próg rentowności?",
      a: "Można to osiągnąć poprzez obniżenie kosztów stałych, obniżenie jednostkowego kosztu zmiennego lub podniesienie ceny sprzedaży (o ile rynek na to pozwala).",
    },
  ],
};
