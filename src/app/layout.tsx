import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import GoogleScripts from "@/components/GoogleScripts";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["wdth"],
});

const DIRECTION_CONTRACT = `<!--
THESIS: Każdy kalkulator to arkusz rysunku technicznego: dane są wymiarami, wynik wpisany w tabliczkę rysunkową. Odrzuca siatkę białych kart z ikonkami i hero z wyszukiwarką na gradiencie.
OWN-WORLD: białe arkusze z podwójną ramą w zieleni butelkowej i strefami 1–4 / A–C na zielonkawoszarym stole; Archivo (wąskie wersaliki w etykietach), ostre narożniki, wykazy części zamiast kart, kreskowanie 45° dla reklam, odwrócony zielony arkusz w stopce i pasie zaufania; zieleń = tusz wyniku, czerwień tylko błędy.
STORY: przychodzisz z Google, wpisujesz liczby, odczytujesz wynik w tabliczce z linią wymiarową, ufasz dzięki wzorowi, przykładom i uwagom, idziesz dalej przez wykaz powiązanych.
FIRST VIEWPORT: mobile — okruszki, H1, arkusz z polami; tabliczka z wynikiem widoczna bez przewijania. Home — H1 i wyszukiwarka po lewej, działający arkusz „15% z 250” po prawej.
FORM: arkusz rysunku technicznego, pozycja 5 z 7, seed 027d4d54.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

const SITE_URL = "https://borkowskiprzemo098.github.io/kalkulatory";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kalkulatory Online — darmowe kalkulatory do szybkich obliczeń",
    template: "%s — Kalkulatory Online",
  },
  description:
    "Darmowe kalkulatory online do szybkich i prostych obliczeń: procenty, VAT, rabaty, raty kredytu, BMI i więcej. Bez rejestracji, bez reklam wyskakujących.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Kalkulatory Online",
    url: SITE_URL,
    title: "Kalkulatory Online — darmowe kalkulatory do szybkich obliczeń",
    description:
      "Darmowe kalkulatory online do szybkich i prostych obliczeń: procenty, VAT, rabaty, raty kredytu, BMI i więcej.",
  },
  twitter: {
    card: "summary",
    title: "Kalkulatory Online",
    description: "Darmowe kalkulatory online do szybkich i prostych obliczeń.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${archivo.variable} antialiased`}>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-green focus:px-4 focus:py-2 focus:text-white"
        >
          Przejdź do treści
        </a>
        <Header />
        <main id="main-content" className="pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <ScrollToTop />
        <CookieConsent />
        <GoogleScripts />
      </body>
    </html>
  );
}
