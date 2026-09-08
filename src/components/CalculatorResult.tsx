import { ResultLine } from "@/calculators/types";

export default function CalculatorResult({ results, error }: { results: ResultLine[]; error?: string }) {
  if (error) {
    return (
      <div role="alert" className="rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border-strong px-4 py-6 text-center text-sm text-muted">
        Uzupełnij pola powyżej, aby zobaczyć wynik.
      </div>
    );
  }

  return (
    <div aria-live="polite" className="space-y-2">
      {results.map((r) => (
        <div
          key={r.label}
          className={
            r.highlight
              ? "rounded-lg bg-accent px-4 py-4 text-accent-contrast"
              : "flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2.5"
          }
        >
          {r.highlight ? (
            <>
              <div className="text-xs font-medium uppercase tracking-wide opacity-80">{r.label}</div>
              <div className="mt-1 font-display text-3xl font-semibold tabular-nums">{r.value}</div>
            </>
          ) : (
            <>
              <span className="text-sm text-muted">{r.label}</span>
              <span className="font-medium tabular-nums text-foreground">{r.value}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
