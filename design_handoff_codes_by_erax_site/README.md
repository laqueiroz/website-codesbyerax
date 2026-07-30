# Handoff: Codes by Erax — marketing site (Vínculo Tutoria)

## Overview
Public marketing site for **Codes by Erax**, a small software studio whose product is
**Vínculo Tutoria** — a Windows desktop program for teachers to organise classes, students,
tutoring conversations, attendance and follow-up history, with all data stored locally.

The site is bilingual (PT default / EN), dark "cosmic" themed, and covers 11 routes plus a
full-screen intro animation. It is a static marketing site: no backend, no auth. The only form
(feedback) is a client-side mock.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show the
intended look, motion and behaviour. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment**
(React, Next.js, Astro, Vue, etc.) using its established routing, i18n, component and styling
patterns. If no codebase exists yet, pick the framework that fits best — a static-site
generator (Next.js/Astro) suits this content well — and implement the designs there.

Notably, the prototype keeps all copy in one in-file dictionary and swaps screens with state.
In production this should become **real routes + real i18n files** (see *Routes* below).

## Fidelity
**High fidelity.** Colors, typography, spacing, layout, motion timings and all copy (PT + EN)
are final and should be reproduced faithfully. Where the prototype uses container queries
(`cqw`) for fluid type, the equivalent viewport-based or container-based technique in the target
stack is acceptable as long as the rendered sizes match at 1440 / 768 / 390 px.

---

## Routes

| Key | PT path | EN path | Screen |
|---|---|---|---|
| home | `/pt` | `/en` | Home |
| product | `/pt/vinculo-tutoria` | `/en/vinculo-tutoria` | Product page |
| blog | `/pt/blog` | `/en/blog` | Blog index |
| post | `/pt/blog/<slug>` | `/en/blog/<slug>` | Blog article |
| changelog | `/pt/changelog` | `/en/changelog` | Changelog |
| feedback | `/pt/feedback` | `/en/feedback` | Feedback form |
| status | `/pt/status` | `/en/status` | Status / support |
| privacy | `/pt/privacidade` | `/en/privacy` | Privacy policy |
| terms | `/pt/termos` | `/en/terms` | Terms of use |
| licenses | `/pt/licencas` | `/en/licenses` | Licenses / OSS |
| notfound | `/pt/404` | `/en/404` | 404 page |

Language switch keeps the current route and swaps the locale prefix.

---

## Global chrome

### Cosmic background (every page)
A full-bleed animated `<canvas>` starfield sits behind all content, plus a CSS radial gradient
base: `radial-gradient(90% 60% at 60% 0%, #150e2b 0%, #0a0718 45%, #08060f 100%)`.

