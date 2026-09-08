interface AdPlaceholderProps {
  label?: string;
  className?: string;
}

export default function AdPlaceholder({ label = "Miejsce na reklamę", className = "" }: AdPlaceholderProps) {
  return (
    <div
      className={`flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-border-strong bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,var(--accent-soft)_10px,var(--accent-soft)_11px)] px-4 py-6 text-xs uppercase tracking-wide text-muted-2 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {label}
    </div>
  );
}
