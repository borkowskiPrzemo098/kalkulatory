import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";
import { bruttoZNetto, nettoZBrutto } from "./vat";

function resolveStawka(values: Record<string, string>): number {
  if (values.stawka === "wlasna") return parseLocaleNumber(values.stawkaWlasna);
  return parseLocaleNumber(values.stawka);
}

function calculate(values: Record<string, string>) {
  const kierunek = values.kierunek || "brutto-na-netto";
  const kwota = parseLocaleNumber(values.kwota);
  const stawka = resolveStawka(values);

  if (Number.isNaN(kwota)) return { results: [], error: "Podaj kwotę do przeliczenia." };
  if (kwota < 0) return { results: [], error: "Kwota nie może być ujemna." };
  if (Number.isNaN(stawka) || stawka < 0) return { results: [], error: "Podaj prawidłową stawkę VAT." };

  if (kierunek === "brutto-na-netto") {
    const netto = nettoZBrutto(kwota, stawka);
    return {
      results: [
        { label: "Kwota netto", value: formatCurrency(netto), highlight: true },
        { label: "Podatek VAT", value: formatCurrency(kwota - netto) },
        { label: "Kwota brutto", value: formatCurrency(kwota) },
      ],
    };
  }

  const brutto = bruttoZNetto(kwota, stawka);
  return {
    results: [
      { label: "Kwota brutto", value: formatCurrency(brutto), highlight: true },
      { label: "Podatek VAT", value: formatCurrency(brutto - kwota) },
      { label: "Kwota netto", value: formatCurrency(kwota) },
    ],
  };
}

export const bruttoNettoConfig: CalculatorConfig = {
  slug: "brutto-netto",
  name: "Kalkulator brutto - netto",
  shortName: "Brutto - netto",
  shortDescription: "Szybko przelicz kwotę brutto na netto lub netto na brutto dla dowolnej stawki VAT.",
  metaDescription:
    "Kalkulator brutto-netto: przelicz kwotę w obie strony dla stawek VAT 23%, 8%, 5% lub własnej. Prosty, szybki, bez rejestracji.",
  category: "finanse",
  tags: ["brutto", "netto", "cena", "vat", "przelicznik"],
  fields: [
    {
      id: "kierunek",
      label: "Kierunek przeliczenia",
      type: "select",
      defaultValue: "brutto-na-netto",
      options: [
        { value: "brutto-na-netto", label: "Brutto → netto" },
        { value: "netto-na-brutto", label: "Netto → brutto" },
      ],
    },
    { id: "kwota", label: "Kwota", type: "number", defaultValue: "1000" },
    {
      id: "stawka",
      label: "Stawka VAT",
      type: "select",
      defaultValue: "23",
      options: [
        { value: "23", label: "23%" },
        { value: "8", label: "8%" },
        { value: "5", label: "5%" },
        { value: "0", label: "0%" },
        { value: "wlasna", label: "Inna stawka" },
      ],
    },
    {
      id: "stawkaWlasna",
      label: "Własna stawka VAT",
      type: "number",
      unit: "%",
      defaultValue: "12",
      dependsOn: { field: "stawka", value: "wlasna" },
    },
  ],
  calculate,
  intro:
    "Ten kalkulator pozwala błyskawicznie przeliczyć dowolną kwotę z brutto na netto lub z netto na brutto, dla wybranej stawki VAT. To wygodna, uproszczona alternatywa dla pełnego kalkulatora VAT, gdy potrzebujesz jednego szybkiego przeliczenia.",
  howTo: [
    "Wybierz kierunek przeliczenia: brutto na netto lub netto na brutto.",
    "Wpisz kwotę.",
    "Wybierz stawkę VAT — wynik pojawi się automatycznie.",
  ],
  formula: "Netto = Brutto / (1 + stawka/100). Brutto = Netto × (1 + stawka/100).",
  examples: [{ input: "1000 zł brutto, VAT 23%", output: "813,01 zł netto" }],
  faq: [
    {
      q: "Czym różni się ten kalkulator od kalkulatora VAT?",
      a: "Działa na tej samej logice, ale w uproszczonej, jednokierunkowej formie — idealny do szybkich, pojedynczych przeliczeń.",
    },
  ],
};
