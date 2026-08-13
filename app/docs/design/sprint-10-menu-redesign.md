# Sprint 10 — Menu Screen Redesign Spec (Homepage-Standard Elevation)

> **Parent:** [`../README.md`](../README.md) — design docs index
> **Base:** Sprint 8 redesign spec [`sprint-8-menu-redesign.md`](./sprint-8-menu-redesign.md) (already implemented on master) + Sprint 8 copy conventions [`sprint-8-origin-copy.md`](./sprint-8-origin-copy.md) + Sprint 9 i18n architecture [`sprint-9-i18n-arch.md`](./sprint-9-i18n-arch.md)
> **Consumer:** `fe-menu-redesign` (TASK-282) — implement this spec VERBATIM
> **Verifier:** `e2e-ui-polish-validation` (TASK-283)
> **Producer:** `design-menu-redesign` (TASK-276) · **Date:** 2026-08-13 · **Branch:** `feat/design-menu-redesign`

---

## 1. Purpose

The Sprint 8 redesign lifted the seven menu pages from "flat text columns" to
"branded content pages" (hero band + scene SVG + join CTA band). They are
**functional but still visibly quieter than the home page**: flat `#0F1115`
canvas, a single static scene SVG, and no ambient life.

This Sprint 10 spec is the **homepage-standard elevation**: every menu page
(`/features`, `/community`, `/docs`, `/about`, `/contact`, `/privacy`,
`/terms`) and the styled 404 boundary must now deliver **at minimum the color,
oomph, and engagement of the home page** — ambient hero atmosphere, animated
scene art, hero-level join CTA, social-proof trust rows, count-up stats,
marquee social proof, and glass section bands — while preserving **every**
hard-won constraint:

- **SEO/LLM contract:** exactly one `<h1>` per page, single `<main>`, semantic
  sections, real `<table>` on `/features`, visible FAQ blocks, and the
  **server-wrapper pattern unchanged** (`page.tsx` metadata + JSON-LD are NOT
  touched; the view files keep rendering their localized FAQPage JSON-LD).
- **Copy contract (Sprint 8 conventions, §1 of `sprint-8-origin-copy.md`):**
  Origin = product, JoinOrigin = brand/network. **Zero new copy strings.**
  The redesign may only *place* existing i18n keys from the active locale
  dictionary (`packages/i18n/locales/*.json`) — the locale JSONs are owned by
  arch-i18n + translators and are NOT edited by this role or by
  `fe-menu-redesign` (TASK-282 acceptance: "locale JSONs untouched").
- **Asset contract:** every image/illustration is authored **locally** under
  `apps/web/public/assets/**` — zero external CDN references at runtime.
  Scene SVG paths from Sprint 8 stay valid (`/assets/menu/scenes/*.svg`).
- **Design-language contract:** keep the shared language (dark `#0F1115` base,
  `#4F7DF9 → #8AB4FF` gradient, Urbanist display / Inter body,
  gradient-border buttons, `@joinorigin/design` tokens) and *layer* the
  homepage atmosphere on top — never replace it.
- **i18n contract:** all visible copy comes from `t()` / `Trans` lookups;
  RTL logical properties are preserved; `prefers-reduced-motion` kill-switch
  stays.

---

## 2. Homepage-Standard Parity Matrix (what "≥ homepage" means)

The home page (`app/home-view.tsx` + `components/Hero*`) ships these
engagement elements. This spec maps each to a menu-page equivalent so the
"at minimum the homepage standard" criterion is **verifiable**, not vibes.

| Homepage element | Home implementation | Menu-page equivalent (this spec) | Verifier |
|---|---|---|---|
| Full-page ambient hero | `hero-background.webp` cover + 2 radial glows + vignette (`landingTokens`) | `menu-ambient.webp` cover at ≤0.5 opacity + dot-grid overlay + per-page radial glow + vignette in `MenuHero` (§4.1) | e2e pixel/asset check + dev inspection |
| Animated hero visual | `OrbitViz` (4 spinning rings, fly-in avatar chips, count-up hub) | Upgraded scene SVGs with self-contained CSS float/orbit animation (§4.2, §5) | visual + asset check |
| Rotating-border hero CTA | `RotatingBorderButton` "Start Project" in `HeroLeft` | `HeroCta` = `RotatingBorderButton` "Join the waitlist" in every `MenuHero` (except legal pages → contact link) (§4.3) | e2e CTA presence |
| Trust row | `TrustAvatars` (9 avatar stack) + `trustCopy` in `HeroLeft` | `TrustRow` in hero meta on `/features`, `/community`, `/about` (§4.4) | unit + e2e |
| Count-up stat | `OrbitViz` hub `useCountUp` 0→2,400+ | `CountUpStat` on `/community` "Join the network" + `/about` mission band (§4.5) | unit |
| Infinite marquee | `LogoMarquee` partner ticker (pause on hover, edge masks) | `ChipMarquee` example-community chips on `/community` (§4.6) | unit + e2e |
| Entrance/scroll motion | `useEntrance` + `Reveal` + stagger | Same, extended to new blocks; scene float; banded reveals (§7) | e2e/reduced-motion |
| Any-button waitlist | `WaitlistModalProvider` + `openWaitlist` | Already wired via `MenuPageShell`; hero `HeroCta` now opens it too (§3) | e2e waitlist spec |
| Visible FAQ block | `FaqSection` + `h2`/`h3` + `p` | Restyled `FaqCard` items — semantics + JSON-LD mirror unchanged (§4.8) | unit + e2e |
| Definition paragraph | `Definition` under hero (exact "social collaboration network") | Hero `lead` already contains the phrase on `/features`, `/community`, `/docs`, `/about` — keep verbatim (§6) | e2e LLM check |

