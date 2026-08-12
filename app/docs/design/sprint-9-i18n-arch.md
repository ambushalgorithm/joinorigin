# Sprint 9 — JoinOrigin i18n & Localization Architecture

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`./README.md`](./README.md) · **Consumers:** `fe-i18n-integration` (TASK-273) · **Switcher spec:** [`sprint-9-i18n-switcher.md`](./sprint-9-i18n-switcher.md) (produced by `design-i18n-switcher`, TASK-252) · **Translators:** 20 locale roles (TASK-253…TASK-272) · **Verifier:** `e2e-i18n-validation` (TASK-274)

## 1. Purpose

This document is the **build-ready technical architecture** for Sprint 9
internationalization (i18n) of the JoinOrigin product — web (`apps/web`,
Next.js 16 App Router + React 19 + styled-components) and mobile
(`apps/mobile`, React Native 0.87 + styled-components/native).

It defines:

1. **The shared `@joinorigin/i18n` package** — the single dictionary engine
   consumed by both web and mobile, wrapping `i18next` + `react-i18next` so
   application code never imports i18n libraries directly.
2. **The locale JSON schema and key-naming convention** — nested JSON files
   under `packages/i18n/locales/{lang}.json`; the full dotted key path
   (e.g. `home.hero.headline`) is the translation contract. `en.json` is the
   **source of truth**; every one of the 20 translator roles mirrors its keys
   exactly.
3. **Locale resolution** — automatic browser/OS language detection with EN
   fallback, manual switcher cookie persistence, and the precedence order
   that ties them together.
4. **RTL layout strategy** for `ar` and `fa` — `dir` metadata in the locale
   files, `dir=rtl` on the web document, mirrored CSS/logical properties, and
   React Native `I18nManager` RTL forcing.
5. **Scope boundaries** — exactly which strings are translated and which are
   deliberately excluded (docs, sitemap, llms.txt, SEO metadata internals,
   API routes).

This is a **design document only**. It specifies files, schemas, contracts,
and the resolution algorithm so `fe-i18n-integration` can implement directly
without further architectural decisions.

### 1.1 Deliverables

| Deliverable | Path |
|---|---|
| Architecture doc (this file) | `app/docs/design/sprint-9-i18n-arch.md` |
| Base EN inventory — source of truth for all translators | `app/packages/i18n/locales/en.json` |

### 1.2 Scope boundaries

- **In scope — translated (all user-facing copy):**
  - Web: home page (hero typewriter headline + accent, CTA, supporting copy,
    trust row, definition, partner marquee label, FAQ block), sticky header,
    footer, waitlist modal (form labels, placeholders, errors, success),
    CTA band, orbit visualization hub, **all 7 menu pages** (Features,
    Community, Docs, About, Contact, Privacy, Terms) including their FAQ
    data, and the 404 page.
  - Mobile: `HomeScreen` copy (badge, title, subtitle).
  - All `aria-label`, `alt`, `label`, and `placeholder` attributes that are
    user-facing accessibility text.
- **Out of scope — NOT translated (remain English in Sprint 9):**
  - Repo documentation (`docs/`, `README.md` files) — content is developer
    facing, not product UI.
  - SEO metadata internals: `metadata` exports in page wrappers,
    `lib/seo/{site,routes,metadata,llms,jsonLd,url}.ts` titles/descriptions,
    `sitemap.ts`, `robots.ts`, `llms.txt`.
  - API routes: `app/api/leads/route.ts` keeps English server messages; the
    finite set of error messages it returns is mapped to localized keys
    client-side in the waitlist modal (see §7.5). No API/server code change.
  - Test files, code comments/docstrings, asset URLs/filenames.
  - **Brand terms never translated:** `JoinOrigin`, `Origin` (product name),
    `Matrix`, `AGPL-3.0`, `LinkedIn`, `Discord`, `Reddit`, `GitHub`.
    (Roadmap phase titles and all other prose ARE translated.)

