import Link from "next/link";
import { ArrowRight, FlaskConical, MonitorSmartphone, Sigma } from "lucide-react";
import { calculators, getPopularCalculators } from "@/calculators/registry";
import PartsList from "@/components/PartsList";
import CategoryGrid from "@/components/CategoryGrid";
import AdPlaceholder from "@/components/AdPlaceholder";
import HomeHero from "@/components/HomeHero";
import Sheet from "@/components/Sheet";
import { FaqList } from "@/components/CalculatorFAQ";

const principles = [
  {
    icon: MonitorSmartphone,
    title: "Liczone w Twojej przeglądarce",
    text: "Wpisane liczby nie opuszczają urządzenia. Bez konta, bez zapisywania na serwerze — wynik aktualizuje się w trakcie pisania.",
  },
  {
    icon: Sigma,
    title: "Wzór i przykład przy każdym wyniku",
    text: "Pod każdym kalkulatorem jest wzór, na którym działa, oraz policzony krok po kroku przykład — możesz sprawdzić wynik sam.",
  },
  {
    icon: FlaskConical,
    title: "Wzory sprawdzone testami",
    text: "Logika każdego kalkulatora jest pokryta testami na ręcznie policzonych przykładach, zanim trafi na stronę.",
  },
];

const faqItems = [
  {
    q: "Czy kalkulatory na tej stronie są darmowe?",
    a: "Tak, wszystkie kalkulatory są całkowicie darmowe i dostępne bez rejestracji.",
  },
  {
    q: "Czy moje dane są wysyłane na serwer?",
    a: "Nie. Wszystkie obliczenia wykonywane są lokalnie w Twojej przeglądarce — wpisywane wartości nie są nigdzie wysyłane.",
  },
  {
    q: "Czy wyniki kalkulatorów są wiążące prawnie lub finansowo?",
    a: "Nie. Wyniki mają charakter orientacyjny i pomocniczy — w sprawach finansowych, zdrowotnych czy prawnych warto skonsultować się ze specjalistą.",
  },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kalkulatory Online",
  url: "https://borkowskiprzemo098.github.io/kalkulatory",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://borkowskiprzemo098.github.io/kalkulatory/kalkulatory?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function SectionHead({ id, title, href, linkLabel }: { id: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="condensed text-[clamp(1.5rem,4.5vw,2rem)] font-bold tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {href && (
        <Link href={href} className="focus-ring group caps flex shrink-0 items-center gap-1.5 pb-1.5 text-[0.7rem] text-green">
          {linkLabel}
          <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const popular = getPopularCalculators(8);

  return (
    <div>
      <HomeHero calculatorCount={calculators.length} />

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20" aria-labelledby="popular-heading">
        <SectionHead id="popular-heading" title="Najczęściej używane" href="/kalkulatory" linkLabel={`Wszystkie (${calculators.length})`} />
        <div className="mt-6">
          <PartsList items={popular} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20" aria-labelledby="categories-heading">
        <SectionHead id="categories-heading" title="Kategorie" href="/kategorie" linkLabel="Przegląd kategorii" />
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <AdPlaceholder />
      </div>

      {/* Odwrócony arkusz: zasady serwisu jako uwagi rysunkowe */}
      <div className="mx-auto mt-16 max-w-6xl sm:mt-20 sm:px-6">
        <Sheet inverted as="section" labelledBy="trust-heading">
          <div className="grid gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <h2 id="trust-heading" className="display max-w-[16ch] text-[clamp(1.9rem,5.5vw,2.9rem)]">
              Wynik, któremu możesz zaufać, bo widzisz, skąd się wziął.
            </h2>
            <div>
              <p className="caps text-[0.72rem] text-white/70">Uwagi</p>
              <ol className="mt-3 border-t-[1.5px] border-white/70">
                {principles.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-white/25 py-5">
                    <span className="caps pt-1 text-[0.8rem] text-white/70">{i + 1}.</span>
                    <div>
                      <h3 className="flex items-center gap-2.5 text-[1.12rem] font-bold">
                        <p.icon className="h-5 w-5 text-white/80" strokeWidth={1.75} aria-hidden />
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[0.98rem] leading-relaxed text-white/80">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="grid border-t-[1.5px] border-white/80 sm:grid-cols-[auto_auto_1fr]">
            <div className="border-b border-white/30 px-5 py-2.5 sm:border-b-0 sm:border-r sm:px-6">
              <p className="caps text-[0.7rem] text-white/60">Arkusz</p>
              <p className="mt-0.5 font-semibold">Zasady serwisu</p>
            </div>
            <div className="border-b border-white/30 px-5 py-2.5 sm:border-b-0 sm:border-r sm:px-6">
              <p className="caps text-[0.7rem] text-white/60">W wykazie</p>
              <p className="mt-0.5 font-semibold">{calculators.length} kalkulatorów</p>
            </div>
            <Link
              href="/kalkulatory"
              className="focus-ring group flex min-h-14 items-center justify-between gap-3 bg-white px-5 font-semibold text-green-night transition-colors duration-150 hover:bg-green-tint sm:px-6"
            >
              Przeglądaj wszystkie kalkulatory
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </Sheet>
      </div>

      <section className="mx-auto max-w-3xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20" aria-labelledby="faq-home-heading">
        <SectionHead id="faq-home-heading" title="Najczęstsze pytania" />
        <div className="mt-6">
          <FaqList items={faqItems} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
