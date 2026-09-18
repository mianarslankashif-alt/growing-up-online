# Accessibility Report — AFTER fixes
Tool: axe-core 4.10.2, re-run in-browser on all six pages on 2026-09-05.

## Fix 1: `region` — resolved on all six pages
Added `aria-labelledby` to every `<section class="hero">`, pointing at that page's own `<h1>`
id (`page-heading` on the four era pages, `hero-heading` on `index.html` and `sources.html`).
The hero section is now a properly named landmark. Re-running axe on every page confirms zero
`region` violations after the fix.

## Finding 2: `color-contrast` — investigated and confirmed a false positive
axe reported insufficient contrast for header/footer text, but computed against a background
color (`#f4f6fb`) that does not appear anywhere in the header/footer CSS. Checking the actual
computed style directly confirmed the real, painted background is fully opaque:

```js
getComputedStyle(document.querySelector('.site-header')).backgroundColor
// => "rgb(11, 18, 32)"   (i.e. #0b1220, opacity 1, no blend mode, static position)
```

Manually calculating the WCAG contrast ratio (relative luminance formula from
WCAG 2.1 §1.4.3) for the actual foreground/background pairs used on the page gives:

| Text | Foreground | Background | Ratio | WCAG AA (4.5:1) needed for normal text |
|---|---|---|---|---|
| Site title | `#eef2ff` | `#0b1220` | **16.7:1** | Pass (also passes AAA, 7:1) |
| Nav links | `#aab4d4` | `#0b1220` | **9.08:1** | Pass (also passes AAA) |
| "Online" accent span | `#0ea5a5` | `#0b1220` | **6.19:1** | Pass |

All three comfortably clear the AA threshold, and two clear AAA. This is a false positive:
axe's automated pixel-sampling could not resolve the real ancestor background in this
particular preview/testing environment and fell back to the page body's color instead, rather
than a genuine contrast defect in the design. No code change was made for this finding — it is
documented here, with the manual calculation as evidence, per the module's testing
requirements, rather than "fixing" a colour scheme that already passes.

## Result after fixes
- `region`: 0 violations (was 1).
- `color-contrast`: 0 *genuine* violations; 1 automated-tool false positive investigated and
  documented above, with the underlying colours verified compliant by manual calculation.
