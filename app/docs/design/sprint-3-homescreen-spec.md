# Sprint 3 — JoinOrigin Homescreen Build Spec

> **Parent:** [`../README.md`](../README.md) · **Reference prompt:** [`../references/sprint-3-landing-prompt.md`](../references/sprint-3-landing-prompt.md) (immutable user starting prompt) · **Consumer:** `fe-landing-page` (TASK-202) · **Verifier:** `e2e-landing-page` (TASK-205)

## 1. Purpose

This document is the **build-ready specification** for the JoinOrigin single-page
homescreen. It adapts the Marketeam/React+Vite starting prompt
(`app/docs/references/sprint-3-landing-prompt.md`) to:

- **JoinOrigin branding** — dark, premium, community-first identity ("Where work finds its origin").
- **The Next.js App Router monorepo** at `app/` (Next.js 14 + React 18 + React Native Web + styled-components/native).
- **Shared design conventions** — `@joinorigin/design` tokens and `@joinorigin/ui` base components.
- **Locally hosted assets** — every logo, avatar, partner mark, hero image, and font is served from `apps/web/public`; **no external CDN references at runtime**.

The frontend engineer (TASK-202) implements this spec verbatim. The e2e engineer
(TASK-205) verifies against it.

> **Note on the source prompt:** at design time, `app/docs/references/sprint-3-landing-prompt.md` was not present in the repo. This spec was reconstructed from the authoritative sprint handoff (`agent-core/handoffs/joinorigin-dev/tasks.md` TASK-201/TASK-202 acceptance criteria) which enumerates the exact prompt surface: header (rotating-border CTA, underline hovers), hero left (typewriter heading, Start Project button, cursor badge), hero right (orbit circles visualization with count-up + avatars), logo ticker, entrance animations, responsive breakpoints, and any-button modal (name/email → CSV via Next.js API route). If the source file is later placed, it is the canonical design intent; this spec stands as the JoinOrigin adaptation.

---

## 2. Design Foundations

### 2.1 Brand voice

- **Positioning:** JoinOrigin is the collaboration platform where teams, projects, and ideas find their origin. Community-first, builder-focused, trustworthy.
- **Tone:** ambitious but grounded; premium dark UI with a confident blue accent.
- **Primary CTA copy:** `Start Project` / header CTA `Get Started` / modal submit `Join the waitlist`.

### 2.2 Theme tokens (from `@joinorigin/design`)

All colors/spacing/radius/weights come from the shared theme (`theme.colors`, `theme.spacing`, `theme.radius`, `theme.fontWeights`, `theme.breakpoints`). Key tokens:

| Token | Value | Use |
|---|---|---|
| `colors.background` | `#0F1115` | Page background |
| `colors.surface` | `#181B21` | Cards, modal, chips |
| `colors.surfaceElevated` | `#22262E` | Raised cards, hover surfaces |
| `colors.border` | `#2C313A` | Hairlines, ring strokes |
| `colors.primary` | `#4F7DF9` | CTAs, active states, gradient anchor |
| `colors.primaryContrast` | `#FFFFFF` | CTA label |
| `colors.text` | `#F5F7FA` | Primary copy |
| `colors.textMuted` | `#9AA3B2` | Secondary copy |
| `colors.success` | `#30A46C` | Form success state |
| `colors.destructive` | `#E5484D` | Form error state |

Accent gradient for brand elements (logo tile, hero glows, rotating border):

```text
linear-gradient(135deg, #4F7DF9 0%, #8AB4FF 100%)
```

### 2.3 Typography

- **Body / UI:** `Inter` (weights 400/500/600/700) — hosted locally at `/fonts/inter.css`.
- **Display / headings:** `Urbanist` (weights 600/700/800) — hosted locally at `/fonts/urbanist.css`.
- Font loading: add both local stylesheets to `apps/web/app/layout.tsx` `<head>` via `<link rel="stylesheet" href="/fonts/inter.css" />` and `/fonts/urbanist.css` (Next.js serves `public/` at root). No Google Fonts network request at runtime.
- **Token extension (FE step):** add `fontFamilies: { sans: 'Inter', display: 'Urbanist' }` to `packages/design/src/typography.ts` (or a web-local equivalent keyed off theme tokens) and apply `font-family: Inter` to body text and `Urbanist` to the display heading/wordmark.
- **Landing display scale (FE step):** extend `packages/design/src/typography.ts` with `displayLg: 52`, `displayXl: 64` (line-heights 60/72) used by the hero typewriter heading; keep existing token variants for everything else. If reviewers prefer no shared-package change, define a web-local `landingTypography` map in `apps/web/components/` that reads colors/weights from theme and hardcodes only the display font sizes.

