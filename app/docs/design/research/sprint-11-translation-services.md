# Sprint 11 Research — On-Demand Page Translation Services (MT)

> **Parent:** [`../README.md`](../README.md) · **Research index:** `./README.md` ·
> **Producer:** `research-mt-translation` (TASK-302) · **Consumers:** `arch-seo-content-engine`
> (TASK-303) → Sprint 12 implementation plan ·
> **Related reports:** `sprint-11-localization.md` (TASK-300), `sprint-11-programmatic-seo.md`
> (TASK-297), `sprint-11-tech-feasibility.md` (TASK-301), `sprint-11-content-strategy.md`
> (TASK-299)

## 1. Purpose

This is a **research findings report** (best-opinion, evidence-based). It evaluates
machine translation (MT) services — Google Cloud Translation, DeepL, Amazon Translate,
Azure Translator, and open-source/self-hosted options — for translating the Sprint 11
**SEO Content Engine** pages **on demand** (dynamic/programmatic translation of
auto-generated location pages, how-to guides, idea pages, and topic hubs).

Scope per TASK-302:

1. **COST** — per-character / per-request pricing, caching strategies, projected cost at
   page scale (thousands of pages × 21 locales).
2. **COMPLEXITY** — API integration, rate limits, latency, auth, Next.js 16 stack fit,
   build-time vs runtime translation.
3. **FEASIBILITY** — can JoinOrigin translate programmatic pages on demand, and at what
   operational cost/risk?
4. **SEO / page ranking** — indexation of auto-translated pages, hreflang requirements,
   duplicate-content risk, quality signals, penalties.
5. **VIRALITY** — instant multilingual reach vs pre-translated template quality.

**This is a research document only. No implementation files are produced.**
Recommendations here are inputs to the architect (TASK-303); the architect owns the final
Sprint 12 approach.

### 1.1 Context the research assumes

- Monorepo `app/` with `apps/web` (Next.js 16.3.0, React 19.2.8, Turbopack), 21 locales
  already shipped (`packages/i18n/locales/{lang}.json`, EN base + 20 translations —
  TASK-251…272, Sprint 9). **All UI chrome is already localized**; the MT question is about
  **programmatically generated page content**, not the UI shell.
- SEO Content Engine scope (Sprint 11 Story 1): `/location/<country>/<region>/<city>` +
  city×group-type variants, how-to guides, idea pages, topic hubs — *thousands of pages*.
- EN-first strategy for auto-generated city pages (TASK-300 localization research);
  this report answers: *if/when we translate those pages on demand, how, at what cost, and
  what are the SEO/virality trade-offs?*

### 1.2 TL;DR (best opinion)

1. **Do not translate the whole long-tail catalog on demand at request time.** Client-side
   or per-pageview MT is the worst combination: cost grows with traffic, translated HTML is
   invisible to crawlers until rendered, and API keys leak. Prefer **build-time / ISR-time
   MT with persistent caching** (translate once per content-version × locale, store result).
2. **The bulk of programmatic page text does not need MT at all.** Template prose (headings,
   how-to steps, section labels, CTA copy) is a **finite string set** — it should be
   localized through the existing i18n pipeline (21 locale JSONs), exactly like the UI was
   in Sprint 9. Only the **unbounded, dynamic prose** (if any is introduced) needs MT.
3. **If MT is used: Google Cloud Translation NMT ($20/1M chars) or Amazon Translate
   ($15/1M chars) are the cost leaders and cover all 21 locales.** DeepL is highest-quality
   for European languages but does **not** cover the full 21-locale set (Thai, Vietnamese,
   Hindi, Persian are not supported) and is ~70–80% more expensive per character.
4. **SEO is safe if and only if**: each localized URL serves *translated main content*
   (not a translated template with untranslated body), hreflang is **bidirectional** with
   `x-default`, URLs are unique per locale (never cookie-switched), and a visible
   machine-translation disclosure is present. Google's **scaled content abuse** policy
   explicitly names "translating" as a transformation that can trigger abuse **when little
   value is added** — this is the single biggest SEO risk.
