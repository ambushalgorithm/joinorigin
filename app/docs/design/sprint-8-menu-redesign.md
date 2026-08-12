# Sprint 8 — Menu Screen Redesign Spec

> **Parent:** [`../README.md`](../README.md) — design docs index
> **Copy input:** [`sprint-8-origin-copy.md`](./sprint-8-origin-copy.md) (TASK-244 — the approved Sprint 8 copy-change-log; consumed verbatim where this spec quotes copy)
> **Consumer:** `fe-menu-redesign` (TASK-247) — implement this spec
> **Verifier:** `e2e-origin-validation` (TASK-248)
> **Producer:** `design-menu-redesign` (TASK-245) · **Date:** 2026-08-12 · **Branch:** `feat/design-menu-redesign`

---

## 1. Purpose

This document is the **build-ready visual redesign specification** for all seven
Sprint 4 menu pages — `/features`, `/community`, `/docs`, `/about`, `/contact`,
`/privacy`, `/terms` — plus the styled 404 boundary (`not-found.tsx`).

The current menu pages are functional but visually flat: a single dark column
of text and bordered cards with no imagery, no color life, and no join
momentum. This redesign makes every menu page feel like a crafted surface of
the same brand as the home page — **dark canvas, brand blue accent gradient,
Urbanist display type, glow, motion, and a strong join CTA on every page** —
while preserving every hard-won constraint:

- **SEO/LLM contract:** exactly one `<h1>` per page, semantic sections, real
  `<table>` for the /features comparison, visible FAQ blocks, server-wrapper
  metadata + JSON-LD unchanged (`page.tsx` files are NOT touched).
- **Copy contract:** page leads, concepts, FAQ answers, and section copy come
  from the Sprint 8 copy-change-log (§2/§4 of `sprint-8-origin-copy.md`) —
  verbatim, applied by `fe-origin-copy` (TASK-246). This spec **moves and
  restyles** copy, it never rewrites it. Where a page has no new lead in the
  log, this spec reuses the page's existing body copy verbatim.
- **Asset contract:** every image is authored **locally** under
  `apps/web/public/assets/**` — zero external CDN references at runtime.
- **Design-language contract:** keep the shared language (dark `#0F1115` base,
  `#4F7DF9 → #8AB4FF` gradient, Urbanist/Inter fonts, gradient-border buttons,
  `@joinorigin/design` tokens) and layer enticing color, imagery, and motion on
  top — never replace it.

---

## 2. Design Foundations (inherited + layered)

### 2.1 Inherited tokens (do NOT re-theme)

All values read from the shared `@joinorigin/design` theme via
`styled-components` `ThemeProvider` (already provided by `MenuPageShell`).
No raw hex literals outside the `landingTokens`/`menuTokens` modules.

| Token | Value | Use |
|---|---|---|
| `colors.background` | `#0F1115` | Page canvas (unchanged) |
| `colors.surface` | `#181B21` | Cards, panels, form fields |
| `colors.surfaceElevated` | `#22262E` | Hover/raised surfaces, table header |
| `colors.border` | `#2C313A` | Hairlines, card borders, table rules |
| `colors.primary` | `#4F7DF9` | CTAs, accent text, links, focus rings |
| `colors.primaryContrast` | `#FFFFFF` | CTA labels |
| `colors.text` | `#F5F7FA` | Primary copy |
| `colors.textMuted` | `#9AA3B2` | Secondary copy, leads, captions |
| `colors.success` | `#30A46C` | Form success states |
| `colors.destructive` | `#E5484D` | Form error states |
| `colors.warning` | `#F5A524` | Warm accent (community page glows only) |

Typography (unchanged): body/UI **Inter**, display/headings **Urbanist**
(locally hosted under `/fonts/`). Display scale on menu pages: hero title
`displayLg` 52px desktop → `display` 36px tablet → `heading` 28px mobile
(see §9 breakpoints).

Brand accent gradient (single source: `ACCENT_GRADIENT` in
`apps/web/components/landingTokens.ts`):

```text
linear-gradient(135deg, #4F7DF9 0%, #8AB4FF 100%)
```

### 2.2 New accent system — page glow palette (layered on top)

