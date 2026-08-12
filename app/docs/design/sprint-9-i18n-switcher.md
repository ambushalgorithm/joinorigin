# Sprint 9 — Language Switcher Design Spec

> **Parent:** [`../README.md`](../README.md) — design docs index
> **Upstream contract:** [`sprint-9-i18n-arch.md`](./sprint-9-i18n-arch.md) (TASK-251 — i18n library, locale JSON schema, auto-detect + cookie logic, RTL strategy; consumed as the architectural boundary this spec fits inside)
> **Consumer:** `fe-i18n-integration` (TASK-273) — implement this spec
> **Verifier:** `e2e-i18n-validation` (TASK-274)
> **Producer:** `design-i18n-switcher` (TASK-252) · **Date:** 2026-08-12 · **Branch:** `feat/design-i18n-switcher`

---

## 1. Purpose

This document is the **build-ready visual + interaction specification** for the
JoinOrigin **language switcher** — the manual control that lets a visitor
override the auto-detected browser/OS language on the web app and the mobile
app.

Scope of this spec:

1. **Placement** — where the switcher lives on web (header nav + footer) and
   mobile (home screen menu placement), per team/UX conventions.
2. **Visual design** — globe icon + **native-language labels** (e.g. `Español`
   not `Spanish`), dark theme `#0F1115`, brand accent `#4F7DF9 → #8AB4FF`.
3. **Interaction** — dropdown list, immediate locale switch on select, **no
   reload / no flash**.
4. **Cookie persistence** — selection saved client-side; cookie wins over
   auto-detect.
5. **RTL states** — `ar` / `fa` switch into `dir="rtl"` and mirror correctly.
6. **Accessibility** — aria-label, keyboard nav, focus management.
7. **Wireframes** — ASCII mockups for header / footer / mobile placements.
8. **Component file list** — the exact files `fe-i18n-integration` must create
   or modify.

**Copy boundary:** this spec defines switcher **chrome** (icon, labels of the
language list, aria-labels) — it does **not** author or rewrite any locale
strings. All translatable UI copy, including the switcher's own translated
label (e.g. "Language" / "Idioma" / "Sprache"), comes from the arch-i18n base
inventory `app/packages/i18n/locales/en.json` (TASK-251) and the 20 translator
locales (TASK-253…272). The switcher consumes those keys via `t()`; the key
names referenced here (e.g. `switcher.*`) are the **contract** the arch doc
owns. If the arch doc lands with different key names, the arch doc wins and
the engineer maps them 1:1.

**Zero implementation edits:** this document only. No components, no app code.

---

## 2. Design Foundations (inherited from the shared system)

All visual values below read from the shared `@joinorigin/design` theme via
`styled-components` `ThemeProvider` — same tokens the header/footer/home use
today. No new palette.

| Token | Value | Use |
|---|---|---|
| `colors.background` | `#0F1115` | Page canvas, dropdown shadow base |
| `colors.surface` | `#181B21` | Dropdown panel, mobile bottom-sheet |
| `colors.surfaceElevated` | `#22262E` | Option hover / active row, trigger hover |
| `colors.border` | `#2C313A` | Dropdown border, hairline between trigger and panel |
| `colors.primary` | `#4F7DF9` | Selected-language check, focus ring, active highlight |
| `colors.primaryContrast` | `#FFFFFF` | Check glyph on primary chip |
| `colors.text` | `#F5F7FA` | Option labels |
| `colors.textMuted` | `#9AA3B2` | Trigger label secondary, disabled/helper text |

Brand accent gradient (single source `ACCENT_GRADIENT` in
`apps/web/components/landingTokens.ts`):

```text
linear-gradient(135deg, #4F7DF9 0%, #8AB4FF 100%)
```

Used sparingly in the switcher: the **active row highlight** (subtle, 8% alpha
primary wash + 1px gradient underline) and the **focus ring** on the trigger.
Never a full-gradient button — the switcher is a quiet utility control, not a
CTA.

