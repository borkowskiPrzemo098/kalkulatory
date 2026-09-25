import { Calculator } from "lucide-react";

/** Znak: zielony zaokrąglony kafel z kalkulatorem — ten sam motyw co favicon. */
export function LogoMark({ inverted = false, className = "h-10 w-10" }: { inverted?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-xl ${inverted ? "bg-sun text-green-900" : "bg-green-700 text-white"} ${className}`}
    >
      <Calculator className="h-[55%] w-[55%]" strokeWidth={2.25} />
    </span>
  );
}

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark inverted={inverted} />
      <span className={`text-[1.25rem] font-extrabold leading-none tracking-[-0.02em] ${inverted ? "text-white" : "text-ink"}`}>
        Kalkulatory<span className={inverted ? "text-sun" : "text-green-700"}> Online</span>
      </span>
    </span>
  );
}
