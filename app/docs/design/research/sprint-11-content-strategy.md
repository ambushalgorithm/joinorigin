# Sprint 11 — Content Strategy Research: Content Hierarchy for the SEO Content Engine

> **Parent:** [`../README.md`](../README.md) · **Sprint:** Sprint 11 Story 1 (SEO Content Engine — research + architecture only) · **Role:** `research-content-strategy` (TASK-299) · **Consumers:** `arch-seo-content-engine` (TASK-303) + sibling research reports (TASK-296/297/298/300/301/302) · **Verifier:** `review-research-content-strategy`

## 1. Purpose & Scope

This document is a **best-opinion findings report** for the SEO Content Engine's
**content strategy layer**: which evergreen content types drive organic
discovery for community platforms, how they should be arranged into a content
hierarchy, and which city pages deserve manual polish first.

It deliberately does **not** produce the architecture solution (URL routing
details, `generateStaticParams` choices, dataset implementation) — that is the
architect's job in TASK-303. This report feeds the architect with:

1. **Evidence** — what content types demonstrably work for community platforms
   (Circle, Mighty Networks, Meetup, Reddit, local FB groups, Eventbrite) and
   the SEO mechanics behind them (evergreen topics, topic clusters, programmatic
   location pages, thin-content risk).
2. **The content hierarchy** — how-to guides, idea pages, topic hubs/glossary,
   city pages, and the internal-link mesh that connects them.
3. **Flagship-city recommendation** — which city pages get manual polish first
   and which are auto-generated, with the criteria behind the split.

Scope boundaries:
- **In scope:** evergreen content types, content hierarchy, idea-page format,
  topic hubs/glossary, flagship-city shortlist + manual-vs-auto criteria,
  quality thresholds for auto-generated pages, internal linking.
- **Not in scope:** technical feasibility (TASK-301), URL/build implementation
  (TASK-303), dataset sources/licensing (TASK-298), localization mechanics
  (TASK-300), MT-on-demand (TASK-302), competitor deep-dive (TASK-296),
  programmatic-SEO indexation mechanics (TASK-297). Cross-references included.
- **Zero implementation files edited** — this is a research document only.

---

## 2. Executive Summary

**Recommendation: run a three-layer content hierarchy for the SEO Content
Engine, in this priority order:**

| Layer | Content type | Volume model | Manual vs auto | Primary role |
|---|---|---|---|---|
| **L1 — Evergreen how-to guides** | "How to start a community", "how to organize a meetup", "how to get your first 10 members", "how to find a co-founder", "how to keep a community active", "hybrid communities", "moderation" | ~7–10 hand-authored, then maintained | **Manual** (template-assisted writing, human-edited) | Authority, E-E-A-T, conversion of high-intent informational queries → waitlist |
| **L2 — Topic hubs + glossary** | 1–2 pillar hubs ("Community building hub", "Community OS glossary") + cluster pages | ~2 hubs + 20–40 glossary terms | Hub: **manual**; glossary: **auto with editorial review** | Topical authority + internal-link mesh; LLM/AI-search answer surface |
| **L3 — Programmatic location pages + idea pages** | `/location/<country>/<region>/<city>` + city×group-type variants + "30 community event ideas in [City]" | Hundreds→thousands | **Auto-generated** with quality gates; **flagship cities get manual polish** | Long-tail discovery at scale; local "community" intent |

**Key findings (evidence-backed):**
1. **How-to guides are the highest-LTV content type for community platforms.**
   Every major player (Meetup Organizer Guide, CMX blog, Circle blog, Eventbrite
   Academy) invests heavily in "how to start/grow/run a community" content —
   the queries have stable, evergreen demand and match the product's core
   activation ("communities drive growth").
2. **Topic clusters (hub + spokes) are the proven architecture** for
   informational SEO (Ahrefs/HubSpot; Podia 8-page cluster, Wine Folly 40+,
   Drift chatbot hub → 500+ links / 6,400 visits/mo).