Typography: **Inter** (`theme.fontFamilies.sans`), body/UI sizes:

| Element | Size / Weight |
|---|---|
| Trigger label (desktop) | 14px / `medium` 500 |
| Option label | 14px / `regular` 400; active `medium` 500 |
| Native label in option list | 14px; secondary English hint 12px `textMuted` (see §3.3) |
| Mobile sheet title | 16px / `medium` 500 |

Radius: trigger `radius.md` 10px, dropdown panel `radius.lg` 16px, option rows
`radius.md` 10px (hover wash), check chip `radius.pill`.

Spacing: gaps per `theme.spacing` (`xs` 4, `sm` 8, `md` 16, `lg` 24, `xl` 32).

---

## 3. Language List Content Contract

### 3.1 Supported locales (21, mirroring the arch contract)

```text
en  es  pt-BR  fr  de  ru  ja  ko  zh-CN  zh-TW  ar  hi  id  tr  it  pl
nl  vi  th  uk  fa
```

This list is the **single source of truth** for the switcher options. Order in
the dropdown is fixed for stability (not alphabetical per current locale):

```text
1  English
2  Español
3  Português (Brasil)
4  Français
5  Deutsch
6  Русский
7  日本語
8  한국어
9  简体中文
10 繁體中文
11 العربية
12 हिन्दी
13 Bahasa Indonesia
14 Türkçe
15 Italiano
16 Polski
17 Nederlands
18 Tiếng Việt
19 ไทย
20 Українська
21 فارسی
```

### 3.2 Native-language labels (the visual rule)

Every option is labeled in its **own language** (autonym): `Español`, not
`Spanish`; `Deutsch`, not `German`; `日本語`, not `Japanese`. The current
locale's native name is what renders on the closed trigger (desktop) — e.g. in
English the trigger reads `English`; after switching to Spanish the trigger
reads `Español`.

### 3.3 English hint (progressive disclosure)

On desktop, each option row may show a muted English hint on the right when it
differs from the autonym (e.g. `Deutsch` + `German`), to help users who do not
read the script of the target language. This hint is **data, not copy** — it
lives in the switcher's static label map (`LANGUAGE_LABELS`), not in locale
JSONs. It is omitted on the mobile sheet (space) and omitted for `English`.

| Locale | Native label | EN hint (static) |
|---|---|---|
| `en` | English | — |
| `es` | Español | Spanish |
| `pt-BR` | Português (Brasil) | Portuguese (Brazil) |
| `fr` | Français | French |
| `de` | Deutsch | German |
| `ru` | Русский | Russian |
| `ja` | 日本語 | Japanese |
| `ko` | 한국어 | Korean |
| `zh-CN` | 简体中文 | Simplified Chinese |
| `zh-TW` | 繁體中文 | Traditional Chinese |
| `ar` | العربية | Arabic |
| `hi` | हिन्दी | Hindi |
| `id` | Bahasa Indonesia | Indonesian |
| `tr` | Türkçe | Turkish |
| `it` | Italiano | Italian |
| `pl` | Polski | Polish |
| `nl` | Nederlands | Dutch |
| `vi` | Tiếng Việt | Vietnamese |
| `th` | ไทย | Thai |
| `uk` | Українська | Ukrainian |
| `fa` | فارسی | Persian |

---

## 4. Web Placement

### 4.1 Header (primary placement — desktop ≥ 769px)

The switcher sits in the **header right cluster**, between the nav and the
`Log In` link — a quiet utility before the auth CTA, following the convention
"language controls precede account controls".

