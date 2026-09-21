// Prosty util pod Google Analytics / GTM — no-op dopóki nie skonfigurowano NEXT_PUBLIC_GA_ID
// LUB dopóki użytkownik nie zaakceptował cookies w bannerze zgody (src/components/CookieConsent.tsx).
// Nie wysyła żadnych danych, dopóki oba warunki nie są spełnione.

import { getStoredConsent } from "./consent";

export type AnalyticsEvent =
  | "calculator_view"
  | "calculation_performed"
  | "cta_click"
  | "search_performed";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  if (!GA_ID || getStoredConsent() !== "granted") {
    // Brak skonfigurowanego GA/GTM albo brak zgody użytkownika — zdarzenie ignorowane (no-op).
    // Odkomentować poniższą linię do debugowania lokalnego:
    // console.debug(`[analytics:noop] ${event}`, payload);
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }
}