### 2.4 Spacing / radius

Use `theme.spacing` (`xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, xxxl 48`) and `theme.radius` (`sm 8, md 12, lg 16`) tokens throughout. Landing-specific gutters may use multiples of tokens (e.g., `theme.spacing.xxxl * 2` = 96px hero vertical padding).

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
| Partner logo 1 | `/assets/partners/partner-01.svg` | Custom wordmark (trademark-safe) | SVG | wordmark |
| Partner logo 2 | `/assets/partners/partner-02.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 3 | `/assets/partners/partner-03.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 4 | `/assets/partners/partner-04.svg` | Custom wordmark | SVG | wordmark |
| Partner logo 5 | `/assets/partners/partner-05.svg` | Custom wordmark | SVG | wordmark |
| Hero background | `/assets/hero/hero-background.webp` | Abstract dark indigo mesh | WebP | 1280×720 |
| Inter CSS | `/fonts/inter.css` | Local @font-face manifest (rewritten) | CSS | — |
| Inter latin | `/fonts/inter/inter-latin.woff2` | Google Fonts (Inter v20), hosted locally | WOFF2 | 48 KB |
| Inter latin-ext | `/fonts/inter/inter-latin-ext.woff2` | Google Fonts (Inter v20), hosted locally | WOFF2 | 85 KB |
| Urbanist CSS | `/fonts/urbanist.css` | Local @font-face manifest (rewritten) | CSS | — |
| Urbanist latin | `/fonts/urbanist/urbanist-latin.woff2` | Google Fonts (Urbanist v18), hosted locally | WOFF2 | 28 KB |
| Urbanist latin-ext | `/fonts/urbanist/urbanist-latin-ext.woff2` | Google Fonts (Urbanist v18), hosted locally | WOFF2 | 17 KB |

**Asset usage rules:**

- Header wordmark = `joinorigin-mark.svg` (image) + `JoinOrigin` text rendered in HTML with `fontFamilies.display` (Urbanist 700). Use `joinorigin-logo.svg` where an all-in-one image logo is required (OG image, splash, docs). Use `joinorigin-logo.png` only on light surfaces.
- Partner marks are **single-color grayscale** (`#747474` default fill, CSS `var(--fill-0)`). The ticker renders them with `opacity: 0.55` → `1` on hover; no per-logo recolor needed.
- Avatars are used inside white circular chips (ring of `#FFFFFF`, 2px) so the light illustration reads on the dark hero; the avatar image is cropped to fill the chip (`object-fit: cover`).
- Hero background is used as the hero `<Image>` layer (absolute, cover, `opacity: 0.9`) **under** the CSS gradient glows (see §5.2). It must be lazy-friendly (`loading="eager"` for LCP, `fetchPriority="high"`).

---

## 4. Page Structure (top → bottom)

