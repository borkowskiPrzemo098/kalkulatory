import Link from "next/link";
import { ArrowRight, MonitorSmartphone, Sigma, Zap } from "lucide-react";
import { calculators, getPopularCalculators } from "@/calculators/registry";
import CalculatorTiles from "@/components/CalculatorTiles";
import CategoryGrid from "@/components/CategoryGrid";
import AdPlaceholder from "@/components/AdPlaceholder";
import HomeHero from "@/components/HomeHero";
import { FaqList } from "@/components/CalculatorFAQ";

const principles = [
  {
    icon: Zap,
    title: "Wynik od razu",
  },
  {
    icon: MonitorSmartphone,
    title: "Twoje dane zostają u Ciebie",
  },
  {
    icon: Sigma,
    title: "Wzór przy każdym wyniku",
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
      <h2 id={id} className="display text-[clamp(1.75rem,6vw,2.5rem)] text-ink">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="focus-ring group flex shrink-0 items-center gap-1.5 rounded-lg pb-1 text-[1rem] font-bold text-green-700 hover:text-green-800"
        >
          {linkLabel}
          <ArrowRight aria-hidden className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="popular-heading">
        <SectionHead id="popular-heading" title="Najpopularniejsze" href="/kalkulatory" linkLabel="Wszystkie" />
        <CalculatorTiles items={popular} className="mt-7" />
      </section>

      <section className="bg-mist" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHead id="categories-heading" title="Kategorie" href="/kategorie" linkLabel="Przegląd" />
          <div className="mt-7">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="bg-green-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 id="trust-heading" className="display max-w-[18ch] text-[clamp(1.9rem,6vw,3rem)]">
            Proste, szybkie i <span className="text-sun">bez rejestracji</span>
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="flex items-center gap-4 rounded-2xl bg-white/[0.07] p-4 sm:p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sun text-green-950">
                  <p.icon className="h-7 w-7" strokeWidth={2.25} aria-hidden />
                </span>
                <h3 className="text-[1.25rem] font-extrabold leading-tight">{p.title}</h3>
              </li>
            ))}
          </ul>
          <Link
            href="/kalkulatory"
            className="focus-ring mt-10 inline-flex h-14 items-center gap-2.5 rounded-2xl bg-sun px-7 text-[1.125rem] font-extrabold text-green-950 transition-colors duration-150 hover:bg-sun-600"
          >
            Zobacz wszystkie {calculators.length} kalkulatorów
            <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <AdPlaceholder />
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20" aria-labelledby="faq-home-heading">
        <SectionHead id="faq-home-heading" title="Najczęstsze pytania" />
        <div className="mt-7 max-w-3xl">
          <FaqList items={faqItems} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