The canvas renderer (see `sky()` in the prototype's `<helmet>` script) draws, back to front:

1. **Nebulae** — 6 soft radial clouds painted once to an offscreen canvas, then re-blitted each
   frame with a slow `0.9 ± 0.08` opacity breath (period ≈ 240 frames). Cloud centers/radii are
   normalised to canvas size; colors `rgb(124,58,200)`, `rgb(64,52,168)`, `rgb(36,132,150)`,
   `rgb(96,44,150)`, `rgb(52,60,170)`, `rgb(30,120,140)` at `.30 → .12 → 0` alpha stops.
   420 dark mottling blobs (`rgba(10,6,22, 0–.10)`) are stamped over them so they read as gas.
2. **Star dust** — `min(320, w*h/6500)` 0.25–1.35 px dots, `rgba(226,218,255, .15–.80)`,
   each with its own sine twinkle and a slow upward drift (`-0.006 … -0.036 px/frame`).
3. **Glow stars** — `min(26, w*h/40000)` larger stars (1.2–2.6 px) with a 7×-radius radial glow;
   40 % are cyan (`190,240,244`), the rest lilac-white (`226,214,255`); 55 % get a thin 4-point
   cross spike.
4. **Constellations** — 6 fixed normalised patterns (see `CONST` in the source) drawn with
   gradient strokes lilac → cyan → lilac (`rgba(168,140,238,.30)` / `rgba(127,227,232,.34)`,
   0.8 px), the whole figure breathing at `0.45 + sin(t/150 + phase)*0.35`. Each vertex is a
   1.5 px spiked star.
5. **Proximity links** — faint `rgba(160,132,224, ≤.07)` 0.5 px lines between nearby dust stars.
6. **Shooting star** — ~0.22 % chance per frame; a white gradient streak that decays over ~80
   frames.

The canvas auto-attaches to any `<canvas data-stars>` via a `ResizeObserver` + 1 s rescan, and
respects `prefers-reduced-motion` at the page level (all CSS animation is disabled; the canvas
loop can be skipped entirely in production).

### Site nav (sticky, all pages)
- Sticky top, `z-index: 30`, `background: rgba(6,5,13,.8)`, `backdrop-filter: blur(…)`,
  padding `15px clamp(18px,4cqw,44px)`.
- Left: circular logo mark + wordmark `CODES` / `BY ERAX` (mono, letterspaced).
- Center/right: nav links (Início/Home, Vínculo Tutoria, Blog, Sobre/About, Suporte/Support).
  Active item: color `#F3F0FA` with a `#7fe3e8` underline; inactive `rgba(237,234,246,.62)`.
- Right: PT/EN pill toggle, then a filled "Baixar/Download" pill button.
- Below 900 px container width the desktop nav (`[data-dt]`) is hidden and a mobile menu
  (`[data-mb]`) is shown.

### Footer
4 link columns (PRODUTO / CONTEÚDO / CODES BY ERAX / LEGAL) over a hairline
`rgba(255,255,255,.08)` divider, mono column headings, sans links.

---

## Screens

### 0. Intro animation (plays once, before Home)
Full-screen overlay, `position: fixed; inset: 0; z-index: 400`, background
`radial-gradient(70% 60% at 50% 42%, #1a1036 0%, #0b0719 46%, #050409 100%)`, with its own
starfield canvas at `opacity: .9`.

- **Logo**: `uploads/codes-logo.png`, `height: min(110vh, 147vw)`, width auto, centered,
  `overflow: hidden` on the wrapper — this crops the PNG's empty margin so the mark itself
  occupies ≈ 75 % of the viewport.
  The source PNG is dark-purple line art on **white**, so it is composited with
  `mix-blend-mode: screen` + `filter: invert(1) hue-rotate(180deg) saturate(1.25) brightness(1.3)
  drop-shadow(0 0 56px rgba(139,92,240,.55))` — invert kills the white ground, the 180° hue
  rotation restores the original purple. **In production, ship a transparent PNG/SVG instead**
  and drop the invert/blend hack.
- **Motion**: `markIn` 1.8 s `cubic-bezier(.2,.7,.2,1)` — logo rises 14 px, scales 0.82 → 1 and
  un-blurs from 14 px. Two `haloOut` rings (`min(78vw,78vh)` circles, 1 px
  `rgba(182,156,240,.45)` and `rgba(127,227,232,.3)`) expand 0.3 → 1.9 and fade, at 0.35 s and
  1.1 s delay, 3.4 s each.
- **Exit**: `introOut` 5.4 s — holds until 85 % then fades opacity 1 → 0 and hides.
  Logic clears the overlay from state at **5500 ms** (`setTimeout` in `componentDidMount`).
- Production note: gate this on a `sessionStorage` flag so returning visitors skip it, and skip
  it entirely under `prefers-reduced-motion`.

### 1. Home
Grid `1.05fr .95fr`, `gap: 40px`, `align-items: center`,
padding `clamp(44px,7cqw,92px) clamp(18px,4cqw,44px) clamp(52px,6cqw,84px)`.

**Left column** (`[data-rise]` entrance):
- Kicker — mono 13.2 px, `letter-spacing: .3em`, `rgba(127,227,232,.85)`:
  *"CODES BY ERAX · FERRAMENTAS COM PROPÓSITO"*.
- H1 — Cormorant Garamond 300, `clamp(50.4px, 10.08cqw, 124.8px)`, `line-height: 1.02`,
  `letter-spacing: -.022em`, `#F5F2FC`; second line in `<em>` at `#c3adf3`:
  *"Tecnologia criada a partir de / necessidades reais."*
- Lead — IBM Plex Sans 300, `clamp(19.2px, 1.98cqw, 25.2px)`, `line-height: 1.7`,
  `rgba(237,234,246,.62)`, `max-width: 600px`, `text-wrap: pretty`.
- Buttons — primary pill `linear-gradient(120deg,#8b5cf0,#6d3fd6)`, white text, min-height 48 px,
  padding `15px 26px`, `box-shadow: 0 14px 40px -18px rgba(139,92,240,.9)`, hover
  `filter: brightness(1.12)`; it carries a trailing mono chip `WIN · 1.4.0`.
  Secondary pill: 1 px `rgba(237,234,246,.2)` border, hover border `rgba(127,227,232,.55)`.
- Tag row — mono, `letter-spacing: .14em`, `rgba(237,234,246,.4)`:
  *USO LOCAL · SEM NUVEM · PRIVACIDADE POR PADRÃO*.

**Right column — the cat constellation** (`[data-orbit]`):
- Box: `width: 100%`, `aspect-ratio: 1.2`, `align-self: start`, `overflow: hidden`.
- Artwork `uploads/constellation-book.png` (a cat leaping over an open book, drawn as a
  constellation). Same white-ground problem as the logo: composited with `mix-blend-mode: screen`
  and `filter: invert(1) hue-rotate(258deg) saturate(1.45) brightness(1.4) drop-shadow(0 0 34px
  rgba(160,120,255,.4))` to land on the site's lilac.
- **Crop**: the drawing occupies only x `0.26–0.79`, y `0.13–0.79` of the PNG, so the image is
  scaled to `188.7%` of the box and offset `left: -49.1%; top: -19.8%` to make the artwork bleed
  to the box edges. Ship a pre-cropped, transparent asset and this math disappears.
- **Glow layer**: a second copy of the same image behind it — `opacity: .85`,
  `filter: … blur(11px) saturate(2.2) brightness(1.9)`, animation `auraBreathe` 9 s.
- **Aura**: an elliptical radial gradient behind everything —
  `radial-gradient(50% 50% at 50% 50%, rgba(139,92,240,.30), rgba(110,70,210,.14) 42%,
  rgba(127,227,232,.06) 66%, transparent 78%)`, `filter: blur(18px)`, `auraBreathe` 11 s.
- **Node stars**: 20 stars positioned at the constellation's joints (normalised coordinates in
  `CAT` in the logic class). Each is a radial-gradient dot (white core → `#f0e6ff` → `#c3adf3` →
  transparent), 8–18 px, `box-shadow: 0 0 14px rgba(195,173,243,.75)`, animated with
  `starPulse` — `opacity .18→1→.5`, `scale .55→1.35→.9` — duration `3.4 + (i%5)*1.1` s,
  delay `(i*0.37) % 3.1` s, so they blink out of phase.