```text
┌────────────────────────────────────────────────────────────┐
│ HEADER (sticky, blurred)                                    │
│ [mark] JoinOrigin   Product Community Pricing Docs   [⟳ Get Started] │
├────────────────────────────────────────────────────────────┤
│ HERO (min-height 100svh, two columns on desktop)            │
│  Left:  [New] badge · typewriter H1 · supporting copy       │
│         [Start Project] [Book a call] · trust line          │
│  Right: orbit circles viz (animated rings + avatar chips     │
│         + center stat card with count-up numbers)            │
├────────────────────────────────────────────────────────────┤
│ LOGO TICKER: "Trusted by teams at" + 5 partner wordmarks     │
│ (infinite marquee, pause on hover)                           │
├────────────────────────────────────────────────────────────┤
│ FOOTER (slim): mark + tagline · [Join the waitlist] CTA      │
│ · © 2026 JoinOrigin · links                                  │
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
| Height | 72px desktop, 64px mobile |
| Layout | `max-width: 1280px` centered; `display:flex; justify-content: space-between; align-items: center`; horizontal padding `theme.spacing.xxl` (24px) desktop / `theme.spacing.lg` (16px) mobile |
| Left | Brand: `joinorigin-mark.svg` 32×32 + wordmark `JoinOrigin` in Urbanist 700 `theme.colors.text` (text links to `/`) |
| Center nav (desktop only) | Links: `Product`, `Community`, `Pricing`, `Docs` (hrefs `/#product`, `/#community`, `/#pricing`, `/#docs`). Base: Inter 500 15px `theme.colors.textMuted`; **underline hover**: 2px bottom underline scaling 0→100% width (`::after` transform scaleX), color transitions to `theme.colors.text` |
| Right | Primary CTA `Get Started` — **rotating-border button** (see below); opens waitlist modal (§9). On mobile, nav links collapse into a simple hamburger toggling a dropdown panel (same links + CTA) |
| Mobile nav | Toggle button (hamburger icon, 24px, `theme.colors.text`); dropdown panel below header: `background: theme.colors.surface`, border `theme.colors.border`, radius `theme.radius.lg`, stacked links (Inter 500, min 44px hit target), CTA button at bottom. Close on link click / outside click / ESC |

**Rotating-border CTA (Get Started):**

- Outer shell: 48px height, padding 1px, radius 999px, background = **animated conic-gradient** (`conic-gradient(from var(--angle), #4F7DF9, #8AB4FF, #4F7DF9)`) rotating via CSS `@property --angle` keyframes (`0deg → 360deg`, 4s linear infinite).
- Inner: fills shell with `theme.colors.background` (radius 999px) and holds label `Get Started` (Inter 600 15px `theme.colors.text`).
- Hover: slight lift (`translateY(-1px)`), glow `box-shadow: 0 0 24px rgba(79,125,249,0.35)`.
- Implement as a web-local styled component (`RotatingBorderButton`) so the same visual can be reused for hero `Start Project` and footer CTAs.

### 5.2 Hero

| Aspect | Spec |
|---|---|
| Region | `min-height: calc(100svh - 72px)`; centered; `position: relative; overflow: hidden` |
| Background layers (top→bottom) | 1) `hero-background.webp` `<Image>` absolute inset-0 cover, opacity 0.9; 2) CSS radial glows: `radial-gradient(600px at 78% 22%, rgba(79,125,249,0.22), transparent 70%)` and `radial-gradient(500px at 12% 88%, rgba(138,180,255,0.12), transparent 70%)`; 3) vignette `linear-gradient(180deg, rgba(15,17,21,0.35), rgba(15,17,21,0.85))` |
| Layout | Grid: `grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr)`; gap 48px; `max-width: 1280px`; padding `96px 24px 64px`. Below `768px`: single column, hero right renders **after** hero left, orbit viz scaled down (see §8) |
| Vertical rhythm | Left and right columns aligned center vertically |

### 5.3 Hero — left column

| Element | Spec |
|---|---|
| Cursor badge | Pill (`Badge` from `@joinorigin/ui`, tone `primary`): 28px height, radius 999px, background `rgba(79,125,249,0.14)`, border 1px `rgba(79,125,249,0.35)`; content: small blinking caret `▍` (CSS blink keyframe, 1s steps, color `theme.colors.primary`) + label `New: Community spaces are live` (Inter 500 13px, `theme.colors.primary`-tinted text `#A8C0FF`) |
| Typewriter H1 | Urbanist 700/800, `displayXl` (64px desktop / 40px mobile), line-height 1.08, `theme.colors.text`; final line gradient text (`linear-gradient(135deg,#4F7DF9,#8AB4FF)` with `background-clip: text`). **Copy:** `Where teams find their origin` (typed), final gradient word `origin.` |
| Typewriter mechanics | JS typewriter on mount: types `Where teams find their origin` at 55ms/char, pause 400ms at end, caret blinks while typing then retains after completion; `prefers-reduced-motion: reduce` → render full text instantly (no typing) |
| Supporting copy | Inter 400 18px, line-height 1.6, `theme.colors.textMuted`, `max-width: 540px`. **Copy:** `JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.` |
| CTA row | `Start Project` — `RotatingBorderButton` (56px height, 20px label, Inter 600, `theme.colors.text`) opens modal. `Book a call` — ghost button: transparent, 1px `theme.colors.border`, Inter 600 16px `theme.colors.text`, radius 999px; hover: border → `theme.colors.primary`, text → `#A8C0FF` |
| Trust line | Row of 9 overlapping avatar chips (48px circles, white ring 2px, `margin-left: -12px`, `object-fit: cover`) + text `Join 2,400+ builders already collaborating` (Inter 500 14px `theme.colors.textMuted`). Clicking an avatar is a no-op (decorative) |