Current header layout (`components/Header.tsx`):

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [◆] JoinOrigin      Features Community Docs About   Log In [Get Start]│
└────────────────────────────────────────────────────────────────────────┘
```

New layout (desktop):

```text
┌────────────────────────────────────────────────────────────────────────────┐
│  [◆] JoinOrigin      Features Community Docs About   [🌐 English] Log In [Get Start]│
└────────────────────────────────────────────────────────────────────────────┘
```

- Trigger: globe icon (16px) + current-locale native name, hairline-bordered
  button, `surface` fill on hover.
- Dropdown opens **below the trigger, right-aligned** to the trigger's inline
  end (see §7 for RTL mirroring).
- `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`.

### 4.2 Header — mobile menu panel (≤ 768px)

Inside the existing `MobilePanel` (hamburger dropdown), the switcher is a full-
width row at the **bottom of the panel**, above the auth CTA row — after nav
links, before `Log In` / `Get Started`. Rationale: language is a utility, not a
primary navigation action; it belongs at the panel's utility tail but still
above account actions.

```text
┌────────────────────────────────────┐
│  Features                          │
│  Community                         │
│  Docs                              │
│  About                             │
│  ────────────────────────────────  │
│  [🌐 English                    ▾] │   ← LanguageSwitcher row (mobile)
│  Log In                            │
│  [ Get Started ]                   │
└────────────────────────────────────┘
```

Tapping the row expands an inline list of all 21 options (scrollable if
needed). Selecting one applies the switch immediately, closes the list, and
keeps the mobile panel open (the user can keep navigating).

### 4.3 Footer (secondary placement)

A **compact** switcher in the footer utility row, aligned to the inline end,
adjacent to the copyright line. It mirrors the header interaction but with a
**smaller trigger** (icon-only + native label, 13px) and an **upward-opening**
dropdown (footer is at the page bottom; the panel must not overflow the
viewport).

Current footer row (`components/Footer.tsx`):

```text
© 2026 JoinOrigin
```

New footer row:

```text
© 2026 JoinOrigin                                    [🌐 English ▾]
```

Rationale: the footer is the conventional fallback location for language
selection on marketing sites (discoverability for users who missed the
header), and the header remains the primary location. Both mount the **same**
`LanguageSwitcher` component with a `variant` prop (see §9).

---

## 5. Mobile (React Native) Placement

The mobile app currently renders a single `HomeScreen`
(`apps/mobile/src/screens/HomeScreen.tsx`). The switcher is a **globe icon
button in the top-right corner** of the screen — the conventional utility
corner on mobile — above the welcome card.

```text
┌────────────────────────────────────────┐
│  [Welcome badge]              [🌐 ▾]    │ ← LanguageSwitcher (corner)
│                                        │
│   Welcome to JoinOrigin                │
│   Your workspace is ready.             │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ (welcome card)                   │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

Interaction (mobile):

- Tap the globe → **bottom sheet** (RN `Modal` with slide-up animation,
  `transparent` overlay + `#0F1115` scrim at 60%) listing all 21 native
  labels, active row highlighted with a primary check.
- Selecting a row applies the locale immediately, dismisses the sheet.
- Sheet header: localized `switcher.title` key (e.g. "Language" / "Idioma"),
  close affordance (X) in the corner.
- Accessibility: `accessibilityRole="button"` + `accessibilityLabel` on the
  globe; sheet is a `role="dialog"` with focus trap; options are
  `accessibilityRole="radio"` grouped by `accessibilityRole="radiogroup"`
  (or `listbox`/`option` where RN support allows — engineer picks per platform
  capability, behavior contract below is the same).

Mobile RTL: `I18nManager.forceRTL(true)` for `ar`/`fa` (arch contract §RTL);
the globe button moves to the top-**left** corner automatically (flexbox
mirrors), and the sheet stays full-width.

---

## 6. Interaction Model

### 6.1 Web — dropdown behavior

1. **Closed state:** trigger shows globe + current-locale native name.
2. **Open:** click / Enter / Space / ArrowDown opens the listbox.
3. **Select:** clicking an option (or Enter/Space on the focused option)
   **immediately**:
   - writes the cookie (see §6.3),
   - calls the i18n provider's `setLocale(locale)`,
   - closes the listbox,
   - returns focus to the trigger.
