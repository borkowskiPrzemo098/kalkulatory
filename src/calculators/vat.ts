import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function nettoZBrutto(brutto: number, stawka: number): number {
  return brutto / (1 + stawka / 100);
}

export function bruttoZNetto(netto: number, stawka: number): number {
  return netto * (1 + stawka / 100);
}

function resolveStawka(values: Record<string, string>): number {
  if (values.stawka === "wlasna") {
    return parseLocaleNumber(values.stawkaWlasna);
  }
  return parseLocaleNumber(values.stawka);
}

function calculate(values: Record<string, string>) {
  const tryb = values.tryb || "netto-z-brutto";
  const stawka = resolveStawka(values);

  if (Number.isNaN(stawka) || stawka < 0) {
    return { results: [], error: "Podaj prawidłową stawkę VAT (liczba nieujemna)." };
  }

  if (tryb === "netto-z-brutto") {
    const brutto = parseLocaleNumber(values.kwota);
    if (Number.isNaN(brutto)) return { results: [], error: "Podaj kwotę brutto." };
    if (brutto < 0) return { results: [], error: "Kwota nie może być ujemna." };
    const netto = nettoZBrutto(brutto, stawka);
    const vat = brutto - netto;
    return {
      results: [
        { label: "Kwota netto", value: formatCurrency(netto), highlight: true },
        { label: "Kwota VAT", value: formatCurrency(vat) },
        { label: "Kwota brutto", value: formatCurrency(brutto) },
      ],
    };
  }

  if (tryb === "brutto-z-netto") {
    const netto = parseLocaleNumber(values.kwota);
    if (Number.isNaN(netto)) return { results: [], error: "Podaj kwotę netto." };
    if (netto < 0) return { results: [], error: "Kwota nie może być ujemna." };
    const brutto = bruttoZNetto(netto, stawka);
    const vat = brutto - netto;
    return {
      results: [
        { label: "Kwota brutto", value: formatCurrency(brutto), highlight: true },
        { label: "Kwota VAT", value: formatCurrency(vat) },
        { label: "Kwota netto", value: formatCurrency(netto) },
      ],
    };
  }

  // oblicz-vat: mamy netto i brutto, chcemy samą kwotę VAT
  const netto = parseLocaleNumber(values.kwotaNetto);
  const brutto = parseLocaleNumber(values.kwotaBrutto);
  if (Number.isNaN(netto) || Number.isNaN(brutto)) {
    return { results: [], error: "Podaj kwotę netto i brutto." };
  }
  if (netto < 0 || brutto < 0) return { results: [], error: "Kwoty nie mogą być ujemne." };
  const vat = brutto - netto;
  return {
    results: [{ label: "Kwota VAT", value: formatCurrency(vat), highlight: true }],
  };
}

export const vatConfig: CalculatorConfig = {
  slug: "vat",
  name: "Kalkulator VAT",
  shortName: "VAT",
  shortDescription: "Przelicz cenę netto na brutto, brutto na netto lub oblicz samą kwotę podatku VAT.",
  metaDescription:
    "Kalkulator VAT online: netto na brutto, brutto na netto, dowolna stawka VAT (23%, 8%, 5% lub własna). Szybko i za darmo.",
  category: "finanse",
  tags: ["vat", "podatek", "netto", "brutto", "finanse"],
  popular: true,
  fields: [
    {
      id: "tryb",
      label: "Co chcesz obliczyć?",
      type: "select",
      defaultValue: "netto-z-brutto",
      options: [
        { value: "netto-z-brutto", label: "Netto z kwoty brutto" },
        { value: "brutto-z-netto", label: "Brutto z kwoty netto" },
        { value: "oblicz-vat", label: "Sama kwota VAT (znam netto i brutto)" },
      ],
    },
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
      dependsOn: { field: "tryb", value: "netto-z-brutto" },
    },
    {
      id: "stawkaWlasna",
      label: "Własna stawka VAT",
      type: "number",
      unit: "%",
      defaultValue: "12",
      dependsOn: { field: "stawka", value: "wlasna" },
    },
    {
      id: "kwota",
      label: "Kwota brutto",
      type: "number",
      defaultValue: "123",
      dependsOn: { field: "tryb", value: "netto-z-brutto" },
    },
    {
      id: "stawka2",
      label: "Stawka VAT",
      type: "select",
      defaultValue: "23",
      options: [
        { value: "23", label: "23%" },
        { value: "8", label: "8%" },
        { value: "5", label: "5%" },
        { value: "0", label: "0%" },
      ],
      dependsOn: { field: "tryb", value: "brutto-z-netto" },
    },
    {
      id: "kwotaNettoDoBrutto",
      label: "Kwota netto",
      type: "number",
      defaultValue: "100",
      dependsOn: { field: "tryb", value: "brutto-z-netto" },
    },
    {
      id: "kwotaNetto",
      label: "Kwota netto",
      type: "number",
      defaultValue: "100",
      dependsOn: { field: "tryb", value: "oblicz-vat" },
    },
    {
      id: "kwotaBrutto",
      label: "Kwota brutto",
      type: "number",
      defaultValue: "123",
      dependsOn: { field: "tryb", value: "oblicz-vat" },
    },
  ],
  calculate: (values) => {
    // Ujednolicenie nazw pól zależnych od trybu przed przekazaniem do właściwej logiki.
    const merged = { ...values };
    if (values.tryb === "brutto-z-netto") {
      merged.stawka = values.stawka2;
      merged.kwota = values.kwotaNettoDoBrutto;
    }
    return calculate(merged);
  },
  intro:
    "Kalkulator VAT umożliwia szybkie przeliczenie ceny netto na brutto, brutto na netto oraz obliczenie samej kwoty podatku VAT. Obsługuje standardowe polskie stawki VAT (23%, 8%, 5%) oraz dowolną własną stawkę.",
  howTo: [
    "Wybierz, co chcesz obliczyć: netto z brutto, brutto z netto, czy samą kwotę VAT.",
    "Wybierz stawkę VAT lub wpisz własną.",
    "Wpisz kwotę — wynik przeliczy się automatycznie.",
  ],
  formula: "Netto = Brutto / (1 + stawka/100). Brutto = Netto × (1 + stawka/100). VAT = Brutto − Netto.",
  examples: [
    { input: "123 zł brutto, VAT 23%", output: "100 zł netto, 23 zł VAT" },
    { input: "100 zł netto, VAT 23%", output: "123 zł brutto" },
  ],
  faq: [
    {
      q: "Jak obliczyć netto z brutto przy VAT 23%?",
      a: "Podziel kwotę brutto przez 1,23. Na przykład 123 zł / 1,23 = 100 zł netto.",
    },
    {
      q: "Jak obliczyć brutto z netto?",
      a: "Pomnóż kwotę netto przez (1 + stawka VAT/100). Przy stawce 23%: 100 zł × 1,23 = 123 zł.",
    },
    {
      q: "Jakie stawki VAT obowiązują w Polsce?",
      a: "Podstawowe stawki to 23%, 8%, 5% oraz 0% dla wybranych towarów i usług. Kalkulator pozwala też wpisać dowolną inną stawkę.",
    },
  ],
};
