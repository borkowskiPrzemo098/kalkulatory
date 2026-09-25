import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "O nas",
  description: "Informacje o serwisie Kalkulatory Online — darmowych kalkulatorach do szybkich obliczeń.",
  alternates: { canonical: "/o-nas" },
};

export default function ONasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/o-nas", label: "O nas" }]} />
      <h1 className="display mt-4 text-[clamp(2rem,6vw,3rem)] text-ink">O nas</h1>
      <div className="mt-6 max-w-[68ch] space-y-4 text-[1rem] leading-relaxed text-ink-2">
        <p>
          Kalkulatory Online to serwis stworzony z myślą o szybkich, prostych obliczeniach, które każdy z nas
          wykonuje na co dzień — od przeliczenia VAT, przez rabat, po sprawdzenie BMI czy raty kredytu.
        </p>
        <p>
          Wszystkie kalkulatory działają w całości w przeglądarce użytkownika — nie wymagają zakładania konta ani
          podawania danych osobowych, a wpisywane wartości nie są wysyłane na żaden serwer.
        </p>
        <h2 className="condensed pt-4 text-[1.35rem] font-bold text-ink">Kto to robi</h2>
        <p>
          Kalkulatory Online to projekt jednoosobowy — prowadzę go jako student informatyki, dla którego pisanie
          narzędzi, z których realnie ktoś korzysta, jest ciekawsze niż kolejny projekt zaliczeniowy leżący na
          dysku. Zamiast tego wolę budować proste, darmowe rzeczy, które komuś oszczędzają czas: szybkie
          przeliczenie VAT-u, sprawdzenie raty kredytu czy BMI bez grzebania w dziesięciu zakładkach.
        </p>
        <p>
          Serwis rozwija się stopniowo — kalkulatory są dodawane i poprawiane na bieżąco, a każdy wzór jest
          weryfikowany ręcznie policzonymi przykładami, zanim trafi na stronę. Jeśli zauważysz błąd albo brakuje
          Ci jakiegoś kalkulatora, daj znać na{" "}
          <Link href="/kontakt" className="text-accent hover:underline">
            stronie kontaktowej
          </Link>{" "}
          — to pomaga rozwijać serwis w stronę, która faktycznie jest ludziom potrzebna.
        </p>
      </div>
    </div>
  );
}
