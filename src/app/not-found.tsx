import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Sheet from "@/components/Sheet";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Sheet>
        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <h1 className="display text-[clamp(2rem,6vw,3rem)] text-ink">Nie znaleziono strony</h1>
          <p className="mt-4 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink-2">
            Błąd 404: kalkulator lub strona, której szukasz, nie istnieje albo została przeniesiona. Sprawdź adres albo przejdź
            do pełnego wykazu kalkulatorów.
          </p>
          <Link
            href="/kalkulatory"
            className="focus-ring mt-8 inline-flex h-12 items-center gap-2 bg-green px-5 text-[1rem] font-semibold text-white transition-colors duration-150 hover:bg-green-deep"
          >
            Wszystkie kalkulatory
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
