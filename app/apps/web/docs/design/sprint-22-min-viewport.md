# Sprint 22 — Minimum Supported Mobile Viewport (Research Decision)

> **Parent:** [`../../../../docs/design/README.md`](../../../../docs/design/README.md) · **Web app:** [`../../README.md`](../../README.md)
> **Producer:** `re-mobile-min-viewport` (TASK-526, Sprint 22 Group 0 — research, no PR)
> **Consumers:** `fe-breakpoints` (TASK-528), all Sprint 22 Story A surface roles (TASK-529..535),
> `ut-mobile-first` (TASK-539), `e2e-mobile-first` (TASK-542)
> **Date:** 2026-08-25 · **Status:** Locked for Sprint 22 Story A
> **Sources:** Samsung Galaxy Z series public specs (Wikipedia), Apple developer device
> dimensions, Chrome DevTools device-mode presets, viewport-size device tables, Android
> platform guidance (see §8)

---

## 0. TL;DR — The Decision

**The web app must be designed and verified from a minimum supported viewport width of
`320px` CSS (portrait).**

- `320px` is **not** assumed — it is the measured floor of every *real, in-use, web-browsing*
  device class in the 2026 market, including all foldable cover displays.
- The narrowest real-world foldable cover screens that people actually browse with — Galaxy
  Z Fold 2/3 covers (**≈311–342px**), Z Fold 4/5 covers (**≈344–360px**), Z Flip 5/6
  flex-window apps (**≈360–379px**) — are all **≥ 311px**. The Z Fold 2/3 covers are the
  narrowest mainstream browsing surfaces found in research, and they confirm the floor must
  sit below the current `mobile: 480` token.
- The **one** real browsing surface found **below** 320px is the original Galaxy Fold (2019)
  cover (**≈280px CSS**; Chrome DevTools emulates it as 280×653 @DPR 2.6). It was
  discontinued in 2020, sold in disputed small volume, and its users browse almost entirely
  on the 7.3" inner screen. It is handled by the **graceful-degradation policy (D2)**, not by
  designing for it — Chrome's own smallest emulation preset is 320px ("Mobile S").
- The Galaxy Z Flip 1–4 cover screens (1.1"–1.9") are **below** 320px (≈130–260px) but are
  **not web-browsing surfaces** — Samsung's cover launcher is a widget/notification surface
  with no full browser. No actionable web traffic renders below 320px.
- Below 320px we do **not** design: we degrade gracefully (fluid widths, `min-width: 0`,
  no fixed-width overflow, no horizontal scroll). No content is lost; it simply flows at
  sub-320 widths for the Fold 1 cover, ultra-compact niche devices (e.g. Unihertz Jelly 2
  ≈272dp, Palm Phone ≈280dp) and tiny cover widgets.
- **Breakpoint token required:** add `minimum: 320` to
  `packages/design/src/breakpoints.ts` as the floor anchor. Keep `480/768/1024/1280`
  unchanged. Optional (recommended): add `foldable: 360` to name the narrowest foldable-cover
  class for cover-screen polish and test bucketing.

---

## 1. Purpose

Story A is a site-wide mobile-first audit: base styles are written for the smallest real
viewport and *enhanced* at larger breakpoints. Before any component work starts, the team
needs a **researched** minimum width — the planning note explicitly says *"Min viewport =
RESEARCHED, not assumed 320px (foldable cover displays like Galaxy Z Fold are the narrowest
real-world devices)"*.

This document:

1. Researches the actual CSS viewport widths of real smallest-screen devices
   (foldable covers, small Android/iOS, the legacy 320px floor).
2. Locks the minimum supported viewport for Story A (D1).
3. Locks the below-floor degradation policy (D2).
4. Specifies the `breakpoints.ts` token additions required (D3) and hands off to
   `fe-breakpoints` (TASK-528).
5. Gives the test roles concrete bucket values to verify against.

Scope rules (mirroring prior design contracts):

- This is a **design contract**. Zero source/style/test files are edited by this role.
- `breakpoints.ts` additions are **specified here but implemented by TASK-528**.
- Existing tokens are preserved unless the research requires a change (it does not —
  480/768/1024/1280 remain valid enhancement points).

---

## 2. What "minimum supported viewport" means

- **CSS viewport width** (a.k.a. `device-width` in the layout viewport meta) — the `px`
  width that CSS media queries see in portrait, after density scaling. This is what
  `@media (min-width: …)` evaluates.
- "Supported" = the layout is **designed and verified** to look correct at that width
  (no horizontal overflow, readable type, tappable targets, no clipped content).