5. **Virality**: instant multilingual reach is real (20 locales on day one vs months of
   manual translation), but brand-critical copy should stay human/community-translated
   (already done for the UI). MT is best reserved for long-tail programmatic content where
   a "good enough, clearly-labeled" translation beats no translation.

---

## 2. MT Services Compared

| Provider | Model tier | Price (USD per 1M chars) | Free tier | Locale coverage vs our 21 | Auth / integration | Best use |
|---|---|---|---|---|---|---|
| **Google Cloud Translation — Advanced v3 (NMT)** | NMT (default) | **$20.00** (after free 500K/mo) | 500K chars/mo (~$10 credit) | **All 21** (135+ langs incl. ar/fa/th/vi/hi) | OAuth2 service account; REST v3 `translateText`; Node SDK | Build-time/ISR batch translation; adaptive/glossary optional |
| **Google Cloud Translation — Advanced v3 (LLM)** | `translation-llm` | **$10 input + $10 output** (= ~$20/1M typical) | same credit | All 21 | same | Higher-quality, context-aware, cost-equivalent to NMT; newer |
| **Google Cloud Translation — Basic v2** | NMT | **$20.00** (per byte; 500K free) | 500K chars/mo | All 21 | API key | Legacy; prefer v3 |
| **Amazon Translate** | Standard | **$15.00** | 2M chars/mo × 12 months | All 21 (75 langs) | IAM + SDK | Cheapest managed option; batch API for build-time |
| **Amazon Translate** | Active Custom Translation | $60.00 | 500K/mo × 2 months | subset | IAM + parallel data | Only if custom terminology needed later |
| **Azure Translator** | Standard (S1) | ~**$10.00** (pay-as-you-go) | 2M chars/mo | All 21 (100+ langs) | OAuth2 / subscription key | Cost leader; commitment tiers for volume |
| **DeepL API Pro** | Neural (quality-optimized) | ~**$25–30** per 1M (plan-based, e.g. €25/1M at volume) | 500K chars/mo (API Free) | **Partial** — missing th, vi, hi, fa (see §2.1) | `DeepL-Auth-Key` header; REST; Node SDK | Highest raw quality for EU languages; **locale gap blocks full coverage** |
| **ModernMT** | Adaptive | custom | — | ~partial | API | **AVOID — sunsetting into Lara by end of 2026** |
| **Lara Translate (successor)** | LLM | custom | — | 200+ | API | Future watch; unproven pricing |
| **LibreTranslate / Argos Translate** | Open-source NMT | self-host ≈ infra cost only | free to run | ~40 langs (covers ~most of 21) | API key (self-hosted) | AGPLv3-compatible with our repo; lower quality; needs GPU/tuning; good for privacy |

