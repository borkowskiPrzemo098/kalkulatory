import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function poleObwodKola(promien: number) {
  return { pole: Math.PI * promien * promien, obwod: 2 * Math.PI * promien };
}

export function poleObwodProstokata(a: number, b: number) {
  return { pole: a * b, obwod: 2 * (a + b) };
}

export function poleTrojkata(podstawa: number, wysokosc: number): number {
  return 0.5 * podstawa * wysokosc;
}

function calculate(values: Record<string, string>) {
  const figura = values.figura || "kolo";

  if (figura === "kolo") {
    const r = parseLocaleNumber(values.promien);
    if (Number.isNaN(r)) return { results: [], error: "Podaj promień koła." };
    if (r <= 0) return { results: [], error: "Promień musi być większy od zera." };
    const { pole, obwod } = poleObwodKola(r);
    return {
      results: [
        { label: "Pole koła", value: `${formatNumber(pole, 2)} jedn.²`, highlight: true },
        { label: "Obwód koła", value: `${formatNumber(obwod, 2)} jedn.` },
      ],
    };
  }

  if (figura === "prostokat") {
    const a = parseLocaleNumber(values.a);
    const b = parseLocaleNumber(values.b);
    if ([a, b].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj boki prostokąta." };
    if (a <= 0 || b <= 0) return { results: [], error: "Boki muszą być większe od zera." };
    const { pole, obwod } = poleObwodProstokata(a, b);
    return {
      results: [
        { label: "Pole prostokąta", value: `${formatNumber(pole, 2)} jedn.²`, highlight: true },
        { label: "Obwód prostokąta", value: `${formatNumber(obwod, 2)} jedn.` },
      ],
    };
  }

  const podstawa = parseLocaleNumber(values.podstawa);
  const wysokosc = parseLocaleNumber(values.wysokosc);
  if ([podstawa, wysokosc].some((v) => Number.isNaN(v))) return { results: [], error: "Podaj podstawę i wysokość trójkąta." };
  if (podstawa <= 0 || wysokosc <= 0) return { results: [], error: "Podstawa i wysokość muszą być większe od zera." };
  return { results: [{ label: "Pole trójkąta", value: `${formatNumber(poleTrojkata(podstawa, wysokosc), 2)} jedn.²`, highlight: true }] };
}

export const poleObwodFigurConfig: CalculatorConfig = {
  slug: "pole-obwod-figur",
  name: "Kalkulator pola i obwodu figur",
  shortName: "Pole i obwód figur",
  shortDescription: "Oblicz pole i obwód koła, prostokąta lub trójkąta.",
  metaDescription: "Kalkulator pola i obwodu figur geometrycznych online: koło, prostokąt, trójkąt — szybkie obliczenia z wzorami.",
  category: "matematyka",
  tags: ["pole", "obwód", "geometria", "koło", "prostokąt", "trójkąt", "matematyka"],
  fields: [
    {
      id: "figura",
      label: "Figura",
      type: "select",
      defaultValue: "kolo",
      options: [
        { value: "kolo", label: "Koło" },
        { value: "prostokat", label: "Prostokąt" },
        { value: "trojkat", label: "Trójkąt" },
      ],
    },
    { id: "promien", label: "Promień", type: "number", defaultValue: "3", dependsOn: { field: "figura", value: "kolo" } },
    { id: "a", label: "Bok a", type: "number", defaultValue: "4", dependsOn: { field: "figura", value: "prostokat" } },
    { id: "b", label: "Bok b", type: "number", defaultValue: "5", dependsOn: { field: "figura", value: "prostokat" } },
    { id: "podstawa", label: "Podstawa", type: "number", defaultValue: "6", dependsOn: { field: "figura", value: "trojkat" } },
    { id: "wysokosc", label: "Wysokość", type: "number", defaultValue: "4", dependsOn: { field: "figura", value: "trojkat" } },
  ],
  calculate,
  intro: "Kalkulator oblicza pole i obwód podstawowych figur geometrycznych: koła, prostokąta oraz pole trójkąta.",
  howTo: ["Wybierz figurę.", "Podaj wymagane wymiary.", "Wynik pojawi się automatycznie."],
  formula: "Koło: P = πr², O = 2πr. Prostokąt: P = a×b, O = 2(a+b). Trójkąt: P = ½ × podstawa × wysokość.",
  examples: [
    { input: "koło, r = 3", output: "P ≈ 28,27, O ≈ 18,85" },
    { input: "prostokąt 4×5", output: "P = 20, O = 18" },
  ],
  faq: [
    {
      q: "Jak obliczyć pole trójkąta, gdy znam tylko boki?",
      a: "Ten kalkulator wymaga podstawy i wysokości. Jeśli znasz tylko boki, użyj wzoru Herona lub innego kalkulatora trygonometrycznego.",
    },
    {
      q: "Jaka jest jednostka wyniku?",
      a: "Wynik podawany jest w takich samych jednostkach, w jakich podano wymiary (np. cm → pole w cm²).",
    },
  ],
};
