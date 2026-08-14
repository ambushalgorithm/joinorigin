# Research Docs

> **Parent:** [`../README.md`](../README.md) — design specs index

## Purpose

Best-opinion research findings for the Sprint 11 SEO Content Engine (Story 1,
research + architecture only, NO implementation). Seven research specialists
each produce a findings report; the architect (`arch-seo-content-engine`,
TASK-303) consumes ALL seven and produces the solution design at
`app/docs/design/sprint-11-seo-content-engine.md`.

## Directory Map

| File | Purpose | Role / Task |
|------|---------|-------------|
| `sprint-11-market-competitor.md` | How Circle, Mighty Networks, Meetup, Reddit, Substack, local-FB-groups do content/programmatic SEO; what ranks vs gets flagged as spam/doorway/content-farm; virality mechanics | `research-market-competitor` (TASK-296) |
| `sprint-11-programmatic-seo.md` | Programmatic location-page SEO: URL structure, template quality thresholds, thin-content risks, doorway/duplicate penalties at scale, internal-link mesh, indexation strategy, crawl budget | `research-programmatic-seo` (TASK-297) |
| `sprint-11-geodata.md` | Clean country/region/city datasets (GeoNames, OpenStreetMap, admin boundaries, city populations); licensing, size, freshness, update cadence, prioritization | `research-geodata` (TASK-298) |
| `sprint-11-content-strategy.md` | Evergreen content types for organic discovery; content hierarchy; flagship cities for manual polish | `research-content-strategy` (TASK-299) |
| `sprint-11-localization.md` | Localizing templates across 21 locales; EN-first strategy; hreflang/alternate implications; translation sourcing + quality/SEO trade-offs | `research-localization` (TASK-300) |
| `sprint-11-tech-feasibility.md` | Next.js 16 + React 19 + Turbopack programmatic routes at scale (dynamic segments, generateStaticParams, PPR); ISR/revalidation vs build-time; sitemap.ts / llms.txt / ROUTES integration; build performance + hosting implications | `research-tech-feasibility` (TASK-301) |
| `sprint-11-translation-services.md` | Google Translate / DeepL / other MT for on-demand translation: cost, complexity, feasibility, SEO/page-ranking, virality; cost estimates | `research-mt-translation` (TASK-302) |

## Navigation Footer

- **Up:** [`../README.md`](../README.md) (design docs index)
- **Consumer:** `arch-seo-content-engine` (TASK-303) — merges all 7 reports into `app/docs/design/sprint-11-seo-content-engine.md`
- **Related:** `app/docs/design/sprint-4-discovery.md`, `app/docs/design/sprint-4-seo-arch.md`, `app/docs/design/sprint-9-i18n-arch.md`
