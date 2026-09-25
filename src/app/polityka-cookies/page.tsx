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
      <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/polityka-cookies", label: "Polityka cookies" }]} />
      <h1 className="display mt-4 text-[clamp(2rem,6vw,3rem)] text-ink">Polityka cookies</h1>
      <div className="mt-6 max-w-[68ch] space-y-4 text-[1rem] leading-relaxed text-ink-2">
        <p>
          Wybrane funkcje serwisu (np. zapamiętywanie ostatnich wartości w kalkulatorach) korzystają z pamięci
          lokalnej przeglądarki (localStorage), a nie z plików cookies — te dane nigdy nie opuszczają Twojego
          urządzenia.
        </p>
        <h2 className="condensed pt-4 text-[1.35rem] font-bold text-ink">Baner zgody</h2>
        <p>
          Przy pierwszej wizycie wyświetlamy baner z pytaniem o zgodę na cookies statystyczne i reklamowe. Dopóki
          nie klikniesz „Akceptuję”, żaden skrypt Google Analytics ani Google AdSense się nie ładuje — kalkulatory
          działają identycznie niezależnie od Twojej decyzji. Wybór możesz w każdej chwili zmienić, czyszcząc dane
          strony w ustawieniach przeglądarki (co usuwa zapisaną decyzję i baner pojawi się ponownie).
        </p>
        <h2 className="condensed pt-4 text-[1.35rem] font-bold text-ink">Jakie cookies mogą się pojawić</h2>
        <p>
          Po wyrażeniu zgody serwis może korzystać z plików cookies Google Analytics (statystyki odwiedzin) oraz
          Google AdSense (wyświetlanie i personalizacja reklam). Oba narzędzia działają zgodnie z Google Consent
          Mode — bez Twojej zgody nie zbierają danych umożliwiających identyfikację.
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