Each menu page gets a **hero glow** and a **scene accent** — subtle radial
color behind the hero and inside the scene art. Primary blue stays dominant
(the brand); the per-page accent is a restrained tint for wayfinding, never a
competing UI color. Define once in a new web-local module
`apps/web/components/menuTokens.ts` (mirrors `landingTokens.ts`).

| Page | Glow (radial, behind hero) | Scene accent (inside SVG) |
|---|---|---|
| `/features` | `radial-gradient(560px at 78% 20%, rgba(79,125,249,0.22), transparent 70%)` | `#4F7DF9 → #8AB4FF` |
| `/community` | `radial-gradient(560px at 78% 20%, rgba(245,165,36,0.14), transparent 70%)` + second `rgba(79,125,249,0.12)` | `#F5A524` nodes + blue links |
| `/docs` | `radial-gradient(560px at 78% 20%, rgba(138,180,255,0.16), transparent 70%)` | `#8AB4FF` light-blue |
| `/about` | `radial-gradient(560px at 78% 20%, rgba(79,125,249,0.20), transparent 70%)` | `#4F7DF9 → #8AB4FF` |
| `/contact` | `radial-gradient(560px at 78% 20%, rgba(79,125,249,0.18), transparent 70%)` | `#8AB4FF` |
| `/privacy` | `radial-gradient(560px at 78% 20%, rgba(48,164,108,0.12), transparent 70%)` | `#30A46C` accent shield |
| `/terms` | `radial-gradient(560px at 78% 20%, rgba(138,180,255,0.10), transparent 70%)` | `#8AB4FF` muted |
| 404 | `radial-gradient(480px at 50% 35%, rgba(79,125,249,0.16), transparent 70%)` | `#4F7DF9` |

**Glow application rule:** the glow lives in `MenuHero` behind the scene
image (`::before` on the scene wrapper, `pointer-events: none`), so it never
blocks content and never requires a real image.

### 2.3 Shared entrance / scroll motion tokens

| Token | Value |
|---|---|
| Easing (reuse `ENTRANCE_EASING`) | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Hero fade-up | `opacity 0→1, translateY(24px→0)`, 0.8s |
| Hero scene scale-in | `opacity 0→1, scale(0.92→1)`, 1s |
| Scroll reveal | `opacity 0→1, translateY(20px→0)`, 0.6s |
| Card stagger step | 80ms between siblings |
| CTA band | fade-up + border glow, 0.7s |

**Motion rules (inherited from Sprint 3 §7):**
- Progressive enhancement — content is NEVER hidden by CSS alone; entrance
  states apply only after client mount (`useEntrance`) or after the element
  enters the viewport (`useInView`, new).
- `@media (prefers-reduced-motion: reduce)` disables all animation; final
  states render immediately.
- Motion is added to **new wrapper components** (`MenuHero`, `Reveal`,
  `CtaBand`); existing text/semantics are untouched.

---

## 3. MenuPageShell — Extended Component Structure

### 3.1 Current contract (keep)

`apps/web/components/MenuPageShell.tsx` already provides: both
`ThemeProvider`s (DOM + styled-components/native), `WaitlistModalProvider`
(any-button waitlist modal), sticky `Header`, single `<main>`, slim `Footer`,
and global styles (`@property --border-angle`, body bg/font, reduced-motion
kill-switch). It renders children inside `<main>`. **Keep all of this.**

### 3.2 New contract (extend, don't break)

`MenuPageShell` gains two optional props; when absent, behavior is identical
to today (backwards compatible):

```tsx
export interface MenuHeroProps {
  /** Small uppercase brand tag above the H1, e.g. "Core objects". */
  eyebrow?: string;
  /** Exact page H1 (UNCHANGED strings — see §6 copy table). Rendered as <h1>. */
  title: string;
  /** Lead paragraph (verbatim page-lead copy from the copy-change-log). */
  lead?: React.ReactNode;
  /** Local SVG scene path, e.g. '/assets/menu/scenes/features-scene.svg'. */
  scene?: string;
  /** Accessible name for the decorative scene (usually empty string — decorative). */
  sceneAlt?: string;
  /** Page accent key from menuTokens (glow color). */
  accent?: PageAccentKey;
}

export interface MenuPageShellProps {
  children: React.ReactNode;
  /** Renders the hero band as the FIRST child of <main> (exactly one h1). */
  hero?: MenuHeroProps;
  /** Renders the join CTA band as the LAST child of <main>. Default true. */
  showCtaBand?: boolean;
  /** Optional headline/subline override for the CTA band (privacy/terms may tighten). */
  ctaOverride?: { headline?: string; subline?: string; ctaLabel?: string };
}
```

