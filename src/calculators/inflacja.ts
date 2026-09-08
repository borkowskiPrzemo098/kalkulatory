import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function realnaWartosc(kwota: number, inflacjaRoczna: number, lata: number): number {
  return kwota / Math.pow(1 + inflacjaRoczna / 100, lata);
}

function calculate(values: Record<string, string>) {
  const kwota = parseLocaleNumber(values.kwota);
  const inflacja = parseLocaleNumber(values.inflacja);
  const lata = parseLocaleNumber(values.lata);

  if ([kwota, inflacja, lata].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (kwota < 0) return { results: [], error: "Kwota nie może być ujemna." };
  if (lata < 0) return { results: [], error: "Liczba lat nie może być ujemna." };
  if (inflacja <= -100) return { results: [], error: "Podaj prawidłową stopę inflacji." };

  const realna = realnaWartosc(kwota, inflacja, lata);
  const utrataWartosci = kwota - realna;

  return {
    results: [
      { label: "Realna wartość dzisiejszych pieniędzy za X lat", value: formatCurrency(realna), highlight: true },
      { label: "Utrata siły nabywczej", value: formatCurrency(utrataWartosci) },
    ],
  };
}

export const inflacjaConfig: CalculatorConfig = {
  slug: "inflacja",
  name: "Kalkulator inflacji",
  shortName: "Inflacja",
  shortDescription: "Sprawdź, ile warta będzie dzisiejsza kwota za kilka lat przy założonej inflacji.",
  metaDescription: "Kalkulator inflacji online: oblicz realną wartość pieniądza i utratę siły nabywczej w czasie przy podanej stopie inflacji.",
  category: "finanse",
  tags: ["inflacja", "wartość pieniądza", "finanse", "oszczędności"],
  fields: [
    { id: "kwota", label: "Kwota dzisiaj", type: "number", unit: "zł", defaultValue: "10000" },
    { id: "inflacja", label: "Średnia roczna inflacja", type: "number", unit: "%", defaultValue: "5" },
    { id: "lata", label: "Liczba lat", type: "number", defaultValue: "5" },
  ],
  calculate,
  intro:
    "Kalkulator inflacji pokazuje, ile realnie będzie warta dzisiejsza kwota pieniędzy po kilku latach, jeśli ceny będą rosły w podanym tempie. Pomaga zrozumieć, dlaczego trzymanie gotówki bez oprocentowania traci na wartości.",
  howTo: [
    "Podaj kwotę, której siłę nabywczą chcesz sprawdzić w przyszłości.",
    "Wpisz zakładaną średnioroczną inflację.",
    "Podaj liczbę lat, na jaką liczysz.",
  ],
  formula: "Realna wartość = Kwota / (1 + inflacja/100)^lata.",
  examples: [
    { input: "1000 zł, inflacja 5%, 1 rok", output: "≈ 952,38 zł realnej siły nabywczej" },
    { input: "10 000 zł, inflacja 8%, 3 lata", output: "≈ 7938,32 zł realnej siły nabywczej" },
  ],
  faq: [
    {
      q: "Co oznacza spadek realnej wartości pieniądza?",
      a: "Oznacza, że za tę samą kwotę pieniędzy w przyszłości kupisz mniej towarów i usług niż dzisiaj, ponieważ ceny rosną szybciej niż wartość nominalna Twoich oszczędności.",
    },
    {
      q: "Jak chronić oszczędności przed inflacją?",
      a: "Warto lokować środki w instrumenty o oprocentowaniu przewyższającym inflację, np. lokaty, obligacje indeksowane inflacją lub inne formy inwestycji — decyzję warto skonsultować z doradcą finansowym.",
    },
  ],
};
