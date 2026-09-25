"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Odczyt localStorage jest możliwy dopiero po zamontowaniu (SSR nie ma dostępu
    // do window) — stąd ustawienie stanu w efekcie zamiast w initState.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getStoredConsent() === null);
  }, []);

  function respond(accepted: boolean) {
    setStoredConsent(accepted ? "granted" : "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      className="fixed inset-x-0 bottom-16 z-50 px-3 pb-3 md:bottom-4 md:px-6"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 border-[1.5px] border-frame bg-paper p-4 shadow-[0_16px_40px_-12px_rgba(8,59,51,0.35)] sm:flex-row sm:items-center sm:p-5">
        <p className="flex-1 text-[0.88rem] leading-relaxed text-ink-2">
          Używamy plików cookies do statystyk odwiedzin i wyświetlania reklam wspierających działanie serwisu.
          Możesz zaakceptować lub odrzucić — kalkulatory działają tak samo w obu przypadkach. Więcej w{" "}
          <Link href="/polityka-cookies" className="text-accent hover:underline">
            polityce cookies
          </Link>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => respond(false)}
            className="focus-ring h-11 border border-hair-strong px-4 text-[0.9rem] font-semibold text-ink hover:border-ink-3 hover:bg-table"
          >
            Odrzuć
          </button>
          <button
            type="button"
            onClick={() => respond(true)}
            className="focus-ring h-11 bg-green px-4 text-[0.9rem] font-semibold text-white hover:bg-green-deep"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
