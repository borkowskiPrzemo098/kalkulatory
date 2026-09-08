import { CalculatorConfig } from "./types";
import { formatNumber } from "@/lib/format";

export interface WiekWynik {
  lata: number;
  miesiace: number;
  dni: number;
  calkowiteDni: number;
}

export function obliczWiek(dataUrodzenia: Date, dataOdniesienia: Date): WiekWynik {
  let lata = dataOdniesienia.getFullYear() - dataUrodzenia.getFullYear();
  let miesiace = dataOdniesienia.getMonth() - dataUrodzenia.getMonth();
  let dni = dataOdniesienia.getDate() - dataUrodzenia.getDate();

  if (dni < 0) {
    miesiace -= 1;
    const poprzedniMiesiac = new Date(dataOdniesienia.getFullYear(), dataOdniesienia.getMonth(), 0);
    dni += poprzedniMiesiac.getDate();
  }
  if (miesiace < 0) {
    lata -= 1;
    miesiace += 12;
  }

  const MS_W_DNIU = 1000 * 60 * 60 * 24;
  const calkowiteDni = Math.floor((dataOdniesienia.getTime() - dataUrodzenia.getTime()) / MS_W_DNIU);

  return { lata, miesiace, dni, calkowiteDni };
}

function calculate(values: Record<string, string>) {
  const dataStr = values.dataUrodzenia;
  if (!dataStr) return { results: [], error: "Podaj datę urodzenia." };

  const dataUrodzenia = new Date(dataStr + "T00:00:00");
  const dzisiaj = new Date();
  const dzisiajBezCzasu = new Date(dzisiaj.getFullYear(), dzisiaj.getMonth(), dzisiaj.getDate());

  if (Number.isNaN(dataUrodzenia.getTime())) {
    return { results: [], error: "Podana data jest nieprawidłowa." };
  }
  if (dataUrodzenia.getTime() > dzisiajBezCzasu.getTime()) {
    return { results: [], error: "Data urodzenia nie może być w przyszłości." };
  }

  const { lata, miesiace, dni, calkowiteDni } = obliczWiek(dataUrodzenia, dzisiajBezCzasu);

  return {
    results: [
      { label: "Wiek", value: `${lata} lat, ${miesiace} mies., ${dni} dni`, highlight: true },
      { label: "Wiek w miesiącach", value: `${formatNumber(lata * 12 + miesiace, 0)} mies.` },
      { label: "Wiek w dniach", value: `${formatNumber(calkowiteDni, 0)} dni` },
    ],
  };
}

export const wiekConfig: CalculatorConfig = {
  slug: "wiek",
  name: "Kalkulator wieku",
  shortName: "Wiek",
  shortDescription: "Oblicz dokładny wiek w latach, miesiącach i dniach na podstawie daty urodzenia.",
  metaDescription:
    "Kalkulator wieku online: podaj datę urodzenia i sprawdź dokładny wiek w latach, miesiącach i dniach.",
  category: "czas-i-data",
  tags: ["wiek", "data urodzenia", "lata", "kalkulator daty"],
  popular: true,
  fields: [{ id: "dataUrodzenia", label: "Data urodzenia", type: "date", defaultValue: "" }],
  calculate,
  intro:
    "Kalkulator wieku oblicza dokładny wiek na podstawie podanej daty urodzenia — w pełnych latach, miesiącach i dniach, licząc względem dzisiejszej daty.",
  howTo: ["Wybierz swoją datę urodzenia z kalendarza.", "Wynik wieku pojawi się automatycznie."],
  formula:
    "Wiek obliczany jest jako różnica kalendarzowa między datą urodzenia a datą dzisiejszą, z uwzględnieniem pełnych lat, miesięcy i dni.",
  examples: [{ input: "Data urodzenia: 15.03.1990", output: "Wiek w latach, miesiącach i dniach względem dziś" }],
  faq: [
    {
      q: "Czy kalkulator uwzględnia lata przestępne?",
      a: "Tak, obliczenia bazują na rzeczywistych datach kalendarzowych, więc lata przestępne są uwzględniane automatycznie.",
    },
  ],
};
