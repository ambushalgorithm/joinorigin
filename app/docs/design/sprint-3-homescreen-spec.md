# Sprint 3 — JoinOrigin Homescreen Build Spec

> **Parent:** [`../README.md`](../README.md) · **Reference prompt:** [`../references/sprint-3-landing-prompt.md`](../references/sprint-3-landing-prompt.md) (immutable starting prompt) · **Consumer:** `fe-landing-page` (TASK-202) · **Verifier:** `e2e-landing-page` (TASK-205)

## 1. Purpose

This document is the **build-ready specification** for the JoinOrigin single-page
homescreen. It is the JoinOrigin + Next.js App Router adaptation of the immutable
Marketeam React+Vite starting prompt (`app/docs/references/sprint-3-landing-prompt.md`).

The prompt's Marketeam identity (purple `#A068FF` accent, near-black `#060218`
background, "Unlock Top Marketing Talent…" headline) is remapped to the **JoinOrigin**
identity (primary blue `#4F7DF9` accent, dark `#0F1115` canvas, "Where teams find
their origin" headline). Layout, interactions, orbit visualization, ticker,
animation, and breakpoint mechanics are preserved 1:1 unless noted.

Every visual element is built on the shared monorepo conventions:

- **Next.js 14 App Router** + React 18 + React Native Web + `styled-components/native`.
- **`@joinorigin/design` tokens** (`theme.colors`, `theme.spacing`, `theme.radius`, `theme.fontWeights`, `theme.typography`, `theme.breakpoints`) for all values.
- **`@joinorigin/ui` base components** (`Screen`, `Badge`, `Text`, `Card`, `Button`, `LoadingIndicator`) where applicable; landing-specific widgets are web-local styled components.
- **Locally hosted assets** — every logo, avatar, partner mark, hero image, and font is served from `apps/web/public`; **no external CDN references at runtime**.

---

## 2. Design Foundations

### 2.1 Brand remap (Marketeam → JoinOrigin)

| Marketeam (source) | JoinOrigin (this spec) |
|---|---|
| Accent `#A068FF` (purple) | `colors.primary #4F7DF9` + gradient `#4F7DF9 → #8AB4FF` |
| Background `#060218` / `#070319` | `colors.background #0F1115` / `colors.surface #181B21` |
| Text dark `#000000` | `colors.text #F5F7FA` (light-on-dark inversion) |
| Text light `#ffffff` | `colors.text` / `colors.textMuted #9AA3B2` |
| "Marketeam" talent platform | JoinOrigin community collaboration platform |
| "20k+ Specialists" | "2,400+ Members" (consistent with trust copy) |

### 2.2 Theme tokens (from `@joinorigin/design`)

All colors/spacing/radius/weights come from the shared theme. Key tokens:

| Token | Value | Use |
|---|---|---|
| `colors.background` | `#0F1115` | Page background |
| `colors.surface` | `#181B21` | Cards, modal, chips, CTA fill |
| `colors.surfaceElevated` | `#22262E` | Raised cards, hover surfaces |
| `colors.border` | `#2C313A` | Hairlines, ring strokes |
| `colors.primary` | `#4F7DF9` | CTAs, active states, accent |
| `colors.primaryContrast` | `#FFFFFF` | CTA label |
| `colors.text` | `#F5F7FA` | Primary copy |
| `colors.textMuted` | `#9AA3B2` | Secondary copy |
| `colors.success` | `#30A46C` | Form success state |
| `colors.destructive` | `#E5484D` | Form error state |

Brand accent gradient (logo tile, heading highlight, orbit borders, rotating CTA borders):

```text
linear-gradient(135deg, #4F7DF9 0%, #8AB4FF 100%)
```

### 2.3 Typography

- **Body / UI:** `Inter` (weights 400/500/600/700) — hosted locally at `/fonts/inter.css`.
- **Display / headings:** `Urbanist` (weights 600/700) — hosted locally at `/fonts/urbanist.css`.
- Font loading: add `<link rel="stylesheet" href="/fonts/inter.css" />` and `<link rel="stylesheet" href="/fonts/urbanist.css" />` to `apps/web/app/layout.tsx` `<head>`. No Google Fonts network request at runtime.
- **Token extension (FE step):** add `fontFamilies: { sans: 'Inter', display: 'Urbanist' }` to `packages/design/src/typography.ts` (or a web-local equivalent keyed off theme tokens) and apply `font-family: Inter` to body text and `Urbanist` to the display heading/wordmark.
- **Landing display scale (FE step):** the prompt requires a 64px Urbanist hero heading — extend `packages/design/src/typography.ts` with `displayLg: 52`, `displayXl: 64` (line-heights 60/64); if reviewers prefer no shared-package change, define a web-local `landingTypography` map in `apps/web/components/` that reads colors/weights from theme and hardcodes only display font sizes. Exact hero heading style: **Urbanist 600, 64px, line-height 64px, letter-spacing -1.5px** (desktop).

### 2.4 Spacing / radius

Use `theme.spacing` (`xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, xxxl 48`) and `theme.radius` (`sm 8, md 12, lg 16`) tokens throughout. The prompt's fixed px paddings (e.g., header `24px 64px`) are mapped to token multiples (`lg/xl` and `xxxl` + `lg`).

---

## 3. Hosted Asset Inventory

All assets are committed under `apps/web/public/` and served at these absolute URLs at runtime. **Do not hotlink any external URL.**

| Asset | URL (browser path) | Source | Format | Size |
|---|---|---|---|---|
| Brand mark (icon) | `/assets/logo/joinorigin-mark.svg` | Designed in-house (JoinOrigin identity) | SVG | 96×96 |
| Brand lockup (mark + wordmark) | `/assets/logo/joinorigin-logo.svg` | Designed in-house | SVG | 232×48 |
| Legacy dark wordmark (light surfaces) | `/assets/logo/joinorigin-logo.png` | Generated raster | PNG (RGBA) | 268×48 |
| Avatar 1 | `/assets/avatars/avatar-01.png` | DiceBear-style avatar pack (royalty-free) | PNG (RGBA) | 96×96 |
| Avatar 2 | `/assets/avatars/avatar-02.png` | same | PNG (RGBA) | 96×96 |
| Avatar 3 | `/assets/avatars/avatar-03.png` | same | PNG (RGBA) | 128×128 |
| Avatar 4 | `/assets/avatars/avatar-04.png` | same | PNG (RGBA) | 96×96 |
| Avatar 5 | `/assets/avatars/avatar-05.png` | same | PNG (RGBA) | 128×128 |
| Avatar 6 | `/assets/avatars/avatar-06.png` | same | PNG (RGBA) | 96×96 |
| Avatar 7 | `/assets/avatars/avatar-07.png` | same | PNG (RGBA) | 128×128 |
| Avatar 8 | `/assets/avatars/avatar-08.png` | same | PNG (RGBA) | 128×128 |
| Avatar 9 | `/assets/avatars/avatar-09.png` | same | PNG (RGBA) | 96×96 |
| Partner logo 1 | `/assets/partners/partner-01.svg` | Custom wordmark (trademark-safe), 137×40 viewBox | SVG | wordmark |
| Partner logo 2 | `/assets/partners/partner-02.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 3 | `/assets/partners/partner-03.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 4 | `/assets/partners/partner-04.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 5 | `/assets/partners/partner-05.svg` | Custom wordmark | SVG | wordmark |
| Hero background | `/assets/hero/hero-background.webp` | Abstract dark indigo mesh (source prompt bg replacement) | WebP | 1280×720 |
| Inter CSS | `/fonts/inter.css` | Local @font-face manifest (rewritten) | CSS | — |
| Inter latin | `/fonts/inter/inter-latin.woff2` | Google Fonts (Inter v20), hosted locally | WOFF2 | 48 KB |
| Inter latin-ext | `/fonts/inter/inter-latin-ext.woff2` | Google Fonts (Inter v20), hosted locally | WOFF2 | 85 KB |
| Urbanist CSS | `/fonts/urbanist.css` | Local @font-face manifest (rewritten) | CSS | — |
| Urbanist latin | `/fonts/urbanist/urbanist-latin.woff2` | Google Fonts (Urbanist v18), hosted locally | WOFF2 | 28 KB |
| Urbanist latin-ext | `/fonts/urbanist/urbanist-latin-ext.woff2` | Google Fonts (Urbanist v18), hosted locally | WOFF2 | 17 KB |

**Asset usage rules:**

- Header wordmark = `joinorigin-mark.svg` (image, height 32px) + `JoinOrigin` text rendered in HTML with `fontFamilies.display` (Urbanist 700). Use `joinorigin-logo.svg` where an all-in-one image logo is required (OG image, splash, docs). Use `joinorigin-logo.png` only on light surfaces.
- Partner marks are **single-color grayscale** (`#747474` default fill, CSS `var(--fill-0)`); the ticker renders each at `width: 137px; height: 40px; object-fit: contain`, `opacity: 0.55` → `1` on hover; no per-logo recolor needed.
- Avatars are used inside white circular chips (ring of `#FFFFFF`, 2px) with the prompt's glow color per orbit (see §5.4); avatar image crops to fill the chip (`object-fit: cover`).
- Hero background is the **full-page background** (see §5.2): applied to the root app container, `background: url(/assets/hero/hero-background.webp) center center / cover no-repeat`, with the prompt's dark fallback `#0F1115` beneath.

---

## 4. Page Structure (top → bottom)

```text
┌────────────────────────────────────────────────────────────┐
│ HEADER (sticky, blurred)                                    │
│ [mark] JoinOrigin  Product Community Pricing Docs  Log In [⟳ Get Started] │
├────────────────────────────────────────────────────────────┤
│ HERO (min-height 100svh, two columns on desktop)            │
│  Left:  typewriter H1 (two-tone) · [Start Project ⟶]        │
│         cursor + member badge · supporting line · trust     │
│  Right: orbit circles viz (4 orbits + 9 avatar chips +       │
│         center count-up "2,400+ Members")                    │
├────────────────────────────────────────────────────────────┤
│ LOGO TICKER: "Trusted by teams at" + 5 partner marks ×4      │
│ (seamless infinite marquee, pause on hover)                  │
├────────────────────────────────────────────────────────────┤
│ FOOTER (slim): mark + tagline · [Join the waitlist] CTA      │
│ · © 2026 JoinOrigin · Privacy / Terms                        │
└────────────────────────────────────────────────────────────┘

EVERY CTA button anywhere on the page opens the SAME waitlist modal (§9).
```

Page shell uses the shared `Screen` from `@joinorigin/ui`; the body background is
`theme.colors.background`; the whole page is a single route: `/` (`apps/web/app/page.tsx`).

---

## 5. Section Specs

### 5.1 Header

| Aspect | Spec |
|---|---|
| Behavior | Sticky at top; `backdrop-filter: blur(16px)`; background `rgba(15,17,21,0.72)`; hairline bottom border `theme.colors.border`; `z-index: 50` |
| Layout | Flexbox row, `justify-content: space-between`, `align-items: center`; padding `24px 64px` desktop (token `theme.spacing.xl` / `theme.spacing.xxxl + lg`), `16px 20px` mobile; content `max-width: 1280px` centered |
| Left | Brand: `joinorigin-mark.svg` height 32px + wordmark `JoinOrigin` (Urbanist 700 `theme.colors.text`); then nav links |
| Nav links (desktop) | `Product`, `Community`, `Pricing`, `Docs` (hrefs `/#product`, `/#community`, `/#pricing`, `/#docs`). Style: Inter 400 15px `theme.colors.textMuted`; **underline animation on hover**: `::after` scaleX 0→1, transform-origin left, 0.3s ease; color → `theme.colors.text` |
| Right | `Log In` link: Inter 500 15px `theme.colors.text`, same underline hover; then primary CTA `Get Started` — **rotating-border button** (below); opens waitlist modal (§9) |
| Mobile nav | Hamburger toggle (24px icon, `theme.colors.text`); dropdown panel: `background: theme.colors.surface`, border `theme.colors.border`, radius `theme.radius.lg`, stacked links (Inter, min 44px hit target) + `Log In` + CTA. Close on link click / outside click / ESC |

**Rotating-border CTA (Get Started / Start Project / Join the waitlist):**

- Shell `.btn-border-wrap`: `position: relative; border-radius: 50px; overflow: hidden`.
- Rotating border via `::before`: `inset: -3px; padding: 3px;` with **mask technique** (border-only effect) — background: `conic-gradient(from var(--border-angle), #4F7DF9, #0F1115, #8AB4FF, #0F1115, #4F7DF9)`; rotate via CSS `@property --border-angle` from `0deg` to `360deg`, **3s linear infinite** (matches prompt's 3s; colors remapped to JoinOrigin).
- Button body: pill (border-radius 50px), background `theme.colors.surface` (`#181B21`, remapped from prompt `#060218`), label Inter 500/600 `theme.colors.text`, padding `12px 26px` 15px (Get Started) / `14px 28px` 16px (Start Project).
- **Hover fill slide:** `::after` accent fill (`#4F7DF9` at 0.9 opacity) slides in — Get Started/Join the waitlist: from left (`translateX(-100%)` → `0`), Start Project: from right (`translateX(100%)` → `0`) — `cubic-bezier(0.22, 1, 0.36, 1)`, 0.4s; label stays `theme.colors.text`.

### 5.2 Hero

| Aspect | Spec |
|---|---|
| Region | `min-height: calc(100svh - 72px)`; `position: relative; overflow: hidden`; root container has the **full-page background image** (`/assets/hero/hero-background.webp`, `center center / cover no-repeat`) exactly as the prompt's `.app` background, with fallback `theme.colors.background` |
| Overlays | 1) CSS radial glows: `radial-gradient(600px at 78% 22%, rgba(79,125,249,0.22), transparent 70%)` and `radial-gradient(500px at 12% 88%, rgba(138,180,255,0.12), transparent 70%)`; 2) bottom vignette `linear-gradient(180deg, transparent, rgba(15,17,21,0.6))` |
| Layout | Flexbox row (prompt uses flex): left `flex: 0 1 600px` + right; `gap: 48px`; `max-width: 1280px`; padding `96px 64px 64px`. Below `1024px`: `flex-direction: column` (stack; see §8) |
| Vertical rhythm | Left and right columns aligned center vertically |

