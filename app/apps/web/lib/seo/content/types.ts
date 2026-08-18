/**
 * Content-file model for the SEO Content Engine (design §6, §7.1).
 *
 * Body copy lives in committed per-city per-locale content files under
 * `apps/web/lib/seo/content/` — NEVER in locale JSONs (localization R2/R5).
 *
 * Layout:
 * ```
 * content/
 * ├── types.ts                       # this module — the shared contract
 * ├── index.ts                       # content registry + loader (EN fallback)
 * ├── README.md                      # model documentation
 * ├── en/                            # EN source of truth
 * │   ├── country/<slug>.ts          # country page prose
 * │   ├── region/<slug>.ts           # region page prose
 * │   ├── city/<slug>.ts             # city + variants + idea page prose
 * │   └── guide/<slug>.ts            # L1 how-to guides (TASK-309 authors)
 * └── de/city/berlin.ts              # per-locale translation (Berlin MVP)
 * ```
 *
 * Every city file must clear the "unique substance" bar (§2, §6.7):
 * unique intro prose (G2 ≥150 words), per-variant unique prose (G5), 30
 * seeded ideas grouped in 6 categories (design §6.6), honest presence
 * claims only — no fabricated member counts, ratings, or communities.
 */

import type { Locale } from '@joinorigin/i18n';

import type { GroupTypeKey } from '../locationData';

export type { Locale, GroupTypeKey };

/** Which entity a content file describes. */
export type ContentKind = 'country' | 'region' | 'city' | 'guide';

/** A visible FAQ pair (mirrored 1:1 in `FAQPage` JSON-LD by pages). */
export interface LocationFaq {
  question: string;
  answer: string;
}

/** One listicle idea (design §6.6 — 1–2 sentence pitch + audience + venue). */
export interface LocationIdea {
  /** Idea title, e.g. "Founder AMA at a local coworking space". */
  title: string;
  /** 1–2 sentence pitch. */
  pitch: string;
  /** Who it is for. */
  audience: string;
  /** Suggested venue type (city-plausible, never fabricated claims). */
  venueType: string;
}

/** Idea-page category — 6 categories × 5 ideas = 30 per city (§6.6). */
export interface IdeaCategory {
  name: string;
  ideas: LocationIdea[];
}

/** Idea page content: intro + 30 ideas + FAQ (design §6.6). */
export interface IdeaPageContent {
  intro: string;
  categories: IdeaCategory[];
  faq: LocationFaq[];
}

/** Shared fields for every content file. */
export interface BaseContent {
  kind: ContentKind;
  /** Content locale — `en` is the source of truth. */
  locale: Locale;
  /** Entity slug (kebab-case) this file targets. */
  slug: string;
  /** City-specific data-point sentences (G1): venues, signals, facts. */
  dataPoints: string[];
  faq: LocationFaq[];
  /** Optional title/description overrides (registry derives by default). */
  title?: string;
  description?: string;
}

export interface CountryContent extends BaseContent {
  kind: 'country';
  /**
   * Unique, honest prose section — ≥150 words (G2). Never a name-swapped
   * template: distinct per city/region/country (G5).
   */
  intro: string;
}

export interface RegionContent extends BaseContent {
  kind: 'region';
  /**
   * Unique, honest prose section — ≥150 words (G2). Never a name-swapped
   * template: distinct per city/region/country (G5).
   */
  intro: string;
}

/**
 * Per-variant enrichment (TASK-319) — the concrete "what it looks like in
 * practice" layer that visibly differentiates variant pages:
 *
 * - `venues` — 4–6 real venue-type strings (never fabricated addresses,
 *   only kinds of places that genuinely exist in the city),
 * - `formats` — 4–5 typical community formats (recurring patterns locals
 *   actually use),
 * - `howToStart` — 3 short, honest steps to start this community.
 *
 * Like `variantIntros`, enrichment is authored per city×type and must be
 * G5-safe: distinct per city and per type (no name-swapped templates).
 */
export interface VariantEnrichment {
  /** 4–6 real venue-type strings where this community gathers. */
  venues: string[];
  /** 4–5 typical community formats. */
  formats: string[];
  /** 3 short steps to start this community. */
  howToStart: string[];
}

/**
 * City content — the 7-page surface source of truth:
 * city page (intro/dataPoints/faq) + 5 variant pages (variantIntros
 * + variantEnrichment) + idea page (ideaPage).
 */
export interface CityContent extends BaseContent {
  kind: 'city';
  /**
   * Unique, honest prose section — an explicit array of paragraphs (like
   * GuideContent). Each entry renders as its own paragraph block on the city
   * page. The combined paragraphs must still clear the ≥150-word prose gate
   * (G2) — gate word counts sum the paragraph lengths. Never a name-swapped
   * template: distinct per city/region/country (G5).
   */
  intro: string[];
  /** Per-variant unique prose — ≥150 words each (G2/G5). */
  variantIntros: Partial<Record<GroupTypeKey, string>>;
  /** Per-variant enrichment — venues/formats/how-to (TASK-319). */
  variantEnrichment: Partial<Record<GroupTypeKey, VariantEnrichment>>;
  ideaPage: IdeaPageContent;
  /**
   * Per-locale title/description overrides for the page surface. EN
   * derives from the registry templates; translated locales (e.g. de)
   * ship explicit titles so the registry + sitemap stay deterministic.
   */
  pageTitles?: {
    city?: string;
    cityDescription?: string;
    variants?: Partial<Record<GroupTypeKey, string>>;
    variantDescriptions?: Partial<Record<GroupTypeKey, string>>;
    ideas?: string;
    ideasDescription?: string;
  };
}

/** One step in a how-to guide (design §6.2 step-by-step structure). */
export interface GuideStep {
  /** Step heading (rendered as a step `<h2>`), e.g. "Define a clear purpose". */
  title: string;
  /** Step body — 1–3 honest, evergreen paragraphs. */
  body: string;
  /**
   * Concrete "how JoinOrigin helps here" note mapped to this step (TASK-320).
   * Every step must carry one so each guide leads with how JoinOrigin solves
   * the connecting-people problem. Honest early-access framing only — no
   * fabricated features, no local-event claims.
   */
  joinOriginNote: string;
}

/** L1 how-to guide content (authored by fe-guides-pages, TASK-309). */
export interface GuideContent extends BaseContent {
  kind: 'guide';
  /**
   * Definitional intro — an explicit array of paragraphs, each one a
   * standalone string rendered as its own paragraph block on the guide
   * page (TASK-351). The combined paragraphs must still clear the ≥150-word
   * prose gate (G2) — gate word counts sum the paragraph lengths.
   */
  intro: string[];
  /** Step-by-step body sections (single H1 + step structure per §6.2). */
  sections: string[];
  /**
   * Structured steps for richer rendering — the page wrapper renders each
   * step as an `<h2>` + body + per-step JoinOrigin note (TASK-320), kept
   * in lockstep with `sections` which stays the flat source for
   * word-count/quality gates.
   */
  steps: GuideStep[];
}

export type LocationContent = CountryContent | RegionContent | CityContent | GuideContent;
