---
name: Kalkulatory Online
description: Portal kalkulatorów jak aplikacja w telefonie. Duże kafle z ikonami, mocna zieleń butelkowa, wynik w dużym zielonym panelu.
colors:
  green-950: "#04261f"
  green-900: "#073d33"
  green-800: "#0a5246"
  green-700: "#0f6b5c"
  green-600: "#138571"
  green-200: "#bfe5d6"
  green-100: "#d9f0e7"
  green-50: "#eef8f4"
  sun: "#ffd24d"
  sun-600: "#f2b90f"
  bg: "#ffffff"
  mist: "#eef7f3"
  ink: "#0b1f1a"
  ink-2: "#2f4540"
  ink-3: "#56706a"
  line: "#d7e6e0"
  line-strong: "#b4cdc4"
  red: "#c0271d"
  red-50: "#fdeceb"
typography:
  display-hero:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 11vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  display-result:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 11vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline-page:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 7vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline-section:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 6vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-block:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-tile:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  body-lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.375
    fontFeature: "tnum"
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  help:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  nav-label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  control: "12px"
  icon-square: "16px"
  tile: "20px"
  panel: "24px"
  pill: "999px"
spacing:
  gap-tight: "8px"
  gap-grid: "12px"
  gap-grid-wide: "16px"
  pad-tile: "20px"
  pad-panel: "28px"
  section-y: "56px"
  section-y-wide: "80px"
components:
  button-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.green-950}"
    typography: "{typography.label}"
    rounded: "{rounded.icon-square}"
    height: "56px"
    padding: "0 28px"
  button-sun-hover:
    backgroundColor: "{colors.sun-600}"
    textColor: "{colors.green-950}"
  button-green:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.bg}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  button-green-hover:
    backgroundColor: "{colors.green-800}"
    textColor: "{colors.bg}"
  button-outline:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "0 20px"
  tile:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.title-tile}"
    rounded: "{rounded.tile}"
    padding: "20px"
  tile-icon:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.bg}"
    rounded: "{rounded.icon-square}"
    size: "56px"
  result-panel:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.bg}"
    typography: "{typography.display-result}"
    rounded: "{rounded.panel}"
    padding: "28px"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 16px"
  option-button:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
    padding: "10px 16px"
  option-button-selected:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.bg}"
  chip-quick:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 16px"
  nav-bottom:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-3}"
    typography: "{typography.nav-label}"
    height: "72px"
---

# Design System: Kalkulatory Online

## Overview

**Creative North Star: "The Pocket Calculator App"**

The portal behaves like a well-made phone app, not a document. Every route into a calculator is a big, tappable tile with a solid green icon square and the full calculator name; every calculator answers with one huge white number on a full bottle-green panel. The system is built for someone standing in a shop or halfway through an invoice: large type, few words, strong colour fields that tell you where you are at a glance.

Pages alternate full-bleed bands: deep green fields (hero, category header, trust band, footer, the result panel, the formula card) against white and mint (`mist`) sections that carry the tiles, forms and reading content. One colour family does all the work; a sunny yellow appears only where an action or emphasis must pop off the green. Figtree carries everything from the 800-weight display numbers down to 13px bottom-nav labels, with tabular numerals on by default so numbers never jitter while typing.

The owner rejected the previous pale, hairline, small-caps, text-list world as looking like a "hospital portal" or an "unfinished template". This audience wants big targets with icons, strong colour, large type and little text; the system is tuned for that.

**Key Characteristics:**
- One bottle-green family from near-black `green-950` to mint `green-50`, plus sun yellow as the single warm accent.
- Big white tiles (20px radius, soft green-tinted shadow, 3px lift on hover) with a 56px green icon square and a bold name.
- The result number is the largest element on every calculator page, white on full green.
- Full-bleed green fields alternate with white and mint sections; no pale grey page chrome.
- Every interactive target is at least 44px tall; inputs and primary controls are 48-64px.

## Colors

A single bottle-green family carries structure, brand and surfaces; sun yellow is the only other hue and is reserved for action and emphasis on green.

### Primary
- **Bottle Green** (`green-700`): the brand colour (binding per PRODUCT.md). The result panel, tile icon squares, selected option buttons, green primary buttons, the logo mark, focus-within field borders, text links and inline accents.
- **Deep Bottle** (`green-800`): hover state of Bottle Green; background of the home hero and category headers; active bottom-nav text.
- **Forest Night** (`green-900`): the trust band on the home page and the formula card on calculator pages.
- **Pine Black** (`green-950`): the footer, and the text colour on every sun-yellow surface.
- **Leaf** (`green-600`): lightest saturated step of the family; defined for the ramp, rarely used directly.
- **Sea Glass** (`green-200`): tile hover border, FAQ open border, unselected option hover border.
- **Pale Mint** (`green-100`): soft icon squares (compact tiles, section-title icons, FAQ plus), focus glow around fields, active bottom-nav pill, count badges.
- **Mint Wash** (`green-50`): unit badges inside fields, hover fill on option buttons, search results and header nav, open FAQ background, count chips.