Rendered structure (single `<main>` landmark preserved):

```text
<NativeThemeProvider> <DomThemeProvider> <WaitlistModalProvider>
  <PageRoot>
    <Screen>
      <Header />
      <main>
        {hero ? <MenuHero {...hero} /> : null}
        {children}                    ← pages render their <PageContainer> sections here
        {showCtaBand ? <CtaBand {...ctaOverride} /> : null}
      </main>
      <Footer />
    </Screen>
  </PageRoot>
  <GlobalStyles />
</WaitlistModalProvider> </DomThemeProvider> </NativeThemeProvider>
```

**Critical H1 rule:** when a page passes `hero`, its current
`<PageHeader><PageTitle/></PageHeader>` block **moves into `MenuHero`** —
the view must NOT render a second `<h1>` (e2e asserts exactly one per page).
`MenuHero` renders the `<h1>` with the **existing `PageTitle` visual style**
but adapted to the two-column hero layout (§4.1).

### 3.3 New files (FE creates)

```text
apps/web/components/
  menuTokens.ts            # menu glow palette + hero/CTA gradient helpers (§2.2)
  MenuHero.tsx             # two-column hero: eyebrow + h1 + lead + scene (§4.1)
  CtaBand.tsx              # join CTA band before footer (§4.2)
  Reveal.tsx               # IntersectionObserver scroll-reveal wrapper (§4.3)
  motion.ts                # EXTEND: add useInView() hook + reveal keyframes (§4.3)
  menuPagePrimitives.ts    # EXTEND: Card hover lift/glow, Eyebrow, HeroScene (§5)
```

---

## 4. Shared Layout Components

### 4.1 `MenuHero` — hero band

| Aspect | Spec |
|---|---|
| Layout | Full-width band, `max-width: 1280px` centered, padding `72px 64px 32px` (mobile `48px 20px 24px`). Two columns on desktop (`grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr)`), stack below `1024px`. |
| Column 1 | `Eyebrow` chip (Inter 500 12px, letter-spacing 0.14em, uppercase, `colors.primary`) · `<h1>` (Urbanist 600 `displayLg` 52px, line-height 1.1, letter-spacing -0.5px, `colors.text`) · `PageLead` (Inter 400 18px, line-height 1.7, `colors.textMuted`, max-width 640px). Lead copy = §6 copy table (verbatim). |
| Column 2 | `HeroScene`: `next/image` (or inline `<img>` for SVG, see §10.3) width 560 height 420, `object-fit: contain`, `alt=""` + `aria-hidden="true"`, wrapped in a `.scene-wrap` whose `::before` is the page glow (§2.2). Scene sits vertically centered, right-aligned. |
| Entrance | Column 1 fade-up (`useEntrance`, 0.8s, `EASE`); column 2 scale-in (0.92→1, 1s). Reduced-motion → no animation, both visible. |
| Semantics | Exactly one `<h1>`; `header` element NOT used for the hero band (the sticky `Header` is the only `header` landmark — e2e asserts `header` first-match is the top nav). Use a `div`/`section`. |

Mobile behavior: scene shrinks to `max-width: 320px`, centered, placed
**below** the title/lead; glow stays behind it.

### 4.2 `CtaBand` — join CTA (every menu page)

| Aspect | Spec |
|---|---|
| Layout | Full-width band above Footer, inside `<main>`. `max-width: 880px` centered, padding `16px 24px` internal, margin `0 auto 64px`. |
| Panel | Gradient-border panel using the same mask technique as `RotatingBorderButton`: 1px `ACCENT_GRADIENT` border, `border-radius: lg`, background `rgba(24,27,33,0.9)` with `backdrop-filter: blur(8px)`; inner padding `40px 32px`, text centered. |
| Content | `Headline` (Urbanist 600 `heading` 28px, `colors.text`): **default `Find your people. Build together.`** · `Subline` (Inter 400 16px, `colors.textMuted`, max-width 480px centered): **default `Join 2,400+ builders on Origin's social collaboration network and be first in when early access opens.`** (copy-change-log route descriptions already use the 2,400+ builder line — safe, no new messaging) · `RotatingBorderButton` label **`Join the waitlist`** (default size, fillDirection `left`) wired to `useWaitlist().openWaitlist` (already provided by the shell). |
| Privacy/terms override | `ctaOverride` may tighten the headline to **`Questions about Origin?`** + subline `Our team replies within 2 business days.` and CTA label **`Contact us`** → link to `/contact` (keep the band but make it relevant; do NOT open the modal). |
| Entrance | Reveal fade-up 0.7s when scrolled into view (§4.3). |

