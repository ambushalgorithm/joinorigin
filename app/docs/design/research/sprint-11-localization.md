# Sprint 11 — Localizing SEO Content Engine Templates Across 21 Locales (EN-First Strategy)

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`../README.md`](../README.md) · **Task:** TASK-300 `research-localization` · **Consumer:** `arch-seo-content-engine` (TASK-303) · **Sibling research:** `sprint-11-market-competitor.md` · `sprint-11-programmatic-seo.md` · `sprint-11-geodata.md` · `sprint-11-content-strategy.md` · `sprint-11-tech-feasibility.md` · `sprint-11-translation-services.md`
>
> **Status:** Research findings + best-opinion recommendations. **No implementation files were edited** (research-only role).

---

## 1. Purpose

The SEO Content Engine will auto-generate programmatic location pages (city pages
and city × group-type variants) that must reach users and search engines in **21
locales** — the same 21 locales the product already ships in
(`packages/i18n/locales/`, Sprint 9). This report answers the localization
questions the architect (TASK-303) must resolve before designing the engine:

1. What does the **EN-first strategy** (auto-generated city pages ship English
   first, while templates are localized) actually mean for serving locale-specific
   pages — and what are the indexation/SEO consequences?
2. What are the **hreflang / alternate-URL implications** for a site that today
   has **no locale segment in URLs** (locale is cookie/Accept-Language driven)?
3. How should the **21-locale template localization** fit the existing
   `@joinorigin/i18n` dictionary engine, key-parity contract, and RTL handling?
4. What are the **translation sourcing** options (professional / community /
   machine translation) and their **quality + SEO trade-offs** for programmatic
   city pages?

This is a **findings report only** — it documents evidence (primarily Google
Search Central guidance, Next.js capability, and the current codebase) and gives
a best-opinion recommendation set for the architect. It does **not** specify the
implementation.

---

## 2. Current-State Snapshot (evidence from the repo)

### 2.1 The 21-locale i18n system (Sprint 9)

- `packages/i18n/locales/` ships `en.json` (source of truth) + 20 translated
  locales: `es`, `pt-BR`, `fr`, `de`, `ru`, `ja`, `ko`, `zh-CN`, `zh-TW`, `ar`
  (rtl), `hi`, `id`, `tr`, `it`, `pl`, `nl`, `vi`, `th`, `uk`, `fa` (rtl).
- `SUPPORTED_LOCALES` / `DEFAULT_LOCALE = 'en'` / `resolveLocale()` in
  `packages/i18n/src/resolve.ts`; `getDir()` returns `rtl` only for `ar`/`fa`.
- Dictionaries are **flat namespaced nested JSON**, values are strings,
  `{{variable}}` interpolation, `Trans` numbered tags for rich text
  (arch-i18n §4). Key parity vs `en.json` is enforced by
  `scripts/check-keys.ts` (missing/extra keys = failure).
- **Scope boundary (arch-i18n §1.2):** SEO metadata internals (`lib/seo/*`
  titles/descriptions, `sitemap.ts`, `robots.ts`, `llms.txt`) are deliberately
  **NOT translated** in Sprint 9. The arch explicitly says a future sprint can
  extend the schema with a `seo.*` namespace + hreflang alternates.

### 2.2 Locale resolution today — **no locale segment in URLs**

- `apps/web/proxy.ts` resolves locale cookie `joinorigin_locale` → Accept-Language
  → `en`, forwards `x-joinorigin-locale`, **no URL rewrite** (URLs stay clean,
  no `[locale]` segment).
- `apps/web/app/layout.tsx` renders `<html lang={locale} dir={dir}>` server-side
  from the header and seeds the client `I18nProvider`.
- Consequence: today the site is **locale-adaptive** (same URL serves different
  language chrome based on request headers/cookie), while **content is English**
  — matching arch-i18n §1.2's "SEO metadata stays hardcoded English".

### 2.3 SEO route infrastructure

- `lib/seo/routes.ts` `ROUTES` is the single source of truth for public HTML
  pages (8 static pages today); `sitemap.ts` + `llms.txt` + nav derive from it.
