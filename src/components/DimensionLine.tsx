/**
 * Linia wymiarowa: pomocnicze znaczniki na końcach, linia ze strzałkami.
 * Klucz (animKey) restartuje animację rysowania przy każdej zmianie wyniku.
 */
export default function DimensionLine({
  animKey,
  inverted = false,
  className = "",
}: {
  animKey?: string;
  inverted?: boolean;
  className?: string;
}) {
  const ink = inverted ? "rgba(255,255,255,0.85)" : "var(--green)";
  return (
    <div key={animKey} aria-hidden className={`relative h-3.5 ${className}`}>
      <span className="absolute left-0 top-0 h-full w-px" style={{ background: ink }} />
      <span className="absolute right-0 top-0 h-full w-px" style={{ background: ink }} />
      <span className="dim-line absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: ink }} />
      <svg className="dim-arrows absolute left-0 top-1/2 h-2.5 w-2 -translate-y-1/2" viewBox="0 0 8 10">
        <path d="M0 5 8 1.5v7z" fill={ink} />
      </svg>
      <svg className="dim-arrows absolute right-0 top-1/2 h-2.5 w-2 -translate-y-1/2" viewBox="0 0 8 10">
        <path d="M8 5 0 1.5v7z" fill={ink} />
      </svg>
    </div>
  );
}