### 4.3 `Reveal` + `useInView` — scroll animation

| Aspect | Spec |
|---|---|
| `useInView` (extend `motion.ts`) | Hook returning `{ ref, inView }`. Uses `IntersectionObserver` (threshold 0.15, `rootMargin: 0px 0px -40px`); fires once (`disconnect()` after first true). SSR-safe: returns `inView=false` on server, `true` on client mount if already intersecting. Falls back to `true` when `IntersectionObserver` is unavailable (progressive enhancement). |
| `Reveal` component | Wrapper `<div>` accepting `delay?: string` (default `0s`) and `as?: keyof JSX.IntrinsicElements` (default `div`, allows `section`). Applies `opacity: 0; transform: translateY(20px)` ONLY when `inView === false` (i.e., after mount and not yet visible); once `inView`, transitions to visible with `0.6s EASE` + delay. Reduced-motion → always visible. |
| Usage | Pages wrap each `<Section>` in `<Reveal>`; card grids get per-card `delay` staggered at 80ms steps (`i * 0.08s`), so a 4-card row reveals `0s / 0.08s / 0.16s / 0.24s`. |
| A11y | Reveal is purely visual; content remains in the DOM and readable by AT regardless of visibility. No `aria-hidden` toggling. |

---

## 5. Extended `menuPagePrimitives` (visual upgrades)

Add to `apps/web/components/menuPagePrimitives.ts` without breaking existing
exports (all current names stay — existing unit tests reference them):

| New/updated export | Spec |
|---|---|
| `Eyebrow` (new) | `span` — Inter 500 12px, uppercase, `letter-spacing: 0.14em`, `colors.primary`, margin-bottom `sm`. |
| `HeroScene` (new) | `div.scene-wrap` — `position: relative`, glow `::before` from `menuTokens`, `pointer-events: none`; inner `img`/`Image` sized per §4.1. |
| `Card` (updated hover) | Add hover/focus-visible state: `transform: translateY(-4px)`, `border-color: rgba(79,125,249,0.55)`, `box-shadow: 0 12px 32px rgba(15,17,21,0.6), 0 0 0 1px rgba(79,125,249,0.18)`, `transition: transform 0.25s EASE, border-color 0.25s, box-shadow 0.25s`. Keep `background: surface`, `border: 1px solid border`, `radius: lg`. Hover states are non-semantic (no content change). |
| `CardGrid` (unchanged) | Keep `repeat(auto-fill, minmax(280px, 1fr))`, gap `lg`. |
| `SectionTitle` (unchanged) | Keep Urbanist 600 `heading` 28px, `colors.text`. Optionally prepend a small 3px × 20px gradient tick (`.section-tick` `::before`) for wayfinding — same gradient, subtle. |
| `StatValue` (unchanged) | Keep gradient text for the `2,400+` stat. |
| `Quote` (updated) | Add `::before` accent bar already present (border-left primary); add subtle surface border all around (`border: 1px solid border`) for a framed look. |
| `AccentLink` (unchanged) | Keep gradient-primary inline links. |

---

## 6. Copy Table (verbatim, consumed from the copy-change-log)

H1s are **unchanged** (copy-change-log §3: H1s on menu pages NOT in scope).
Leads/sections below are the **exact strings the copy-change-log specifies**
for `fe-origin-copy` (TASK-246). The redesign renders these strings in the
new layout — it does not rewrite them. If a page's copy-change-log entry is
not yet applied at implementation time, FE keeps whatever current source says
and applies the visual redesign only (copy ownership = TASK-246).