Everything below is written so `fe-menu-redesign` can implement without
re-reading the codebase.

---

## 3. MenuPageShell — Extended Component Structure

### 3.1 Current contract (keep — backwards compatible)

`apps/web/components/MenuPageShell.tsx` already provides both `ThemeProvider`s
(DOM + styled-components/native), `WaitlistModalProvider`, sticky `Header`,
single `<main>`, slim `Footer`, global styles (incl. the reduced-motion
kill-switch), and the Sprint 8 props `hero?`, `showCtaBand?`, `ctaOverride?`.
**Keep all of this.** The Sprint 10 extension is additive: when the new props
are absent, behavior is identical to today.

### 3.2 New contract (extend)

```tsx
export interface MenuHeroProps {
  eyebrow?: string;                 // unchanged (i18n key result)
  title: string;                    // unchanged H1 string (i18n key result)
  lead?: React.ReactNode;           // unchanged verbatim lead (i18n key result)
  scene?: string;                   // unchanged local SVG path
  sceneAlt?: string;                // unchanged (decorative → "")
  accent?: PageAccentKey;           // unchanged per-page glow key
  // Sprint 10 additions:
  /** Hero-level join CTA. omit for legal pages (privacy/terms). */
  cta?: {
    variant: 'waitlist' | 'contact';
    label: string;                  // t('common.joinWaitlist') | t('common.contactUs')
    href?: string;                  // '/contact' when variant === 'contact'
  };
  /** Optional social-proof meta below the lead: trust avatars and/or stat. */
  meta?: {
    avatars?: boolean;              // TrustRow (features/community/about)
    stat?: boolean;                 // CountUpStat pill (community/about)
  };
  /** Ambient hero atmosphere. Default true (§4.1). */
  ambient?: boolean;
}

export interface MenuSubnavProps {
  /** Sticky in-page anchor nav label + links (docs/privacy/terms). */
  label: string;                    // t('<page>.hero.eyebrow') — e.g. "Documentation" / "Legal"
  links: Array<{ id: string; label: string }>; // h2 section ids + localized titles
}

export interface MenuPageShellProps {
  children: React.ReactNode;
  hero?: MenuHeroProps;             // extended (§3.2)
  showCtaBand?: boolean;            // unchanged
  ctaOverride?: CtaBandProps;       // unchanged
  /** Sticky in-page anchor nav rendered as the first child of <main> after hero. */
  subnav?: MenuSubnavProps;
  /** Alternate glass section bands behind the children (default true). */
  banded?: boolean;
}
```

Rendered structure (single `<main>` landmark preserved — AnchorNav is a `nav`
inside `<main>`, NOT a `header`; the sticky top `Header` stays the only
`header` landmark):

```text
<NativeThemeProvider> <DomThemeProvider> <WaitlistModalProvider>
  <PageRoot>                       ← gains menu-ambient layers only behind hero (see §4.1)
    <Screen>
      <Header />                   ← sticky top nav (unchanged)
      <main>
        {hero ? <MenuHero {...hero} /> : null}
        {subnav ? <AnchorNav {...subnav} /> : null}
        {children}                 ← pages render <PageContainer> sections inside <SectionBand>s
        {showCtaBand ? <CtaBand {...ctaOverride} /> : null}
      </main>
      <Footer />                   ← unchanged
    </Screen>
  </PageRoot>
  <GlobalStyles />                 ← unchanged
</WaitlistModalProvider> </DomThemeProvider> </NativeThemeProvider>
```

**Critical H1 rule (unchanged from Sprint 8):** when a page passes `hero`, the
view must NOT render a second `<h1>`. `MenuHero` renders the page's single
`<h1>` with the existing `PageTitle` visual style. The `hero` CTA/meta add no
headings.

### 3.3 New / modified files (FE creates — exact list)

```text
apps/web/components/
  menuTokens.ts              # EXTEND: ambient/grid URLs + hero/scene/section tokens (§5.1)
  MenuHero.tsx               # EXTEND: ambient bg, heroCta, meta, scene float hook (§4.1)
  MenuScene.tsx              # NEW: upgraded scene wrapper (glow + float + orbit, §4.2)
  HeroCta.tsx                # NEW: RotatingBorderButton → waitlist OR contact link (§4.3)
  TrustRow.tsx               # NEW: avatar stack + trust copy (§4.4)
  CountUpStat.tsx            # NEW: count-up gradient stat (§4.5)
  ChipMarquee.tsx            # NEW: infinite community-chip marquee (§4.6)
  SectionBand.tsx            # NEW: glass section band wrapper (§4.7)
  AnchorNav.tsx              # NEW: sticky in-page nav (§4.9)
  menuPagePrimitives.ts      # EXTEND: FaqCard, Pill, StatPill, AmbientLayer (§4.8, §5.2)
  motion.ts                  # EXTEND: useReducedMotion reuse only (no new hooks needed)
  Reveal.tsx                 # UNCHANGED
  CtaBand.tsx                # UNCHANGED
```

New/upgraded assets under `apps/web/public/assets/menu/` — see §6 manifest.

