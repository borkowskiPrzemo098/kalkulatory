"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
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
      className="fixed inset-x-0 bottom-16 z-50 px-4 pb-4 sm:bottom-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-lg sm:flex-row sm:items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Cookie className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          Używamy plików cookies do statystyk odwiedzin i wyświetlania reklam wspierających działanie serwisu.
          Możesz zaakceptować lub odrzucić — kalkulatory działają tak samo w obu przypadkach. Więcej w{" "}
          <Link href="/polityka-cookies" className="text-accent hover:underline">
            polityce cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => respond(false)}
            className="focus-ring rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
          >
            Odrzuć
          </button>
          <button
            type="button"
            onClick={() => respond(true)}
            className="focus-ring rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-contrast hover:bg-accent-hover"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
