# Handoff: Codes by Erax — Home ("Carta celeste")

## Overview
Marketing site homepage for **Codes by Erax**, a small studio building software, AI and education tools. The primary audience is teachers/educators; the primary conversion is downloading **Vínculo Tutoria**, a Windows desktop app for logging tutoring sessions.

The chosen art direction is **"Carta celeste" (celestial chart)**: a dark, quiet, sci-fi-observatory aesthetic where the product portfolio is presented as a constellation. Shipped products are lit stars; unreleased products are veiled in nebula. Language is Portuguese (pt-BR) with a PT/EN toggle stubbed in the nav.

Two directions were rejected in review (`1a Observatório`, `1b Console`). They survive only in the reference deck for context — **do not build them**.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show intended look, motion and behavior. They are **not production code to copy**.

The task is to **recreate these designs in the target codebase's existing environment**, using its established component patterns, styling approach and animation library. The stated target stack is **Next.js + TypeScript + Tailwind + Framer Motion**. If no codebase exists yet, scaffold a Next.js (App Router) + TS + Tailwind project and implement there.

Notably:
- The prototype uses **inline styles** for streaming-preview reasons. In production, use Tailwind utilities or the codebase's token system.
- The prototype's particle field is a hand-written `<canvas>` loop. Keep it as a canvas component (it is the cheapest way to do this) but wrap it properly with cleanup and `prefers-reduced-motion` support.
- The prototype's `[data-rise]` scroll-reveal and `[data-plx]` parallax should become Framer Motion (`whileInView`, `useScroll`/`useTransform`).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and motion timings are final and should be matched closely. All copy in the prototype is production-intent Portuguese and can ship as-is pending client review. Testimonials are explicitly placeholders (see below).

---

## Screens / Views

There is **one page** (`/`), composed of the sections below in source order. Max content width **1680px**, centered. Page background is a single fixed layer that all sections sit on top of (see *Global background*).

### 0. Intro overlay (`#intro`)
**Purpose:** Brand moment on first paint; establishes the observatory tone before the hero.

**Layout:** `position: fixed; inset: 0; z-index: 200`, flex column, centered. Background `radial-gradient(80% 70% at 50% 45%, #160f2c 0%, #0a0718 45%, #040309 100%)`. Cursor `pointer`.

**Components:**
- Emblem container: `width: min(46vw, 380px)`, `aspect-ratio: 1`, grid centered.
- Two concentric rings: `1px` border, `border-radius: 50%`; colors `rgba(182,156,240,.35)` and `rgba(127,227,232,.28)`.
- Logo mark `assets/logo-mark.png` at `74%` width, `filter: drop-shadow(0 0 60px rgba(150,110,245,.55))`.
- Wordmark caption: `CODES BY ERAX`, IBM Plex Mono 400 / 11px, color `rgba(237,234,246,.72)`.

**Animation sequence (total 2.5s, then 0.9s dissolve):**

| Element | Keyframes | Timing |
|---|---|---|
| Logo mark | `introMark`: scale .82→1 (opacity 0→1 by 45%) → 1.04 | `2.6s cubic-bezier(.2,.7,.2,1)` both |
| Ring 1 | `introRing`: scale .5→1.9, opacity 0→.7→0 | `2.6s` ease-out, delay `.3s` |
| Ring 2 | same | `2.6s`, delay `.8s` |
| Caption | `introWord`: opacity 0→1, letter-spacing `.7em`→`.34em` | `1.6s`, delay `.9s` |
| Overlay | `introOut`: opacity 1→0, visibility hidden | `.9s ease`, delay `2.5s` |

**Behavior:** `document.documentElement` gets `overflow: hidden` on load, cleared at 3300ms. A capture-phase click anywhere sets `data-skip` on the overlay, which shortens the dissolve to `.4s` with `0s` delay and immediately restores scroll. **In production: skip the whole intro when `prefers-reduced-motion: reduce`, and consider a `sessionStorage` flag so returning visitors don't sit through it again.**

---

### Global background (fixed, `z-index: 0`, `pointer-events: none`)
- Gradient: `radial-gradient(90% 70% at 70% 8%, #160f2c 0%, #0a0718 42%, #040309 100%)`.
- Full-viewport `<canvas>` starfield (see *Starfield spec*).

---

### 1. Navbar
**Layout:** `position: sticky; top: 0; z-index: 40`. Flex row, `space-between`, `gap: 24px`, padding `18px 40px`. Background `rgba(6,5,13,.72)` + `backdrop-filter: blur(14px)`. Bottom border `1px solid rgba(255,255,255,.06)`.

**Left:** logo mark 32px tall + wordmark `CODES / BY ERAX` — IBM Plex Mono 500 / 12.5px / letter-spacing `.22em`; `CODES` in `#EDEAF6`, ` / BY ERAX` in `rgba(237,234,246,.42)`.

**Right (gap 26px):** links `Produtos`, `Por que nós`, `Roadmap`, `Vínculo Tutoria`, `Suporte` — IBM Plex Sans 400 / 13.5px, `rgba(237,234,246,.66)`, hover `#fff`. Anchors: `#produtos`, `#porque`, `#roadmap`, `#app`, `#suporte`.

