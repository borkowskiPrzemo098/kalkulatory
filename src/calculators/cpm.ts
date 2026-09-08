import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function obliczCpm(kosztKampanii: number, liczbaWyswietlen: number): number {
  return (kosztKampanii / liczbaWyswietlen) * 1000;
}

function calculate(values: Record<string, string>) {
  const koszt = parseLocaleNumber(values.koszt);
  const wyswietlenia = parseLocaleNumber(values.wyswietlenia);

  if ([koszt, wyswietlenia].some((v) => Number.isNaN(v))) return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  if (koszt < 0) return { results: [], error: "Koszt kampanii nie może być ujemny." };
  if (wyswietlenia <= 0) return { results: [], error: "Liczba wyświetleń musi być większa od zera." };

  const cpm = obliczCpm(koszt, wyswietlenia);

  return { results: [{ label: "CPM (koszt na 1000 wyświetleń)", value: formatCurrency(cpm), highlight: true }] };
}

export const cpmConfig: CalculatorConfig = {
  slug: "cpm",
  name: "Kalkulator CPM",
  shortName: "CPM",
  shortDescription: "Oblicz CPM — koszt dotarcia do 1000 wyświetleń reklamy.",
  metaDescription: "Kalkulator CPM online: oblicz koszt na 1000 wyświetleń (Cost Per Mille) kampanii reklamowej na podstawie kosztu i liczby wyświetleń.",
  category: "biznes",
  tags: ["cpm", "reklama", "marketing", "biznes", "kampania"],
  fields: [
    { id: "koszt", label: "Koszt kampanii", type: "number", unit: "zł", defaultValue: "500" },
    { id: "wyswietlenia", label: "Liczba wyświetleń", type: "number", defaultValue: "250000" },
  ],
  calculate,
  intro:
    "CPM (Cost Per Mille) to wskaźnik marketingowy pokazujący koszt dotarcia do 1000 wyświetleń reklamy. Kalkulator ułatwia porównanie efektywności kosztowej różnych kampanii lub kanałów reklamowych.",
  howTo: ["Podaj całkowity koszt kampanii reklamowej.", "Podaj liczbę uzyskanych wyświetleń.", "Wynik pokaże koszt CPM."],
  formula: "CPM = (koszt kampanii / liczba wyświetleń) × 1000.",
  examples: [{ input: "500 zł, 250 000 wyświetleń", output: "CPM = 2 zł" }],
  faq: [
    {
      q: "Do czego służy wskaźnik CPM?",
      a: "CPM pozwala porównać koszt dotarcia do odbiorców między różnymi kampaniami, kanałami reklamowymi lub okresami czasu — niezależnie od skali budżetu.",
    },
    {
      q: "Czy niższy CPM zawsze oznacza lepszą kampanię?",
      a: "Niekoniecznie — CPM mówi tylko o koszcie dotarcia, nie o jakości ruchu czy konwersji. Warto analizować go razem z innymi wskaźnikami, np. ROAS czy CTR.",
    },
  ],
};
