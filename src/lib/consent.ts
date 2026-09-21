// Prosty, własny mechanizm zgody na cookies (RODO) — bez zewnętrznych dostawców (CMP).
// Nic nie jest ładowane (Analytics, reklamy) dopóki użytkownik nie wyrazi zgody.

export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-change";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, status);
  } catch {
    // localStorage niedostępny (np. tryb prywatny) — zgoda nie zostanie zapamiętana
    // między wizytami, ale banner i tak zadziała w bieżącej sesji.
  }
  updateGoogleConsentMode(status);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Google Consent Mode v2 — domyślnie wszystko odrzucone, dopóki użytkownik
 * nie zaakceptuje. Wymagane przez Google przy Analytics/AdSense dla użytkowników z UE.
 */
export function initConsentModeDefaults(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

function updateGoogleConsentMode(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  const value = status === "granted" ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}