### 5.4 Hero — right column: orbit circles visualization

A web-local `OrbitViz` component. Pure CSS/JS animation; no external libs.

| Aspect | Spec |
|---|---|
| Canvas | 420×420 desktop (scaled to 320×320 tablet, 280×280 mobile via `transform: scale()` wrapper); centered |
| Rings | 3 concentric circles (radius 200 / 150 / 95 px, stroke 1px `rgba(245,247,250,0.10)`; outer ring additionally `stroke-dasharray: 4 10` and a slowly rotating dashed effect — `@keyframes spin 60s linear infinite`) |
| Center stat card | 168×168 circle (radius 84), background `rgba(24,27,33,0.82)`, border 1px `rgba(79,125,249,0.35)`, `backdrop-filter: blur(8px)`; content: 3 stacked count-up stats separated by hairlines: `2,400+` Members · `120+` Projects · `99.9%` Uptime (Urbanist 700 22px `theme.colors.text`, labels Inter 400 12px `theme.colors.textMuted`) |
| Count-up mechanics | On hero mount, animate each number 0→target over 1.6s with `requestAnimationFrame` + `easeOutCubic`; format with thousands separators; reduced motion → snap to target |
| Orbiting avatar chips | 9 avatar chips (44px circles, white ring 2px) orbit on the rings: 4 on outer ring, 3 on middle ring, 2 on inner ring. Each chip positioned on its ring at fixed angles (outer 0/90/180/270°, middle 45/165/285°, inner 90/270°) and the whole ring group rotates slowly (`@keyframes orbit 24s / 18s / 12s linear infinite`, counter-rotating chip inner content via nested `rotate` to keep avatars upright — i.e., wrap chip in a rotating group, counter-rotate the avatar). Ring speeds: outer 24s, middle 18s, inner 12s; all `prefers-reduced-motion` → static |
| Entrance | Rings fade+scale in staggered (see §7); chips pop in with `scale 0.8→1` |

### 5.5 Logo ticker

| Aspect | Spec |
|---|---|
| Region | Above footer; padding `64px 0`; centered |
| Label | `Trusted by teams at` (Inter 500 13px, `letter-spacing: 0.14em`, uppercase, `theme.colors.textMuted`) |
| Marquee | Two identical copies of the 5-partner strip side-by-side; CSS `@keyframes marquee` translating `0 → -50%` at 28s linear infinite; strip = `display:flex; gap: 64px; align-items: center` |
| Logos | Each partner `<Image>` height 28px, width auto, `opacity: 0.55`; hover on the marquee pauses animation (`:hover { animation-play-state: paused }`) and each logo opacity → 1 with 0.2s transition |
| Edge fade | Mask on the marquee: `mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)` |
| Reduced motion | Marquee animation disabled; static strip centered with wrap |

### 5.6 Footer (slim)

- Row: brand (mark 24px + `JoinOrigin` Urbanist 600) · tagline `Where work finds its origin` (Inter 400 14px `theme.colors.textMuted`) · spacer · `Join the waitlist` `RotatingBorderButton` (opens modal) · small links `Privacy` / `Terms` (Inter 500 14px, hover underline) · `© 2026 JoinOrigin` (Inter 400 13px `theme.colors.textMuted`).
- Border-top 1px `theme.colors.border`; padding `32px 24px`; `max-width: 1280px` centered; stacks vertically on mobile.

---

## 6. Copy Manifest (exact strings)

| Slot | Copy |
|---|---|
| Header CTA | `Get Started` |
| Nav | `Product` · `Community` · `Pricing` · `Docs` |
| Badge | `New: Community spaces are live` |
| H1 typed | `Where teams find their origin` |
| Subcopy | `JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.` |
| Primary CTA | `Start Project` |
| Secondary CTA | `Book a call` |
| Trust | `Join 2,400+ builders already collaborating` |
| Stats | `2,400+` `Members` · `120+` `Projects` · `99.9%` `Uptime` |
| Ticker label | `Trusted by teams at` |
| Footer tagline | `Where work finds its origin` |
| Footer CTA | `Join the waitlist` |
| Footer links | `Privacy` · `Terms` |
| Copyright | `© 2026 JoinOrigin` |