| Page | H1 (unchanged, e2e-asserted) | Eyebrow | Lead (verbatim) | Sections (existing, restyled) |
|---|---|---|---|---|
| `/features` | `Everything a community needs, in one calm workspace` | `Core objects` | `Origin is a social collaboration network built around eight core objects: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.` (copy-log §4.6 row 1) | Core objects grid (8 cards: Profiles, Ideas, Communities, Communication, Feed, Projects, Companies, Opportunities — copy-log §4.6 rows 2–4) · `Why Origin instead of five tools` (§4.6 row 5) + comparison table · Roadmap phases (cards) · FAQ (§2.6 FEATURES_FAQ) |
| `/community` | `Where people find each other` | `The network` | `Origin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.` (copy-log §4.8 row 1) | How we run the network (4 value cards) · Example communities (chips: Startup Founders, Small Businesses, Book Clubs, Community Organizations, Run Clubs, Pee-wee Leagues, Anyone with an Idea — copy-log §4.8 row 2) · Join the network (2,400+ stat) · FAQ (5 entries incl. new Q5 — copy-log §4.9 row 5) |
| `/docs` | `JoinOrigin docs` | `Documentation` | `Origin is the product: a social collaboration network and community OS. JoinOrigin is the brand and the network behind it. These docs explain the core objects, the roadmap, and the architecture.` (copy-log §4.10 row 1) | Concepts (8 entries incl. new Ideas — copy-log §4.10 rows 2–4) · Roadmap (cards, Phase 5 body copy-log §4.10 row 7) · Architecture & standards (copy-log §4.10 rows 5–6) · FAQ (§2.9 DOCS_FAQ incl. Matrix persistence + NOT self-hostable) |
| `/about` | `The most valuable asset is your network` | `Our mission` | `Origin is a social collaboration network built on one belief: the most valuable asset on the internet is not content or software — it is the network of people and the relationships they form.` (copy-log §4.13 row 1) | Our mission (copy-log §4.13 row 2) · Guiding principles (4 cards; Open Architecture body copy-log §4.13 row 3) · Founder guidance quote · Deeper reading · FAQ (copy-log §4.13 rows 4–5) |
| `/contact` | `Talk to us` | `Contact` | `Have a question about Origin — the social collaboration network — early access, or starting a community? We'd love to hear from you.` (copy-log §4.15 row 1) | Send a message (restyled form) · Other ways to reach us · FAQ (existing) |
| `/privacy` | `Privacy Policy` | `Legal` | Reuse existing first body paragraph verbatim: `When you join the waitlist we collect your name and email address through the waitlist form (POST /api/leads). That is the only personal information we ask for during early access.` | What we collect · How we use it · **Identity & flexibility** (copy-log §4.16 new section) · Your rights · Contact |
| `/terms` | `Terms of Service` | `Legal` | Reuse existing first body paragraph verbatim: `By using JoinOrigin (the "Service"), you agree to these Terms of Service. If you do not agree, please do not use the Service.` | Acceptance · Accounts · User content · Acceptable use · Intellectual property · Disclaimers · Changes · Contact |

---

## 7. Per-Page Asset Manifest (author locally, zero CDN)

All scene SVGs are authored by `fe-menu-redesign` under
`apps/web/public/assets/menu/scenes/` (create the directory). Each scene is a
**hand-authored, dark-theme SVG illustration** in the JoinOrigin visual
language: thin `#2C313A`/`#4F7DF9` strokes, `#4F7DF9 → #8AB4FF` gradient
fills, soft radial glows, node-and-link "social graph" motifs consistent with
`OrbitViz` and `joinorigin-mark.svg`. Scenes are **decorative** (`alt=""`).

**Shared authoring rules for all scenes:**
- `viewBox="0 0 560 420"`, transparent background (no rect fill — sits on the
  dark page).
- Use at most 4 hues: `#4F7DF9`, `#8AB4FF`, `#2C313A` (lines), `#9AA3B2`
  (muted nodes); the community scene may add `#F5A524` accents; privacy adds
  `#30A46C`.
- Include a soft radial glow `circle` behind the focal motif (fill = page
  accent at ~0.10–0.16 opacity).
- Do NOT embed raster images, external fonts, or remote URLs. Keep file
  weights < 30 KB.

