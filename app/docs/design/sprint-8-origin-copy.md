# Sprint 8 — Origin Copy Change Log

> **Origin-as-product / JoinOrigin-as-brand copy overhaul — approved copy, verbatim.**
>
> - **Task:** TASK-244 — design-origin-copy
> - **Status:** Approved for FE application
> - **Date:** 2026-08-12
> - **Branch:** `feat/design-origin-copy`
> - **Producer:** `design-origin-copy`
> - **Consumer:** `fe-origin-copy` (TASK-246) — apply EVERY entry in §4 VERBATIM. No copy beyond this log.
> - **Co-consumer:** `design-menu-redesign` (TASK-245) — must use the §4 copy for the 7 menu pages + 404.
> - **Verifier:** `e2e-origin-validation` (TASK-248) — audits that the §4 copy landed verbatim.

---

## 1. Positioning Convention (applies to every entry below)

| Term | Role | Used in copy as |
|---|---|---|
| **Origin** | The **product** — the organized collaboration space people use | Hero headline, definitions, feature copy, FAQ answers |
| **JoinOrigin** | The **brand / company / network** that builds and runs Origin | Header wordmark, Footer wordmark, 404 wordmark, page titles, metadata brand, README brand |

**One-line positioning (the convention in a sentence):**
> Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a home. JoinOrigin is the brand and the network behind the product.

**Rules applied throughout:**

1. When a sentence describes what the *product does* → use **Origin**.
2. When a sentence refers to the *company, brand, or the people who run it* → use **JoinOrigin**.
3. "Social collaboration network" and "community OS" stay as the **category anchors** (SEO / LLM entity clarity, `sprint-4-discovery.md` §5.1/§6) — but they now describe **Origin**, never "JoinOrigin is a community OS".
4. **Any-idea message:** people create a profile (like a resume), post idea pages, start or join communities — for ANY idea: small business, AI startup, helping the homeless, 10k run, political movement, pee-wee league, etc.
5. **Hosted truth:** Origin is a hosted product — **NOT self-hostable**. What persists is the network graph / connections, which live forever on the open Matrix protocol. Remove every "self-hostable / designed to be self-hosted" claim from user-facing copy.
6. **Privacy & flexibility (messaging only — features later):** anonymous or named accounts; open or organizer-gated communities / chats / idea pages.
7. FAQ answers: first sentence is a direct answer; ≤ 60 words (discovery §8.3). Meta descriptions ≤ 160 chars (discovery §6). No money language anywhere (Sprint 5 rule).

---

## 2. Approved Copy — Verbatim

### 2.1 Home — hero headline (H1, `TypewriterHeading`) — EXACT

```
Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a home
```

- Length: 131 characters. Two-tone split: `SPLIT_INDEX = 127`.
- Body span (block line): `Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a `
- Accent span (gradient, capitalized via existing `text-transform: capitalize`): `home`
- FE note (mechanics, not copy): the typewriter currently types at 35ms/char → 131 chars ≈ 4.6s. Keep the two-tone + caret behavior; recommend `CHAR_DELAY_MS = 20` (≈ 2.6s) to stay snappy. Update the `TypewriterHeading` docstring copy reference (`Where teams find their origin` → new headline).

### 2.2 Home — supporting line (`HeroLeft` `<Supporting>`) — any-idea repositioning

```
Create a profile that works like your resume, post your idea as a page, and start or join a community around anything — a small business, an AI startup, a book club, a 10k run.
```

### 2.3 Home — definition paragraph (`home-view.tsx` `<Definition>`) — community-OS line rewrite

```
Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space. JoinOrigin is the brand and the network behind it.
```

(Keeps the exact phrase "social collaboration network" for the e2e LLM-entity check.)

### 2.4 Home — FAQ (`home-data.ts`)

**Q1 — What is JoinOrigin?**
```
Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space. JoinOrigin is the brand and network behind it. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.
```

**Q2 — How is JoinOrigin different from Discord/LinkedIn/Reddit?**
```
Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. Origin combines them around the social graph — profiles, communities, chat, feed, projects, and opportunities all live together, so relationships turn into real collaboration.
```

**Q3 — What can I do once I am in?**
```
Create a profile that works like a resume, post your idea as an idea page, start or join communities around anything, and invite the people you want to work with. The waitlist reserves your spot so your community is ready when early access opens.
```

**Q4 — When does early access start?** — unchanged.
**Q5 — How do I join?** — unchanged.

### 2.5 Features — `/features` Communities card — EXACT (approved direction)

```
Groups around interests, industries, and goals — Startup Founders, Small Businesses, Book Clubs, Community Organizations, Anyone with an Idea — where members find each other.
```

### 2.6 Features — core objects + intro (`features-view.tsx`, `features-data.ts`)

**Page lead (`<PageLead>`):** add Ideas as the 8th core object:
```
Origin is a social collaboration network built around eight core objects: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.
```

**`CORE_OBJECTS` — Profiles:**
```
A profile works like a living resume: it carries your experience, skills, and ideas — plus your reputation and relationships — across every community and project you join.
```

**`CORE_OBJECTS` — Ideas (NEW card, between Profiles and Communities):**
```
Every idea gets a home. Post an idea page for anything — a small business, an AI startup, helping the homeless, a 10k run, a book club, a pee-wee league — and find the people who want to build it with you.
```