> Note for `fe-i18n-integration`: TASK-273 mentions "SEO metadata" in the wire
> list. Per this arch's scope boundary, page `<title>`/`description` metadata
> stays hardcoded English in Sprint 9 — the i18n provider must simply not
> break the existing server metadata. A future sprint can extend the schema
> with a `seo.*` namespace + `hreflang` alternates.

---

## 2. Locale Matrix

21 locales total (EN base + 20 translations). File names use the exact BCP-47
tags below; `dir` is the layout direction applied when the locale is active.

| Lang code | File | Language | dir |
|---|---|---|---|
| `en` | `en.json` | English (base / fallback) | ltr |
| `es` | `es.json` | Spanish | ltr |
| `pt-BR` | `pt-BR.json` | Portuguese (Brazil) | ltr |
| `fr` | `fr.json` | French | ltr |
| `de` | `de.json` | German | ltr |
| `ru` | `ru.json` | Russian | ltr |
| `ja` | `ja.json` | Japanese | ltr |
| `ko` | `ko.json` | Korean | ltr |
| `zh-CN` | `zh-CN.json` | Chinese (Simplified) | ltr |
| `zh-TW` | `zh-TW.json` | Chinese (Traditional) | ltr |
| `ar` | `ar.json` | Arabic | **rtl** |
| `hi` | `hi.json` | Hindi | ltr |
| `id` | `id.json` | Indonesian | ltr |
| `tr` | `tr.json` | Turkish | ltr |
| `it` | `it.json` | Italian | ltr |
| `pl` | `pl.json` | Polish | ltr |
| `nl` | `nl.json` | Dutch | ltr |
| `vi` | `vi.json` | Vietnamese | ltr |
| `th` | `th.json` | Thai | ltr |
| `uk` | `uk.json` | Ukrainian | ltr |
| `fa` | `fa.json` | Persian (Farsi) | **rtl** |

```ts
export const SUPPORTED_LOCALES = [
  'en', 'es', 'pt-BR', 'fr', 'de', 'ru', 'ja', 'ko', 'zh-CN', 'zh-TW',
  'ar', 'hi', 'id', 'tr', 'it', 'pl', 'nl', 'vi', 'th', 'uk', 'fa',
] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
```

---

## 3. Library & Approach

### 3.1 Decision: `i18next` core + `react-i18next` bindings (wrapped)

The single shared engine is **`i18next` (core) + `react-i18next` (React
bindings)** because it is the only mainstream choice that works identically
across both targets in this monorepo:

- **Web (Next.js 16 App Router):** react-i18next works in client components
  (`useTranslation`), and i18next works server-side with a per-request
  `createInstance` for RSC/layouts/FAQ JSON-LD.
- **Mobile (React Native 0.87):** react-i18next ships RN support out of the
  box (`initReactI18next` works with `react-native`), so the same dictionary
  loading and `t()` API serve `HomeScreen`.

Alternative evaluated and rejected: `next-intl` (excellent App Router
integration but web-only — would force a second implementation for mobile)
and a hand-rolled `t()` (zero deps but reimplements interpolation, plural
rules, and escaping for 21 locales — not worth the risk).

### 3.2 Package layout — `packages/i18n` (new workspace package)

`pnpm-workspace.yaml` already globs `packages/*`, so the new package is picked
up automatically. **The two application packages never import i18next
directly** — they import from `@joinorigin/i18n`, keeping the dependency
boundary clean and testable.

```
app/packages/i18n/
├── package.json                 # name: @joinorigin/i18n, deps: i18next, react-i18next
├── tsconfig.json
├── jest.config.js
├── index.ts                     # public API (below)
├── resolve.ts                   # resolveLocale(), getDir(), locale normalization
├── loader.ts                    # loadDictionary(), getDictionary(), getT()
├── provider.tsx                 # I18nProvider (web) + useI18n()/useDir() hooks
├── scripts/
│   └── check-keys.ts            # key-parity validator for translators + CI
└── locales/
    ├── en.json                  # ← SOURCE OF TRUTH (delivered by this task)
    ├── es.json                  # translator roles produce these (mirror en.json)
    ├── pt-BR.json
    └── … (20 locale files total)
```

