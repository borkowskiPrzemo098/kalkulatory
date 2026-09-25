import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import GoogleScripts from "@/components/GoogleScripts";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const DIRECTION_CONTRACT = `<!--
THESIS: Portal jak aplikacja w telefonie: duże kafle z ikonami prowadzą do kalkulatora jednym stuknięciem, a wynik stoi w dużym zielonym panelu. Odrzuca blade, tekstowe listy i drobne etykiety poprzedniej wersji.
OWN-WORLD: jedna rodzina zieleni butelkowej (od #04261f do #eef8f4) + słoneczny żółty dla głównych akcji na zieleni; Figtree 400–800; kafle 20 px zaokrąglenia z miękkim cieniem i uniesieniem; pełne zielone pola (hero, wynik, pas zaufania, stopka) przeplatane białymi i miętowymi sekcjami.
STORY: wchodzisz, widzisz od razu wyszukiwarkę i kafle, stukasz, wpisujesz liczby, duża biała liczba na zielonym panelu odpowiada natychmiast.
FIRST VIEWPORT: home — zielony hero: H1, duża wyszukiwarka z żółtym przyciskiem, szybkie przyciski; obok działający kalkulator procentów. Kalkulator — H1 i od razu panel wyniku nad polami (telefon).
FORM: duże kafle, mocna zieleń — kierunek przypięty przez właściciela (odpowiedź w pytaniu strukturalnym, 2026-09-25) po odrzuceniu arkusza technicznego (seed 027d4d54); wybór użytkownika zastępuje losowanie.
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
      <body className={`${figtree.variable} antialiased`}>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-green-700 focus:px-4 focus:py-2 focus:text-white"
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
