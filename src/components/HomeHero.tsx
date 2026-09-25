import Link from "next/link";
import SearchBox from "./SearchBox";
import HeroDemo from "./HeroDemo";
import Sheet from "./Sheet";

const quickLinks = [
  { href: "/kalkulatory/vat", label: "VAT" },
  { href: "/kalkulatory/procenty", label: "Procenty" },
  { href: "/kalkulatory/raty-kredytu", label: "Raty kredytu" },
  { href: "/kalkulatory/bmi", label: "BMI" },
  { href: "/kalkulatory/brutto-netto", label: "Brutto / netto" },
];

/** Konstrukcja w tle: okrąg z osiami i wymiarem średnicy — liczba kalkulatorów. */
function ConstructionDrawing({ count }: { count: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -bottom-52 -right-28 hidden h-[30rem] w-[30rem] text-hair-strong lg:block"
      fill="none"
    >
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="96" stroke="currentColor" strokeWidth="1" strokeDasharray="6 5" />
      <path d="M20 200h360M200 20v360" stroke="currentColor" strokeWidth="1" strokeDasharray="22 5 3 5" />
      <path d="M94 94 306 306" stroke="var(--green)" strokeWidth="1" />
      <path d="m94 94 10 3-7 7z M306 306l-10-3 7-7z" fill="var(--green)" />
      <text x="214" y="258" fill="var(--green)" fontSize="15" fontWeight="600" letterSpacing="1.5" transform="rotate(45 214 258)">
        Ø {count}
      </text>
    </svg>
  );
}

export default function HomeHero({ calculatorCount }: { calculatorCount: number }) {
  return (
    <div className="mx-auto max-w-6xl sm:px-6 sm:pt-8">
      <Sheet as="section" labelledBy="hero-heading">
        <div className="relative grid gap-10 overflow-hidden px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
          <ConstructionDrawing count={calculatorCount} />
          <div className="relative">
            <h1 id="hero-heading" className="display text-[clamp(2.6rem,10vw,5rem)] text-ink">
              Kalkulatory <span className="text-green">online</span>
            </h1>
            <p className="mt-5 max-w-[34ch] text-[1.15rem] leading-relaxed text-ink-2 sm:text-[1.25rem]">
              Darmowe kalkulatory do szybkich i prostych obliczeń. Wpisujesz liczby — wynik pojawia się od razu.
            </p>
            <div className="mt-8 max-w-lg">
              <SearchBox id="calculator-search-hero" />
            </div>
            <nav aria-label="Popularne kalkulatory" className="mt-4 flex max-w-lg flex-wrap items-center gap-x-1 gap-y-2">
              <span className="caps mr-2 text-[0.7rem] text-ink-3">Często liczone</span>
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="focus-ring border border-hair-strong bg-paper px-2.5 py-1.5 text-[0.88rem] font-semibold text-ink transition-colors duration-150 hover:border-frame hover:bg-green-tint"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="relative lg:pt-2">
            <HeroDemo />
          </div>
        </div>
      </Sheet>
    </div>
  );
}
