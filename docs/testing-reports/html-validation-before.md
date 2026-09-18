# HTML Validation Report — BEFORE fixes
Tool: W3C Nu Html Checker (https://validator.w3.org/nu/), run via `curl` against the checker's JSON API on 2026-09-05.

## index.html
No errors or warnings.

## broadband-era.html
- INFO: Section lacks heading. Consider using "h2"-"h6" elements... (line 29)
- INFO: This document has heading elements but none of them has a computed heading level of 1. (line 36)

## mobile-era.html
- INFO: Section lacks heading. (line 29)
- INFO: This document has heading elements but none of them has a computed heading level of 1. (line 36)

## streaming-cloud.html
- INFO: Section lacks heading. (line 29)
- INFO: This document has heading elements but none of them has a computed heading level of 1. (line 36)

## ai-era.html
- INFO: Section lacks heading. (line 29)
- INFO: This document has heading elements but none of them has a computed heading level of 1. (line 36)

## sources.html
- ERROR: The heading "h3" (with computed level 3) follows the heading "h1" (with computed level 1), skipping 1 heading level. (line 43)

## Root cause
The four era pages rendered their entire hero, including the page's only `<h1>`, through a
Handlebars template populated by JavaScript after a `fetch()` call resolves. The raw HTML the
validator (and a no-JS crawler) actually sees therefore had no heading at all inside
`<section class="hero">`, and no level-1 heading anywhere on the page. `sources.html` used
`<h3>` for its four bibliography group headings directly under the page's `<h1>`, skipping
heading level 2.