- `lib/seo/metadata.ts` `createMetadata` sets `alternates.canonical`, OG/Twitter,
  robots per page; `layout.tsx` sets `metadataBase` + home canonical.
- `robots.ts` allows all crawlers; `llms.txt` is English-only.
- The engine will add **thousands of programmatic pages** — the current `ROUTES`
  array is static, but `sitemap.ts` already shows the pattern for extension.

### 2.4 Next.js 16 capability (evidence)

- Next.js `Metadata.alternates.languages` natively emits
  `<link rel="alternate" hreflang="…">` tags (self + all variants + optionally
  `x-default`) — confirmed in the Next.js 16.3 `generateMetadata` API docs.
- The site already runs Next 16.3 / React 19.2.8 / Turbopack.

---

## 3. Research Findings

### 3.1 Google's authoritative guidance on localized versions

Sources: Google Search Central — *Tell Google about localized versions of your
page* (localized-versions), *Managing multi-regional and multilingual sites*
(managing-multi-regional-sites), *How Google crawls locale-adaptive pages*
(locale-adaptive-pages), *Spam policies for Google web search* (spam-policies),
*Translated results in Google Search* (translated-results), *Google Search's
guidance on using generative AI content* (using-gen-ai-content). All URLs in §8.

Key findings:

1. **hreflang is recommended whenever you have multiple language versions of a
   page — including when "you keep the main content in a single language and
   translate only the template, such as the navigation and footer."**
   (localized-versions §"Some example scenarios"). This is *exactly* the
   EN-first strategy. Google explicitly lists it as a case where telling Google
   about the variants is recommended.

2. **Localized versions are only considered duplicates if the main content of
   the page remains untranslated** (localized-versions). This is the crux: a
   page whose *body copy* is English but whose *chrome* (nav/footer) is
   translated is NOT "duplicate" in Google's eyes **when it is the same URL**.
   It becomes a duplicate problem when you create **separate URLs** that differ
   only in template chrome.

3. **Different URLs are preferred over cookie/browser-driven language
   adaptation**: "Google recommends using different URLs for each language
   version of a page rather than using cookies or browser settings to adjust the
   content language on the page. … If you prefer to dynamically change content
   or reroute the user based on language settings, **be aware that Google might
   not find and crawl all your variations**" (managing-multi-regional-sites
   §"Managing multilingual versions").

4. **Locale-adaptive pages are risky for indexation**: "If your site has
   locale-adaptive pages… Google might not crawl, index, or rank all your
   content for different locales. This is because the default IP addresses of
   the Googlebot crawler appear to be based in the USA. In addition, the crawler
   sends HTTP requests **without setting `Accept-Language`**."
   (locale-adaptive-pages). → Googlebot will fetch the **English** variant of a
   cookie-driven page and may never see locale variants.

5. **Doorway abuse is a hard spam policy**: "Having multiple domain names or
   pages targeted at specific regions or cities that funnel users to one page"
   and "Creating substantially similar pages that are closer to search results
   than a clearly defined, browseable hierarchy" are listed as doorway abuse
   (spam-policies §"Doorway abuse"). Programmatic city pages + template-only
   translations **at separate URLs** are the classic doorway-adjacent pattern to
   avoid.

6. **Scaled content abuse**: "Using generative AI tools or other similar tools
   to generate many pages without adding value for users" and "Scraping… through
   automated transformations like **synonymizing, translating**, or other
   obfuscation techniques, where little value is provided" are scaled-content
   abuse (spam-policies §"Scaled content abuse"). **Translating a thin template
   into 20 locales multiplies thin content 21×** — the fastest route to a
   scaled-content flag.

7. **Google already translates results for you**: Google Search may machine
   translate **titles and snippets** into 20+ languages (including es, fr, de,
   pt, hi, id, tr, th, vi, ar, fa, ru, ja, ko, zh-CN, zh-TW among others) via
   *Translated results* — users see a translated title/snippet and can open the
   page in the original language or a machine translation (translated-results).
   This is a critical strategic fact: **English-first pages already reach
   non-English searchers** through Google's own translation layer, without us
   shipping a single translated page. There is a `notranslate` opt-out — we
   would simply not use it.