### 5.3 Hero — left column

| Element | Spec |
|---|---|
| Typewriter H1 | `TypewriterHeading` component. Urbanist 600, **64px, line-height 64px, letter-spacing -1.5px**, `theme.colors.text`. **Copy:** `Where teams find their origin` — two-tone: the first 23 characters (`Where teams find their `) `theme.colors.text` as a **block line**, the remainder (`origin`) in the accent gradient (`linear-gradient(135deg,#4F7DF9,#8AB4FF)`, `background-clip: text`), **capitalized and wrapped onto the next line** (user tweak 058007e). **Mechanics:** types char-by-char at **35ms/char** (prompt speed), starts after **400ms delay**; blinking caret (`▍`, accent `#4F7DF9`, `@keyframes blink` 1s steps) during typing, retains after completion; `prefers-reduced-motion: reduce` → render full text instantly (no typing) |
| Start Project button | `RotatingBorderButton` variant (prompt-style): pill, bg `theme.colors.surface`, padding `14px 28px`, 16px Inter 600 `theme.colors.text`, **right-arrow chevron SVG 18×18** after label, hover fill slides from right (accent), rotating conic border (§5.1). **Appears after typing finishes** (entrance delay ≈ 3.2s, see §7). Opens waitlist modal |
| Cursor element | ~~Purple-cursor equivalent: an SVG pointer arrow filled `theme.colors.primary` + a member badge pill: bg `theme.colors.primary`, white text (`theme.colors.primaryContrast`), Inter 500 16px, padding `8px 16px`, border-radius 20px, label `Maya`. Positioned floating inside the left column (`margin-left: 290px; margin-top: 40px` per prompt geometry, responsive: hidden below 480px). Appears with entrance delay ≈ 3.6s~~ — **removed** by user tweak 058007e (kept in this spec for history; not implemented) |
| Supporting line *(JoinOrigin addition)* | Inter 400 18px, line-height 1.6, `theme.colors.textMuted`, `max-width: 540px`. Copy: `JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.` |
| Trust line *(JoinOrigin addition)* | Row of 9 overlapping avatar chips (48px circles, white ring 2px, `margin-left: -12px`, `object-fit: cover`) + `Join 2,400+ builders already collaborating` (Inter 500 14px `theme.colors.textMuted`). Uses the same 9 avatars as the orbit viz |