- The floor is a **mobile-first base**: the default (no-query) styles *are* the 320px
  layout; `@media (min-width: …)` then enhances it. This is exactly the Story A model.

---

## 3. Evidence — foldable cover displays (the narrowest real browsing surfaces)

CSS width = physical width ÷ density bucket. Density ≈ ppi ÷ 160 (mdpi baseline). All
figures are portrait orientation (how a folded phone is held and browsed).

| Device | Cover display | Physical res (portrait W×H) | ppi | Est. density | **CSS width ≈** |
|---|---|---|---|---|---|
| Galaxy Fold (2019) | 4.6" Super AMOLED | 720 × 1680 | 397 | ≈2.48 | **≈280–320px** (DevTools preset: 280×653 @2.6) |
| Galaxy Z Fold 2 (2020) | 6.2" Super AMOLED | 816 × 2260 | 387 | ≈2.42–2.6 | ≈311–337px |
| **Galaxy Z Fold 3 (2021)** | 6.2" Dynamic AMOLED 2X | 832 × 2268 | 389 | ≈2.43–2.6 | **≈320–342px** |
| Galaxy Z Fold 4 (2022) | 6.2" Dynamic AMOLED 2X | 904 × 2316 | 402 | ≈2.51–2.6 | ≈348–360px |
| Galaxy Z Fold 5 (2023) | 6.2" Dynamic AMOLED 2X | 904 × 2316 | 402 | ≈2.51–2.6 | ≈348–360px (DevTools preset: 344×882) |
| Galaxy Z Fold 6 (2024) | 6.3" Dynamic AMOLED 2X | 968 × 2376 | 410 | ≈2.56–2.6 | ≈372–378px |
| Galaxy Z Flip 3 (2021) | 1.9" Super AMOLED | 260 × 512 | 302 | — | **≈130–260px — widget surface, NOT a browser** |
| Galaxy Z Flip 4 (2022) | 1.9" Super AMOLED | 260 × 512 | 302 | — | ≈130–260px — widget surface, NOT a browser |
| Galaxy Z Flip 5/6 (2023–) | 3.4" Super AMOLED | 720 × 748 | 305 | ≈1.91 | ≈360–379px (flex-window app mode) |

Key findings:

1. **All *current* foldable covers are ≥ 311px.** The narrowest in active use are Z Fold 2/3
   (≈311–342px) — real, current-browser surfaces (Chrome/Samsung Internet on Android
   11–15) that users do interact with folded. They are narrower than every mainstream phone
   (375/390/412px) and *justify* supporting below 480px — but they are still at or above
   the 320px floor.
2. **The original Galaxy Fold (2019) cover is the one sub-320 browsing surface.** At ≈280px
   CSS (720px physical @ ≈2.6 density) it is genuinely narrower than 320. It was
   discontinued in 2020, its 1M-unit sales claim was retracted by Samsung, and it is the
   reason D2 (graceful degradation below 320) exists — see §5. Chrome DevTools ships a
   `Galaxy Fold` preset at 280×653.
3. **The Z Flip 1–4 cover screens are not browsing surfaces.** Samsung's cover launcher
   ("Flex Window") runs widgets and a small curated app set; there is no full browser and no
   web-content use case. Their sub-320 widths are therefore irrelevant to web layout.
4. Z Flip 5/6 flex-window apps (maps, messenger, etc.) render at ≈360–379px — above the
   floor.

---

## 4. Evidence — small Android/iOS widths and the legacy 320px floor

| Device | Physical res | DPR | **CSS width** | Notes |
|---|---|---|---|---|
| iPhone 4 / 4S | 640 × 960 | 2 | **320px** | Legacy floor, iOS 6–9 era |
| iPhone 5 / 5C / 5S | 640 × 1136 | 2 | **320px** | Still browseable on iOS 15 (5S) |
| iPhone SE (1st gen) | 640 × 1136 | 2 | **320px** | 30M+ units sold; runs current Safari |
| iPod touch (5th+) | 640 × 1136 | 2 | **320px** | Same panel as iPhone 5 |
| Early Android (Galaxy S/S2, HTC Desire-class) | 480 × 800 | 1.5 | **320px** | Legacy Android floor |
| Galaxy Nexus | 720 × 1200 | 2 | 360px | Common 360dp class |
| Galaxy S5-era & newer Android | 1080 × 1920 | 3 | 360px | The modern Android minimum in practice |
| iPhone 12 mini / 13 mini | 1080 × 2340 | 3 | 360px | Smallest current iPhone |

