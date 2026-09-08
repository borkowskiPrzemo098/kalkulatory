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

// Finanse
import { lokataProcentSkladanyConfig } from "./lokata-procent-skladany";
import { inflacjaConfig } from "./inflacja";
import { odsetkiUstawoweConfig } from "./odsetki-ustawowe";
import { amortyzacjaSrodkaTrwalegoConfig } from "./amortyzacja-srodka-trwalego";
import { leasingConfig } from "./leasing";
import { wynagrodzenieNettoBruttoConfig } from "./wynagrodzenie-netto-brutto";
import { emeryturaOrientacyjnaConfig } from "./emerytura-orientacyjna";

// Matematyka
import { nwdNwwConfig } from "./nwd-nww";
import { silniaKombinatorykaConfig } from "./silnia-kombinatoryka";
import { pierwiastkiPotegiConfig } from "./pierwiastki-potegi";
import { systemLiczbowyConfig } from "./system-liczbowy";
import { poleObwodFigurConfig } from "./pole-obwod-figur";
import { objetoscBrylConfig } from "./objetosc-bryl";

// Zdrowie
import { tdeeConfig } from "./tdee";
import { makroskladnikiConfig } from "./makroskladniki";
import { zapotrzebowanieNaWodeConfig } from "./zapotrzebowanie-na-wode";
import { tetnoTreningoweConfig } from "./tetno-treningowe";
import { wiekPsaKotaConfig } from "./wiek-psa-kota";
import { wagaIdealnaConfig } from "./waga-idealna";
import { tempoBieguConfig } from "./tempo-biegowe";

// Dom
import { powierzchniaMalowaniaConfig } from "./powierzchnia-malowania";
import { zuzycieFarbyConfig } from "./zuzycie-farby";
import { iloscPlytekConfig } from "./ilosc-plytek";
import { kubaturaBetonuConfig } from "./kubatura-betonu";
import { zuzycieTapetConfig } from "./zuzycie-tapet";
import { liczbaCegielConfig } from "./liczba-cegiel";
import { zuzycieEnergiiUrzadzenConfig } from "./zuzycie-energii-urzadzen";
import { oplacalnoscFotowoltaikiConfig } from "./oplacalnosc-fotowoltaiki";

// Motoryzacja
import { kosztPodrozyConfig } from "./koszt-podrozy";
import { przyspieszeniePredkoscConfig } from "./przyspieszenie-predkosc";
import { zuzyciePaliwaTrasaConfig } from "./zuzycie-paliwa-trasa";

// Czas i data
import { roznicaDniConfig } from "./roznica-dni";
import { dodawanieDniConfig } from "./dodawanie-dni";
import { dniRoboczeConfig } from "./dni-robocze";
import { wiekEmerytalnyConfig } from "./wiek-emerytalny";
import { strefyCzasoweConfig } from "./strefy-czasowe";

// Przeliczniki
import { dlugoscConfig } from "./dlugosc";
import { wagaConfig } from "./waga";
import { objetoscConfig } from "./objetosc";
import { powierzchniaConfig } from "./powierzchnia";
import { predkoscConfig } from "./predkosc";
import { cisnienieConfig } from "./cisnienie";
import { temperaturaConfig } from "./temperatura";
import { walutaManualnaConfig } from "./waluta-manualna";

// Biznes
import { cpmConfig } from "./cpm";
import { roasConfig } from "./roas";
import { roiConfig } from "./roi";
import { progRentownosciConfig } from "./prog-rentownosci";

// Inne
import { napiwekConfig } from "./napiwek";
import { splitBillConfig } from "./split-bill";

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

  lokataProcentSkladanyConfig,
  inflacjaConfig,
  odsetkiUstawoweConfig,
  amortyzacjaSrodkaTrwalegoConfig,
  leasingConfig,
  wynagrodzenieNettoBruttoConfig,
  emeryturaOrientacyjnaConfig,

  nwdNwwConfig,
  silniaKombinatorykaConfig,
  pierwiastkiPotegiConfig,
  systemLiczbowyConfig,
  poleObwodFigurConfig,
  objetoscBrylConfig,

  tdeeConfig,
  makroskladnikiConfig,
  zapotrzebowanieNaWodeConfig,
  tetnoTreningoweConfig,
  wiekPsaKotaConfig,
  wagaIdealnaConfig,
  tempoBieguConfig,

  powierzchniaMalowaniaConfig,
  zuzycieFarbyConfig,
  iloscPlytekConfig,
  kubaturaBetonuConfig,
  zuzycieTapetConfig,
  liczbaCegielConfig,
  zuzycieEnergiiUrzadzenConfig,
  oplacalnoscFotowoltaikiConfig,

  kosztPodrozyConfig,
  przyspieszeniePredkoscConfig,
  zuzyciePaliwaTrasaConfig,

  roznicaDniConfig,
  dodawanieDniConfig,
  dniRoboczeConfig,
  wiekEmerytalnyConfig,
  strefyCzasoweConfig,

  dlugoscConfig,
  wagaConfig,
  objetoscConfig,
  powierzchniaConfig,
  predkoscConfig,
  cisnienieConfig,
  temperaturaConfig,
  walutaManualnaConfig,

  cpmConfig,
  roasConfig,
  roiConfig,
  progRentownosciConfig,

  napiwekConfig,
  splitBillConfig,
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
