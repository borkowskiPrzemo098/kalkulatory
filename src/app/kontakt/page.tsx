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
      <Breadcrumbs items={[{ href: "/", label: "Start" }, { href: "/kontakt", label: "Kontakt" }]} />
      <h1 className="display mt-4 text-[clamp(2rem,6vw,3rem)] text-ink">Kontakt</h1>
      <div className="mt-6 max-w-[68ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
        <p>Masz pytanie, uwagę lub propozycję nowego kalkulatora? Napisz — chętnie odpowiem.</p>
        <div className="border-[1.5px] border-frame bg-paper px-5 py-5 text-[0.98rem]">
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
