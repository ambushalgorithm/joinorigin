# SEO Content Engine — content-file model (fe-seo-registry, TASK-307)

Per-city per-locale **body copy** files for the location-page registry. Body
copy lives HERE, **never in locale JSONs** (localization R2/R5, design §7.1 —
locale JSONs hold UI chrome only, TASK-310's `seoContent` namespace).

## Layout

```
content/
├── types.ts                 # the shared contract (ContentKind, CityContent, …)
├── index.ts                 # content registry + loader (EN fallback)
├── en/                      # EN source of truth
│   ├── country/<slug>.ts    # country page prose (united-states, germany)
│   ├── region/<slug>.ts     # region page prose (new-york, berlin)
│   ├── city/<slug>.ts       # city page + 5 variant intros + idea page
│   └── guide/<slug>.ts      # L1 how-to guides (authored by TASK-309)
└── de/                      # per-locale translations
    └── city/berlin.ts       # Berlin → de (the 7 Berlin de pages)
```

## Rules

1. **EN is the source of truth.** `content/index.ts` resolves any locale with
   an EN fallback, so untranslated cities keep EN body at canonical URLs
   (phase A; Google Translated results cover other locales).
2. **Per-locale surfaces are enumerated exactly, never via fallback.** The
   registry only emits `/de/...` entries for cities with committed de files.
3. **Every file clears the unique-substance bar** (design §6.7):
   - `intro` ≥ 150 words (G2), distinct per city (G5 — no NYC↔Berlin reuse),
   - `dataPoints` ≥ 3 (G1),
   - `faq` ≥ 3 pairs (mirrored 1:1 in `FAQPage` JSON-LD by pages),
   - city files: `variantIntros` ≥ 150 words per group type + `ideaPage` with
     **30 ideas across 6 categories** (§6.6),
   - honest presence claims only — no fabricated member counts/ratings/offices.
4. **Translations ship explicit titles.** Per-locale files provide German
   `title`/`description` + `pageTitles` so the registry + sitemap stay
   deterministic for the de surface.

## Consumers

- `../locationPages.ts` — derives page entries + G1–G5 `indexable` flags.
- `../locationGates.ts` — G2/G5 enforce word count + near-duplicate rules.
- `fe-location-pages` (TASK-308) — renders city/variant/idea pages from these
  files (EN + Berlin de routes).
- `fe-guides-pages` (TASK-309) — authors `en/guide/<slug>.ts` files using the
  same `GuideContent` type.
