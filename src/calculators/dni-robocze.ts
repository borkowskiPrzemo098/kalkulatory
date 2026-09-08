import { CalculatorConfig } from "./types";
import { formatNumber } from "@/lib/format";

export function liczbaDniRoboczych(dataOd: Date, dataDo: Date): number {
  const start = dataOd.getTime() <= dataDo.getTime() ? dataOd : dataDo;
  const koniec = dataOd.getTime() <= dataDo.getTime() ? dataDo : dataOd;

  let licznik = 0;
  const kursor = new Date(start);
  while (kursor.getTime() <= koniec.getTime()) {
    const dzienTygodnia = kursor.getDay();
    if (dzienTygodnia !== 0 && dzienTygodnia !== 6) licznik++;
    kursor.setDate(kursor.getDate() + 1);
  }
  return licznik;
}

function calculate(values: Record<string, string>) {
  if (!values.dataOd || !values.dataDo) return { results: [], error: "Podaj obie daty." };

  const dataOd = new Date(values.dataOd + "T00:00:00");
  const dataDo = new Date(values.dataDo + "T00:00:00");

  if (Number.isNaN(dataOd.getTime()) || Number.isNaN(dataDo.getTime())) {
    return { results: [], error: "Podane daty są nieprawidłowe." };
  }

  const dni = liczbaDniRoboczych(dataOd, dataDo);

  return {
    results: [{ label: "Liczba dni roboczych (pon.–pt.)", value: `${formatNumber(dni, 0)} dni`, highlight: true }],
  };
}

export const dniRoboczeConfig: CalculatorConfig = {
  slug: "dni-robocze",
  name: "Kalkulator dni roboczych między datami",
  shortName: "Dni robocze",
  shortDescription: "Oblicz liczbę dni roboczych (od poniedziałku do piątku) między dwiema datami.",
  metaDescription: "Kalkulator dni roboczych online: sprawdź liczbę dni roboczych (poniedziałek–piątek) między dwiema wybranymi datami.",
  category: "czas-i-data",
  tags: ["dni robocze", "data", "kalendarz", "praca", "czas i data"],
  fields: [
    { id: "dataOd", label: "Data początkowa", type: "date", defaultValue: "" },
    { id: "dataDo", label: "Data końcowa", type: "date", defaultValue: "" },
  ],
  calculate,
  intro:
    "Kalkulator oblicza liczbę dni roboczych (od poniedziałku do piątku, bez rozróżniania świąt) pomiędzy dwiema wybranymi datami. Przydatny do planowania terminów realizacji zleceń czy urlopów.",
  howTo: ["Wybierz datę początkową i końcową.", "Wynik pokaże liczbę dni roboczych w tym przedziale (włącznie z obiema datami granicznymi)."],
  formula: "Liczone są wszystkie dni od poniedziałku do piątku w podanym przedziale dat (włącznie).",
  examples: [{ input: "poniedziałek → piątek tego samego tygodnia", output: "5 dni roboczych" }],
  faq: [
    {
      q: "Czy kalkulator uwzględnia święta?",
      a: "Nie, kalkulator liczy wyłącznie dni od poniedziałku do piątku, bez uwzględniania dni ustawowo wolnych od pracy — te mogą zmniejszyć rzeczywistą liczbę dni roboczych.",
    },
    {
      q: "Czy obie graniczne daty są wliczane do wyniku?",
      a: "Tak, jeśli data początkowa i końcowa przypadają na dni robocze, są one wliczane do wyniku.",
    },
  ],
};
