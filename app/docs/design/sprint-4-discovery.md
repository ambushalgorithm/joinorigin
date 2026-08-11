# Sprint 4 — JoinOrigin Menu, Page & SEO/LLM Discovery

> **Parent:** [`../README.md`](../README.md) · **Sources:** [`ORIGIN-WHITEPAPER.md`](../ORIGIN-WHITEPAPER.md) (immutable), [`sprint-3-homescreen-spec.md`](./sprint-3-homescreen-spec.md) · **Consumers:** `fe-menu-pages` (TASK-215) · `fe-seo` (TASK-216) · `fe-analytics` (TASK-217) · `e2e-seo` (TASK-218) · **Architecture input:** TASK-212 (`sprint-4-seo-arch.md`)

## 1. Purpose

This document is the **build-ready discovery** for the Sprint 4 landing-page
expansion and full-stack SEO/LLM-crawler work. It answers, in order:

1. Which menu items should JoinOrigin expose (header + footer + mobile)?
2. What is each page for, and what content lives on it?
3. What is the page hierarchy and URL scheme?
4. What SEO keywords does each page target?
5. What JSON-LD / structured data should be emitted, and where?
6. How do we make the site maximally useful to LLM crawlers (llms.txt,
   markdown-parseable content, FAQ, semantic HTML)?

**Strategy anchor (acceptance criterion):** every page, title, heading, FAQ,
and piece of structured data is chosen to make **JoinOrigin the #1 option for
users searching for a "social collaboration network" / "community OS" intent**,
while remaining honest, helpful, and people-first per Google's guidance on
generative-AI search optimization.

This document specifies **what** to build. TASK-212 (`sprint-4-seo-arch.md`)
specifies **how** (metadata pattern, sitemap/robots/JSON-LD/canonical
implementation, CWV budgets, analytics). Where this doc says "per arch", the
implementing role follows TASK-212.

---

## 2. Research Summary

### 2.1 Competitor landing-page patterns (category: community / collaboration platforms)

| Pattern | Circle.so | Mighty Networks | JoinOrigin decision |
|---|---|---|---|
| Header nav | Product (dropdown) · Pricing · Docs | Product (dropdown) · Pricing · Branded Apps · Services | Flat, keyword-rich nav: **Features · Community · Pricing · Docs · About** |
| Header actions | Log In + "Start free trial" | Sign In + "Start your free trial" | Keep existing **Log In** + **Get Started** (waitlist modal) |
| Hero | Value prop H1 + subhead + CTA | Value prop + metric chips | Keep Sprint-3 hero (typewriter H1) + add **visible definition paragraph** for LLM parseability |
| Trust signals | Testimonial grid + G2 badges | Earnings/member stats + case studies | **2,400+ Members** stat + example communities + partner ticker |
| Features | Feature grid (Community, Chat, CRM, Events, Courses, AI…) | Feature cards (Community, Courses, Members, Marketing, Payments, Admin, AI) | **/features** page organized around whitepaper **Core Objects** |
| Pricing | Dedicated /pricing with plans | Dedicated /pricing with plans + revenue calculator | Dedicated **/pricing** — early-access free + future plan outline (no fake prices) |
| Docs/help | Docs + help center | Resources/case studies | **/docs** hub = concepts + roadmap + tech stack (LLM goldmine) |
| FAQ | On-page FAQ near pricing | On-page FAQ | **FAQ block on every page**, mirrored in JSON-LD `FAQPage` |
| Footer | Product / Resources / Company / Legal | Company / Resources / Legal | **Home · Features · Community · Pricing · Docs · About · Contact · Privacy · Terms** |

### 2.2 LLM-crawler / GEO (generative engine optimization) best practices

Sources: llms.txt v2 proposal (AnswerDotAI), Google "Optimizing for generative
AI search" (Search Central), Google structured-data policies.