- The whole group floats with `floaty` 14 s (±9 px vertical).

**Below the hero**: About block (`s21` grid, two paragraphs), a 3-up "how we work" principles
grid, a 3-post blog teaser, and a closing CTA band. All sections separated by
`1px rgba(255,255,255,.08)` rules with `clamp()` vertical rhythm.

### 2. Product — Vínculo Tutoria
- Hero: kicker `PRODUTO · VERSÃO 1.4.0 · WINDOWS`, H1, lead, download CTA; right side shows an
  app-window mockup (title bar, "DADOS ARMAZENADOS LOCALMENTE" chip, a records list, and an
  attendance bar chart labelled *EXEMPLO ILUSTRATIVO · SEM DADOS REAIS*).
- "Why it was built" two-column text block.
- Audience cards (3): Tutor teachers / Pedagogical coordination / Support staff.
- Feature grid: 10 numbered features (01–10), 2–4 columns responsive.
- Steps: 4 numbered onboarding steps.
- "Responsible use of information" — two-column: text + bulleted list of practices.
- Download band (`s21` grid): version, file info, SHA note, primary download button.

### 3. Blog index
Rows (`[data-doc]`, grid `170px 1fr 150px`, `gap: 26px`, `padding: 28px 0`, bottom hairline).
Left: category (mono, cyan) + date. Middle: title (Cormorant) + 1-line description
(`rgba(237,234,246,.55)`). Right: a pill "Ler/Read" button. Row hover tints the background.
Collapses to a single column under 1040 px.

