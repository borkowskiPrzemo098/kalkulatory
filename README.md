# Kalkulatory Online

Portal SEO z darmowymi kalkulatorami online. Next.js (App Router) + TypeScript +
Tailwind CSS. Cała logika obliczeniowa działa lokalnie w przeglądarce — brak
backendu, brak płatnych API AI.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm run start
```

## Testy

```bash
npm run test
```

## Deploy

Projekt jest gotowy do wdrożenia na Vercel, Netlify lub Cloudflare Pages — jako
standardowa aplikacja Next.js (statyczne strony kalkulatorów generowane przez SSG).
Najprościej: połącz repozytorium z Vercel i wdróż bez dodatkowej konfiguracji.

## Konfiguracja opcjonalna

- `NEXT_PUBLIC_GA_ID` — ustaw, aby włączyć wysyłkę zdarzeń analitycznych
  (`src/lib/analytics.ts`). Bez tej zmiennej zdarzenia są no-op.
- Adres URL serwisu w metadanych i sitemapie: zmień stałą `SITE_URL` w
  `src/app/layout.tsx`, `src/app/sitemap.ts` i `src/app/robots.ts` na docelową domenę.

## Dodawanie nowego kalkulatora

Zobacz [docs/ADDING_CALCULATOR.md](docs/ADDING_CALCULATOR.md) — instrukcja krok po
kroku (5–10 minut).

## Struktura projektu

- `src/calculators/` — logika i konfiguracja kalkulatorów + rejestr (`registry.ts`).
- `src/components/` — komponenty wielokrotnego użytku (formularz kalkulatora,
  wynik, FAQ, powiązane kalkulatory, placeholder reklamowy itd.).
- `src/app/` — strony App Router (strona główna, `/kalkulatory`, `/kalkulatory/[slug]`,
  `/kategorie/[slug]`, strony statyczne, sitemap, robots).
- `src/lib/` — narzędzia współdzielone (formatowanie liczb, kategorie, analityka).