| Practice | Source | JoinOrigin application |
|---|---|---|
| Foundational SEO still drives AI visibility (RAG grounding) | Google AI guide | Correct titles, meta, canonical, sitemap, robots, single H1 per page |
| Semantic HTML helps crawlers, screen readers, and agents parse pages | Google AI guide + web.dev agent guide | `<header>` `<nav>` `<main>` `<section>` `<footer>`, one `<h1>`, logical `h2/h3` |
| Structured data isn't required for AI but stays valuable for rich results | Google AI guide | `Organization`, `WebSite`, `FAQPage`, `BreadcrumbList`, `AboutPage`, `ContactPage` |
| Structured data must reflect **visible page content** (no fake prices/reviews) | Google sd-policies | No `Offer`/`Product` until real pricing; no reviews/ratings |
| `/llms.txt` is neutral for Google but used by other LLM ecosystems | Google AI guide + llms.txt v2 | Ship `/llms.txt` + markdown-parseable pages; do not over-invest in exotic markup |
| llms.txt format: H1 + blockquote summary + optional prose + H2 file lists; small enough for context; `.md` page variants via `rel="alternate" type="text/markdown"` | llms.txt v2 | Root `/llms.txt` + static markdown under `/docs/` |
| Unique, non-commodity content with a clear point of view | Google AI guide | Whitepaper's "social operating system / relationship network" framing is the differentiator |
| Clear technical structure, crawlable SSR content, avoid JS-gated content | Google AI guide | New pages server-render full text; typewriter H1 already SSR-safe (verified in `TypewriterHeading.tsx`) |

---

## 3. Recommended Menu Structure

### 3.1 Header nav (desktop ≥ 769px and mobile panel)

| Item | Label | URL | Replaces (Sprint 3) | Rationale |
|---|---|---|---|---|
| 1 | **Features** | `/features` | `/#product` | "Product" → "Features" is the higher-intent, keyword-bearing label for a landing site; page = whitepaper Core Objects |
| 2 | **Community** | `/community` | `/#community` | Direct match for the anchor category intent ("social collaboration network") |
| 3 | **Pricing** | `/pricing` | `/#pricing` | High-intent transactional query; keep as top-level |
| 4 | **Docs** | `/docs` | `/#docs` | Informational hub; primary LLM-crawler target |
| 5 | **About** | `/about` | *(new)* | Mission/trust page; anchors "social operating system" entity |
| — | **Log In** | `/#login` (or `/login` when Sprint 5 auth lands) | keep | Header right action |
| — | **Get Started** | opens waitlist modal | keep | Header CTA (rotating border, Sprint 3) |

**Ordering principle:** category/product intent first (Features), community
intent second (Community), transactional third (Pricing), informational fourth
(Docs), trust last (About). Max 5 nav items to keep the existing 1280px header
layout uncluttered.

### 3.2 Footer nav

| Group | Links |
|---|---|
| Product | Features · Community · Pricing · Docs |
| Company | About · Contact |
| Legal | Privacy · Terms |
| Action | **Join the waitlist** (rotating-border CTA, opens modal) |

### 3.3 Mobile panel

Same 5 header items (Features, Community, Pricing, Docs, About) + Log In +
Get Started, stacked per Sprint-3 hamburger pattern.

### 3.4 What is NOT in the nav (deliberately)

