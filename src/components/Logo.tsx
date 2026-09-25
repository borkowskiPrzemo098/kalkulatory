/**
 * Znak: oznaczenie środka okręgu z rysunku technicznego (okrąg + osie).
 * Ten sam znak jest faviconą (src/app/icon.svg).
 */
export function LogoMark({ className = "h-7 w-7", inverted = false }: { className?: string; inverted?: boolean }) {
  const ink = inverted ? "#ffffff" : "var(--green)";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="1" y="1" width="30" height="30" fill={inverted ? "transparent" : "var(--paper)"} stroke={ink} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7.5" fill="none" stroke={ink} strokeWidth="2.25" />
      <path d="M16 4.5v6M16 21.5v6M4.5 16h6M21.5 16h6" stroke={ink} strokeWidth="1.5" />
      <path d="M13.5 16h5M16 13.5v5" stroke={ink} strokeWidth="1.5" />
    </svg>
  );
}

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark inverted={inverted} />
      <span className={`flex flex-col leading-none ${inverted ? "text-white" : "text-ink"}`}>
        <span className="caps text-[1rem] font-bold tracking-[0.05em]">Kalkulatory</span>
        <span className={`caps mt-0.5 text-[0.7rem] font-medium tracking-[0.3em] ${inverted ? "text-white/70" : "text-green"}`}>
          Online
        </span>
      </span>
    </span>
  );
}