**Language toggle:** pill, `flex: none`, `border: 1px solid rgba(255,255,255,.14)`, `border-radius: 999px`, `overflow: hidden`, Mono 500 / 10.5px. Active `PT`: `background: rgba(237,234,246,.92)`, `color: #0a0910`, padding `7px 10px`. Inactive `EN`: `color: rgba(237,234,246,.5)`. **Non-functional stub** — wire to i18n routing (`next-intl` or App Router `[locale]`); only pt-BR copy exists today.

**CTA:** `Downloads` → `#download`. Pill, padding `11px 20px`, `background: rgba(237,234,246,.08)`, `border: 1px solid rgba(255,255,255,.15)`. Hover: `background: rgba(237,234,246,.16)`, `border-color: rgba(127,227,232,.5)`.

---

### 2. Hero (`#top`)
**Purpose:** State what the studio does; drive the download.

**Layout:** `min-height: 840px`, `display: grid`, `grid-template-columns: 1.02fr .98fr`, `gap: 40px`, `align-items: center`, padding `100px 46px 120px`, `overflow: hidden`.

**Nebula layer (child 1):** `position: absolute; inset: -60px`, `filter: blur(14px)`, mouse-parallax depth `22`:
```
radial-gradient(26% 32% at 20% 78%, rgba(30,72,180,.30), transparent 70%),
radial-gradient(28% 30% at 74% 22%, rgba(120,66,220,.28), transparent 70%)
```
Transition `transform .9s cubic-bezier(.2,.7,.2,1)`.

**Text column (child 2)** — enters `heroIn` (`1.2s cubic-bezier(.2,.7,.2,1)`, delay `2.5s`):
- Eyebrow: `CARTA DE PRODUTOS · 2026` — Mono 400 / 11.5px / ls `.32em`, `rgba(127,227,232,.78)`.
- H1: `Tecnologia` / `que <em>observa</em>` / `a sala de aula.` — Cormorant Garamond 300, `font-size: clamp(44px, 7.2vw, 92px)`, `line-height: 1`, `letter-spacing: -.022em`, color `#F5F2FC`. The `<em>` is italic `#c3adf3`.
- Body: max-width 520px, Plex Sans 300 / 18px / lh 1.78, `rgba(237,234,246,.6)`, `text-wrap: pretty`. Copy: *"Um estúdio pequeno construindo software de educação com padrão de produto grande. Aplicativos, ferramentas e inteligência artificial para quem ensina — cada um nascido de um problema real."*
- Primary CTA: pill, padding `16px 28px`, `background: #EDEAF6`, `color: #0a0910`, Plex Sans 500 / 14px. Label `Baixar Vínculo Tutoria` + Mono 11px `WIN · 24 MB` at `opacity: .55`. Hover: `#fff` + `box-shadow: 0 0 42px rgba(182,156,240,.45)`.
- Secondary: text link `Explorar a constelação` → `#produtos`, `border-bottom: 1px solid rgba(237,234,246,.24)`, `padding-bottom: 5px`. Hover: color and border `#7fe3e8`.
- Stat row (gap 34px, margin-top 64px): `1 APP PUBLICADO`, `3 EM CONSTRUÇÃO`, `100% DADOS LOCAIS` — Mono 400 / 11px / ls `.14em`, `rgba(237,234,246,.4)`.

**Constellation dial (child 3)** — enters `heroIn` (`1.3s`, delay `2.75s`), mouse-parallax depth `16`, transition `transform .8s cubic-bezier(.2,.7,.2,1)`. `aspect-ratio: 1`, `max-width: 660px`, `width: 100%`, justify-self center.
- Ring A: `inset: 0`, `1px solid rgba(182,156,240,.14)`, circle, static.
- Ring B: `inset: 13%`, `1px solid rgba(182,156,240,.1)`, `animation: rotslow 140s linear infinite`.
- Ring C: `inset: 28%`, `1px dashed rgba(127,227,232,.13)`, `animation: rotrev 100s linear infinite`.
- Logo mark centered, `width: 44%`, `drop-shadow(0 0 52px rgba(150,110,245,.5))`.
- Three labelled nodes (dot + Mono 10.5px / ls `.16em` label), each dot `animation: twinkle` at a different duration:

| Position | Label | Dot | Twinkle |
|---|---|---|---|
| `left 4% / top 13%` | `VÍNCULO TUTORIA` (`rgba(237,234,246,.62)`) | 8px `#EDEAF6`, glow `0 0 14px #b69cf0` | 4s |
| `right 0 / top 47%` | `PLANO DE AULA IA` (`rgba(237,234,246,.44)`) | 7px `#b69cf0`, glow `0 0 12px` | 5.5s |
| `left 10% / bottom 11%` | `CONSTELAÇÃO` (`rgba(237,234,246,.44)`) | 7px `#7fe3e8`, glow `0 0 12px` | 6.5s |

**Scroll hint (child 4)** — enters `heroIn` (`1s ease`, delay `3.2s`). Bottom-left `46px / 44px`: 52px rule `linear-gradient(90deg, rgba(237,234,246,.4), transparent)` + `ROLE PARA EXPLORAR`, Mono 9.5px / ls `.26em`, `rgba(237,234,246,.32)`.

---

### 3. Produtos (`#produtos`)
**Purpose:** The catalogue as a constellation — one shipped product, two veiled.

**Header:** `Produtos em destaque` — Cormorant 300, `clamp(32px, 4.2vw, 62px)`; right-aligned index `01 — CATÁLOGO`, Mono 11px / ls `.22em`, `rgba(237,234,246,.34)`.