---

## 4. Shared Layout Components

### 4.1 `MenuHero` — homepage-atmosphere hero band

| Aspect | Spec |
|---|---|
| Layout | Full-width band, `position: relative`, `overflow: hidden`, `min-height: 560px` desktop (`100vh`-safe: `calc(60vh)` floor 480px), content `max-width: 1280px` centered, padding `72px 64px 48px` (mobile `48px 20px 32px`). Two columns on desktop (`grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr)`), stack below `1024px` (scene below text, centered, `max-width: 320px`). |
| Ambient layers (all `pointer-events: none`, `aria-hidden`) | **Order, top→bottom:** (1) `::before` on the band = `menu-ambient.webp` cover at `opacity: 0.5`, `mix-blend-mode: screen`; (2) a `div.hero-grid` = `hero-grid.svg` tiled (`background-size: 88px 88px`, `opacity: 0.5`); (3) two radial glows — the page glow from `PAGE_ACCENTS[accent].glow` (right-top, unchanged) plus a second cool glow bottom-left (`radial-gradient(500px at 12% 88%, rgba(138,180,255,0.10), transparent 70%)`, mirroring `HERO_RADIAL_GLOW_2`); (4) bottom vignette `linear-gradient(180deg, transparent, rgba(15,17,21,0.85))` so the hero melts into the page body. Content z-index 1. |
| Column 1 | `Eyebrow` (unchanged) · `<h1>` `PageTitle` (unchanged strings) · `PageLead` (unchanged verbatim lead) · **`Actions` row** (new): `HeroCta` + optional `StatPill` meta · **`TrustRow`** below when `meta.avatars` (§4.4). |
| Column 2 | `MenuScene` (§4.2) — upgraded scene SVG with float + orbit animation and the page glow behind it. |
| Entrance | Text column fade-up (`useEntrance`, 0.8s `EASE`); scene scale-in (0.94→1, 1.1s); CTA/meta delayed +0.15s. Reduced-motion → final states immediately (existing global kill-switch). |
| Semantics | `section` (NOT `header` — top nav is the only `header`). Exactly one `<h1>`. `HeroCta` is a `<button>` (opens waitlist) or an `<a href="/contact">` (legal pages); `TrustRow` is a `div`; `StatPill` is a `div` (no heading). |

**Rule — CTA per page:** `/features`, `/community`, `/docs`, `/about` pass
`cta={{ variant: 'waitlist', label: t('common.joinWaitlist') }}`.
`/contact` passes **no hero cta** (the page's job is the contact form; the CTA
band below still offers the waitlist). `/privacy` and `/terms` pass
`cta={{ variant: 'contact', label: t('common.contactUs'), href: '/contact' }}`
— a ghost link, never the waitlist modal, on legal pages.

### 4.2 `MenuScene` — upgraded scene art + self-contained animation

**Loading:** keep the Sprint 8 mechanism — plain `<img src="/assets/menu/
scenes/<page>-scene.svg" alt="" aria-hidden="true" width="560" height="420">`
(no `next/image` for SVGs). The scene wrapper paints the page glow via
`::before` (unchanged `HeroScene` behavior) and adds two faint decorative
rings behind the art (`::after` ring, 1px `rgba(79,125,249,0.18)` border,
60s counter-rotating spin) for orbit ambiance.

**Animation lives INSIDE the SVG files (critical):** an SVG loaded via
`<img>` is a separate document — page CSS cannot reach its groups, but the
SVG's own embedded `<style>` CAN animate them, including honoring
`prefers-reduced-motion`. Therefore:

1. Every scene SVG gains a `<style>` block (or an extended one):
   ```svg
   <style>
     [data-scene="main"] {
       animation: sceneFloat 9s ease-in-out infinite alternate;
       transform-box: fill-box;
       transform-origin: center;
     }
     [data-scene="orbit"] {
       animation: sceneOrbit 24s linear infinite;
       transform-box: fill-box;
       transform-origin: center;
     }
     @keyframes sceneFloat {
       from { transform: translateY(0); }
       to   { transform: translateY(-10px); }
     }
     @keyframes sceneOrbit {
       from { transform: rotate(0deg); }
       to   { transform: rotate(360deg); }
     }
     @media (prefers-reduced-motion: reduce) {
       [data-scene="main"], [data-scene="orbit"] { animation: none !important; }
     }
   </style>
   ```
2. The focal motif (hub, clusters, heart graph, shield core, bubbles) gets
   `data-scene="main"`; the satellite/orbit decoration gets
   `data-scene="orbit"`. Static anatomy stays exactly as Sprint 8 authored
   (same viewBox `0 0 560 420`, same palette limits: `#4F7DF9`, `#8AB4FF`,
   `#2C313A`, `#9AA3B2`, + `#F5A524` community / `#30A46C` privacy).
3. Keep files < 30 KB, no external URLs, no raster embeds.

Per-page scene anatomy (extend Sprint 8 §7 table):

| Scene | main group (floats) | orbit group (rotates) |
|---|---|---|
| `features-scene.svg` | Center hub + gradient glow | 8 satellite nodes + link lines |
| `community-scene.svg` | 4 cluster groups | faint outer connection arcs |
| `docs-scene.svg` | Stacked document layers | Matrix node line + lock glyph |
| `about-scene.svg` | Heart-shaped social graph | small outer nodes on arcs |
| `contact-scene.svg` | Chat bubbles | node link line + dot trail |
| `privacy-scene.svg` | Shield core + 3 data nodes | shield outline ring |
| `terms-scene.svg` | Document/scroll + 5 rule lines | outer balance ring |
| `not-found-scene.svg` | Glowing broken-link node | dashed missing-link arc |

