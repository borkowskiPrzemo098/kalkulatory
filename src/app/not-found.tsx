import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-700">
        <SearchX className="h-10 w-10" strokeWidth={2} aria-hidden />
      </span>
      <h1 className="display mt-6 text-[clamp(2rem,7vw,3rem)] text-ink">Nie znaleziono strony</h1>
      <p className="mx-auto mt-3 max-w-[44ch] text-[1.125rem] leading-relaxed text-ink-2">
        Ta strona nie istnieje albo została przeniesiona. Wybierz kalkulator z pełnej listy.
      </p>
      <Link
        href="/kalkulatory"
        className="focus-ring mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-green-700 px-7 text-[1.125rem] font-extrabold text-white transition-colors duration-150 hover:bg-green-800"
      >
        Wszystkie kalkulatory
        <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