8. **Generative-AI guidance**: quality, accuracy, and relevance matter "especially
   when automatically generating the content" (using-gen-ai-content); give users
   context about how content was created.

### 3.2 The EN-first strategy — what it means and its consequences

Proposed strategy (as framed in the sprint brief): **auto-generated city pages
ship EN-first while templates are localized.**

- "Templates are localized" = the page **chrome** (nav, footer, headings,
  labels, CTAs, common copy) comes from the 21-locale dictionaries; the **body
  content** (city description, community ideas, how-to body) is authored in
  English.
- "Ship EN-first" = the canonical URL for `/location/<country>/<region>/<city>`
  serves English body content to everyone, with locale chrome selected by the
  existing cookie/Accept-Language resolution.

Findings on what this means for serving locale-specific pages:

- **For a single URL** (no locale segment): this is safe and is literally
  Google's "translate only the template" scenario. Google will index the English
  page (Googlebot, US IP, no Accept-Language), and *Translated results* gives
  multilingual SERP reach. There is no duplicate risk because there is only one
  URL. **This is the recommended default for the bulk of programmatic pages.**
- **If we create locale-prefixed URLs** (e.g. `/es/location/…`) **before the
  body content is genuinely translated**, we create near-duplicate pages that
  differ only in chrome → duplicate-content signals, doorway-abuse risk
  ("multiple pages targeted at regions/cities funneling to one page"), and a
  scaled-content multiplier. **Do not publish locale URLs with untranslated
  body.**
- **If we create locale-prefixed URLs with genuinely translated body content**
  (real, human-or-MT-post-edited translations that add value), that is the
  correct multi-language pattern: distinct URLs + hreflang + per-locale
  canonical. This should be the *second* phase, applied to a *curated subset*
  first (flagship cities), not to all pages at once.

So "EN-first" is best read as a **phased rollout**, not a URL-per-locale
requirement: phase A = EN at canonical URLs with localized chrome (cookie-driven
UX) + rely on Translated results; phase B = progressively publish genuinely
translated city pages at locale URLs with full hreflang clusters, starting with
high-value cities/locales.

### 3.3 hreflang / alternate-URL implications

If the architect follows the recommended phased approach, the hreflang story is:

- **Phase A (EN-only URLs):** No hreflang cluster is needed yet. Each city page
  sets `alternates.canonical` to its EN URL. Optionally an `x-default` →
  canonical EN mapping is trivially valid (x-default points to the EN page,
  which is the fallback for unmatched languages). Since there are no alternate
  locale URLs, adding `alternates.languages` is **premature** — Google requires
  bidirectional links; a one-sided hreflang set is ignored (localized-versions
  §"Guidelines"). Clean canonical + sitemap is correct.
- **Phase B (translated locale URLs):** For each page family
  (`/location/…`, `/es/location/…`, `/de/location/…`, …) emit the full hreflang
  set: **each variant lists itself + every other variant + `x-default`** →
  EN canonical. URLs must be absolute. Next.js supports this natively via
  `alternates.languages` in `generateMetadata`. The sitemap must include
  `<xhtml:link rel="alternate" hreflang=…>` child entries per URL (Google's
  sitemap extension) — the current `sitemap.ts` pattern extends naturally.
- **Locale-adaptive warning applies to the existing site today:** the product
  pages (home, features, etc.) are cookie-driven with no locale URLs. Google may
  not crawl non-EN chrome variants — which is **acceptable** for a waitlist site
  whose SEO value is EN "social collaboration network" queries, and arch-i18n
  §1.2 already scopes SEO metadata to English. The architect should not attempt
  to make *existing* chrome-only variants indexable per-locale; that would
  create the duplicate/doorway pattern. Localized-product-SEO is a separate,
  later question.