4. **Close without change:** outside pointerdown, `Escape`, `Tab` (moves on).
5. **No reload, no flash:** the locale change is a pure client-state update
   (context + re-render). The `<html lang>`/`dir` attributes update
   reactively. Full-page reload is **never** triggered. On first paint the
   document is server-rendered with the cookie/auto-detected locale already
   applied (arch contract — server reads cookie on the initial request), so
   there is no flash of `en` then a swap.

### 6.2 Mobile — bottom-sheet behavior

Same contract as web, adapted to touch: tap option → set cookie (via the
shared storage/cookie adapter the arch doc defines) + `setLocale` + dismiss
sheet. No reload.

### 6.3 Cookie persistence

- **Name:** the arch doc owns the cookie contract; recommended
  `joinorigin_locale`. Engineer must use exactly the name the arch doc defines.
- **Value:** the selected locale code (`es`, `pt-BR`, `ar`, …).
- **Expiry:** 365 days (1 year) from selection.
- **Path:** `/` (site-wide).
- **SameSite:** `Lax`.
- **HttpOnly:** false — the client must read it to decide the initial locale on
  subsequent visits (though the server also reads it for SSR, the switcher
  reads it at mount to avoid a hydration mismatch).
- **Priority rule (arch contract):** cookie wins if set → else browser/OS
  language if supported → else `en` fallback. The switcher **never** clears
  the cookie on its own; only a new selection overwrites it.
- **Re-selecting the current locale:** no-op (no cookie rewrite, no state
  change, listbox still closes).

### 6.4 Empty / unsupported states

- If `navigator.language` maps to an unsupported variant (e.g. `en-GB` →
  supported base `en`; `fr-CA` → `fr`; unknown → `en`), the mapping follows
  the arch doc's normalization table. The switcher always shows the resolved
  active locale in the list.
- If cookie contains an invalid/unknown locale code, treat as unset → fall
  back through the priority chain.

---

## 7. RTL States

For `ar` and `fa` (top-level `dir: "rtl"` in their locale JSONs, arch
contract):

1. **Document direction:** web sets `<html dir="rtl" lang="ar">` (and back to
   `ltr` on exit); mobile calls `I18nManager.forceRTL(true)`.
2. **Switcher mirroring (web):**
   - Trigger icon moves to the **inline-start** (right side in RTL).
   - Dropdown panel right-alignment flips: in LTR the panel is right-aligned
     to the trigger's inline end (right edge); in RTL it becomes left-aligned
     to the trigger's inline end (left edge) — i.e. always aligned to the
     **inline end** of the trigger.
   - Option rows reverse text order naturally; the English hint stays at the
     physical right (inline-start in RTL) via logical properties
     (`margin-inline-start`).
3. **Switcher mirroring (mobile):** globe button moves to top-left; sheet
   content flows right-to-left; the close X stays in the corner opposite the
   inline start.
4. **Aria/behavior unchanged** — only visual geometry mirrors.
5. **Mixed-direction guard:** the switcher's own chrome never uses a locale-
   specific string except the trigger's autonym, so no extra translation work
   for the control itself; the localized `switcher.title` key comes from each
   locale JSON.
6. **Layout rule for the whole app:** RTL layout is arch's responsibility; the
   switcher must simply **participate** in the flipped layout (use flexbox +
   logical properties, avoid fixed `left`/`right`; on web use
   `margin-inline`, `inset-inline`, `text-align: start`).

---

## 8. Accessibility

### 8.1 Trigger (web)

- `role="combobox"` semantics or button + `aria-haspopup="listbox"` — engineer
  picks the WAI-ARIA pattern that matches the arch component; required
  attributes:
  - `aria-label`: localized `switcher.triggerLabel` (e.g. "Change language")
    from the active locale JSON.
  - `aria-expanded`: `true`/`false`.
  - `aria-controls`: id of the listbox.
- **Focus ring:** 2px solid `theme.colors.primary`, offset 2px, visible on
  `:focus-visible`. The trigger must be reachable in the header's natural tab
  order (after nav links, before `Log In`).