---

## 7. Entrance Animation Spec

Timing starts on page mount (single-viewport page; no scroll reveals required beyond mount). Use CSS `@keyframes` + `animation-delay`, JS only for typewriter + count-up.

| Element | Animation | Delay | Duration | Easing |
|---|---|---|---|---|
| Header | fade-in + translateY(-12px) | 0ms | 500ms | ease-out |
| Hero left (whole column) | fade-up: opacity 0→1, translateY(24px→0) | 120ms | 700ms | cubic-bezier(0.22,1,0.36,1) |
| Badge | fade-up (child stagger) | 180ms | 500ms | same |
| Typewriter H1 | fade-in only (typing is its own animation) | 300ms | 400ms | ease-out |
| Subcopy | fade-up | 420ms | 600ms | same |
| CTA row | fade-up | 520ms | 600ms | same |
| Trust line | fade-up | 620ms | 600ms | same |
| Hero right (whole column) | scale-in: opacity 0→1, scale 0.94→1 | 300ms | 800ms | ease-out |
| Rings | opacity 0→1, scale 0.9→1 | 360ms / 460ms / 560ms (inner→outer or outer→inner) | 800ms | ease-out |
| Avatar chips | pop: scale 0.8→1 | stagger 700ms + 80ms per chip | 400ms | ease-out |
| Ticker | fade-up | 900ms | 700ms | same |
| Footer | fade-in | 1100ms | 500ms | ease-out |

**Reduced motion:** with `@media (prefers-reduced-motion: reduce)` disable all entrance/orbit/marquee/blink animations and snap typewriter/count-up to final values. Provide this in a single global `motion` utility + a `useReducedMotion` hook (react-native `AccessibilityInfo` or `window.matchMedia` on web).

**Mount safety:** elements should start invisible (`opacity: 0`) only when the animation is active; if JS fails, content must still render (set initial visible fallback via `no-js`/progressive enhancement or run animations only after `useEffect` adds the `is-mounted` class).

---

## 8. Responsive Breakpoints

Source of truth: `theme.breakpoints` = `mobile 480`, `tablet 768`, `desktop 1024`, `wide 1280` (min-width).

| Breakpoint | Header | Hero | OrbitViz | Ticker |
|---|---|---|---|---|
| `< 480px` (mobile) | 64px, compact; nav hidden → hamburger | single column; H1 40px; padding `64px 20px 48px`; CTA row full-width stacked (buttons 100% width) | 280×280 scaled; stats card 140×140 | logos height 22px; gap 40px |
| `480–767px` (tablet portrait) | 64px, hamburger | single column; H1 44px; CTAs inline | 320×320 scaled | logos 24px |
| `768–1023px` (tablet landscape) | 72px, nav visible if space else hamburger | two-column grid (1.1fr/0.9fr); H1 52px (`displayLg`) | 360×360 | logos 26px |
| `≥ 1024px` (desktop) | 72px, full nav | two columns; H1 64px (`displayXl`) | 420×420 | logos 28px |
| `≥ 1280px` (wide) | unchanged | content max-width 1280px; H1 64px | 440×440 | logos 28px |

Breakpoint strategy: `@media (min-width: Xpx)` with the shared token numbers; implement via styled-components media helpers reading `theme.breakpoints`.

---

## 9. Any-Button Modal + CSV Capture Flow

### 9.1 Trigger contract ("any button")

Every CTA across the page opens the **same** `WaitlistModal`:

- Header `Get Started`
- Hero `Start Project`
- Footer `Join the waitlist`
- (Future-proof) any element with `data-open-waitlist`

Implementation: a single `WaitlistModalProvider` (web-local context) exposes `openWaitlist()`; all CTAs call it. The modal itself is rendered once at page level.

### 9.2 Modal spec