### 5.4 Hero — right column: orbit circles visualization

A web-local `OrbitViz` component (720×720 container). Pure CSS/JS; no animation libraries.

| Aspect | Spec |
|---|---|
| Container | `720×720px`, centered; scaled with `transform: scale()` at breakpoints (§8) |
| Orbits | **4 concentric circles**, each with a **1px gradient border** via the mask technique: `linear-gradient(180deg, rgba(79,125,249,0) 0%, rgba(79,125,249,1) 43%, rgba(79,125,249,0) 100%)`. Diameters + spin (prompt 1:1, remapped accent): Orbit 1 (innermost) **353px**, spins **counterclockwise 30s**; Orbit 2 **501px**, **clockwise 40s**; Orbit 3 **649px**, **clockwise 50s**; Orbit 4 (outermost) **797px**, **counterclockwise 60s** |
| Center circle (orbit-1 hub) | Count-up number **`2,400+`** (Urbanist 500 64px `theme.colors.text`) + label `Members` (Urbanist 600 16px `theme.colors.textMuted`). The hub **counter-rotates** to stay upright while orbit 1 spins |
| Count-up mechanics | `useCountUp` hook: animates 0 → 2,400 over **2s** with `easeOutCubic`, starts after **1.2s** delay (prompt values); formats with thousands separator; reduced motion → snap to target |
| Avatar placement | 9 avatar chips positioned with the prompt's transform pattern `translate(-50%, -50%) rotate(Xdeg) translate(radius) rotate(-Xdeg)`; chips: white ring 2px; base 58px, some 78px/88px (use 58px for orbit-1, 78px for orbit-2, 88px for orbits 3-4 as per prompt); **glow** per orbit: orbit-1 purple glow → `rgba(79,125,249,0.5)` shadow; orbit-2 yellow → `rgba(245,165,36,0.45)`; orbit-3 pink → `rgba(229,72,77,0.45)`; orbit-4 blue/orange per prompt: blue `rgba(79,125,249,0.5)` / orange `rgba(245,165,36,0.5)`. Mapping (orbit, angle, radius): orbit 1: 270° r=177 (avatar-01); orbit 2: 60° r=251 (02), 180° r=251 (03), 300° r=251 (04); orbit 3: 130° r=325 (05); orbit 4: 30° r=399 (06), 95° r=399 (07), 220° r=399 (08), 320° r=399 (09) |
| Avatar fly-in | Each chip animates **scale 0.3 → 1 + rotate -180deg → 0 + blur(8px) → none**, staggered delays **0.6s → 2.3s** (per-chip increments) — prompt 1:1 |
| Reduced motion | All orbit spins + fly-ins disabled; static layout with avatars at final positions |

