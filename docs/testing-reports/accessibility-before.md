# Accessibility Report — BEFORE fixes
Tool: axe-core 4.10.2 (https://github.com/dequelabs/axe-core), loaded temporarily via CDN and run
in-browser with `axe.run()` against the live local server, on 2026-09-05.

## Violations found (representative run: mobile-era.html; the same two rules appeared on every page)

### 1. `region` (moderate) — 1 node
"All page content should be contained by landmarks." The `<section class="hero">` element had
no accessible name (no `aria-label`/`aria-labelledby`), so screen reader users navigating by
landmark region got an unlabelled region instead of a meaningful one, and the hero content
technically sat outside any named landmark.

### 2. `color-contrast` (serious) — 8 nodes
Flagged: `.site-title`, `.site-title > span`, five `<nav>` links (Home, Broadband Era,
Streaming & Cloud, AI Era, Sources), and the "Sources" link inside the footer paragraph.
Reported as comparing the light text color (e.g. `#eef2ff`, `#aab4d4`) against a background
color of `#f4f6fb` — which is not a color used anywhere in the header or footer CSS (that value
is the page body's off-white background, `--color-surface-alt`). See "Investigation" below.
