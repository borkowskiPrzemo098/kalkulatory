export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "finanse",
    name: "Finanse",
    description:
      "Kalkulatory finansowe: VAT, brutto/netto, raty kredytu, rabaty i inne obliczenia pieniężne.",
  },
  {
    slug: "matematyka",
    name: "Matematyka",
    description: "Kalkulatory matematyczne: procenty, proporcje i podstawowe obliczenia.",
  },
  {
    slug: "zdrowie",
    name: "Zdrowie",
    description: "Kalkulatory zdrowotne: BMI, BMR i inne wskaźniki związane z ciałem.",
  },
  {
    slug: "dom",
    name: "Dom",
    description: "Kalkulatory przydatne w domu: powierzchnia, zużycie materiałów i inne.",
  },
  {
    slug: "motoryzacja",
    name: "Motoryzacja",
    description: "Kalkulatory motoryzacyjne: spalanie paliwa, koszty przejazdu i eksploatacji.",
  },
  {
    slug: "czas-i-data",
    name: "Czas i data",
    description: "Kalkulatory dat i czasu: wiek, różnica dni, planowanie terminów.",
  },
  {
    slug: "przeliczniki",
    name: "Przeliczniki",
    description: "Przeliczniki jednostek: długość, waga, temperatura, objętość.",
  },
  {
    slug: "biznes",
    name: "Biznes",
    description: "Kalkulatory dla firm: marża, narzut, rentowność i wskaźniki biznesowe.",
  },
  {
    slug: "inne",
    name: "Inne",
    description: "Pozostałe przydatne kalkulatory, które nie mieszczą się w innych kategoriach.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
