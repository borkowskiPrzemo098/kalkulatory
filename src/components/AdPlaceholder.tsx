interface AdPlaceholderProps {
  label?: string;
  className?: string;
}

/**
 * Miejsce na reklamę jako pole kreskowane (przekrój) — czytelnie „puste”, nie udaje treści.
 * Po podłączeniu AdSense wystarczy podmienić zawartość tego komponentu.
 */
export default function AdPlaceholder({ label = "Miejsce na reklamę", className = "" }: AdPlaceholderProps) {
  return (
    <div
      className={`hatch flex min-h-[96px] items-center justify-center border border-hair-strong ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <span className="caps bg-table px-2 text-[0.7rem] text-ink-3">{label}</span>
    </div>
  );
}