| Asset file (browser path) | Content spec |
|---|---|
| `/assets/menu/scenes/features-scene.svg` | Hub-and-spoke: one glowing center node with 8 satellite nodes (Core Objects) connected by thin links; satellites carry small icons (resume, lightbulb, house, chat, feed, box, building, sparkle) drawn as simple strokes. |
| `/assets/menu/scenes/community-scene.svg` | 4 cluster groups of avatar-like circles (fill `#181B21` + `#8AB4FF` ring) linked by lines; 2–3 nodes per cluster; `#F5A524` node in one cluster. |
| `/assets/menu/scenes/docs-scene.svg` | Stacked document layers (3 rounded rects, gradient outline) + a horizontal "Matrix" node line below with small encrypted-lock glyph. |
| `/assets/menu/scenes/about-scene.svg` | Large social graph forming a subtle heart shape: center node + many small nodes on two arcs, links between them, blue gradient glow. |
| `/assets/menu/scenes/contact-scene.svg` | Two/three rounded chat bubbles with dot glyphs, linked by a node line; one gradient-filled bubble. |
| `/assets/menu/scenes/privacy-scene.svg` | Shield outline (gradient stroke) with 3 small data nodes inside; `#30A46C` accent on the shield core. |
| `/assets/menu/scenes/terms-scene.svg` | Balanced document/scroll outline with 5 horizontal rule lines, muted blue gradient. |
| `/assets/menu/scenes/not-found-scene.svg` | One large glowing node with a dashed "missing link" arc to a small faint node; subtle broken-link motif. |

No other new assets are required. Existing assets reused as-is:
`/assets/logo/joinorigin-mark.svg` (Header/Footer/404), `/fonts/*` (local).

---

## 8. Per-Page Layout Specs

### 8.1 `/features` — "Everything a community needs, in one calm workspace"

```
┌──────────────────────────────────────────────────────────────┐
│ Header (sticky, unchanged)                                    │
├──────────────────────────────────────────────────────────────┤
│ MENU HERO (two-col)                                           │
│  [Core objects]         │   features-scene.svg (glow behind)  │
│  H1 (52px Urbanist)     │                                     │
│  Lead (8 core objects)  │                                     │
├──────────────────────────────────────────────────────────────┤
│ PageContainer (1280)                                          │
│  ▸ Core objects — CardGrid 8 cards (Reveal stagger 0.08s)     │
│  ▸ Why Origin instead of five tools — lead + CompareTable     │
│  ▸ Roadmap — 5 phase cards (Reveal stagger)                   │
│  ▸ Frequently asked questions — FAQ block                     │
│  CTA BAND: Find your people. Build together. [Join the waitlist] │
├──────────────────────────────────────────────────────────────┤
│ Footer (unchanged)                                            │
└──────────────────────────────────────────────────────────────┘
```

- Comparison table: keep real `<table>` semantics + `data-testid`
  `features-comparison-table` (unit/e2e depend on it). Restyle header row with
  `surfaceElevated` (already done) and add row hover `background: surface`.
- Roadmap: convert the current bullet list into 5 cards (title `SubTitle`
  Urbanist 600, body `BodyCopy`), keeping Phase 5 copy from copy-log §4.6 row 7.

### 8.2 `/community` — "Where people find each other"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · community-scene.svg · warm glow (F5A524 + 4F7DF9) │
├──────────────────────────────────────────────────────────────┤
│  ▸ How we run the network — 4 value cards                    │
│  ▸ Example communities — chip grid (7 pills, gradient border) │
│  ▸ Join the network — 2,400+ gradient Stat + lead + CTA link  │
│  ▸ Frequently asked questions (5)                             │
│  CTA BAND (same)                                              │
└──────────────────────────────────────────────────────────────┘
```

- Example communities: replace bare `Card` grid with **chips** — pill
  `span`s, `border: 1px solid rgba(79,125,249,0.4)`, `radius: pill`, padding
  `10px 18px`, Urbanist 600 15px `colors.text`, hover fill slide (accent at
  0.9, `EASE` 0.4s). Keeps each name as visible text (unit test asserts
  `Book Clubs` presence after copy-log apply).
- Trust stat keeps `data-testid="community-members-stat"`.

### 8.3 `/docs` — "JoinOrigin docs"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · docs-scene.svg · light-blue glow                  │
├──────────────────────────────────────────────────────────────┤
│  ▸ Concepts — CardGrid 8 cards (Profiles … Opportunities)     │
│  ▸ Roadmap — 5 phase cards                                   │
│  ▸ Architecture & standards — two body paragraphs (Matrix)    │
│  ▸ Frequently asked questions (4)                             │
│  CTA BAND (same)                                              │
└──────────────────────────────────────────────────────────────┘
```

