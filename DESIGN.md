---
name: Kalkulatory Online
description: Darmowe kalkulatory jako arkusze rysunku technicznego — dane są wymiarami, wynik wpisany w tabliczkę.
colors:
  table: "#edf2f0"
  paper: "#ffffff"
  ink: "#0f2420"
  ink-2: "#3c4f4a"
  ink-3: "#56696a"
  hair: "#cfdad6"
  hair-strong: "#9fb2ac"
  frame: "#0b4a40"
  green: "#0f6b5c"
  green-deep: "#0a4a40"
  green-night: "#083b33"
  green-tint: "#e2efeb"
  result-wash: "#f2f8f6"
  red: "#b3261e"
  red-tint: "#fbecea"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 10vw, 5rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 6vw, 3.1rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
  result:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 8vw, 3.25rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
    fontFeature: "'tnum' 1"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4.5vw, 2rem)"
    fontWeight: 700
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 80"
  subtitle:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "'tnum' 1"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  base:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum' 1"
  small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
  value:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 72"
rounded:
  none: "0px"
  circle: "9999px"
spacing:
  sheet-margin-mobile: "8px"
  sheet-margin: "20px"
  cell-y: "10px"
  cell-x: "16px"
  cell-x-wide: "24px"
  field-stack: "20px"
  block: "48px"
  section: "64px"
  section-wide: "80px"
components:
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 8px 8px"
  sheet-inverted:
    backgroundColor: "{colors.green-night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.value}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0 14px"
  option-segment:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "8px 14px"
  option-segment-selected:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.ink}"
  result-zone:
    backgroundColor: "{colors.result-wash}"
    textColor: "{colors.green}"
    typography: "{typography.result}"
    padding: "20px 16px"
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 16px"
  quick-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  index-row-hover:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.green}"
  nav-bottom:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    height: "64px"
  nav-bottom-active:
    textColor: "{colors.green}"
  ad-slot:
    backgroundColor: "{colors.table}"
    textColor: "{colors.ink-3}"
    height: "96px"
---

# Design System: Kalkulatory Online

## Overview

**Creative North Star: "The Drafting Table"**

Every page is a drafting table (a pale green-grey surface) with white drawing sheets laid on it. A calculator is one sheet: a cut line, a double frame in bottle green, zone marks 1–4 across the top and A–C down the side, the inputs drawn as dimensions, and the result lettered into a title block with a dimension line under it. The formula sits in an annotation zone marked with a circled detail letter, not in a tooltip or a separate page. Lists of calculators and categories are parts lists and drawing indexes: ruled rows with a drawing number, never a grid of cards.

The system is dense, flat and exact. Hierarchy comes from one typeface worked through its width axis (condensed caps for lettering, near-normal width for headlines), from line weight (1px hairlines against a 1.5px frame line), and from one ink colour. Green is the ink of the drawing: results, dimension lines, frames, links and arrows. Red appears only when the drawing is wrong. The inverted sheet, white lines on night green, is reserved for the footer and the home trust band.

The world rejects the white-card grid with icon tiles and the search-on-gradient hero. Its home hero is a sheet with the H1 and search on the left and a working "15% z 250" mini-sheet on the right.

**Key Characteristics:**
- White sheets with double bottle-green frame and zone marks on a green-grey table.
- One typeface (Archivo variable) with width axis: 72% caps lettering, 80% section heads, 92% display.
- Sharp corners everywhere; circles only as drawing callouts and radio dots.
- Green is ink, never a selected-state fill; red only for errors.
- Parts lists and drawing indexes instead of cards; 45° section hatching for empty and ad fields.
- A dimension line under every numeric value, drawn from the centre outwards.

## Colors

A single bottle-green ink family on green-tinted neutrals, with one red held back for faults.

### Primary
- **Bottle Green Ink** (green): the ink of the drawing. Result values, dimension lines and arrows, unit tags inside fields, links, arrow glyphs in index rows, the focus outline, the text caret and `::selection`. The one filled button per view (404 return, cookie accept) uses it as a fill.
- **Drafting Frame Green** (frame): the 1.5px sheet frame, title-block rules, result-box border, the heavy top rule on every index list and table, header and bottom-nav top rules.
- **Deep Bottle Green** (green-deep): hover state of green text and the filled button. Visually one step from the frame colour; keep them as separate roles (hover ink vs. line).
- **Night Green** (green-night): background of the inverted sheet (footer, home trust band) and the text colour of the white CTA inside it.

