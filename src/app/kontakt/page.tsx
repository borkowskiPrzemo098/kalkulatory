import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Dane kontaktowe serwisu Kalkulatory Online.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/kontakt", label: "Kontakt" }]} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">Kontakt</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-base leading-relaxed text-muted">
        <p>Masz pytanie, uwagę lub propozycję nowego kalkulatora? Skontaktuj się z nami.</p>
        <div className="rounded-lg border border-dashed border-border-strong bg-surface px-4 py-4 text-sm">
          <p>[PLACEHOLDER: adres e-mail kontaktowy — do uzupełnienia]</p>
          <p>[PLACEHOLDER: dane firmy / adres korespondencyjny — do uzupełnienia]</p>
        </div>
      </div>
    </div>
  );
}
