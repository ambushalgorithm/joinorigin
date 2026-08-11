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
| `sprint-4-discovery.md` | Sprint 4 discovery — recommended menu items, per-page purpose/content outline, page hierarchy + URLs, per-page SEO keyword strategy, JSON-LD plan, LLM-crawler (GEO) plan |
| `sprint-4-seo-arch.md` | Sprint 4 SEO & analytics architecture — config-driven multi-tracker analytics (Plausible/Umami/GA4 adapters, config schema, mount contract), full-stack SEO (metadata/OG/Twitter, sitemap, robots, JSON-LD, canonical, llms.txt), Core Web Vitals budgets, LLM-crawler rules |
| `README.md` | This file — navigation index |

## Navigation Footer

- **Up:** [`../README.md`](../README.md)
- **Related:** [`../references/sprint-3-landing-prompt.md`](../references/sprint-3-landing-prompt.md) (immutable starting prompt)
- **Consumer:** `fe-landing-page` (TASK-202) · **Verifier:** `e2e-landing-page` (TASK-205) · **Consumers:** `fe-seo` (TASK-216), `fe-analytics` (TASK-217), `fe-menu-pages` (TASK-215) · **Verifier:** `e2e-seo` (TASK-218)
