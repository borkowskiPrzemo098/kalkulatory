import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">Nie znaleziono strony</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Kalkulator lub strona, której szukasz, nie istnieje albo została przeniesiona.
      </p>
      <Link
        href="/kalkulatory"
        className="focus-ring mt-6 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-hover"
      >
        Zobacz wszystkie kalkulatory
      </Link>
    </div>
  );
}