### Secondary
- **Sun** (`sun`): primary actions and emphasis on green fields: the hero search button, the trust-band CTA, highlighted words in green-field headings ("online", "bez rejestracji"), the category-header icon square, trust icons, the active band and marker on result scale bars, footer column headings, the inverted logo mark.
- **Marigold** (`sun-600`): hover of Sun buttons.

### Neutral
- **Paper** (`bg`): page background, tiles, form card, inputs, header, bottom nav, overlays.
- **Mist** (`mist`): alternating light sections (category block on home, calculator and listing page headers, how-to steps). A green-tinted near-white, never grey.
- **Ink** (`ink`): headings, input values, tile names.
- **Ink Two** (`ink-2`): secondary text, FAQ answers, unselected option labels, header nav links (about 10:1 on white).
- **Ink Three** (`ink-3`): help text, placeholders, breadcrumbs, inactive bottom-nav items (about 5:1 on white).
- **Line** (`line`): 1px tile border, 2px field and outline-button border, header and bottom-nav rules.
- **Line Strong** (`line-strong`): field hover border, breadcrumb chevrons, scrollbar thumb.
- **Alarm Red** (`red`) with **Alarm Wash** (`red-50`): calculation error state only ("Sprawdź dane").

### Named Rules
**The One Family Rule.** Every surface, border and tint comes from the bottle-green ramp or its green-tinted neutrals. No blues, purples, greys or second brand hues.

**The Sun On Green Rule.** Sun yellow appears on or beside green fields, for the one primary action or the one emphasised phrase. Text on Sun is always Pine Black. On white surfaces the primary action is Bottle Green, not Sun.

**The Full Field Rule.** Hero, category header, trust band, result panel, formula card and footer are solid green fields edge to edge (or full-bleed panels), never tinted outlines or pale washes.

## Typography

**Display Font:** Figtree (with system-ui, sans-serif), loaded via next/font as `--font-figtree`
**Body Font:** Figtree (same family, weights 400-800)

**Character:** One friendly geometric-humanist sans used at extreme weights: 800 with tight -0.03em tracking and 1.04 leading for display and numbers, 600-700 for labels and tile names, 400 for reading. Tabular numerals are on globally (`font-variant-numeric: tabular-nums`).

### Hierarchy
The ramp below lists every size the build actually uses. Display roles share the `.display` treatment (800, -0.03em, 1.04, balanced wrap).
- **Display, hero** (800, clamp 2.75rem-5rem): home H1 only.
- **Display, result** (800, clamp 2.75rem-4.25rem): the primary result number on calculator pages. The home demo result uses clamp 2.4rem-3.25rem inside its smaller card.
- **Headline, page** (800, clamp 1.9rem-3rem): calculator H1. Listing H1 uses clamp 2rem-3.25rem, category H1 clamp 2.1rem-3.5rem, trust-band heading clamp 1.9rem-3rem.
- **Headline, section** (800, clamp 1.75rem-2.5rem): home section heads ("Najpopularniejsze", "Kategorie").
- **Title, block** (800, 1.5rem, -0.02em): content section titles on calculator pages (how-to, formula, examples, FAQ, related), always paired with a 40px Pale Mint icon square. Category group titles on the listing use 1.6rem.
- **Title, tile** (700, 1.125rem mobile to 1.25rem desktop, tight leading): large tile names; category tile names reach 1.3rem; compact tiles 1.0625rem. Secondary result values and formula lines also sit at 1.25rem (formula 1.4rem desktop), weight 700-800.
- **Body lead** (400, 1.125rem, 1.7): calculator intro paragraph, max 68ch. Hero subline uses 1.2rem-1.35rem.
- **Body** (400, 1.0625rem, snug): base body size, FAQ answers, how-to steps, footer copy. Max 60-68ch.
- **Label** (600-700, 1rem): field labels, legends, buttons, chips, nav links.
- **Help** (400-500, 0.9375rem): help text under fields, breadcrumbs, disclaimers, secondary result labels.
- **Caption** (600, 0.875rem): count badges, scale-bar boundaries, footer legal line.
- **Nav label** (700, 0.8125rem): bottom-nav item labels only; the floor of the ramp.

### Named Rules
**The Number Is King Rule.** On a calculator page the primary result number is the largest type on screen (result max 4.25rem vs H1 max 3rem). No heading, promo or ad may outsize it.

**The No Kicker Rule.** Headings stand alone. No eyebrow, kicker, small-caps label or uppercase tag above any heading.