Public API (`index.ts`):

```ts
export { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './resolve';
export { resolveLocale, getDir, normalizeLocale } from './resolve';
export { loadDictionary, getDictionary, getT } from './loader';
export { I18nProvider, useI18n, useDir } from './provider';
```

Dependency note: `i18next` + `react-i18next` are pinned via the root
`pnpm.overrides` style already used for React/styled-components if version
conflicts ever appear; no override is expected at install time.

### 3.3 Dictionary loading strategy

- **Locale files are plain JSON** and are imported by the loader, not fetched
  at runtime (no network, no CDN — matches the repo's locally-hosted-assets
  rule).
- **Web client:** lazy per-locale loading via dynamic `import()` of the
  active locale JSON; `en.json` is statically imported as the guaranteed
  fallback so the app always renders. Code-splitting keeps the initial bundle
  lean (only the active locale + EN).
- **Server (RSC/layouts):** `getDictionary(locale)` synchronously returns the
  locale object (static import map). Server wrappers use it for the FAQ
  JSON-LD mirror (§7.4) and `<html lang dir>`.
- **Mobile:** `loadDictionary(locale)` resolves at startup (Metro bundles all
  JSON; acceptable for the current single-screen app).

### 3.4 Why a top-level `dir` key and not a separate map

`dir` lives in the locale file itself (reserved top-level metadata key, not a
translatable string) so that (a) locale files are self-describing, (b) the
translator role for `ar`/`fa` explicitly owns the RTL flag, and (c) the loader
can expose `getDir(locale)` with zero external config. See §8.

---

## 4. Locale JSON Schema & Key Naming Convention

### 4.1 Schema

```jsonc
{
  // Reserved metadata — NOT a translatable string.
  // "rtl" ONLY for ar.json and fa.json; "ltr" everywhere else.
  "dir": "ltr",

  // Namespaces: nested objects; full key = dotted path.
  "home": {
    "hero": {
      "headline": "Ideas, projects and community collaboration space — …",
      "headlineAccent": "Origin.",
      "startProject": "Start Project",
      "trustAvatarsAlt": "JoinOrigin member {{number}}"
    }
  },

  "footer": {
    "tagline": "Where teams find their origin"
  }
}
```

- **Values:** always JSON strings. No arrays, no numbers, no booleans —
  anything structural (FAQ lists, nav lists, roadmap phases) is modeled with
  indexed keys (`q1`, `q2`, … `phase1`, `phase2`, …) so translators never
  reorder or reshape data.
- **Interpolation:** i18next `{{variable}}` syntax, e.g.
  `home.hero.trustAvatarsAlt: "JoinOrigin member {{number}}"`. Variables are
  passed as `t('home.hero.trustAvatarsAlt', { number: 3 })`.
- **Escaped entities:** JSON files store plain text/typographic characters
  (e.g. `’`, `“ ”`, `—`, `→`). No HTML entities — components render
  `React.escape`-safe text or `Trans` for rich text (below).
- **Rich text / inline links:** sentences containing a link use i18next
  `Trans` numbered tags `<1>…</1>`, e.g.
  `about.readingDocs: "Read the <1>docs</1> for the core objects, roadmap, and architecture."`
  The FE renders with `<Trans i18nKey="about.readingDocs" components={[<AccentLink key="l" href="/docs" />]} />`.
  Every `<N>` tag maps positionally to a component in the `components` array.
  Only keys that legitimately need markup use this form (about reading list,
  contact other ways, privacy/terms contact bodies).
- **Line breaks:** only `contact.mailtoBody` intentionally contains `\n`
  (email composition). All other values are single-line.

