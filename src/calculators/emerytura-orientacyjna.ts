import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

const STOPA_SKLADKI_EMERYTALNEJ_PROC = 19.52;
const MIESIACE_POBIERANIA_DOMYSLNIE = 240; // ok. 20 lat dalszego trwania życia

export function szacowanyKapital(
  wynagrodzenieMiesieczne: number,
  liczbaMiesiecyOszczedzania: number,
  waloryzacjaRocznaProc: number,
  stopaSkladkiProc: number = STOPA_SKLADKI_EMERYTALNEJ_PROC
): number {
  const skladkaMiesieczna = wynagrodzenieMiesieczne * (stopaSkladkiProc / 100);
  const r = waloryzacjaRocznaProc / 100 / 12;
  if (r === 0) return skladkaMiesieczna * liczbaMiesiecyOszczedzania;
  return skladkaMiesieczna * ((Math.pow(1 + r, liczbaMiesiecyOszczedzania) - 1) / r);
}

export function szacowanaEmeryturaMiesieczna(
  kapital: number,
  miesiacePobierania: number = MIESIACE_POBIERANIA_DOMYSLNIE
): number {
  return kapital / miesiacePobierania;
}

function calculate(values: Record<string, string>) {
  const wynagrodzenie = parseLocaleNumber(values.wynagrodzenie);
  const wiekObecny = parseLocaleNumber(values.wiekObecny);
  const wiekEmerytalny = parseLocaleNumber(values.wiekEmerytalny);
  const waloryzacja = parseLocaleNumber(values.waloryzacja);

  if ([wynagrodzenie, wiekObecny, wiekEmerytalny, waloryzacja].some((v) => Number.isNaN(v))) {
    return { results: [], error: "Uzupełnij wszystkie pola liczbami." };
  }
  if (wynagrodzenie <= 0) return { results: [], error: "Wynagrodzenie musi być większe od zera." };
  if (wiekObecny <= 0 || wiekEmerytalny <= 0) return { results: [], error: "Podaj prawidłowy wiek." };
  if (wiekEmerytalny <= wiekObecny) return { results: [], error: "Wiek emerytalny musi być większy niż obecny wiek." };

  const miesiace = (wiekEmerytalny - wiekObecny) * 12;
  const kapital = szacowanyKapital(wynagrodzenie, miesiace, waloryzacja);
  const emeryturaM = szacowanaEmeryturaMiesieczna(kapital);

  return {
    results: [
      { label: "Orientacyjna emerytura miesięczna", value: formatCurrency(emeryturaM), highlight: true },
      { label: "Szacowany zgromadzony kapitał", value: formatCurrency(kapital) },
    ],
  };
}

export const emeryturaOrientacyjnaConfig: CalculatorConfig = {
  slug: "emerytura-orientacyjna",
  name: "Orientacyjny kalkulator emerytalny",
  shortName: "Emerytura (orientacyjnie)",
  shortDescription: "Bardzo uproszczone oszacowanie przyszłej emerytury na bazie obecnego wynagrodzenia.",
  metaDescription: "Kalkulator emerytalny online: orientacyjne oszacowanie wysokości przyszłej emerytury na podstawie wynagrodzenia, wieku i waloryzacji składek.",
  category: "finanse",
  tags: ["emerytura", "zus", "finanse", "przyszłość", "oszczędności"],
  fields: [
    { id: "wynagrodzenie", label: "Obecne wynagrodzenie brutto", type: "number", unit: "zł/mies.", defaultValue: "6000" },
    { id: "wiekObecny", label: "Twój obecny wiek", type: "number", unit: "lat", defaultValue: "30" },
    { id: "wiekEmerytalny", label: "Planowany wiek emerytalny", type: "number", unit: "lat", defaultValue: "65" },
    { id: "waloryzacja", label: "Średnia roczna waloryzacja składek", type: "number", unit: "%", defaultValue: "3" },
  ],
  calculate,
  intro:
    "Bardzo uproszczony kalkulator szacuje możliwą wysokość przyszłej emerytury na podstawie obecnego wynagrodzenia, wieku, planowanego wieku przejścia na emeryturę oraz założonej waloryzacji składek. To wyłącznie poglądowe wyliczenie, nie prognoza ZUS.",
  howTo: [
    "Podaj swoje obecne wynagrodzenie brutto miesięczne.",
    "Wpisz obecny wiek oraz planowany wiek przejścia na emeryturę.",
    "Podaj zakładaną średnioroczną waloryzację składek emerytalnych.",
  ],
  formula:
    "Kapitał = suma zwaloryzowanych składek (19,52% wynagrodzenia miesięcznie) przez okres do emerytury. Emerytura miesięczna ≈ kapitał / 240 (przyjęte ok. 20 lat dalszego pobierania świadczenia).",
  examples: [
    { input: "6000 zł brutto, wiek 30→65, waloryzacja 3%", output: "≈ 3618,83 zł emerytury miesięcznie" },
    { input: "5000 zł brutto, wiek 50→60, waloryzacja 0%", output: "488 zł emerytury miesięcznie" },
  ],
  faq: [
    {
      q: "Czy to jest oficjalna prognoza ZUS?",
      a: "Nie. To bardzo uproszczone, orientacyjne wyliczenie, które nie uwzględnia realnych zasad waloryzacji, przerw w zatrudnieniu, zmian wynagrodzenia w czasie ani kapitału początkowego. Nie stanowi porady finansowej ani prawnej — dokładną prognozę uzyskasz na koncie ZUS (PUE/eZUS).",
    },
    {
      q: "Dlaczego wynik zależy tak mocno od waloryzacji?",
      a: "Waloryzacja działa jak procent składany na wieloletnim okresie oszczędzania, więc nawet niewielka zmiana tej wartości znacząco wpływa na końcowy zgromadzony kapitał.",
    },
  ],
};
