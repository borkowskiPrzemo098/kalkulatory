import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function wagaIdealnaDevine(wzrostCm: number, plec: "m" | "k"): number {
  const cale = wzrostCm / 2.54;
  const nadwyzkaNad60Cali = cale - 60;
  const baza = plec === "m" ? 50 : 45.5;
  return baza + 2.3 * nadwyzkaNad60Cali;
}

function calculate(values: Record<string, string>) {
  const wzrost = parseLocaleNumber(values.wzrost);
  const plec = values.plec === "k" ? "k" : "m";

  if (Number.isNaN(wzrost)) return { results: [], error: "Podaj wzrost." };
  if (wzrost < 100 || wzrost > 250) return { results: [], error: "Podaj realny wzrost w centymetrach (100–250)." };

  const waga = wagaIdealnaDevine(wzrost, plec);
  if (waga <= 0) return { results: [], error: "Nie udało się obliczyć wagi dla podanego wzrostu (wzór dotyczy osób powyżej ok. 150 cm)." };

  return {
    results: [{ label: "Orientacyjna waga idealna", value: `${formatNumber(waga, 1)} kg`, highlight: true }],
  };
}

export const wagaIdealnaConfig: CalculatorConfig = {
  slug: "waga-idealna",
  name: "Kalkulator wagi idealnej",
  shortName: "Waga idealna",
  shortDescription: "Oszacuj orientacyjną wagę idealną na podstawie wzrostu i płci wzorem Devine'a.",
  metaDescription: "Kalkulator wagi idealnej online: oszacuj orientacyjną wagę idealną na podstawie wzrostu i płci popularnym wzorem Devine'a.",
  category: "zdrowie",
  tags: ["waga idealna", "zdrowie", "bmi", "dieta"],
  fields: [
    { id: "wzrost", label: "Wzrost", type: "number", unit: "cm", defaultValue: "175" },
    {
      id: "plec",
      label: "Płeć",
      type: "select",
      defaultValue: "m",
      options: [
        { value: "m", label: "Mężczyzna" },
        { value: "k", label: "Kobieta" },
      ],
    },
  ],
  calculate,
  intro:
    "Kalkulator szacuje orientacyjną wagę idealną na podstawie wzrostu i płci, korzystając z popularnego wzoru Devine'a stosowanego m.in. w medycynie do wstępnego szacowania dawek leków. To tylko orientacyjny wskaźnik, nie cel zdrowotny sam w sobie.",
  howTo: ["Podaj swój wzrost w centymetrach.", "Wybierz płeć.", "Wynik pokaże orientacyjną wagę idealną."],
  formula: "Mężczyźni: 50 + 2,3 × (wzrost w calach − 60). Kobiety: 45,5 + 2,3 × (wzrost w calach − 60), gdzie 1 cal = 2,54 cm.",
  examples: [
    { input: "Mężczyzna, 180 cm", output: "≈ 75,0 kg" },
    { input: "Kobieta, 165 cm", output: "≈ 56,9 kg" },
  ],
  faq: [
    {
      q: "Czy waga idealna to waga, do której powinienem dążyć?",
      a: "Nie traktuj tego jako sztywnego celu — to jeden z wielu uproszczonych wskaźników. Zdrowa masa ciała zależy też od budowy, masy mięśniowej i stanu zdrowia. Skonsultuj się z lekarzem lub dietetykiem.",
    },
    {
      q: "Czy wzór działa dla bardzo niskich osób?",
      a: "Wzór Devine'a został opracowany dla osób o wzroście powyżej ok. 150 cm — dla niższych wartości wynik może być nierealny lub ujemny.",
    },
  ],
};
