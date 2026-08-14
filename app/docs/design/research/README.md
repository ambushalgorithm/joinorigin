# Sprint 11 Research Findings

> **Parent:** [`../README.md`](../README.md) — design docs index

## Purpose

Best-opinion findings reports produced by the 7 Sprint 11 research specialist roles
(TASK-296…TASK-302) for the **SEO Content Engine** (Story 1 — research + architecture
only, NO implementation). The architect (`arch-seo-content-engine`, TASK-303) consumes
ALL reports to produce the solution design at
[`../sprint-11-seo-content-engine.md`](../sprint-11-seo-content-engine.md).

## Directory Map

| File | Producer | Purpose |
|------|----------|---------|
| `sprint-11-market-competitor.md` | research-market-competitor (TASK-296) | How Circle, Mighty Networks, Meetup, Reddit, Substack, local-FB-groups do content/programmatic SEO for community discovery; what ranks vs gets flagged as spam/doorway/content-farm; virality mechanics |
| `sprint-11-programmatic-seo.md` | research-programmatic-seo (TASK-297) | Programmatic location-page SEO: URL structure, template quality thresholds, thin-content risks, doorway/duplicate penalties at scale, internal-link mesh, indexation strategy, crawl budget |
| `sprint-11-geodata.md` | research-geodata (TASK-298) | Clean country/region/city datasets (GeoNames, OpenStreetMap, admin boundaries, population lists); licensing (commercial use, attribution), size, freshness, update cadence, maintenance |
| `sprint-11-content-strategy.md` | research-content-strategy (TASK-299) | Evergreen content types; content hierarchy (how-to guides, idea pages, topic hubs/glossary); flagship cities for manual polish |
| `sprint-11-localization.md` | research-localization (TASK-300) | Localizing SEO Content Engine templates across all 21 locales; EN-first strategy; hreflang/alternate URL implications; translation sourcing; quality + SEO trade-offs |
| `sprint-11-tech-feasibility.md` | research-tech-feasibility (TASK-301) | Next.js 16 + React 19 + Turbopack programmatic routes at scale (dynamic segments, generateStaticParams, PPR); ISR/revalidation vs build-time; sitemap.ts / llms.txt / ROUTES integration; build performance + hosting |
| `sprint-11-translation-services.md` | research-mt-translation (TASK-302) | Google Translate / DeepL / other MT for translating pages ON DEMAND: cost, complexity, feasibility, SEO/page-ranking, virality trade-offs |
| `README.md` | This file — navigation index | |

## Navigation Footer

- **Up:** [`../README.md`](../README.md)
- **Consumer:** `arch-seo-content-engine` (TASK-303) → [`../sprint-11-seo-content-engine.md`](../sprint-11-seo-content-engine.md)