### 4.3 `HeroCta` — hero-level join CTA

| Aspect | Spec |
|---|---|
| Props | `{ variant: 'waitlist' \| 'contact'; label: string; href?: string }` |
| Waitlist variant | `RotatingBorderButton` (`size="large"`, `fillDirection="left"`, label = `t('common.joinWaitlist')`, `onClick={(e) => openWaitlist(e.currentTarget)}`, `testID="hero-join-button"`). Identical wiring to the home hero CTA. |
| Contact variant | Ghost link (muted pill): `border: 1px solid rgba(138,180,255,0.35)`, `color: textMuted`, hover → `color: text` + `border-color: rgba(79,125,249,0.6)`; `href="/contact"`, `testID="hero-contact-link"`. |
| A11y | Button opens the existing waitlist modal (focus returns per modal contract); link is a real anchor. No new headings. |

### 4.4 `TrustRow` — social proof

| Aspect | Spec |
|---|---|
| Layout | `div`, `display: flex`, `align-items: center`, `gap: md`, `margin-top: xl`, wrap on mobile. |
| Content | Avatar stack (9 avatars, `-12px` overlap, `border: 2px solid #FFFFFF` — mirror `HeroLeft` `TrustAvatar` exactly) + `TrustCopy` span reading `t('home.hero.trustCopy')` ("Join 2,400+ builders already collaborating"). Reuses the home keys — zero new strings. |
| Source | `/assets/avatars/avatar-01.png` … `avatar-09.png`; alt = `t('home.hero.trustAvatarsAlt', { number: i + 1 })`. |
| A11y | Pure visual + existing copy; `aria-hidden` on the overlapping image stack, label text is real text. |

### 4.5 `CountUpStat` — count-up gradient stat

| Aspect | Spec |
|---|---|
| Props | `{ valueText: string; label?: string; testID?: string }` |
| Mechanics | Parse the leading integer from the **localized** value string (`community.joinStatValue` = `"2,400+"` → `2400`; suffix `"+"`). `useCountUp(2400, { durationMs: 2000, delayMs: 300 })`, `formatCount(value, locale)` from `useCountUp.ts`, re-append the non-numeric suffix from the source string. **If parsing fails, render the localized string verbatim (no animation).** This keeps locale parity — no JSON edits. |
| Style | Same gradient `StatValue` treatment (Urbanist bold `display` size, `ACCENT_GRADIENT` text clip) inside a `StatPill` (§5.2). |
| Reduced motion | `useCountUp` `disabled` → snaps to target (already built in). |

### 4.6 `ChipMarquee` — community social proof

| Aspect | Spec |
|---|---|
| Where | `/community` replaces the static `ChipGrid` with this marquee (the `Chip`/`ChipLabel` styles from Sprint 8 are reused inside). |
| Mechanics | Mirror `LogoMarquee`: `overflow: hidden` wrapper with edge fade masks (`linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)`), track = the 7 example-community chips repeated **2×** (`width: max-content`), `animation: chipScroll 28s linear infinite` (`translateX(0 → -50%)`), pause on hover. |
| A11y | The track is wrapped `aria-hidden="true"`; an equivalent static `<ul class="sr-only">` (visually hidden via `position: absolute; clip` pattern) lists the chips once with `aria-label` = the intro. Screen readers read each community name once. |
| Reduced motion | `animation: none`, track becomes a static wrapping flex row (same as `LogoMarquee`). |
| Data-testid | `data-testid="chip-marquee"`. |

### 4.7 `SectionBand` — glass section bands

| Aspect | Spec |
|---|---|
| Purpose | Give the page rhythm so it stops reading as "one long column": alternate plain and glass bands. Wrapper component with `variant: 'plain' \| 'glass'` (default `glass` for every other section). |
| Glass style | `position: relative`, `border-block: 1px solid rgba(44,49,58,0.5)`, `background: rgba(24,27,33,0.55)`, `backdrop-filter: blur(10px)`, full-bleed width (band extends edge-to-edge; inner content keeps `PageContainer` max-width 1280). A faint per-page glow `::before` (same `PAGE_ACCENTS[accent].glow` at 0.5 opacity) only on the first glass band for wayfinding. |
| Semantics | Wrapper only — children keep their own `<section>`/headings. Reveal wrapping stays per-section inside the band. |
| Rule | `/privacy` + `/terms` set `banded={false}` (legal copy stays on plain canvas; AnchorNav + ambient hero provide the elevation). |

### 4.8 `FaqCard` (menuPagePrimitives extension)

Restyle FAQ items as cards while keeping the semantic contract (`FaqSection`
`section` + `FaqQuestion` `h3` + `FaqAnswer` `p`):

- `FaqCard` = `div` with `background: surface`, `border: 1px solid border`,
  `radius: lg`, `padding: lg`, hover lift (`translateY(-3px)` + primary border
  tint + soft shadow) mirroring `Card`.
- Question keeps a 3px × 20px gradient tick (`::before`, same as
  `SectionTitle`).
- Existing `FaqItem`/`FaqQuestion`/`FaqAnswer` names stay exported (tests
  reference them); FE may re-map the FAQ rendering to the new card styles
  without renaming exports.