| Aspect | Spec |
|---|---|
| A11y | `role="dialog"` `aria-modal="true"` `aria-labelledby` heading; focus moves to modal on open, returns to trigger on close; ESC / backdrop click / ✕ button close; focus trap within modal; `aria-describedby` for helper text; errors surfaced via `aria-live="polite"` or inline `role="alert"` |
| Structure | Backdrop: `rgba(15,17,21,0.72)` + `backdrop-filter: blur(6px)`, `z-index: 100`. Card: `theme.colors.surface`, radius `theme.radius.lg` (16px), border 1px `theme.colors.border`, padding 32px, `max-width: 440px`, width 100%, centered; entrance: fade+scale 250ms |
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
- Append-only: each successful submission appends exactly one row. Use `fs.appendFile` (serialized with a simple in-process mutex/promise queue to avoid interleaved writes).
- Header row example:
  ```csv
  timestamp,name,email
  2026-08-10T18:45:00.000Z,"Ada Lovelace",ada@example.com
  ```
- The initial `leads.csv` (with only the header row) is committed to the repo so e2e can assert appends; runtime rows persist in the working tree (note: `.gitignore` decision deferred to FE/PM — keep the file tracked for the sprint so e2e can verify).

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
| Badge | `Badge` (tone `primary`) from `@joinorigin/ui` |
| Text | `Text` (variant/weight/color) from `@joinorigin/ui` |
| Cards | `Card` where a raised surface is needed (modal card may use tokens directly) |
| Button (secondary/plain) | `Button` (variant `secondary`) where style fits; custom `RotatingBorderButton` + ghost are web-local styled components |
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
│   ├── Header.tsx                # sticky header, nav, hamburger, RotatingBorderButton
│   ├── RotatingBorderButton.tsx  # conic-gradient border CTA (§5.1)
│   ├── Hero.tsx                  # hero grid + background layers (§5.2)
│   ├── HeroLeft.tsx              # badge, TypewriterHeading, CTAs, trust line (§5.3)
│   ├── TypewriterHeading.tsx     # JS typewriter + caret (§5.3)
│   ├── OrbitViz.tsx              # rings, avatar chips, center stat card (§5.4)
│   ├── CountUp.tsx               # rAF count-up numbers (§5.4)
│   ├── LogoMarquee.tsx           # ticker (§5.5)
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

- Every color/spacing/radius/font-weight reads from `theme` (no raw hex literals outside tokens; the two accent gradient hexes `#4F7DF9`/`#8AB4FF` and rgba glow values are defined once in a `landingTokens` module and reused).
- Components use `styled-components/native` (consistent with existing app/package code) so the same markup pattern works across web and (future) native; images use `next/image` with `unoptimized={false}` default; static assets must be referenced by absolute URL path (`/assets/...`).
- `next.config.mjs` already sets `transpilePackages` for shared packages — no new config expected; do not add external font packages (`next/font/google` is disallowed for runtime assets — fonts are local).
- All new components get unit tests (Jest + React Testing Library, mirroring `apps/web/app/page.test.tsx` patterns): header render/nav, typewriter final text, count-up target values, ticker marquee presence, modal open-from-any-button, modal submit success/error, API route unit tests (mock `fs`/runtime or integration against a temp CSV).
- Keep `pnpm lint` and `pnpm typecheck` green for `@joinorigin/web` and the monorepo.

---

## 11. Definition of Done (for TASK-202)

- [ ] Homepage renders per this spec: header w/ rotating-border `Get Started`, typewriter heading, orbit circles + count-up + 9 avatars, logo ticker w/ 5 partner marks, entrance animations, responsive breakpoints.
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
| 1 | Source reference prompt missing at design time | Spec reconstructed from sprint handoff acceptance criteria (see §1). If the canonical Marketeam prompt is later committed, diffs are limited to copy/animation details — layout & contract above stand. |
| 2 | Partner logos | Custom trademark-safe wordmark SVGs used (no real brand marks) per license safety; ticker copy `Trusted by teams at` works with abstract marks. |
| 3 | `leads.csv` lifecycle | Committed with header only; runtime rows stay in working tree (sprint-scope). PM to decide tracking policy beyond the sprint. |
| 4 | Shared token additions (`fontFamilies`, `displayLg/displayXl`) | FE may add to `@joinorigin/design` or keep web-local; either satisfies "shared conventions" as long as colors/spacing/weights come from tokens. |