- **RTL:** `ar`/`fa` pages must render `dir="rtl"` (already handled by
  `getDir`). No extra work for EN-first phase; required for phase-B ar/fa pages.
- **URL language/script:** Google allows localized words and UTF-8 in URLs
  (managing-multi-regional-sites §"Use language-specific URLs"). Recommendation
  for phase B: keep the **path in English** (`/location/us/california/san-francisco`)
  and vary only the locale prefix (`/es/location/…`) — avoids transliteration
  complexity and matches the content-strategy/geodata slugs.

### 3.4 Fitting the 21-locale template localization into `@joinorigin/i18n`

Findings on the fit:

- **Good fit for chrome:** the engine's *chrome* keys (nav, footer, hero labels,
  "Start a community in {city}", CTA copy, FAQ headings, "Join the waitlist") fit
  the existing dictionary contract cleanly. Adding a `seoContent` / `location`
  namespace to `en.json` + the 20 locale files keeps the arch-i18n contract:
  one source of truth, key parity via `check-keys`.
- **Bad fit for body copy at scale:** the *body content* of thousands of city
  pages is **data/content, not UI chrome**. Putting every city description into
  `en.json` would balloon the dictionaries and conflate content with UI. The
  architect should keep **body copy as authored content files** (per city /
  template variant, per locale when translated), and use `@joinorigin/i18n`
  only for chrome + shared sentence fragments (e.g. "in {{city}}", "communities
  in {{city}}") that benefit from translation + interpolation.
- **Key-parity contract must be extended consciously:** `check-keys` asserts
  exact key parity. Adding a `seoContent.*` namespace with hundreds of keys
  means all 20 locale files must carry them (empty string or EN fallback).
  **Recommendation:** phase A adds only a *small* `seoContent` chrome namespace
  (a few dozen keys, fully translated — the product already has 20 translator
  locale files); it does **not** add per-city body keys to the dictionaries.
  Body translation lives in content files, not locale JSONs.
- **Plurals/interpolation:** i18next handles `{{count}}` and plural keys, but
  the current contract stores only strings. For phase B, city-page sentence
  fragments with count/plurals need plural-aware keys (e.g.
  `seoContent.communityCount` with `_one`/`_other`), which `check-keys` must
  treat specially. Flag for the architect.
- **Brand terms:** `JoinOrigin`, `Origin`, `Matrix` stay untranslated
  (arch-i18n §1.2) in all chrome keys.
- **Number/date formatting:** `formatCount` already becomes locale-aware
  (`toLocaleString(locale)`); the engine's city stats must do the same.

### 3.5 Translation sourcing: professional / community / MT — quality + SEO trade-offs

(Detailed cost/complexity for MT is the sibling report
`sprint-11-translation-services.md`; here we evaluate sourcing strategy and
SEO/quality trade-offs.)

| Source | Quality | Cost | Speed | SEO fit | Risks |
|---|---|---|---|---|---|
| **Professional (LSP/human translators)** | Highest; idiomatic, culturally local | High (per word; typically $0.08–0.30/word, or per page) | Slow | Best for flagship pages; native language helps local relevance signals | Cost × 21 locales × many cities is unbounded — only viable for a curated set |
| **Community (waitlist members / early users)** | Variable; good for brand-community vibe, uneven coverage | Low/none (credits, swag, early access) | Slow, inconsistent | Good for authenticity + UGC-adjacent trust, but risky for quality consistency on public SEO pages | Quality variance; moderation/review burden; licensing/attribution questions; latency |
| **Machine translation (DeepL / Google / Azure)** | High for template-style short strings (chrome); good-to-mid for longer prose; best for EU languages, weaker for low-resource pairs; needs post-editing for publication quality | Near-free at scale (see sibling report) | Instant | **Phased:** MT for chrome is already done (the 20 locale files were human/agent translated in Sprint 9). MT for body copy should be **post-edited** before indexation, or left to Google's Translated results instead of shipping MT pages | Published raw MT at scale → scaled-content-abuse risk, duplicate risk if combined with locale URLs, quality damage to brand |
| **Hybrid (recommended)** | MT first pass + professional/native post-edit (PEMT) for the subset that gets locale URLs | Moderate, only for the subset | Fast for bulk, human gate for publish | Best balance: instant multilingual chrome, curated quality for indexed locales | Requires a review pipeline + "published" flag per locale per city |

Key SEO trade-off findings:

- **Google does not ban machine-translated content per se** — it bans scaled
  content abuse ("many pages… without adding value"). Raw MT of a thin template
  across 20 locales is textbook scaled content. **Post-edited, genuinely useful
  translated content is not.**
- **The cheapest high-ROI multilingual move is to NOT translate at all** for the
  long tail: EN pages + Google Translated results give multilingual SERP
  presence for free, with zero doorway/duplicate risk. This is the strongest
  argument for EN-first.
- **If/When locale URLs ship, they must carry genuinely translated body content**
  and a complete hreflang cluster; otherwise the duplicate/doorway risk
  outweighs the localization benefit.
- **Language priority:** for phase B, prioritize locales with (a) high
  community/geo overlap (es, pt-BR, fr, de, hi, id, ja) and (b) languages where
  Google Translated results are weaker or where local-language SERPs dominate
  (e.g. ja, ko, zh-CN, th, ar, fa). The geodata + content-strategy reports
  inform city-level priority.

---

## 4. Best-Opinion Recommendations (for `arch-seo-content-engine`)

**R1 — EN-first is the default for all programmatic city pages (phase A).**
Serve English body content at clean canonical URLs (`/location/<country>/<region>/<city>`),
with chrome localized via the existing cookie/Accept-Language resolution. Do
**not** publish per-locale URLs until body content is genuinely translated.
This is the lowest-risk, highest-speed path and leverages Google Translated
results for multilingual reach.

**R2 — Localize chrome via a new `seoContent` namespace in `@joinorigin/i18n`, not body content.**
Add a small chrome namespace to `en.json` + 20 locale files (nav/footer/hero
labels, "Start a community in {{city}}", CTA, FAQ headings, "Join the waitlist").
Keep city body copy as authored content files, outside the locale JSONs. Extend
`check-keys` carefully (small namespace; plural-aware keys only when needed).

**R3 — No hreflang clusters in phase A.**
Single canonical per city page; `x-default` → EN canonical only if a fallback is
needed; no `alternates.languages` until locale URLs exist (one-sided hreflang is
ignored by Google and adds maintenance debt).

**R4 — Phase B: curated translated city pages, not all pages.**
Publish genuinely translated body content (human or MT+PEMT) at locale-prefixed
subdirectory URLs (`/es/location/…`, `/de/location/…`) for a **curated subset**:
flagship cities × high-priority locales. Each family emits the full hreflang set
(self + all + `x-default` → EN) via Next.js `alternates.languages`, and the
sitemap includes `<xhtml:link rel="alternate">` entries. Do **not** translate
thin pages; prefer adding local value (real community names, local context,
useful data) per the content-strategy report.

**R5 — Translation sourcing: hybrid, phased.**
- Chrome: already translated (Sprint 9 20-locale files) — reuse.
- Body, phase B: MT first pass (DeepL/Google per sibling report) + **native
  post-edit gate** before indexation; professional translation reserved for the
  top flagship cities/locales; community translation later as a stretch,
  gated by a review pipeline.
- Long tail: **do not ship MT pages**; rely on EN + Translated results.

**R6 — Avoid the doorway/scaled-content pattern.**
No city-by-locale URL matrix of template-only pages; no "region pages funneling
to one page"; every indexed page must have genuine, locale-appropriate body
content. Add `notranslate`? No — keep Google's Translated results enabled.

**R7 — RTL + formatting are already handled; reuse them.**
`getDir` gives `rtl` for `ar`/`fa`; use locale-aware number formatting
(`toLocaleString(locale)`) for city stats. Phase-B ar/fa pages render `dir="rtl"`
automatically.

**R8 — Keep the existing site's SEO architecture intact.**
Do not retrofit hreflang onto the current cookie-driven product pages in this
sprint. The EN-first engine uses the same `ROUTES`-derived sitemap pattern;
extend `sitemap.ts` to enumerate programmatic city URLs (see tech-feasibility
report for scale/build implications) and add locale alternates only in phase B.

---

## 5. Open Questions for the Architect

1. Which locales/cities are phase-B first? (Needs geodata + content-strategy +
   translation-services reports.)
2. Does `check-keys` stay strict for a new `seoContent` chrome namespace, or do
   locale files get an "untranslated → EN fallback" mechanism? (Recommend strict,
   with only a small namespace in phase A.)
3. For phase B, is the review gate human-native or MT+automated QA (BLEU/quality
   checks)? (Recommend at least one native post-edit pass per published locale.)
4. Are city page URLs localized words or English slugs? (Recommend English slugs
   + locale prefix for consistency and crawl simplicity.)

---

## 6. Evidence Summary

| Claim | Evidence |
|---|---|
| hreflang recommended for template-only translations | Google localized-versions: "keep the main content in a single language and translate only the template… tell Google about these variations" |
| Duplicate definition: main content untranslated | Google localized-versions: "only considered duplicates if the main content of the page remains untranslated" |
| Prefer distinct URLs over cookie-driven locale | Google managing-multi-regional-sites §Managing multilingual versions |
| Googlebot: US IP, no Accept-Language → locale-adaptive not fully crawled | Google locale-adaptive-pages |
| Doorway abuse = region/city pages funneling | Google spam-policies §Doorway abuse |
| Scaled content abuse = translating to generate pages without value | Google spam-policies §Scaled content abuse |
| Google translated results reach multilingual users automatically | Google translated-results |
| Next.js native hreflang emission | Next.js 16.3 generateMetadata `alternates.languages` |
| Current site is locale-adaptive, no URL locale segment | `apps/web/proxy.ts`, `apps/web/app/layout.tsx` (repo) |
| 21 locales exist, key parity enforced | `packages/i18n/locales/*`, `scripts/check-keys.ts` (repo) |
| SEO metadata intentionally English in Sprint 9 | `sprint-9-i18n-arch.md` §1.2 (repo) |

---

## 7. Sources

- Google Search Central — *Tell Google about localized versions of your page*:
  <https://developers.google.com/search/docs/specialty/international/localized-versions>
- Google Search Central — *Managing multi-regional and multilingual sites*:
  <https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites>
- Google Search Central — *How Google crawls locale-adaptive pages*:
  <https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages>
- Google Search Central — *Spam policies for Google web search*:
  <https://developers.google.com/search/docs/essentials/spam-policies>
- Google Search Central — *Translated results in Google Search*:
  <https://developers.google.com/search/docs/appearance/translated-results>
- Google Search Central — *Google Search's guidance on using generative AI
  content on your website*:
  <https://developers.google.com/search/docs/fundamentals/using-gen-ai-content>
- Next.js 16.3 — `generateMetadata` / `alternates.languages`:
  <https://nextjs.org/docs/app/api-reference/functions/generate-metadata>
- Repo: `app/packages/i18n/**`, `app/apps/web/{proxy.ts,app/layout.tsx,app/sitemap.ts,lib/seo/**}`,
  `app/docs/design/sprint-9-i18n-arch.md`, `app/docs/design/sprint-4-seo-arch.md`

---

## 8. Navigation Footer

- **Up:** [`../README.md`](../README.md) (design docs index)
- **Consumer:** `arch-seo-content-engine` (TASK-303)
- **Sibling research:** `sprint-11-market-competitor.md` · `sprint-11-programmatic-seo.md` ·
  `sprint-11-geodata.md` · `sprint-11-content-strategy.md` · `sprint-11-tech-feasibility.md` ·
  `sprint-11-translation-services.md`
- **Repo design baselines:** [`sprint-9-i18n-arch.md`](../sprint-9-i18n-arch.md) ·
  [`sprint-4-seo-arch.md`](../sprint-4-seo-arch.md) · [`sprint-4-discovery.md`](../sprint-4-discovery.md)
