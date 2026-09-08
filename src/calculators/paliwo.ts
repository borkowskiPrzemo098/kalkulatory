import { CalculatorConfig } from "./types";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/format";

export function obliczZuzytePaliwo(dystansKm: number, zuzycieNa100km: number): number {
  return (dystansKm * zuzycieNa100km) / 100;
}

export function obliczKosztPrzejazdu(zuzytePaliwoL: number, cenaZaLitr: number): number {
  return zuzytePaliwoL * cenaZaLitr;
}

function calculate(values: Record<string, string>) {
  const dystans = parseLocaleNumber(values.dystans);
  const zuzycie = parseLocaleNumber(values.zuzycie);
  const cena = parseLocaleNumber(values.cena);

  if ([dystans, zuzycie, cena].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij dystans, spalanie na 100 km i cenę paliwa." };
  }
  if (dystans < 0 || zuzycie < 0 || cena < 0) {
    return { results: [], error: "Wartości nie mogą być ujemne." };
  }

  const zuzytePaliwo = obliczZuzytePaliwo(dystans, zuzycie);
  const koszt = obliczKosztPrzejazdu(zuzytePaliwo, cena);
  const kosztNa100km = obliczKosztPrzejazdu(zuzycie, cena);

  return {
    results: [
      { label: "Koszt przejazdu", value: formatCurrency(koszt), highlight: true },
      { label: "Zużyte paliwo", value: `${formatNumber(zuzytePaliwo, 2)} l` },
      { label: "Koszt na 100 km", value: formatCurrency(kosztNa100km) },
    ],
  };
}

export const paliwoConfig: CalculatorConfig = {
  slug: "spalanie-paliwa",
  name: "Kalkulator spalania paliwa",
  shortName: "Spalanie paliwa",
  shortDescription: "Oblicz zużyte paliwo i koszt przejazdu na podstawie dystansu, spalania i ceny paliwa.",
  metaDescription:
    "Kalkulator spalania paliwa online: podaj dystans, średnie spalanie na 100 km i cenę paliwa, otrzymaj zużyte paliwo i koszt trasy.",
  category: "motoryzacja",
  tags: ["paliwo", "spalanie", "benzyna", "diesel", "koszt trasy", "samochód"],
  popular: true,
  fields: [
    { id: "dystans", label: "Dystans", type: "number", unit: "km", defaultValue: "300" },
    { id: "zuzycie", label: "Spalanie na 100 km", type: "number", unit: "l", defaultValue: "6.5" },
    { id: "cena", label: "Cena paliwa za litr", type: "number", unit: "zł", defaultValue: "6.30" },
  ],
  calculate,
  intro:
    "Kalkulator spalania paliwa pozwala szybko obliczyć, ile paliwa zużyjesz w trakcie podróży oraz ile będzie kosztować dany przejazd, na podstawie dystansu, średniego spalania pojazdu i aktualnej ceny paliwa.",
  howTo: [
    "Wpisz dystans trasy w kilometrach.",
    "Wpisz średnie spalanie pojazdu na 100 km.",
    "Wpisz cenę paliwa za litr — koszt przejazdu obliczy się automatycznie.",
  ],
  formula:
    "Zużyte paliwo [l] = (dystans [km] × spalanie [l/100km]) / 100. Koszt przejazdu = zużyte paliwo × cena za litr.",
  examples: [{ input: "300 km, spalanie 6,5 l/100km, cena 6,30 zł/l", output: "19,5 l paliwa, koszt 122,85 zł" }],
  faq: [
    {
      q: "Skąd wziąć średnie spalanie pojazdu?",
      a: "Najlepiej sprawdzić rzeczywiste spalanie na podstawie ostatnich tankowań (zużyte litry / przejechane km × 100) lub danych producenta pojazdu.",
    },
    {
      q: "Czy kalkulator uwzględnia styl jazdy i warunki drogowe?",
      a: "Nie — wynik bazuje na podanym przez Ciebie średnim spalaniu. Rzeczywiste zużycie paliwa może się różnić w zależności od warunków jazdy.",
    },
  ],
};