3. **Programmatic city pages work — but only with real, per-city data.**
   Yelp (150+ city pages), Tripadvisor ("Things to Do in [City]"), Nomadlist
   (25k location pages), Wise (14.8k pages, 4.6M visits/mo) prove the model.
   John Mueller: "programmatic SEO is often a fancy banner for spam" — thin,
   location-swapped pages get deprioritized. **The differentiator is unique
   per-city data + genuinely helpful copy.**
4. **Idea/listicle pages ("30 ideas for community events in [City]") are a
   strong, under-served format** — direct evidence from Meetup's "Fun Things to
   Do in [City]" Local Guides series and Eventbrite's listicle taxonomy. They
   combine listicle CTR with location long-tail.
5. **Flagship cities first.** Manually polish a small set (~8–10) of
   high-opportunity cities (startup/community density, search demand,
   EN-first fit), auto-generate the rest behind quality gates, and promote
   cities to flagship as they earn organic traction.

---

## 3. Evidence — What Drives Organic Discovery for Community Platforms

### 3.1 Evergreen content: topic-selection strategy, not publish-once

Ahrefs' 2026 research on evergreen content in the AI-search era reframes
evergreen from "write once" to **a topic strategy + ongoing maintenance**:

- The average #1 ranking page is ~5 years old; 72.9% of Google top-10 pages are
  3+ years old — old content wins, but almost none of it was left alone
  (Ahrefs, 1M-URL study).
- **Semantic stability test** is the filter: is the fundamental answer the same
  in 5 years? "How to start a community" passes; "best AI tools 2026" fails.
- **Content refresh rate** matters: low-refresh-rate topics (skills-based
  how-tos, foundational concepts) are ideal for evergreen SEO because they need
  only annual/periodic refresh, not monthly rewrites.
- AI search favors authoritative, established sources for stable informational
  queries (85% of AI Overview citations come from content published in the last
  2 years; authority + freshness together win).

**Application to JoinOrigin:** community-building how-tos are semantically
stable (people have started communities for decades; the fundamental steps —
purpose, audience, platform, first event, moderation — don't churn like
software features). They are low-refresh-rate topics where a well-written,
authoritative page compounds. This makes L1 the **safest and most durable**
investment in the engine.

### 3.2 How-to guides: the community platform playbook

Direct competitive evidence — every serious community platform runs a
how-to/guide content program aimed at "I want to build a community" intent:

| Platform | Content program | Evidence |
|---|---|---|
| **Meetup** | Organizer Guide category: "The Ultimate Guide to Starting a Group on Meetup", "What to Do at Your First Event", "Ideas for Creating a Meetup Group", "Finding the Right Venue", "6 Ways to Re-energize Your Meetup Group" | `meetup.com/blog/category/organizer-guide/` |
| **CMX (Bevy)** | Blog + Academy + Reports: community management, engagement, operations, events; "What Keeps a Community Running Beyond Engagement" | `cmxhub.com/blog` |
| **Circle** | Blog resources: "How to build a community", growth/engagement/how-to posts | `circle.so/blog`, `circle.so/resources` |
| **Eventbrite** | Blog taxonomy by content format: Guides, Checklists, Listicles, Templates; "Getting Started / Event Planning / Event Marketing / Event Management" | `eventbrite.com/blog` |
| **FeverBee (Richard Millington)** | The community-industry how-to site: community strategy, engagement, "how to grow" guides | feverbee.com (established authority) |
| **HubSpot/Common Room/Orbit** | "How to build a community" + first-10-members + engagement playbooks | community-industry standard |