> Prices captured from official pricing pages 2026-08-13 (see §8 Sources). Azure's S1
> pay-as-you-go is documented as ~$10/1M standard translation (published price renders via
> JS; the $ figure is per Microsoft's standard Translator pricing).

### 2.1 Critical provider difference: locale coverage

JoinOrigin's 21 locales (Sprint 9): `en, es, pt-BR, fr, de, ru, ja, ko, zh-CN, zh-TW, ar,
hi, id, tr, it, pl, nl, vi, th, uk, fa`.

- **Google (v2/v3), Amazon, Azure**: support **all 21** including `th`, `vi`, `hi`, `fa`
  (Persian), `ar`, RTL handling.
- **DeepL**: supports a subset (Bulgarian, Czech, Danish, German, Greek, English, Spanish,
  Estonian, Finnish, French, Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian,
  Latvian, Norwegian, Dutch, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian,
  Swedish, Turkish, Ukrainian, Chinese). **Missing from our set: `th` (Thai), `vi`
  (Vietnamese), `hi` (Hindi), `fa` (Persian)** — 4 of 20 non-EN locales, including both
  RTL languages (`ar` **is** supported; `fa` is not). A DeepL-only strategy would force a
  second provider or manual fallback for ~20% of locales.

**Conclusion:** For full 21-locale on-demand coverage, choose **Google, Amazon, or Azure** —
not DeepL (unless the architect consciously limits MT locales to DeepL's set).

---

## 3. COST — pricing models, caching, projected cost at page scale

### 3.1 How MT is billed

- **Per-character** (code points), including whitespace; source text × **number of target
  languages** (Google batch example: 5,000 source chars × 2 targets = 10,000 billable).
- Language detection is free; glossaries/model-training billed separately.
- LLM tiers bill **input + output** characters separately (Google LLM: $10 in + $10 out;
  adaptive $25 + $25).
- There is **no per-request fee** on Google/Amazon/Azure standard tiers (request count is
  not the billing unit — characters are). DeepL Pro is plan-based (included char volume +
  overage per char).

### 3.2 The one number that dominates: billable characters

For a programmatic page, the translatable payload is the **page body copy + metadata
(title/description/alt)** — not the entire HTML (brand names, URLs, city names, numbers are
either excluded or pass through). Estimate:

| Content unit | Translatable chars (approx) |
|---|---|
| City location page template (headings + 2–4 paragraphs + list labels + FAQ + metadata) | 1,500–3,500 |
| How-to guide (full prose) | 4,000–8,000 |
| Idea page (list + intro) | 800–2,000 |
| Topic hub | 2,000–5,000 |

Assume **~2,500 chars** per location-page-equivalent for modeling.

### 3.3 Projected cost at page scale

Model: **P** pages × **L** locales (20 non-EN) × **C** chars × price.

**Scenario A — full-catalog MT at build time (worst case, all pages × all locales):**

| Pages P | Locales L | Total chars (C=2,500) | Google NMT $20/1M | AWS $15/1M | Azure ~$10/1M | DeepL ~$27/1M |
|---|---|---|---|---|---|---|
| 1,000 | 20 | 50M | **$1,000** | **$750** | ~$500 | ~$1,350 |
| 5,000 | 20 | 250M | **$5,000** | **$3,750** | ~$2,500 | ~$6,750 |
| 10,000 | 20 | 500M | **$10,000** | **$7,500** | ~$5,000 | ~$13,500 |
| 50,000 | 20 | 2.5B | **$50,000** | **$37,500** | ~$25,000 | ~$67,500 |

> One-time (build/ISR + cache) cost. Even the worst case — 10k pages in 20 locales at Google
> NMT — is **~$10,000 one-time**, negligible against hosting/SEO program budgets.

**Scenario B — template-only localization (recommended):** template prose is a finite
string set (~100–300 strings/page type). Localize once per locale via the i18n pipeline
(already the Sprint 9 pattern) or one MT batch of the template corpus:
e.g., 5 page types × 300 strings × 60 chars avg = 90,000 source chars × 20 locales =
**1.8M chars → $36 (Google) / $27 (AWS)**. Effectively **free** relative to full-catalog MT.
Dynamic slots (city name, group type, numbers) are filled by locale-appropriate data, no MT.

**Scenario C — runtime on-demand MT without cache (anti-pattern):** if every pageview
translates on the fly, cost scales with **traffic**, not content. 10k pages × 10k views/mo ×
2,500 chars × 20 locales would bill **~5B chars/mo** ($100k+/mo Google). **Never do this.**

### 3.4 Caching strategy (the cost lever)

- **Key**: `hash(source text) + locale (+ model version)` → translated string.
- **Store**: SQLite/KV/Postgres table, or generated static JSON per locale at build; Next.js
  ISR can also serve cached HTML directly.
- **Effect**: translation cost becomes **one-time per unique content × locale**, re-incurred
  only when content changes (revalidate). Page scale × locale scale cost is linear in unique
  content, not in traffic.
- **Recommended pattern for Next.js 16**: translate in `generateStaticParams` /
  `generateMetadata` / ISR revalidation; write translated strings to a cache (DB or file);
  serve statically. Optionally add a small translation queue (SQS/Cloud Tasks/Redis) for
  background re-translation on content update.

### 3.5 Cost verdict

- Full-catalog MT is affordable as a **one-time build operation** ($5–15k for 5–10k pages
  across 20 locales at Google/AWS).
- **Template-first localization is ~200× cheaper** and should be the default for
  programmatic pages.
- Reserve MT for genuinely dynamic, unbounded prose; cache aggressively; never pay per
  pageview.

---

## 4. COMPLEXITY — integration, rate limits, latency, auth, Next.js fit

### 4.1 Auth & SDKs (all providers)

| Provider | Auth | SDK | Next.js server fit |
|---|---|---|---|
| Google Cloud Translation | OAuth2 service account (JSON key) → token; or ADC | `@google-cloud/translate` | Excellent — server-only env var, no client exposure |
| Amazon Translate | IAM credentials (access key) or IAM roles | AWS SDK v3 `TranslateClient` | Excellent |
| Azure Translator | OAuth2 (Azure AD) or subscription key | `@azure/cognitiveservices-translator-text` / REST | Good |
| DeepL | `DeepL-Auth-Key` header (static API key) | `deepl-node` | Excellent (simplest) |

All are REST + official Node SDKs; all fit Next.js server components / route handlers.
**Never call MT from the browser** (API keys + CORS + cost + SEO invisibility).

### 4.2 Rate limits & request sizing

- **Google v3**: `contents[]` each ≤ 1,024 chars per string; Google recommends total content
  < 30,000 codepoints per request → chunk longer pages into multiple requests (or use
  `batchTranslateText` for build-time). Quotas are per-project, high (default ~1–6k
  requests/min; adjustable).
- **DeepL**: request body ≤ 128 KiB; 429/456 quota errors; supports `tag_handling=html` to
  translate inside HTML without breaking markup — nice for page bodies. Formality/glossary
  options.
- **AWS**: real-time request limit ~10 KB / ~5,000 bytes per text field (docs recommend
  batching); **Batch Translation** (S3-based, async) is purpose-built for build-time page
  translation and has no per-request size pressure.
- **Azure**: 50,000-char request limit; per-region quota adjustable.

**Takeaway**: build-time **batch APIs** (Google `batchTranslateText`, AWS Batch) exist
specifically for this workload. Real-time chunking (≤1–10KB per call) is straightforward
and cheap for ISR-time translation.

### 4.3 Latency

- Real-time `translateText`: **~150–800 ms** per request (varies by provider/region/len).
- For **build-time/ISR**, latency is irrelevant (not on the user's critical path).
- For **runtime on-demand rendering** (a request-time translate inside a server component),
  add 150–800 ms to TTFB — unacceptable for programmatic pages at scale unless cached
  (cache hit = zero API latency).

### 4.4 Build-time vs runtime vs client-side

| Approach | Indexability | Cost | Latency | Complexity | Verdict |
|---|---|---|---|---|---|
| **Build-time (generateStaticParams)** | ✅ Static HTML per locale, immediately crawlable | One-time (per content×locale) | Zero | Pre-render all locales at build; build-time ↑ (see §4.5) | **Best for SEO** — the standard for programmatic pages |
| **ISR / on-demand revalidation** | ✅ After first generation | One-time per version (cached) | First request pays MT latency; then static | Cache + revalidation wiring | **Best flexibility** — new city pages translate lazily |
| **Runtime per-request (uncached)** | ✅ (SSR HTML) but costly | Linear in traffic | +150–800ms TTFB | Throttling/backpressure needed | ❌ Avoid |
| **Client-side JS translation (widget)** | ❌ Not indexable without JS rendering; quality/unbranded; key exposure | Cost per view | Client-side | e.g. Google Website Translator widget | ❌ Never for SEO pages |

### 4.5 Build scale (Next.js 16 + Turbopack)

Translating 5–10k pages × 21 locales at build = 100–210k static routes. This is a
**tech-feasibility concern owned by TASK-301** (generateStaticParams, PPR, ISR, build
performance). MT adds: NMT API calls during build (minutes to a few hours, batchable) and
storage of translated strings. **Feasible**, but the architect must pick PPR/ISR over pure
static if build time is prohibitive (see `sprint-11-tech-feasibility.md`).

### 4.6 Complexity verdict

Integration is **moderate, well-trodden**: official SDKs, REST, documented quotas. The real
complexity is not the MT API — it's (a) **deciding what to translate** (template vs body),
(b) **caching**, and (c) **SEO plumbing** (hreflang, sitemap alternates, disclosures).
All three are design decisions for TASK-303, not blockers.

---

## 5. FEASIBILITY — can we do on-demand MT?

**Yes — with three conditions.**

1. **Translate at build/ISR time, cache the result** (never per-pageview, never client-side).
2. **Localize template prose through the existing i18n pipeline first**; use MT only for
   unbounded dynamic content (and even then, evaluate whether EN-first is acceptable —
   TASK-300).
3. **Ship the SEO contract with the translations**: unique per-locale URLs, bidirectional
   hreflang + `x-default`, sitemap `<xhtml:link rel="alternate">`, visible
   machine-translation disclosure, and quality gates.

Cost ($5–15k worst case one-time at 5–10k pages), latency (none with static/ISR), auth/SDK
(standard), and provider coverage (Google/AWS/Azure cover all 21 locales) are all feasible.
The **dominant risk is SEO quality at scale**, not engineering cost.

---

## 6. SEO / PAGE-RANKING IMPLICATIONS

Evidence base: Google Search Central docs (spam policies, localized versions, multilingual
sites, translated results, helpful content) — official, current as of 2026-08.

### 6.1 Do auto-translated pages get indexed? YES — with a critical caveat

Google indexes translated pages **as localized versions, not duplicates, when the main
content is actually translated**:

> "Localized versions of a page are only considered duplicates if the main content of the
> page remains untranslated." — Google, *Tell Google about localized versions of your page*

So: a genuinely machine-translated city page with translated body copy is **not** duplicate
content. A page whose template is translated but whose main body stays English **is**
treated as near-duplicate/low-value — the exact trap to avoid.

### 6.2 hreflang requirements (non-negotiable)

From Google's localized-versions guidance:

- **Each language version must list itself AND all other versions** (same set of
  `<link rel="alternate" hreflang>` on every page).
- **Bidirectional**: if page A links to B but B doesn't link back, **tags are ignored**.
- Fully-qualified URLs (`https://` + host + path).
- Use **unique URLs per locale** — never cookie/browser-based switching:
  > Googlebot crawls from the US **without `Accept-Language`**; locale-adaptive pages that
  > switch on headers may not be crawled/found in all variants.
- Provide **`x-default`** fallback.
- Implement via **sitemap `<xhtml:link>` alternates** (equivalent to HTML tags; cleaner at
  thousands of pages).
- **Do not auto-redirect** users between language versions.

For 21 locales this means each page carries 21 hreflang entries + `x-default` — mechanical
to generate from `ROUTES`/`SUPPORTED_LOCALES` (existing `lib/seo` patterns), but the
architect must add it to the programmatic page template.

### 6.3 Duplicate-content / doorway / scaled-content risk (the real penalty zone)

Google's **scaled content abuse** spam policy explicitly flags:

> "Scraping feeds, search results, or other content to generate many pages (including
> through automated transformations like **synonymizing, translating**, or other
> obfuscation techniques), **where little value is provided to users**."