**The 13px Floor Rule.** Nothing renders below 0.8125rem, and that size is reserved for bottom-nav labels. Everything a user reads to act is 1rem or larger.

## Layout

A single centred container (max 72rem, 16px side padding, 24px from 640px) holds every section; full-bleed colour bands run edge to edge behind it. Section rhythm is 56px vertical padding on phones and 80px from 640px. Page headers (mist or green) are shorter: 20-32px top, 32-48px bottom.

Tile grids: large tiles run 2 columns on phones and 4 from 1024px; compact tiles 1 column, 2 from 420px, 3 from 1024px; category tiles 2 then 3, with an odd last tile spanning the row on phones. Grid gaps are 12px, 16px from 640px.

Calculator pages: breadcrumbs, icon square and H1 in a mist header, then the form section. On phones the result panel is ordered **above** the fields so the keyboard never hides it; from 768px it becomes a two-column grid with inputs left and the result panel right, sticky at 96px from the top. Below, an article column (max 68ch text) sits beside a 21rem related-calculators aside from 1024px, also sticky.

Home: green hero with H1, search and quick chips left, the working percentage demo right (1.1fr / 0.9fr from 1024px); then popular tiles on white, categories on mist, trust band on Forest Night, FAQ on white, footer on Pine Black.

Mobile chrome: the header is not sticky below 768px; a fixed 72px bottom nav (4 items, safe-area padded) takes over, and main content reserves 80px at the bottom for it.

## Elevation & Depth

Hybrid: colour fields do most of the layering, and a soft, green-tinted shadow family lifts white objects off them. Shadows are always diffuse and tinted with the green family, never black and never hard-offset.

### Shadow Vocabulary
- **Tile** (`0 1px 2px rgba(7,61,51,0.06), 0 10px 28px -14px rgba(7,61,51,0.28)`): resting state of every tile and the input card.
- **Tile hover** (`0 2px 4px rgba(7,61,51,0.08), 0 18px 40px -16px rgba(7,61,51,0.38)`): with a 3px upward lift and Sea Glass border on hover of a linked tile.
- **Float** (`0 20px 50px -18px rgba(4,38,31,0.45)`): objects that sit over or against colour: the result panel, the hero demo card, the hero search field, search dropdowns, the mobile search sheet, the cookie banner.
- **Bottom bar** (`0 -8px 24px -16px rgba(4,38,31,0.4)`): the fixed bottom nav only.

### Named Rules
**The Lift On Touch Rule.** Linked tiles rise 3px and deepen their shadow on hover (200ms, ease-out-expo). Static containers do not move. Reduced motion removes the lift entirely.

## Shapes

Generously rounded, never sharp and never fully pill-shaped except for chips. Radius grows with object size: 12px for controls (inputs, buttons, option buttons, small icon squares), 16px for icon squares on tiles, FAQ items, search field and inner result tiles, 20px for tiles, 24px for panels (result, hero demo, formula card, cookie banner). Chips, count badges, bottom-nav active pills and numbered step markers are fully round.

Borders: tiles use a 1px Line border; fields, outline buttons, option buttons, FAQ items and category chips use a 2px border. Icons are lucide line icons at stroke 2-2.5. Calculator, category, section-title and trust icons always sit inside a filled rounded square (Bottle Green with white, Pale Mint with Bottle Green, or Sun with Pine Black). Utility icons (arrows, chevrons, search, close, alert) appear bare at 16-24px, usually in Bottle Green.

## Components

### Buttons
Chunky, filled and obvious.
- **Shape:** gently rounded (12px); the large Sun CTA uses 16px.
- **Sun primary (on green):** Sun fill, Pine Black text, 700-800 weight. Hero search submit sits inside the search field; trust-band CTA is 56px tall with 28px side padding and an arrow icon. Hover to Marigold.
- **Green primary (on white):** Bottle Green fill, white text, 48px tall, 20px padding; hover to Deep Bottle. Used for the cookie "Akceptuję".
- **Outline:** white with 2px Line border, Ink Two text, 48px; hover border goes Bottle Green (or Line Strong in the cookie banner). Used for "Wyczyść" and "Odrzuć".
- **Text link with arrow:** 1rem bold Bottle Green, arrow nudges 2-4px right on hover.
- **Focus:** a double ring on every focusable element (`.focus-ring`): 3px Deepest Green (`green-950`) outline at 2px offset plus a 5px Sun box-shadow ring. The dark ring carries contrast on white and mint surfaces, the yellow ring on green fields.

### Chips
- **Quick links on green:** 44px pill, 12% white fill, white 1rem semibold text with an 18px icon; hover fills white with Forest Night text.
- **Category jump chips on mist:** 44px pill, white with 2px Line border, icon in Bottle Green and a Pale Mint count badge; hover border Bottle Green.