### 4.2 Key naming rules

1. **Namespaced by surface**, lowercased: `common`, `header`, `footer`,
   `home`, `waitlist`, `ctaBand`, `features`, `community`, `docs`, `about`,
   `contact`, `privacy`, `terms`, `orbitViz`, `notFound`, `mobile`.
2. **Nested path segments** are lowerCamelCase words, no hyphens/underscores:
   `home.hero.headline`, `waitlist.namePlaceholder`,
   `features.comparison.linkedin.gap`.
3. **Reused UI vocabulary** lives under `common` (`common.faqHeading`,
   `common.nav.features`, `common.objects.profiles`,
   `common.values.peopleFirst`, `common.roadmap.phase1Title` …) so shared
   strings are translated once and referenced by the same key everywhere.
4. **FAQ entries:** `{surface}.faq.q{N}.question` / `{surface}.faq.q{N}.answer`
   (N starts at 1). FAQ data exists for home (5), features (4), community (5),
   docs (4), about (3 inline), contact (2 inline).
5. **Numeric/ordinal sequences** (roadmap phases, acceptable-use bullets,
   core objects) use descriptive leaf names (`phase1`…, `unlawful`…,
   `profiles`…), not opaque indexes, so translators can tell what they are
   translating.
6. **The dotted path is the contract.** A locale file is valid iff its
   flattened key set equals `en.json`'s flattened key set minus `dir`.
   Validation: `pnpm --filter @joinorigin/i18n check-keys` (see §10).

### 4.3 Translation guidance for translator roles

- Mirror `en.json` keys **exactly** — no missing, extra, or renamed keys.
- Keep brand terms untranslated (see §1.2 list).
- Keep `{{variable}}` placeholders intact and in the correct position.
- Keep `<1>`, `<2>` rich-text tags intact and in the correct position.
- `ar.json` and `fa.json` MUST set top-level `"dir": "rtl"`.
- Write natural, idiomatic copy in the target language; do not transliterate
  English word order. Line length is not enforced (UI wraps).

---

## 5. Locale File Convention

- **Location:** `app/packages/i18n/locales/{lang}.json`
- **Naming:** the exact BCP-47 code from §2 (case matters for `pt-BR`,
  `zh-CN`, `zh-TW`).
- **One file per locale**, flat-ish nested JSON per §4.1.
- `en.json` is the **source of truth** — created by this task, never edited
  by translator roles. All translator roles copy its structure.
- **Key parity enforcement:** `check-keys` compares flattened key sets of
  every locale against `en.json` and fails on any diff (except `dir` value).

---

## 6. Locale Resolution — Auto-Detect + Cookie + Fallback

### 6.1 Precedence (web)

```
1. Cookie "joinorigin_locale"   ← set by manual switcher — WINS if valid
2. Browser/OS language          ← navigator.language (client) /
                                  Accept-Language header (server)
3. DEFAULT_LOCALE ("en")        ← guaranteed fallback
```

Cookie wins when present and resolvable; otherwise the browser/OS language is
used; anything unrecognized falls back to `en`.

### 6.2 `resolveLocale(input)` algorithm

```ts
function resolveLocale(input: string | undefined | null): Locale {
  if (!input) return DEFAULT_LOCALE;
  const normalized = normalizeLocale(input);          // lowercase; '_' → '-'
  if (SUPPORTED_LOCALES.includes(normalized)) return normalized;   // exact match
  const base = normalized.split('-')[0];
  // Region-variant fallback mapping
  if (base === 'pt') return 'pt-BR';                  // pt → pt-BR
  if (base === 'zh') return 'zh-CN';                  // zh → zh-CN (Simplified default)
  // Language-only match (e.g. fr-CA → fr, es-MX → es, ar-EG → ar)
  if (SUPPORTED_LOCALES.includes(base)) return base;
  return DEFAULT_LOCALE;
}
```

