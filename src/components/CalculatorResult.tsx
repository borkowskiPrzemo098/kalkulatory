import { ResultLine, ResultScale } from "@/calculators/types";
import DimensionLine from "./DimensionLine";

function ScaleBar({ scale }: { scale: ResultScale }) {
  const span = scale.max - scale.min;
  const pos = (v: number) => ((Math.min(Math.max(v, scale.min), scale.max) - scale.min) / span) * 100;
  const marker = pos(scale.value);

  return (
    <div className="mt-5" aria-hidden>
      <div className="relative h-7">
        <svg
          className="absolute top-0 h-2.5 w-3 -translate-x-1/2 transition-[left] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ left: `${marker}%` }}
          viewBox="0 0 12 10"
        >
          <path d="M6 10 0 0h12z" fill="var(--green)" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex h-4 border border-frame">
          {scale.bands.map((b, i) => {
            const active = scale.value >= b.from && (scale.value < b.to || (i === scale.bands.length - 1 && scale.value >= b.to));
            return (
              <span
                key={b.label}
                className={`h-full ${i > 0 ? "border-l border-frame" : ""} ${active ? "bg-green" : "hatch"}`}
                style={{ width: `${((b.to - b.from) / span) * 100}%` }}
              />
            );
          })}
        </div>
      </div>
      {/* Wartości graniczne pod kreskami podziałki, nazwy przedziałów na dwóch naprzemiennych poziomach */}
      <div className="relative mt-1 h-4">
        {[...scale.bands.map((b) => b.from), scale.max].map((v, i, all) => (
          <span
            key={v}
            className={`absolute top-0 text-[0.72rem] font-semibold text-ink-2 ${
              i === 0 ? "" : i === all.length - 1 ? "-translate-x-full" : "-translate-x-1/2"
            }`}
            style={{ left: `${pos(v)}%` }}
          >
            {v.toString().replace(".", ",")}
          </span>
        ))}
      </div>
      <div className="relative mt-1 h-9">
        {scale.bands.map((b, i) => {
          const last = i === scale.bands.length - 1;
          return (
            <span
              key={b.label}
              className={`caps absolute whitespace-nowrap text-[0.7rem] text-ink-3 ${i % 2 === 0 ? "top-0" : "top-[1.1rem]"} ${
                last ? "-translate-x-full" : ""
              }`}
              style={{ left: `${last ? pos(b.to) : pos(b.from)}%` }}
            >
              {b.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Tabliczka rysunkowa: wynik główny w dużym polu z linią wymiarową,
 * wyniki pomocnicze w komórkach siatki poniżej.
 */
export default function CalculatorResult({ results, error }: { results: ResultLine[]; error?: string }) {
  if (error) {
    return (
      <div role="alert" className="border border-red bg-red-tint px-4 py-4">
        <p className="caps text-[0.7rem] text-red">Sprawdź dane</p>
        <p className="mt-1.5 text-[1rem] leading-snug text-ink">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="hatch border border-hair-strong px-4 py-8 text-center">
        <p className="inline bg-paper px-2 text-sm text-ink-2">Uzupełnij pola, aby zobaczyć wynik.</p>
      </div>
    );
  }

  const primaryIndex = Math.max(
    0,
    results.findIndex((r) => r.highlight)
  );
  const primary = results[primaryIndex];
  const rest = results.filter((_, i) => i !== primaryIndex);

  return (
    <div aria-live="polite" className="border-[1.5px] border-frame">
      <div className="px-4 pb-4 pt-3 sm:px-5">
        <p className="caps text-[0.7rem] text-ink-3">{primary.label}</p>
        <p className="display mt-2 break-words text-[clamp(2.1rem,8vw,3.25rem)] text-green">{primary.value}</p>
        {primary.scale ? <ScaleBar scale={primary.scale} /> : <DimensionLine animKey={primary.value} className="mt-3" />}
      </div>
      {rest.length > 0 && (
        <dl className="grid grid-flow-row-dense grid-cols-2 gap-px border-t border-frame bg-hair-strong">
          {rest.map((r, i) => {
            const wide = r.value.length > 18 || (rest.length % 2 === 1 && i === rest.length - 1);
            return (
              <div key={r.label} className={`bg-paper px-4 py-3 sm:px-5 ${wide ? "col-span-2" : ""}`}>
                <dt className="caps text-[0.7rem] text-ink-3">{r.label}</dt>
                <dd className="mt-1 text-[1.05rem] font-semibold leading-snug text-ink">{r.value}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