### 4.9 `AnchorNav` — sticky in-page nav (docs / privacy / terms)

| Aspect | Spec |
|---|---|
| Layout | `nav`, `position: sticky; top: 72px` (below the fixed Header), `z-index: 20`, full-width, `background: rgba(15,17,21,0.82)`, `backdrop-filter: blur(10px)`, `border-block-end: 1px solid rgba(44,49,58,0.6)`. Inner row max-width 1280, horizontal scroll on mobile (`overflow-x: auto`, no scrollbar). |
| Links | Pill links for each on-page `h2` (the localized section titles — e.g. `docs.sectionConcepts`, `docs.sectionRoadmap`, `docs.sectionArchitecture`, `common.faqHeading`). `href="#<id>"` matching the `h2` `id`s; active link tint `rgba(79,125,249,0.14)`. |
| Label | `aria-label` = the page's eyebrow key result (`t('docs.hero.eyebrow')` / `t('privacy.hero.eyebrow')` / `t('terms.hero.eyebrow')`) — zero new strings. |
| Smooth scroll | `html { scroll-behavior: smooth }` scoped via a `useEffect` adding a class to `document.documentElement`; skip when `prefers-reduced-motion`. |
| Semantics | A `nav` landmark is allowed; e2e `nav` assertions use `.first()` (the Header nav) so an additional in-page `nav` is safe. Sections must keep their `id` (add `id` where missing — no copy change). |

---

## 5. Tokens & Primitives

### 5.1 `menuTokens.ts` extensions (web-local, single source)

```ts
export const MENU_AMBIENT_URL = 'url(/assets/menu/menu-ambient.webp)';   // §4.1 layer 1
export const MENU_GRID_URL = 'url(/assets/menu/hero-grid.svg)';          // §4.1 layer 2
export const HERO_BAND_MIN_HEIGHT = '560px';
export const SCENE_FLOAT = '9s ease-in-out infinite alternate';          // SVG-side default (tokens for reference)
export const SCENE_ORBIT = '24s linear infinite';                        // SVG-side default
export const SECTION_BAND_GLASS = 'rgba(24, 27, 33, 0.55)';
export const SECTION_BAND_BORDER = 'rgba(44, 49, 58, 0.5)';
export const CHIP_MARQUEE_DURATION = '28s';
```

`PAGE_ACCENTS` stays the single glow source (Sprint 8 §2.2) — the hero's
second cool glow is a fixed constant (same on every page).

### 5.2 `menuPagePrimitives.ts` extensions (additive, no renames)

| Export | Spec |
|---|---|
| `StatPill` (new) | `div` — `display: inline-flex`, `align-items: baseline`, `gap: sm`, `padding: 10px 18px`, `border: 1px solid rgba(79,125,249,0.35)`, `background: rgba(24,27,33,0.7)`, `radius: pill`. Hosts `CountUpStat`. |
| `FaqCard` (new) | §4.8 card styling. |
| `Chip` / `ChipLabel` (kept from Sprint 8) | reused inside `ChipMarquee`. |
| `Eyebrow`, `HeroScene`, `Card`, `CardGrid`, `SectionTitle`, `SubTitle`, `BodyCopy`, `CompareTable`, `Quote`, `Stat`, `StatValue`, `StatLabel`, `AccentLink`, `PageContainer`, `PageLead` | **unchanged** (existing unit tests depend on them). |

---

## 6. Local Asset Manifest (exact paths, zero CDN)

All paths are browser-relative (`/assets/...`) under `apps/web/public/`.
**No external CDN references anywhere — including fonts, icons, and imagery.**

### 6.1 New assets (FE authors)

| File (browser path) | Spec |
|---|---|
| `/assets/menu/menu-ambient.webp` | 1920×1080 dark ambient texture for menu hero bands: base `#0F1115`, faint large radial blue glow top-right (`#4F7DF9` ~4% alpha), soft noise/grain, vignette toward edges. < 60 KB. Reused by every menu page hero + 404. |
| `/assets/menu/hero-grid.svg` | 88×88 tile: 1px `rgba(138,180,255,0.28)` dots on transparent (an 80×80 pattern tile with `<pattern>` + dots at ~24px pitch, feTile is unnecessary — plain tiling via CSS `background-size`). < 2 KB. |
| Scene upgrades | Edit the 8 existing files in place (paths unchanged): add the `<style>` block + `data-scene` groups (§4.2). Files stay < 30 KB. |

### 6.2 Reused assets (no change)

| File | Used by |
|---|---|
| `/assets/menu/scenes/features-scene.svg` … `terms-scene.svg`, `not-found-scene.svg` | hero / 404 scenes (upgraded in place) |
| `/assets/avatars/avatar-01.png` … `avatar-09.png` | `TrustRow` (features/community/about) + home (unchanged) |
| `/assets/logo/joinorigin-mark.svg` | 404 brand mark + Header/Footer (unchanged) |
| `/fonts/inter/*`, `/fonts/urbanist/*` | body + display type (already local) |
| `/assets/logo/joinorigin-logo.png` etc. | Header/Footer logos (unchanged; TASK-281 regenerates in place) |

**Explicit zero-CDN rule:** grep the web bundle for `http://`/`https://`
image/font references after implementation — only `mailto:`/internal links and
the self-hosted analytics endpoint may appear (TASK-283 verifies).

