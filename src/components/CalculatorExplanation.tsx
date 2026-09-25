import { CalculatorConfig } from "@/calculators/types";

function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[1.35rem] font-bold tracking-[-0.01em] text-ink condensed">
      {children}
    </h2>
  );
}

/**
 * Uwagi (jak korzystać) i tabela przykładów — język rysunku technicznego.
 * Wzór (szczegół „A”) stoi w strefie adnotacji arkusza, w CalculatorForm.
 */
export default function CalculatorExplanation({ config }: { config: CalculatorConfig }) {
  return (
    <div className="space-y-12">
      <section aria-labelledby="howto-heading">
        <SectionTitle id="howto-heading">Jak korzystać z kalkulatora</SectionTitle>
        <ol className="mt-4 border-t border-frame">
          {config.howTo.map((step, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3 border-b border-hair py-3 text-[1rem] leading-relaxed text-ink-2">
              <span className="caps pt-0.5 text-[0.8rem] text-green">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {config.examples.length > 0 && (
        <section aria-labelledby="examples-heading">
          <SectionTitle id="examples-heading">{config.examples.length > 1 ? "Przykłady" : "Przykład"}</SectionTitle>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <thead>
                <tr className="border-y-[1.5px] border-frame">
                  <th scope="col" className="caps w-1/2 px-3 py-2 text-[0.7rem] font-semibold text-ink-3">
                    Dane
                  </th>
                  <th scope="col" className="caps border-l border-hair-strong px-3 py-2 text-[0.7rem] font-semibold text-ink-3">
                    Wynik
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.examples.map((ex, i) => (
                  <tr key={i} className="border-b border-hair align-top">
                    <td className="px-3 py-3 text-ink-2">{ex.input}</td>
                    <td className="border-l border-hair-strong px-3 py-3 font-semibold text-green">{ex.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
