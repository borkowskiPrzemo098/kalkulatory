import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu Kalkulatory Online.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[{ href: "/", label: "Start" }, { href: "/polityka-prywatnosci", label: "Polityka prywatności" }]}
      />
      <h1 className="display mt-5 text-[clamp(2rem,7vw,3rem)] text-ink">
        Polityka prywatności
      </h1>
      <div className="mt-6 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-2">
        <p>
          Kalkulatory dostępne w serwisie wykonują obliczenia w całości lokalnie, w przeglądarce użytkownika.
          Wartości wpisywane do formularzy kalkulatorów nie są przesyłane ani zapisywane na serwerach serwisu.
        </p>
        <h2 className="pt-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">Dane zapisywane lokalnie</h2>
        <p>
          Wybrane kalkulatory mogą zapamiętywać ostatnio wpisane wartości w pamięci lokalnej przeglądarki
          (localStorage), wyłącznie na urządzeniu użytkownika. Dane te nie są wysyłane do serwisu ani do stron
          trzecich i można je usunąć, czyszcząc dane przeglądania.
        </p>
        <h2 className="pt-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">Analityka i reklamy</h2>
        <p>
          Serwis może korzystać z Google Analytics (statystyki odwiedzin) oraz Google AdSense (reklamy). Oba
          narzędzia ładują się wyłącznie po wyrażeniu zgody w bannerze cookies — patrz{" "}
          <Link href="/polityka-cookies" className="font-semibold text-green-700 underline">
            polityka cookies
          </Link>
          . Odrzucenie zgody nie ogranicza żadnej funkcji kalkulatorów.
        </p>
        <h2 className="pt-4 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink">Administrator danych</h2>
        <p>
          Administratorem serwisu jest osoba prywatna, prowadząca Kalkulatory Online poza działalnością
          gospodarczą. Kontakt w sprawach związanych z prywatnością:{" "}
          <a href="mailto:belkeprzemyslaw@gmail.com" className="font-semibold text-green-700 underline">
            belkeprzemyslaw@gmail.com
          </a>
          .
        </p>
        <p className="text-xs text-muted-2">
          Ta polityka prywatności zostanie rozszerzona o pełny opis przetwarzania danych zgodny z RODO w momencie
          wdrożenia narzędzi analitycznych lub reklamowych (np. Google Analytics, Google AdSense) — do tego czasu
          serwis nie zbiera ani nie przetwarza żadnych danych osobowych.
        </p>
      </div>
    </div>
  );
}