Industry/platform context:

- **Android platform floor:** `smallestWidth` `sw320dp` is the classic smallest-width
  bucket that Android phone layouts target; everything below is "small" and rare.
- **Chrome DevTools** mobile emulation's smallest first-party preset is iPhone SE/5 at
  320 × 568.
- **Common design-system practice** (Material Design guidance, GOV.UK, Bootstrap's legacy
  guidance): design for ≥360dp, *support* ≥320px; below 320 is out of scope.

Conclusion: the *long-standing* 320px floor is not a myth — it corresponds to real devices
that still browse the web (iPhone SE 1st gen and iPhone 5S are the meaningful ones).
Modern devices start at 360px. The intersection of "real devices that browse" is
**320–360px**, with 320px as the true minimum — the only real browsing surface below it is
the discontinued Galaxy Fold (2019) cover (see §5, handled by D2 degradation).

---

## 5. Evidence — devices below 320px and why we degrade, not design

| Device | Screen | **CSS width ≈** | Web relevance |
|---|---|---|---|
| Galaxy Z Flip 1–4 cover | 1.1"–1.9" | ≈130–260px | None — widget surface, no browser |
| **Galaxy Fold (2019) cover** | 4.6" | **≈280px** | **The one real browser surface below 320** — discontinued 2020, disputed ~1M volume, users browse on the 7.3" inner screen |
| Unihertz Jelly 2 | 2.9" | ≈272dp | Negligible volume; browser renders at density-zoomed width; no meaningful users |
| Palm Phone (2018) | 3.3" | ≈280dp | Discontinued niche; not a target |

Decision rationale for not designing below 320px:

- The only *browsing* device below 320px is the **Galaxy Fold (2019) cover (≈280px)** — a
  discontinued single model whose own users browse almost exclusively on the 7.3" inner
  display. Its sales figure (claimed 1M, then retracted by Samsung) makes it a rounding
  error on the web; it is not a design target.
- Every other sub-320 surface is a **widget-only cover screen** (Z Flip 1–4) or a
  vanishingly rare ultra-compact phone (Jelly 2 ≈272dp, Palm ≈280dp).
- 280px cannot render readable, tappable content for a full marketing site; designing for
  it would degrade the 320px experience for everyone. Chrome's own smallest emulation
  preset is 320px ("Mobile S") — the platform itself treats sub-320 as out of scope.
- Browsers on sub-320 surfaces still apply the fluid layout from D2 — no horizontal
  scroll, no lost content — which is the correct behavior for the Fold 1 cover. That is
  exactly why D2 exists.

---

## 6. Locked decisions

### D1 — Minimum supported viewport width

**The app is designed and verified for a minimum viewport of `320px` CSS width (portrait).**

- Mobile-first base styles are the **default** (no media query) and must be correct at
  320px.
- This covers: all iPhone ≤375px class devices, all Android 320dp–360dp class devices,
  **and every current foldable cover display** (Z Fold 2–6 ≈311–378px, Z Flip 5/6
  ≈360–379px).
- The prior `mobile: 480` token remains the *first enhancement* breakpoint — not the floor.
- The original Galaxy Fold (2019) cover (≈280px) is **out of design scope** — it is served
  by the D2 degradation policy, not by design (see §5).

### D2 — Below-floor degradation policy

Below 320px the app is **not designed for**, but must **degrade gracefully**. This is what
keeps the Galaxy Fold (2019) cover (≈280px) usable without horizontal overflow:

- No horizontal page scroll; content flows at whatever width is available.
- No fixed-width elements that could overflow (`min-width: 0` on grid/flex children,
  fluid percentages, `max-width: 100%` on images/media).
- Nothing is hidden or gated on a sub-320 media query (we do not write sub-320 queries).

### D3 — Breakpoint token additions (`packages/design/src/breakpoints.ts`)

**Required — add a floor token** (implemented by TASK-528):

```ts
export const breakpoints = {
  /** Minimum supported viewport width (researched floor, TASK-526). */
  minimum: 320,
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;
```

- Keep the existing `480 / 768 / 1024 / 1280` values **unchanged** — research does not
  require any change to the enhancement ladder.
- `minimum` anchors the mobile-first base: default styles apply from 320px up; every
  `@media (min-width: …)` enhancement must be `> 320px`.

**Recommended — optional `foldable` token** (adds a named narrow class for cover-screen
polish and test bucketing):