**`CORE_OBJECTS` — Communities:** §2.5 exact string.

**`CORE_OBJECTS` — Communication / Feed / Projects / Companies / Opportunities:** unchanged.

**"Why JoinOrigin instead of five tools" section title:**
```
Why Origin instead of five tools
```

**Section body:**
```
Most platforms solve only one part of collaboration. Origin combines them around the social graph — the relationships between members — so nothing gets lost between tools.
```

**Roadmap — Phase 5 body (drop "Federation", self-host-adjacent):**
```
Open standards and portability so the network connects across platforms, not just inside one silo.
```

**`FEATURES_FAQ` — Q1 — How is JoinOrigin different from Discord?**
```
Discord is a chat app. Origin is a social collaboration network — profiles, ideas, communities, chat, feed, projects, and companies all live on one social graph.
```

**`FEATURES_FAQ` — Q2 — Is JoinOrigin open source?**
```
The code is open under AGPL-3.0, and communication runs on the open Matrix protocol. Origin itself is a hosted product run by JoinOrigin — there is nothing to self-host — and your data stays portable.
```

**`FEATURES_FAQ` — Q3 — What is the social graph?**
```
The social graph is the web of relationships between members. Origin is organized around it, so every profile, community, and project connects through people.
```

**`FEATURES_FAQ` — Q4 — When will projects and companies launch? (approved direction — they develop naturally)**
```
They develop naturally. As people post ideas, visions, and work, they find the people who want to build with them — and projects and companies grow out of those connections instead of waiting for a launch date.
```

### 2.7 Community — any-idea repositioning (`community-view.tsx`, `community-data.ts`)

**Page lead (`<PageLead>`):**
```
Origin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.
```

**`EXAMPLE_COMMUNITIES`:**
```
Startup Founders, Small Businesses, Book Clubs, Community Organizations, Run Clubs, Pee-wee Leagues, Anyone with an Idea
```

**`COMMUNITY_FAQ` — Q1 — What communities can I join?**
```
Anyone can start or join a community around any idea — a small business, an AI startup, helping the homeless, a 10k run, a political movement, a pee-wee league. If it matters to you, it has a place on Origin.
```

**`COMMUNITY_FAQ` — Q2 — Can I start my own community?**
```
Yes. Every member can create a community around any idea and invite the people they want to build with — whether it is a business, a book club, or a run club.
```

**`COMMUNITY_FAQ` — Q3 — Is my data mine?**
```
Yes. You own your identity and your data. Origin is a hosted product, so there is nothing to self-host — but your data is portable and your network graph persists on the open Matrix protocol.
```

**`COMMUNITY_FAQ` — Q4 — How do I find my people?**
```
Browse communities by interest, industry, or goal — from small businesses and book clubs to AI startups and run clubs — then join the ones that match what you want to build. Or start your own for any idea.
```

**`COMMUNITY_FAQ` — Q5 (NEW) — Can I join anonymously or by name? (privacy & flexibility, messaging only)**
```
You choose. You can participate with a named account or stay anonymous, and communities, chats, and idea pages can be open to everyone or gated by organizers. These options roll out over time.
```

### 2.8 Privacy — flexibility messaging (`privacy-view.tsx`) — NEW section "Identity & flexibility"

Insert as a new `<Section>` after "How we use it" and before "Your rights":

**Section title:** `Identity & flexibility`

**Body:**
```
You choose how you show up on Origin. You can participate with a named account or stay anonymous, and communities, chats, and idea pages can be open to everyone or gated by their organizers. These options roll out over time — the point is that you decide what you share and with whom.
```

### 2.9 Docs — NOT self-hostable + Matrix persistence (`docs-data.ts`, `docs-view.tsx`, `docs/page.tsx`)

**Page lead (`<PageLead>`):**
```
Origin is the product: a social collaboration network and community OS. JoinOrigin is the brand and the network behind it. These docs explain the core objects, the roadmap, and the architecture.
```

**`CONCEPTS` — Profiles (resume framing):**
```
Profiles are the portable identity of every member — like a living resume. They carry experience, skills, ideas, reputation, and relationships across every community and project, so who you are travels with you.
```

**`CONCEPTS` — Communities (any-idea):**
```
Communities are groups of people who share interests, industries, goals, and opportunities — around any idea. They are the center of engagement on Origin and the way members find each other.
```

**`CONCEPTS` — Ideas (NEW entry, after Communities):**
```
Ideas are the starting point of everything on Origin. Post an idea page for any idea — a small business, an AI startup, a book club, a 10k run — and the people who want to build it find you.
```

**`CONCEPTS` — Communication / Feed / Projects / Companies / Opportunities:** unchanged.

**Architecture & standards — paragraph 1:**
```
The social graph is the product: every object hangs off the network of people and their relationships. Communication uses the open Matrix protocol (decentralized, E2EE), and your network graph and connections persist forever, so your relationships stay portable.
```

**Architecture & standards — paragraph 2 (hosted truth):**
```
Origin is a hosted product built with React, TypeScript, and Next.js on the web, and NestJS, PostgreSQL, Redis, and Docker in the backend. What stays open is the protocol (Matrix), your data, and the source code under AGPL-3.0 — there is nothing to self-host.
```

