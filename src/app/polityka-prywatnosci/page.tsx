import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu Kalkulatory Online.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs
        items={[{ href: "/", label: "Strona główna" }, { href: "/polityka-prywatnosci", label: "Polityka prywatności" }]}
      />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
        Polityka prywatności
      </h1>
      <div className="prose mt-6 max-w-none space-y-4 text-base leading-relaxed text-muted">
        <p>
          Kalkulatory dostępne w serwisie wykonują obliczenia w całości lokalnie, w przeglądarce użytkownika.
          Wartości wpisywane do formularzy kalkulatorów nie są przesyłane ani zapisywane na serwerach serwisu.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">Dane zapisywane lokalnie</h2>
        <p>
          Wybrane kalkulatory mogą zapamiętywać ostatnio wpisane wartości w pamięci lokalnej przeglądarki
          (localStorage), wyłącznie na urządzeniu użytkownika. Dane te nie są wysyłane do serwisu ani do stron
          trzecich i można je usunąć, czyszcząc dane przeglądania.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">Analityka</h2>
        <p>
          Serwis może w przyszłości korzystać z narzędzi analitycznych (np. Google Analytics) w celu zbierania
          zanonimizowanych statystyk odwiedzin. Do czasu skonfigurowania takich narzędzi żadne zdarzenia nie są
          wysyłane.
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">Reklamy</h2>
        <p>
          Serwis przewiduje miejsca na reklamy. W chwili obecnej nie są wyświetlane żadne rzeczywiste reklamy ani
          skrypty reklamowe stron trzecich.
        </p>
        <p className="rounded-lg border border-dashed border-border-strong bg-surface px-4 py-3 text-sm">
          [PLACEHOLDER: pełna treść polityki prywatności zgodna z RODO, dane administratora danych — do
          uzupełnienia przez właściciela serwisu / prawnika.]
        </p>
      </div>
    </div>
  );
}