### 8.2 Listbox (web)

- `role="listbox"` with `aria-label` = localized `switcher.listLabel`.
- Options: `role="option"`, `aria-selected` on the active locale, `id`
  per-option for `aria-activedescendant` tracking.
- Active option gets a `surfaceElevated` background + primary check.

### 8.3 Keyboard navigation (web)

| Key | Behavior |
|---|---|
| `Enter` / `Space` | On trigger: open listbox. On option: select + close + focus trigger. |
| `ArrowDown` | Open if closed; move active option down (wrap). |
| `ArrowUp` | Move active option up (wrap). |
| `Home` / `End` | First / last option. |
| `Escape` | Close listbox, return focus to trigger. |
| `Tab` | Close listbox, move focus to next element (never trapped). |
| `Shift+Tab` | Close listbox, move focus to previous element. |

- **Focus return:** on close (Escape or selection), focus returns to the
  trigger. On outside pointerdown, focus stays wherever it was (the trigger
  does not steal focus).
- **Active-option announcement:** use `aria-activedescendant` so a screen
  reader announces the highlighted option without moving focus into the list.

### 8.4 Mobile

- Globe: `accessibilityRole="button"`, `accessibilityLabel` localized
  `switcher.triggerLabel`.
- Sheet: `accessibilityRole="dialog"`, `accessibilityViewIsModal`, focus
  enters the sheet, options are radio-like (`accessibilityState={{ selected }}`).
- Selecting announces the new locale (engineer may use RN's
  `AccessibilityInfo.announceForAccessibility`).

---

## 9. ASCII Wireframes

### 9.1 Web header switcher (desktop, LTR) — closed

```text
┌─ Header (sticky, rgba(15,17,21,0.72) + blur) ──────────────────────────────┐
│  [◆] JoinOrigin   Features Community Docs About    (🌐 English ▾)  Log In │
│                                                    └──┬──┘                │
│                                                       │ trigger           │
│                                        ┌──────────────▼──────────┐        │
│                                        │  ✓ English               │        │
│                                        │    Español        Spanish│        │
│                                        │    Português (Brasil)    │        │
│                                        │    Français        French│        │
│                                        │    Deutsch         German│        │
│                                        │    … (21 rows, scroll)   │        │
│                                        │    فارسی           Persian│        │
│                                        └──────────────────────────┘        │
└────────────────────────────────────────────────────────────────────────────┘
```

Panel: `surface` bg, 1px `border` hairline, `radius.lg`, shadow
`0 16px 48px rgba(0,0,0,0.45)`, min-width 240px, max-height 50vh + scroll.

### 9.2 Web footer switcher — closed (upward dropdown)

```text
┌─ Footer ────────────────────────────────────────────────────────────────────┐
│  [◆] JoinOrigin · Where teams find their origin    [Join the waitlist]     │
│                                                                             │
│  Product    Company    Legal                     © 2026 JoinOrigin  (🌐 ▾)  │
│  Features   About      Privacy                        ┌───────────┐        │
│  Community  Contact    Terms                         │  ✓ English │        │
│  Docs                                                 │  Español   │        │
│                                                      │  …         │        │
│                                                       └───────────┘        │
└────────────────────────────────────────────────────────────────────────────┘
```

### 9.3 Web header switcher (mobile panel)

```text
┌─ Header ─────────────────────────┐
│  [◆] JoinOrigin        [≡]      │
├──────────────────────────────────┤
│  (MobilePanel, surface)          │
│  Features                        │
│  Community                       │
│  Docs                            │
│  About                           │
│  ────────────────────────────    │
│  [🌐 English                ▾]  │  ← expanded inline list:
│  ┌────────────────────────────┐  │
│  │ ✓ English                 │  │
│  │   Español          Spanish│  │
│  │   Português (Brasil)      │  │
│  │   Français          French│  │
│  │   … (21 rows, scrollable) │  │
│  └────────────────────────────┘  │
│  Log In                          │
│  [ Get Started ]                 │
└──────────────────────────────────┘
```

