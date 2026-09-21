"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, ConsentStatus, getStoredConsent, initConsentModeDefaults } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Ładuje skrypty Google Analytics / AdSense wyłącznie gdy:
 * 1) odpowiednia zmienna środowiskowa jest ustawiona, ORAZ
 * 2) użytkownik zaakceptował cookies w bannerze zgody.
 * Dopóki oba warunki nie są spełnione — żaden zewnętrzny skrypt się nie ładuje.
 */
export default function GoogleScripts() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    initConsentModeDefaults();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only available post-mount
    setConsent(getStoredConsent());

    function handleChange(e: Event) {
      setConsent((e as CustomEvent<ConsentStatus>).detail);
    }
    window.addEventListener(CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleChange);
  }, []);

  const granted = consent === "granted";

  return (
    <>
      {granted && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {granted && ADSENSE_CLIENT && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