- Concepts: keep the `<h3>` per concept (LLM extraction contract, docs §5.5),
  restyle as cards with `CardTitle`/`CardBody` — same heading levels
  (`h3` inside cards), so the e2e heading-hierarchy check stays green.

### 8.4 `/about` — "The most valuable asset is your network"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · about-scene.svg (heart graph) · blue glow         │
├──────────────────────────────────────────────────────────────┤
│  ▸ Our mission — two body paragraphs                          │
│  ▸ Guiding principles — 4 cards                              │
│  ▸ Founder guidance — framed Quote (with border upgrade)      │
│  ▸ Deeper reading — bullet list with AccentLinks              │
│  ▸ Frequently asked questions (3)                             │
│  CTA BAND (same)                                              │
└──────────────────────────────────────────────────────────────┘
```

### 8.5 `/contact` — "Talk to us"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · contact-scene.svg · blue glow                     │
├──────────────────────────────────────────────────────────────┤
│  ▸ Send a message — form (restyled, two-col on desktop:       │
│    Name | Email stacked · Message · [Send via email])         │
│  ▸ Other ways to reach us — list with AccentLinks             │
│  ▸ Frequently asked questions (2)                             │
│  CTA BAND override: Questions about Origin? [Contact us]→/contact │
└──────────────────────────────────────────────────────────────┘
```

- Form restyle only: inputs keep `data-testid="contact-form"`, `max-width
  480px`, surface bg, focus ring primary; `SubmitButton` becomes a primary
  gradient pill (48px, radius pill, primary→#8AB4FF gradient, white label,
  hover lift + glow) — same handler (`mailto:` compose) unchanged.

### 8.6 `/privacy` — "Privacy Policy"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · privacy-scene.svg (shield) · green accent         │
│  (lead = existing "What we collect" first paragraph)          │
├──────────────────────────────────────────────────────────────┤
│  ▸ What we collect (list with SubTitles)                     │
│  ▸ How we use it                                             │
│  ▸ Identity & flexibility   ← NEW section (copy-log §4.16)    │
│  ▸ Your rights                                              │
│  ▸ Contact                                                  │
│  CTA BAND override: Questions about Origin? [Contact us]→/contact │
└──────────────────────────────────────────────────────────────┘
```

### 8.7 `/terms` — "Terms of Service"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO · terms-scene.svg · muted blue glow                 │
│  (lead = existing Acceptance paragraph)                       │
├──────────────────────────────────────────────────────────────┤
│  ▸ 8 legal sections (Acceptance … Contact) as Reveal-wrapped  │
│    body sections, restyled with section-tick SectionTitles    │
│  CTA BAND override: Questions about Origin? [Contact us]→/contact │
└──────────────────────────────────────────────────────────────┘
```

---

## 9. 404 Boundary — `not-found.tsx` Redesign

Keep the self-contained boundary (its own `ThemeProvider`; no modal, no API,
no `WaitlistModalProvider` — the home route is not rendered for unknown
routes). Copy is **unchanged** (copy-change-log §3: 404 copy NOT in scope).

| Aspect | Spec |
|---|---|
| Layout | Keep `min-height: 100svh`, centered flex column, gap `lg`, padding `xxl`; add `not-found-scene.svg` (width 240, height 180, `alt=""`, decorative) above the brand row. |
| Entrance | Add one fade-up animation on mount: `opacity 0→1, translateY(16px→0)`, 0.6s `EASE`; `@media (prefers-reduced-motion: reduce)` disables it. Applies to the whole `PageRoot` (simple CSS animation, no hook needed — the boundary is client-rendered by definition). |
| Content (unchanged copy) | Brand mark + `JoinOrigin` wordmark · `404` gradient status · `<h1>Page not found</h1>` · Copy paragraph (existing string — unit test asserts `/doesn.t exist or has moved/i`) |
| CTAs | Keep primary `Back to home` link (existing — unit test asserts name + `href="/"`). Add a **secondary** ghost link `Explore communities →` (`href="/community"`, text `colors.textMuted`, hover → `colors.text`, underline). |
| A11y | Scene decorative `alt=""` + `aria-hidden`; heading hierarchy: h1 only. |

---

## 10. Implementation Rules (for `fe-menu-redesign`)