### Neutral
- **Drafting Table** (table): page background, scrollbar track, the paper-knockout behind ad-slot labels, hover ground of unselected options.
- **Sheet White** (paper): every sheet, field, header, bottom nav and floating panel.
- **Result Wash** (result-wash, canonically `color-mix(in srgb, var(--green-tint) 45%, white)`): the result zone and, from md up, the formula annotation zone inside the calculator sheet. Nowhere else.
- **Green Tint** (green-tint): selected option ground, hover ground of index rows, nav links, quick links and ghost actions.
- **Drawing Ink** (ink): primary text. **Secondary Ink** (ink-2, about 8:1 on white): supporting text, field labels, legends. **Lettering Grey** (ink-3, about 5.6:1): title-block labels, drawing numbers, help text, placeholders.
- **Hairline** (hair): thin row rules, internal dividers, and the hatch stroke. **Strong Hairline** (hair-strong): field borders, title-block cell dividers, ad-slot and empty-state borders, the construction drawing behind the home hero.

### Error
- **Fault Red** (red) on **Fault Tint** (red-tint): the calculator error box (red border, red caps label "Sprawdź dane", ink message) and 404 lettering.

### Named Rules
**The Ink-of-Record Rule.** Green marks what the drawing states: results, lines, affordances. A selected option is green-tint with a 1.5px inset frame line, never a solid green fill. Solid green fills are limited to the active band of a result scale, the 3px active marker in the bottom nav, and the single primary button.

**The Red-for-Faults Rule.** Red appears only on validation errors and the 404 sheet. It is never decoration, emphasis or a "negative" result colour.

**The Table-and-Sheet Rule.** Content sits on white sheets; the page background is always the green-grey table. Inverted sheets (night green) are the only dark surfaces.

## Typography

**Display Font:** Archivo variable, width axis loaded (with system-ui, sans-serif)
**Body Font:** Archivo (same family)
**Label Font:** Archivo at 72% width, uppercase

**Character:** One grotesque drawn at three widths, like technical lettering on one drawing: narrow caps for the title block, a slightly condensed heavy face for headings, normal width for reading. All figures are tabular (`font-variant-numeric: tabular-nums` on body).

### Hierarchy
- **Display** (750, 92% width, clamp(2.6rem, 10vw, 5rem), 1.02, -0.025em, balanced): the home H1 only.
- **Headline** (750, 92% width, clamp(1.9rem, 6vw, 3.1rem), 1.02): calculator H1; the same face at clamp(1.9rem, 5.5vw, 2.9rem) sets the trust-band statement and at clamp(2rem, 6vw, 3rem) the 404 title.
- **Result** (750, 92% width, clamp(2.1rem, 8vw, 3.25rem), green): the primary value in the title block; the home demo uses clamp(2.4rem, 9vw, 3.4rem).
- **Title** (700, 80% width, clamp(1.5rem, 4.5vw, 2rem), -0.015em): home section heads, paired with a caps link at the right.
- **Subtitle** (700, 80% width, 1.35rem, -0.01em): calculator page sections (Jak korzystać, Przykłady, FAQ).
- **Body** (400, 1.08rem, 1.7, max 68ch): calculator intro and long text.
- **Lede** (400, 1.25rem from sm, 1.15rem on phones, max 34ch): the home hero sentence.
- **Base** (400–600, 1rem): list text, FAQ, option rows, table cells, links in the footer — the default size for everything that is not intro prose.
- **Small** (400, 0.875rem, leading-snug): help text under fields, disclaimers, secondary lines in index rows, the cookie note. No other steps between 0.7rem and 1.08rem.
- **Value** (600, 1.125rem): numbers typed into fields; secondary result cells use 600 at 1.05rem.
- **Label** (600, 72% width, 0.7rem, 0.07em, uppercase): field labels, legends, title-block labels, zone names, drawing numbers (0.72rem), nav items (0.72rem), column titles.

### Named Rules
**The Lettering Rule.** Every label is caps at 72% width, weight 600, 0.07em tracking. Informational labels are never smaller than 0.7rem; the 0.6rem size belongs only to the aria-hidden zone marks on the sheet margin.

**The One Family Rule.** Archivo is the only typeface. Hierarchy is made with the width axis and weight, never by adding a second family.

## Layout

A single centred container (max 72rem) with 16px side padding, 24px from sm. Home sections are separated by 64px (80px from sm); a calculator page stacks breadcrumb, H1 block (max 48rem), the calculator sheet, a disclaimer line, then a two-column reading area from lg (content plus a sticky 20rem aside of related calculators, 64px gap; 48px vertical rhythm between blocks).