---

## 7. Entrance & Scroll Animation Spec

| Element | Animation | Reduced-motion |
|---|---|---|
| Hero text column | fade-up `opacity 0→1, translateY(24px→0)`, 0.8s `EASE` (`useEntrance`) | final state (kill-switch) |
| Hero CTA + meta | fade-up, 0.8s, delay `0.15s` | final state |
| Hero scene | scale-in `0.94→1`, 1.1s + SVG-internal float/orbit loops (§4.2) | scene visible static; SVG `@media (prefers-reduced-motion)` disables loops |
| Section bands | `Reveal` fade-up `translateY(20px→0)`, 0.6s, stagger 80ms per card | visible immediately |
| `CountUpStat` | `useCountUp` 0→target easeOutCubic 2s | snaps to target |
| `ChipMarquee` | infinite `translateX(0 → -50%)` 28s linear, pause on hover | static wrap row |
| AnchorNav | no entry animation (sticky, always visible) | smooth scroll disabled |
| CTA band | unchanged (`Reveal`) | unchanged |
| 404 | existing fade-up + scene float loop | static |

All new motion reuses `ENTRANCE_EASING` (`cubic-bezier(0.22, 1, 0.36, 1)`),
the `MenuPageShell` global reduced-motion kill-switch, `useReducedMotion`, and
the SVG-internal media query. **Progressive enhancement:** content is never
hidden by CSS alone; entrance states apply only after mount (`useEntrance`) or
viewport entry (`useInView`).

---

## 8. Per-Page Layout Specs (wireframes)

Legend: `[HeroCta]` = hero join CTA (§4.3) · `[Trust]` = TrustRow · `[Stat]` =
CountUpStat · `[Marquee]` = ChipMarquee · `[Anchor]` = AnchorNav · `[Band]` =
SectionBand. H1 strings are the **exact** current localized values (unchanged,
e2e-asserted in `tests/e2e/tests/pages.spec.ts` `MENU_PAGES`). All section
copy = existing i18n keys (no new strings).

### 8.1 `/features` — "Everything a community needs, in one calm workspace"

```
┌──────────────────────────────────────────────────────────────┐
│ Header (sticky, unchanged)                                    │
├──────────────────────────────────────────────────────────────┤
│ MENU HERO — ambient + grid + blue glow                        │
│  [Core objects]  features-scene.svg (float + orbit arcs)      │
│  H1 (52px Urbanist)                                           │
│  Lead (8 core objects)                                        │
│  [HeroCta: Join the waitlist]  [Trust: 2,400+ builders]       │
├──────────────────────────────────────────────────────────────┤
│ [Band: glass] ▸ Core objects — CardGrid 8 cards (stagger 0.08s)│
│ [Band: plain] ▸ Why Origin instead of five tools — lead +     │
│                  CompareTable (real <table>, row hover)        │
│ [Band: glass] ▸ Roadmap — 5 phase cards (stagger)             │
│ [Band: plain] ▸ Frequently asked questions — FaqCards (4)     │
│ CTA BAND: Find your people. Build together. [Join the waitlist]│
├──────────────────────────────────────────────────────────────┤
│ Footer (unchanged)                                            │
└──────────────────────────────────────────────────────────────┘
```

- CompareTable: keep `data-testid="features-comparison-table"`; add row hover
  `background: rgba(24,27,33,0.6)` and a 2px gradient top border on the
  header row for a "hero" table header.
- FAQ JSON-LD (localized mirror) stays rendered by the view (unchanged).

### 8.2 `/community` — "Where people find each other"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + warm glow (F5A524 + 4F7DF9)             │
│  [The network]  community-scene.svg (clusters float + arcs)   │
│  H1 · Lead                                                    │
│  [HeroCta: Join the waitlist]  [Stat: 2,400+ Members]         │
├──────────────────────────────────────────────────────────────┤
│ [Band: glass] ▸ How we run the network — 4 value cards        │
│ [Band: plain] ▸ Example communities — intro + [Marquee: 7 chips] │
│ [Band: glass] ▸ Join the network — [Stat: 2,400+] + joinCopy +│
│                  inline CTA (AccentLink → /)                   │
│ [Band: plain] ▸ FAQ — FaqCards (5)                            │
│ CTA BAND (default)                                            │
└──────────────────────────────────────────────────────────────┘
```

- Keep `data-testid="community-members-stat"` on the count-up stat (the e2e
  and unit tests reference it).
- The example-community chips keep each name as visible text (unit test
  asserts `Book Clubs`); `[Marquee]` duplicates are `aria-hidden`.

### 8.3 `/docs` — "JoinOrigin docs"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + light-blue glow                         │
│  [Documentation]  docs-scene.svg (docs float + Matrix line)   │
│  H1 · Lead                                                    │
│  [HeroCta: Join the waitlist]                                 │
├──────────────────────────────────────────────────────────────┤
│ [Anchor] sticky: Concepts · Roadmap · Architecture · FAQ      │
│ [Band: glass] ▸ Concepts — CardGrid 8 cards (h3 per concept)  │
│ [Band: plain] ▸ Roadmap — 5 phase cards                       │
│ [Band: glass] ▸ Architecture & standards — 2 paragraphs       │
│ [Band: plain] ▸ FAQ — FaqCards (4)                            │
│ CTA BAND (default)                                            │
└──────────────────────────────────────────────────────────────┘
```