### 5.5 Logo ticker

| Aspect | Spec |
|---|---|
| Region | Above footer; padding `64px 0`; centered |
| Label | `Trusted by teams at` (Inter 500 13px, `letter-spacing: 0.14em`, uppercase, `theme.colors.textMuted`) |
| Marquee | Strip of the **5 partner logos repeated 4×** for a seamless loop (prompt 1:1); CSS `@keyframes marquee` translating `0 → -50%`, **20s** linear infinite; strip = `display:flex; gap: 64px; align-items: center` |
| Logos | Each partner `<Image>` `width: 137px; height: 40px; object-fit: contain; opacity: 0.55`; hover on the marquee pauses animation (`:hover { animation-play-state: paused }`); each logo opacity → 1 with 0.2s transition |
| Edge fade | Mask on the marquee: `mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)` |
| Reduced motion | Marquee disabled; static strip centered with wrap |

### 5.6 Footer (slim)

- Row: brand (mark 24px + `JoinOrigin` Urbanist 600) · tagline `Where work finds its origin` (Inter 400 14px `theme.colors.textMuted`) · spacer · `Join the waitlist` `RotatingBorderButton` (opens modal) · small links `Privacy` / `Terms` (Inter 500 14px, hover underline) · `© 2026 JoinOrigin` (Inter 400 13px `theme.colors.textMuted`).
- Border-top 1px `theme.colors.border`; padding `32px 24px`; `max-width: 1280px` centered; stacks vertically on mobile.