**Roadmap — Phase 5 body (drop "Federation"):**
```
Open standards and portability so the network connects across platforms. Success metric: a portable, interoperable social graph.
```

**`DOCS_FAQ` — Q2 — What is Matrix? (persistence):**
```
Matrix is an open, decentralized communication protocol with end-to-end encryption. Origin runs on it, so conversations — and the network graph behind them — are portable and persist forever.
```

**`DOCS_FAQ` — Q3 — Is JoinOrigin self-hostable? (NOT self-hostable):**
```
No. Origin is a hosted product run by JoinOrigin, so there is nothing to self-host. Your network graph and connections persist forever via the open Matrix protocol, and your data stays portable.
```

**`DOCS_FAQ` — Q1 (What is JoinOrigin built on?) and Q4 (When is the MVP launching?):** unchanged.

### 2.10 Footer — grammar fix (`Footer.tsx`) — EXACT

**Old:** `Where teams finds their origin`
**New:** `Where teams find their origin`

### 2.11 About — brand + hosted truth (`about-view.tsx`)

**Page lead:**
```
Origin is a social collaboration network built on one belief: the most valuable asset on the internet is not content or software — it is the network of people and the relationships they form.
```

**Our mission — paragraph 1:**
```
Origin is building the operating system for human collaboration. Instead of five separate tools for chat, communities, and projects, your relationships live in one calm workspace. The social graph is the product: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities all hang off the same network of people.
```

**Our mission — paragraph 2:** unchanged.

**`PRINCIPLES` — Open Architecture:**
```
Communication runs on the open Matrix protocol, and identity, profiles, communities, and the social graph are portable and user-owned. Origin is hosted, so there is nothing to self-host.
```

**FAQ — What is JoinOrigin?**
```
Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space. JoinOrigin is the brand and network behind it.
```

**FAQ — Is JoinOrigin open source?**
```
The code is open under AGPL-3.0, and communication runs on the open Matrix protocol. Origin is a hosted product run by JoinOrigin — there is nothing to self-host — and your network graph stays portable. See the docs for details.
```

### 2.12 Contact — lead (`contact-view.tsx`)

**`<PageLead>`:**
```
Have a question about Origin — the social collaboration network — early access, or starting a community? We'd love to hear from you.
```

(FAQ blocks unchanged.)

### 2.13 SEO / metadata / llms.txt

**`SITE.description` (`lib/seo/site.ts`):**
```
Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space.
```

**`ROUTES` (`lib/seo/routes.ts`):**

- `/` description:
```
Origin is a social collaboration network where people post ideas, form communities, and build projects together. Join 2,400+ builders on the waitlist.
```
- `/features` description:
```
Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — the social collaboration network for real outcomes.
```
- `/community` description:
```
Join 2,400+ builders on Origin's social collaboration network. Start or join a community around any idea — a small business, AI startup, book club, or run club.
```
- `/docs` description:
```
Learn how Origin works: profiles, ideas, communities, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.
```
- `/about` description:
```
Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.
```
- `/contact`, `/privacy`, `/terms` descriptions: **unchanged**.
- Titles: **unchanged** (SEO anchor titles stay; "JoinOrigin — Social Collaboration Network & Community OS" remains the home title).

**Per-page metadata descriptions (`page.tsx` server wrappers):**

- `features/page.tsx`:
```
Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.
```
- `community/page.tsx`:
```
Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.
```
- `docs/page.tsx`:
```
Learn how Origin works: profiles, ideas, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.
```
- `about/page.tsx`:
```
Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.
```
- `contact/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`: **unchanged**.
- Home `page.tsx` description: uses `SITE.description` (updated automatically).

**`LLMS_ENTRIES` + summary (`lib/seo/llms.ts`):**

- Overview `/` description: `What Origin is and how to join the waitlist.`
- `/features` description: `Core objects — profiles, ideas, communities, chat, feed, projects, companies, opportunities.`
- `/about` description: `Mission and principles — "the operating system for human collaboration".` (unchanged)
- Summary blockquote:
```
> Origin is a social collaboration network — a community OS where people
> discover each other, post ideas, form communities, and build projects
> together. It combines profiles, ideas, communities, chat, feed, projects,
> companies, and opportunities in one platform built around the social graph.
```
- Key facts (replace the three bullets that mention self-hosting / "owned by JoinOrigin"):
```
- Origin is not a chat app, project manager, or social feed — it is a
  relationship network that enables collaboration.
- The platform is organized around Communities (Startup Founders, Small
  Businesses, Book Clubs, Community Organizations, Anyone with an Idea).
- Communication runs on the open Matrix protocol; Origin is a hosted product
  (nothing to self-host), and the network graph and connections persist
  forever via Matrix.
- Currently in early access; join via the waitlist.
```

### 2.14 Root README (`README.md`)

**Subtitle (line 7):**
```
### Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space. JoinOrigin is the brand and the network behind the product.
```

**"What is JoinOrigin?" intro (lines 38–41):**
```
Origin is a **social collaboration network** — the community OS where your
ideas, projects, and communities come together in one organized space. Instead
of juggling five separate tools, your relationships live in one place, so nothing
gets lost between them.
```

**Platform table + following paragraph (lines 47–57):**
```
Origin combines these ideas into a single platform focused on turning
relationships into **real-world outcomes** — communities, projects, companies,
and opportunities.
```

