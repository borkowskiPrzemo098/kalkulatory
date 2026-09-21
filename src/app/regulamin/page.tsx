import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu Kalkulatory Online.",
  alternates: { canonical: "/regulamin" },
};

export default function RegulaminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Strona główna" }, { href: "/regulamin", label: "Regulamin" }]} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">Regulamin</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-base leading-relaxed text-muted">
        <h2 className="font-display text-xl font-semibold text-foreground">1. Postanowienia ogólne</h2>
        <p>
          Serwis Kalkulatory Online udostępnia darmowe narzędzia obliczeniowe (kalkulatory) dostępne bez
          rejestracji, przeznaczone do celów informacyjnych i pomocniczych.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">2. Charakter wyników</h2>
        <p>
          Wyniki generowane przez kalkulatory mają charakter orientacyjny. Serwis dokłada starań, aby zawarte
          wzory i obliczenia były poprawne, jednak nie ponosi odpowiedzialności za decyzje podjęte na podstawie
          uzyskanych wyników. Wyniki nie stanowią porady finansowej, podatkowej, prawnej ani medycznej.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">3. Zasady korzystania</h2>
        <p>
          Korzystanie z serwisu jest bezpłatne. Zabronione jest wykorzystywanie serwisu w sposób zakłócający jego
          działanie lub naruszający przepisy prawa.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">4. Podmiot prowadzący serwis</h2>
        <p>
          Serwis Kalkulatory Online jest prowadzony przez osobę prywatną, poza działalnością gospodarczą.
          Kontakt w sprawach dotyczących serwisu:{" "}
          <a href="mailto:belkeprzemyslaw@gmail.com" className="text-accent hover:underline">
            belkeprzemyslaw@gmail.com
          </a>
          .
        </p>
        <p className="text-xs text-muted-2">
          Niniejszy regulamin ma charakter podstawowy i może zostać rozszerzony w miarę rozwoju serwisu (np. po
          wdrożeniu reklam lub innych usług).
        </p>
      </div>
    </div>
  );
}