### 4. Blog post
Centered measure. Kicker, H1, updated date, intro paragraph, then repeating sections of
`{heading, paragraph, optional bullet list}`. Bullets are 5 px dots at `margin-top: 9px`.
5 articles exist in both languages (slugs differ per locale).

### 5. Changelog
Reverse-chronological version entries: version + date + change bullets.

### 6. Feedback
Form (client-side only): name, email, type select, suggestion textarea, consent checkbox,
submit. Inputs: `padding: 13px 15px`, `border: 1px solid rgba(255,255,255,.14)`,
`border-radius: 8px`, `background: rgba(255,255,255,.03)`.
On submit the form is replaced by a success panel: cyan-bordered card
(`border: 1px solid rgba(127,227,232,.4)`, `background: rgba(127,227,232,.06)`) with a ✓ in a
44 px circle, a heading and a reset link.

### 7. Status / support, 8. Privacy, 9. Terms, 10. Licenses
Long-form legal/informational pages sharing the blog-post layout: kicker, H1, "Updated <date>",
intro, then `{heading, paragraph, list}` sections. Licenses additionally lists OSS dependencies.

### 11. 404
Centered short message with a link back home.

---

## Interactions & Behavior
- **Navigation** — `go(route, slug)` swaps route state and closes the mobile menu. In production
  these are real links/routes; keep the same paths.
- **Language** — PT/EN toggle swaps the entire copy dictionary and the URL prefix.
- **Entrance** — elements marked `[data-rise]` animate in with `riseIn`
  (0.7 s `cubic-bezier(.2,.7,.2,1)`, `translateY(22px)` + fade). In the site prototype this is
  driven by an `IntersectionObserver`; do the same.
- **Hover** — buttons brighten or shift their border to cyan; blog rows tint and nudge 3 px.
- **Focus** — `[data-focusable]:focus-visible` → `2px solid #7fe3e8`, `outline-offset: 3px`.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce) { * { animation: none;
  transition: none } }` is already global; also skip the intro and the canvas loop.
- **Responsive** — container queries on the page shell:
  - ≤ 1040 px: 3/4/5-column grids → 2 columns; `s21`/`s12`/hero/blog rows → 1 column.
  - ≤ 900 px: every grid → 1 column; desktop nav hidden, mobile nav shown; the cat
    constellation is hidden (`[data-orbit] { display: none }`); wide tables scroll horizontally.

## State Management
| State | Values | Notes |
|---|---|---|
| `lang` | `"pt"` \| `"en"` | Drives the whole copy dictionary + URL prefix |
| `route` | route key (see table) | → real router in production |
| `slug` | string \| null | Blog post identity |
| `menuOpen` | boolean | Mobile nav |
| `faq` | index | Open accordion item |
| `form` | `"idle"` \| `"sent"` | Feedback form result |
| `intro` | boolean | Intro overlay; cleared after 5500 ms |

No data fetching. All copy lives in a `PT` / `EN` dictionary object — move it to the target
stack's i18n layer (JSON/Markdown per locale) rather than porting the object verbatim.

## Design Tokens

**Color**
| Token | Value | Use |
|---|---|---|
| Ink / page | `#08060f` | Body background base |
| Deep field | `#0a0718`, `#050409` | Gradient stops |
| Nebula core | `#150e2b`, `#1a1036` | Gradient stops |
| Panel | `#040309` / `rgba(255,255,255,.016–.03)` | Cards, inputs |
| Text high | `#F5F2FC` / `#F3F0FA` / `#EDEAF6` | Headings, body |
| Text mid | `rgba(237,234,246,.62)` | Lead paragraphs |
| Text low | `rgba(237,234,246,.40–.55)` | Meta, mono labels |
| Accent lilac | `#8b5cf0` (primary), `#b69cf0`, `#c3adf3`, `#dcc9ff` | CTA, links, stars |
| Accent gradient | `linear-gradient(120deg,#8b5cf0,#6d3fd6)` | Primary button |
| Accent cyan | `#7fe3e8` / `rgba(127,227,232,.85)` | Kickers, focus ring, active underline |
| Hairline | `rgba(255,255,255,.08–.16)` | Dividers, borders |
| Lilac hairline | `rgba(182,156,240,.14–.24)` | Card borders |
| Selection | `rgba(139,92,240,.4)` | `::selection` |
| Link | `#c3adf3`, hover `#e2d6ff` | `a` |

