import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["opsz"],
});

const SITE_URL = "https://kalkulatory-online.example";

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
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Przejdź do treści
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
