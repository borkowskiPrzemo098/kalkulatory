import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function celsjuszNaFahrenheita(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fahrenheitNaCelsjusz(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function celsjuszNaKelwiny(c: number): number {
  return c + 273.15;
}

export function kelwinyNaCelsjusz(k: number): number {
  return k - 273.15;
}

export function przeliczTemperature(wartosc: number, zJednostki: string, naJednostke: string): number {
  if (zJednostki === naJednostke) return wartosc;
  // Najpierw przelicz na Celsjusza.
  let celsjusz: number;
  if (zJednostki === "c") celsjusz = wartosc;
  else if (zJednostki === "f") celsjusz = fahrenheitNaCelsjusz(wartosc);
  else celsjusz = kelwinyNaCelsjusz(wartosc);

  if (naJednostke === "c") return celsjusz;
  if (naJednostke === "f") return celsjuszNaFahrenheita(celsjusz);
  return celsjuszNaKelwiny(celsjusz);
}

const ETYKIETY: Record<string, string> = { c: "stopnie Celsjusza (°C)", f: "stopnie Fahrenheita (°F)", k: "kelwiny (K)" };

function calculate(values: Record<string, string>) {
  const wartosc = parseLocaleNumber(values.wartosc);
  const zJednostki = values.zJednostki || "c";
  const naJednostke = values.naJednostke || "f";

  if (Number.isNaN(wartosc)) return { results: [], error: "Podaj wartość temperatury." };

  const kelwiny = zJednostki === "k" ? wartosc : celsjuszNaKelwiny(zJednostki === "c" ? wartosc : fahrenheitNaCelsjusz(wartosc));
  if (kelwiny < 0) return { results: [], error: "Temperatura nie może być niższa niż zero absolutne (0 K = −273,15°C)." };

  const wynik = przeliczTemperature(wartosc, zJednostki, naJednostke);

  return { results: [{ label: `Wynik w jednostce: ${ETYKIETY[naJednostke]}`, value: formatNumber(wynik, 2), highlight: true }] };
}

export const temperaturaConfig: CalculatorConfig = {
  slug: "temperatura",
  name: "Przelicznik temperatury",
  shortName: "Temperatura",
  shortDescription: "Przelicz temperaturę między stopniami Celsjusza, Fahrenheita i kelwinami.",
  metaDescription: "Przelicznik temperatury online: przelicz stopnie Celsjusza na Fahrenheita, kelwiny i odwrotnie — szybko i za darmo.",
  category: "przeliczniki",
  tags: ["temperatura", "celsjusz", "fahrenheit", "kelwin", "przelicznik"],
  popular: true,
  fields: [
    { id: "wartosc", label: "Wartość", type: "number", defaultValue: "20" },
    {
      id: "zJednostki",
      label: "Z jednostki",
      type: "select",
      defaultValue: "c",
      options: [
        { value: "c", label: "Stopnie Celsjusza (°C)" },
        { value: "f", label: "Stopnie Fahrenheita (°F)" },
        { value: "k", label: "Kelwiny (K)" },
      ],
    },
    {
      id: "naJednostke",
      label: "Na jednostkę",
      type: "select",
      defaultValue: "f",
      options: [
        { value: "c", label: "Stopnie Celsjusza (°C)" },
        { value: "f", label: "Stopnie Fahrenheita (°F)" },
        { value: "k", label: "Kelwiny (K)" },
      ],
    },
  ],
  calculate,
  intro: "Przelicznik temperatury umożliwia szybkie przeliczenie wartości między stopniami Celsjusza, Fahrenheita oraz kelwinami.",
  howTo: ["Podaj wartość temperatury.", "Wybierz jednostkę źródłową i docelową.", "Wynik pojawi się automatycznie."],
  formula: "°F = °C × 9/5 + 32. K = °C + 273,15. Przeliczenia w drugą stronę są odwrotnością tych wzorów.",
  examples: [
    { input: "20°C", output: "68°F" },
    { input: "0°C", output: "273,15 K" },
  ],
  faq: [
    { q: "Jaka jest temperatura zamarzania wody w Fahrenheitach?", a: "0°C odpowiada 32°F." },
    { q: "Co to jest zero absolutne?", a: "To najniższa możliwa temperatura, równa 0 K, czyli −273,15°C — kalkulator nie pozwala na wpisanie wartości niższych." },
  ],
};