**Promise block (lines 59–62):**
```
> 💡 **The Origin promise:** you don't have to fit your idea into a chat app or
> a feed. Create a profile that works like your resume, post your idea as an
> idea page, and start or join a community around anything — a small business,
> an AI startup, a book club, a 10k run — all connected through one social graph.
```

**"The JoinOrigin approach" table — two rows (lines 88–89):**
```
| 🔓 **Ownership and sovereignty** | Your identity, relationships, communities, and data are yours. The architecture is open and your network graph persists via Matrix. |
| 🌐 **Open by default** | Communication runs on the open Matrix protocol, and the network graph and connections persist forever via Matrix. Origin is a hosted product — there is nothing to self-host. |
```

**Paragraph after the approach table (lines 91–93):**
```
Origin is organized around the **social graph** — the web of relationships
between members. Every profile, idea, community, and project connects through
people, so your network becomes your operating system for collaboration.
```

**Feature highlights (lines 99–110):**
```
- **👤 User Profiles** — a person's identity, experience, interests, skills, reputation, and contributions, like a living resume.
- **💡 Ideas** — post an idea page for anything — a small business, an AI startup, a book club, a 10k run — and find the people who want to build it.
- **🏘️ Communities** — groups organized around interests, industries, goals, locations, or missions. Startup Founders, Small Businesses, Book Clubs, Community Organizations, Anyone with an Idea — or start your own.
- **💬 Communication** — real-time chat, direct messaging, group discussions, and community conversations, built on the open Matrix protocol.
- **📰 Feed** — a feed that surfaces the people and projects that matter to you, driven by your relationships.
- **📦 Projects** — start a project, invite collaborators, and turn conversations into shared work (Phase 2 — Collaboration).
- **🏢 Companies** — organize teams and ventures that grow out of your communities (Phase 3 — Organization).
- **🔑 Data sovereignty** — your identity and data are portable, and your network graph and connections persist forever via the open Matrix protocol.
- **📲 Cross-platform** — a Next.js web app and a React Native Android app share the same design system and UI components.
```

**"Where we are" note (lines 108–110):**
```
> 📍 **Where we are:** the web homescreen, waitlist onboarding, and community
> pages are live. Projects and companies develop naturally through the
> connections people make as they post ideas, visions, and work — the roadmap
> ships the tools that make that easier over time.
```

**License section (after the "Why AGPL-3.0?" blockquote, lines 315–321):**
```
> **Hosted product:** Origin is a hosted product — the source code is open under
> AGPL-3.0, but the service is run by JoinOrigin and is not self-hostable. Your
> network graph and connections persist forever via the open Matrix protocol.
```

---

## 3. Copy Principles That Never Change

- **No money language** anywhere (Sprint 5 rule — Facebook approach).
- **No "self-hostable"** claims in any user-facing copy (Sprint 8 rule — Origin is hosted).
- Home page must always contain the exact phrase **"social collaboration network"** in the visible definition paragraph (e2e LLM-entity check).
- FAQ answers ≤ 60 words; meta descriptions ≤ 160 chars.
- Titles, H1s on menu pages, nav labels, waitlist modal copy, `LogoMarquee`, `OrbitViz`, `not-found` copy: **NOT in scope** — unchanged unless listed above.

---

## 4. Per-File Copy Table (apply list for `fe-origin-copy`)

> Apply each row VERBATIM. "Old copy" is the current source text; "New copy" is the replacement. Unchanged files are not listed.

### 4.1 `apps/web/components/TypewriterHeading.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | `const FULL_TEXT = 'Where teams find their origin';` | `const FULL_TEXT = 'Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a home';` |
| 2 | `const SPLIT_INDEX = 23;` | `const SPLIT_INDEX = 127;` |
| 3 | Docstring: `Copy: \`Where teams find their origin\` — the first 23 characters … the remainder (\`origin\`)` | Docstring: `Copy: \`Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a home\` — first 127 characters as block line, remainder (\`home\`) in accent gradient` |
| 4 | (recommendation, mechanics) `const CHAR_DELAY_MS = 35;` | (optional, mechanics) `const CHAR_DELAY_MS = 20;` — 131 chars at 35ms ≈ 4.6s; 20ms ≈ 2.6s. Keep the caret + reduced-motion behavior. |

### 4.2 `apps/web/components/HeroLeft.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | `JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.` | `Create a profile that works like your resume, post your idea as a page, and start or join a community around anything — a small business, an AI startup, a book club, a 10k run.` |

### 4.3 `apps/web/components/Footer.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | `<Tagline>Where teams finds their origin</Tagline>` | `<Tagline>Where teams find their origin</Tagline>` |

### 4.4 `apps/web/app/home-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | `<Definition>\n JoinOrigin is a social collaboration network — a community OS that brings your\n people, communities, projects, and conversations into one calm workspace.\n</Definition>` | `<Definition>\n Origin is a social collaboration network — the community OS where your ideas,\n projects, and communities come together in one organized space. JoinOrigin is\n the brand and the network behind it.\n</Definition>` |