1. **Zero implementation-file edits outside the redesign scope:** page
   wrappers (`page.tsx` files — metadata + JSON-LD), `Header.tsx`, `Footer.tsx`,
   `WaitlistModal/*`, `layout.tsx`, home page, SEO libs, and sitemap/robots are
   NOT touched.
2. **Only these files change:** `MenuPageShell.tsx` (extend), new
   `MenuHero.tsx` / `CtaBand.tsx` / `Reveal.tsx` / `menuTokens.ts`, extended
   `menuPagePrimitives.ts` + `motion.ts`, the seven view files
   (`*view.tsx`), `not-found.tsx`, and the new scene SVGs under `public/assets`.
3. **Copy ownership:** `fe-origin-copy` (TASK-246) applies the copy-change-log.
   If both run before merge, FE must reconcile — the merged result contains
   the §6 copy verbatim. The redesign itself changes no strings; where a lead
   is not yet present, reuse existing first-paragraph copy (§6) or leave the
   hero lead empty (`lead` optional).
4. **Images:** use `next/image` with explicit `width`/`height` for raster
   needs; for the scene SVGs prefer plain `<img src="/assets/menu/scenes/…
   .svg" alt="" />` (or `next/image` with `unoptimized` — whichever keeps the
   existing deterministic styled-components pattern from TASK-209); always
   reference local `/assets/...` paths.
5. **H1 + landmarks:** exactly one `<h1>` per page; the top nav `header` stays
   the only `header` landmark; `MenuHero` is a `div`/`section`; CTA band is a
   `section` with an `h2` (visible, non-empty) to keep heading hierarchy
   (`h1 → h2`) on every page.
6. **Tests:** update/add unit tests for the new components (`MenuHero`,
   `CtaBand`, `Reveal`, `useInView`) mirroring existing patterns; ensure
   existing page tests still pass (copy assertions belong to TASK-246; layout
   moves must not break `getAllByRole('heading', { level: 1 })` counts or
   `data-testid` references). E2E `pages.spec.ts` must stay green (single h1,
   headings hierarchy, main word count ≥ 150, landmarks) — adding CTA-band
   copy increases word count, so ≥150 words remains satisfied.
7. **Reduced motion:** every new animation respects
   `prefers-reduced-motion` via the existing global kill-switch in
   `MenuPageShell` `GlobalStyles` + `useReducedMotion` in hooks.
8. **Home page untouched** (copy-change-log scope + TASK-247 acceptance).

---

## 11. Definition of Done (for TASK-247)

- [ ] All 7 menu pages render the new hero band (eyebrow + unchanged H1 +
      verbatim lead + local scene SVG) with the page glow palette.
- [ ] Every menu page shows the join CTA band before the footer; privacy/terms
      use the contact override; CTA opens the shared waitlist modal (except
      the contact-override pages, which link to `/contact`).
- [ ] Scroll-reveal animation on sections + staggered cards; hero entrance
      animation; all `prefers-reduced-motion` safe.
- [ ] Scene SVGs authored locally under `apps/web/public/assets/menu/scenes/`
      (8 files), zero external CDN references anywhere.
- [ ] Exactly one `<h1>` per page; single `<main>`; heading hierarchy intact;
      `page.tsx` wrappers (metadata + JSON-LD) unchanged.
- [ ] `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm test:e2e` /
      `pnpm --filter @joinorigin/web build` all green; broken tests updated
      (copy assertions reconciled with TASK-246).
- [ ] Home page and Header/Footer/Modal untouched.

---

## 12. Out of Scope / Follow-ups

1. **Copy application** belongs to TASK-246 (`fe-origin-copy`) — this spec
   only places copy.
2. **Auth / profiles** — Sprint 9.
3. **`/pricing`** — removed in Sprint 5; no money language anywhere.
4. **Design-doc index** (`app/docs/design/README.md`) — not updated by this
   role; reviewer follow-up: add `sprint-8-menu-redesign.md` + the existing
   `sprint-8-origin-copy.md` rows to the design-doc index.
5. **Historical design docs** (`sprint-3-*`, `sprint-4-*`) — untouched
   (records of past decisions).
6. **Hero `sceneAlt` semantics** — scenes are decorative; if a future sprint
   adds meaningful infographics, convert to labeled `<figure>` + `<figcaption>`.