**Why this works for SEO:**
- High-intent informational queries ("how to start a community",
  "how to get first members", "how to organize a meetup", "how to find a
  co-founder", "community moderation") have **stable search demand** and are
  exactly the moment a future JoinOrigin community organizer is looking for a
  home for their community.
- These pages rank for head terms that competitors (Circle, Mighty Networks,
  Meetup) also chase — JoinOrigin can compete on specificity and honesty, per
  the Sprint 4 anchor (be the #1 answer for the community-building intent
  cluster, don't head-on fight commodity terms).
- Each guide is a **conversion path to the waitlist**: the natural CTA is
  "ready to start your community? Join the waitlist" — matching the product's
  activation loop.

### 3.3 Topic hubs / topic clusters: the internal-link + authority machine

Ahrefs/HubSpot's topic-cluster model (pillar page + interlinked cluster pages)
is the standard architecture for informational SEO:

- **Podia** (online course): 1 guide + 8 subpages, evergreen.
- **Wine Folly** (wine basics): 1 hub + 40+ supporting articles.
- **Drift** (chatbot learning centre): hub + subpages → **500+ backlinks and
  ~6,400 organic visits/mo**; Zapier's remote-work hub → **1,000+ linking
  sites**.
- Mechanics: internal links pass relevance + authority between hub and spokes;
  Google's guidance is simply "design your site to have a clear conceptual page
  hierarchy".

**Application:** the how-to guides (L1) should be organized under **one or two
manual hub pages** ("Community building" hub + "What is a community OS" /
glossary hub). Hubs concentrate topical authority, make internal linking
systematic, and give LLM crawlers a clean entry point (complements the existing
`llms.txt` + FAQ + JSON-LD strategy from Sprint 4).

### 3.4 Programmatic location pages: the scale engine — with strict quality gates

The strongest evidence for programmatic location pages at scale:

| Example | Page count | Traffic | Data that makes it non-thin |
|---|---|---|---|
| **Yelp** | 150+ city pages + category subpages | massive | Real business listings, hours, ratings |
| **Tripadvisor** | "Things to Do in [City]" for every city | massive | Real attractions, tickets, reviews |
| **Nomadlist** | ~25.8k location pages | ~41k visits/mo | Real data: internet speeds, temps, cost, languages |
| **Wise** | ~14.9k currency pages | ~4.6M visits/mo | Live rates, charts, send-money action |
| **Zapier** | ~800k app pages | ~306k visits/mo | Live workflows, integration depth |

Critical caveat — **John Mueller (Google): "Programmatic SEO is often a fancy
banner for spam."** The failure modes documented by Ahrefs location-page
research:
1. Mass-produced local pages prioritizing quantity over quality.
2. Creating location pages for areas where the business has **no tangible
   presence**.
3. **Duplicated content with only the location swapped.**
4. Regurgitated Wikipedia history of the location.

**Implications for JoinOrigin city pages (flagship for the architect):**
- **Presence logic:** JoinOrigin's "presence" in a city is the *network* —
  communities/events/people there. Until real data exists, pages must be honest
  ("Find or start a community in Berlin" — the intent is *starting/discovering*
  a community, not "JoinOrigin has an office here"). This is a genuine,
  defensible presence model for a community platform: the platform's value
  proposition *is* local community formation.
- **Per-city unique data is mandatory:** at minimum a city-specific intro
  (what the city's community scene looks like), city data points from the
  geodata report (TASK-298: population, region, languages), group-type
  variants (startup founders, AI builders, local/neighborhood, professional),
  and idea-page content. A page whose only variable is the city name is a
  doorway page.
- **Quality gates + indexation strategy** belong to TASK-297 (programmatic-seo)
  and TASK-301 (tech-feasibility); the content strategy requirement is: *do not
  publish pages that fail the unique-content threshold*, and noindex/throttle
  until they pass.

### 3.5 Idea pages ("30 ideas for community events in [City]"): evidence

- **Meetup Local Guides** (`meetup.com/blog/category/local-guides/`): a
  series of "Fun Things to Do in Atlanta / Chicago / NYC / San Diego / …"
  pages — city + listicle format, refreshed periodically (monthly in the
  examples).
- **Eventbrite** blog uses a "Listicle" content format tag across community
  and event-planning content.
- **Tripadvisor "Things to Do in [City]"** proves the long-tail scale of
  city+list queries.

**Why "community event ideas in [City]" is a strong programmatic template:**
- Query family: "community events [city]", "things to do [city]",
  "meetup ideas [city]", "networking events [city]" — local informational
  intent with stable demand.
- Listicle format has high CTR in SERPs and is cheap to template well (a real
  list of 30 ideas, each with 1–2 sentences + who it's for + where it could
  happen).
- Differentiates from TripAdvisor (attractions) and Meetup (existing groups)
  by focusing on *events a person could organize* — the exact product action
  JoinOrigin wants.
- **Honesty gate:** ideas must be genuinely applicable to the city (venues
  types, culture), not a generic list with the city name pasted in.

### 3.6 Glossary: the under-rated AI-search + internal-link asset

- Semrush's programmatic-SEO guide uses a **marketing glossary** as its
  canonical example of programmatically generated definition pages at scale
  ("marketing definition", "content marketing definition", etc.).
- Glossary pages win featured snippets (concise definition format) and are
  heavily cited by AI assistants for "what is X" queries.
- For JoinOrigin: a **Community OS / community-building glossary** (community
  manager, moderation, onboarding, activation, engagement loop, DMs,
  communities, projects, opportunities, co-founder, MVP, hybrid events…)
  reinforces entity clarity ("social collaboration network", "community OS" —
  the Sprint 4 keyword anchors) and feeds the LLM-crawler strategy.

---

## 4. Content Hierarchy — Definition

### 4.1 The three layers + supporting structures

```text
joinorigin.com
│
├── L2a  HUB — Community Building Hub  (/guides or /resources)
│         pillar page: how to start + grow + run a community
│         │
│         ├── L1  How-to: Start a community
│         ├── L1  How-to: Organize a meetup / first event
│         ├── L1  How-to: Get your first 10 members
│         ├── L1  How-to: Find a co-founder
│         ├── L1  How-to: Keep a community active
│         ├── L1  How-to: Run hybrid (online + offline) communities
│         └── L1  How-to: Moderate a community
│
├── L2b  HUB — Community OS / Glossary  (/glossary)
│         pillar: what is a community OS / social collaboration network
│         └── glossary term pages (community manager, moderation, onboarding,
│             engagement loop, hybrid events, co-founder, MVP, …)
│
├── L3   CITY PAGES  (/location/<country>/<region>/<city>)
│         pillar per city: communities & events in [City]
│         ├── city × group-type variants (startup founders, AI builders,
│         │   local/neighborhood, professional networks)   [auto]
│         └── idea pages: "30 community event ideas in [City]"  [auto + flagship manual]
│
└── (existing pages: /, /features, /community, /docs, /about, /contact,
    /privacy, /terms — all L1/L2/L3 pages internally link to these)
```

**Content-type definitions:**

| Type | Definition | Purpose | Volume model |
|---|---|---|---|
| **How-to guide (L1)** | 1,500–2,500-word evergreen guide with clear steps, examples, checklist, FAQ | Rank high-intent informational queries; convert to waitlist | Manual, template-assisted, human-edited |
| **Topic hub / pillar (L2)** | Broad overview page linking to all cluster pages | Concentrate topical authority; systematic internal links | Manual |
| **Glossary term (L2)** | 150–300-word definition page | Featured snippets + AI citations; entity clarity | Auto template + editorial review |
| **City page (L3)** | Per-city overview: communities/events in [City], group-type links, city data, FAQ | Long-tail local discovery | Auto with quality gates; flagship manual |
| **City × group-type variant (L3)** | "Startup communities in Berlin", "AI builder groups in Austin" | Longer-tail variant targeting | Auto |
| **Idea page (L3)** | "30 community event ideas in [City]" — listicle | Local listicle intent; CTR | Auto template; flagship manual |

### 4.2 The how-to guide set (L1) — recommended topics & targets

| Guide | Primary search intent | Secondary keywords | Refresh rate | CTA |
|---|---|---|---|---|
| **How to start a community** | Head informational: "how to start a community" | build a community, start an online community, start a local community, community launch | annual | Waitlist ("ready to start?") |
| **How to organize a meetup** | "how to organize a meetup / first event" | plan a community event, host a meetup, first meetup checklist | annual | Waitlist + link to city idea pages |
| **How to get your first 10 members** | "how to get your first members" | first 10 members, community seeding, early member recruitment | annual | Waitlist |
| **How to find a co-founder** | "how to find a co-founder" | find a business partner, co-founder matchmaking, startup co-founder | annual | Waitlist (opportunities/projects objects) |
| **How to keep a community active** | "how to keep a community active" | community engagement, revive a dead community, community retention | annual | Waitlist + link to engagement glossary |
| **How to run hybrid communities** | "hybrid community / online + offline" | hybrid events, in-person + online community, local + global | biennial | Waitlist |
| **How to moderate a community** | "community moderation" | moderation guidelines, code of conduct, handling toxic members | annual | Waitlist + moderation glossary |

**Editorial rules (evidence-based):**
- One H1, definitional intro (first 2–3 sentences name the topic + the need —
  the Sprint 4 LLM/GEO convention), step-by-step structure, ≥150 words, FAQ
  block mirrored in FAQPage JSON-LD.
- Avoid tool-specific or date-stamped framing (evergreen angles only); refresh
  stats/examples annually (Ahrefs content refresh-rate guidance).
- Every guide carries an honest "JoinOrigin can help" CTA but does not
  overpromise product features (Sprint 4 honesty rules: no fake offers).
- Cross-link every guide to the hub and to each other (cluster), and to the
  relevant city page (e.g., "organize a meetup" → "meetup ideas in [City]").

### 4.3 Idea-page format (L3) — recommended template anatomy

"30 community event ideas in [City]" — the template must produce **unique,
city-aware** output:

1. **City intro (auto from city dataset + editorial seed copy):** what the
   city's community scene looks like (tech hubs, neighborhoods, universities,
   industry clusters) — no Wikipedia regurgitation.
2. **30 ideas, grouped by category** (e.g., 6 categories × 5 ideas:
   Networking · Learning/workshops · Social/outdoor · Professional/industry ·
   Creative/maker · Impact/local):
   - Each idea: 1–2 sentence pitch + who it's for + suggested venue type
     (localized: "a riverside cafe", "a downtown coworking space").
   - Template generates the *idea list* from per-city editorial seeds +
     category data; human review for flagship cities.
3. **City data block** (from TASK-298 dataset): region, language(s), notable
   community/startup signals.
4. **Related links:** city page, other idea pages for the same city, guide
   ("organize a meetup"), glossary terms.
5. **FAQ** (3–5 city-relevant Q&As) + FAQPage JSON-LD.
6. **Honesty gate:** any idea that requires venue/factual claims must be
   generic enough to be true for any city or seeded per city with vetted copy.

### 4.4 Glossary (L2) — recommended term set (seeded)

Core Community OS terms: community, community manager, community OS, social
collaboration network, moderation, code of conduct, onboarding, activation,
engagement loop, retention, DMs/conversations, feed, projects, companies,
opportunities, co-founder, meetup, hybrid event, local community, creator
economy, network effects, social graph (aligns with whitepaper Core Objects +
Sprint 4 FAQ bank).

### 4.5 Internal-link mesh (evidence: topic-cluster model)

- **Hub → spokes:** hub page links every guide/glossary term/city group.
- **Spoke → hub:** every guide links back to its hub (BreadcrumbList JSON-LD
  pattern from Sprint 4 arch).
- **Guide ↔ city:** "organize a meetup" ↔ city idea pages; "start a
  community" ↔ flagship city pages.
- **City → city:** country/region clusters (all cities in a region link each
  other, "communities near X").
- **City → guide:** every city page links to the 2–3 most relevant guides
  (start a community, organize a meetup, keep active).
- **Everything → existing conversion pages:** guides/hubs/city pages carry the
  waitlist CTA; city pages link to /community, /features, /about as relevant.
- **llms.txt / sitemap:** L1 + L2 hubs belong in `llms.txt` (LLM entry);
  L3 auto pages belong in sitemap only when they pass quality gates (TASK-297).

---

## 5. Flagship City Pages — Manual Polish First

### 5.1 Why a flagship split at all

Programmatic pages at thousands of URLs *can* rank (Yelp/Tripadvisor/Wise
evidence), but the same evidence shows the winners are built on **real,
per-city data**. JoinOrigin has no member data yet (waitlist product). Manual
polish on a small set of cities lets us:
1. Create genuinely helpful, city-specific pages that establish the template's
   quality bar (proof-of-concept that auto pages must match).
2. Earn links/mentions in those metros (startup/community newsletters, local
   media) that seed authority for the whole location cluster.
3. Test what converts (city page → guide → waitlist) before scaling.

### 5.2 Flagship selection criteria (evidence-based)

| Criterion | Why (evidence) | Proxy signal |
|---|---|---|
| **Community/startup density** | Communities form where density exists (Meetup's top cities; CMX chapters; startup ecosystems per Startup Genome: SF Bay, NYC, London, Berlin, Tel Aviv, LA, Singapore, Bangalore) | Metros with strong Meetup/CMX/startup presence |
| **Search demand for "community/meetup/events + city"** | Local-intent long-tail volume (Ahrefs "cost of living in X" 1,143 keywords/122k vol; TripAdvisor Things-to-Do scale) | Large metro = larger query family |
| **EN-first fit** | Auto-generated pages are EN-first (TASK-300); flagships should rank in English with existing 21-locale coverage | English-proficient metros; locales en, de, fr, es, pt-BR, ja, ko, zh… available |
| **Brand alignment** | Whitepaper community examples: AI Builders, Startup Founders, Quant Trading, Real Estate, Local | Tech/finance/real-estate metros |
| **Template representativeness** | Flagship set should stress-test every group-type + idea-page variant | Mix of mega-metro, mid-metro, international |

### 5.3 Recommended flagship shortlist (manual polish, ~8–10 first)

**Tier 1 — manual polish first (high opportunity, EN-first, diverse):**

| City | Why flagship | Group-type variants to polish | Idea page focus |
|---|---|---|---|
| **New York** | #1 community/meetup market (EN), finance + tech + real estate, massive local-intent volume | Startup founders, finance/quant, AI builders, local neighborhoods | Networking + professional + creative |
| **San Francisco / Bay Area** | Global startup epicenter; AI builders + startup founders = whitepaper examples | Startup founders, AI builders, tech meetups | Learning + maker + startup |
| **London** | European community/startup hub; strong EN volume; fintech + creative | Startup founders, fintech, creative/design | Networking + professional |
| **Berlin** | Euro startup + creative scene; de locale coverage | Startup founders, tech/creative, local | Creative + tech + local |
| **Austin** | US mid-metro startup/community boom; music+tech+local | Startup founders, local/neighborhood, music/creative | Local + music + startup |
| **Toronto** | NA tech/community hub; diverse local scene | Startup founders, AI builders, local | Networking + local |
| **Singapore** | APAC business/community hub; en coverage; regional gateway | Startup founders, professional, local | Professional + networking |
| **Bengaluru (Bangalore)** | India's startup hub; hi locale coverage; massive community demand | Startup founders, AI/tech, local | Startup + learning |

**Tier 2 — auto-generated with rich template + review (next ~30–50):** Los
Angeles, Chicago, Seattle, Boston, Denver, Miami, Washington DC, Philadelphia,
San Diego, Phoenix, Atlanta, Portland, Vancouver, Montreal, Paris, Amsterdam,
Madrid, Barcelona, Munich, Zurich, Dublin, Stockholm, Copenhagen, Sydney,
Melbourne, Tokyo, Seoul, Tel Aviv, Dubai, São Paulo, Mexico City, Mumbai,
Delhi, Jakarta, Bangkok, Ho Chi Minh City, Taipei, Hong Kong, Warsaw, Istanbul
(ordered by density + EN/localization fit).

**Tier 3 — fully auto-generated behind quality gates:** every other city in
the dataset; pages published only when the template produces unique content
above the threshold; noindex/not-in-sitemap until pass (TASK-297 mechanics).

### 5.4 Promotion path (auto → flagship)

A Tier 2/3 city page earns **promotion to manual polish** when it shows real
signal:
- GSC impressions/clicks above a floor (e.g., top 10 for ≥5 target queries)
  after ≥90 days,
- or an inbound link/mention from a local source,
- or a waitlist signup cluster from that city (leads.csv has locale/IP — see
  Story 3; the Content Engine can consume this signal later).

This keeps manual effort pinned to proven ROI instead of guessing.

---

## 6. Quality Thresholds for Auto-Generated Pages (content-side contract)

The architect (TASK-303) should treat these as **content requirements** for
any auto page (they pair with TASK-297's indexation gates):

1. **Unique copy per page:** every page must contain ≥1 city-specific prose
   section written from city data + editorial seeds (not just name substitution
   across 80% of body copy). Title/meta/H1 must include the city + group-type
   (Ahrefs location-page element #1–2).
2. **Honest presence claim:** pages frame JoinOrigin as *the network where a
   community can start* in [City], never as a local business claiming an
   office/staff there (doorway-page risk from Ahrefs location research).
3. **Structured data:** BreadcrumbList (per existing pattern), FAQPage when FAQ
   present, ItemList for idea pages; JSON-LD must mirror visible content
   (Sprint 4 rules).
4. **E-E-A-T signals:** author/brand entity visible (Organization JSON-LD),
   sourced city facts, no fabricated stats.
5. **Internal links:** page must link to hub + ≥2 guides + sibling city pages;
   hubs link back (no orphan pages).
6. **Accessibility + LLM rules:** single H1, semantic HTML, ≥150 words, no
   JS-gated content (Sprint 4 §5).
7. **Threshold enforcement:** if a generated page fails #1/#2/#5, do not serve
   it indexable (noindex + exclude from sitemap) until fixed.

---

## 7. Localization & AI-Search Notes (for architect reconciliation)

- **EN-first** (TASK-300): auto-generated city pages ship in English first;
  flagship cities with non-EN locales (Berlin/de, Bengaluru/hi, São Paulo/
  pt-BR, Tokyo/ja, Seoul/ko, Paris/fr, Madrid/es, Warsaw/pl, Istanbul/tr…) are
  the natural first candidates for later localization — flagships double as
  the localization testbed.
- **hreflang/alternate** implications belong to TASK-300/301; content strategy
  just notes: one canonical URL per page, no duplicate city pages across
  locales without hreflang.
- **AI-search/LLM surface:** L1 guides + L2 glossary are the pages most likely
  to be cited by AI assistants for "how do I start a community" queries
  (authority + freshness + definitional format evidence, §3.1/§3.6). Keep them
  in `llms.txt` and markdown-parseable.

---

## 8. Recommendations for the Architect (TASK-303)

1. **Adopt the 3-layer hierarchy** (§4) as the content taxonomy; implement
   hubs + guides as static/manual content first, city pages programmatically.
2. **Ship the 7 how-to guides first** (before scaling city pages) — they build
   the authority that city pages need to rank (hub-spoke model), and they are
   the highest-LTV content with the lowest thin-content risk.
3. **Scope the first programmatic batch to Tier-1 flagships + a small Tier-2
   slice** (~10–20 cities, not thousands) to validate the template quality bar
   before mass generation — matches the "start small, promote on signal" model.
4. **Make idea pages a first-class city-page variant** ("30 community event
   ideas in [City]"), seeded per city; they are cheap, high-CTR, and
   differentiated vs TripAdvisor/Meetup.
5. **Enforce content quality gates** (§6) in the generation pipeline and pair
   with TASK-297's indexation strategy (sitemap inclusion only when passing).
6. **Wire the waitlist CTA** into every guide/hub/city page (existing modal +
   `/api/leads`), with `trackEvent('signup_click', { source: 'guide-…' })` per
   analytics contract for future content-performance measurement.
7. **Consume TASK-298 city dataset** for per-city data points and **TASK-300
   localization** for EN-first + hreflang; **TASK-296 competitor** report for
   keyword/positioning validation; **TASK-301** for build/routing feasibility.

---

## 9. Sources

- Ahrefs — *Evergreen Content in the Age of AI Search* (2026): evergreen =
  topic strategy + maintenance; freshness signals; refresh-rate guidance;
  Ahrefs 1M-URL ranking-age study; Seer AI-citation recency.
- Ahrefs — *How to Build a Topic Cluster in 10 Minutes*; *Content Hubs for
  SEO* (Podia 8-page cluster; Wine Folly 40+; Drift chatbot hub 500+ links /
  ~6,400 visits/mo; Zapier remote-work hub 1,000+ links).
- Ahrefs — *Programmatic SEO, Explained for Beginners* (Nomadlist ~25.8k
  pages / ~41k visits; Zapier ~800k pages / ~306k visits; Webflow ~31.5k /
  ~27.6k; Wise ~14.9k / ~4.6M; John Mueller "fancy banner for spam" quote;
  thin-content/spam-policy warnings).
- Ahrefs — *Location Landing Pages: 6 Crucial Elements of Local Visibility*
  (localized URL/title, presence, duplicate-content and Wikipedia-regurgitation
  failure modes).
- Semrush — *What Is Programmatic SEO?* (Yelp 150+ city pages; Tripadvisor
  "Things to Do in [City]"; glossary-as-programmatic-example).
- Meetup — Organizer Guide category (Ultimate Guide to Starting a Group, First
  Event, Venue, Re-energize), Local Guides series ("Fun Things to Do in
  Atlanta/Chicago/NYC/…"), `/cities/` country+city hierarchy, topics pages.
- Eventbrite — blog content-format taxonomy (Guide/Checklist/Listicle/
  Template) and community/event-planning categories.
- CMX (Bevy) — blog + Academy + reports on community management/engagement/
  operations.
- Circle — blog/resources on community building.
- Internal: `app/docs/design/sprint-4-discovery.md` (intent clusters, page
  specs, FAQ/JSON-LD/LLM rules), `sprint-4-seo-arch.md` (metadata/JSON-LD/
  sitemap/llms.txt patterns), `ORIGIN-WHITEPAPER.md` (Core Objects, community
  examples), `lib/seo/routes.ts` + `site.ts` (ROUTES/SEO constants).

---

## 10. Open Questions / Assumptions (for architect + PM)

| # | Item | Assumption / recommendation |
|---|---|---|
| 1 | How-to guide URL namespace | Suggest `/guides/…` or `/resources/…`; architect decides against existing ROUTES pattern |
| 2 | Flagship count for Sprint 12 | Start 8 Tier-1 + small Tier-2 slice; scale only after template quality validated |
| 3 | Idea-page seed data | Needs editorial seed copy per city (flagships) + category data (auto); architect must budget for a "city content seeds" dataset |
| 4 | Waitlist CTA tracking | Use existing analytics `trackEvent` contract; measure per-content-type signup source |
| 5 | Promotion-to-flagship signal | Depends on Story 3 (leads.csv locale/IP) + GSC; defer wiring until data exists |
| 6 | Glossary volume | 20–40 terms initially; auto-template with editorial review; no index bloat |

---

## 11. Navigation Footer

- **Up:** [`../README.md`](../README.md)
- **Sibling research:** `sprint-11-market-competitor.md` · `sprint-11-programmatic-seo.md` · `sprint-11-geodata.md` · `sprint-11-localization.md` · `sprint-11-tech-feasibility.md` · `sprint-11-translation-services.md`
- **Consumer:** `arch-seo-content-engine` (TASK-303) → `app/docs/design/sprint-11-seo-content-engine.md`
- **Verifier:** `review-research-content-strategy`