### 4.5 `apps/web/app/home-data.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | Q1 answer: `JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.` | `Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space. JoinOrigin is the brand and network behind it. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.` |
| 2 | Q2 answer: `Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. JoinOrigin combines them around the social graph — profiles, communities, chat, feed, projects, and opportunities all live together, so relationships turn into real collaboration.` | `Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. Origin combines them around the social graph — profiles, communities, chat, feed, projects, and opportunities all live together, so relationships turn into real collaboration.` |
| 3 | Q3 answer: `Build your profile, join communities around your interests, start projects, and invite the people you want to work with. The waitlist reserves your spot so your community is ready when early access opens.` | `Create a profile that works like a resume, post your idea as an idea page, start or join communities around anything, and invite the people you want to work with. The waitlist reserves your spot so your community is ready when early access opens.` |
| 4 | Q4, Q5 answers | unchanged |

### 4.6 `apps/web/app/features/features-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | PageLead: `JoinOrigin is a social collaboration network built around seven core objects: profiles, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.` | `Origin is a social collaboration network built around eight core objects: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities. Instead of five separate tools, your relationships live in one place.` |
| 2 | Profiles body: `Every member has a portable identity that carries their reputation and relationships across communities, projects, and companies.` | `A profile works like a living resume: it carries your experience, skills, and ideas — plus your reputation and relationships — across every community and project you join.` |
| 3 | (NEW card — add `{ title: 'Ideas', body: ... }` between Profiles and Communities) | `{ title: 'Ideas', body: 'Every idea gets a home. Post an idea page for anything — a small business, an AI startup, helping the homeless, a 10k run, a book club, a pee-wee league — and find the people who want to build it with you.' }` |
| 4 | Communities body: `Groups around interests, industries, and goals — AI Builders, Startup Founders, Quant Trading, Real Estate, Local — where members find each other.` | `Groups around interests, industries, and goals — Startup Founders, Small Businesses, Book Clubs, Community Organizations, Anyone with an Idea — where members find each other.` |
| 5 | Section title: `Why JoinOrigin instead of five tools` | `Why Origin instead of five tools` |
| 6 | Section body: `Most platforms solve only one part of collaboration. JoinOrigin combines them around the social graph — the relationships between members — so nothing gets lost between tools.` | `Most platforms solve only one part of collaboration. Origin combines them around the social graph — the relationships between members — so nothing gets lost between tools.` |
| 7 | Roadmap Phase 5 body: `Federation and open standards so the network connects across platforms, not just inside one silo.` | `Open standards and portability so the network connects across platforms, not just inside one silo.` |

### 4.7 `apps/web/app/features/features-data.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | Q1 answer: `Discord is a chat app. JoinOrigin is a social collaboration network — profiles, communities, chat, feed, projects, and companies all live on one social graph.` | `Discord is a chat app. Origin is a social collaboration network — profiles, ideas, communities, chat, feed, projects, and companies all live on one social graph.` |
| 2 | Q2 answer: `The architecture is open. Communication runs on the open Matrix protocol, and the platform is designed to be self-hostable.` | `The code is open under AGPL-3.0, and communication runs on the open Matrix protocol. Origin itself is a hosted product run by JoinOrigin — there is nothing to self-host — and your data stays portable.` |
| 3 | Q3 answer: `The social graph is the web of relationships between members. JoinOrigin is organized around it, so every profile, community, and project connects through people.` | `The social graph is the web of relationships between members. Origin is organized around it, so every profile, community, and project connects through people.` |
| 4 | Q4 answer: `Projects arrive in Phase 2 (Collaboration) and companies in Phase 3 (Organization) of the roadmap. Early access members get the full roadmap as it ships.` | `They develop naturally. As people post ideas, visions, and work, they find the people who want to build with them — and projects and companies grow out of those connections instead of waiting for a launch date.` |

### 4.8 `apps/web/app/community/community-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | PageLead: `JoinOrigin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.` | `Origin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.` |
| 2 | `EXAMPLE_COMMUNITIES`: `['AI Builders', 'Startup Founders', 'Quant Trading', 'Real Estate', 'Local Communities', 'Digital Nomads', 'Open Source Developers']` | `['Startup Founders', 'Small Businesses', 'Book Clubs', 'Community Organizations', 'Run Clubs', 'Pee-wee Leagues', 'Anyone with an Idea']` |

### 4.9 `apps/web/app/community/community-data.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | Q1 answer: `JoinOrigin has communities around AI, startups, trading, real estate, and local interests — and you can start your own for any shared goal.` | `Anyone can start or join a community around any idea — a small business, an AI startup, helping the homeless, a 10k run, a political movement, a pee-wee league. If it matters to you, it has a place on Origin.` |
| 2 | Q2 answer: `Yes. Every member can create a community around an interest, industry, or goal and invite the people they want to build with.` | `Yes. Every member can create a community around any idea and invite the people they want to build with — whether it is a business, a book club, or a run club.` |
| 3 | Q3 answer: `Yes. Ownership and sovereignty are core principles: your identity and data are portable, and the architecture is open and self-hostable.` | `Yes. You own your identity and your data. Origin is a hosted product, so there is nothing to self-host — but your data is portable and your network graph persists on the open Matrix protocol.` |
| 4 | Q4 answer: `Browse communities by interest, industry, or goal — AI, startups, trading, real estate, and local groups — then join the ones that match what you want to build.` | `Browse communities by interest, industry, or goal — from small businesses and book clubs to AI startups and run clubs — then join the ones that match what you want to build. Or start your own for any idea.` |
| 5 | (NEW FAQ entry — add Q5) | `{ question: 'Can I join anonymously or by name?', answer: 'You choose. You can participate with a named account or stay anonymous, and communities, chats, and idea pages can be open to everyone or gated by organizers. These options roll out over time.' }` |