### Cards / Containers
- **Tile:** 20px radius, white, 1px Line border, Tile shadow. Large variant: 16-20px padding, 56px Bottle Green icon square above the name. Compact variant: 14px padding, 48px Pale Mint icon square beside the name, filling Bottle Green on hover. Tiles show icon plus full name only; category tiles add a count badge and an arrow.
- **Green panels:** result panel (Bottle Green, 24px radius, 20-28px padding, Float shadow), formula card (Forest Night, 24-32px padding, one equation per line in 1.25-1.4rem bold white), trust items (7% white fill on Forest Night, Sun icon squares).
- **How-to steps:** Mist cards, 16px radius, numbered 36px Bottle Green circles.

### Inputs / Fields
- **Style:** 56px tall, 2px Line border, 12px radius, white. Values in 1.25rem bold Ink; placeholders regular Ink Three. Units sit in a Mint Wash badge inside the right edge in bold Deep Bottle. Numeric inputs use `inputMode="decimal"` with spinners hidden.
- **Hover / Focus:** hover border Line Strong; focus-within border Bottle Green plus a 4px Pale Mint glow.
- **Hero search:** 64px, 16px radius, transparent border and Float shadow on green, 24px Bottle Green search icon, Sun submit button inset; focus border turns Sun.
- **Error:** the result panel swaps to a white card with a red alert icon, "Sprawdź dane" in bold red and the message in Ink.

### Option Buttons (select fields)
- **Short sets** (up to 6 options, labels up to 14 characters): a wrapping row of equal-flex buttons, min 72px wide, 48px tall, 2px Line border, 12px radius, 1rem semibold.
- **Medium sets** (up to 5 longer options): stacked full-width buttons with a 24px round check marker.
- **Long lists:** native select in the standard 56px field with a Bottle Green chevron.
- **Selected:** solid Bottle Green fill and border, white text. **Unselected hover:** Sea Glass border, Mint Wash fill.

### Navigation
- **Header:** white, 64-72px tall, 1px Line bottom rule, sticky from 768px. Logo left; compact 44px search from 1024px; nav links as 1rem semibold Ink Two pills that fill Mint Wash on hover.
- **Bottom nav (phones):** fixed white bar, 72px, four equal items (Start, Kalkulatory, Kategorie, Szukaj). 24px icon over a 0.8125rem bold label; the active item turns Deep Bottle with a 56x32px Pale Mint pill behind the icon and a heavier icon stroke. "Szukaj" opens a floating search sheet above the bar with results dropping upward.
- **Footer:** Pine Black, inverted logo (Sun mark), Sun column headings, 85% white links.

### Result Panel (signature)
The heart of the product. Full Bottle Green, Float shadow, sticky on desktop and first on phones. Label in 85% white, then the primary value in display-result size white with a 320ms pop (6px rise, fade from 35%) on every change. Optional scale bar: rounded 14px segments in 25% white, the active band and a triangular marker in Sun, boundaries in caption type. Secondary results sit in a two-column grid of 12% white tiles (16px radius) with 1.25rem bold values. A Sun shield icon closes the panel with the privacy line. Empty state: a dashed 35% white outline with a one-line prompt.

## Do's and Don'ts

### Do:
- **Do** route to every calculator through a tile with a filled icon square and the full calculator name.
- **Do** make the primary result number the largest element on a calculator page, white on Bottle Green, and place the result panel above the fields on phones.
- **Do** alternate full green fields with white and Mist sections so each band reads at a glance.
- **Do** use Sun only for the main action or the emphasised phrase on green, with Pine Black text on it.
- **Do** render short option sets as a wrapping row of big buttons, with the selected one in solid Bottle Green.
- **Do** keep every tappable target at least 44px tall and every readable string at 1rem or more (13px only for bottom-nav labels).
- **Do** use the documented type sizes above; add a new size only by adding it to this ramp.
- **Do** tint every shadow with the green family and keep it soft and diffuse.

### Don't:
- **Don't** return to the rejected world: pale surfaces, hairline rules, small caps, tiny labels and text-only lists read as a "hospital portal" or an "unfinished template".
- **Don't** put an eyebrow, kicker or uppercase label above any heading.
- **Don't** add descriptions or clamped blurbs to calculator tiles; icon plus full name only.
- **Don't** render placeholder ad boxes; ad slots output nothing until AdSense is configured.
- **Don't** introduce a second hue family (blue, purple, grey) or use Sun as a large background on white.
- **Don't** let any heading, promo or ad outsize or push down the result panel on mobile.
- **Don't** use emoji or text glyphs as icons, and don't show a calculator or category icon without its filled rounded square.
- **Don't** use hard offset shadows or black shadows.