`normalizeLocale` maps common BCP-47 forms: `'PT-BR'` → `'pt-br'` →
`'pt-BR'` (canonical casing restored from `SUPPORTED_LOCALES`); `'zh_CN'` →
`'zh-CN'`.

### 6.3 Web resolution flow

**Server (middleware + layout):**

1. `apps/web/middleware.ts` reads `cookies().get('joinorigin_locale')`; if
   valid, resolves to that locale. Otherwise resolves from the
   `Accept-Language` request header (first supported match via
   `resolveLocale`). It forwards the result in a request header
   `x-joinorigin-locale` (no URL rewrite — URLs stay clean, no `[locale]`
   segment in Sprint 9).
2. Root layout (`app/layout.tsx`, server) reads the header, resolves
   `dir = getDir(locale)`, and renders:
   ```tsx
   <html lang={locale} dir={dir}>
   ```
   and provides the locale to the client provider.

**Client (hydration + SPA):**

3. `I18nProvider` (client) reads the cookie first; if absent, falls back to
   `navigator.language` via `resolveLocale`. This covers browsers whose
   `navigator.language` differs from the server's `Accept-Language` and
   guarantees the EN fallback. The provider sets
   `document.documentElement.lang` / `.dir` when the locale changes so the
   document direction stays correct across client navigations.

> No implicit cookie is written for auto-detection — the cookie exists only
> after the user explicitly picks a language in the switcher (§7).

### 6.4 Mobile resolution flow

`apps/mobile` resolves the device OS language at startup:

- iOS: `NativeModules.SettingsManager.settings.AppleLocale` (or
  `AppleLanguages[0]`).
- Android: `NativeModules.I18nManager.localeIdentifier` (or
  `I18nManager.getConstants().localeIdentifier`).
- Normalize through the same `resolveLocale()` → `loadDictionary(locale)`.

No cookie in Sprint 9 (no mobile switcher; if a future sprint adds one,
persist the choice with `@react-native-async-storage/async-storage` — the
loader already accepts an explicit locale override).

### 6.5 Manual switcher + cookie persistence (contract with TASK-252)

The switcher UI is specified by `sprint-9-i18n-switcher.md` (design role);
this arch defines the storage/behavior contract the FE implements:

- **Cookie name:** `joinorigin_locale`
- **Value:** the locale code (e.g. `es`, `pt-BR`, `ar`)
- **Attributes:** `path=/; max-age=31536000; SameSite=Lax` (+ `Secure` in
  production). One year expiry.
- **Set on:** explicit user selection in the switcher (web header + footer
  placements per the switcher spec).
- **Effect:** immediate re-render in the new locale (client state via the
  provider) + `document.documentElement.lang/dir` update; no full page reload
  required. Subsequent server requests pick up the cookie through middleware.
- **Delete on:** no "system default" option in Sprint 9 (cookie persists);
  clearing site data removes it. If the switcher spec later adds a
  "Follow system" option, it deletes the cookie.

---

## 7. Component & Data Contracts

### 7.1 TypewriterHeading (web home hero)

- Keys: `home.hero.headline` (full text) and `home.hero.headlineAccent`
  (gradient-accent fragment).
- EN: headline =
  `Ideas, projects and community collaboration space — where teams and the best projects find their Origin.`
  and `headlineAccent = "Origin."` (matches the user's byte-identical
  FULL_TEXT/SPLIT_INDEX semantics: block = first 97 chars, accent = last 7).
- **Locale-aware split:** the component MUST NOT hardcode `SPLIT_INDEX =
  length - 7`. Instead it finds `headlineAccent` inside the translated
  `headline` (case-insensitive `indexOf`) and splits there; if the accent is
  not found, it renders the whole headline unstyled (no crash).
- Typewriter timing (`CHAR_DELAY_MS = 20`, `START_DELAY_MS = 400`, blinking
  caret) stays as-is for all locales; per-locale timing is a future config.

### 7.2 Waitlist modal errors

