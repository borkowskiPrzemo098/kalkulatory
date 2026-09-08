import { CalculatorConfig } from "./types";
import { procentyConfig } from "./procenty";
import { vatConfig } from "./vat";
import { rabatConfig } from "./rabat";
import { marzaConfig } from "./marza";
import { bruttoNettoConfig } from "./brutto-netto";
import { bmiConfig } from "./bmi";
import { bmrConfig } from "./bmr";
import { paliwoConfig } from "./paliwo";
import { wiekConfig } from "./wiek";
import { ratyKredytuConfig } from "./raty-kredytu";

// Rejestr wszystkich kalkulatorów w serwisie.
// Aby dodać nowy kalkulator: utwórz plik konfiguracyjny w src/calculators/,
// zaimportuj go tutaj i dodaj do tablicy poniżej. Zobacz docs/ADDING_CALCULATOR.md.
export const calculators: CalculatorConfig[] = [
  procentyConfig,
  vatConfig,
  rabatConfig,
  marzaConfig,
  bruttoNettoConfig,
  bmiConfig,
  bmrConfig,
  paliwoConfig,
  wiekConfig,
  ratyKredytuConfig,
];

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): CalculatorConfig[] {
  return calculators.filter((c) => c.category === categorySlug);
}

export function getPopularCalculators(limit = 6): CalculatorConfig[] {
  return calculators.filter((c) => c.popular).slice(0, limit);
}

export function getRelatedCalculators(config: CalculatorConfig, limit = 4): CalculatorConfig[] {
  const sameCategory = calculators.filter((c) => c.slug !== config.slug && c.category === config.category);
  const byTags = calculators.filter(
    (c) =>
      c.slug !== config.slug &&
      c.category !== config.category &&
      c.tags.some((tag) => config.tags.includes(tag))
  );
  return [...sameCategory, ...byTags].slice(0, limit);
}