---

## 6. Copy Manifest (exact strings)

| Slot | Copy |
|---|---|
| Nav | `Product` · `Community` · `Pricing` · `Docs` |
| Header link | `Log In` |
| Header CTA | `Get Started` |
| H1 typed | `Where teams find their origin` (first 23 chars body color, remainder gradient — capitalized on its own block line) |
| Subcopy | `JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.` |
| Primary CTA | `Start Project` (+ 18×18 chevron icon) |
| ~~Member badge~~ | ~~`Maya`~~ — removed by user tweak 058007e |
| Trust | `Join 2,400+ builders already collaborating` |
| Count-up | `2,400+` `Members` |
| Ticker label | `Trusted by teams at` |
| Footer tagline | `Where work finds its origin` |
| Footer CTA | `Join the waitlist` |
| Footer links | `Privacy` · `Terms` |
| Copyright | `© 2026 JoinOrigin` |

---

## 7. Entrance Animation Spec

Timing starts on page mount. Use CSS `@keyframes` + `animation-delay`; JS only for typewriter + count-up. All eased with `cubic-bezier(0.22, 1, 0.36, 1)` unless noted (prompt 1:1).

| Element | Animation | Delay | Duration | Easing |
|---|---|---|---|---|
| Header | fade-down: opacity 0→1, translateY(-20px → 0) | 0ms | 0.8s | cubic-bezier(0.22,1,0.36,1) |
| Hero left column | fade-up: opacity 0→1, translateY(40px → 0) | 0ms | 1s | cubic-bezier(0.22,1,0.36,1) |
| Typewriter H1 | typing starts (own JS timeline) | 400ms | 35ms/char | — |
| Start Project | fade-up after typing completes | ~3.2s | 0.6s | cubic-bezier(0.22,1,0.36,1) |
| Cursor + member badge | fade-in (scale 0.9 → 1) | ~3.6s | 0.5s | cubic-bezier(0.22,1,0.36,1) |
| Hero right (orbits) | scale-in: opacity 0→1, scale 0.85 → 1 | 0.3s | 1.2s | cubic-bezier(0.22,1,0.36,1) |
| Avatar chips | fly-in: scale 0.3→1, rotate -180°→0, blur 8px→0 | 0.6s → 2.3s (stagger per chip) | 0.8s | cubic-bezier(0.22,1,0.36,1) |
| Logo ticker | fade-up | 0.6s | 0.7s | cubic-bezier(0.22,1,0.36,1) |
| Footer | fade-in | 1.1s | 0.5s | ease-out |

