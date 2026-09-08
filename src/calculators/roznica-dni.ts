import { CalculatorConfig } from "./types";
import { formatNumber } from "@/lib/format";

const MS_W_DNIU = 1000 * 60 * 60 * 24;

export function roznicaDni(dataOd: Date, dataDo: Date): number {
  return Math.round((dataDo.getTime() - dataOd.getTime()) / MS_W_DNIU);
}

function calculate(values: Record<string, string>) {
  if (!values.dataOd || !values.dataDo) return { results: [], error: "Podaj obie daty." };

  const dataOd = new Date(values.dataOd + "T00:00:00");
  const dataDo = new Date(values.dataDo + "T00:00:00");

  if (Number.isNaN(dataOd.getTime()) || Number.isNaN(dataDo.getTime())) {
    return { results: [], error: "Podane daty są nieprawidłowe." };
  }

  const dni = roznicaDni(dataOd, dataDo);

  return {
    results: [
      { label: "Różnica w dniach", value: `${formatNumber(Math.abs(dni), 0)} dni`, highlight: true },
      { label: "Różnica w tygodniach", value: `${formatNumber(Math.abs(dni) / 7, 1)} tyg.` },
      { label: "Kierunek", value: dni >= 0 ? "Data „do” jest późniejsza" : "Data „do” jest wcześniejsza" },
    ],
  };
}

export const roznicaDniConfig: CalculatorConfig = {
  slug: "roznica-dni",
  name: "Kalkulator różnicy dni między datami",
  shortName: "Różnica dni",
  shortDescription: "Oblicz liczbę dni między dwiema datami.",
  metaDescription: "Kalkulator różnicy dni między datami online: sprawdź, ile dni (i tygodni) dzieli dwie wybrane daty kalendarzowe.",
  category: "czas-i-data",
  tags: ["różnica dni", "data", "kalendarz", "czas i data"],
  popular: true,
  fields: [
    { id: "dataOd", label: "Data początkowa", type: "date", defaultValue: "" },
    { id: "dataDo", label: "Data końcowa", type: "date", defaultValue: "" },
  ],
  calculate,
  intro: "Kalkulator oblicza dokładną liczbę dni (i tygodni) pomiędzy dwiema wybranymi datami kalendarzowymi.",
  howTo: ["Wybierz datę początkową.", "Wybierz datę końcową.", "Wynik pokaże liczbę dni i tygodni między datami."],
  formula: "Różnica dni = (data końcowa − data początkowa) w dniach.",
  examples: [{ input: "01.01.2026 → 31.01.2026", output: "30 dni" }],
  faq: [
    {
      q: "Czy kalkulator liczy również lata przestępne?",
      a: "Tak, obliczenia bazują na rzeczywistych datach kalendarzowych JavaScript, więc lata przestępne są uwzględniane automatycznie.",
    },
    {
      q: "Co jeśli data końcowa jest wcześniejsza niż początkowa?",
      a: "Kalkulator pokaże wartość bezwzględną różnicy dni oraz informację, że data końcowa jest wcześniejsza.",
    },
  ],
};