**Constellation rail (height 44px, margin-top 38px):** a `1px` line at `top: 5px`, inset `8%` each side:
```
linear-gradient(90deg, transparent, rgba(127,227,232,.5) 12%, rgba(182,156,240,.4) 55%, rgba(255,255,255,.08))
```
Over it, a 3-column grid (`1.5fr 1fr 1fr`, gap 22px — matching the cards below) each centering an 11px node on `#050409`:

| Column | Ring | Core |
|---|---|---|
| 1 (shipped) | `1px solid #7fe3e8` | `inset: 3px`, `#7fe3e8`, glow `0 0 10px`, static |
| 2 | `1px solid rgba(182,156,240,.55)` | `inset: 3.5px`, `#b69cf0`, `twinkle 5s` |
| 3 | `1px solid rgba(255,255,255,.22)` | `inset: 4px`, `rgba(237,234,246,.5)`, `twinkle 7s` |

The rail is **hidden below 1180px** (cards stack; there's no horizontal constellation to draw).

**Card grid:** `grid-template-columns: 1.5fr 1fr 1fr`, `gap: 22px`.

**Card 1 — Vínculo Tutoria (featured, shipped):**
- Padding 36px, `border: 1px solid rgba(182,156,240,.22)`, `border-radius: 10px`, `background: linear-gradient(160deg, rgba(122,80,215,.15), rgba(255,255,255,.014))`, `overflow: hidden`.
- Sheen overlay: `radial-gradient(70% 60% at 92% 6%, rgba(127,227,232,.11), transparent 70%)`.
- Status row: `● DISPONÍVEL · v1.4.2` (Mono 10.5px / ls `.2em`, `#7fe3e8`; 6px dot with `blinkdot 2.6s`) and right `WINDOWS 10/11` (`rgba(237,234,246,.4)`).
- Title: `Vínculo Tutoria` — Cormorant 400 / 40px / lh 1.1, `#F3F0FA`.
- Body (max-width 520px, Plex Sans 300 / 15.5px / lh 1.68, `rgba(237,234,246,.6)`): *"Registro de atendimentos de tutoria para professores: sessões, evolução do aluno e relatórios prontos para a coordenação. Funciona offline, tudo salvo na sua máquina."*
- Tag pills (`Offline-first`, `Relatórios PDF`, `LGPD`): padding `6px 12px`, `1px solid rgba(255,255,255,.14)`, `border-radius: 999px`, Mono 11px, `rgba(237,234,246,.6)`.
- Buttons: `Download` (solid `#EDEAF6` / `#0a0910`, pill, `13px 22px`) → `#download`; `Ver a página do app` (outline `rgba(237,234,246,.2)`, hover border `rgba(127,227,232,.55)` + `#fff`) → `#app`.
- Card hover: `border-color: rgba(127,227,232,.45)`, `transform: translateY(-4px)`, transition `border-color .4s, transform .4s`.

**Cards 2 & 3 — unreleased (`data-soon`):** padding 32px, `1px solid rgba(255,255,255,.08)`, radius 10px, `background: rgba(255,255,255,.014)`, `overflow: hidden`, flex column. Hover: `border-color: rgba(182,156,240,.34)`, `translateY(-4px)`.

Each has two stacked overlays:
1. **Nebula veil** (`data-nebula`) — `inset: -30%`, `filter: blur(22px)`, `pointer-events: none`, transition `opacity .5s ease`. Resting opacity `.62` (card 2) / `.55` (card 3); on card hover it *clears* to `.35`.
   - Card 2: `radial-gradient(42% 38% at 32% 28%, rgba(120,66,220,.55), transparent 70%)`, `radial-gradient(40% 34% at 70% 62%, rgba(30,72,180,.45), transparent 72%)`, `radial-gradient(50% 44% at 52% 48%, rgba(10,7,24,.7), transparent 76%)`.
   - Card 3: `radial-gradient(40% 36% at 66% 30%, rgba(30,72,180,.5), transparent 70%)`, `radial-gradient(44% 38% at 30% 66%, rgba(120,66,220,.42), transparent 72%)`, same dark core.
2. **"Em breve" label** (`data-soon-label`) — `inset: 0`, `z-index: 2`, flex column centered, `gap: 12px`, `background: rgba(6,5,13,.5)`, `backdrop-filter: blur(3px)`, `pointer-events: none`, `opacity: 0` → `1` on card hover, transition `opacity .45s cubic-bezier(.2,.7,.2,1)`. Contents: 9px `#7fe3e8` dot with `0 0 16px` glow; `EM BREVE` Mono 13px / ls `.36em` `#EDEAF6`; `Entrar na lista de espera` Plex Sans 300 / 12.5px `rgba(237,234,246,.6)`.

Card content (below the veils):
| | Card 2 | Card 3 |
|---|---|---|
| Status | `EM DESENVOLVIMENTO` | `PESQUISA` |
| Title | `Plano de Aula IA` | `Constelação` |
| Body | *"Rascunho de plano alinhado à BNCC em minutos, com o professor sempre no controle da revisão final."* | *"Mapa visual de progresso da turma: cada aluno uma estrela, cada vínculo uma linha luminosa."* |
| Footer | `PREVISTO` / `2026 Q4` | `EXPLORATÓRIO` / `SEM DATA` |

Status label: Mono 10.5px / ls `.2em`, `rgba(182,156,240,.88)`. Title: Cormorant 400 / 28px / lh 1.16, `#EDEAF6`. Body: Plex Sans 300 / 14.5px / lh 1.66, `rgba(237,234,246,.55)`. Footer: Mono 11px, `rgba(237,234,246,.35)`, pinned with `margin-top: auto; padding-top: 28px`, `justify-content: space-between`.

> **To build:** the "Entrar na lista de espera" affordance is currently decorative (the label has `pointer-events: none`). Make the card focusable and clickable, opening a waitlist modal or form. Touch devices have no hover — reveal the label on tap/focus, or show it permanently below `760px`.

---

### 4. Por que nós (`#porque`)
Header `Por que a Codes by Erax` + index `02 — PRINCÍPIOS`.

4-column grid, `border-top: 1px solid rgba(255,255,255,.1)`, margin-top 52px. Each cell: padding `34px 30px` (first has `padding-left: 0`, last `padding-right: 0`), `border-right: 1px solid rgba(255,255,255,.07)` except the last.

Cell anatomy: index (Mono 11px, `rgba(127,227,232,.85)`) → title (Cormorant 400 / 26px / lh 1.22, `#EDEAF6`) → body (Plex Sans 300 / 14.5px / lh 1.68, `rgba(237,234,246,.55)`).

| # | Title | Body |
|---|---|---|
| 01 | Feito por quem dá aula | Cada tela nasceu de uma rotina real de tutoria, não de um briefing genérico. |
| 02 | Seus dados ficam com você | Armazenamento local, sem conta obrigatória, alinhado à LGPD. |
| 03 | IA como assistente | A IA sugere, o professor decide. Nunca o contrário. |
| 04 | Atualizações abertas | Changelog público, versões documentadas, nada de mudança silenciosa. |

---

### 5. Stack strip
Single row, `grid-template-columns: auto 1fr`, `gap: 56px`, padding `40px 0`, hairline rules top and bottom (`rgba(255,255,255,.07)`).

Left: `03 — CONSTRUÍDO COM` (Mono 11px / ls `.22em`, `rgba(237,234,246,.34)`). Right: wrapping flex, `gap: 14px 34px`, Mono 400 / 14px, `rgba(237,234,246,.55)` — `TypeScript`, `React`, `Next.js`, `.NET / WinUI`, `SQLite`, `Tailwind`, `Framer Motion`, `Python`.

---

### 6. Roadmap (`#roadmap`)
Header `Roadmap público` + index `04 — LINHA DO TEMPO`.

Horizontal timeline: a `1px` rule at `top: 8px` spanning full width —
`linear-gradient(90deg, rgba(127,227,232,.5), rgba(182,156,240,.35), rgba(255,255,255,.06))` — with a 4-column grid (gap 28px) of milestones over it.

Each milestone: 17px node (circle, `1px` border, `background: #050409`, inner core `inset: 5px`) → status (Mono 11px / ls `.16em`) → title (Cormorant 400 / 26px / lh 1.22) → body (Plex Sans 300 / 14.5px / lh 1.66).

| Node border | Core | Status | Title | Body |
|---|---|---|---|---|
| `#7fe3e8` | `#7fe3e8` | `ENTREGUE · 2026 Q2` (`#7fe3e8`) | Vínculo Tutoria 1.4 (`#EDEAF6`) | Relatórios em PDF e backup local automático. (`.52` alpha) |
| `rgba(182,156,240,.8)` | `#b69cf0`, `blinkdot 2.8s` | `EM CURSO · 2026 Q3` (`#b69cf0`) | Microsoft Store (`#EDEAF6`) | Distribuição oficial e atualização automática. (`.52`) |
| `rgba(255,255,255,.2)` | — | `PREVISTO · 2026 Q4` (`.4` alpha) | Plano de Aula IA (`.86`) | Beta fechada com professores parceiros. (`.45`) |
| `rgba(255,255,255,.14)` | — | `EXPLORATÓRIO` (`.3`) | Constelação (`.72`) | Visualização de progresso por turma. (`.4`) |

Note the deliberate progression: as items get more speculative, both node and text opacity fall.

---

### 7. Vínculo Tutoria feature block (`#app`)
**Purpose:** Prove the product is real, then convert. This is the section that has to make a teacher comfortable downloading a `.exe`.

**Layout:** margin-top 120px, padding `96px 46px`, hairline rules top and bottom. Inner grid `1fr 1.06fr`, `gap: 56px`, `align-items: center`. Nebula layer: `inset: -40px`, `radial-gradient(30% 40% at 78% 30%, rgba(120,66,220,.22), transparent 70%)`, `blur(14px)`, mouse-parallax depth `14`.

**Left column:**
- Eyebrow: `● APLICATIVO EM DESTAQUE · WINDOWS` — Mono 11px / ls `.26em`, `rgba(127,227,232,.8)`, 6px `#7fe3e8` dot with `blinkdot 2.6s`.
- H2: `Toda tutoria registrada.` / `Nenhuma perdida.` — Cormorant 300, `clamp(32px, 4.2vw, 62px)`, lh 1.06, ls `-.015em`.
- Body (max-width 520px, Plex Sans 300 / 17px / lh 1.76): *"O **Vínculo Tutoria** transforma o caderno de anotações do professor em histórico organizado, com relatórios que a coordenação entende de primeira."* (`<strong>` = weight 500, `#EDEAF6`.)
- Numbered feature list, `display: grid; gap: 16px`, each row `grid-template-columns: auto 1fr; gap: 16px; align-items: baseline`. Index Mono 11px `#7fe3e8`; text Plex Sans 300 / 15.5px / lh 1.6 `rgba(237,234,246,.72)`:
  1. Sessões de tutoria com objetivo, evolução e próximos passos
  2. Relatório por aluno ou por turma, exportável em PDF
  3. Backup local automático — sem nuvem, sem conta
- Buttons: `Baixar para Windows` — pill, `15px 26px`, `background: linear-gradient(120deg, #8b5cf0, #6d3fd6)`, `#fff`, Plex Sans 500 / 13.5px, `box-shadow: 0 12px 42px -16px rgba(139,92,240,.9)`, hover `filter: brightness(1.12)`. `Ver demonstração` — outline `rgba(255,255,255,.16)`, hover border `rgba(127,227,232,.55)`.

**Right column — app window mock.** Glow: `inset: -24px`, `radial-gradient(60% 60% at 60% 16%, rgba(139,92,240,.24), transparent 70%)`, `blur(14px)`. Frame: `1px solid rgba(255,255,255,.12)`, radius 10px, `background: rgba(11,9,20,.86)`, `backdrop-filter: blur(10px)`, `box-shadow: 0 44px 100px -44px #000`, `overflow: hidden`.
- **Title bar:** padding `13px 16px`, bottom border `rgba(255,255,255,.08)`, `background: rgba(255,255,255,.028)`. Three 10px squares (radius 3px) at `.28/.18/.18` alpha, then `Vínculo Tutoria — 3º ano B` (Mono 11.5px, `rgba(237,234,246,.5)`).
- **Body:** grid `174px 1fr`, `min-height: 430px`.
  - **Sidebar** (right border `rgba(255,255,255,.07)`, padding `18px 13px`, gap 5px): items `Atendimentos` (active — `background: rgba(139,92,240,.18)`, radius 5px, weight 500), `Alunos`, `Turmas`, `Relatórios`, `Configurações` (`rgba(237,234,246,.55)`), each `10px 12px` / 12.5px. Pinned bottom: dashed badge, `1px dashed rgba(127,227,232,.28)`, radius 6px, Mono 10px, `rgba(127,227,232,.72)`, text `SINCRONIA / LOCAL OK`.
  - **Main** (padding 20px): header row `Julho · 18 atendimentos` (13.5px) + `+ NOVO` chip (`1px solid rgba(255,255,255,.14)`, radius 4px, Mono 10.5px).
  - Three session rows, `grid-template-columns: 1fr auto`, gap 12px, padding `13px 14px`, radius 6px. First is "current": `border: 1px solid rgba(255,255,255,.1)` + `background: rgba(255,255,255,.024)`; others `rgba(255,255,255,.075)` border, no fill.

    | Student | Detail | Status | Date |
    |---|---|---|---|
    | Ana Beatriz M. | Reforço · Frações equivalentes | `EVOLUIU` (`rgba(127,227,232,.85)`) | 22 JUL |
    | Caio Ferreira | Leitura · Interpretação de texto | `EM CURSO` (`rgba(182,156,240,.9)`) | 21 JUL |
    | Helena Duarte | Matemática · Tabuada | `AGENDADO` (`rgba(237,234,246,.5)`) | 29 JUL |

    Name: Plex Sans 500 / 13px. Detail: 300 / 12px, `rgba(237,234,246,.5)` (row 1) / `.45`. Status & date: Mono 10.5px; dates `rgba(237,234,246,.35)`.
  - **Progress panel:** margin-top 18px, padding 16px, `1px solid rgba(255,255,255,.08)`, radius 6px, `background: rgba(255,255,255,.018)`. Header row `PROGRESSO DA TURMA` / `68%` (Mono 10.5px, `rgba(237,234,246,.45)`). Bar chart: flex, `align-items: flex-end`, `gap: 6px`, `height: 72px`; bars at 34/52/44/70/62/88%, radius `2px 2px 0 0`. Bars 1–5 `linear-gradient(180deg, rgba(139,92,240,.85), rgba(139,92,240,.25))`; the last (current month) is `linear-gradient(180deg, #7fe3e8, rgba(127,227,232,.2))`.

> **To build:** this mock stands in for real screenshots. Replace with actual app captures when available (`next/image`, lazy, with `sizes`). Keep the frame chrome so the shot reads as a Windows app.

---

### 8. Depoimentos (`#suporte`)
Header `Quem já usa` + index `05 — DEPOIMENTOS`. Three-column grid, gap 22px.

Each `<blockquote>`: padding 34px, `1px solid rgba(255,255,255,.08)`, radius 10px, `background: rgba(255,255,255,.014)`. Quote: Cormorant 300 / 22px / lh 1.62, `rgba(237,234,246,.86)`. Footer: Mono 10.5px / lh 1.6 / ls `.14em`, `rgba(237,234,246,.42)`, two lines — first line literally `DEPOIMENTO PENDENTE`, second the role (`PROFESSORA · ENSINO FUNDAMENTAL`, `COORDENAÇÃO PEDAGÓGICA`, `TUTOR · REDE PRIVADA`).

> **All three quotes are placeholders.** They are written in the intended voice but are **not real customer statements**. Do not ship them attributed. Either collect real testimonials first or hide the section until content exists — the layout is built to be populated later.

---

### 9. Download CTA (`#download`)
Margin `120px 46px 0`, padding `110px 46px`, `border: 1px solid rgba(182,156,240,.2)`, `border-radius: 16px`, `background: linear-gradient(160deg, rgba(122,80,215,.16), rgba(255,255,255,.012))`, `overflow: hidden`, `text-align: center`. Nebula: `inset: -40px`, `radial-gradient(30% 40% at 50% 30%, rgba(120,66,220,.26), transparent 70%)`, `blur(16px)`, mouse-parallax depth `18`.

- Logo mark, 96px, `drop-shadow(0 0 34px rgba(146,104,240,.5))`, `animation: floaty 9s ease-in-out infinite` (±10px on Y).
- H2 (max-width 840px): `Comece pelo primeiro ponto da constelação.` — Cormorant 300, `clamp(32px, 4.2vw, 62px)`, lh 1.08.
- Body (max-width 560px, 300 / 17px / lh 1.74, `.6` alpha): *"Gratuito para professores. Sem conta, sem nuvem, sem letra miúda."*
- Buttons: `Download direto` + Mono 11px `v1.4.2 · 24 MB` (solid `#EDEAF6`, pill `16px 30px`, hover `#fff` + `0 0 42px rgba(182,156,240,.45)`); `Microsoft Store` (outline `rgba(237,234,246,.22)`, hover border `rgba(127,227,232,.55)`).
- Fine print: `WINDOWS 10 / 11 · 64 BITS · CHECKSUM SHA-256 DISPONÍVEL` — Mono 10.5px / ls `.16em`, `rgba(237,234,246,.34)`.

> **To build:** both CTAs are `href="#download"` placeholders. Wire to the real installer URL and Store listing; surface the SHA-256 (the copy promises it).

---

### 10. Footer
Margin-top 120px, padding `70px 46px 44px`, top hairline `rgba(255,255,255,.07)`.

Grid `1.4fr 1fr 1fr 1fr`, gap 44px:
- **Brand column:** wordmark `assets/logo-word.png` 34px tall, `opacity: .9`. Blurb (max-width 320px, 300 / 14px / lh 1.7, `.5` alpha): *"Software, inteligência artificial e educação. Feito com atenção em cada detalhe."* Status line: 7px `#7fe3e8` dot with `0 0 10px` glow + `TODOS OS SERVIÇOS OPERACIONAIS` (Mono 10.5px / ls `.14em`, `.42` alpha).
- **Link columns** — heading Mono 10.5px / ls `.2em`, `rgba(237,234,246,.35)`; links Plex Sans 300 / 14px, `rgba(237,234,246,.66)`, hover `#fff`, gap 12px:
  - `PRODUTOS`: Vínculo Tutoria, Futuros aplicativos, Downloads, Changelog
  - `EMPRESA`: Sobre, Blog / Novidades, Suporte, Contato
  - `LEGAL`: Privacidade (LGPD), Termos de uso, Licenças, Status
- **Bottom bar:** margin-top 52px, padding-top 24px, hairline `rgba(255,255,255,.06)`, `space-between`, Mono 10.5px / ls `.14em`, `rgba(237,234,246,.3)`. Left `© 2026 CODES BY ERAX`. Right (at `opacity: .55`): three twinkling dots (5px `#EDEAF6` @5s, 4px `#b69cf0` @7s, 5px `#7fe3e8` @6s) + `O GATO ESTÁ OBSERVANDO`.

> The cat easter egg is currently text-only. The brand has a constellation-outline cat mascot; the intent is rare, strategic appearances — a natural home is a 404 page, an empty state, or a subtle hover reveal here. Never cute or childlike.

> All footer link columns except Produtos/Empresa anchors point to `#` — these are the 14 planned routes (Sobre, Blog, Suporte, Downloads, Documentação, Contato, Privacidade, Termos, Licenças, Changelog, Status, Futuros aplicativos). Only the homepage is designed so far.

---

## Interactions & Behavior

### Starfield spec (`<canvas data-stars data-link="1">`)
One fixed full-viewport canvas. DPR-aware (`min(2, devicePixelRatio)`), re-sized via `ResizeObserver`, redrawn in a `requestAnimationFrame` loop.

- **Count:** `min(340, round(width * height / 9000))` (`data-dens` overrides the divisor).
- **Per particle:** random position; radius `0.25–1.55px`; phase `a` 0–6; phase speed `s` `.002–.009`; `vy` `-.012` to `-.062` (upward drift); `vx` `±.015`.
- **Base render:** `alpha = .26 + |sin(a)| * .62`, fill `rgba(226,218,255, alpha)`.
- **Occasional flare:** 12% of particles get `fl: true` and a hue (30% `#7fe3e8`, else 50/50 `#c3adf3` / `#EDEAF6`). Their brightness is `pow((sin(a * .42) + 1) / 2, 7)` — the power-7 curve keeps them dim most of the cycle and spikes briefly. When `g > .02`: draw in the particle's hue with `shadowBlur = 16g`, radius `r + 1.5g`, `globalAlpha = min(1, alpha + g)`.
- **Constellation links:** every 3rd particle pairs with every 3rd subsequent one; if squared distance `< 11000`, stroke a `0.6px` line at `rgba(160,132,224, .11 * (1 - d/11000))`.
- **Wrap:** particles re-enter from the opposite edge with a 4px margin.

### Motion inventory

| Name | What | Timing |
|---|---|---|
`rotslow` / `rotrev` | ring rotation ±360° | 100–140s linear infinite |
`twinkle` | opacity .25 → 1 → .25 | 4–7s ease-in-out infinite |
`blinkdot` | opacity .2 → 1 → .2 | 2.6–2.8s ease-in-out infinite |
`floaty` | translateY 0 → -10px → 0 | 9s ease-in-out infinite |
`riseIn` | opacity 0 + translateY 26px → none | .9s cubic-bezier(.2,.7,.2,1) |
`heroIn` | opacity 0 + translateY 30px → none | 1–1.3s, staggered 2.5/2.75/3.2s |
intro set | see *Intro overlay* | 2.5s + .9s out |

### Scroll reveal
`[data-rise]` starts at `opacity: 0`; an `IntersectionObserver` (`threshold: .14`) adds `.in` and unobserves. One-shot — elements never re-hide. → Framer Motion `whileInView={{ once: true, amount: 0.14 }}`.

### Scroll parallax
`[data-plx]` elements get `translate3d(0, -center * speed, 0)` where `center` is the element's viewport-center offset and `speed` defaults to `.06`. Recomputed inside `requestAnimationFrame` on a passive scroll listener. → `useScroll` + `useTransform`.

### Mouse parallax
`[data-par="<depth>"]` inside a `[data-par-scope]` host: on `mousemove`, `translate3d(-(nx) * depth, -(ny) * depth, 0)` where `nx`/`ny` are normalized `-0.5…0.5` offsets within the host. `mouseleave` returns to origin. Depths in use: hero nebula 22, hero dial 16, app nebula 14, CTA nebula 18. All have a `.8–.9s cubic-bezier(.2,.7,.2,1)` transition so motion lags the cursor.

### Hover states summary
- Nav links / footer links: color → `#fff`.
- Solid buttons: `#EDEAF6` → `#fff`, plus a violet bloom shadow on hero/CTA.
- Gradient button: `brightness(1.12)`.
- Outline buttons: border → `rgba(127,227,232,.55)`, text → `#fff`.
- Cards: border brightens + `translateY(-4px)`.
- Unreleased cards: nebula clears `.62/.55 → .35` while the "EM BREVE" panel fades in.

### Responsive behavior
Mobile-first is the requirement; the prototype is desktop-down with two breakpoints. Implement as Tailwind `sm/md/lg` from the small end.

**≤1180px (tablet):** nav wraps (`row-gap: 12px`, link gap 18px); hero → single column, `min-height` auto, padding `72px … 96px`, dial capped at 520px with 56px top margin; app block → single column, gap 44px; products → 2 columns and the constellation rail is hidden; principles + footer → 2 columns with cell borders/padding removed; roadmap → 2 columns, `row-gap: 44px`, timeline rule hidden; testimonials → 1 column.

**≤760px (mobile):** nav padding `14px 20px`, secondary links hidden (leaves logo, language toggle, Downloads — **replace with a proper hamburger/drawer in production**); all sections gutter to 20px; CTA `margin: 84px 20px 0`, padding `72px 24px`; every grid → 1 column with `row-gap: 32px`; stack strip stacks; app-window body → 1 column with the sidebar hidden.

Display type is fluid: `h1` = `clamp(44px, 7.2vw, 92px)`, section `h2` = `clamp(32px, 4.2vw, 62px)`.

---

## State Management
The page is essentially static. State needed:

| State | Type | Trigger / notes |
|---|---|---|
`introDone` | boolean | Timer (2.5s) or click-to-skip. Locks `<html>` scroll while false; force `true` under `prefers-reduced-motion` and (recommended) for repeat visits via `sessionStorage`. |
`locale` | `'pt' \| 'en'` | Nav toggle. Route-based i18n preferred over client state. Only pt-BR strings exist. |
`revealed` per section | boolean | IntersectionObserver / `whileInView`, one-shot. |
`hoveredProduct` | id \| null | CSS-only today. Needs JS if you add tap-to-reveal for touch. |
`waitlistOpen` + `{email, status, error}` | modal form | Not built. Belongs to the "Entrar na lista de espera" affordance. |

No data fetching in this design. Product/roadmap/testimonial content is hardcoded and should move to a content source (MDX, CMS, or typed constants) since the roadmap and version numbers will change often. Suggested shapes: `Product { id, name, status: 'shipped'|'building'|'research', version?, platform?, blurb, tags[], eta?, links{} }` and `Milestone { status: 'done'|'active'|'planned'|'exploratory', period, title, blurb }`.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
`space-black` | `#040309` | Page base |
`space-black-2` | `#05040A` / `#050409` | Section base, node fill |
`ink-800` | `#06050D` | Nav scrim base (@ .72 alpha) |
`nebula-deep` | `#0A0718` | Gradient mid |
`nebula` | `#160F2C` | Gradient top |
`violet-500` | `#8B5CF0` | Gradient button start |
`violet-600` | `#6D3FD6` | Gradient button end |
`violet-core` | `#7842DC` → `rgba(120,66,220,…)` | Nebula washes |
`violet-300` | `#B69CF0` | Active nodes, secondary accent |
`violet-200` | `#C3ADF3` | Italic emphasis, links |
`blue-cosmic` | `#1E48B4` → `rgba(30,72,180,…)` | Cool nebula wash |
`cyan-400` | `#7FE3E8` | Status, detail accents, current-state |
`white-soft` | `#EDEAF6` | Primary text, solid buttons |
`white-hi` | `#F3F0FA` / `#F5F2FC` | Headings |

Text alpha ladder on `#EDEAF6`: `.86` quote · `.72` list · `.66` nav/footer link · `.6` body · `.55` muted body · `.5` sidebar · `.45`/`.42` meta · `.4`/`.35` fine meta · `.34`/`.32`/`.3` micro-label.

Hairlines: `rgba(255,255,255,.06)` (nav) · `.07` (section rules) · `.08` (cards) · `.1` (grid tops) · `.12`/`.14` (window frame, chips) · violet `rgba(182,156,240,.2–.22)` on emphasis cards.

Surface fills: `rgba(255,255,255,.012)` → `.014` → `.018` → `.024` → `.028`.

### Typography
- **Display:** Cormorant Garamond — 300 (heroes/H2), 400 (card + milestone titles), italic 300/400 for emphasis. Tight tracking on the H1 (`-.022em`).
- **Body:** IBM Plex Sans — 300 body, 400 UI, 500 emphasis/buttons.
- **Technical:** IBM Plex Mono — 400/500, wide tracking (`.14em`–`.36em`), always uppercase. Used for every status, version, index and micro-label.

Scale: 92/62 display (fluid) · 52 section · 40 featured card · 28/26 card · 22 quote · 18/17 lead · 15.5/14.5 body · 13.5/13/12.5 UI · 11.5–9.5 mono labels.

### Spacing
Section rhythm 110–120px vertical; gutters 46px desktop / 20px mobile. Card padding 32–36px; grid gaps 22px (cards), 28px (roadmap), 44px (footer), 56px (two-column blocks).

### Radii
`2px` (window squares) · `4px`/`5px`/`6px` (chips, rows, panels) · `10px` (cards, window) · `16px` (CTA panel) · `999px` (pills) · `50%` (nodes, rings).

### Shadows & glows
- Window: `0 44px 100px -44px #000`
- Gradient button: `0 12px 42px -16px rgba(139,92,240,.9)`
- Solid button hover bloom: `0 0 42px rgba(182,156,240,.45)`
- Logo mark: `drop-shadow(0 0 34–60px rgba(146,104,240,.45–.55))`
- Star glow: `0 0 10–16px` in the dot's own hue
- Nebula blur: `blur(14–22px)`

---

## Assets
| File | Notes |
|---|---|
`assets/logo-mark.png` | Emblem only, cropped from the user-supplied logo and tone-lifted for dark backgrounds. Used in intro, nav, hero dial, CTA. |
`assets/logo-word.png` | Wordmark only, same treatment. Used in the footer. |
`assets/logo-full.png` | Full lockup (mark + wordmark), tone-lifted. Not currently placed — available for OG images, favicons, print. |

All three derive from the single PNG the client provided (`uploads/logo_dark-*.png`), brightened per channel for legibility on `#040309`. **Ask the client for vector (SVG/AI) originals before production** — the PNGs will not hold up at large sizes or on the intro emblem at high DPR. Also needed: favicon set, OG/Twitter card images, real app screenshots, and the constellation-cat mascot artwork.

Fonts come from Google Fonts (`Cormorant Garamond` 300/400/500 + italic, `IBM Plex Sans` 300–600, `IBM Plex Mono` 300–500). Use `next/font` and self-host to hit the Lighthouse target.

---

## Non-functional requirements (from the brief)
- Lighthouse > 95, SEO optimized, **WCAG AA**.
- Lazy-load images, optimize assets, no unnecessary JS.
- **Accessibility notes for this design specifically:** the low-alpha micro-labels (`.3`–`.35` on near-black) fall below AA — raise to at least `.55` alpha or bump their size/weight. Everything hover-only (the "EM BREVE" panel, all card affordances) needs keyboard focus parity. Honour `prefers-reduced-motion`: skip the intro, freeze the starfield to a static frame, drop parallax, and keep only opacity fades. The starfield canvas must be `aria-hidden` and never intercept pointer events.
- Semantic landmarks are already in the prototype (`nav`, `header`, `section`, `article`, `blockquote`, `footer`) — keep them, and give each section an accessible name.

---

## Files
| Path | What it is |
|---|---|
`Codes by Erax - Site.dc.html` | **The design to build.** Full homepage, Carta celeste direction, including intro, starfield, constellation rail, nebula veils and responsive rules. |
`assets/*.png` | Logo derivatives described above. |
`reference/Codes by Erax - Deck.dc.html` | 13-slide review deck presenting all three explored directions (1a Observatório, 1b Console, 1c Carta celeste) plus palette/type system and the decision rationale. Context only — 1c was chosen. |
`reference/deck-stage.js`, `support.js` | Runtimes for the prototype/deck files. **Not part of the design** — do not port. |

Open the HTML files directly in a browser to see the live design, including all animation timing.
