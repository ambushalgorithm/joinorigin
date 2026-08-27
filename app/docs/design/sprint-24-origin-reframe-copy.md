# Sprint 24 — Origin Repositioning: EN Copy Deck (TASK-564)

- **Role**: research-origin-copy — psychology / marketing / PR specialist
- **Date**: 2026-08-27
- **Deliverable**: Design/review doc ONLY — the full proposed EN copy deck for **PM review**.
  Wave 2 (i18n → fe → e2e) starts only after EN approval. **No implementation files edited.**
- **Consumed**: `packages/i18n/locales/en.json` (verbatim current values), `app/docs/design/sprint-24-gap-analysis.md`,
  `app/docs/design/sprint-24-validation-report.md`, `apps/web/lib/seo/site.ts`, `apps/web/lib/seo/routes.ts`,
  page wrappers (`app/page.tsx`, `features/page.tsx`, `community/page.tsx`, `docs/page.tsx`, `glossary/page.tsx`,
  `signup/page.tsx`), and view/key-usage evidence (`home-view.tsx`, `features-view.tsx`, `community-view.tsx`,
  `docs-view.tsx`, `glossary-hub-view.tsx`, `CtaBand.tsx`, `TaglineStrip.tsx`, `TypewriterHeading.tsx`).
- **Status**: Proposed copy — every string below carries a 1–2 line psychology/marketing/PR rationale.

---

## 0. Positioning frame (why this copy works)

The product philosophy (verbatim): **"JoinOrigin takes something someone wants to happen, identifies
what is needed to make it happen, and connects the people and resources necessary to move it forward."**

**Core noun = Origin** — *the space you start around a goal where you gather people and resources.*
Lifecycle: intent → Origin → need/offer → matching → proposal → discussion → terms → participation →
work/contribution → milestone → reputation → next match. Two acquisition loops:
"I need something → create an Origin → find people" and "I can help → create an offer → find Origins."

**The visitor promise we must make them feel:** *"If I have an idea, a startup, an organization, a small
business, a project — JoinOrigin is where I create an account to build my connections, my network, my
supporters, my community; find co-founders, partners, clients."*

Why "Origin" converts (psychology/marketing/PR):
- **Concrete > abstract.** "Community" is a fuzzy relationship noun; "Origin" is a concrete, startable
  thing ("start an Origin") with a place metaphor ("your Origin", "at Origin"). Concrete nouns are easier
  to simulate mentally, which raises self-efficacy and intent.
- **Possession.** "Your Origin" gives the visitor agency and ownership — a commitment hook before signup.
- **The two loops, made legible.** Every lead now names the action ("start an Origin") and the payoff
  ("find the people and resources to move it forward") — matching the founder's philosophy 1:1.
- **Message discipline.** One product noun, one brand noun (Origin = product; JoinOrigin = brand/network).
  Repeating the same noun across every surface is how positioning becomes memory (mere-exposure + category
  fluency).

Hard constraints honored: "community" is dropped from marketing **leads** (hero, definition, FAQ leads,
features lead, CTA band) and retained only where it genuinely fits (the `/community` page destination,
glossary definitions, the core-object naming decision, group-type example labels). CTA label stays
**Get Started**. No AI copy. No new UI bands. "Everything works" framing. Roadmap phase renamed
**Origin Foundation**. Location/SEO pages untouched.

---

## 1. Homepage hero

### 1.1 `home.hero.headline` + `home.hero.headlineAccent`

| | String |
|---|---|
| Current `home.hero.headline` | `Ideas, projects and community collaboration space — where new and existing teams find their Origin.` |
| Proposed | `Where every idea, startup, and project finds the people and resources to move it forward — Origin.` |
| Current `home.hero.headlineAccent` | `Origin.` |
| Proposed | `Origin.` **(unchanged — the two-tone accent keeps working)** |

