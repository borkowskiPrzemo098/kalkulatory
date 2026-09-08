import { CalculatorConfig } from "./types";

export function dodajDni(data: Date, liczbaDni: number): Date {
  const wynik = new Date(data);
  wynik.setDate(wynik.getDate() + liczbaDni);
  return wynik;
}

function formatujDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric", weekday: "long" });
}

function calculate(values: Record<string, string>) {
  if (!values.data) return { results: [], error: "Podaj datę początkową." };
  const liczbaDniStr = values.liczbaDni;
  const operacja = values.operacja || "dodaj";

  const dataPoczatkowa = new Date(values.data + "T00:00:00");
  if (Number.isNaN(dataPoczatkowa.getTime())) return { results: [], error: "Podana data jest nieprawidłowa." };

  const liczbaDni = Number(liczbaDniStr);
  if (liczbaDniStr === undefined || liczbaDniStr === "" || Number.isNaN(liczbaDni)) return { results: [], error: "Podaj liczbę dni." };
  if (!Number.isInteger(liczbaDni) || liczbaDni < 0) return { results: [], error: "Liczba dni musi być nieujemną liczbą całkowitą." };

  const znak = operacja === "odejmij" ? -1 : 1;
  const wynik = dodajDni(dataPoczatkowa, znak * liczbaDni);

  return { results: [{ label: "Data wynikowa", value: formatujDate(wynik), highlight: true }] };
}

export const dodawanieDniConfig: CalculatorConfig = {
  slug: "dodawanie-dni",
  name: "Kalkulator dodawania/odejmowania dni od daty",
  shortName: "Dodawanie dni do daty",
  shortDescription: "Oblicz datę powstałą po dodaniu lub odjęciu liczby dni od wybranej daty.",
  metaDescription: "Kalkulator dodawania i odejmowania dni od daty online: sprawdź, jaka data wypadnie po dodaniu lub odjęciu określonej liczby dni.",
  category: "czas-i-data",
  tags: ["data", "dodawanie dni", "kalendarz", "czas i data"],
  fields: [
    { id: "data", label: "Data początkowa", type: "date", defaultValue: "" },
    {
      id: "operacja",
      label: "Operacja",
      type: "select",
      defaultValue: "dodaj",
      options: [
        { value: "dodaj", label: "Dodaj dni" },
        { value: "odejmij", label: "Odejmij dni" },
      ],
    },
    { id: "liczbaDni", label: "Liczba dni", type: "number", defaultValue: "30" },
  ],
  calculate,
  intro: "Kalkulator oblicza datę, jaka wypadnie po dodaniu lub odjęciu określonej liczby dni od wybranej daty początkowej — przydatny do planowania terminów, np. terminów płatności czy wygaśnięcia umów.",
  howTo: ["Wybierz datę początkową.", "Wybierz, czy chcesz dodać, czy odjąć dni.", "Podaj liczbę dni."],
  formula: "Data wynikowa = data początkowa ± liczba dni.",
  examples: [{ input: "01.01.2026 + 30 dni", output: "31.01.2026" }],
  faq: [
    {
      q: "Czy kalkulator uwzględnia lata przestępne?",
      a: "Tak, obliczenia opierają się na rzeczywistym kalendarzu, więc luty w roku przestępnym ma poprawnie 29 dni.",
    },
    {
      q: "Czy mogę odjąć więcej dni niż upłynęło od danej daty?",
      a: "Tak, kalkulator poprawnie policzy datę również w poprzednich latach kalendarzowych.",
    },
  ],
};