### 4.10 `apps/web/app/docs/docs-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | PageLead: `JoinOrigin is a social collaboration network — an operating system for human collaboration. These docs explain the core objects, the roadmap, and the architecture behind the platform.` | `Origin is the product: a social collaboration network and community OS. JoinOrigin is the brand and the network behind it. These docs explain the core objects, the roadmap, and the architecture.` |
| 2 | Profiles concept: `Profiles are the portable identity of every member. They carry reputation and relationships across communities, projects, and companies, so who you are travels with you.` | `Profiles are the portable identity of every member — like a living resume. They carry experience, skills, ideas, reputation, and relationships across every community and project, so who you are travels with you.` |
| 3 | Communities concept: `Communities are groups of people who share interests, industries, goals, and opportunities. They are the center of engagement on JoinOrigin and the way members find each other.` | `Communities are groups of people who share interests, industries, goals, and opportunities — around any idea. They are the center of engagement on Origin and the way members find each other.` |
| 4 | (NEW concept entry — add `{ title: 'Ideas', body: ... }` after Communities) | `{ title: 'Ideas', body: 'Ideas are the starting point of everything on Origin. Post an idea page for any idea — a small business, an AI startup, a book club, a 10k run — and the people who want to build it find you.' }` |
| 5 | Architecture ¶1: `The social graph is the product: every object hangs off the network of people and their relationships. Communication uses the open Matrix protocol (decentralized, E2EE), and identity is portable so members own their data.` | `The social graph is the product: every object hangs off the network of people and their relationships. Communication uses the open Matrix protocol (decentralized, E2EE), and your network graph and connections persist forever, so your relationships stay portable.` |
| 6 | Architecture ¶2: `The platform is built with React, TypeScript, and Next.js on the web, NestJS, PostgreSQL, Redis, and Docker in the backend — with open architecture as a first-class principle.` | `Origin is a hosted product built with React, TypeScript, and Next.js on the web, and NestJS, PostgreSQL, Redis, and Docker in the backend. What stays open is the protocol (Matrix), your data, and the source code under AGPL-3.0 — there is nothing to self-host.` |
| 7 | Roadmap Phase 5 body: `Federation and open standards so the network connects across platforms. Success metric: a portable, interoperable social graph.` | `Open standards and portability so the network connects across platforms. Success metric: a portable, interoperable social graph.` |

### 4.11 `apps/web/app/docs/docs-data.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | Q2 answer: `Matrix is an open, decentralized communication protocol with end-to-end encryption. JoinOrigin uses it so conversations are portable and interoperable.` | `Matrix is an open, decentralized communication protocol with end-to-end encryption. Origin runs on it, so conversations — and the network graph behind them — are portable and persist forever.` |
| 2 | Q3 question: `Is JoinOrigin self-hostable?` — keep question; answer: `Yes. The architecture is open and the platform is designed so communities and organizations can self-host or federate.` | Question kept: `Is JoinOrigin self-hostable?`; answer: `No. Origin is a hosted product run by JoinOrigin, so there is nothing to self-host. Your network graph and connections persist forever via the open Matrix protocol, and your data stays portable.` |

### 4.12 `apps/web/app/docs/page.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | metadata description: `Learn how JoinOrigin works: profiles, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.` | `Learn how Origin works: profiles, ideas, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.` |
| 2 | metadata keywords — add `'Origin docs'` (optional) | keep existing keywords + add `'Origin docs'` |

### 4.13 `apps/web/app/about/about-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | PageLead: `JoinOrigin is a social collaboration network built on one belief: the most valuable asset on the internet is not content or software — it is the network of people and the relationships they form.` | `Origin is a social collaboration network built on one belief: the most valuable asset on the internet is not content or software — it is the network of people and the relationships they form.` |
| 2 | Mission ¶1: `JoinOrigin is building the operating system for human collaboration. Instead of five separate tools for chat, communities, projects, and companies, your relationships live in one calm workspace. The social graph is the product: profiles, communities, conversations, posts, projects, companies, and opportunities all hang off the same network of people.` | `Origin is building the operating system for human collaboration. Instead of five separate tools for chat, communities, and projects, your relationships live in one calm workspace. The social graph is the product: profiles, ideas, communities, conversations, posts, projects, companies, and opportunities all hang off the same network of people.` |
| 3 | PRINCIPLES — Open Architecture: `Communication runs on the open Matrix protocol, and identity, profiles, communities, and the social graph are portable and user-owned.` | `Communication runs on the open Matrix protocol, and identity, profiles, communities, and the social graph are portable and user-owned. Origin is hosted, so there is nothing to self-host.` |
| 4 | FAQ — What is JoinOrigin? answer: `JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace.` | `Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space. JoinOrigin is the brand and network behind it.` |
| 5 | FAQ — Is JoinOrigin open source? answer: `The architecture is open: communication runs on the open Matrix protocol, and the platform is designed to be self-hostable. See the docs for details.` | `The code is open under AGPL-3.0, and communication runs on the open Matrix protocol. Origin is a hosted product run by JoinOrigin — there is nothing to self-host — and your network graph stays portable. See the docs for details.` |

