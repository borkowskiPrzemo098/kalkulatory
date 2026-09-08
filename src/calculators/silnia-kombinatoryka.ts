import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function silnia(n: number): number {
  let wynik = 1;
  for (let i = 2; i <= n; i++) wynik *= i;
  return wynik;
}

export function permutacje(n: number, k: number): number {
  return silnia(n) / silnia(n - k);
}

export function kombinacje(n: number, k: number): number {
  return silnia(n) / (silnia(k) * silnia(n - k));
}

function calculate(values: Record<string, string>) {
  const tryb = values.tryb || "silnia";
  const n = parseLocaleNumber(values.n);

  if (Number.isNaN(n)) return { results: [], error: "Podaj liczbę n." };
  if (!Number.isInteger(n) || n < 0) return { results: [], error: "n musi być nieujemną liczbą całkowitą." };
  if (n > 170) return { results: [], error: "Liczba zbyt duża do obliczenia (max 170)." };

  if (tryb === "silnia") {
    return { results: [{ label: `${formatNumber(n, 0)}!`, value: formatNumber(silnia(n), 0), highlight: true }] };
  }

  const k = parseLocaleNumber(values.k);
  if (Number.isNaN(k)) return { results: [], error: "Podaj liczbę k." };
  if (!Number.isInteger(k) || k < 0) return { results: [], error: "k musi być nieujemną liczbą całkowitą." };
  if (k > n) return { results: [], error: "k nie może być większe od n." };

  if (tryb === "permutacje") {
    return { results: [{ label: `Wariacje bez powtórzeń V(${formatNumber(n, 0)},${formatNumber(k, 0)})`, value: formatNumber(permutacje(n, k), 0), highlight: true }] };
  }

  return { results: [{ label: `Kombinacje C(${formatNumber(n, 0)},${formatNumber(k, 0)})`, value: formatNumber(kombinacje(n, k), 0), highlight: true }] };
}

export const silniaKombinatorykaConfig: CalculatorConfig = {
  slug: "silnia-kombinatoryka",
  name: "Kalkulator silni i kombinatoryki",
  shortName: "Silnia / kombinatoryka",
  shortDescription: "Oblicz silnię liczby, liczbę wariacji (permutacji) lub kombinacji.",
  metaDescription: "Kalkulator silni, wariacji i kombinacji online: oblicz n!, liczbę permutacji lub kombinacji k-elementowych ze zbioru n-elementowego.",
  category: "matematyka",
  tags: ["silnia", "kombinatoryka", "permutacje", "kombinacje", "matematyka"],
  fields: [
    {
      id: "tryb",
      label: "Co obliczyć?",
      type: "select",
      defaultValue: "silnia",
      options: [
        { value: "silnia", label: "Silnia (n!)" },
        { value: "permutacje", label: "Wariacje bez powtórzeń (n po k)" },
        { value: "kombinacje", label: "Kombinacje (n po k)" },
      ],
    },
    { id: "n", label: "n", type: "number", defaultValue: "5" },
    { id: "k", label: "k", type: "number", defaultValue: "2", dependsOn: { field: "tryb", value: "permutacje" } },
  ],
  calculate,
  intro:
    "Kalkulator oblicza silnię liczby naturalnej oraz podstawowe wielkości kombinatoryczne — liczbę wariacji bez powtórzeń i liczbę kombinacji k-elementowych ze zbioru n-elementowego.",
  howTo: [
    "Wybierz, co chcesz obliczyć: silnię, wariacje czy kombinacje.",
    "Podaj n (i k dla wariacji/kombinacji).",
    "Wynik pojawi się automatycznie.",
  ],
  formula: "n! = 1×2×...×n. Wariacje: V(n,k) = n!/(n−k)!. Kombinacje: C(n,k) = n!/(k!(n−k)!).",
  examples: [
    { input: "5!", output: "120" },
    { input: "C(6,3)", output: "20" },
  ],
  faq: [
    {
      q: "Czym różnią się wariacje od kombinacji?",
      a: "W wariacjach kolejność elementów ma znaczenie (np. miejsca na podium), a w kombinacjach nie (np. wybór drużyny z grupy osób).",
    },
    {
      q: "Ile wynosi 0!?",
      a: "Zgodnie z definicją matematyczną 0! = 1.",
    },
  ],
};
