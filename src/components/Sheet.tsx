import type { ReactNode } from "react";

const COLS = ["1", "2", "3", "4"];
const ROWS = ["A", "B", "C"];

/**
 * Arkusz rysunkowy: linia obcięcia + podwójna rama, na marginesie oznaczenia stref
 * (1–4 u góry, A–C z boku od sm). Na telefonie rama zostaje, margines zwęża się do 8 px.
 * Wariant `inverted`: odwrócony arkusz — białe linie na zieleni butelkowej.
 */
export default function Sheet({
  children,
  className = "",
  zones = true,
  inverted = false,
  as: Tag = "div",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  zones?: boolean;
  inverted?: boolean;
  as?: "div" | "section" | "article";
  labelledBy?: string;
}) {
  const label = inverted ? "text-white/60" : "text-ink-3";
  const tick = inverted ? "border-white/35" : "border-hair-strong";
  return (
    <Tag
      aria-labelledby={labelledBy}
      className={`relative ${inverted ? "bg-green-night text-white outline-white/20" : "bg-paper outline-hair"} outline outline-1 ${
        zones ? "px-2 pb-2 pt-5 sm:px-5 sm:pb-5" : ""
      } ${className}`}
    >
      {zones && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-2 top-0 flex h-5 sm:inset-x-5">
            {COLS.map((c, i) => (
              <span
                key={c}
                className={`caps flex flex-1 items-center justify-center text-[0.6rem] ${label} ${i > 0 ? `border-l ${tick}` : ""}`}
              >
                {c}
              </span>
            ))}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-5 left-0 hidden w-5 flex-col sm:flex">
            {ROWS.map((r, i) => (
              <span
                key={r}
                className={`caps flex flex-1 items-center justify-center text-[0.6rem] ${label} ${i > 0 ? `border-t ${tick}` : ""}`}
              >
                {r}
              </span>
            ))}
          </div>
        </>
      )}
      <div className={zones ? `border-[1.5px] ${inverted ? "border-white/80" : "border-frame"}` : ""}>{children}</div>
    </Tag>
  );
}
