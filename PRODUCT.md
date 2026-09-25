# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone arriving from Google with a single, concrete calculation in mind ("kalkulator VAT", "ile to procent", "rata kredytu 300 tys."). Mostly on a phone, often mid-task (shopping, invoicing, planning a renovation, checking health numbers). They want the answer in seconds and leave; a minority return for the same tool or browse related ones.

## Product Purpose

A free Polish-language portal of online calculators (60 at present, architecture sized for 100–300). Success means: the visitor lands on the right calculator, gets a correct, clearly formatted result without clicking "Oblicz", and trusts the number enough to act on it. Long term the site is monetised with ads (Google AdSense first, direct advertisers later), so it must look like a credible, well-kept publication, not a throwaway tool page.

## Positioning

Every calculation runs locally in the browser: no account, no data sent anywhere, results update while typing. Each calculator ships with the formula, a worked example and FAQ written for humans, and every formula is covered by hand-computed unit tests. Run openly by one person (a computer-science student), not an anonymous content farm.

## Operating Context

- Entry is almost always a calculator page from search, not the homepage.
- Mobile-first: bottom navigation bar on phones, search available from every page.
- Polish number formatting (1 234,56 zł, 23,5%).
- Content per calculator: intro, how-to steps, formula, examples, FAQ, related calculators, category.
- Ad slots exist (AdPlaceholder) and a cookie-consent banner gates GA4/AdSense (Consent Mode v2).

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind CSS 4, static export to GitHub Pages (basePath `/kalkulatory`); custom domain pending.
- Registry architecture: one config + pure calculate function per calculator in `src/calculators/`; pages, sitemap, search and related links are generated from the registry.
- 158 Vitest tests over the calculation logic must keep passing.
- Minimal JS, no heavy libraries, strong Core Web Vitals; `lucide-react` for icons.
- No backend, no paid APIs, no secrets in client code.

## Brand Commitments

- Name: **Kalkulatory Online** (binding).
- Bottle green (`#0f6b5c` family) is the brand colour (binding, requested by the owner).
- The logo is open for redesign; the current "K" square and favicon may be replaced.

## Evidence on Hand

- Real content: 60 calculators with formulas, examples and FAQ; legal pages; contact e-mail belkeprzemyslaw@gmail.com; owner is a private individual (no company).
- Absent and must not be fabricated: user counts, ratings, testimonials, press, awards, partner logos, traffic statistics.

## Product Principles

1. The number first: the result is the most important pixel on any calculator page.
2. Credibility through craft and transparency (formulas, tests, privacy), never through invented social proof.
3. Every page is a landing page; the homepage is secondary to calculator pages.
4. Ads must never push the calculator or its result below the fold on mobile.
5. Adding the 100th calculator must cost no design work: the system scales by content, not by bespoke layouts.

## Accessibility & Inclusion

Proper labels on every input, visible focus states, keyboard operability, WCAG AA contrast, correct mobile keyboards (`inputMode`).
