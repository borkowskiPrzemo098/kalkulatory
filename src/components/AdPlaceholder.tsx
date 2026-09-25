interface AdPlaceholderProps {
  label?: string;
  className?: string;
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Miejsce na reklamę. Dopóki nie ma aktywnego AdSense (NEXT_PUBLIC_ADSENSE_CLIENT),
 * nic się nie renderuje — puste ramki „Reklama” wyglądały jak niedokończony szablon.
 * Po podłączeniu AdSense wstaw tu jednostkę reklamową (ins.adsbygoogle).
 */
export default function AdPlaceholder({ className = "" }: AdPlaceholderProps) {
  if (!ADSENSE_CLIENT) return null;
  return <div className={`min-h-[96px] ${className}`} aria-hidden="true" role="presentation" />;
}
