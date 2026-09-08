import { CalculatorConfig } from "./types";
import { formatNumber, parseLocaleNumber } from "@/lib/format";

export function liczbaCegiel(powierzchniaMuruM2: number, sztukNaM2: number, zapasProc: number): number {
  return Math.ceil(powierzchniaMuruM2 * sztukNaM2 * (1 + zapasProc / 100));
}

function calculate(values: Record<string, string>) {
  const powierzchnia = parseLocaleNumber(values.powierzchnia);
  const sztukNaM2 = parseLocaleNumber(values.sztukNaM2);
  const zapas = parseLocaleNumber(values.zapas);

  if ([powierzchnia, sztukNaM2, zapas].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (powierzchnia <= 0) return { results: [], error: "Powierzchnia muru musi być większa od zera." };
  if (sztukNaM2 <= 0) return { results: [], error: "Liczba sztuk na m² musi być większa od zera." };
  if (zapas < 0) return { results: [], error: "Zapas nie może być ujemny." };

  const sztuk = liczbaCegiel(powierzchnia, sztukNaM2, zapas);

  return { results: [{ label: "Potrzebna liczba cegieł/bloczków", value: `${formatNumber(sztuk, 0)} szt.`, highlight: true }] };
}

export const liczbaCegielConfig: CalculatorConfig = {
  slug: "liczba-cegiel",
  name: "Kalkulator liczby cegieł/bloczków",
  shortName: "Liczba cegieł",
  shortDescription: "Oblicz liczbę cegieł lub bloczków potrzebnych do wymurowania ściany.",
  metaDescription: "Kalkulator liczby cegieł i bloczków online: oblicz potrzebną liczbę sztuk materiału ściennego na podstawie powierzchni muru.",
  category: "dom",
  tags: ["cegły", "bloczki", "budowa", "mur", "dom"],
  fields: [
    { id: "powierzchnia", label: "Powierzchnia muru", type: "number", unit: "m²", defaultValue: "50" },
    {
      id: "sztukNaM2",
      label: "Liczba sztuk na m²",
      type: "number",
      defaultValue: "50",
      helpText: "Zależy od rodzaju i wymiarów materiału (np. cegła pełna ~50 szt./m², bloczek gazobetonowy ~8-10 szt./m²).",
    },
    { id: "zapas", label: "Zapas na docinki i ubytki", type: "number", unit: "%", defaultValue: "5" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza liczbę cegieł lub bloczków potrzebnych do wymurowania ściany o danej powierzchni, na podstawie liczby sztuk materiału przypadających na metr kwadratowy muru (informacja dostępna zwykle u producenta).",
  howTo: [
    "Podaj powierzchnię muru do wybudowania.",
    "Podaj liczbę sztuk materiału (cegieł/bloczków) przypadających na 1 m² muru — znajdziesz ją w danych technicznych produktu.",
    "Ustal zapas procentowy na docinki i ewentualne ubytki.",
  ],
  formula: "Liczba sztuk = ⌈powierzchnia muru × sztuk/m² × (1 + zapas/100)⌉.",
  examples: [{ input: "10 m², 50 szt./m², zapas 5%", output: "525 szt." }],
  faq: [
    {
      q: "Skąd wziąć liczbę sztuk na m² dla mojego materiału?",
      a: "Producenci podają tę wartość w kartach technicznych produktu — zależy od wymiarów cegły/bloczka i grubości spoiny.",
    },
    {
      q: "Czy warto doliczyć zapas?",
      a: "Tak, zwykle zaleca się 5–10% zapasu na docinki, uszkodzenia w transporcie i nieprzewidziane straty.",
    },
  ],
};
