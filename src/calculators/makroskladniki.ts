import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export interface MakroWynik {
  bialkoG: number;
  tluszczG: number;
  weglowodanyG: number;
}

export function obliczMakroskladniki(kalorie: number, procBialko: number, procTluszcz: number, procWeglowodany: number): MakroWynik {
  return {
    bialkoG: (kalorie * (procBialko / 100)) / 4,
    tluszczG: (kalorie * (procTluszcz / 100)) / 9,
    weglowodanyG: (kalorie * (procWeglowodany / 100)) / 4,
  };
}

function calculate(values: Record<string, string>) {
  const kalorie = parseLocaleNumber(values.kalorie);
  const bialko = parseLocaleNumber(values.bialko);
  const tluszcz = parseLocaleNumber(values.tluszcz);
  const weglowodany = parseLocaleNumber(values.weglowodany);

  if ([kalorie, bialko, tluszcz, weglowodany].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (kalorie <= 0) return { results: [], error: "Liczba kalorii musi być większa od zera." };
  if ([bialko, tluszcz, weglowodany].some((v) => v < 0)) return { results: [], error: "Procenty nie mogą być ujemne." };
  const suma = bialko + tluszcz + weglowodany;
  if (Math.round(suma) !== 100) return { results: [], error: `Procenty białka, tłuszczu i węglowodanów muszą sumować się do 100% (obecnie: ${formatNumber(suma, 0)}%).` };

  const wynik = obliczMakroskladniki(kalorie, bialko, tluszcz, weglowodany);

  return {
    results: [
      { label: "Białko", value: `${formatNumber(wynik.bialkoG, 0)} g`, highlight: true },
      { label: "Tłuszcz", value: `${formatNumber(wynik.tluszczG, 0)} g` },
      { label: "Węglowodany", value: `${formatNumber(wynik.weglowodanyG, 0)} g` },
    ],
  };
}

export const makroskladnikiConfig: CalculatorConfig = {
  slug: "makroskladniki",
  name: "Kalkulator makroskładników",
  shortName: "Makroskładniki",
  shortDescription: "Rozłóż dzienną liczbę kalorii na gramy białka, tłuszczu i węglowodanów.",
  metaDescription: "Kalkulator makroskładników online: przelicz dzienny bilans kalorii na gramy białka, tłuszczu i węglowodanów według wybranych proporcji.",
  category: "zdrowie",
  tags: ["makroskładniki", "dieta", "białko", "tłuszcz", "węglowodany", "zdrowie"],
  fields: [
    { id: "kalorie", label: "Dzienne zapotrzebowanie kaloryczne", type: "number", unit: "kcal", defaultValue: "2000" },
    { id: "bialko", label: "Udział białka", type: "number", unit: "%", defaultValue: "30" },
    { id: "tluszcz", label: "Udział tłuszczu", type: "number", unit: "%", defaultValue: "30" },
    { id: "weglowodany", label: "Udział węglowodanów", type: "number", unit: "%", defaultValue: "40" },
  ],
  calculate,
  intro:
    "Kalkulator przelicza dzienny bilans kaloryczny na gramaturę makroskładników — białka, tłuszczu i węglowodanów — zgodnie z wybranymi proporcjami procentowymi. Przydatny przy planowaniu diety. Nie zastępuje konsultacji z dietetykiem.",
  howTo: [
    "Podaj dzienne zapotrzebowanie kaloryczne (np. z kalkulatora TDEE).",
    "Ustal procentowy udział białka, tłuszczu i węglowodanów tak, by sumowały się do 100%.",
    "Wynik pokaże docelową gramaturę każdego makroskładnika.",
  ],
  formula: "Białko (g) = kalorie × %białka / 4. Tłuszcz (g) = kalorie × %tłuszczu / 9. Węglowodany (g) = kalorie × %węglowodanów / 4.",
  examples: [{ input: "2000 kcal, 30% białka, 30% tłuszczu, 40% węglowodanów", output: "150 g białka, 67 g tłuszczu, 200 g węglowodanów" }],
  faq: [
    {
      q: "Dlaczego białko i węglowodany dzieli się przez 4, a tłuszcz przez 9?",
      a: "To wartości energetyczne makroskładników: 1 g białka i 1 g węglowodanów dostarcza ok. 4 kcal, a 1 g tłuszczu ok. 9 kcal.",
    },
    {
      q: "Jakie proporcje makroskładników są najlepsze?",
      a: "Zależy od celu (redukcja, budowa masy, utrzymanie) i indywidualnych preferencji — warto skonsultować dobór proporcji z dietetykiem.",
    },
  ],
};