and **doorway abuse**:

> "Creating substantially similar pages that are closer to search results than a clearly
> defined, browseable hierarchy."

This is the #1 SEO risk for MT-at-scale: thousands of near-identical city pages in 20
languages, if each adds little unique value, can trigger a **sitewide** scaled-content
action — not just per-page demotion. Mitigations:

1. **Template-first localization** (unique per-locale template copy) + **unique dynamic
   data** (real city facts, group types, local context) — content must be useful *in that
   locale*, not just mirrored.
2. **Visible disclosure** that the page is machine-translated (aligns with Google's
   "helpful content" guidance: automation should be self-evident; explain *how* content was
   produced and *why* automation was useful).
3. Keep the **EN original canonical** + translated pages as alternates (hreflang), not as
   competing canonicals.
4. **No thin pages**: if a locale's page has only template + 1 paragraph, consider
   `noindex` for that locale until content depth improves (or defer locale — EN-first).

### 6.4 Google already translates results — reduce expectations

Google Search offers **translated results** (title/snippet + click-through machine
translation) for 21 languages, including Spanish, French, German, Portuguese, Hindi,
Indonesian, Korean, Russian, Thai, Turkish, Vietnamese, Arabic, Persian. This means **even
without publishing localized pages, Google can bridge the language gap for searchers** and
attribute the original EN URL. The marginal SEO value of publishing MT pages is therefore:

