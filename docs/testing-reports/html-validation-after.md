# HTML Validation Report — AFTER fixes
Tool: W3C Nu Html Checker (https://validator.w3.org/nu/), run via `curl` against the checker's JSON API on 2026-09-05, after the fixes below.

## Result: all six pages pass with no errors or warnings
- index.html — No errors or warnings.
- broadband-era.html — No errors or warnings.
- mobile-era.html — No errors or warnings.
- streaming-cloud.html — No errors or warnings.
- ai-era.html — No errors or warnings.
- sources.html — No errors or warnings.

## Fixes applied
1. **Era pages (broadband-era.html, mobile-era.html, streaming-cloud.html, ai-era.html):**
   moved the page's `<h1>` and era-label pill out of the Handlebars template and into the
   static HTML markup (with placeholder text), so a real level-1 heading exists inside
   `<section class="hero">` immediately, before any JavaScript or fetch has run.
   `js/render.js`'s `renderEraPage()` now sets the heading and era-label text directly via
   `textContent` once the JSON has loaded and validated, and only the intro paragraphs and
   hero image are still rendered through the Handlebars template.
2. **sources.html:** changed the four bibliography group headings from `<h3>` to `<h2>`,
   since they sit directly under the page's single `<h1>` with no intervening level-2
   heading — removing the skipped heading level.
