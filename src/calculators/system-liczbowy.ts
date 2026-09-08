import { CalculatorConfig } from "./types";

const PODSTAWY: Record<string, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };

export function konwertujSystem(wartosc: string, zSystemu: string, naSystem: string): string {
  const podstawaZ = PODSTAWY[zSystemu];
  const podstawaNa = PODSTAWY[naSystem];
  const liczba = parseInt(wartosc.trim(), podstawaZ);
  if (Number.isNaN(liczba)) throw new Error("invalid");
  return liczba.toString(podstawaNa).toUpperCase();
}

function walidujCyfry(wartosc: string, system: string): boolean {
  const wzorce: Record<string, RegExp> = {
    bin: /^[01]+$/,
    oct: /^[0-7]+$/,
    dec: /^[0-9]+$/,
    hex: /^[0-9a-fA-F]+$/,
  };
  return wzorce[system].test(wartosc.trim());
}

function calculate(values: Record<string, string>) {
  const wartosc = (values.wartosc || "").trim();
  const zSystemu = values.zSystemu || "dec";
  const naSystem = values.naSystem || "bin";

  if (!wartosc) return { results: [], error: "Podaj liczbę do przeliczenia." };
  if (!walidujCyfry(wartosc, zSystemu)) {
    return { results: [], error: `Wprowadzona wartość zawiera cyfry niedozwolone w wybranym systemie liczbowym.` };
  }

  try {
    const wynik = konwertujSystem(wartosc, zSystemu, naSystem);
    return { results: [{ label: "Wynik", value: wynik, highlight: true }] };
  } catch {
    return { results: [], error: "Nie udało się przeliczyć podanej wartości." };
  }
}

export const systemLiczbowyConfig: CalculatorConfig = {
  slug: "system-liczbowy",
  name: "Konwerter systemów liczbowych",
  shortName: "Systemy liczbowe",
  shortDescription: "Przelicz liczby między systemem dwójkowym, ósemkowym, dziesiętnym i szesnastkowym.",
  metaDescription: "Konwerter systemów liczbowych online: przelicz liczby binarne, oktalne, dziesiętne i szesnastkowe (hex) między sobą.",
  category: "matematyka",
  tags: ["system liczbowy", "binarny", "hex", "dziesiętny", "informatyka", "matematyka"],
  fields: [
    { id: "wartosc", label: "Liczba do przeliczenia", type: "number", defaultValue: "255" },
    {
      id: "zSystemu",
      label: "System źródłowy",
      type: "select",
      defaultValue: "dec",
      options: [
        { value: "bin", label: "Dwójkowy (binarny)" },
        { value: "oct", label: "Ósemkowy" },
        { value: "dec", label: "Dziesiętny" },
        { value: "hex", label: "Szesnastkowy (hex)" },
      ],
    },
    {
      id: "naSystem",
      label: "System docelowy",
      type: "select",
      defaultValue: "bin",
      options: [
        { value: "bin", label: "Dwójkowy (binarny)" },
        { value: "oct", label: "Ósemkowy" },
        { value: "dec", label: "Dziesiętny" },
        { value: "hex", label: "Szesnastkowy (hex)" },
      ],
    },
  ],
  calculate,
  intro:
    "Konwerter systemów liczbowych przelicza liczby między systemem dwójkowym (binarnym), ósemkowym, dziesiętnym i szesnastkowym (hex) — przydatny w informatyce i elektronice.",
  howTo: [
    "Podaj liczbę do przeliczenia (używając cyfr zgodnych z systemem źródłowym).",
    "Wybierz system źródłowy oraz docelowy.",
    "Wynik pojawi się automatycznie.",
  ],
  formula: "Konwersja odbywa się poprzez zamianę liczby na wartość dziesiętną, a następnie zapis w systemie docelowym.",
  examples: [
    { input: "255 (dziesiętny) → hex", output: "FF" },
    { input: "1010 (binarny) → dziesiętny", output: "10" },
  ],
  faq: [
    {
      q: "Jakich znaków można używać w systemie szesnastkowym?",
      a: "Cyfr 0–9 oraz liter A–F (odpowiadających wartościom 10–15).",
    },
    {
      q: "Co zrobić, gdy podam cyfrę niedozwoloną w danym systemie?",
      a: "Kalkulator zwróci komunikat błędu — np. cyfra „2” jest niedozwolona w systemie binarnym, który używa tylko 0 i 1.",
    },
  ],
};