### 9.4 Mobile (RN) — bottom sheet

```text
┌─────────────────────────────────────────────┐
│  [Welcome]                         [🌐 ▾]   │ ← globe, top-right (LTR)
│                                             │
│  Welcome to JoinOrigin                     │
│  Your workspace is ready.                  │
│                                             │
│ ─────────── scrim 60% #0F1115 ──────────── │
│ ┌───────────────────────────────────────┐  │
│ │ Language                        [X]  │  │ ← sheet header (localized)
│ ├───────────────────────────────────────┤  │
│ │ ✓ English                            │  │
│ │   Español                            │  │
│ │   Português (Brasil)                 │  │
│ │   Français                           │  │
│ │   Deutsch                            │  │
│ │   … (21 rows, scrollable)            │  │
│ │   فارسی                              │  │
│ └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

Active row: `surfaceElevated` bg + `primary` check (24px hit target rows,
44px sheet rows per mobile a11y).

---

## 10. Component File List (for `fe-i18n-integration`, TASK-273)

> The arch doc owns the i18n infra (provider, dictionary loader, cookie util,
> `useI18n` hook, locale normalization). This list is the **switcher-specific**
> surface the engineer must build/mount on top of it. Files are relative to the
> monorepo root `app/`.

### 10.1 Create (new files)

| # | File (relative to `app/`) | Purpose |
|---|---|---|
| 1 | `apps/web/components/LanguageSwitcher.tsx` | Shared web switcher: trigger (globe + native label) + dropdown listbox; `variant?: 'header' \| 'footer'` prop controlling compactness + panel open direction (footer opens upward); consumes `useI18n()` (locale + `setLocale`) and the cookie util; implements §6/§7/§8 behavior; uses `LANGUAGE_LABELS` (§3.3) |
| 2 | `apps/web/components/LanguageSwitcher.test.tsx` | Unit tests: renders current autonym, opens listbox, selects locale → calls `setLocale` + writes cookie, keyboard nav (arrows/enter/escape), RTL dir applied, focus return (per arch test conventions) |
| 3 | `apps/mobile/src/components/LanguageSwitcher.tsx` | RN switcher: globe button (top-right) + bottom sheet with all 21 native labels; consumes mobile i18n hook + storage adapter; implements §5/§6.2/§7/§8.4 |
| 4 | `apps/mobile/src/components/LanguageSwitcher.test.tsx` | RNTL unit tests: renders, opens sheet, selects → `setLocale` + persist, sheet dismiss, a11y roles |
| 5 | `apps/web/components/languageSwitcherTokens.ts` | Switcher-local tokens (mirrors `landingTokens.ts` pattern): `LANGUAGE_LABELS` (native + EN-hint map, §3.3), drop shadow, gradient-active-wash value — defined once, reused by header/footer variants |

### 10.2 Modify (integration points)

| # | File (relative to `app/`) | Change |
|---|---|---|
| 6 | `apps/web/components/Header.tsx` | Import + mount `<LanguageSwitcher />` (variant header) inside the `Right` cluster before `LogInLink`; mount the mobile-panel row `<LanguageSwitcher variant="mobile-panel" />` inside `MobilePanel` between nav links and `Log In` (renders only ≤ 768px) |
| 7 | `apps/web/components/Header.test.tsx` | Update to assert the switcher trigger exists + tab order (after nav, before Log In); no copy assertions beyond switcher chrome |
| 8 | `apps/web/components/Footer.tsx` | Import + mount `<LanguageSwitcher variant="footer" />` in the footer utility row, inline-end of `Copyright` |
| 9 | `apps/web/components/Footer.test.tsx` (or `home-view`/page tests) | Update if switcher mount changes existing assertions (e.g. footer grouping); add presence check |
| 10 | `apps/web/app/layout.tsx` | Reactively set `<html lang={locale} dir={dir}>` from the i18n provider/arch cookie read (server initial + client updates); mount the i18n provider (arch's) around children if arch mounts it here rather than in a page |
| 11 | `apps/web/app/registry.tsx` | No change unless arch requires the provider inside the styled registry boundary — engineer follows arch mount contract; listed here so the switcher's client provider scope is explicit |
| 12 | `apps/mobile/src/screens/HomeScreen.tsx` | Add `<LanguageSwitcher />` (corner placement, §5) |
| 13 | `apps/mobile/App.tsx` | Mount mobile i18n provider + `I18nManager` direction handling per arch contract (so the switcher's `setLocale` reaches the screen) |
| 14 | `apps/web/app/home-view.tsx`, `apps/web/components/MenuPageShell.tsx` | **No change required** (Header/Footer already mounted there); verify only — listed to make explicit that the switcher rides on the existing mounts and needs no new page-level wiring |

### 10.3 Test surface (engineer-owned, non-exhaustive)

- New `LanguageSwitcher.test.tsx` (web) + `LanguageSwitcher.test.tsx` (mobile) as above.
- Existing e2e: add/extend a spec asserting the switcher is visible in header +
  footer, selecting a locale persists via cookie, and reloading keeps the
  choice (validation role TASK-274 covers final audit).

---

## 11. Acceptance Criteria

1. Switcher renders in the **web header** (desktop right cluster + mobile
   panel) and **web footer** (utility row) using the same component with
   variant props.
2. Switcher renders on the **mobile home screen** top-right corner with a
   bottom-sheet list.
3. All 21 locales listed with **native autonyms** (`Español`, `Deutsch`,
   `日本語`, …) + muted EN hints on desktop.
4. Selecting a locale switches the UI **immediately** — no reload, no flash;
   `<html lang>`/`dir` update reactively (web); `I18nManager` flips (mobile).
5. Selection persists in the **cookie** (name/value per arch contract; 1-year
   expiry; `SameSite=Lax`); cookie wins over auto-detect on next visit.
6. `ar` / `fa` selections produce `dir="rtl"` and the switcher mirrors
   (panel alignment flips to inline end; mobile globe flips corner).
7. A11y: trigger `aria-label` localized, `aria-expanded`/`aria-controls`,
   listbox/option roles, full keyboard nav (§8.3), focus returns to trigger,
   visible focus ring.
8. Switcher consumes locale keys (`switcher.*`) from the arch inventory —
   **no hardcoded English copy** authored by this role or the engineer outside
   the arch key contract; native-label map (§3.3) is the only static switcher
   data.
9. `fe-i18n-integration` matrix green: `pnpm lint` 4/4, `pnpm typecheck` 4/4,
   `pnpm test`, `pnpm test:e2e`, `pnpm --filter @joinorigin/web build`.
10. This spec itself edits **zero** implementation files (design doc only).

---

## 12. Open Decisions / Ownership

| Item | Owner |
|---|---|
| Exact cookie name + normalization table | `arch-i18n` (TASK-251) — switcher consumes |
| `switcher.*` locale key names | `arch-i18n` + translators — switcher consumes via `t()` |
| i18n provider mount point + `useI18n` signature | `arch-i18n` — switcher consumes |
| Mobile storage adapter (AsyncStorage vs cookie) | `arch-i18n` — switcher consumes |
| Web listbox pattern (native `<select>` vs custom ARIA listbox) | Engineer may choose; behavior contract §6/§8 is normative |

---

## Navigation Footer

- **Up:** [`../README.md`](../README.md) — design docs index
- **Related:** [`sprint-9-i18n-arch.md`](./sprint-9-i18n-arch.md) (upstream arch contract) · [`sprint-8-menu-redesign.md`](./sprint-8-menu-redesign.md) (design-language precedent)
- **Consumers:** `fe-i18n-integration` (TASK-273)
- **Verifiers:** `e2e-i18n-validation` (TASK-274)
