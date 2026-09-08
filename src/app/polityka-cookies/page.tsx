import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Polityka plików cookies serwisu Kalkulatory Online.",
  alternates: { canonical: "/polityka-cookies" },
};

export default function PolitykaCookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/polityka-cookies", label: "Polityka cookies" }]} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">Polityka cookies</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-base leading-relaxed text-muted">
        <p>
          Serwis w obecnej wersji nie wykorzystuje plików cookies do śledzenia użytkowników. Wybrane funkcje
          (np. zapamiętywanie ostatnich wartości w kalkulatorach) korzystają z pamięci lokalnej przeglądarki
          (localStorage), a nie z plików cookies.
        </p>
        <p>
          W przypadku wdrożenia w przyszłości narzędzi analitycznych lub reklamowych korzystających z plików
          cookies, niniejsza polityka zostanie odpowiednio zaktualizowana, a użytkownicy zostaną o tym
          poinformowani zgodnie z obowiązującymi przepisami.
        </p>
        <p className="rounded-lg border border-dashed border-border-strong bg-surface px-4 py-3 text-sm">
          [PLACEHOLDER: pełna treść polityki cookies — do uzupełnienia po wdrożeniu konkretnych narzędzi
          analitycznych/reklamowych.]
        </p>
      </div>
    </div>
  );
}