- **Positive** when target-locale search demand is high and you want to rank *in that
  locale's SERP with your own URL + localized UX* (CTR, sitelinks, local trust).
- **Near-zero/negative** when the translation is thin and Google would have served the
  translated result anyway.

### 6.5 Other quality signals

- Google detects page language from **visible content**, not `lang` attributes — translated
  pages must actually be in the target language.
- Metadata (title/description) must be translated too, or snippets look broken.
- `notranslate` robots rule exists to **opt out** of Google's translation features — useful
  if you decide a page must stay EN-only (but then don't publish an MT variant for it).
- E-E-A-T: programmatic pages benefit from author/community context, local citations, and
  internal links — the content-strategy report (TASK-299) covers this; MT must not strip
  those signals.

### 6.6 SEO verdict

MT-on-demand is **indexable and penalty-free when**: main content translated, unique
per-locale URLs, bidirectional hreflang + `x-default`, disclosure present, and per-page
value in the target locale. The **scaled content abuse** policy is the concrete, sitewide
risk to engineer around — template-first localization + real per-locale value is the safest
path.

---

## 7. VIRALITY — instant multilingual reach vs pre-translated template quality

### 7.1 Upside: instant multilingual reach

- On-demand MT gives **20 non-EN locales on day one** vs weeks/months of manual translation.
- Local-language pages are shareable in local communities (e.g., a Spanish-language "start a
  community in Bogotá" page shared in LatAm group chats; German how-to guides in German
  communities) — a genuine **virality accelerant** for a community-discovery product whose
  users self-organize locally.
- Programmatic pages are *purpose-built* for sharing as resources; translated versions
  multiply the surfaces that can be shared and linked to.

### 7.2 Downside: quality signals travel with the share

- A visibly machine-translated page can **hurt trust** if it's brand-critical (mission,
  product positioning, signup CTA). Mocking/shared screenshots of bad translations are a
  real community-engagement risk on Reddit/X/local forums.
