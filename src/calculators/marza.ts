import { CalculatorConfig } from "./types";
import { formatCurrency, formatPercent, parseLocaleNumber } from "@/lib/format";

export function obliczMarze(cenaZakupu: number, cenaSprzedazy: number): number {
  if (cenaSprzedazy === 0) return NaN;
  return ((cenaSprzedazy - cenaZakupu) / cenaSprzedazy) * 100;
}

export function obliczNarzut(cenaZakupu: number, cenaSprzedazy: number): number {
  if (cenaZakupu === 0) return NaN;
  return ((cenaSprzedazy - cenaZakupu) / cenaZakupu) * 100;
}

function calculate(values: Record<string, string>) {
  const zakup = parseLocaleNumber(values.zakup);
  const sprzedaz = parseLocaleNumber(values.sprzedaz);

  if (Number.isNaN(zakup) || Number.isNaN(sprzedaz)) {
    return { results: [], error: "Podaj cenę zakupu i cenę sprzedaży." };
  }
  if (zakup < 0 || sprzedaz < 0) return { results: [], error: "Ceny nie mogą być ujemne." };
  if (zakup === 0) return { results: [], error: "Cena zakupu nie może być równa zero (dzielenie przez zero przy narzucie)." };
  if (sprzedaz === 0) return { results: [], error: "Cena sprzedaży nie może być równa zero (dzielenie przez zero przy marży)." };

  const zysk = sprzedaz - zakup;
  const marza = obliczMarze(zakup, sprzedaz);
  const narzut = obliczNarzut(zakup, sprzedaz);

  return {
    results: [
      { label: "Zysk", value: formatCurrency(zysk), highlight: true },
      { label: "Marża", value: formatPercent(marza, 2) },
      { label: "Narzut", value: formatPercent(narzut, 2) },
    ],
  };
}

export const marzaConfig: CalculatorConfig = {
  slug: "marza",
  name: "Kalkulator marży i narzutu",
  shortName: "Marża i narzut",
  shortDescription: "Oblicz marżę i narzut procentowy na podstawie ceny zakupu i sprzedaży.",
  metaDescription:
    "Kalkulator marży i narzutu online: podaj cenę zakupu i sprzedaży, otrzymaj zysk, marżę % i narzut %. Wyjaśnienie różnicy między marżą a narzutem.",
  category: "biznes",
  tags: ["marża", "narzut", "biznes", "zysk", "cena"],
  popular: true,
  fields: [
    { id: "zakup", label: "Cena zakupu", type: "number", defaultValue: "80" },
    { id: "sprzedaz", label: "Cena sprzedaży", type: "number", defaultValue: "100" },
  ],
  calculate,
  intro:
    "Marża i narzut to dwa różne sposoby liczenia rentowności sprzedaży, które łatwo pomylić. Marża to zysk liczony w stosunku do ceny sprzedaży, a narzut to zysk liczony w stosunku do ceny zakupu. Ten kalkulator liczy obie wartości naraz.",
  howTo: [
    "Wpisz cenę zakupu (koszt) produktu.",
    "Wpisz cenę sprzedaży produktu.",
    "Odczytaj zysk, marżę procentową i narzut procentowy.",
  ],
  formula:
    "Marża % = ((cena sprzedaży − cena zakupu) / cena sprzedaży) × 100. Narzut % = ((cena sprzedaży − cena zakupu) / cena zakupu) × 100.",
  examples: [{ input: "Zakup 80 zł, sprzedaż 100 zł", output: "Zysk 20 zł, marża 20%, narzut 25%" }],
  faq: [
    {
      q: "Czym różni się marża od narzutu?",
      a: "Marża odnosi zysk do ceny sprzedaży, a narzut do ceny zakupu. Przy tym samym zysku narzut zawsze będzie liczbowo wyższy niż marża (poza przypadkiem zerowego zysku).",
    },
    {
      q: "Jak przeliczyć narzut na marżę?",
      a: "Marża = narzut / (1 + narzut), przy czym oba wyrażone są jako ułamek dziesiętny, a wynik mnoży się przez 100, by uzyskać procent.",
    },
  ],
};