### 4.14 `apps/web/app/about/page.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | metadata description: `JoinOrigin's mission: a social collaboration network where people form communities and start projects together. The network is the product.` | `Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.` |

### 4.15 `apps/web/app/contact/contact-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | PageLead: `Have a question about the social collaboration network, early access, or starting a community on JoinOrigin? We'd love to hear from you.` | `Have a question about Origin — the social collaboration network — early access, or starting a community? We'd love to hear from you.` |

### 4.16 `apps/web/app/privacy/privacy-view.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | (NEW `<Section>` between "How we use it" and "Your rights") | `<SectionTitle>Identity &amp; flexibility</SectionTitle>` + `<BodyCopy>You choose how you show up on Origin. You can participate with a named account or stay anonymous, and communities, chats, and idea pages can be open to everyone or gated by their organizers. These options roll out over time — the point is that you decide what you share and with whom.</BodyCopy>` |

### 4.17 `apps/web/lib/seo/site.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | `description: 'JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace.'` | `description: 'Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space.'` |

### 4.18 `apps/web/lib/seo/routes.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | `/` description: `JoinOrigin is a social collaboration network where people discover each other, form communities, start projects, and build companies together. Join 2,400+ builders on the waitlist.` | `Origin is a social collaboration network where people post ideas, form communities, and build projects together. Join 2,400+ builders on the waitlist.` |
| 2 | `/features` description: `Explore JoinOrigin's features: communities, real-time chat, feed, projects, companies, and opportunities — the social collaboration network built to turn relationships into outcomes.` | `Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — the social collaboration network for real outcomes.` |
| 3 | `/community` description: `Join a growing social collaboration network of 2,400+ builders. Discover communities around AI, startups, trading, real estate, and local interests.` | `Join 2,400+ builders on Origin's social collaboration network. Start or join a community around any idea — a small business, AI startup, book club, or run club.` |
| 4 | `/docs` description: `Learn how JoinOrigin works: profiles, communities, chat, feed, projects, companies, and opportunities. Explore the roadmap, tech stack, and open standards.` | `Learn how Origin works: profiles, ideas, communities, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.` |
| 5 | `/about` description: `JoinOrigin's mission: a social collaboration network where people discover each other, form communities, and build projects and companies together.` | `Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.` |
| 6 | `/contact`, `/privacy`, `/terms` descriptions + all titles | unchanged |

### 4.19 `apps/web/lib/seo/llms.ts`

| # | Old copy | New copy |
|---|---|---|
| 1 | Overview `/` description: `What JoinOrigin is and how to join the waitlist.` | `What Origin is and how to join the waitlist.` |
| 2 | `/features` description: `Core objects — profiles, communities, chat, feed, projects, companies, opportunities.` | `Core objects — profiles, ideas, communities, chat, feed, projects, companies, opportunities.` |
| 3 | Summary blockquote lines 78–81 | See §2.13 blockquote (Origin-first, ideas included). |
| 4 | Key facts lines 85–91 (replace bullets 2 and 3) | See §2.13 key facts (Startup Founders/Small Businesses/Book Clubs/…; hosted, nothing to self-host, network graph persists forever via Matrix). |

### 4.20 `apps/web/app/features/page.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | metadata description: `Explore JoinOrigin's features: communities, chat, feed, projects, and opportunities — a social collaboration network built for real outcomes.` | `Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.` |

### 4.21 `apps/web/app/community/page.tsx`

| # | Old copy | New copy |
|---|---|---|
| 1 | metadata description: `Join a growing social collaboration network of 2,400+ builders. Discover communities around AI, startups, and local interests — build together.` | `Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.` |

### 4.22 Root `README.md`

| # | Old copy | New copy |
|---|---|---|
| 1 | Subtitle (line 7) | See §2.14 subtitle. |
| 2 | "What is JoinOrigin?" intro (lines 38–41) | See §2.14 intro. |
| 3 | Table + following paragraph (lines 47–57) | `Origin combines these ideas into a single platform …` (see §2.14). |
| 4 | Promise block (lines 59–62) | See §2.14 promise block. |
| 5 | Approach table rows (lines 88–89) | See §2.14 approach rows (remove "self-hostable"). |
| 6 | Paragraph after approach table (lines 91–93) | See §2.14 paragraph (add "idea"). |
| 7 | Feature highlights (lines 99–110) | See §2.14 highlights (Profiles + resume, new Ideas bullet, Communities list, Data sovereignty). |
| 8 | "Where we are" note (lines 108–110) | See §2.14 "Where we are". |
| 9 | License section (lines 315–321) | Add hosted-product blockquote (see §2.14 License). |

---

## 5. Required Test Updates (flagged for `fe-origin-copy`)

The following tests assert the OLD copy and WILL FAIL until updated to the §4 strings:

### Unit tests (`apps/web`)