**Reduced motion:** with `@media (prefers-reduced-motion: reduce)` disable all entrance/orbit/marquee/blink animations and snap typewriter/count-up to final values. Provide a global `motion` utility + `useReducedMotion` hook (web: `window.matchMedia('(prefers-reduced-motion: reduce)')`).

**Mount safety:** elements start invisible (`opacity: 0`) only when an animation is active; if JS fails, content must still render — apply entrance classes after `useEffect` mounts (progressive enhancement), never hide content with CSS alone.

---

## 8. Responsive Breakpoints

Source of truth: `theme.breakpoints` = `mobile 480`, `tablet 768`, `desktop 1024`, `wide 1280` (min-width). The prompt's scaling rules are preserved as `max-width` media queries with `transform: scale()` on the orbit container:

| Viewport (max-width) | Layout | Heading | Orbit scale | Header |
|---|---|---|---|---|
| `> 1280px` | two columns | 64px | 1.0 (720px) | full nav |
| `≤ 1280px` | two columns | 64px | **0.85** | full nav |
| `≤ 1024px` | **stack (flex-direction column)**, hero right below left | **48px** | **0.7** | nav gap shrinks |
| `≤ 768px` | stacked | **36px** | **0.5** | **hide nav** → hamburger |
| `≤ 480px` | stacked | **28px** | **0.4** | hamburger; smaller buttons/logos (partner logos height 32px, Start Project full-width) |

Breakpoint strategy: implement `@media (max-width: 1280px)`, `(max-width: 1024px)`, `(max-width: 768px)`, `(max-width: 480px)` per the prompt's scale semantics; use token numbers (`theme.breakpoints`) where min-width semantics are needed for other layout switches.

---

## 9. Any-Button Modal + CSV Capture Flow

### 9.1 Trigger contract ("any button")

Every CTA across the page opens the **same** `WaitlistModal`:

- Header `Get Started`
- Hero `Start Project`
- Footer `Join the waitlist`
- (Future-proof) any element with `data-open-waitlist`

Implementation: a single `WaitlistModalProvider` (web-local context) exposes `openWaitlist()`; all CTAs call it. The modal renders once at page level.

### 9.2 Modal spec

| Aspect | Spec |
|---|---|
| A11y | `role="dialog"` `aria-modal="true"` `aria-labelledby` heading; focus moves to modal on open, returns to trigger on close; ESC / backdrop click / ✕ button close; focus trap within modal; errors surfaced via inline `role="alert"` + `aria-live` |
| Structure | Backdrop: `rgba(15,17,21,0.72)` + `backdrop-filter: blur(6px)`, `z-index: 100`. Card: `theme.colors.surface`, radius `theme.radius.lg` (16px), border 1px `theme.colors.border`, padding 32px, `max-width: 440px`, width 100%, centered; entrance: fade + scale 250ms |
| Content | 1) Heading: `Join the waitlist` (Urbanist 700 24px `theme.colors.text`) · 2) Subcopy: `Be first in line for early access. We'll email you when your workspace is ready.` (Inter 400 15px `theme.colors.textMuted`) · 3) Form: `Name` (text input), `Email` (email input, `inputMode="email"`, `autoComplete="email"`) · 4) Submit button `Request access` (primary, 48px, full width, loading spinner via shared `LoadingIndicator` while submitting) · 5) Legal note: `No spam. Unsubscribe anytime.` (Inter 400 12px `theme.colors.textMuted`) |
| Inputs | Web-local `Input` primitive (or add `Input` to `@joinorigin/ui`): 48px height, `theme.colors.surfaceElevated` background, 1px `theme.colors.border` → `theme.colors.primary` on focus (+ ring `box-shadow: 0 0 0 3px rgba(79,125,249,0.25)`), radius `theme.radius.md`, Inter 400 16px `theme.colors.text`, label above (Inter 500 13px `theme.colors.textMuted`) |
| States | **Idle** → **Submitting** (buttons disabled, spinner) → **Success** (replace form with check icon (SVG inline, `theme.colors.success`) + `You're on the list!` heading + `We'll email you when your workspace is ready.` + `Done` button closing modal) or **Error** (inline field errors + top-level banner `Something went wrong. Please try again.`, modal stays open) |
| Reset | Modal content resets to Idle every open |