Rationale:
- **Marketing (clarity):** fixes the G-6 "noun pile-up" with one promise clause: subject ("every idea,
  startup, and project") + value prop ("finds the people and resources") + outcome ("to move it forward").
  The founder philosophy appears almost verbatim, so the first sentence a visitor reads *is* the product.
- **Psychology:** "move it forward" names the goal-gradient the visitor already has (progress, not
  belonging); ending on the brand noun makes Origin the *destination* of that progress.
- **Brand/PR:** the last occurrence of "Origin" is the final token, so the TypewriterHeading two-tone
  accent (TASK-563 brand-token split) highlights exactly "Origin." — brand as payoff word. No overclaim:
  the promise matches what the product does.

### 1.2 `home.hero.supporting`

| | String |
|---|---|
| Current | `Create a profile that works like your resume, post your idea as a page, and start or join a community around anything — a brand-new idea, an existing small business, an AI startup, a book club, or a 10k run.` |
| Proposed | `Create a profile that works like your resume, post your idea as a page, and start an Origin around anything — an idea, a small business, an AI startup, a book club, or a 10k run. Then invite the people who'll move it forward with you.` |

Rationale:
- **Psychology:** teaches the new noun by doing ("start an Origin"); concrete, low-stakes examples
  (book club, 10k run) lower perceived risk and raise self-efficacy.
- **Marketing:** the second sentence quietly seeds the network promise (co-founders/partners/supporters)
  without adding a new section — the mandate to weave the promise into existing copy.
- **PR:** everything-works framing preserved (no waitlist/roadmap language on this surface).

### 1.3 Unchanged hero strings (cited for completeness — no change proposed)

- `home.hero.startProject` = `Get Started` — **kept** (constraint b: CTA label stays "Get Started").
- `home.hero.trustCopy` = `Join 2,400+ builders already collaborating` — **kept** (social proof; the
  count + verb are honest per G-18 and the SSR count-up fix TASK-558 already renders 2,400+ statically).

---

## 2. Home definition paragraph

| | String |
|---|---|
| Current `home.definition` | `Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space. JoinOrigin is the brand and the network behind it.` |
| Proposed | `Origin is the space you start around a goal — an idea, a startup, a small business, or a project. Bring the people and resources it needs, and move it forward together: co-founders, partners, clients, supporters, and your network. JoinOrigin is the brand and the network behind it.` |

Rationale:
- **Marketing:** defines the core noun in one sentence ("the space you start around a goal") and
  immediately lists the visitor's identity roles (idea/startup/small business/project) — the exact
  promise the PM wants felt at first contact.
- **Psychology:** role-listing triggers identity and aspiration ("that's me"); "your network" +
  ownership words increase commitment.
- **PR:** keeps the naming rule (Origin product / JoinOrigin brand+network) — message discipline.
  No "community" in this lead (constraint a).

---

## 3. Home FAQ (q1–q5, Origin-first)

### 3.1 `home.faq.q1` — "What is JoinOrigin?"

| | String |
|---|---|
| Current `answer` | `Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space. JoinOrigin is the brand and network behind it. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.` |
| Proposed | `Origin is the space you start around a goal. You bring the idea, gather the people and resources it needs, and move it forward together. JoinOrigin is the brand and the network behind it. Instead of five separate tools, your relationships live in one place, so nothing gets lost between them.` |

Rationale: first FAQ must teach the noun before the category; the "Instead of five separate tools" closer
(stress/relief contrast) is kept — it is the strongest differentiation beat.

### 3.2 `home.faq.q2` — "How is JoinOrigin different from Discord/LinkedIn/Reddit?"

| | String |
|---|---|
| Current `answer` | `Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. Origin combines them around the social graph — profiles, communities, chat, feed, projects, and opportunities all live together, so relationships turn into real collaboration.` |
| Proposed | `Discord is a chat app, LinkedIn finds professionals, and Reddit is for discussion. Origin combines them around the social graph — profiles, Origins, chat, feed, projects, and opportunities all live together, so relationships turn into real work.` |

Rationale: keeps the familiar comparison (psychology: anchoring on known brands), swaps the renamed
core object (Communities → Origins), and sharpens the outcome from "collaboration" to "real work"
(actionable, closer to the lifecycle's work/contribution stage).

### 3.3 `home.faq.q3` — "What can I do once I am in?"

| | String |
|---|---|
| Current `answer` | `Create a profile that works like a resume, post your idea as an idea page, start or join communities around anything, and invite the people you want to work with. Every community comes with its own room where members connect.` |
| Proposed | `Create a profile that works like a resume, post your idea as an idea page, and start an Origin around anything. Invite the people you want to work with — co-founders, partners, clients, supporters — and every Origin comes with its own room where the work moves forward.` |

Rationale: this is the "what do I get" question — the answer now names the full promise list
(co-founders/partners/clients/supporters) and ties the room to *work*, not just chat.

### 3.4 `home.faq.q4` — "Is Origin live?"

| | String |
|---|---|
| Current `answer` | `Yes — Origin is live and growing. Click Get Started and get discovered: create your profile, post your idea, and start or join a community today.` |
| Proposed | `Yes — Origin is live and growing. Click Get Started: create your profile, post your idea, and start an Origin around anything you want to make happen.` |

Rationale: keeps the affirmative "everything works" framing (constraint e — no live-vs-roadmap language
here; development status lives only on the signup disclosure). "Make happen" echoes the philosophy.

### 3.5 `home.faq.q5` — "How do I join?"

| | String |
|---|---|
| Current `answer` | `Click Get Started and get discovered. Enter your name and email, and your profile is ready — start building your community today.` |
| Proposed | `Click Get Started. Enter your name and email, and your profile is ready — then start an Origin around your idea and invite the people who'll move it forward with you.` |

Rationale: preserves the immediate-join promise (constraint e) and ends with the network payoff, so the
FAQ funnel ends on motivation, not mechanics.

---

## 4. CTA band

### 4.1 `ctaBand.headline`

| | String |
|---|---|
| Current | `Find your people. Start or grow something together.` |
| Proposed | `Start an Origin. Find the people and resources to move it forward.` |

Rationale: the band is the repeated conversion surface on every menu page — the highest-leverage place
to teach the noun. Two short imperative clauses mirror the two acquisition loops (start / find).
Psychology: imperative + benefit at the moment of decision.

### 4.2 `ctaBand.subline`

| | String |
|---|---|
| Current | `Join 2,400+ builders — from first ideas to established companies — on Origin's social collaboration network and get discovered today.` |
| Proposed | `Join 2,400+ builders — from first ideas to established companies — who are already gathering people and resources on Origin. Find your co-founders, partners, clients, and supporters. Get discovered today.` |

Rationale: social proof kept (2,400+ builders), promise list woven in, "get discovered" retained as the
band's own action word — the label on the button stays **Get Started** (`ctaBand.joinLabel`, unchanged).

---

## 5. `/features` page

### 5.1 `features.hero.eyebrow` / `title` / `lead`

| Key | Current | Proposed |
|---|---|---|
| `features.hero.eyebrow` | `Core objects` | **Keep** `Core objects` |
| `features.hero.title` | `Everything a community needs, in one calm workspace` | `Everything an Origin needs, in one calm workspace` |
| `features.hero.lead` | `Origin is a social collaboration network built around eight core objects: profiles, ideas, communities, communication, feed, projects, companies, and opportunities. Whether you're starting something new or growing an existing company, your relationships live in one place instead of ten separate tools.` | `Origin is built around eight core objects: profiles, ideas, Origins, communication, feed, projects, companies, and opportunities. Start an Origin for anything you want to happen — a startup, a small business, a project — and find the co-founders, partners, clients, and supporters who'll move it forward with you.` |

Rationale: the features lead is a marketing lead → "community" dropped (constraint a); the second
sentence weaves the co-founder/partner/client/supporter promise into the features surface (constraint d);
"one place instead of ten tools" is preserved (differentiation).

### 5.2 Core-object cards — title key + 8 bodies

**Title (shared by home concept tiles, /features cards, /docs concepts):**

| Key | Current | Proposed |
|---|---|---|
| `common.objects.communities` | `Communities` | `Origins` |

Rationale: the core-object naming decision — the card is renamed to the product's core noun; every
surface that renders the object title (home Concepts tiles, /features, /docs) inherits the rename from
the single key.

**Bodies (`features.coreObjects.*`):**

| Key | Current body | Proposed body |
|---|---|---|
| `profiles` | `A profile works like a living resume: it carries your experience, skills, and ideas — plus your reputation and relationships — across every community and project you join.` | `A profile works like a living resume: it carries your experience, skills, and ideas — plus your reputation and relationships — across every Origin and project you join.` |
| `ideas` | `Ideas are the starting point of everything on Origin. Post an idea page for any idea — a small business, an AI startup, a book club, a 10k run — and the people who want to build it find you.` | `Every Origin starts with an idea. Post an idea page for anything — a small business, an AI startup, a book club, a 10k run — and the people who want to build it find you.` |
| `communities` | `Groups around interests, industries, and goals — Startup Founders, Small Businesses, Book Clubs, Community Organizations, Anyone with an Idea — where members find each other.` | `The space you start around a goal — a startup, a small business, a book club, or any idea. Every Origin gathers the people who share it and comes with its own room where the work moves forward.` |
| `communication` | `Every community comes with a Matrix room: real-time chat, direct messages, and group discussions over the open Matrix protocol, end-to-end encrypted by default.` | `Every Origin comes with a Matrix room: real-time chat, direct messages, and group discussions over the open Matrix protocol, end-to-end encrypted by default.` |
| `feed` | `The feed shows posts, updates, and opportunities from the people and communities you follow. It is a calm stream of what matters in your network, not an engagement machine.` | `The feed shows posts, updates, and opportunities from the people and Origins you follow. It is a calm stream of what matters in your network, not an engagement machine.` |
| `projects` | `Collaborative efforts where community members work together and turn conversations into outcomes.` | `Collaborative efforts where the people in your Origin work together and turn conversations into outcomes.` |
| `companies` | `Ventures formed by members inside the network, with team management and opportunity sharing built in.` | `Ventures formed from Origins inside the network, with team management and opportunity sharing built in.` |
| `opportunities` | `Jobs, partnerships, and investments discovered through the social graph — the network surfaces the right opportunities at the right time.` | `Jobs, partnerships, clients, and investments discovered through the social graph — your Origin surfaces the right opportunities at the right time.` |

Rationale: the Opportunities card is where "clients" enters the core-object model (a client is an
opportunity a network surfaces); "your Origin" (possessive) keeps the object personal. Every other body
is a minimal noun swap — consistency without new claims (PR discipline).

### 5.3 `/features` FAQ (`features.faq.q1` + `features.faq.q3`)

| Key | Current | Proposed |
|---|---|---|
| `features.faq.q1.answer` | `Discord is a chat app. Origin is a social collaboration network — profiles, ideas, communities, chat, feed, projects, and companies all live on one social graph.` | `Discord is a chat app. Origin is a social collaboration network — profiles, ideas, Origins, chat, feed, projects, and companies all live on one social graph.` |
| `features.faq.q3.answer` | `The social graph is the web of relationships between members. Origin is organized around it, so every profile, community, and project connects through people.` | `The social graph is the web of relationships between members. Origin is organized around it, so every profile, Origin, and project connects through people.` |

(Note: `features.faq.q2` open-source and `q4` "develop naturally" answers contain no product-noun
community references — kept as-is.)

### 5.4 `/features` wrapper metadata (`apps/web/app/features/page.tsx`) + `ROUTES['/features']`

| Surface | Current | Proposed |
|---|---|---|
| Wrapper `title` + `ROUTES` title | `Features — Communities, Chat, Projects & Opportunities \| JoinOrigin` | `Features — Origins, Chat, Projects & Opportunities \| JoinOrigin` |
| Wrapper `description` | `Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.` | `Explore Origin's features: profiles, ideas, Origins, chat, feed, projects, and opportunities — one space where every idea finds the people and resources to move forward.` |
| `ROUTES['/features'].description` | `Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — the social collaboration network for real outcomes.` | `Explore Origin's features: profiles, ideas, Origins, chat, feed, projects, and opportunities — one space where every idea finds the people and resources to move forward.` |

Keywords (`community platform features`, `collaboration network`, `community chat`, `community feed`,
`online community platform`, `project collaboration platform`, `community building platform`): **kept** —
they are metadata for search intent, not visible leads (constraint a targets visible leads).

---

## 6. `/community` page (destination stays; copy reframed Origin-first)

### 6.1 `community.hero.eyebrow` / `title` / `lead`

| Key | Current | Proposed |
|---|---|---|
| `community.hero.eyebrow` | `The network` | **Keep** `The network` |
| `community.hero.title` | `Where people find each other` | **Keep** `Where people find each other` (no "community"; identity-driven — "find each other" is the network promise) |
| `community.hero.lead` | `Origin is a social collaboration network organized around communities — groups of people who share interests, industries, goals, and opportunities. Communities are the center of engagement.` | `Origin is where people gather around goals. Start an Origin for anything you want to happen — a startup, a small business, a book club — or join one that matches what you're building, and find the people and resources to move it forward.` |

Rationale: the page keeps its "people find each other" identity hook (psychology: belonging), while the
lead teaches the noun and the two loops.

### 6.2 Values cards

| Key | Current | Proposed |
|---|---|---|
| `common.values.communitiesDriveGrowth` (title, also used on /about) | `Communities Drive Growth` | `Origins Drive Growth` |
| `community.values.peopleFirst.body` | `Members are people, not profiles in a database. Every design decision protects the relationships that make the network worth joining.` | `Members are people, not profiles in a database. Every design decision protects the relationships that make an Origin worth starting.` |
| `community.values.communitiesDriveGrowth.body` | `Communities are the center of engagement. When a community thrives, the people in it find each other and build together.` | `Origins are the center of engagement. When an Origin thrives, the people in it find each other, share what they need, and build together.` |
| `community.values.collaborationCreatesValue.body` | `Collaboration is how conversations become projects and projects become companies. Origin is built so collaboration has somewhere to go.` | **Keep** (already Origin-first; lifecycle-aligned) |
| `community.values.ownership.body` | `You own your identity, your data, and your communities. Open architecture and portable identity keep the network accountable to its members.` | `You own your identity, your data, and your Origins. Open architecture and portable identity keep the network accountable to its members.` |

### 6.3 Examples section

| Key | Current | Proposed |
|---|---|---|
| `community.sectionExamples` | `Example communities` | `Example Origins` |
| `community.examplesIntro` | `These are the kinds of communities growing inside JoinOrigin today. If you share one of these goals, there's already a place for you:` | `These are the kinds of Origins growing inside JoinOrigin today. If you share one of these goals, there's already a place for you:` |

Example chip labels (`startupFounders`, `smallBusinesses`, `bookClubs`, `communityOrganizations`,
`runClubs`, `peeWeeLeagues`, `anyoneWithAnIdea`): **kept** — "Community Organizations" is a group-type
label where "community" genuinely fits (constraint a carve-out). G-20 ("Pee-wee Leagues") remains an
open PM decision from the gap analysis; not re-litigated here.

### 6.4 Join section

| Key | Current | Proposed |
|---|---|---|
| `community.sectionJoin` | `Join the network` | **Keep** |
| `community.joinCopy` | `The community is built by the people in it. Get discovered and join the builders shaping how people find each other online.` | `The network is built by the people in it. Start an Origin, get discovered, and join the builders shaping how people find each other and move things forward.` |
| `community.joinStatValue` | `2,400+` | **Keep** |
| `community.joinStatLabel` | `Members building together` | **Keep** |

### 6.5 `/community` FAQ

| Key | Current | Proposed |
|---|---|---|
| `q1.question` | `What communities can I join?` | `What Origins can I join?` |
| `q1.answer` | `Anyone can start or join a community around any idea — a small business, an AI startup, helping the homeless, a 10k run, a political movement, a pee-wee league. If it matters to you, it has a place on Origin.` | `Anyone can start or join an Origin around any idea — a small business, an AI startup, helping the homeless, a 10k run, a political movement, a pee-wee league. If it matters to you, it has a place on Origin.` |
| `q2.question` | `Can I start my own community?` | `Can I start my own Origin?` |
| `q2.answer` | `Yes. Every member can create a community around any idea and invite the people they want to build with — whether it is a business, a book club, or a run club.` | `Yes. Every member can create an Origin around any idea and invite the people they want to build with — whether it is a business, a book club, or a run club.` |
| `q3.question` / `q3.answer` | `Is my data mine?` / `Yes. You own your identity and your data. Your data is portable and your network graph persists on the open Matrix protocol.` | **Keep** (no community reference) |
| `q4.answer` | `Browse communities by interest, industry, or goal — from small businesses and book clubs to AI startups and run clubs — then join the ones that match what you want to build. Or start your own for any idea.` | `Browse Origins by interest, industry, or goal — from small businesses and book clubs to AI startups and run clubs — then join the ones that match what you want to build. Or start your own for any idea.` |
| `q5.answer` | `You choose. You can participate with a named account or stay anonymous, and communities, rooms, and idea pages can be open to everyone or gated by organizers. These options roll out over time.` | `You choose. You can participate with a named account or stay anonymous, and Origins, rooms, and idea pages can be open to everyone or gated by organizers. These options roll out over time.` |

### 6.6 `/community` wrapper metadata + `ROUTES['/community']`

| Surface | Current | Proposed |
|---|---|---|
| Wrapper title + `ROUTES` title | `Community — Find Your People & Build Together \| JoinOrigin` | **Keep** (destination page; "Community" is the page's own name — allowed carve-out) |
| Wrapper `description` | `Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.` | `Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.` |
| `ROUTES['/community'].description` | `Join 2,400+ builders on Origin's social collaboration network. Start or join a community around any idea — a small business, AI startup, book club, or run club.` | `Join 2,400+ builders on Origin. Start or join an Origin around any idea — a small business, AI startup, book club, or run club.` |

---

## 7. Glossary (`/glossary`)

### 7.1 Hub copy (`seoContent.glossary.*`)

| Key | Current | Proposed |
|---|---|---|
| `eyebrow` | `Community OS` | **Keep** (SEO anchor; glossary context — carve-out) |
| `title` | `Community OS Glossary` | **Keep** (SEO anchor; page is a glossary destination) |
| `intro` | `The essential vocabulary of community building — clear definitions for the terms organizers, moderators, and founders use every day.` | `The essential vocabulary of Origin — clear definitions for the terms organizers, moderators, and founders use every day.` |
| `whyTitle` | `Why a glossary` | **Keep** |
| `whyBody` | `Community building has its own language, and the terms are often used loosely. A community OS glossary gives organizers, moderators, and founders shared definitions they can rely on — from the classic concepts like moderation and onboarding to newer ideas like engagement loops and hybrid events.` | `Building anything together has its own language, and the terms are often used loosely. An Origin glossary gives organizers, moderators, and founders shared definitions they can rely on — from the classic concepts like moderation and onboarding to newer ideas like engagement loops and hybrid events.` |
| `termsTitle` | `Core terms` | **Keep** |
| `termsIntro` | `Here are the core terms every organizer, moderator, and founder uses — each one is defined in practice across the Community Building guides:` | **Keep** ("Community Building guides" is the proper name of the guides hub) |

### 7.2 Term definitions that reference Community (the mandated six)

| Term key | Current name / definition | Proposed name / definition |
|---|---|---|
| `community` | Name: `Community` — `A group of people who share interests, industries, goals, or opportunities and connect around them. On Origin, every community comes with a room where members find each other and build together.` | Name: **`Origin`** — `The space you start around a goal. An Origin gathers the people and resources needed to make something happen — a small business, an AI startup, a book club, or a 10k run. On Origin, every Origin comes with a room where members find each other and build together.` |
| `community-manager` | Name: `Community manager` — `The person who keeps a community welcoming, active, and on-mission — welcoming new members, sparking conversation, and coordinating projects. On Origin, the member who starts a community owns and moderates its room.` | Name: **Keep** `Community manager` (recognized role term) — `The person who keeps an Origin welcoming, active, and on-mission — welcoming new members, sparking conversation, and coordinating work. On Origin, the member who starts an Origin owns and moderates its room.` |
| `community-os` | Name: `Community OS` — `A platform that brings profiles, communities, chat, projects, and opportunities into one organized workspace. Origin is the community OS behind JoinOrigin.` | Name: **Keep** `Community OS` (category anchor) — `A platform that brings profiles, Origins, chat, projects, and opportunities into one organized workspace. Origin is the community OS behind JoinOrigin — the space where ideas, people, and resources move forward together.` |
| `activation` | Name: `Activation` — `The moment a new member takes the action that makes them part of the community — their first post, first event, or first project. Activation is the step between joining and contributing.` | Name: **Keep** — `The moment a new member takes the action that makes them part of an Origin — their first post, first proposal, or first contribution. Activation is the step between joining and contributing.` |
| `engagement-loop` | Name: `Engagement loop` — `The repeating cycle of participation that keeps a community alive: someone posts, others respond, and the conversation creates more reasons to return. Healthy loops are the heartbeat of an active community.` | Name: **Keep** — `The repeating cycle that moves an Origin forward: someone posts a need or an offer, others respond, and the work creates more reasons to return. Healthy loops are the heartbeat of an active Origin.` |
| `co-founder` | Name: `Co-founder` — `A person who builds a project or company with you and shares the founding journey. On Origin, co-founders are often found through the network — people who join your idea page and decide to build together.` | Name: **Keep** — `A person who builds a project or company with you and shares the founding journey. On Origin, co-founders are often found through your Origin — people who answer a need or offer, join the work, and decide to build together.` |

Rationale: `activation` and `engagement-loop` now map to the lifecycle stages (participation →
work/contribution; milestone → next match), and `co-founder` echoes the two loops (need/offer → match).
This is the glossary's job: teach the product's mental model in its own vocabulary.

(Remaining terms — `moderation`, `onboarding`, `hybrid-events` — have no product-noun issue; see
Appendix A for optional touch-ups.)

### 7.3 Glossary wrapper metadata (`apps/web/app/glossary/page.tsx`)

| Surface | Current | Proposed |
|---|---|---|
| Title | `Community OS Glossary \| JoinOrigin` | **Keep** |
| Description | `Learn the core terms of community building — community, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.` | `Learn the core terms of Origin — Origin, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.` |

---

## 8. Signup (`/signup`)

### 8.1 `signup.*` (SSR clean copy — indexable)

| Key | Current | Proposed |
|---|---|---|
| `signup.title` | `Sign Up — Create Your Account \| JoinOrigin` | **Keep** |
| `signup.description` | `Create your account on Origin, the social collaboration network. Enter your name and email to get discovered — then start or join a community today.` | `Create your account on Origin. Enter your name and email to get discovered — then start an Origin around your idea and find the people and resources to move it forward.` |
| `signup.heading` | `Create your account` | **Keep** |
| `signup.subcopy` | `Get discovered on the community OS — whether you're starting something new or growing an existing project.` | `Get discovered on Origin — whether you're starting something new or growing an existing project. Find your co-founders, partners, clients, and supporters.` |
| `signup.submit` | `Get Started` | **Keep** (constraint b) |
| `signup.submitting` | `Creating your account…` | **Keep** |
| `signup.legalNote` | `No spam. Unsubscribe anytime.` | **Keep** |
| `signup.successHeading` | `You're on the list!` | **Keep** |
| `signup.successCopy` | `We'll email you when your workspace is ready.` | `We'll email you when your Origin is ready.` (PM decision — see §12 D) |
| `signup.errors.*` | utility copy | **Keep** |

### 8.2 `signup.waitlist.*` (hydration swap — the only dev-status surface)

| Key | Current | Proposed |
|---|---|---|
| `signup.waitlist.heading` | `Join the waitlist` | **Keep** |
| `signup.waitlist.subcopy` | `Get discovered on the community OS — whether you're starting something new or growing an existing project. We'll email you when your workspace is ready.` | `Get discovered on Origin — whether you're starting something new or growing an existing project. We'll email you when your Origin is ready.` |
| `signup.waitlist.disclosure` | `Origin is in development. Your name and email are used only to set up and secure your account when it's your turn.` | **Keep** (the mandated, only development-status surface) |

### 8.3 Signup wrapper metadata (`apps/web/app/signup/page.tsx`)

| Surface | Current | Proposed |
|---|---|---|
| Title | `Sign Up — Create Your Account \| JoinOrigin` | **Keep** |
| Description | `Create your account on Origin, the social collaboration network. Enter your name and email to get discovered — then start or join a community today.` | `Create your account on Origin. Enter your name and email to get discovered — then start an Origin around your idea and find the people and resources to move it forward.` |

Keywords (`sign up`, `create account`, `join Origin`, `social collaboration network`, `community OS`,
`get discovered`): **kept** — metadata, not visible copy.

---

## 9. Site metadata

### 9.1 `SITE.description` (`apps/web/lib/seo/site.ts`)

| | String |
|---|---|
| Current | `Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space.` |
| Proposed | `Origin is the space you start around a goal — gather the people and resources you need, and move it forward. JoinOrigin is the network behind it.` (~142 chars, ≤160 rule) |

Rationale: SITE.description feeds home OG/Twitter + Organization JSON-LD — the single most-read
human+machine description. Teaching the core noun here sets the tone for every crawler and share card.

### 9.2 Home `<title>` (`apps/web/app/page.tsx` + `ROUTES['/']` + `scripts/generate-locale-routes.ts` PATHS)

| | String |
|---|---|
| Current | `JoinOrigin — Social Collaboration Network & Community OS` |
| Proposed | `Origin — Social Collaboration Network & Community OS` |

Rationale: first token a search engine (and snippet reader) sees becomes the product noun "Origin";
the two category anchors (per G-3, titles keep anchors) are retained. **PM decision A** — a
brand-first title (`JoinOrigin — ...`) is the conservative alternative per gap-analysis G-3; the
reframe makes the product-first title the better fit for discovery.

### 9.3 `ROUTES` titles/descriptions (`apps/web/lib/seo/routes.ts`)

| Route | Current title | Proposed title | Current description | Proposed description |
|---|---|---|---|---|
| `/` | `JoinOrigin — Social Collaboration Network & Community OS` | `Origin — Social Collaboration Network & Community OS` | `Origin is a social collaboration network where people post ideas, form communities, and build projects together. Join 2,400+ builders already collaborating.` | `Origin is the space you start around a goal — gather the people and resources you need, and move it forward. Join 2,400+ builders already collaborating.` |
| `/features` | `Features — Communities, Chat, Projects & Opportunities \| JoinOrigin` | `Features — Origins, Chat, Projects & Opportunities \| JoinOrigin` | `Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — the social collaboration network for real outcomes.` | `Explore Origin's features: profiles, ideas, Origins, chat, feed, projects, and opportunities — one space where every idea finds the people and resources to move forward.` |
| `/community` | `Community — Find Your People & Build Together \| JoinOrigin` | **Keep** | `Join 2,400+ builders on Origin's social collaboration network. Start or join a community around any idea — a small business, AI startup, book club, or run club.` | `Join 2,400+ builders on Origin. Start or join an Origin around any idea — a small business, AI startup, book club, or run club.` |
| `/docs` | `Docs — Concepts, Roadmap & Architecture \| JoinOrigin` | **Keep** | `Learn how Origin works: profiles, ideas, communities, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.` | `Learn how Origin works: profiles, ideas, Origins, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.` |
| `/about` | `About — The Operating System for Human Collaboration \| JoinOrigin` | **Keep** | `Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.` | `Origin's mission: one space where people start around a goal, gather the people and resources they need, and build together. The network is the product.` |
| `/contact` | `Contact — Talk to the JoinOrigin Team \| JoinOrigin` | **Keep** | `Questions about JoinOrigin or starting a community? Contact the team — we reply within 2 business days.` | `Questions about Origin — or starting your own Origin? Contact the team — we reply within 2 business days.` |
| `/privacy` | `Privacy Policy \| JoinOrigin` | **Keep** | `JoinOrigin privacy policy — what we collect and how your data is handled.` | **Keep** |
| `/terms` | `Terms of Service \| JoinOrigin` | **Keep** | `JoinOrigin terms of service — plain-English terms for using the platform.` | **Keep** |

### 9.4 Footer tagline consideration (`footer.tagline`)

| | String |
|---|---|
| Current | `Where teams find their Origin` |
| Recommended | **Keep.** The tagline was just brand-corrected in TASK-560, already ends on the brand noun, and "teams" covers the group-building promise. Changing it again would churn 21 locales for near-zero gain. |
| Optional variant (only if PM wants the promise spelled out) | `Where teams find the people and resources to move forward` — note this loses the brand-noun ending, so it is **not recommended** for the tagline strip, where the brand word is the payoff. |

---

## 10. Roadmap rename — "Community Foundation" → "Origin Foundation" (occurrence map)

The phase name appears in **three EN strings**; `/features` and `/docs` render the title from the shared
`common.roadmap.*` keys, so one change covers both pages:

| Key | Where rendered | Current | Proposed |
|---|---|---|---|
| `common.roadmap.phase1Title` | `/features` roadmap cards **and** `/docs` roadmap cards | `Phase 1 — Community Foundation` | `Phase 1 — Origin Foundation` |
| `docs.faq.q4.answer` | `/docs` FAQ | `The Community Foundation (Phase 1) is live: profiles, communities, chat, and the social graph are already in use by 2,400+ builders.` | `The Origin Foundation (Phase 1) is live: profiles, Origins, chat, and the social graph are already in use by 2,400+ builders.` |
| `about.missionParagraph2` | `/about` mission paragraph | `...As the platform grows through the roadmap — Community Foundation, Collaboration, Organization, AI Collaboration, and the Global Network — the mission stays the same: help people find each other and build together.` | `...As the platform grows through the roadmap — Origin Foundation, Collaboration, Organization, AI Collaboration, and the Global Network — the mission stays the same: help people find each other and build together.` |

Roadmap **bodies** that reference the object noun (same phase on both pages):

| Key | Current | Proposed |
|---|---|---|
| `features.roadmap.phase1.body` + `docs.roadmap.phase1.body` | `Profiles, communities, chat, and the social graph. Success metric: members forming durable communities.` | `Profiles, Origins, chat, and the social graph. Success metric: members forming durable Origins.` |
| `features.roadmap.phase2.body` + `docs.roadmap.phase2.body` | `Projects, shared workspaces, and tools that turn conversations into joint work. Success metric: communities shipping outcomes together.` | `Projects, shared workspaces, and tools that turn conversations into joint work. Success metric: Origins shipping outcomes together.` |
| `docs.roadmap.phase4.body` | `AI workers that help communities coordinate, summarize, and match opportunities. Success metric: members collaborating with AI as equals.` | `AI workers that help Origins coordinate, summarize, and match opportunities. Success metric: members collaborating with AI as equals.` |

(`features.roadmap.phase3.body` / `docs.roadmap.phase3.body` — `Companies and ventures formed by members,
with team management and governance. Success metric: companies founded inside the network.` — **kept**;
no community reference.)

**Wave 2 note:** `apps/web/app/features/page.test.tsx:107` asserts `Phase 1 — Community Foundation`
and will need a fixture update alongside the dict change. All 20 non-EN locales must be mirrored with
key-parity preserved (`check-keys.ts`).

---

## 11. Constraint compliance checklist

| # | Constraint | Status |
|---|---|---|
| a | Drop "community" from marketing **leads** (hero, definition, FAQ leads, features lead, CTA band) | ✅ All proposed leads contain zero "community" (see §1–§5, §9.4). Retained only in carve-outs: `/community` page title/name, glossary terms, `Community Organizations` example label, `common.objects.communities` → renamed `Origins` (the naming decision). |
| b | CTA label stays **Get Started** | ✅ `home.hero.startProject`, `header.getStarted`, `ctaBand.joinLabel`, `signup.submit`, `seoContent.cta.joinWaitlist` all remain `Get Started`. No button-label change proposed. |
| c | NO AI / "What are you trying to accomplish" assistant copy | ✅ No AI copy anywhere in this deck. |
| d | No new UI bands/sections; weave promise into existing copy | ✅ The co-founder/partner/client/supporter promise is woven into existing strings only (definition, FAQ q3, CTA subline, features lead, opportunities card, community joinCopy, signup subcopy, SITE.description). |
| e | "Everything works" framing; no live-vs-roadmap / in-development language | ✅ Home FAQ q4/q5 keep affirmative framing; the only dev-status surface remains `signup.waitlist.disclosure` (unchanged). |
| f | Roadmap phase "Community Foundation" → "Origin Foundation" | ✅ §10 maps all EN occurrences (`common.roadmap.phase1Title`, `docs.faq.q4.answer`, `about.missionParagraph2`) + bodies. |
| g | Location/SEO pages untouched | ✅ No location strings proposed (`seoContent.location.*`, `seoContent.metadata.*`, guides, group types, city/country templates untouched). |

---

## 12. PM decision points (approval gate)

- **A. Home `<title>`** — adopt product-first `Origin — Social Collaboration Network & Community OS`
  (recommended) vs conservative brand-first `JoinOrigin — ...` (gap-analysis G-3's default).
- **B. Glossary term naming** — rename the `community` term card to `Origin` (recommended, teaches the
  noun), while keeping `Community manager` and `Community OS` as glossary terms (recognized role/category).
- **C. CTA band headline** — adopt `Start an Origin. Find the people and resources to move it forward.`
  (recommended) vs keep `Find your people. Start or grow something together.` (both are "community"-free).
- **D. Success copy** — `We'll email you when your Origin is ready.` (recommended, brand echo) vs keep
  `...your workspace is ready.` (consistent with `mobile.home.subtitle`). If adopted, Wave 2 should
  optionally align `mobile.home.subtitle` too.
- **E. Consistency sweep (Appendix A)** — approve as one Wave-2 sweep or defer: comparison-table gap
  cells, `/docs` concept card body, `/about` principle bodies + FAQ, `/contact` lead + FAQ, 404 copy,
  guides-hub `howJoinOriginHelpsBody`, glossary `moderation`/`onboarding` definitions.

---

## Appendix A — Optional consistency sweep (NOT part of the mandated surfaces; for PM/Story C decision)

These strings still use "community" as the object noun but are **not** marketing leads and were outside
the mandated surface list. A global noun sweep would keep the model 100% consistent:

| Surface | Key | Current fragment | Proposed (if approved) |
|---|---|---|---|
| /features comparison | `features.comparison.*.gap` (10 rows) | `...does not carry profiles, communities, projects, and opportunities...` etc. | `...does not carry profiles, Origins, projects, and opportunities...` (global swap) |
| /docs concepts | `docs.concepts.communities.body` | `Communities are groups of people who share interests, industries, goals, and opportunities — around any idea. They are the center of engagement on Origin and the way members find each other.` | `Origins are the space you start around a goal — a group of people who share interests, industries, goals, and opportunities around any idea. They are the center of engagement on Origin and the way members find each other.` |
| /docs hero | `docs.hero.lead` | `Origin is the product: a social collaboration network and community OS. ...` | Keep ("community OS" is the category anchor; docs is a destination) |
| /about | `about.missionParagraph1` | `...Instead of five separate tools for chat, communities, and projects... profiles, ideas, communities, communication, feed...` | swap `communities` → `Origins` (×2) |
| /about | `about.principles.communitiesDriveGrowth.body` | `Communities are the center of engagement — groups of people who...` | `Origins are the center of engagement — groups of people who...` |
| /about | `about.principles.openArchitecture.body` | `...identity, profiles, communities, and the social graph are portable...` | `...identity, profiles, Origins, and the social graph are portable...` |
| /about | `about.faq.q1.answer` | `Origin is a social collaboration network — a community OS that brings your ideas, projects, and communities into one organized space...` | `Origin is the space you start around a goal — one organized space where your ideas, projects, and Origins live together...` |
| /contact | `contact.hero.lead` | `Have a question about Origin — the social collaboration network — or starting a community?` | `Have a question about Origin — or starting your own Origin?` |
| /contact | `contact.faq.q2.answer` | `...and you can start or join communities right away.` | `...and you can start or join Origins right away.` |
| 404 | `notFound.exploreCommunities` | `Explore communities →` | `Explore Origins →` |
| Guides hub | `seoContent.guides.howJoinOriginHelpsBody` | `JoinOrigin is a community OS that helps you find or start communities — ...` | Keep ("community OS" category + guides destination; flag only) |
| Glossary | `seoContent.glossary.terms.moderation.definition` / `onboarding.definition` | `...make a community worth joining` / `...makes them part of the community` | optional Origin-first touch |
| Legacy | `common.joinWaitlist` = `Get Discovered` | appears unused (all join CTAs now use `seoContent.cta.joinWaitlist`) | Wave 2 to confirm; leave or remove |

---

## 13. Closure

This deck is the complete proposed EN copy for the Origin repositioning (TASK-564). Every string cites
the current key+value it replaces and carries a 1–2 line psychology/marketing/PR rationale. **Status:
proposed — for PM review only.** Wave 2 (i18n across 21 locales → fe → e2e) starts only after EN
approval. Zero implementation files were edited by this role.

**Deliverable**: `app/docs/design/sprint-24-origin-reframe-copy.md` (this file).
