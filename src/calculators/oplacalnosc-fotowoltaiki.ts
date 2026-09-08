import { CalculatorConfig } from "./types";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/format";

export interface FotowoltaikaWynik {
  rocznaOszczednosc: number;
  okresZwrotuLat: number;
}

export function opłacalnoscFotowoltaiki(
  kosztInstalacji: number,
  rocznaProdukcjaKwh: number,
  cenaKwh: number,
  autokonsumpcjaProc: number
): FotowoltaikaWynik {
  const rocznaOszczednosc = rocznaProdukcjaKwh * (autokonsumpcjaProc / 100) * cenaKwh;
  return { rocznaOszczednosc, okresZwrotuLat: kosztInstalacji / rocznaOszczednosc };
}

function calculate(values: Record<string, string>) {
  const koszt = parseLocaleNumber(values.koszt);
  const produkcja = parseLocaleNumber(values.produkcja);
  const cena = parseLocaleNumber(values.cena);
  const autokonsumpcja = parseLocaleNumber(values.autokonsumpcja);

  if ([koszt, produkcja, cena, autokonsumpcja].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (koszt <= 0) return { results: [], error: "Koszt instalacji musi być większy od zera." };
  if (produkcja <= 0) return { results: [], error: "Roczna produkcja energii musi być większa od zera." };
  if (cena < 0) return { results: [], error: "Cena energii nie może być ujemna." };
  if (autokonsumpcja < 0 || autokonsumpcja > 100) return { results: [], error: "Autokonsumpcja musi być z zakresu 0–100%." };

  const wynik = opłacalnoscFotowoltaiki(koszt, produkcja, cena, autokonsumpcja);

  return {
    results: [
      { label: "Orientacyjny okres zwrotu inwestycji", value: `${formatNumber(wynik.okresZwrotuLat, 1)} lat`, highlight: true },
      { label: "Szacowana roczna oszczędność", value: formatCurrency(wynik.rocznaOszczednosc) },
    ],
  };
}

export const oplacalnoscFotowoltaikiConfig: CalculatorConfig = {
  slug: "oplacalnosc-fotowoltaiki",
  name: "Kalkulator opłacalności fotowoltaiki",
  shortName: "Opłacalność fotowoltaiki",
  shortDescription: "Oszacuj uproszczony okres zwrotu instalacji fotowoltaicznej.",
  metaDescription: "Kalkulator opłacalności fotowoltaiki online: oszacuj uproszczony okres zwrotu inwestycji w panele słoneczne na podstawie kosztu, produkcji i cen energii.",
  category: "dom",
  tags: ["fotowoltaika", "panele słoneczne", "energia", "dom", "oszczędności"],
  fields: [
    { id: "koszt", label: "Koszt instalacji", type: "number", unit: "zł", defaultValue: "25000" },
    { id: "produkcja", label: "Szacowana roczna produkcja energii", type: "number", unit: "kWh/rok", defaultValue: "6000" },
    { id: "cena", label: "Cena energii z sieci", type: "number", unit: "zł/kWh", defaultValue: "0.9" },
    { id: "autokonsumpcja", label: "Udział energii zużywanej na bieżąco (autokonsumpcja)", type: "number", unit: "%", defaultValue: "70" },
  ],
  calculate,
  intro:
    "Kalkulator w uproszczony sposób szacuje okres zwrotu instalacji fotowoltaicznej na podstawie kosztu inwestycji, przewidywanej rocznej produkcji energii, ceny prądu z sieci oraz procenta energii zużywanej na bieżąco (autokonsumpcji). Rzeczywista opłacalność zależy od wielu dodatkowych czynników — to nie jest porada inwestycyjna.",
  howTo: [
    "Podaj szacowany koszt instalacji fotowoltaicznej.",
    "Podaj przewidywaną roczną produkcję energii przez panele.",
    "Podaj cenę energii z sieci oraz szacowany procent autokonsumpcji (ile energii z paneli zużyjesz od razu, zamiast oddawać do sieci).",
  ],
  formula: "Roczna oszczędność = roczna produkcja × autokonsumpcja/100 × cena energii. Okres zwrotu (lata) = koszt instalacji / roczna oszczędność.",
  examples: [{ input: "25 000 zł, 6000 kWh/rok, 0,90 zł/kWh, autokonsumpcja 70%", output: "≈ 6,6 roku zwrotu" }],
  faq: [
    {
      q: "Czy wynik uwzględnia dofinansowania i systemy rozliczeń (np. net-billing)?",
      a: "Nie. To bardzo uproszczone wyliczenie zakładające prostą oszczędność na zużyciu własnym. Rzeczywisty okres zwrotu zależy od systemu rozliczeń z operatorem, dopłat, degradacji paneli i zmian cen energii — skonsultuj dokładną kalkulację z instalatorem.",
    },
    {
      q: "Co to jest autokonsumpcja?",
      a: "To procent energii wyprodukowanej przez panele, który zużywasz na bieżąco we własnym gospodarstwie domowym, zamiast oddawać nadwyżki do sieci energetycznej.",
    },
  ],
};