`app/api/leads/route.ts` is **out of scope** and keeps English messages.
`fe-i18n-integration` maps the finite set of server messages to localized
keys in the client `leadsApi`/modal:

| Server message | Locale key |
|---|---|
| `Something went wrong. Please try again.` (client/network) | `waitlist.errors.generic` |
| `Name and email are required.` | `waitlist.errors.nameEmailRequired` |
| `Name is required.` | `waitlist.errors.nameRequired` |
| `Name must be 120 characters or fewer.` | `waitlist.errors.nameTooLong` |
| `Enter a valid email address.` | `waitlist.errors.emailInvalid` |
| `Too many requests. Try again in a minute.` | `waitlist.errors.rateLimited` |

Any unrecognized server message falls back to `waitlist.errors.generic`.

### 7.3 Contact form mailto templates

`contact.mailtoSubject` and `contact.mailtoBody` are localized templates with
`{{name}}`, `{{email}}`, `{{message}}` interpolation
(`contact.newMessage` is the fallback subject name). The `mailto:` link is
built from the localized strings by the FE.

### 7.4 FAQ data + FAQPage JSON-LD mirror

FAQ content currently lives in `home-data.ts`, `features-data.ts`,
`community-data.ts`, `docs-data.ts` and inline in the about/contact views.
It moves into the dictionaries as `{surface}.faq.q{N}.{question,answer}`.
The **server wrappers** (`app/page.tsx`, `app/features/page.tsx`, …) render
the FAQPage JSON-LD from the same localized FAQ
(`getDictionary(locale).home.faq`), preserving the existing 1:1 visible ↔
structured-data mirror. This is a side-effect of localization — the FAQ
**content** is user-facing copy and is translated; the JSON-LD **machinery**
(`lib/seo/jsonLd.ts`) is untouched.

### 7.5 Menu nav & footer group labels

`common.nav.*` and `footer.group*` keys replace the hardcoded `NAV_LINKS` /
`FOOTER_GROUPS` labels; hrefs stay hardcoded (routes are not localized in
Sprint 9).

---

## 8. RTL Strategy (ar / fa)

### 8.1 Data contract

`ar.json` and `fa.json` carry `"dir": "rtl"` at the top level; every other
locale file carries `"dir": "ltr"`. `getDir(locale): 'ltr' | 'rtl'` returns
the value (defaults `'ltr'` for robustness).

### 8.2 Web — document + layout flip

1. `<html lang={locale} dir={dir}>` is rendered server-side (layout) and kept
   in sync client-side by the provider (§6.3). All browser default
   directionality, text alignment, and list/bullet placement flip
   automatically with `dir=rtl`.
2. **Global baseline:** new/modified CSS uses **logical properties**
   (`margin-inline-start/end`, `padding-inline`, `inset-inline-start/end`,
   `border-inline-start`, `text-align: start/end`) so layouts mirror without
   per-component RTL overrides.
3. **Existing hardcoded physical properties to convert** (checklist for
   `fe-i18n-integration` — do NOT change visual results in ltr, only enable
   mirroring):

   | File | Physical property | Logical replacement |
   |---|---|---|
   | `Header.tsx` `Nav` | `margin-left: xxl` | `margin-inline-start: xxl` |
   | `WaitlistModal.tsx` `CloseButton` | `right: 16px` | `inset-inline-end: 16px` |
   | `HeroLeft.tsx` `TrustAvatar` | `margin-left: -12px` / `:first-child` | `margin-inline-start` |
   | `menuPagePrimitives.ts` `TableHeader` | `text-align: left` | `text-align: start` |
   | `menuPagePrimitives.ts` `BulletList` | `padding-left` | `padding-inline-start` |
   | `menuPagePrimitives.ts` `Quote` | `border-left: 3px` | `border-inline-start` |
   | `menuPagePrimitives.ts` `SectionTitle` | `padding-left` + `::before { left: 0 }` | `padding-inline-start` + `inset-inline-start: 0` |