- **Brand terms never translate** (JoinOrigin, Origin, Matrix — per Sprint 9 arch) — MT
  must be instructed/glossary'd or they'll be mangled in some languages.
- **RTL** (`ar`, `fa`): MT output must preserve RTL layout correctness — the app already
  handles `dir=rtl` (Sprint 9), but programmatic pages must inherit it.

### 7.3 The hybrid (recommended for virality AND quality)

1. **UI/template chrome**: already human/community-translated (Sprint 9 locale JSONs) —
   keep this quality bar.
2. **Programmatic template prose**: localize via the i18n pipeline (finite string set) —
   human-quality where it counts (headlines, CTAs, how-to steps).
3. **Only long-tail dynamic body copy**: MT (build-time, cached, disclosed) — "good enough,
   clearly-labeled" beats EN-only for non-English searchers and sharers.
4. **Flag the translation**: visible "Machine-translated — view original" affordance
   (also satisfies Google's helpful-content *how* disclosure).

### 7.4 Virality verdict

MT-on-demand is a **moderate positive for virality** in non-English communities **if**
quality is gated and labeled. It does not replace pre-translated template quality for
brand-critical copy — but it multiplies reach for long-tail, local, shareable content at
near-zero marginal cost.

---

## 8. Sources

**Pricing (fetched 2026-08-13):**
- Google Cloud Translation pricing — https://cloud.google.com/translate/pricing (NMT
  $20/1M after 500K free; LLM $10 in + $10 out; adaptive $25 + $25; custom $80→$30 tiers;
  per-character billing incl. whitespace; source×targets in batch).
