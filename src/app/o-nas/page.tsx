import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "O nas",
  description: "Informacje o serwisie Kalkulatory Online — darmowych kalkulatorach do szybkich obliczeń.",
  alternates: { canonical: "/o-nas" },
};

export default function ONasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/o-nas", label: "O nas" }]} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">O nas</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-base leading-relaxed text-muted">
        <p>
          Kalkulatory Online to serwis stworzony z myślą o szybkich, prostych obliczeniach, które każdy z nas
          wykonuje na co dzień — od przeliczenia VAT, przez rabat, po sprawdzenie BMI czy raty kredytu.
        </p>
        <p>
          Wszystkie kalkulatory działają w całości w przeglądarce użytkownika — nie wymagają zakładania konta ani
          podawania danych osobowych, a wpisywane wartości nie są wysyłane na żaden serwer.
        </p>
        <p className="rounded-lg border border-dashed border-border-strong bg-surface px-4 py-3 text-sm">
          [PLACEHOLDER: miejsce na docelowy opis firmy/zespołu odpowiedzialnego za serwis — do uzupełnienia przez
          właściciela strony.]
        </p>
      </div>
    </div>
  );
}