### 9.3 CSV capture — API contract

**Route (FE builds):** `POST /api/leads` — Next.js App Router route handler at `apps/web/app/api/leads/route.ts` (Node runtime).

**Request**

```http
POST /api/leads
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

**Success response**

```http
200 OK
Content-Type: application/json

{ "ok": true }
```

**Validation & error responses** (400 Bad Request):

```json
{ "ok": false, "error": { "field": "email", "message": "Enter a valid email address." } }
{ "ok": false, "error": { "field": "name", "message": "Name is required." } }
{ "ok": false, "error": { "field": "form", "message": "Name and email are required." } }
```

- `name`: required, trimmed, 1–120 chars.
- `email`: required, trimmed, lowercased, must pass a standard email regex (e.g., `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- Unexpected server errors → `500 { "ok": false, "error": { "field": "form", "message": "Something went wrong." } }`.

**CSV file contract**

- Path: `apps/web/data/leads.csv` (created by the route if missing; header row written on creation).
- Columns: `timestamp,name,email` — RFC 4180 quoting (fields containing `,`, `"`, `\n` are quoted; `"` doubled). `timestamp` is ISO-8601 UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- Append-only: each successful submission appends exactly one row. Use `fs.appendFile` (serialized with a simple in-process promise queue to avoid interleaved writes).
- Header row example:
  ```csv
  timestamp,name,email
  2026-08-10T18:45:00.000Z,"Ada Lovelace",ada@example.com
  ```
- The initial `leads.csv` (with only the header row) is committed to the repo so e2e can assert appends; runtime rows persist in the working tree (tracking policy for the sprint: keep the file tracked so e2e can verify).

**Request guards (FE implements):**

- `POST` only (405 for others).
- `Content-Type: application/json` enforced; body parsed with `request.json()` wrapped in try/catch → 400 on parse failure.
- Basic in-process rate limit: max 10 submissions per IP per minute (Map<ip, timestamps>); over limit → `429 { "ok": false, "error": { "field": "form", "message": "Too many requests. Try again in a minute." } }`.
- Body size limit: reject bodies > 10 KB with 413.
- CSV write must not throw unhandled; on write failure return 500 (never leak file paths in the response).

---

## 10. Component Mapping & File Layout

### 10.1 Shared packages usage

| UI need | Source |
|---|---|
| Page shell / background | `Screen` from `@joinorigin/ui` |
| Badge | `Badge` (tone `primary`) from `@joinorigin/ui` (member badge may be web-local pill for prompt styling) |
| Text | `Text` (variant/weight/color) from `@joinorigin/ui` |
| Cards | `Card` where a raised surface is needed (modal card may use tokens directly) |
| Button | `Button` (variant `secondary`) where style fits; `RotatingBorderButton` + ghost are web-local styled components |
| Loading | `LoadingIndicator` from `@joinorigin/ui` (modal submit) |
| Theme | All tokens via `@joinorigin/design` `theme` (ThemeProvider already in `app/page.tsx`) |

### 10.2 New web-local files (FE creates; spec defines responsibility)

