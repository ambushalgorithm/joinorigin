# Design Research — Sprint 11 SEO Content Engine

> **Parent:** [`../README.md`](../README.md) — design docs index

## Purpose

Best-opinion findings reports produced by the 7 Sprint 11 research specialist roles
(TASK-296…TASK-302) for the **SEO Content Engine** (Story 1 — research + architecture
only, NO implementation). Each specialist role produced one findings report; the
architect (`arch-seo-content-engine`, TASK-303) consumes ALL of them and produces the
solution design at [`../sprint-11-seo-content-engine.md`](../sprint-11-seo-content-engine.md).

## Directory Map

| File | Producer | Purpose |
|------|----------|---------|
| `sprint-11-geodata.md` | `research-geodata` (TASK-298) | Clean country/region/city datasets (GeoNames, OSM, Natural Earth, Wikidata, SimpleMaps, geoBoundaries, GADM, UN WUP); licensing (commercial use, attribution), size, freshness, cadence, maintenance; prioritization for community-discovery; recommended dataset plan |
| `sprint-11-market-competitor.md` | `research-market-competitor` (TASK-296) | How Circle, Mighty Networks, Meetup, Reddit, Substack, local-FB-groups do content/programmatic SEO for community discovery; what ranks vs spam/doorway flags; virality mechanics |
| `sprint-11-programmatic-seo.md` | `research-programmatic-seo` (TASK-297) | Programmatic location-page SEO: URL structure, template quality thresholds, thin-content/doorway/duplicate penalties at scale, internal-link mesh, indexation, crawl budget |
| `sprint-11-content-strategy.md` | `research-content-strategy` (TASK-299) | Evergreen content types, content hierarchy (how-to guides, idea pages, topic hubs/glossary), flagship cities for manual polish |
| `sprint-11-localization.md` | `research-localization` (TASK-300) | Localizing templates across 21 locales, EN-first strategy, hreflang implications, translation sourcing |
| `sprint-11-tech-feasibility.md` | `research-tech-feasibility` (TASK-301) | Next.js 16 + React 19 + Turbopack programmatic routes at scale, ISR/revalidation vs build-time, sitemap/llms.txt/ROUTES integration, build performance |
| `sprint-11-translation-services.md` | `research-mt-translation` (TASK-302) | Google Translate / DeepL / MT on demand: cost, complexity, feasibility, SEO, virality |
| `README.md` | This file — navigation index |

## Contracts

- **Producer contract:** each report is best-opinion, evidence-based, includes sources +
  recommendations, and edits ZERO implementation files.
- **Consumer contract:** `arch-seo-content-engine` (TASK-303) reconciles conflicting
  findings into ONE recommended approach at `app/docs/design/sprint-11-seo-content-engine.md`
  (URL structure, dataset plan, page types, localization strategy, Next.js routing/build
  approach, sitemap/llms.txt/ROUTES integration, Sprint 12 implementation breakdown).

## Navigation Footer

- **Up:** [`../README.md`](../README.md)
- **Consumer:** `arch-seo-content-engine` (TASK-303) → [`../sprint-11-seo-content-engine.md`](../sprint-11-seo-content-engine.md)
- **Related:** [`sprint-4-seo-arch.md`](../sprint-4-seo-arch.md) (existing SEO architecture) · [`sprint-4-discovery.md`](../sprint-4-discovery.md) (discovery/URL plan)
