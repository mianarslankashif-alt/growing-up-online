# Stage 2 — Wireframe Prototypes, Feedback & Iteration

## Wireframes produced

Low-fidelity wireframes (`docs/wireframes/*.svg`) were produced for both desktop and mobile
for every distinct layout on the site:

| Wireframe | Applies to | Desktop | Mobile |
|---|---|---|---|
| Home | `index.html` | `desktop-home.svg` | `mobile-home.svg` |
| Era page template | `broadband-era.html`, `mobile-era.html`, `streaming-cloud.html`, `ai-era.html` (identical layout, different JSON content) | `desktop-era-page.svg` | `mobile-era-page.svg` |
| Sources | `sources.html` | `desktop-sources.svg` | `mobile-sources.svg` |

The four era pages share one wireframe because they intentionally use the same template
(shared hero + timeline-of-events layout, populated from a different JSON file per page) —
wireframing the template once and reusing it across pages mirrors how the pages are actually
built in Stage 3.

Each wireframe shows: header/nav (and how it wraps on narrow screens), the hero region
(era label, heading, intro copy, illustration), the main content region (era cards on the
home page; event cards on era pages; grouped citation lists on the sources page), and the
footer — at both the desktop breakpoint (≥900px, matching `css/style.css`) and a 375px mobile
width, to show how the single-column mobile layout differs from the multi-column desktop one.

## Design decisions the wireframes were used to test

- Whether the home page's four "era" entry points read better as a 2×2/4-across card grid
  (chosen) versus a plain list — the card grid makes the site's overall structure scannable
  in one glance before a visitor commits to a specific era.
- Whether each era page needed its own distinct navigation, or could share one template —
  wireframing the era page once, and checking it against all four eras' actual content
  lengths (from the Stage 1 fact sheet), confirmed one flexible template was enough.
- How the header navigation should behave on narrow screens — the wireframes model it
  wrapping onto a second line rather than collapsing into a hamburger menu, since the site
  only has six nav items and wrapping keeps every link visible and reachable without an extra
  tap, which matters for the accessibility goals in Stage 4.

## Feedback from others — action required before submission

The assignment requires **evidence that these wireframes were shown to other people (fellow
students or anyone else available) and that the designs were updated based on their feedback.**
This is a step only you can complete authentically — I can produce the wireframes and act on
feedback once you have it, but I cannot show them to real people or fabricate their responses
on your behalf, since the coursework specifically asks you to demonstrate that this happened.

**To complete this stage:**
1. Share the six SVG files in `docs/wireframes/` (or open them in a browser — they're plain
   image files) with at least one other person.
2. Record their feedback below (or in a screenshot/email/message thread you can include as
   evidence), for example: what was confusing, what they'd change, what they liked.
3. Come back and ask me to update the wireframes and/or the live site based on what they said —
   I'll make the changes and update this log.

### Feedback log
*(fill in after showing the wireframes to someone — one entry per round of feedback)*

| Date | Reviewer | Feedback given | Change made in response |
|---|---|---|---|
| _(pending)_ | _(pending)_ | _(pending)_ | _(pending)_ |