| File | Assertion that must change |
|---|---|
| `apps/web/components/TypewriterHeading.test.tsx` | FULL_TEXT refs → new headline; body span `'Where teams find their '` → first 127 chars; accent `'origin'` → `'home'`; the "clears and re-types" length compare → `131`; timer advance `2000` → `6000` if `CHAR_DELAY_MS` stays `35` (or `3000` if set to `20`). |
| `apps/web/app/page.test.tsx` | supporting copy exact string → §2.2; definition paragraph exact string → §2.3; footer `'Where teams finds their origin'` → `'Where teams find their origin'`; metadata assertions unchanged (title/description still contain "social collaboration network"). |
| `apps/web/app/features/page.test.tsx` | regex `/built around seven core objects: profiles, communities/i` → `eight core objects: profiles, ideas, communities`; FAQ length 4 stays 4; FAQ Q1 unchanged. |
| `apps/web/app/community/page.test.tsx` | `expect(screen.getByText('AI Builders'))` → e.g. `'Book Clubs'`; FAQ `toHaveLength(4)` → `toHaveLength(5)` (new Q5). |
| `apps/web/app/docs/page.test.tsx` | concept list → add `'Ideas'`; regex `/an operating system for human collaboration/i` → new PageLead (e.g. `/the product: a social collaboration network and community OS/i`); FAQ `toHaveLength(4)` stays 4. |
| `apps/web/app/about/page.test.tsx` | no exact-string breaks expected (regex `the most valuable asset on the internet is not content or software` still matches; FAQ "What is JoinOrigin?" text not asserted by exact string). Verify after apply. |
| `apps/web/app/contact/page.test.tsx` | no breaks expected (PageLead not asserted by exact string). Verify after apply. |
| `apps/web/app/privacy/page.test.tsx` | no breaks expected; consider asserting the new `Identity & flexibility` section title. |

### E2E tests (`tests/e2e`)

| File | Assertion that must change |
|---|---|
| `tests/e2e/tests/home.spec.ts` | h1 `'Where teams find their origin'` → new headline; footer `'Where teams finds their origin'` → `'Where teams find their origin'`. |
| `tests/e2e/tests/hero.spec.ts` | `FULL_TEXT` → new headline; accent `.toContain('origin')` → `.toContain('home')`; supporting regex `/JoinOrigin brings your community/` → `/Create a profile that works like your resume/`. |
| `tests/e2e/tests/pages.spec.ts` | `MENU_PAGES` `{ path: '/', h1: 'Where teams find their origin' }` → new headline (h1 text is the full 131-char string). |
| `tests/e2e/tests/seo.spec.ts` | no breaks expected (titles unchanged; descriptions still contain brand or "social collaboration network"; ≤160 chars verified in §2.13). Verify after apply. |

---

## 6. LICENSE Flag — DECISION

**Flag:** LICENSE update — **NO LICENSE FILE TEXT CHANGE REQUIRED.**

**Reasoning:** AGPL-3.0 is specifically the network-service copyleft license (modifications must be shared even when the software is run as a hosted service), so it remains the **correct** license for a hosted, non-self-hostable product like Origin. The only "AGPL vs self-host" ambiguity came from copy claiming the platform "is designed to be self-hostable" — that copy is removed by this log (§4.10, §4.11, §4.13, §4.22).

**FE action:** do **NOT** edit `LICENSE` (root) or `app/LICENSE`. Instead, add the hosted-product clarifying sentence in the root README License section (§2.14 / §4.22 row 9).

**Optional reviewer follow-up:** if the reviewer prefers a license file-level note, add a short header comment to `LICENSE` clarifying "JoinOrigin is a hosted product — source is open under AGPL-3.0; the service is run by JoinOrigin and is not self-hostable." This is flagged, not required.

---

## 7. Out of Scope / Follow-ups

1. **`app/docs/design/README.md` index** — not updated (role boundary: no README edits). Reviewer follow-up: add `sprint-8-origin-copy.md` row to the design-doc index.
2. **Historical design docs** (`sprint-3-homescreen-spec.md`, `sprint-4-discovery.md`, `sprint-4-seo-arch.md`, `sprint-4-*`) — intentionally untouched (Sprint 5 rule: records of past decisions).
3. **`apps/mobile`** (`HomeScreen.tsx` "Welcome to JoinOrigin") — brand-level copy, unchanged; out of FE-origin-copy scope (web only).
4. **`app/docs/ORIGIN-WHITEPAPER.md`** — no self-host claim found; optional future pass, not in this log.
5. **Page titles / nav labels / H1s (except home hero) / waitlist modal / `LogoMarquee` / `OrbitViz` / 404 copy** — unchanged.
6. **`app/README.md`** (internal monorepo dev guide) — no product copy; unchanged.

---

## 8. Approval Notes

- Hero headline is the **exact** approved string (§2.1) — do not alter punctuation, the em dash, or word order.
- `/features` Communities card is the **exact** approved string (§2.5) — do not alter.
- Footer grammar fix is the **exact** approved string (§2.10).
- FAQ "When will projects and companies launch?" follows the approved direction: projects/companies develop naturally through connections as people post ideas/visions/work (§2.6 Q4).
- Privacy & flexibility copy is **messaging only** — explicitly says options "roll out over time" (§2.8, §2.7 Q5). Do not imply the features exist today.
- `/docs` states Origin is **NOT self-hostable** and that the network graph / connections **persist forever via Matrix** (§2.9).
- Every §4 row was author-verified against the current source at commit `0ca0510` (master HEAD).
