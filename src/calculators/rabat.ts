import { CalculatorConfig } from "./types";
import { formatCurrency, parseLocaleNumber } from "@/lib/format";

export function obliczRabat(cena: number, procentRabatu: number): { wartoscRabatu: number; cenaPoRabacie: number } {
  const wartoscRabatu = (cena * procentRabatu) / 100;
  return { wartoscRabatu, cenaPoRabacie: cena - wartoscRabatu };
}

function calculate(values: Record<string, string>) {
  const cena = parseLocaleNumber(values.cena);
  const procent = parseLocaleNumber(values.procent);

  if (Number.isNaN(cena) || Number.isNaN(procent)) {
    return { results: [], error: "Podaj cenę początkową i procent rabatu." };
  }
  if (cena < 0) return { results: [], error: "Cena nie może być ujemna." };
  if (procent < 0 || procent > 100) {
    return { results: [], error: "Procent rabatu musi mieścić się w zakresie 0–100." };
  }

  const { wartoscRabatu, cenaPoRabacie } = obliczRabat(cena, procent);
  return {
    results: [
      { label: "Cena po rabacie", value: formatCurrency(cenaPoRabacie), highlight: true },
      { label: "Wartość rabatu", value: formatCurrency(wartoscRabatu) },
      { label: "Cena początkowa", value: formatCurrency(cena) },
    ],
  };
}

export const rabatConfig: CalculatorConfig = {
  slug: "rabat",
  name: "Kalkulator rabatu",
  shortName: "Rabat",
  shortDescription: "Oblicz wartość rabatu i cenę produktu po obniżce procentowej.",
  metaDescription:
    "Kalkulator rabatu online: podaj cenę i procent rabatu, otrzymaj wartość obniżki i cenę końcową. Darmowy i szybki.",
  category: "finanse",
  tags: ["rabat", "zniżka", "promocja", "cena", "obniżka"],
  popular: true,
  fields: [
    { id: "cena", label: "Cena początkowa", type: "number", defaultValue: "200" },
    { id: "procent", label: "Rabat", type: "number", unit: "%", defaultValue: "15", min: 0, max: 100 },
  ],
  calculate,
  intro:
    "Kalkulator rabatu pomaga błyskawicznie sprawdzić, ile wyniesie obniżka cenowa i jaka będzie ostateczna cena produktu po rabacie procentowym. Przydatny podczas zakupów, wyprzedaży i promocji.",
  howTo: [
    "Wpisz cenę początkową produktu.",
    "Wpisz wysokość rabatu w procentach.",
    "Odczytaj wartość rabatu oraz cenę po obniżce.",
  ],
  formula: "Wartość rabatu = cena × (procent / 100). Cena po rabacie = cena − wartość rabatu.",
  examples: [{ input: "Cena 200 zł, rabat 15%", output: "Rabat 30 zł, cena po rabacie 170 zł" }],
  faq: [
    {
      q: "Jak obliczyć cenę po rabacie?",
      a: "Pomnóż cenę przez procent rabatu podzielony przez 100, a następnie odejmij wynik od ceny początkowej.",
    },
    {
      q: "Jak obliczyć rabat kwotowy z procentowego?",
      a: "Pomnóż cenę początkową przez procent rabatu i podziel przez 100 — otrzymasz wartość rabatu w złotówkach.",
    },
  ],
};