4. **Directional icons/arrows:** chevron icons (Start Project, Explore
   communities `→`) mirror under RTL — either `transform: scaleX(-1)` via an
   RTL-aware styled rule (`[dir='rtl'] &` / `dir` theme flag) or, where the
   arrow is part of a string (e.g. `notFound.exploreCommunities`), the
   translator uses the appropriate directional glyph (`←`) in the locale
   file. The FE should treat a trailing `→` in the EN string as directional
   and flip it in RTL regardless of the translated text (or accept the
   translator-provided glyph — the arch prefers a CSS flip on the icon).
5. **Fonts:** Urbanist/Inter are Latin-only and are already followed by
   `system-ui, sans-serif` fallbacks in `GlobalStyles`/theme, so Arabic and
   Persian text renders via system fonts (no new font files in Sprint 9;
   custom Arabic/Persian webfonts are a future enhancement).

### 8.3 Mobile — React Native

1. At startup, after resolving the locale:
   ```ts
   import { I18nManager } from 'react-native';
   I18nManager.allowRTL(true);
   I18nManager.forceRTL(getDir(locale) === 'rtl');
   ```
2. RN flexbox automatically mirrors `flexDirection: row` layouts and default
   text alignment when RTL is forced, so the existing `HomeScreen` mirrors
   without layout changes.
3. Known RN caveat: on Android, `forceRTL` requires an app restart to fully
   take effect on the native side; on iOS it applies immediately. Documented
   as an accepted limitation for Sprint 9 (single-screen app).

### 8.4 `useDir()` hook

`packages/i18n` exports `useDir()` returning the active locale's `dir` for
any component that must branch on direction (icons, decorative elements).
Web provider also sets a `data-dir` attribute on the root for CSS selectors.

---

## 9. Implementation File Plan (for `fe-i18n-integration`, TASK-273)

New files:

