import Link from "next/link";
import { calculators, getPopularCalculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import CalculatorCard from "@/components/CalculatorCard";
import SearchBox from "@/components/SearchBox";
import AdPlaceholder from "@/components/AdPlaceholder";

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
  url: "https://kalkulatory-online.example",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kalkulatory-online.example/kalkulatory?q={search_term_string}",
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

export default function Home() {
  const popular = getPopularCalculators(8);

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-border-strong px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
              {calculators.length} darmowych kalkulatorów
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Kalkulatory online
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Darmowe kalkulatory do szybkich i prostych obliczeń. Bez rejestracji, bez zbędnych kroków —
              wpisujesz liczby, dostajesz wynik.
            </p>
            <div className="mt-8 max-w-md">
              <SearchBox autoFocus />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdPlaceholder className="mt-8" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="popular-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="popular-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Najpopularniejsze kalkulatory
          </h2>
          <Link href="/kalkulatory" className="focus-ring hidden text-sm font-medium text-accent sm:inline">
            Zobacz wszystkie →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
            <CalculatorCard key={c.slug} config={c} />
          ))}
        </div>
        <Link href="/kalkulatory" className="focus-ring mt-6 inline-block text-sm font-medium text-accent sm:hidden">
          Zobacz wszystkie kalkulatory →
        </Link>
      </section>

      <section className="border-y border-border bg-surface py-14" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="categories-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Kategorie
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const count = calculators.filter((c) => c.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/kategorie/${cat.slug}`}
                  className="focus-ring flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 hover:border-accent"
                >
                  <div>
                    <div className="font-medium text-foreground">{cat.name}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      {count} {count === 1 ? "kalkulator" : "kalkulatorów"}
                    </div>
                  </div>
                  <span aria-hidden className="text-muted-2">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="all-heading">
        <h2 id="all-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Wszystkie kalkulatory
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => (
            <CalculatorCard key={c.slug} config={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6" aria-labelledby="about-heading">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 id="about-heading" className="font-display text-xl font-semibold text-foreground">
            O serwisie
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Kalkulatory Online to zbiór darmowych narzędzi do szybkich obliczeń — finansowych, zdrowotnych,
            matematycznych i codziennych. Każdy kalkulator działa w całości w Twojej przeglądarce: nie wymaga
            zakładania konta, nie wysyła wpisywanych danych na żaden serwer i daje wynik natychmiast, w trakcie
            wpisywania.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdPlaceholder className="mb-10" />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-4 sm:px-6" aria-labelledby="faq-home-heading">
        <h2 id="faq-home-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Najczęstsze pytania
        </h2>
        <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
          {faqItems.map((item) => (
            <div key={item.q} className="px-5 py-4">
              <dt className="font-medium text-foreground">{item.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="h-14" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