```text
apps/web/
├── app/
│   ├── layout.tsx                # + local font <link>s, metadata update
│   ├── page.tsx                  # compose HomePage sections + WaitlistModalProvider
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # POST /api/leads → CSV append (§9.3)
├── components/
│   ├── Header.tsx                # sticky header, nav, Log In, hamburger, RotatingBorderButton
│   ├── RotatingBorderButton.tsx  # conic-gradient border CTA + slide-in fill (§5.1)
│   ├── Hero.tsx                  # hero flex layout + full-page bg + overlays (§5.2)
│   ├── HeroLeft.tsx              # TypewriterHeading, Start Project, subcopy, trust (§5.3)
│   ├── TypewriterHeading.tsx     # JS typewriter + caret + two-tone coloring (§5.3)
│   ├── OrbitViz.tsx              # 4 orbits, 9 avatar chips, center hub (§5.4)
│   ├── useCountUp.ts             # rAF count-up hook (0→2400, 2s, easeOutCubic) (§5.4)
│   ├── LogoMarquee.tsx           # ticker, 5 logos ×4 (§5.5)
│   ├── Footer.tsx                # slim footer (§5.6)
│   ├── WaitlistModal/
│   │   ├── WaitlistModalProvider.tsx  # context + render-once modal (§9)
│   │   ├── WaitlistModal.tsx          # dialog, states, focus trap (§9.2)
│   │   └── leadsApi.ts                # typed fetch wrapper for POST /api/leads
│   └── motion.ts                 # keyframes + useReducedMotion + entrance helper (§7)
└── data/
    └── leads.csv                 # committed header-row-only CSV (§9.3)
```

### 10.3 Implementation rules

- Every color/spacing/radius/font-weight reads from `theme` (no raw hex literals outside tokens; the two accent gradient hexes `#4F7DF9`/`#8AB4FF`, the orbit glow rgba values, and the conic-gradient stop colors are defined once in a `landingTokens` module and reused).
- Components use `styled-components/native` (consistent with existing app/package code); images use `next/image` with `unoptimized={false}` default; static assets referenced by absolute URL path (`/assets/...`).
- `next.config.mjs` already sets `transpilePackages` for shared packages — no new config expected; do not add `next/font/google` (fonts are local files).
- All new components get unit tests (Jest + React Testing Library, mirroring `apps/web/app/page.test.tsx` patterns): header render/nav, typewriter final text, `useCountUp` target values, marquee presence, modal open-from-any-button, modal submit success/error, API route unit tests (mock `fs`/runtime or integration against a temp CSV).
- Keep `pnpm lint` and `pnpm typecheck` green for `@joinorigin/web` and the monorepo.

---

## 11. Definition of Done (for TASK-202)

- [ ] Homepage renders per this spec: header (nav underline hovers, `Log In`, rotating-border `Get Started`), typewriter two-tone H1, `Start Project` with chevron + rotating border, orbit circles viz (4 orbits, 9 avatars, count-up `2,400+ Members`), logo ticker (5 marks ×4), entrance animations, responsive breakpoints. (The cursor + member badge from the original prompt is intentionally **not** rendered — removed by user tweak 058007e.)
- [ ] All assets referenced by local `/assets/...` and `/fonts/...` paths; no external CDN URL in client runtime code or CSS.
- [ ] Fonts load locally (Inter + Urbanist) and apply (body Inter, display Urbanist).
- [ ] Any CTA button opens the waitlist modal; submitting name+email POSTs to `/api/leads`; CSV row appended (verified in unit + e2e).
- [ ] API returns documented 200/400/429/500 shapes.
- [ ] `prefers-reduced-motion` respected.
- [ ] Lint + typecheck green; unit tests added; e2e coverage present (TASK-205).

---

## 12. Open Questions / Assumptions

| # | Item | Assumption |
|---|---|---|
| 1 | Source prompt assets | The prompt's original Figma-hosted avatar/partner URLs are **not** hotlinked; JoinOrigin-adapted equivalents (DiceBear-style avatars, trademark-safe custom wordmarks, dark indigo hero bg) are hosted locally under `apps/web/public` per the sprint's "no external CDN" rule. |
| 2 | Partner logos | Custom trademark-safe wordmark SVGs used (no real brand marks) per license safety; ticker copy `Trusted by teams at` works with abstract marks. |
| 3 | JoinOrigin additions | Supporting subcopy, trust line, slim footer, waitlist modal + CSV flow are JoinOrigin/Next.js adaptations beyond the raw prompt surface (required by TASK-201/202 acceptance criteria). |
| 4 | `leads.csv` lifecycle | Committed with header only; runtime rows stay in working tree (sprint-scope). PM to decide tracking policy beyond the sprint. |
| 5 | Shared token additions (`fontFamilies`, `displayLg/displayXl`) | FE may add to `@joinorigin/design` or keep web-local; either satisfies "shared conventions" as long as colors/spacing/weights come from tokens. |