- `packages/i18n/` (package.json, tsconfig, jest.config, index.ts, resolve.ts,
  loader.ts, provider.tsx, scripts/check-keys.ts, locales/*.json)
- `apps/web/middleware.ts` (locale resolution header)

Web — replace hardcoded user-facing strings with `t()`/`Trans`:

- `components/Header.tsx` (nav labels, Log In, Get Started, aria)
- `components/Footer.tsx` (tagline, groups, waitlist CTA, copyright, aria)
- `components/HeroLeft.tsx` (Start Project, supporting, trust copy, avatar alts)
- `components/TypewriterHeading.tsx` (headline + accent, locale-aware split)
- `components/LogoMarquee.tsx` (label, partner alts)
- `components/OrbitViz.tsx` (aria-label, member alts, "Members", count locale)
- `components/CtaBand.tsx` (headline, subline, join label, contact label)
- `components/WaitlistModal/WaitlistModal.tsx` (+ `leadsApi.ts` error mapping)
- `app/layout.tsx` (html lang/dir)
- `app/page.tsx` + `home-view.tsx` (definition, FAQ heading, FAQ data)
- 7 menu views + page wrappers: `features`, `community`, `docs`, `about`,
  `contact`, `privacy`, `terms` (hero eyebrow/title/lead, sections, cards,
  tables, roadmap, FAQ, contact form, mailto templates, CTA override)
- `app/not-found.tsx` (brand, heading, copy, back home, explore)

Mobile:

- `apps/mobile/App.tsx` (I18nProvider + RTL init)
- `apps/mobile/src/screens/HomeScreen.tsx` (badge, title, subtitle)

Data modules (`home-data.ts`, `features-data.ts`, `community-data.ts`,
`docs-data.ts`) are refactored to read from the active dictionary (FAQ keys)
or removed if fully superseded.

### 9.1 Count formatting

`formatCount` currently hardcodes `toLocaleString('en-US')`. It becomes
locale-aware (`toLocaleString(activeLocale)`) so `2,400+` renders with the
active locale's grouping. The `+` suffix and `community.joinStatValue`
("2,400+") are translatable strings (`orbitViz.members`,
`community.joinStatValue`).

---

## 10. Testing & Validation

### 10.1 Unit (packages/i18n)

- `resolveLocale` fallback matrix: exact, `pt`→`pt-BR`, `zh`→`zh-CN`,
  `fr-CA`→`fr`, garbage→`en`, empty→`en`.
- `getDir`: `ar`/`fa`→`rtl`, others→`ltr`.
- Dictionary load: every locale JSON parses, `dir` present, key parity vs
  `en.json` (the same check `check-keys` runs).

### 10.2 Unit (apps)

- Web: Header/Footer/Hero/Modal render translated strings for a locale
  override (e.g. provider with `es`); `document.documentElement.dir=rtl`
  when locale is `ar`; TypewriterHeading splits on the translated accent.
- Mobile: `HomeScreen` renders translated badge/title/subtitle for a locale
  override; RTL init called for `fa`.

### 10.3 e2e (TASK-274 validation)

- Auto-detect: override `navigator.language` → expected locale renders
  (`/es`, `/ar`, `/pt-BR`, `/ja`, garbage → EN).
- Cookie: set `joinorigin_locale=de` → German renders; cookie wins over
  navigator.language; switcher writes the cookie.
- EN fallback: unknown language → English.
- RTL: `ar`/`fa` pages have `dir=rtl` on `<html>` and mirrored layout
  (smoke assertions on known logical-property elements).
- Key parity: all 21 locales load with identical key sets vs `en.json`.

### 10.4 Validation commands

- `pnpm --filter @joinorigin/i18n test` (resolver + parity)
- `pnpm --filter @joinorigin/i18n check-keys` (manual parity check)
- Full matrix: `pnpm lint` (4/4), `pnpm typecheck` (4/4), `pnpm test`,
  `pnpm test:e2e`, `pnpm --filter @joinorigin/web build`.

---

## 11. Risks & Open Items

1. **Bundle size:** adding i18next + react-i18next to web. Mitigated by
   per-locale dynamic imports (only active locale + EN shipped) and tree
   shaking. If the FE measures a regression in `next build` output size,
   `next/dynamic` the whole provider.
2. **Android RTL restart caveat** (§8.3) — accepted; revisit when the mobile
   app grows past the welcome screen.
3. **No URL prefix / no hreflang** in Sprint 9 — locale is cookie/browser
   driven; SEO-crawlable localized URLs are a future sprint (would add
   `seo.*` keys + route strategy).
4. **Legal copy (privacy/terms) translation** is included because it is
   user-facing product copy; it should be reviewed by a human for
   jurisdiction-specific accuracy before launch (translator roles produce
   natural first-pass translations).
5. **`dir` parity exemption:** `check-keys` ignores the `dir` *value* but
   still asserts the key exists in every locale.

---

## 12. Acceptance Criteria (this task, TASK-251)

- [x] `app/docs/design/sprint-9-i18n-arch.md` produced covering: library/
  approach web + mobile (§3), locale JSON schema + key naming (§4), auto
  browser/OS detection + cookie (§6), manual switcher cookie persistence
  (§6.5), RTL strategy for ar/fa (§8), scope boundaries (§1.2).
- [x] `app/packages/i18n/locales/en.json` produced — complete source of
  truth covering every user-facing string (home/hero/header/footer/modal/7
  menu pages + FAQ data/404/TypewriterHeading/mobile) with flat namespaced
  keys as the contract.
- [x] Locale file convention `packages/i18n/locales/{lang}.json` defined
  (§5) with the 20 lang codes from the sprint brief.
- [x] RTL `dir: "rtl"` contract for ar/fa defined (§8.1).
- [x] Scope excludes docs/sitemap/llms.txt/SEO-metadata-internals/API routes
  (§1.2).
- [x] Zero implementation files edited (arch doc + en.json only).
