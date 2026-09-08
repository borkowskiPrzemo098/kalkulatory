import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function objetoscSzescianu(a: number): number {
  return a * a * a;
}

export function objetoscWalca(r: number, h: number): number {
  return Math.PI * r * r * h;
}

export function objetoscKuli(r: number): number {
  return (4 / 3) * Math.PI * Math.pow(r, 3);
}

export function objetoscStozka(r: number, h: number): number {
  return (1 / 3) * Math.PI * r * r * h;
}

function calculate(values: Record<string, string>) {
  const bryla = values.bryla || "szescian";

  if (bryla === "szescian") {
    const a = parseLocaleNumber(values.a);
    if (Number.isNaN(a)) return { results: [], error: "Podaj długość krawędzi." };
    if (a <= 0) return { results: [], error: "Krawędź musi być większa od zera." };
    return { results: [{ label: "Objętość sześcianu", value: `${formatNumber(objetoscSzescianu(a), 2)} jedn.³`, highlight: true }] };
  }

  if (bryla === "kula") {
    const r = parseLocaleNumber(values.r);
    if (Number.isNaN(r)) return { results: [], error: "Podaj promień kuli." };
    if (r <= 0) return { results: [], error: "Promień musi być większy od zera." };
    return { results: [{ label: "Objętość kuli", value: `${formatNumber(objetoscKuli(r), 2)} jedn.³`, highlight: true }] };
  }

  const r = parseLocaleNumber(values.r2);
  const h = parseLocaleNumber(values.h);
  if ([r, h].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj promień i wysokość." };
  if (r <= 0 || h <= 0) return { results: [], error: "Promień i wysokość muszą być większe od zera." };

  if (bryla === "walec") {
    return { results: [{ label: "Objętość walca", value: `${formatNumber(objetoscWalca(r, h), 2)} jedn.³`, highlight: true }] };
  }

  return { results: [{ label: "Objętość stożka", value: `${formatNumber(objetoscStozka(r, h), 2)} jedn.³`, highlight: true }] };
}

export const objetoscBrylConfig: CalculatorConfig = {
  slug: "objetosc-bryl",
  name: "Kalkulator objętości brył",
  shortName: "Objętość brył",
  shortDescription: "Oblicz objętość sześcianu, walca, kuli lub stożka.",
  metaDescription: "Kalkulator objętości brył online: sześcian, walec, kula, stożek — szybkie obliczenia z wzorami geometrycznymi.",
  category: "matematyka",
  tags: ["objętość", "bryła", "geometria", "walec", "kula", "stożek", "matematyka"],
  fields: [
    {
      id: "bryla",
      label: "Bryła",
      type: "select",
      defaultValue: "szescian",
      options: [
        { value: "szescian", label: "Sześcian" },
        { value: "walec", label: "Walec" },
        { value: "kula", label: "Kula" },
        { value: "stozek", label: "Stożek" },
      ],
    },
    { id: "a", label: "Krawędź", type: "number", defaultValue: "3", dependsOn: { field: "bryla", value: "szescian" } },
    { id: "r", label: "Promień", type: "number", defaultValue: "3", dependsOn: { field: "bryla", value: "kula" } },
    { id: "r2", label: "Promień podstawy", type: "number", defaultValue: "2", dependsOn: { field: "bryla", value: "walec" } },
    { id: "h", label: "Wysokość", type: "number", defaultValue: "5", dependsOn: { field: "bryla", value: "walec" } },
  ],
  calculate,
  intro: "Kalkulator oblicza objętość podstawowych brył geometrycznych: sześcianu, walca, kuli i stożka.",
  howTo: ["Wybierz bryłę.", "Podaj wymagane wymiary (krawędź, promień, wysokość).", "Wynik pojawi się automatycznie."],
  formula: "Sześcian: V = a³. Walec: V = πr²h. Kula: V = (4/3)πr³. Stożek: V = (1/3)πr²h.",
  examples: [
    { input: "kula, r = 3", output: "V ≈ 113,10 jedn.³" },
    { input: "walec, r = 2, h = 5", output: "V ≈ 62,83 jedn.³" },
  ],
  faq: [
    {
      q: "W jakich jednostkach podać wynik?",
      a: "Wynik jest podawany w jednostkach sześciennych zgodnych z jednostką podanych wymiarów (np. cm → wynik w cm³).",
    },
    {
      q: "Czy kalkulator obsługuje stożek ścięty?",
      a: "Nie, obsługuje standardowy stożek pełny. Dla stożka ściętego potrzebny jest inny, bardziej złożony wzór.",
    },
  ],
};