- Concepts keep `<h3>` per concept (LLM extraction contract; e2e heading
  hierarchy check stays green). Add `id` to each `SectionTitle` for AnchorNav.

### 8.4 `/about` — "The most valuable asset is your network"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + blue glow                               │
│  [Our mission]  about-scene.svg (heart graph float)           │
│  H1 · Lead                                                    │
│  [HeroCta: Join the waitlist]  [Trust: 2,400+ builders]       │
├──────────────────────────────────────────────────────────────┤
│ [Band: glass] ▸ Our mission — paragraph 1 + [Stat: 2,400+] +  │
│                  paragraph 2 (count-up on the waitlist figure)│
│ [Band: plain] ▸ Guiding principles — 4 cards                  │
│ [Band: glass] ▸ Founder guidance — framed Quote + founderBody │
│ [Band: plain] ▸ Deeper reading — AccentLink list              │
│ [Band: glass] ▸ FAQ — FaqCards (3)                            │
│ CTA BAND (default)                                            │
└──────────────────────────────────────────────────────────────┘
```

- The "2,400+ builders on the waitlist" figure from `about.missionParagraph2`
  becomes a `CountUpStat` between the two paragraphs (the sentence copy stays
  verbatim in the paragraph; the stat is decorative reinforcement — do NOT
  remove the sentence).

### 8.5 `/contact` — "Talk to us"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + blue glow (NO hero waitlist CTA)        │
│  [Contact]  contact-scene.svg (bubbles float + dot trail)     │
│  H1 · Lead                                                    │
├──────────────────────────────────────────────────────────────┤
│ [Band: glass] ▸ Send a message — form card (two-col on        │
│                  desktop: Name | Email · Message ·            │
│                  [Send via email] gradient pill)              │
│ [Band: plain] ▸ Other ways to reach us — AccentLink list      │
│ [Band: glass] ▸ FAQ — FaqCards (2)                            │
│ CTA BAND (default waitlist — this page still recruits)        │
└──────────────────────────────────────────────────────────────┘
```

- Form keeps `data-testid="contact-form"`, `mailto:` handler, focus rings.
  Wrap the form in a glass card (`SectionBand` content container,
  `max-width: 560px`).