The calculator sheet is a two-column grid from md (inputs 1fr, result 1.05fr); the result zone sits top right, the formula annotation zone bottom right, and a four-cell title block (drawing number, category, "calculated in your browser", clear action) closes the sheet. On mobile the sheet bleeds to the viewport edge (-16px) with an 8px zone margin, the result zone is ordered above the inputs so the keyboard never hides it, and the formula zone follows the inputs. Fields stack at 20px. Cells pad 16px (24px from sm).

Indexes use a fixed column grid: 3.75rem drawing number, flexible name, optional 9rem category from md, trailing arrow. Category rows add a sample column from md.

Mobile navigation is a fixed 64px bottom bar (four equal cells: Start, Kalkulatory, Kategorie, Szukaj); search opens as a panel docked above it. The header search appears from sm, header nav links from md; the header is sticky only from md. Ad slots are hidden above the calculator on mobile so they never push the result down.

### Named Rules
**The Result-in-View Rule.** On a phone the result title block must be visible in the first viewport: breadcrumb, H1, then the sheet with the result above the inputs.

**The Index-Not-Tiles Rule.** Collections of calculators or categories are ruled rows under a 1.5px frame line, never a grid of cards.

## Elevation & Depth

The system is flat. Sheets, fields, tables and indexes have no shadow; depth comes from the table/sheet contrast, the double frame and the 1px/1.5px line hierarchy. Shadows exist only on layers that float above the drawing, and they are tinted with night green.

### Shadow Vocabulary
- **Dropdown** (`box-shadow: 0 12px 28px -8px rgba(8,59,51,0.28)`): search result lists and the no-result panel.
- **Docked panel** (`box-shadow: 0 -12px 28px -10px rgba(8,59,51,0.3)`): the mobile search panel above the bottom nav.
- **Dialog** (`box-shadow: 0 16px 40px -12px rgba(8,59,51,0.35)`): cookie consent.
- **Floating control** (`box-shadow: 0 6px 16px -6px rgba(8,59,51,0.35)`): scroll-to-top.
- **Inset frame** (`box-shadow: inset 0 0 0 1px var(--green)` on focus, `inset 0 0 0 1.5px var(--frame)` on selection): a line, not elevation; thickens a field or option border without layout shift.

### Named Rules
**The Flat Sheet Rule.** Anything lying on the table is flat. Only transient floating layers (dropdowns, docked panels, dialogs, the scroll button) cast a shadow.

## Shapes

Square corners everywhere: sheets, fields, buttons, chips, panels, the logo frame. Lines carry the form: 1px hairlines for rows and cell dividers, 1.5px for the sheet frame, result box, list heads, header and bottom-nav rules. A sheet is an outer 1px outline (cut line) around a zone margin, then the 1.5px frame. Circles are the only curves and they come from drafting itself: the circled detail letter "A" on the formula zone, radio dots, and the centre mark in the logo and favicon (square frame, circle, four axis ticks). Empty and ad fields are filled with -45° section hatching (1px hair stroke every 7px).

### Named Rules
**The Square Corner Rule.** No rounded rectangles. A curve is allowed only when it is a full circle with drafting meaning (detail callout, radio, centre mark).

## Components

### Buttons
- **Shape:** square (0px), 44 to 48px tall.
- **Primary:** Bottle Green fill, white 600 text at 0.9 to 0.98rem, 20px side padding; hover to Deep Bottle Green over 150ms. One per view at most (404 return, cookie accept).
- **Ghost:** white with a hair-strong border and ink text; hover to an ink-3 border on the table colour (cookie reject).
- **Title-block action:** a cell in the title block, green caps text with an icon, hover green-tint ground and green-deep text ("Wyczyść").
- **Inverted-sheet CTA:** a full-height white cell with night-green 600 text and an arrow that nudges 4px right on hover.

### Chips (quick links)
- **Style:** white ground, hair-strong 1px border, ink 600 text at 0.88rem, 6px/10px padding, square.
- **State:** hover to frame border and green-tint ground. Preceded by a caps "Często liczone" label.

### Cards / Containers
- **Sheet** is the only container: paper, 1px hair outline, zone margin (20px top band, 8px sides on mobile, 20px from sm with A–C side marks), 1.5px frame inside. `inverted` swaps to night green with white/80 frame and white/60 zone marks.
- **Shadow Strategy:** none (see Elevation).
- **Internal Padding:** 16px on mobile, 24 to 32px on sm and above.