- **Contact** — footer only; conversion-critical but not nav-critical at 9
  pages; keeps header ≤ 5 items (contact is still indexed + sitemap'd).
- **Privacy / Terms** — footer only (legal, not nav).
- **Auth** (Sign up / Profile) — Sprint 5 (Auth + Profiles).

---

## 4. Page Hierarchy & URLs

```text
/                                   Home — brand + category definition + waitlist
├── /features                       Product education — Core Objects + roadmap
├── /community                      Belonging — values, example communities, trust
├── /pricing                        Conversion — early-access free + plan outline
├── /docs                           Docs hub — concepts, roadmap, architecture (LLM-first)
├── /about                          Mission/trust — "operating system for human collaboration"
├── /contact                        Contact form + support paths
├── /privacy                        Privacy policy (legal)
└── /terms                          Terms of service (legal)

Non-HTML endpoints (fe-seo, TASK-216):
├── /sitemap.xml                    All 9 HTML pages
├── /robots.txt                     Allow all crawlers (incl. GPTBot/ClaudeBot/PerplexityBot), disallow /api
├── /llms.txt                       LLM crawler index (§8.1)
└── /docs/*.md                      Markdown-parseable page variants (llms.txt v2 rel=alternate)
```

**Hierarchy rule:** flat, one level deep. Home is the hub; every page is linked
from Home (footer/nav), every page in the sitemap. No orphan pages. Breadcrumb
pattern: `Home › <Page>` (JSON-LD `BreadcrumbList` on every subpage).

**URL rules (per arch, TASK-212):**
- Lowercase kebab-case paths, no trailing slash, no params on canonical.
- Canonical URL = absolute origin + path (`https://joinorigin.com/features`).
- Site origin constant (e.g., `lib/seo/site.ts` or equivalent) defined once in
  the arch pattern — single source for canonical/OG/JSON-LD absolute URLs.
- No `.html` suffix; `sitemap.xml` lists HTML pages only.

---

## 5. Per-Page Spec (purpose, content outline, keywords)

> Each page: **one `<h1>`**, semantic `<main>`, definitional intro paragraph in
> the first 2-3 sentences (LLM-parseable), FAQ block (visible Q&A), matching
> JSON-LD. All copy follows the Sprint-3 voice ("calm workspace", "teams find
> their origin") and whitepaper language ("people first", "communities drive
> growth", "collaboration creates value").

### 5.1 Home — `/`

**Purpose:** define the category ("social collaboration network" / "community
OS"), convert visitors to the waitlist. **Intent:** brand + category + early
conversion.

| Element | Spec |
|---|---|
| Title | `JoinOrigin — Social Collaboration Network & Community OS` |
| Meta description | `JoinOrigin is a social collaboration network where people discover each other, form communities, start projects, and build companies together. Join 2,400+ builders on the waitlist.` |
| H1 (kept from Sprint 3) | `Where teams find their origin` (typewriter, two-tone) |
| **New: definition paragraph** (visible, above the fold or directly under hero; LLM-critical) | `JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace.` |
| Existing sections | Hero (typewriter + orbit viz + trust row), logo ticker, footer (Sprint 3 spec, unchanged) |
| FAQ (new block, §8.3 bank) | 4-6 Q&As: What is JoinOrigin? · How is JoinOrigin different from Discord/LinkedIn/Reddit? · Is JoinOrigin free? · When does early access start? · How do I join? |
| JSON-LD | `Organization` + `WebSite` (layout-level, TASK-216) + `FAQPage` (homepage FAQ) |
| Primary keyword | `social collaboration network` |
| Secondary | `community OS`, `community operating system`, `collaboration platform`, `community collaboration` |

### 5.2 Features — `/features`

**Purpose:** teach what the product does, organized by whitepaper **Core
Objects**; differentiate vs. single-purpose tools. **Intent:** informational
(product education) + comparison.

| Element | Spec |
|---|---|
| Title | `Features — Communities, Chat, Projects & Opportunities | JoinOrigin` |
| Meta description | `Explore JoinOrigin's features: communities, real-time chat, feed, projects, companies, and opportunities — the social collaboration network built to turn relationships into outcomes.` |
| H1 | `Everything a community needs, in one calm workspace` |
| Intro paragraph (definitional) | `JoinOrigin is a social collaboration network built around seven core objects: profiles, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.` |
| Section A — Core Objects (cards, from whitepaper) | `Profiles` · `Communities` (AI Builders, Startup Founders, Quant Trading, Real Estate, Local) · `Communication` (real-time chat, DMs, group discussions) · `Feed` (posts, updates, opportunities) · `Projects` (collaborative efforts) · `Companies` (ventures formed by members) · `Opportunities` (jobs, partnerships, investments) |
| Section B — Comparison (table) | `LinkedIn finds professionals · Discord communicates · Reddit discusses · GitHub codes — JoinOrigin combines them around the social graph` (from whitepaper §"Most platforms solve only one part") |
| Section C — Roadmap phases | Phase 1 Community Foundation → Phase 2 Collaboration → Phase 3 Organization → Phase 4 AI Collaboration → Phase 5 Global Network (whitepaper; abbreviated 1-line each) |
| CTA | `Get Started` (waitlist modal) |
| FAQ | How is JoinOrigin different from Discord? · Is JoinOrigin open source? · What is the social graph? · When will projects/companies launch? |
| JSON-LD | `BreadcrumbList` + `FAQPage` |
| Primary keyword | `community platform features` / `collaboration network` |
| Secondary | `community chat`, `community feed`, `online community platform`, `project collaboration platform`, `community building platform` |

### 5.3 Community — `/community`

**Purpose:** belonging + social proof; answer "what's it like inside?"
**Intent:** community/network intent — matches the anchor category.

| Element | Spec |
|---|---|
| Title | `Community — Find Your People & Build Together | JoinOrigin` |
| Meta description | `Join a growing social collaboration network of 2,400+ builders. Discover communities around AI, startups, trading, real estate, and local interests — and build with people who share your goals.` |
| H1 | `Where people find each other` |
| Intro paragraph | `JoinOrigin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.` |
| Section A — Values (from whitepaper principles) | People First · Communities Drive Growth · Collaboration Creates Value · Ownership & Sovereignty |
| Section B — Example communities (whitepaper examples) | AI Builders · Startup Founders · Quant Trading · Real Estate · Local Communities · Digital Nomads · Open Source Developers |
| Section C — Trust | `2,400+ Members` stat (consistent with Sprint 3) + orbit/avatar visual reuse (design language) |
| CTA | `Get Started` (waitlist modal) |
| FAQ | What communities can I join? · Can I start my own community? · Is my data mine? (ownership) · Are communities free? |
| JSON-LD | `BreadcrumbList` + `FAQPage` |
| Primary keyword | `online communities` / `join a community` |
| Secondary | `communities for founders`, `community for AI builders`, `find your community`, `social network for builders` |

### 5.4 Pricing — `/pricing`

**Purpose:** conversion + honesty. **Intent:** transactional. No fabricated
prices (Google policy + brand trust).

| Element | Spec |
|---|---|
| Title | `Pricing — Free During Early Access | JoinOrigin` |
| Meta description | `JoinOrigin is free during early access. Reserve your spot on the waitlist, then choose the plan that fits your community when we launch. No spam, no lock-in.` |
| H1 | `Simple pricing, free while we build` |
| Intro paragraph | `JoinOrigin is in early access. Joining the waitlist is free, and early members keep free access when the community OS launches. Full plan details are announced with the beta.` |
| Section A — Current offer | `Early access: free` + waitlist CTA (modal) |
| Section B — Future plan outline (clearly labeled "coming soon", no numbers) | `Free` (individuals joining communities) · `Community` (running a community: chat, feed, events, projects) · `Organization` (companies/ventures: team management, opportunities) — tiers mirror whitepaper phases; **do not** invent prices |
| Section C — FAQ | Is JoinOrigin free right now? · What will plans cost? · Do I have to pay to join a community? · Can I self-host? (open architecture) |
| JSON-LD | `BreadcrumbList` + `FAQPage`. **Do not** emit `Product`/`Offer` until real pricing exists (Google sd-policies + honesty) |
| Primary keyword | `JoinOrigin pricing` / `community platform pricing` |
| Secondary | `free community platform`, `community software pricing`, `how much does JoinOrigin cost` |

### 5.5 Docs — `/docs`

**Purpose:** LLM-first documentation hub: concepts, roadmap, architecture,
standards. **Intent:** informational (docs + "how it works") — the site's
answer-engine surface.

| Element | Spec |
|---|---|
| Title | `Docs — Concepts, Roadmap & Architecture | JoinOrigin` |
| Meta description | `Learn how JoinOrigin works: profiles, communities, chat, feed, projects, companies, and opportunities. Explore the roadmap, tech stack, open standards (Matrix), and FAQ.` |
| H1 | `JoinOrigin docs` |
| Intro paragraph | `JoinOrigin is a social collaboration network — an operating system for human collaboration. These docs explain the core objects, the roadmap, and the architecture behind the platform.` |
| Section A — Concepts (definitional paragraphs, one per object) | Profiles · Communities · Communication · Feed · Projects · Companies · Opportunities (whitepaper §Core Objects, expanded to 2-3 sentences each) |
| Section B — Roadmap | Phases 1-5 (whitepaper, 1-3 sentences each, success metrics included) |
| Section C — Architecture & standards | Communication via **Matrix** (open, decentralized, E2EE); social graph is the product; open architecture, portable identity, user ownership; stack: React/TypeScript/Next.js, NestJS, PostgreSQL, Redis, Docker |
| Section D — FAQ | What is JoinOrigin built on? · What is Matrix? · Is JoinOrigin self-hostable? · When is the MVP launching? |
| Markdown variants | Static markdown pages served at `/docs/*.md` (e.g., `/docs/concepts.md`, `/docs/roadmap.md`, `/docs/architecture.md`) per llms.txt v2 `rel="alternate" type="text/markdown"` — content mirrors the HTML page sections |
| JSON-LD | `BreadcrumbList` + `FAQPage` |
| Primary keyword | `JoinOrigin docs` / `how JoinOrigin works` |
| Secondary | `community platform documentation`, `Matrix community platform`, `open source community platform`, `collaboration network architecture` |

### 5.6 About — `/about`

**Purpose:** mission/trust; establishes the entity behind the keywords.
**Intent:** navigational + trust.

| Element | Spec |
|---|---|
| Title | `About — The Operating System for Human Collaboration | JoinOrigin` |
| Meta description | `JoinOrigin's mission: a social collaboration network where people discover each other, form communities, and build projects and companies together. The network is the product.` |
| H1 | `The most valuable asset is your network` |
| Intro paragraph | `JoinOrigin is a social collaboration network built on one belief: the most valuable asset on the internet is not content or software — it is the network of people and the relationships they form.` |
| Section A — Mission | "operating system for human collaboration" (whitepaper Vision) |
| Section B — Principles | People First · Communities Drive Growth · Collaboration Creates Value · Open Architecture (whitepaper §Guiding Principles) |
| Section C — Founder guidance (quote block) | `Does this help people find each other? If no, do not build it.` (whitepaper §Founder Guidance) |
| Section D — Link | Whitepaper summary + `/docs` |
| JSON-LD | `AboutPage` + `Organization` (`sameAs` per arch) + `BreadcrumbList` |
| Primary keyword | `about JoinOrigin` / `social collaboration network mission` |
| Secondary | `social operating system`, `relationship network`, `what is JoinOrigin` |

### 5.7 Contact — `/contact`

**Purpose:** conversion + support path. **Intent:** transactional/navigational.

| Element | Spec |
|---|---|
| Title | `Contact — Talk to the JoinOrigin Team | JoinOrigin` |
| Meta description | `Questions about JoinOrigin, early access, or starting a community? Contact the team — we reply within 2 business days.` |
| H1 | `Talk to us` |
| Intro paragraph | `Have a question about the social collaboration network, early access, or starting a community on JoinOrigin? We'd love to hear from you.` |
| Section — Contact form | Name · Email · Message (web-local form; submit = `mailto:` fallback or reuse leads API **per fe-menu-pages decision**; must not require new backend in Sprint 4 — see Assumption 5) |
| Section — Alternate paths | Email link + FAQ shortcut (link to `/docs` FAQ) + social links (if defined by arch `sameAs`) |
| JSON-LD | `ContactPage` + `BreadcrumbList` |
| Primary keyword | `contact JoinOrigin` / `JoinOrigin support` |
| Secondary | `JoinOrigin email`, `talk to JoinOrigin team` |

### 5.8 Privacy — `/privacy`

**Purpose:** legal transparency. **Intent:** navigational/legal.

| Element | Spec |
|---|---|
| Title | `Privacy Policy | JoinOrigin` |
| H1 | `Privacy Policy` |
| Content outline | What we collect (waitlist name/email via `POST /api/leads`); analytics (config-driven trackers — consent deferred to a later sprint, arch/analytics must be privacy-framed); data rights (access, deletion); contact. Keep short, plain-English. |
| JSON-LD | `BreadcrumbList` only (no FAQ spam) |
| Keywords | `JoinOrigin privacy policy` |

### 5.9 Terms — `/terms`

**Purpose:** legal. **Intent:** navigational/legal.

| Element | Spec |
|---|---|
| Title | `Terms of Service | JoinOrigin` |
| H1 | `Terms of Service` |
| Content outline | Acceptance; accounts; user content; acceptable use; intellectual property; disclaimers; changes; contact. Plain-English, short. |
| JSON-LD | `BreadcrumbList` only |
| Keywords | `JoinOrigin terms of service` |

---

## 6. SEO Keyword Strategy per Page

**Anchor thesis (acceptance criterion):** JoinOrigin owns the intersection of
two intents — **"social collaboration network"** (category-defining, low
competition, high intent) and **"community OS" / "community operating
system"** (emerging long-tail) — with **one page per intent cluster** and
internal links passing relevance. We do **not** head-on fight "social media
platform" or "team chat" (commodity terms).

| Page | Primary keyword | Secondary keywords | Search intent | Title includes | FAQ focus |
|---|---|---|---|---|---|
| `/` | social collaboration network | community OS, community operating system, collaboration platform | Brand + category + convert | Primary | Category definition |
| `/features` | community platform features | community chat, community feed, project collaboration platform | Informational (education) | Primary | Differentiation |
| `/community` | online communities / join a community | communities for founders, find your community | Community/belonging | Secondary | Belonging + ownership |
| `/pricing` | JoinOrigin pricing | free community platform, community software pricing | Transactional | Brand + price intent | Cost + early access |
| `/docs` | JoinOrigin docs / how JoinOrigin works | Matrix community platform, open source community platform | Informational (docs) | Brand + docs | Architecture + launch |
| `/about` | about JoinOrigin | social collaboration network mission, social operating system | Navigational/trust | Brand | Mission |
| `/contact` | contact JoinOrigin | JoinOrigin support | Transactional/navigational | Brand | Support |
| `/privacy` | JoinOrigin privacy policy | — | Legal | Brand | — |
| `/terms` | JoinOrigin terms of service | — | Legal | Brand | — |

**Keyword rules for implementers:**
- One primary keyword per page; title tag starts with the primary keyword or
  brand+primary (per table). Do not stuff — use natural language.
- Meta description ≤ 160 chars, includes the primary keyword + a call to
  action (waitlist), unique per page.
- Use the exact phrase `social collaboration network` in the intro paragraph
  of Home, Features, Community, About, Docs (defined once on Home, reused
  consistently — entity clarity for LLMs).
- Long-tail landing opportunities (future, out of scope Sprint 4): comparison
  posts ("JoinOrigin vs Discord", "vs Circle", "vs Mighty Networks") on
  `/docs` or a future blog — **not** Sprint 4.
- Do not create thin variant pages (Google scaled-content-abuse policy —
  captured in §2.2).

---

## 7. JSON-LD / Structured Data Plan

**Guiding rules (from §2.2):** structured data must mirror **visible** page
content; no fake offers/reviews; validate with Rich Results Test; emit
server-side (SSR) not client-injected.

| Schema type | Where | Key fields | Notes |
|---|---|---|---|
| `Organization` | Layout (all pages) | `name: "JoinOrigin"`, `url`, `logo` (absolute `/assets/logo/joinorigin-logo.svg`), `sameAs` (defined per arch), `description` | Single source in `lib/seo` helper; never duplicated per page |
| `WebSite` | Layout (all pages) | `name: "JoinOrigin"`, `url`, `inLanguage: "en"` | No `SearchAction` until real search exists |
| `FAQPage` | Home, Features, Community, Pricing, Docs | `mainEntity: [{ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }]` | Each Q must be **visible** in the page HTML; answer ≤ 60 words, first sentence answers |
| `BreadcrumbList` | Every subpage | `itemListElement: [Home → Page]` | Home URL + page URL |
| `AboutPage` | `/about` | `about` → the mission/Organization | Mirrors visible H1/intro |
| `ContactPage` | `/contact` | `mainEntity` / `contactPoint` per arch | Mirrors visible form/email |
| `Product` / `Offer` | **Never in Sprint 4** | — | No real prices; adding fake offers violates Google policy and trust |
| `AggregateRating` / `Review` | **Never in Sprint 4** | — | No fabricated reviews |

**Implementation boundary:** discovery defines the *types and content*;
TASK-212 defines the *rendering pattern* (metadata API vs `<script
type="application/ld+json">`, `lib/seo` helpers); TASK-216 implements.

---

## 8. LLM-Crawler Optimization Plan (GEO/LLMSEO)

### 8.1 `/llms.txt` (root)

Ship a root `llms.txt` per the llms.txt v2 spec (H1 + blockquote summary +
optional prose + H2 file lists). Draft (build-ready, fe-seo adapts to
runtime):

```markdown
# JoinOrigin

> JoinOrigin is a social collaboration network — a community OS where people
> discover each other, form communities, start projects, and build companies
> together. It combines profiles, communities, chat, feed, projects,
> companies, and opportunities in one platform built around the social graph.

Key facts:

- JoinOrigin is not a chat app, project manager, or social feed — it is a
  relationship network that enables collaboration.
- The platform is organized around Communities (AI Builders, Startup Founders,
  Quant Trading, Real Estate, Local Communities).
- Communication runs on the open Matrix protocol; identity, profiles,
  communities, and the social graph are owned by JoinOrigin.
- Currently in early access; joining is free via the waitlist.

## Overview

- [Home](https://joinorigin.com/): What JoinOrigin is and how to join the waitlist.
- [About](https://joinorigin.com/about): Mission and principles — "the operating system for human collaboration".
- [Community](https://joinorigin.com/community): Values, example communities, and the 2,400+ member network.

## Features

- [Features](https://joinorigin.com/features): Core objects — profiles, communities, chat, feed, projects, companies, opportunities.
- [Roadmap](https://joinorigin.com/docs/roadmap.md): Phase 1 Community Foundation through Phase 5 Global Network.
- [Architecture](https://joinorigin.com/docs/architecture.md): Tech stack, Matrix protocol, open standards.

## Pricing

- [Pricing](https://joinorigin.com/pricing): Free during early access; future plan outline.

## Docs

- [Docs](https://joinorigin.com/docs): Concepts, roadmap, and architecture explained.
- [Concepts](https://joinorigin.com/docs/concepts.md): Profiles, communities, feed, chat, projects, companies, opportunities.

## Contact

- [Contact](https://joinorigin.com/contact): Contact form and support paths.

## Optional

- [Privacy Policy](https://joinorigin.com/privacy)
- [Terms of Service](https://joinorigin.com/terms)
```

Rules: keep `< ~2 KB` (context-friendly); every link points to an
LLM-parseable page or `.md` variant; descriptions are informative (llms.txt v2
guideline); no links to the waitlist modal or `/api/*`. The `joinorigin.com`
origin above is a **placeholder** — fe-seo substitutes the site-origin
constant defined by arch (TASK-212), same as canonical/OG/JSON-LD URLs.

### 8.2 Markdown-parseable content

- **Every page** is server-rendered (Next.js App Router SSR), with the full
  text present in initial HTML — no content gated behind client JS. Verified
  pattern: `TypewriterHeading` renders `FULL_TEXT` during SSR then re-types
  (progressive enhancement, §7 of Sprint-3 spec).
- New pages should be **server components where possible** (no `'use client'`
  unless interactive), so crawlers/LLMs get pure semantic HTML.
- **Definitional first paragraphs** (2-3 sentences) on every page — the first
  sentence answers "What is this page about?" (LLM answer-extraction friendly).
- **`.md` variants for `/docs`** per llms.txt v2: serve `/docs/concepts.md`,
  `/docs/roadmap.md`, `/docs/architecture.md` as static markdown (public
  folder or route handler per arch); link them from the HTML page via
  `rel="alternate" type="text/markdown"` and from `llms.txt`.

### 8.3 FAQ

- 4-6 **visible** FAQ entries per page (Home, Features, Community, Pricing,
  Docs) using semantic structure (`<section>` with `<h2>` per question + `<p>`
  answer, or `<details>/<summary>`); each mirrored 1:1 in `FAQPage` JSON-LD.
- Answer style: first sentence = direct answer (≤ 60 words total).
- FAQ bank shared across pages (§5 tables); **no duplicate full FAQ blocks**
  across pages — each page's FAQ is tailored to its intent cluster.

### 8.4 Semantic HTML checklist (every page)

- One `<h1>` per page; logical `h2 → h3` hierarchy; no skipped levels.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`; skip
  links where interactive elements exist.
- Descriptive link text (no "click here"); `alt` text on every image.
- Comparison table on `/features` uses real `<table>` semantics.
- `prefers-reduced-motion` respected (Sprint-3 global rule already in place).
- No duplicate content across pages (each page has a unique title/intro).

### 8.5 Crawler access (robots.txt / sitemap.xml) — content requirements

- **robots.txt:** allow all user agents, including `GPTBot`, `ClaudeBot`,
  `PerplexityBot`, `Google-Extended`, `ChatGPT-User` (default allow is
  sufficient — do not block AI crawlers); `Disallow: /api/`; reference
  `/sitemap.xml`. Implementation per TASK-212/TASK-216.
- **sitemap.xml:** all 9 HTML pages with `lastmod`; `/llms.txt` and
  `/docs/*.md` are not HTML pages and stay out of the sitemap (they are
  discovered via llms.txt / alternate links).
- **Canonical:** every page emits its canonical absolute URL (per arch).

### 8.6 Entity clarity (LLM grounding)

- Consistent name/description everywhere: "JoinOrigin — social collaboration
  network (community OS)".
- Define the category once (Home) and reuse; avoid ambiguity with the word
  "origin" (always "JoinOrigin" for the brand).
- `Organization.sameAs` points to real external profiles when they exist
  (arch defines; placeholders if none).

---

## 9. Handoff & Acceptance Mapping

| Discovery section | Consumed by | Acceptance link |
|---|---|---|
| §3 Menu structure, §5 page specs | `fe-menu-pages` (TASK-215) | "New pages render matching landing design language with semantic HTML; nav links reach all pages; per-page metadata exports per arch pattern" |
| §4 URLs, §7 JSON-LD, §8 LLM plan | `fe-seo` (TASK-216) | "sitemap.xml + robots.txt 200 and correct; JSON-LD present; llms.txt (if recommended) — **recommended: yes**; LLM-crawler friendly" |
| §2, §8.5 CWV/analytics framing | `arch-seo` (TASK-212) / `fe-analytics` (TASK-217) | Analytics config + privacy framing; consent deferred |
| §5, §7, §8.3-8.4 | `e2e-seo` (TASK-218) | e2e asserts metadata/OG/Twitter, sitemap, robots, JSON-LD, canonical, single h1, headings, copy |
| All copy strings | Sprint-3 language conventions | Keep brand voice; no external assets (local-only rule from Sprint 3) |

---

## 10. Open Questions / Assumptions

| # | Item | Assumption / Decision |
|---|---|---|
| 1 | Nav label "Features" vs "Product" | Use **Features** (higher-intent); URL `/features` regardless. PM may veto label only. |
| 2 | Future pricing numbers | **Do not invent prices**; `/pricing` shows "free during early access" + named tiers with "coming soon". |
| 3 | `/docs/*.md` mechanism | Static markdown under `apps/web/public/docs/` (simplest) or route handler per arch — TASK-212 decides; content lives in this doc's §5.5 sections. |
| 4 | `/contact` form backend | No new API in Sprint 4: form may submit to the existing `/api/leads` (name/email only) **or** render a `mailto:` — fe-menu-pages picks the lower-risk option; message field deferred. |
| 5 | `sameAs` social links | Placeholder/empty until real profiles exist; arch defines the pattern. |
| 6 | Existing `/#product` etc. anchors | Header now links to real pages; homepage section anchors (`/#product`, `/#community`, `/#pricing`, `/#docs`) that no longer exist should be **removed** from Header nav; keep `/#login` (modal/login) as-is. |
| 7 | OG image | Use existing local brand asset (`/assets/logo/joinorigin-logo.svg` or generated OG image per arch) — no external CDN (Sprint-3 rule). |
| 8 | llms.txt vs Google | llms.txt is neutral for Google (verified §2.2) but recommended for other LLM ecosystems + agentic browsing (Chrome Lighthouse agentic-browsing checks). Keep it. |

---

## 11. Definition of Done (for TASK-211 / discovery)

- [x] Menu items recommended (§3) — header, footer, mobile.
- [x] Per-page purpose + content outline (§5) — 9 pages.
- [x] Page hierarchy + URLs (§4).
- [x] SEO keyword strategy per page (§6).
- [x] JSON-LD / structured-data plan (§7).
- [x] LLM-crawler plan — llms.txt, markdown, FAQ, semantic HTML (§8).
- [x] Strategy anchored on "#1 for social collaboration network / community OS" intent (throughout).
- [x] No implementation code written (discovery only).
- [x] Navigation map updated (`docs/design/README.md`).
