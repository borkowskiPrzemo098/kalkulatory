import { CalculatorConfig } from "@/calculators/types";

export default function CalculatorExplanation({ config }: { config: CalculatorConfig }) {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground">Jak korzystać z kalkulatora</h2>
        <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          {config.howTo.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {config.formula && (
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Wzór</h2>
          <p className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm leading-relaxed text-foreground">
            {config.formula}
          </p>
        </div>
      )}

      {config.examples.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Przykład</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {config.examples.map((ex, i) => (
              <li key={i} className="rounded-lg border border-border bg-surface px-4 py-3">
                <span className="text-muted">{ex.input} → </span>
                <span className="font-medium text-foreground">{ex.output}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
