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
        <p>
          Pytania dotyczące plików cookies można kierować na adres{" "}
          <a href="mailto:belkeprzemyslaw@gmail.com" className="text-accent hover:underline">
            belkeprzemyslaw@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
