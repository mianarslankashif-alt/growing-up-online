# Growing Up Online

**Live site:** https://growing-up-online.vercel.app

A history of the internet in the United States (2007–2026), told through four eras of personal and technological change: home broadband, the smartphone takeover, streaming & cloud, and the arrival of generative AI.

## What it is

Six static pages — a home page, four era pages, and a sources/citations page — sharing one stylesheet and one small rendering script. Every historical claim is sourced and linked from the Sources page.

## How it's built

- Plain HTML, CSS, and JavaScript — no framework, no build step
- Content for each era lives in its own JSON file (`data/`) and is rendered client-side with [Handlebars.js](https://handlebarsjs.com/) (vendored locally, no CDN dependency)
- A hand-written validator checks every JSON file's shape before rendering, and shows a visible error banner instead of a blank or broken page if something doesn't pass
- Original SVG illustrations for each era's hero image
- Headings and page structure exist in static HTML from page load (not injected by JavaScript), so the pages stay readable to crawlers and screen readers even before the data fetch resolves

## Testing

- Validated against the W3C Nu Html Checker — all six pages pass with zero errors or warnings
- Audited with axe-core for accessibility; findings and fixes are documented in `docs/testing-reports/`
- Full write-up of the research, planning, build, and testing process in `docs/05-final-report-source.md` (and as a formatted PDF in `docs/Final-Report.pdf`)

## Running locally

No build step — serve the folder with any static file server, e.g.:

```bash
npx serve .
```

(Opening `index.html` directly from disk won't work, since the JSON data is loaded via `fetch()`.)
