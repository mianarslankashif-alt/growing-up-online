# Stage 1 — Background Research & Project Planning

**Project:** Growing Up Online — A History of the Internet in the United States (2007–2026)
**Chosen country:** United States
**Personal lifetime scope:** 2007 (birth year) to 2026 (present)

## 1. Why this scope

The brief asks for the history of the internet in a country of my choosing, during my own
lifetime. I chose the United States and framed the site around my own birth year, 2007 —
which happens to be the same year the first iPhone went on sale, making it a natural anchor
point for a "how the internet changed around me" narrative. The site covers four overlapping
eras rather than one continuous timeline, because the four eras are driven by different kinds
of change (infrastructure, hardware, software/business-model, and AI) and reads more clearly
as four focused stories than one long list.

## 2. Fact sheet & per-page content plan

| Page | Years | Core topic | Key facts (see `sources.html` for full citations) |
|---|---|---|---|
| `index.html` (Home) | 2007–2026 | Overview + quick-scan timeline | Framing narrative; a JSON-driven timeline strip pulling one highlight per era |
| `broadband-era.html` | 2006–2010 | Home broadband & Web 2.0 | Broadband crosses 42% of US adults (2006) → 68% (2010); Facebook opens to the public (2006); Twitter launches (2006); housing-crisis slowdown in net-adds (2007–2009); rural/urban broadband gap |
| `mobile-era.html` | 2007–2012 | The smartphone revolution | iPhone announced/released (2007); App Store opens (2008); first Android phone, the T-Mobile G1 (2008); nationwide 4G LTE rollout begins (2011); iPhone 5 adds 4G (2012) |
| `streaming-cloud.html` | 2006–2021 | Streaming, cloud & the pandemic | AWS launches, Netflix signs up (2006); Netflix "Watch Now" streaming launches (2007); data-center failure pushes Netflix to the cloud (2008); Netflix completes cloud migration (2016); COVID-19 sends US internet traffic up ~28% (2020) |
| `ai-era.html` | 2022–2026 | The generative AI era | ChatGPT released (Nov 2022); 100 million users in two months (Jan 2023); US usage grows ~882% in a year (2023); generative AI adoption outpaces the internet and PCs (2024) |
| `sources.html` | — | Bibliography | Full citation list grouped by page, plus image/code credits |

Every fact above was researched from a named, linked secondary source (Pew Research, NTIA,
S&P Global, Android Authority, History Cooperative, VdoCipher, Visual Capitalist, WhistleOut,
History.com, The Neuron, Originality.AI, CTO Magazine, Harvard Gazette — full list in
`sources.html`) and paraphrased in my own words rather than copied, to avoid plagiarism.

## 3. Media plan

All hero illustrations (`images/*-hero.svg`) are original flat-style SVG graphics drawn
specifically for this project (a router/Wi-Fi scene, a phone with signal bars, a cloud+laptop
scene, a chat-bubble scene, and a timeline scene for the homepage) — no third-party images are
used, so there are no image-licensing citations required beyond crediting them as
"original illustration created for this project" in each page's figure caption.

## 4. Technical plan

- **Structure:** 6 static HTML pages, sharing a common `css/style.css` and a small
  `js/render.js` module.
- **Data-driven content:** each era page's hero text and timeline of events is stored in its
  own JSON file under `data/` and rendered client-side with the **Handlebars.js** templating
  engine (vendored locally in `lib/handlebars.min.js` so the site works without a live CDN
  connection), fetched over HTTP from a local static server (as required, rather than opened
  directly as a `file://` page, since `fetch()` needs HTTP to load JSON).
- **JSON validation:** before any data reaches a template, `js/render.js` runs a hand-written
  validator (`validateEraData` / `validateTimelineData`) checking every required field and
  type. If validation fails, the page shows a plain-language error banner instead of letting
  broken data reach the template or crash the page.
- **Responsiveness:** mobile-first CSS with two breakpoints (600px, 900px), tested at mobile
  (375×812), tablet, and desktop widths (see Stage 2 wireframes and the Stage 4 testing
  reports).

## 5. Project management approach

Rather than a fixed calendar (this is a solo, single-repository project with no external
dependencies to coordinate), I planned the work as a **staged, gated pipeline**, matching the
five stages set out in the assignment brief — each stage's output is a prerequisite input for
the next, so work was sequenced rather than run in parallel:

1. **Research & planning** (this document) — establish facts, citations and a page-by-page
   content plan before any design work, so the wireframes have real content to be wireframes
   *of*, rather than lorem-ipsum placeholders.
2. **Wireframing** — low-fidelity desktop + mobile layouts for every page (see
   `docs/wireframes/`), reviewed for feedback before committing to final CSS.
3. **Build** — HTML/CSS/JS + JSON data, in dependency order: shared layout/CSS first, then
   the JSON schema and validator, then each page's Handlebars templates.
4. **Test** — W3C Nu Html Checker and axe-core accessibility testing, with before/after
   reports and fixes (see `docs/testing-reports/`).
5. **Report & submit** — write up the process against the six required report sections and
   package the code as a single zip.

This is essentially a **Kanban-style** approach (a single backlog of pages/features, moved
through Research → Design → Build → Test → Done one at a time) rather than a **Gantt/fixed-
schedule** approach, because the biggest risk on a solo project like this is not
mis-coordinating with other people, but under-planning the content before writing code —
so the priority was to gate each stage on the previous stage's output actually being finished
and reviewed, not on hitting a specific calendar date.

## 6. Risks identified at planning stage

- **Risk:** relying entirely on JavaScript to render page content could leave the page with
  no real heading/content if JavaScript fails or before it runs. **Mitigation:** keep the
  `<h1>` and primary heading structure in static HTML, and only render supporting content
  (paragraphs, event cards) via JSON + Handlebars — this was validated at Stage 4 (see
  `docs/testing-reports/html-validation-before.md` for the issue this exact risk caused, and
  `html-validation-after.md` for the fix).
- **Risk:** citing facts inaccurately. **Mitigation:** every fact was checked against a named,
  dated, linked source before being written into a JSON file, and the sources page lists them
  all for verification.
