import Link from "next/link";
import { Landmark, Percent, Receipt, Scale } from "lucide-react";
import SearchBox from "./SearchBox";
import HeroDemo from "./HeroDemo";

const quickLinks = [
  { href: "/kalkulatory/vat", label: "VAT", icon: Receipt },
  { href: "/kalkulatory/procenty", label: "Procenty", icon: Percent },
  { href: "/kalkulatory/raty-kredytu", label: "Raty kredytu", icon: Landmark },
  { href: "/kalkulatory/bmi", label: "BMI", icon: Scale },
];

/** Duże znaki działań w tle — dekoracja w kolorze tła, nie treść. */
function MathSymbols() {
  const symbols = [
    { s: "%", cls: "right-[4%] top-[6%] text-[16rem] rotate-12" },
    { s: "+", cls: "left-[-2%] bottom-[-8%] text-[14rem]" },
    { s: "×", cls: "left-[44%] top-[-10%] text-[9rem] -rotate-6" },
    { s: "÷", cls: "right-[30%] bottom-[-12%] text-[11rem]" },
    { s: "=", cls: "left-[30%] top-[40%] text-[7rem] hidden lg:block" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      {symbols.map(({ s, cls }) => (
        <span key={s} className={`absolute font-extrabold leading-none text-white/[0.07] ${cls}`}>
          {s}
        </span>
      ))}
    </div>
  );
}

export default function HomeHero({ calculatorCount }: { calculatorCount: number }) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-green-800 text-white">
      <MathSymbols />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 lg:pb-20 lg:pt-20">
        <div>
          <h1 id="hero-heading" className="display text-[clamp(2.75rem,11vw,5rem)]">
            Kalkulatory <span className="text-sun">online</span>
          </h1>
          <p className="mt-4 max-w-[30ch] text-[1.25rem] leading-snug text-white/85 sm:text-[1.25rem]">
            {calculatorCount} darmowych kalkulatorów do szybkich obliczeń. Wpisujesz liczby — wynik masz od razu.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchBox id="calculator-search-hero" />
          </div>
          <nav aria-label="Popularne kalkulatory" className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-white/12 px-4 text-[1rem] font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-green-900"
              >
                <l.icon className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
