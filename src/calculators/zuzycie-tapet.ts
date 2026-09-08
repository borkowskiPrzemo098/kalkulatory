import { CalculatorConfig } from "./types";
import { parseLocaleNumber } from "@/lib/format";

export function liczbaRolekTapety(powierzchniaSciany: number, szerokoscRolkiM: number, dlugoscRolkiM: number): number {
  const powRolki = szerokoscRolkiM * dlugoscRolkiM;
  return Math.ceil(powierzchniaSciany / powRolki);
}

function calculate(values: Record<string, string>) {
  const powierzchnia = parseLocaleNumber(values.powierzchnia);
  const szerokosc = parseLocaleNumber(values.szerokosc);
  const dlugosc = parseLocaleNumber(values.dlugosc);

  if ([powierzchnia, szerokosc, dlugosc].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (powierzchnia <= 0) return { results: [], error: "Powierzchnia ścian musi być większa od zera." };
  if (szerokosc <= 0 || dlugosc <= 0) return { results: [], error: "Wymiary rolki tapety muszą być większe od zera." };

  const rolki = liczbaRolekTapety(powierzchnia, szerokosc, dlugosc);

  return { results: [{ label: "Liczba potrzebnych rolek tapety", value: `${rolki} szt.`, highlight: true }] };
}

export const zuzycieTapetConfig: CalculatorConfig = {
  slug: "zuzycie-tapet",
  name: "Kalkulator zużycia tapet",
  shortName: "Zużycie tapet",
  shortDescription: "Oblicz, ile rolek tapety potrzeba do wytapetowania ścian.",
  metaDescription: "Kalkulator zużycia tapet online: oblicz liczbę rolek tapety potrzebną do wytapetowania pomieszczenia na podstawie wymiarów rolki.",
  category: "dom",
  tags: ["tapeta", "remont", "ściany", "dom"],
  fields: [
    { id: "powierzchnia", label: "Powierzchnia ścian do wytapetowania", type: "number", unit: "m²", defaultValue: "41" },
    { id: "szerokosc", label: "Szerokość rolki", type: "number", unit: "m", defaultValue: "0.53" },
    { id: "dlugosc", label: "Długość rolki", type: "number", unit: "m", defaultValue: "10.05" },
  ],
  calculate,
  intro:
    "Kalkulator szacuje liczbę rolek tapety potrzebnych do wytapetowania ścian, na podstawie powierzchni ścian oraz wymiarów pojedynczej rolki. Nie uwzględnia dopasowania wzoru (raportu), które może zwiększyć zużycie.",
  howTo: [
    "Podaj powierzchnię ścian do wytapetowania.",
    "Podaj szerokość i długość jednej rolki tapety (znajdziesz na opakowaniu).",
    "Wynik pokaże zaokrągloną w górę liczbę potrzebnych rolek.",
  ],
  formula: "Liczba rolek = ⌈powierzchnia ścian / (szerokość rolki × długość rolki)⌉.",
  examples: [{ input: "41 m², rolka 0,53×10,05 m", output: "8 rolek" }],
  faq: [
    {
      q: "Czy kalkulator uwzględnia dopasowanie wzoru tapety?",
      a: "Nie — jeśli tapeta ma raport (powtarzający się wzór do dopasowania), rzeczywiste zużycie będzie wyższe. W takim przypadku warto doliczyć dodatkowy zapas 10–20%.",
    },
    {
      q: "Czy trzeba odjąć powierzchnię okien i drzwi?",
      a: "Tak, do obliczeń podaj już pomniejszoną powierzchnię ścian — możesz w tym celu użyć kalkulatora powierzchni malowania ścian.",
    },
  ],
};
