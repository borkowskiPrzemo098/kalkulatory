import Link from "next/link";
import { Calculator, PiggyBank, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { calculators, getPopularCalculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";
import { categoryIcons } from "@/lib/category-icons";
import CalculatorCard from "@/components/CalculatorCard";
import ThemedBanner from "@/components/ThemedBanner";
import HomeHero from "@/components/HomeHero";

const features = [
  {
    icon: Zap,
    title: "Wynik od razu",
    text: "Obliczenia aktualizują się w trakcie wpisywania — bez klikania w dodatkowe przyciski.",
  },
  {
    icon: ShieldCheck,
    title: "Prywatność w pierwszej kolejności",
    text: "Nic nie wysyłamy na serwer. Wszystkie obliczenia dzieją się lokalnie, w Twojej przeglądarce.",
  },
  {
    icon: Sparkles,
    title: "Bez zbędnych kroków",
    text: "Żadnej rejestracji, żadnych kont — wchodzisz, liczysz, wychodzisz.",
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

export default function Home() {
  const popular = getPopularCalculators(8);

  return (
    <div>
      <HomeHero calculatorCount={calculators.length} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ThemedBanner
          className="mt-8"
          icon={Calculator}
          eyebrow="Nowość co tydzień"
          title="Nie widzisz kalkulatora, którego szukasz?"
          text="Regularnie dodajemy nowe narzędzia. Napisz, jakiego kalkulatora brakuje — dodamy go w pierwszej kolejności."
        />
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

      <section className="border-y border-border bg-accent-soft py-14" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="categories-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Kategorie
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const count = calculators.filter((c) => c.category === cat.slug).length;
              const Icon = categoryIcons[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/kategorie/${cat.slug}`}
                  className="focus-ring flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 hover:border-accent"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      {Icon && <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />}
                    </span>
                    <div>
                      <div className="font-medium text-foreground">{cat.name}</div>
                      <div className="mt-0.5 text-xs text-muted">
                        {count} {count === 1 ? "kalkulator" : "kalkulatorów"}
                      </div>
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
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 id="all-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Wszystkie kalkulatory
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              {calculators.length} darmowych kalkulatorów pogrupowanych w {categories.length} kategorii — finanse,
              zdrowie, matematyka, motoryzacja i więcej.
            </p>
          </div>
          <Link
            href="/kalkulatory"
            className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-hover"
          >
            Przeglądaj wszystkie →
          </Link>
        </div>
      </section>

      <section className="bg-accent-soft py-14" aria-labelledby="about-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="about-heading" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            O serwisie
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Kalkulatory Online to zbiór darmowych narzędzi do szybkich obliczeń — finansowych, zdrowotnych,
            matematycznych i codziennych. Każdy kalkulator działa w całości w Twojej przeglądarce: nie wymaga
            zakładania konta, nie wysyła wpisywanych danych na żaden serwer i daje wynik natychmiast, w trakcie
            wpisywania.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <f.icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="mt-3 font-medium text-foreground">{f.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ThemedBanner
          className="my-10"
          icon={PiggyBank}
          eyebrow="Prywatność"
          title="Twoje dane nigdy nie opuszczają przeglądarki"
          text="Każde obliczenie dzieje się lokalnie na Twoim urządzeniu — nic nie jest wysyłane ani zapisywane na naszych serwerach."
        />
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
