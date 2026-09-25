import { AlertCircle } from "lucide-react";
import { ResultLine, ResultScale } from "@/calculators/types";

function ScaleBar({ scale }: { scale: ResultScale }) {
  const span = scale.max - scale.min;
  const pos = (v: number) => ((Math.min(Math.max(v, scale.min), scale.max) - scale.min) / span) * 100;
  const active = scale.bands.findIndex(
    (b, i) => scale.value >= b.from && (scale.value < b.to || i === scale.bands.length - 1)
  );

  return (
    <div className="mt-5" aria-hidden>
      <div className="relative pt-4">
        <span
          className="absolute top-0 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[9px] border-x-transparent border-t-sun transition-[left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ left: `${pos(scale.value)}%` }}
        />
        <div className="flex h-3.5 gap-1">
          {scale.bands.map((b, i) => (
            <span
              key={b.label}
              className={`h-full rounded-full ${i === active ? "bg-sun" : "bg-white/25"}`}
              style={{ width: `${((b.to - b.from) / span) * 100}%` }}
            />
          ))}
        </div>
      </div>
      {/* Granice przedziałów pod kreskami między segmentami */}
      <div className="relative mt-2 h-5 text-[0.875rem] font-semibold text-white/75">
        {scale.bands.slice(1).map((b) => (
          <span key={b.from} className="absolute top-0 -translate-x-1/2" style={{ left: `${pos(b.from)}%` }}>
            {b.from.toString().replace(".", ",")}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Panel wyniku: pełna zieleń, ogromna biała liczba, wyniki pomocnicze w jaśniejszych kaflach. */
export default function CalculatorResult({ results, error }: { results: ResultLine[]; error?: string }) {
  if (error) {
    return (
      <div role="alert" className="flex gap-3 rounded-2xl bg-white p-4 text-ink">
        <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red" strokeWidth={2.25} aria-hidden />
        <div>
          <p className="text-[1rem] font-bold text-red">Sprawdź dane</p>
          <p className="mt-1 text-[1rem] leading-snug">{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed border-white/35 px-4 py-8 text-center text-[1.0625rem] font-semibold text-white/85">
        Wpisz liczby, a wynik pojawi się tutaj.
      </p>
    );
  }

  const primaryIndex = Math.max(
    0,
    results.findIndex((r) => r.highlight)
  );
  const primary = results[primaryIndex];
  const rest = results.filter((_, i) => i !== primaryIndex);

  return (
    <div aria-live="polite">
      <p className="text-[1.0625rem] font-semibold text-white/85">{primary.label}</p>
      <p key={primary.value} className="result-pop display mt-1 break-words text-[clamp(2.75rem,11vw,4.25rem)] text-white">
        {primary.value}
      </p>
      {primary.scale && <ScaleBar scale={primary.scale} />}
      {rest.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-2.5">
          {rest.map((r, i) => {
            const wide = r.value.length > 16 || (rest.length % 2 === 1 && i === rest.length - 1);
            return (
              <div key={r.label} className={`rounded-2xl bg-white/12 px-4 py-3 ${wide ? "col-span-2" : ""}`}>
                <dt className="text-[0.9375rem] font-medium text-white/80">{r.label}</dt>
                <dd className="mt-0.5 text-[1.25rem] font-bold leading-snug text-white">{r.value}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
