import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export interface NapiwekWynik {
  kwotaNapiwku: number;
  razem: number;
  naOsobe: number;
}

export function obliczNapiwek(kwotaRachunku: number, procentNapiwku: number, liczbaOsob: number): NapiwekWynik {
  const kwotaNapiwku = kwotaRachunku * (procentNapiwku / 100);
  const razem = kwotaRachunku + kwotaNapiwku;
  return { kwotaNapiwku, razem, naOsobe: razem / liczbaOsob };
}

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const procent = parseLocaleNumber(values.procent);
  const osoby = parseLocaleNumber(values.osoby);

  if ([kwota, procent, osoby].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (kwota < 0) return { results: [], error: "Kwota rachunku nie może być ujemna." };
  if (procent < 0) return { results: [], error: "Procent napiwku nie może być ujemny." };
  if (osoby <= 0 || !Number.isInteger(osoby)) return { results: [], error: "Liczba osób musi być dodatnią liczbą całkowitą." };

  const wynik = obliczNapiwek(kwota, procent, osoby);

  return {
    results: [
      { label: "Kwota napiwku", value: formatCurrency(wynik.kwotaNapiwku), highlight: true },
      { label: "Rachunek z napiwkiem", value: formatCurrency(wynik.razem) },
      { label: "Kwota na osobę", value: formatCurrency(wynik.naOsobe) },
    ],
  };
}

export const napiwekConfig: CalculatorConfig = {
  slug: "napiwek",
  name: "Kalkulator napiwku",
  shortName: "Napiwek",
  shortDescription: "Oblicz wysokość napiwku i kwotę do zapłaty na osobę.",
  metaDescription: "Kalkulator napiwku online: oblicz wysokość napiwku, łączną kwotę rachunku oraz kwotę do zapłaty na osobę.",
  category: "inne",
  tags: ["napiwek", "rachunek", "restauracja", "podział rachunku"],
  fields: [
    { id: "kwota", label: "Kwota rachunku", type: "number", unit: "zł", defaultValue: "200" },
    { id: "procent", label: "Wysokość napiwku", type: "number", unit: "%", defaultValue: "10" },
    { id: "osoby", label: "Liczba osób", type: "number", defaultValue: "4" },
  ],
  calculate,
  intro: "Kalkulator napiwku pozwala szybko obliczyć wysokość napiwku od kwoty rachunku oraz podzielić łączną kwotę na równe części między uczestników.",
  howTo: ["Podaj kwotę rachunku.", "Podaj procent napiwku, jaki chcesz zostawić.", "Podaj liczbę osób, między które dzielony jest rachunek."],
  formula: "Napiwek = kwota rachunku × procent / 100. Kwota na osobę = (rachunek + napiwek) / liczba osób.",
  examples: [{ input: "200 zł rachunku, napiwek 10%, 4 osoby", output: "20 zł napiwku, 55 zł na osobę" }],
  faq: [
    {
      q: "Jaki napiwek jest zwyczajowo przyjęty w Polsce?",
      a: "W Polsce zwyczajowy napiwek w restauracjach wynosi ok. 10%, choć nie jest to obowiązkowe i zależy od jakości obsługi oraz osobistej decyzji.",
    },
    {
      q: "Czy kalkulator dzieli rachunek po równo?",
      a: "Tak, kalkulator dzieli łączną kwotę (rachunek + napiwek) równo między podaną liczbę osób.",
    },
  ],
};