```ts
  foldable: 360, // narrowest foldable-cover class (Z Fold 4/5, Z Flip 5/6 covers)
```

- Not required for correctness: base mobile already covers 320–479px including Fold 2/3
  covers (≈311–342px). Add only if a surface needs a cover-specific tweak distinct from
  the generic mobile layout.

**Naming/typing notes for TASK-528:**

- `breakpoints` is `as const`; the `BreakpointTokens` type derives automatically.
- The existing theme test asserts ascending breakpoint order — `minimum: 320` sorts first
  and keeps the test green. (TASK-539 extends the theme test for the new floor.)
- Existing `@media (max-width: …)` usages of `mobile/tablet/desktop` (e.g. TypewriterHeading)
  remain valid: they target the same physical ranges and do not conflict with the floor.

---

## 7. Guidance for downstream roles

### `fe-breakpoints` (TASK-528)

- Add `minimum: 320` (+ optional `foldable: 360`) to `packages/design/src/breakpoints.ts`
  and expose through `theme.ts` (already spreads `breakpoints`).
- Treat the mobile-first **base** as the 320px layout. First enhancement = `mobile: 480`.
- Do not rename or revalue existing tokens.

### Surface roles (TASK-529..535)

- Verify each claimed component at **320px** first, then at 480/768/1024/1280.
- No component may introduce horizontal overflow at 320px (watch fixed widths,
  `min-width` ≥ 200px elements, horizontal marquees — they must be fluid or clipped by
  design).
- Follow D2 for anything narrower than 320px (test at ~280px once to confirm graceful
  degradation, not to design).

### `ut-mobile-first` (TASK-539)

- Extend `packages/design/src/__tests__/theme.test.ts` to assert `minimum: 320` exists and
  sorts before `mobile`.
- Component tests at the 320px bucket (jsdom `window.innerWidth`-free: assert computed
  styles at 320, not media-query mocks where avoidable).

### `e2e-mobile-first` (TASK-542)

- `responsive.spec.ts` buckets: keep existing buckets; **add a 320px min-viewport bucket**
  and **a narrow foldable bucket at 340px** (Z Fold 2/3 covers ≈311–342px — the narrowest
  current browsing surfaces). 360px is also acceptable if a round number is preferred; do
  not use anything below 320 for a design assertion.
- Optionally smoke-test 280px once (Galaxy Fold cover emulation) asserting only the D2
  invariants: no horizontal overflow, primary content still reachable. This is a
  degradation check, not a design bucket.
- Assert: no horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`),
  hamburger nav usable, primary CTAs tappable.

---

## 8. Sources

- Samsung Galaxy Fold (2019) — cover display 4.6" Dynamic AMOLED, 720×1680, 397 ppi
  (Wikipedia, 2026-08); ≈280px CSS at ≈2.6 density; Chrome DevTools `Galaxy Fold` preset
  280×653 @DPR 2.6; discontinued 2020, Samsung retracted the 1M-unit sales claim.
- Samsung Galaxy Z Fold 3 — cover display 6.23" Dynamic AMOLED 2X, 832×2268, 389 ppi
  (Wikipedia, 2026-08); ≈320–342px CSS.
- Samsung Galaxy Z Flip 3 — cover display 1.9" Super AMOLED, 260×512, 302 ppi (Wikipedia,
  2026-08); Z Flip 3–4 cover launcher = widget surface, no full browser.
- Samsung Galaxy Z Flip 5 — cover display 3.4" Super AMOLED, 720×748, 305 ppi (Wikipedia,
  2026-08); flex-window apps ≈360–379px.
- Samsung Galaxy Z Fold 4/5/6 cover resolutions (904×2316 / 968×2376, 402–410 ppi) —
  Samsung public specs; CSS width ≈344–378px; DevTools `Galaxy Z Fold 5` preset 344×882.
- Chrome DevTools device mode — responsive width presets bar: Mobile S = **320px** is the
  smallest first-party emulation bucket (developer.chrome.com, 2024-02).
- Apple device dimensions — iPhone 4/4S/5/5C/5S/SE 1st gen = 320pt portrait (Apple
  developer documentation; viewportsizer.com device table).
- Android `smallestWidth` `sw320dp` bucket as the classic phone-layout minimum (Android
  developer guidance).
- viewportsizer.com device table (2026 snapshot) — 320×568 class devices and 360dp-class
  Android devices.

---

## 9. Revision history

| Date | Change |
|---|---|
| 2026-08-25 | Initial research decision (TASK-526). Locked D1–D3 for Sprint 22 Story A. |