### 8.6 `/privacy` — "Privacy Policy"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + green accent glow (NO hero CTA)         │
│  [Legal]  privacy-scene.svg (shield float + ring)             │
│  H1 · Lead (existing "What we collect" first paragraph)       │
├──────────────────────────────────────────────────────────────┤
│ [Anchor] sticky: What we collect · How we use it · Identity · │
│           Your rights · Contact                               │
│ plain sections (banded=false) — SectionTitles + BodyCopy     │
│ CTA BAND override: Questions about Origin? [Contact us] → /contact │
└──────────────────────────────────────────────────────────────┘
```

### 8.7 `/terms` — "Terms of Service"

```
┌──────────────────────────────────────────────────────────────┐
│ MENU HERO — ambient + muted blue glow (NO hero CTA)           │
│  [Legal]  terms-scene.svg (document float + balance ring)     │
│  H1 · Lead (existing Acceptance paragraph)                    │
├──────────────────────────────────────────────────────────────┤
│ [Anchor] sticky: Acceptance · Accounts · User content ·       │
│           Acceptable use · IP · Disclaimers · Changes · Contact│
│ plain sections (banded=false) — SectionTitles + BodyCopy     │
│ CTA BAND override: Questions about Origin? [Contact us] → /contact │
└──────────────────────────────────────────────────────────────┘
```

### 8.8 404 Boundary — `not-found.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│ 404 ROOT (min-height 100svh, centered flex column)            │
│   ambient layers: menu-ambient.webp (opacity 0.5) +           │
│   hero-grid.svg + notFound glow (PAGE_ACCENTS.notFound.glow)  │
│   not-found-scene.svg (broken-link node; float loop)          │
│   Brand mark + JoinOrigin wordmark                             │
│   404 gradient status                                          │
│   <h1>Page not found</h1>  (copy UNCHANGED)                    │
│   Copy paragraph (UNCHANGED)                                   │
│   [Back to home] primary gradient link                         │
│   [Explore communities →] secondary ghost link                 │
└──────────────────────────────────────────────────────────────┘
```

- Keep the self-contained `ThemeProvider`, no modal/API. Entrance fade-up
  stays; add the SVG float loop (reduced-motion safe via SVG media query).

---

## 9. SEO / JSON-LD Preservation Rules (non-negotiable)

1. **Server wrappers untouched:** `app/<page>/page.tsx` files keep their
   `Metadata` exports + `breadcrumbList` JSON-LD; the view files keep their
   localized `faqPage` JSON-LD via `<JsonLd>` — identical output to today.
2. **Single `<h1>`:** `MenuHero` is the only source of `<h1>` per page;
   views never render a second. e2e `toHaveCount(1)` must stay green.
3. **Landmarks:** one `<main>`; top `Header` is the only `header`; `Footer`
   unchanged; `AnchorNav` is a `nav` inside `<main>` (allowed — e2e uses
   `.first()`).
4. **Heading hierarchy:** h1 → h2 → h3 order preserved; no level skipped.
   `SectionTitle` stays `h2`, cards/FAQ questions stay `h3`.
5. **Visible FAQ:** FAQ blocks remain visible semantic `section` + `h3` + `p`
   (restyled as `FaqCard`) — mirrored 1:1 in FAQPage JSON-LD (unchanged).
6. **Word count:** every menu page keeps ≥150 words in `<main>` — the added
   hero CTA label, trust copy, and marquee (static-list AT copy) only increase
   it. The `/contact` `test.fail()` marker is owned by TASK-280
   (`fe-contact-copy`) — **do NOT touch it here**.
7. **Meta descriptions ≤160 chars, brand conventions, no money language:**
   unchanged (page.tsx untouched).
8. **LLM-friendliness:** keep real `<table>` on `/features`; keep `<h3>` per
   concept on `/docs`; keep the "social collaboration network" phrase in the
   leads (`/features`, `/community`, `/docs`, `/about`).

---

## 10. Implementation Rules (for `fe-menu-redesign`, TASK-282)

1. **Zero edits outside the redesign scope:** `page.tsx` wrappers,
   `Header.tsx`, `Footer.tsx`, `WaitlistModal/*`, `layout.tsx`, home page,
   SEO libs, sitemap/robots, and **all locale JSONs** (`packages/i18n/
   locales/*.json`) are NOT touched. `tests/e2e/tests/pages.spec.ts` marker
   for `/contact` belongs to TASK-280.
2. **Only these files change:** `MenuPageShell.tsx` (extend), `MenuHero.tsx`
   (extend), new `MenuScene.tsx` / `HeroCta.tsx` / `TrustRow.tsx` /
   `CountUpStat.tsx` / `ChipMarquee.tsx` / `SectionBand.tsx` / `AnchorNav.tsx`,
   extended `menuTokens.ts` + `menuPagePrimitives.ts`, the seven view files
   (`*view.tsx`), `not-found.tsx`, and the scene SVGs + new assets under
   `public/assets` (paths per §6). Tests added for each new component.
3. **Copy:** place ONLY existing i18n keys (`common.joinWaitlist`,
   `common.contactUs`, `home.hero.trustCopy`, `home.hero.trustAvatarsAlt`,
   `ctaBand.*`, page `*.hero.*`, `*.section*`, `common.faqHeading`,
   `community.joinStat*`). No new keys, no hardcoded visible strings.
4. **Images:** scenes via plain `<img src="/assets/menu/scenes/….svg"
   alt="" aria-hidden>`; ambient/grid via CSS `background-image` on the hero
   band; avatars via `next/image` (already the established pattern).
   Everything under `/assets/...` — zero CDN.
5. **Reduced motion:** every new animation respects the global kill-switch,
   `useReducedMotion`, and the SVG-internal `@media` block.
6. **Tests:** add unit tests for `MenuScene`, `HeroCta`, `TrustRow`,
   `CountUpStat` (parses localized value; falls back verbatim), `ChipMarquee`
   (aria-hidden duplicate track + sr-only list), `SectionBand`, `AnchorNav`;
   update `MenuHero.test.tsx` for the new props; keep all existing page tests
   green (`data-testid` references preserved).
7. **RTL:** use logical properties (`padding-inline-start`, `inset-inline-*`)
   for all new components; marquee direction stays LTR-compatible (use
   physical `translateX` with a `[dir="rtl"]` flip to `-translateX(50%)` if
   needed — check the marquee's visual direction under ar/fa).
8. **Home page untouched** (home remains the reference; TASK-282 acceptance).

---

## 11. Definition of Done (for TASK-282)

- [ ] All 7 menu pages + 404 render the homepage-atmosphere hero: ambient
      webp + dot grid + per-page glow + vignette + animated scene (float +
      orbit) — zero external CDN.
- [ ] Every hero (except legal pages) shows a `RotatingBorderButton`
      "Join the waitlist" opening the shared waitlist modal; privacy/terms
      show a ghost "Contact us" → `/contact`; `/contact` hero has no CTA but
      the page form + default CTA band recruit.
- [ ] Social proof present where spec'd: `TrustRow` on features/community/
      about; `CountUpStat` on community + about; `ChipMarquee` on community.
- [ ] Sticky `AnchorNav` on docs/privacy/terms; `SectionBand` rhythm on all
      content pages except privacy/terms (plain).
- [ ] Exactly one `<h1>` per page; single `<main>`; heading hierarchy intact;
      `page.tsx` wrappers (metadata + JSON-LD) byte-identical; locale JSONs
      untouched.
- [ ] `pnpm lint` 5/5, `pnpm typecheck` 5/5, `pnpm test`, `pnpm test:e2e`,
      `pnpm --filter @joinorigin/web build` all green; new component tests
      pass; existing page tests stay green.
- [ ] Home page, Header/Footer, WaitlistModal, and analytics wiring untouched.

---

## 12. Out of Scope / Follow-ups

1. **Copy additions** — intentionally zero; if a future sprint wants new hero
   sublines, it must add i18n keys across all 21 locales (arch-i18n process).
2. **`/contact` word-count marker** — owned by TASK-280 (`fe-contact-copy`);
   the redesign may close the gap organically but must not remove the marker.
3. **Analytics activation / switcher responsive fixes** — TASK-279 / TASK-278
   (parallel tasks, orthogonal).
4. **Logo + OG regeneration** — TASK-281 (`fe-asset-refresh`), same paths.
5. **Historical design docs** — untouched (records of past decisions).
6. **Design-doc index** — this spec adds a row to `app/docs/design/README.md`
   (doc-only, kept in sync by this producer).
