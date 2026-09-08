import { CalculatorConfig } from "./types";

const WIEK_EMERYTALNY_KOBIETA = 60;
const WIEK_EMERYTALNY_MEZCZYZNA = 65;

export function dataEmerytury(dataUrodzenia: Date, plec: "m" | "k"): Date {
  const wiekEmerytalny = plec === "k" ? WIEK_EMERYTALNY_KOBIETA : WIEK_EMERYTALNY_MEZCZYZNA;
  const data = new Date(dataUrodzenia);
  data.setFullYear(data.getFullYear() + wiekEmerytalny);
  return data;
}

function formatujDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function calculate(values: Record<string, string>) {
  if (!values.dataUrodzenia) return { results: [], error: "Podaj datę urodzenia." };
  const plec = values.plec === "k" ? "k" : "m";

  const dataUrodzenia = new Date(values.dataUrodzenia + "T00:00:00");
  if (Number.isNaN(dataUrodzenia.getTime())) return { results: [], error: "Podana data jest nieprawidłowa." };

  const dzisiaj = new Date();
  if (dataUrodzenia.getTime() > dzisiaj.getTime()) return { results: [], error: "Data urodzenia nie może być w przyszłości." };

  const emerytura = dataEmerytury(dataUrodzenia, plec);
  const wiekEmerytalny = plec === "k" ? WIEK_EMERYTALNY_KOBIETA : WIEK_EMERYTALNY_MEZCZYZNA;

  return {
    results: [
      { label: "Data osiągnięcia wieku emerytalnego", value: formatujDate(emerytura), highlight: true },
      { label: "Ustawowy wiek emerytalny", value: `${wiekEmerytalny} lat` },
    ],
  };
}

export const wiekEmerytalnyConfig: CalculatorConfig = {
  slug: "wiek-emerytalny",
  name: "Kalkulator wieku emerytalnego",
  shortName: "Wiek emerytalny",
  shortDescription: "Sprawdź orientacyjną datę osiągnięcia ustawowego wieku emerytalnego w Polsce.",
  metaDescription: "Kalkulator wieku emerytalnego online: sprawdź, kiedy osiągniesz ustawowy wiek emerytalny w Polsce (60 lat kobiety, 65 lat mężczyźni).",
  category: "czas-i-data",
  tags: ["emerytura", "wiek emerytalny", "data", "zus", "czas i data"],
  fields: [
    { id: "dataUrodzenia", label: "Data urodzenia", type: "date", defaultValue: "" },
    {
      id: "plec",
      label: "Płeć",
      type: "select",
      defaultValue: "k",
      options: [
        { value: "k", label: "Kobieta" },
        { value: "m", label: "Mężczyzna" },
      ],
    },
  ],
  calculate,
  intro:
    "Kalkulator wylicza orientacyjną datę osiągnięcia ustawowego wieku emerytalnego w Polsce na podstawie daty urodzenia i płci — 60 lat dla kobiet i 65 lat dla mężczyzn.",
  howTo: ["Podaj datę urodzenia.", "Wybierz płeć.", "Wynik pokaże datę osiągnięcia ustawowego wieku emerytalnego."],
  formula: "Data emerytury = data urodzenia + 60 lat (kobiety) lub + 65 lat (mężczyźni).",
  examples: [{ input: "Kobieta, ur. 15.03.1990", output: "Wiek emerytalny osiągnięty 15.03.2050" }],
  faq: [
    {
      q: "Czy wiek emerytalny może się zmienić?",
      a: "Przepisy dotyczące wieku emerytalnego mogą ulec zmianie w przyszłości. Wynik kalkulatora oparty jest na aktualnie obowiązujących ustawowych wartościach (60 lat kobiety, 65 lat mężczyźni) i ma charakter orientacyjny — nie stanowi porady prawnej.",
    },
    {
      q: "Czy da się przejść na emeryturę wcześniej?",
      a: "W niektórych przypadkach (np. emerytury pomostowe, szczególne warunki pracy) możliwe jest wcześniejsze przejście na emeryturę — szczegóły warto sprawdzić na koncie ZUS lub skonsultować z doradcą.",
    },
  ],
};