**Type**
- Display: **Cormorant Garamond** 300/400, italic for emphasis lines.
- UI/body: **IBM Plex Sans** 300/400/500/600.
- Labels/meta: **IBM Plex Mono** 300/400/500, `letter-spacing .12–.3em`, usually uppercase.
- Scale (rendered): H1 `clamp(50.4, 10.08cqw, 124.8)px` / lh 1.02; section H2
  `clamp(33.6, 4.32cqw, 57.6)px`; card H3 ≈ 20–24 px; body `clamp(19.2, 1.98cqw, 25.2)px` /
  lh 1.7; small body ≈ 17.4 px / lh 1.65–1.72; mono labels 12.5–13.5 px.
  (Type was uniformly scaled ×1.2 from the first draft — these are the final sizes.)

**Spacing / shape**
- Section padding `clamp(44px, 5cqw, 76px)` vertical, `clamp(18px, 4cqw, 44px)` horizontal.
- Grid gaps 12 / 18 / 26 / 36 / 44 px.
- Radii: 8 px inputs, 10–14 px cards, 999 px pills, 50 % circles.
- Min touch target 44–48 px on all buttons.
- Shadows: `0 14px 40px -18px rgba(139,92,240,.9)` (primary button),
  `0 0 12–34px <accent>` glows on decorative dots.

**Motion**
| Keyframe | Purpose | Timing |
|---|---|---|
| `riseIn` | Section entrance | 0.7 s `cubic-bezier(.2,.7,.2,1)` |
| `floaty` | Constellation bob (±9 px) | 12–14 s ease-in-out |
| `twinkle` | Simple opacity blink | 5–7.5 s |
| `starPulse` | Constellation node stars | 3.4–7.8 s, staggered delays |
| `auraBreathe` | Nebula aura + glow copy | 9–11 s |
| `rotslow` / `rotrev` | Orbit rings (legacy) | 100–140 s linear |
| `markIn` | Intro logo | 1.8 s `cubic-bezier(.2,.7,.2,1)` |
| `haloOut` | Intro rings | 3.4 s ease-out, 0.35 s / 1.1 s delay |
| `introOut` | Intro overlay exit | 5.4 s, fade in last 15 % |

## Assets
| File | What it is | Notes for production |
|---|---|---|
| `assets/codes-logo.png` | Brand mark + wordmark (eye in a constellation halo) | **User-supplied.** Currently dark art on a **white** ground, composited with invert + `screen`. Re-export with transparency (ideally SVG) and remove the filter hack. |
| `assets/constellation-book.png` | Cat leaping over an open book, as a constellation | **User-supplied.** Same white-ground issue, plus ~47 % empty margin that the CSS crops. Re-export cropped + transparent. |

No icon library is used — the few glyphs (✓, ●) are text. Fonts come from Google Fonts
(Cormorant Garamond, IBM Plex Sans, IBM Plex Mono).

## Files
| File | Contents |
|---|---|
| `Codes by Erax - Mockups.dc.html` | **The current, authoritative design.** Full site, all 11 routes, both languages, the cosmic canvas, the cat constellation and the intro animation. |
| `Codes by Erax - Site.dc.html` | Earlier standalone version of the site (parallax + scroll-reveal experiments). Reference only. |
| `assets/codes-logo.png`, `assets/constellation-book.png` | Image assets used above. |

Both HTML files are self-contained apart from the two images and the Google Fonts link; open
them in a browser to see the live behaviour and timings.
