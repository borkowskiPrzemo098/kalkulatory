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
        <p>Masz pytanie, uwagę lub propozycję nowego kalkulatora? Napisz — chętnie odpowiem.</p>
        <div className="rounded-lg border border-border bg-surface px-4 py-4 text-sm">
          <p>
            E-mail:{" "}
            <a href="mailto:belkeprzemyslaw@gmail.com" className="font-medium text-accent hover:underline">
              belkeprzemyslaw@gmail.com
            </a>
          </p>
          <p className="mt-2 text-muted">
            Serwis prowadzony jest przez osobę prywatną, nie w ramach działalności gospodarczej.
          </p>
        </div>
      </div>
    </div>
  );
}