- Amazon Translate pricing — https://aws.amazon.com/translate/pricing/ (Standard $15/1M;
  Active Custom $60/1M; free 2M chars/mo × 12).
- Azure Translator pricing — https://azure.microsoft.com/en-us/pricing/details/cognitive-services/translator/
  (F0 2M chars/mo free; S1 pay-as-you-go ~$10/1M standard; custom $40/1M).
- DeepL API docs — https://developers.deepl.com/docs/api-reference/translate (API Free 500K
  chars/mo; `DeepL-Auth-Key`; 128 KiB limit; `tag_handling=html`; glossaries); DeepL Pro
  pricing — https://www.deepl.com/en/pro (plan-based; ~€25/1M at volume; supported-language
  set excludes th/vi/hi/fa).
- ModernMT → Lara migration notice — https://www.modernmt.com/pricing (sunset end of 2026).
- LibreTranslate — https://libretranslate.com/ (AGPLv3, self-hosted, Argos Translate).

**SEO (Google Search Central, official):**
- Spam policies (scaled content abuse; doorway abuse) —
  https://developers.google.com/search/docs/essentials/spam-policies
- Tell Google about localized versions (hreflang rules; duplicates definition) —
  https://developers.google.com/search/docs/specialty/international/localized-versions
- Managing multi-regional and multilingual sites (unique URLs; no cookie-switching; no
  auto-redirect; Googlebot from US without Accept-Language) —
  https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Translated results (Google translates titles/snippets/pages in 21 languages; `notranslate`
  opt-out) — https://developers.google.com/search/docs/appearance/translated-results
- Creating helpful, reliable, people-first content (automation disclosure, *who/how/why*) —
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Cloud Translation API reference (contents ≤1,024 chars; <30K codepoints recommended) —
  https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations/translateText

**Internal:**
- `app/docs/design/sprint-9-i18n-arch.md` (21-locale matrix, brand terms, RTL, scope
  boundaries)
- `app/docs/design/sprint-4-seo-arch.md` (metadata/sitemap/JSON-LD/canonical architecture)
- `app/apps/web/lib/seo/routes.ts`, `packages/i18n/locales/en.json` (existing conventions)
- Sprint 11 task file (TASK-296…303 scope)

---

## 9. Recommendations (for architect, TASK-303)

1. **Template-first**: localize programmatic page template prose through the i18n pipeline
   (21 locales) — the cost is ~$36 and quality is human-level. MT should be reserved for
   unbounded dynamic body copy, if any is introduced.
2. **If/when MT is used**: Google Cloud Translation **NMT v3** ($20/1M) or **Amazon
   Translate** ($15/1M) — full 21-locale coverage, cheap, batch APIs. DeepL only if the
   architect limits MT locales to DeepL's supported subset (excludes th/vi/hi/fa). Azure if
   Microsoft-stack cost optimization is a priority (~$10/1M).
3. **Architecture**: build-time or ISR-time translation, **persistent cache keyed by
   `content-hash + locale`**, static HTML per locale. Never client-side widgets; never
   per-pageview uncached MT. Coordinate build scale with TASK-301 (PPR/ISR).
4. **SEO contract (ship with translations)**: unique per-locale URLs; bidirectional hreflang
   + `x-default` (HTML or sitemap `<xhtml:link>`); translated metadata; machine-translation
   disclosure; keep EN canonical; quality gate (no thin localized pages — `noindex` or defer
   locales below a depth threshold).
5. **Risk management**: treat Google's **scaled content abuse** policy as the primary
   design constraint for MT-at-scale; ensure each localized page adds real value in its
   locale (template-localized + unique data), never pure mirroring.
6. **Virality**: MT for long-tail local pages amplifies non-English sharing; keep
   brand-critical copy human-translated; label machine translations visibly.
7. **Do not translate**: brand terms (JoinOrigin, Origin, Matrix), URLs, city/group names
   (use locale-appropriate transliteration only if data exists), and anything the
   content-strategy report (TASK-299) deems EN-only.

---

*End of research report — `research-mt-translation` (TASK-302). No implementation files
were created or modified; this document is input to `arch-seo-content-engine` (TASK-303).*