### Inputs / Fields
- **Style:** 48px tall, paper ground, 1px hair-strong border, square. Value in 600 at 1.125rem; placeholder 400 in ink-3. Units sit in a right-hand cell separated by a hairline, in green caps at 0.72rem. No spinner arrows.
- **Hover / Focus:** hover darkens the border to ink-3; focus turns it green and adds a 1px green inset, so the line reads 2px without shifting layout.
- **Dimension line:** every numeric field carries a dimension line 6px below it (end ticks, centre line, arrowheads) that redraws on each change.
- **Choice fields:** up to 4 short options become a segmented row, up to 5 a ruled radio list, longer a native select with a green chevron. Selected = green-tint ground, 600 ink text, 1.5px inset frame line; focus-visible = 2px green outline inset.
- **Error:** the result zone swaps to a red-bordered, red-tint box with a red caps "Sprawdź dane" label and ink message.
- **Search:** hero variant 56px with a 1.5px frame border and a green search icon; compact variant 40px with a hair-strong border. Same green focus inset.

### Navigation
- **Header:** 64px, paper, 1.5px frame rule below. Logo left, compact search from sm, caps nav cells from md separated by hairlines (ink-2, hover green-tint ground and green text).
- **Bottom nav (mobile):** fixed, 64px cells with 20px stroke icons over 0.7rem caps labels; active = green text, heavier stroke, and a 3px green bar on the top edge.
- **Breadcrumbs** lead every calculator page above the H1.

### Title Block and Result (signature)
The result zone (result wash) opens with a green caps "Wynik" label, then a bordered box (1.5px frame): the primary result lettered in the Result face, a dimension line under it or, for banded results (BMI), a scale bar with hatched bands, the active band filled green, a green triangular marker, and band names alternating on two levels. Secondary results sit in a two-column grid of paper cells separated by 1px hair-strong gaps. Before input, the box is a hatched field with a paper-knockout prompt.

### Parts List / Drawing Index (signature)
Ruled rows under a 1.5px frame line, each a link: drawing number in caps (ink-3), name in 600 ink with an optional ink-2 description, optional caps category, and a green arrow. Hover: green-tint ground, name and number turn green, arrow nudges 4px. Category rows use zone codes (A1, A2… C3) in place of numbers plus a caps count.

### Annotation Zone
The formula lives inside the sheet: a circled "A" detail callout and caps "Wzór" in green, one equation per line in 500 ink at 1.02rem, and the first example as "Przykład" caps plus input → **output**.

### Ad Slot
Hatched field, min 96px, 1px hair-strong border, caps label knocked out on the table colour. It reads as deliberately empty.

### Motion
State changes run at 150ms; arrow nudges and the FAQ plus-to-cross rotation at 200ms ease-out. Dimension lines draw from the centre outwards over 520ms on cubic-bezier(0.16, 1, 0.3, 1), and their arrowheads fade in over 180ms after 360ms. `prefers-reduced-motion` disables the drawing.

## Do's and Don'ts

### Do:
- **Do** put every calculator on a Sheet with zone marks and a title block (drawing number, category, calculation note, clear action).
- **Do** draw a dimension line under every numeric input and under a single-value result.
- **Do** letter all labels in 72%-width caps at 600, 0.07em, at least 0.7rem.
- **Do** mark selection with green-tint plus a 1.5px inset frame line, and focus with green (outline or 1px inset).
- **Do** keep the formula and first example inside the sheet's annotation zone.
- **Do** list calculators and categories as ruled index rows with drawing numbers or zone codes and a trailing green arrow.
- **Do** use -45° hatching for fields that are intentionally empty: ad slots, the pre-input result, inactive scale bands.
- **Do** use the inverted night-green sheet for the footer and the home trust band.

### Don't:
- **Don't** fill a selected option, tab or chip with solid green.
- **Don't** use red for anything except errors.
- **Don't** round corners; the only curves are circles with drafting meaning (detail callout, radio dot, centre mark).
- **Don't** build card grids or icon tiles for collections; use the index rows.
- **Don't** put a shadow on a sheet, field, table or list; shadows belong only to floating layers.
- **Don't** add a second typeface or a system display face.
- **Don't** set a caps line above a page or section heading as a kicker; caps lettering labels a field, zone, cell or list, not a headline.
- **Don't** let an ad slot or any other block sit between the H1 and the calculator sheet on mobile.
