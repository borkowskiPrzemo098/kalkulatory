import { ListChecks, Sigma, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CalculatorConfig } from "@/calculators/types";

function SectionTitle({ id, icon: Icon, children }: { id: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
        <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
      </span>
      {children}
    </h2>
  );
}

/** Wzór zapisany zdaniami → jedno równanie na linię. */
function formulaLines(formula: string): string[] {
  return formula
    .split(/(?<!\b(?:ok|np|tj|ew|zob))\.\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ0-9])/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

/** Jak korzystać (numerowane kroki), wzór (duża zielona karta), przykłady (karty). */
export default function CalculatorExplanation({ config }: { config: CalculatorConfig }) {
  return (
    <div className="space-y-12">
      <section aria-labelledby="howto-heading">
        <SectionTitle id="howto-heading" icon={ListChecks}>
          Jak korzystać z kalkulatora
        </SectionTitle>
        <ol className="mt-5 grid gap-3">
          {config.howTo.map((step, i) => (
            <li key={i} className="flex items-start gap-4 rounded-2xl bg-mist p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-[1rem] font-extrabold text-white">
                {i + 1}
              </span>
              <span className="pt-1 text-[1.0625rem] leading-snug text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {config.formula && (
        <section aria-labelledby="formula-heading">
          <SectionTitle id="formula-heading" icon={Sigma}>
            Wzór
          </SectionTitle>
          <div className="mt-5 space-y-2 rounded-3xl bg-green-900 p-6 text-white sm:p-8">
            {formulaLines(config.formula).map((line) => (
              <p key={line} className="text-[1.25rem] font-bold leading-snug sm:text-[1.5rem]">
                {line}
              </p>
            ))}
          </div>
        </section>
      )}

      {config.examples.length > 0 && (
        <section aria-labelledby="examples-heading">
          <SectionTitle id="examples-heading" icon={Lightbulb}>
            {config.examples.length > 1 ? "Przykłady" : "Przykład"}
          </SectionTitle>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {config.examples.map((ex, i) => (
              <li key={i} className="tile p-5">
                <p className="text-[1rem] text-ink-3">{ex.input}</p>
                <p className="mt-2 text-[1.25rem] font-extrabold leading-snug text-green-700">{ex.output}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
