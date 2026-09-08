// Formatowanie liczb w polskim standardzie: spacja jako separator tysięcy, przecinek dziesiętny.

function toFixedSafe(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = toFixedSafe(value, decimals);
  const parts = rounded.toFixed(decimals).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const negFix = intPart.replace("- ", "-");
  if (decimals === 0) return negFix;
  return `${negFix},${parts[1]}`;
}

export function formatCurrency(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, decimals)} zł`;
}

export function formatPercent(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, decimals)}%`;
}

export function parseLocaleNumber(input: string): number {
  if (input == null) return NaN;
  const normalized = input
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".");
  if (normalized === "") return NaN;
  return Number(normalized);
}
