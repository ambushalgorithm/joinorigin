# Design Docs

> **Parent:** [`../README.md`](../README.md) — documentation index

## Purpose

Build-ready design specifications for JoinOrigin product surfaces. Each spec
adapts a source prompt to the JoinOrigin brand and the Next.js monorepo, and is
consumed verbatim by the implementing role.

## Directory Map

| File | Purpose |
|------|---------|
| `sprint-3-homescreen-spec.md` | Sprint 3 JoinOrigin homescreen spec — header, hero left/right, orbit circles viz, logo ticker, entrance animations, responsive breakpoints, any-button modal + CSV capture contract; local asset inventory |
| `sprint-4-discovery.md` | Sprint 4 discovery — recommended menu structure, page hierarchy + URLs, per-page purpose/content outline, SEO keyword strategy, JSON-LD plan, and LLM-crawler (GEO) plan (llms.txt, markdown, FAQ, semantic HTML) anchored on the "social collaboration network / community OS" intent |
| `sprint-4-seo-arch.md` | Sprint 4 SEO & analytics architecture — config-driven multi-tracker analytics (Plausible/Umami/GA4 adapters, config schema, mount contract), full-stack SEO (metadata/OG/Twitter, sitemap, robots, JSON-LD, canonical, llms.txt), Core Web Vitals budgets, LLM-crawler rules |
| `sprint-8-menu-redesign.md` | Sprint 8 menu-screen redesign spec — per-page visual layout, dark-theme colors, locally-hosted imagery, entrance/scroll animation, join CTAs, MenuPageShell structure (design precedent for the Sprint 9 switcher) |
| `sprint-8-origin-copy.md` | Sprint 8 approved copy-change-log — Origin-as-product / JoinOrigin-as-brand copy verbatim + per-file copy table (owned by fe-origin-copy; not consumed by the switcher) |
| `sprint-9-i18n-switcher.md` | Sprint 9 language switcher spec — web header/footer + mobile placement, globe icon + native-language labels, dropdown interaction with immediate switch, cookie persistence, RTL states for ar/fa, a11y, ASCII wireframes, component file list for fe-i18n-integration |
| `sprint-10-menu-redesign.md` | Sprint 10 menu-screen redesign spec (homepage-standard elevation) — per-page visual layout at minimum the homepage standard, ambient hero atmosphere, animated scene SVGs, hero join CTAs, trust rows + count-up stats + chip marquee, sticky anchor navs, glass section bands, local asset manifest (zero CDN), MenuPageShell structure extensions, SEO/JSON-LD preservation rules |
| `research/` | Sprint 11 SEO Content Engine research findings — seven specialist best-opinion reports (market-competitor, programmatic-seo, geodata, content-strategy, localization, tech-feasibility, translation-services) consumed by `arch-seo-content-engine` (TASK-303) — see `research/README.md` |
| `research/sprint-11-content-strategy.md` | Sprint 11 SEO Content Engine research (content-strategy) — evergreen content types for community platforms, content hierarchy (how-to guides, idea pages, topic hubs/glossary), flagship-city manual-vs-auto recommendation with criteria, quality thresholds for auto-generated pages |
| `README.md` | This file — navigation index |

## Navigation Footer

- **Up:** [`../README.md`](../README.md)
- **Research series (Sprint 11):** [`./research/README.md`](./research/README.md)
- **Related:** [`../references/sprint-3-landing-prompt.md`](../references/sprint-3-landing-prompt.md) (immutable starting prompt)
- **Consumers:** `fe-landing-page` (TASK-202) · `fe-menu-pages` (TASK-215) · `fe-seo` (TASK-216) · `fe-analytics` (TASK-217) · `arch-seo-content-engine` (TASK-303)
- **Verifiers:** `e2e-landing-page` (TASK-205) · `e2e-seo` (TASK-218)
