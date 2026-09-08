import { CalculatorConfig } from "./types";
import { formatNumber, formatPercent, parseLocaleNumber } from "@/lib/format";

export interface ProcentyResult {
  wynikXProcentZY?: number;
  jakiProcentAStanowiB?: number;
  zmianaProcentowa?: number;
}

export function obliczProcentZWartosci(procent: number, wartosc: number): number {
  return (procent / 100) * wartosc;
}

export function obliczJakiProcentStanowi(a: number, b: number): number {
  if (b === 0) return NaN;
  return (a / b) * 100;
}

export function obliczZmianeProcentowa(stara: number, nowa: number): number {
  if (stara === 0) return NaN;
  return ((nowa - stara) / stara) * 100;
}

function calculate(values: Record<string, string>) {
  const tryb = values.tryb || "procent-z-wartosci";

  if (tryb === "procent-z-wartosci") {
    const procent = parseLocaleNumber(values.procent);
    const wartosc = parseLocaleNumber(values.wartosc);
    if (Number.isNaN(procent) || Number.isNaN(wartosc)) {
      return { results: [], error: "Uzupełnij oba pola liczbami, np. 20 i 150." };
    }
    const wynik = obliczProcentZWartosci(procent, wartosc);
    return {
      results: [
        {
          label: `${formatNumber(procent, 2)}% z ${formatNumber(wartosc, 2)}`,
          value: formatNumber(wynik, 2),
          highlight: true,
        },
      ],
    };
  }

  if (tryb === "jaki-procent") {
    const a = parseLocaleNumber(values.a);
    const b = parseLocaleNumber(values.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return { results: [], error: "Uzupełnij oba pola liczbami." };
    }
    if (b === 0) {
      return { results: [], error: "Wartość B nie może być równa zero (dzielenie przez zero)." };
    }
    const wynik = obliczJakiProcentStanowi(a, b);
    return {
      results: [
        {
          label: `${formatNumber(a, 2)} stanowi z ${formatNumber(b, 2)}`,
          value: formatPercent(wynik, 2),
          highlight: true,
        },
      ],
    };
  }

  // zmiana procentowa
  const stara = parseLocaleNumber(values.stara);
  const nowa = parseLocaleNumber(values.nowa);
  if (Number.isNaN(stara) || Number.isNaN(nowa)) {
    return { results: [], error: "Uzupełnij obie wartości liczbami." };
  }
  if (stara === 0) {
    return { results: [], error: "Wartość początkowa nie może być równa zero." };
  }
  const wynik = obliczZmianeProcentowa(stara, nowa);
  const kierunek = wynik >= 0 ? "wzrost" : "spadek";
  return {
    results: [
      {
        label: `Zmiana z ${formatNumber(stara, 2)} do ${formatNumber(nowa, 2)} to ${kierunek}`,
        value: formatPercent(Math.abs(wynik), 2),
        highlight: true,
      },
    ],
  };
}

export const procentyConfig: CalculatorConfig = {
  slug: "procenty",
  name: "Kalkulator procentowy",
  shortName: "Procenty",
  shortDescription: "Oblicz procent z wartości, jaki procent stanowi jedna liczba z drugiej oraz zmianę procentową.",
  metaDescription:
    "Kalkulator procentowy online: oblicz X% z Y, jaki procent stanowi A z B oraz wzrost lub spadek procentowy. Szybko, za darmo, bez rejestracji.",
  category: "matematyka",
  tags: ["procent", "procenty", "procentowy", "wzrost", "spadek", "matematyka"],
  popular: true,
  fields: [
    {
      id: "tryb",
      label: "Co chcesz obliczyć?",
      type: "select",
      defaultValue: "procent-z-wartosci",
      options: [
        { value: "procent-z-wartosci", label: "Procent z wartości (X% z Y)" },
        { value: "jaki-procent", label: "Jaki procent A stanowi z B" },
        { value: "zmiana-procentowa", label: "Zmiana procentowa (wzrost/spadek)" },
      ],
    },
    {
      id: "procent",
      label: "Procent",
      type: "number",
      unit: "%",
      defaultValue: "20",
      dependsOn: { field: "tryb", value: "procent-z-wartosci" },
    },
    {
      id: "wartosc",
      label: "Wartość",
      type: "number",
      defaultValue: "150",
      dependsOn: { field: "tryb", value: "procent-z-wartosci" },
    },
    {
      id: "a",
      label: "Wartość A",
      type: "number",
      defaultValue: "30",
      helpText: "Liczba, dla której sprawdzasz udział procentowy.",
      dependsOn: { field: "tryb", value: "jaki-procent" },
    },
    {
      id: "b",
      label: "Wartość B",
      type: "number",
      defaultValue: "150",
      helpText: "Liczba odniesienia (100%).",
      dependsOn: { field: "tryb", value: "jaki-procent" },
    },
    {
      id: "stara",
      label: "Wartość początkowa",
      type: "number",
      defaultValue: "100",
      dependsOn: { field: "tryb", value: "zmiana-procentowa" },
    },
    {
      id: "nowa",
      label: "Wartość końcowa",
      type: "number",
      defaultValue: "120",
      dependsOn: { field: "tryb", value: "zmiana-procentowa" },
    },
  ],
  calculate,
  intro:
    "Kalkulator procentowy pozwala szybko obliczyć trzy najczęściej potrzebne rzeczy: ile wynosi dany procent z liczby, jaki procent jedna liczba stanowi z drugiej oraz o ile procent zmieniła się wartość (wzrost lub spadek). Wpisz liczby, a wynik pojawi się automatycznie.",
  howTo: [
    "Wybierz tryb obliczenia: procent z wartości, jaki procent stanowi A z B, lub zmiana procentowa.",
    "Wpisz wymagane liczby w pola formularza.",
    "Wynik przeliczany jest automatycznie podczas wpisywania.",
  ],
  formula:
    "Procent z wartości: (procent / 100) × wartość. Jaki procent stanowi A z B: (A / B) × 100%. Zmiana procentowa: ((nowa − stara) / stara) × 100%.",
  examples: [
    { input: "20% z 150", output: "30" },
    { input: "Jaki procent 30 stanowi z 150", output: "20%" },
    { input: "Zmiana ze 100 do 120", output: "wzrost o 20%" },
  ],
  faq: [
    {
      q: "Jak obliczyć ile procent stanowi jedna liczba z drugiej?",
      a: "Podziel pierwszą liczbę przez drugą i pomnóż przez 100. Na przykład 30 z 150 to (30/150) × 100 = 20%.",
    },
    {
      q: "Jak obliczyć procent z liczby?",
      a: "Pomnóż liczbę przez wartość procentową i podziel przez 100. Na przykład 20% z 150 to (20/100) × 150 = 30.",
    },
    {
      q: "Jak obliczyć spadek procentowy?",
      a: "Odejmij wartość starą od nowej, podziel przez wartość starą i pomnóż przez 100. Ujemny wynik oznacza spadek.",
    },
  ],
};
