# Sprint 13 — JoinOrigin Product Screen-Flow Document

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`./README.md`](./README.md) ·
> **Producer:** `design-product-flow` (TASK-323) · **Consumers:** later product sprints
> (Auth, Explore/Search, Matrix infra, content updates — see §7) ·
> **Verifier:** `review-design-product-flow` ·
> **Sources:** [`../ORIGIN-WHITEPAPER.md`](../ORIGIN-WHITEPAPER.md) (whitepaper v1.0 —
> Core Objects, Matrix Mapping, Initial MVP) · `/features` screen
> (`apps/web/app/features/features-view.tsx` + `packages/i18n/locales/en.json`
> `common.objects.*`) · Sprint 11 SEO Content Engine design (`sprint-11-seo-content-engine.md`)
> · Sprint 12 merged master (`ff79314`)

---

## 0. How to Read This Document

This is the **Product Screen-Flow Document** for the JoinOrigin application layer — the bridge
between the marketing site that exists today (Sprint 1–12) and the networked product that comes
next (Auth, profiles, communities, rooms). It fixes the **product model**, the **core loop**, the
**screen flow**, the **core-object → screen mapping**, and the **Matrix infrastructure mapping**
for the MVP, and records the **locked decisions (D1–D4)** plus the **product sign-off answers**
to the §8 questions (Q1–Q10, signed off 2026-08-15).

Scope rules for this document:

- It is a **design contract**. Zero implementation files are edited by this role.
- It does **not** draft replacement copy (§6 is a high-level delta audit only — the contract for
  a later content-update sprint).
- It records the §8 questions **as answered by product sign-off** (2026-08-15) — the deferred
  sprints (§7) implement those answers verbatim.
- It references the **whitepaper** (`app/docs/ORIGIN-WHITEPAPER.md`) and the **`/features`**
  screen as the two canonical sources of the product model. Where this document makes a product
  decision, the decision is consistent with those sources and is labeled a **locked decision (D#)**
  or a **product sign-off answer (Q#)**.

**Terminology pinned in this document:**

| Term | Meaning |
|------|---------|
| **Room** | A Matrix room — the unit of real-time communication. Always "room", never "chat channel" or "group chat" (see D-pin in §6). |
| **Space** | A Matrix space — the container for a JoinOrigin Community's rooms. |
| **Community** | A JoinOrigin core object ("group"). Maps to a Matrix Space (whitepaper §Matrix Mapping). |
| **Group** | Used interchangeably with Community when describing the public-facing object in Explore/Discovery. |
| **Idea / Project / Company** | JoinOrigin core objects (whitepaper Core Objects; `/features` `common.objects.*`). |
| **Discover → Join → Room → Grow** | The core loop — see §2. |

---

## 1. Clarified Product Model — JoinOrigin Is a Digital Connection Layer

### 1.1 The model in one sentence

**JoinOrigin is a digital connection layer: people search and filter other people, projects,
ideas, and groups; they join a group (or start their own) through a public page; the group's
communication happens in a Matrix room, owned and controlled by the creator; and the in-person
world (events, meetups) is a downstream consequence of those connections — never the core.**

### 1.2 What JoinOrigin is (and is not)

The whitepaper's thesis is explicit: *"The most valuable asset is the network of people and the
relationships they form"* and *"The network is the product. Everything else is infrastructure"*
(`ORIGIN-WHITEPAPER.md` — Executive Summary, Social Graph Strategy). The `/features` screen
presents the same model as eight core objects: `profiles`, `ideas`, `communities`,
`communication`, `feed`, `projects`, `companies`, `opportunities` (`en.json`
`common.objects.*`, rendered by `features-view.tsx`).

The clarified product model, locked for the MVP:

1. **Discovery is digital.** The primary surface is search/filter over people, ideas, groups,
   and projects — not a calendar of events. In-person events exist **only as a downstream
   consequence**: a group that forms around a shared interest may choose to meet in person, and
   the platform may help members coordinate that — but the platform is not an events platform and
   does not run or staff events. (This preserves the honest framing already in the 7 guides:
   "JoinOrigin does not run local events.")
2. **Connection is the action.** The core user action is *joining* — a person joins a group (or
   invites others to join) via a public page. Joining grants access to the group's room.
3. **Communication runs on Matrix.** Real-time chat, DMs, group discussion, presence, and
   notifications are provided by the Matrix protocol (whitepaper §Communication Architecture +
   §Matrix Mapping). The social graph, identity, profiles, communities, feed, reputation,
   discovery — everything else — is owned by JoinOrigin (whitepaper §JoinOrigin
   Responsibilities).
4. **In-person is downstream.** Events/meetups are a *consequence* of a formed community, never
   the reason the platform exists. Marketing, docs, and guides must keep this ordering
   (see §6).

### 1.3 Why this clarification matters

Prior marketing copy and the SEO guides drifted toward "community + events" framing (e.g. the
`organize-a-meetup` guide and `/location` group-type variant `meetup` labeled "Community meetups
& events"). The clarified model reorders the narrative: **connect first, meet later**. The
meetup/event content remains useful as *downstream guidance* but must always be presented as
consequence, not core. The "room" terminology (D-pin in §6) and the digital connect→join→room
loop (§2) are the two enforcement points of this model in screens and copy.

---

## 2. Core Loop + Screen Flow

### 2.1 The core loop

```text
        ┌───────────────────────────────────────────────────────────────────────┐
        │                                                                       │
        ▼                                                                       │
  ┌───────────┐    ┌──────────────────────────────┐    ┌────────────────────┐   │
  │ DISCOVER  │───▶│ PUBLIC PAGE                  │───▶│ JOIN               │   │
  │ Explore / │    │ Idea / Group / Project page  │    │ via link or invite │   │
  │ search &  │    │ (public, indexable)          │    │ (one-click, link)  │   │
  │ filter    │    └──────────────────────────────┘    └────────────────────┘   │
  └───────────┘                                                     │            │
        ▲                                                           ▼            │
        │                                               ┌────────────────────┐  │
  ┌───────────┐    ┌──────────────────────────────┐    │ ROOM               │  │
  │ GROW      │───▶│ FEED + INVITE                │───▶│ auto-created ON    │  │
  │ members   │    │ feed posts, invites, links   │    │ PUBLISH (D1)       │  │
  │ invite    │    │ back into Explore/Public     │    │ creator controls   │  │
  └───────────┘    └──────────────────────────────┘    │ (Element-native,   │  │
                                                        │  D2)               │  │
                                                        └────────────────────┘  │
                                                                                │
        └───────────────────────────────────────────────────────────────────────┘
```

**Loop narrative (what the user experiences):**

1. **Discover** — A visitor opens Explore (single screen, D3) and toggles between
   People / Ideas / Groups / Projects, with location + group-type facets (reusing the SEO
   taxonomy). They find a group, an idea, or a project that matches.
2. **Public page** — They land on the object's **public page** (indexable, shareable,
   linkable — mirroring the current `/location/<city>` + variant + idea-page model from Sprint
   11/12). The page states what the group is, who is in it (public-facing), and a **Join**
   action.
3. **Join via link or invite** — Joining is a single action: clicking **Join** on the public
   page, or following a **direct invite link** from a member. Joiners land in the group's room.
4. **Room auto-created ON PUBLISH (D1)** — The moment a creator **publishes** a new
   idea/group/project, its Matrix room is auto-created. The creator is the room owner from
   second zero. There is never a "create the chat later" step.
5. **Creator controls the room (D2)** — Using standard Matrix room ownership inside Element:
   invite/remove members, assign roles, edit room settings, pin messages, archive the room.
   Creator control is native Matrix ownership — no custom permission system in the MVP.
6. **Feed/invite → growth** — Members share posts, updates, and invites back through the
   feed and invite links; each new join loops back to Discover (their network expands the
   discovery surface). The loop closes: connection → room → feed → more connections.

### 2.2 Screen flow (MVP screens in navigation order)

```text
Signed-out / new visitor:
  Home (marketing) ─▶ Features ─▶ Community ─▶ Explore (D3) ─▶ Public page (Idea/Group/Project)
                                                   │
                                                   ▼
                                          Join (link/invite) ─▶ Room (Element)

Signed-in member:
  Feed ─▶ Explore ─▶ Public page ─▶ Join/Invite ─▶ Room (Element) ─▶ Profile ─▶ Rooms list
    ▲                                                                    │
    └──────────────────────────── invites / posts ──────────────────────┘
```

**MVP screen inventory (the screens the loop touches):**

| # | Screen | Type | Purpose in loop | Status |
|---|--------|------|-----------------|--------|
| S1 | Home | marketing | entry point; product model messaging | exists (Sprint 1–10) |
| S2 | Features | marketing | core-object explainer | exists |
| S3 | Community | marketing | brand community surface | exists |
| S4 | Docs | marketing/reference | concepts, roadmap, architecture | exists |
| S5 | Explore | **product** | Discover step; single screen with object-type toggle (D3) | **new (deferred, §7)** |
| S6 | Public page (Idea/Group/Project) | product | public, joinable object page | **new (deferred)** — pattern extends Sprint 11/12 page model |
| S7 | Join flow | product | link/invite → room membership | **new (deferred)** |
| S8 | Room | product (Element) | communication; creator-controlled (D2) | **new (deferred)** |
| S9 | Feed | product | posts/updates/invites; growth step | **new (deferred)** |
| S10 | Profile | product | identity, contributions | **new (deferred)** |

The marketing screens (S1–S4) exist today. All product screens (S5–S10) are deferred to their
own sprints (§7). This document defines their flow, object mapping (§3), and Matrix mapping (§4)
so those sprints are build-ready.

---

## 3. Core-Objects → Screen Mapping

The eight core objects from the whitepaper Core Objects + `/features` `common.objects.*` map to
screens as follows. **Every core object has a home screen and a communication surface (a room).**

| Core object | Public/home screen | Communication surface | Notes |
|-------------|--------------------|----------------------|-------|
| **Profiles** (`profiles`) | Profile screen (S10) | DMs (Matrix DMs) | Identity, skills, experience, interests, reputation, contributions (whitepaper Core Objects: User). |
| **Ideas** (`ideas`) | Idea public page (S6) | Idea room (auto-created on publish, D1) | An idea is a proposal around which people gather; publishing creates its room. |
| **Communities / Groups** (`communities`) | Group public page (S6) + Explore Groups toggle (S5) | Community room(s) inside a Matrix **Space** (§4) | The primary organizational unit (whitepaper Core Objects: Community). "Group" and "Community" are the same object. |
| **Communication** (`communication`) | Room screen (S8, Element) | All rooms/DMs | Provided by Matrix; never re-built by JoinOrigin (whitepaper §Communication Architecture). |
| **Feed** (`feed`) | Feed screen (S9) | room posts surface into feed | Posts, updates, discussions, opportunities, announcements (whitepaper Core Objects: Feed). Discovery purpose. |
| **Projects** (`projects`) | Project public page (S6) | Project room (auto-created on publish, D1) | Collaborative efforts formed by community members (whitepaper Core Objects: Project). |
| **Companies** (`companies`) | Company profile (deferred, Phase 3 object) | Company room (deferred) | Phase 3 object per whitepaper phases — **not in MVP screen set**, but mapped here for completeness. |
| **Opportunities** (`opportunities`) | Opportunity boards/feed entries (deferred, Phase 2 object) | Opportunity threads in feed/rooms | Jobs, partnerships, investments, contracts (whitepaper Core Objects: Opportunity) — deferred beyond MVP. |

### 3.1 Mapping rules (locked)

- **One object, one public page, one room.** Publishing an Idea/Group/Project creates its
  public page AND its room atomically (D1). No object exists in the network without a room.
- **Communities get a Space, not just a room** (whitepaper §Matrix Mapping: Community → Space).
  A Space contains the community's rooms (main room + project/idea sub-rooms as they spawn).
- **Feed is a projection, not a silo.** The Feed screen aggregates posts from rooms the member
  belongs to, plus public discovery content (Q5 — signed off: all post types in scope — updates,
  opportunities, events, announcements; see §8).
- **Companies and Opportunities are mapped but deferred.** They appear on `/features` today as
  brand promises; their screens arrive in later phases (whitepaper Phase 2/3).

---

## 4. Matrix Mapping + Infrastructure Decision

### 4.1 Object mapping (whitepaper §Matrix Mapping — locked)

| JoinOrigin object | Matrix object |
|-------------------|---------------|
| **User** | **Matrix User** (account on the JoinOrigin homeserver) |
| **Community (Group)** | **Matrix Space** |
| **Room (Idea/Project/Community chat)** | **Matrix Room** |

This is the whitepaper's own mapping (`ORIGIN-WHITEPAPER.md` — Matrix Mapping: "JoinOrigin
User → Matrix User; JoinOrigin Community → Matrix Space; JoinOrigin Chat Room → Matrix Room").
The MVP implements it verbatim. JoinOrigin owns identity/profile/social graph/feed/discovery
(whitepaper §JoinOrigin Responsibilities); Matrix provides DMs, community chat, presence,
notifications, group messaging (whitepaper §Matrix Responsibilities).

### 4.2 Client decision — Element is the default chat client, opened via DEEP LINK (D4 + Q8)

**D4 (UPDATED in planning 2026-08-15): Element is the default chat client for the MVP across
mobile, web, and desktop.** Per product sign-off on Q8 (2026-08-15), Element is **opened via
DEEP LINK from the JoinOrigin app — no inline embed** (no iframe, no embedded SDK) on web or
mobile.

- **Web:** the JoinOrigin web app **deep-links into Element Web** (open in a new context/tab)
  as the room surface (S8). Element Web is **not inline-embedded** in the JoinOrigin app.
- **Mobile:** the JoinOrigin mobile app **deep-links into the Element mobile app** on iOS/Android.
  The Element mobile app is the default room surface; no embedded Matrix client stack in the
  JoinOrigin app.
- **Desktop:** Element Desktop is the default room surface on desktop operating systems,
  opened by deep link from the JoinOrigin app where applicable.
- No custom chat UI is built for the MVP. The product ships the standard Element experience;
  JoinOrigin's own app surfaces remain the discovery/identity/social-graph layer around it.

Rationale: the whitepaper's MVP lists "Embedded Matrix Client UI" and open-protocol
flexibility; building a custom chat client would duplicate Element and delay the network.
D4 keeps the MVP communication surface 100% standard Matrix/Element. The deep-link opening
mode (Q8) keeps the JoinOrigin app lean (no heavy embedded client, no iframe sandbox/SSO
complexity) while preserving the full Element experience for room control (D2).

### 4.3 Homeserver decision — self-hosted Synapse (locked)

- **Primary homeserver:** a **self-hosted Synapse homeserver** added to
  `app/docker-compose.yml` **in the same pattern as the existing self-hosted Plausible
  service** (Sprint 10, TASK-277): a compose service with named volumes, healthcheck, local
  port, and `.env`-driven config. The compose file is the established place for self-hosted
  platform services; Synapse joins it the same way Plausible did.
- **Federation fallback:** the JoinOrigin homeserver federates with the public Matrix network
  via **matrix.org** as the fallback/interop path. Rooms remain reachable from the wider Matrix
  ecosystem; JoinOrigin users can communicate with Matrix users on other homeservers.
- **Ownership:** JoinOrigin runs the homeserver for its own users (the platform's hosted
  product remains the source of truth for identity). Per product sign-off on Q9 (2026-08-15),
  **public marketing/docs copy drops hosting/self-host messaging entirely** — the "nothing to
  self-host" disambiguation is removed from public copy rather than expanded (see §6.2, delta
  direction changed from *disambiguate* to *remove*). The *open-source reference stack* note
  (Plausible today, Synapse next — self-hostable components in `docker-compose.yml`) remains
  in **internal docs only**; it is not discussed in public copy for now (deferred; revisit
  later).

### 4.4 Infra change summary (for the Matrix-infra sprint, §7)

| Change | Location | Pattern |
|--------|----------|---------|
| Add Synapse homeserver service | `app/docker-compose.yml` | same as `plausible` service (named volumes, healthcheck, local port, env config) |
| Element Web client | opened via **deep link** from the web app (room surface, S8 — Q8, no inline embed) | Element Web standard distribution; no custom chat UI (D4) |
| Federation | homeserver → matrix.org | default federation settings; fallback path documented |
| Env/config | `.env.example` additions | `SYNAPSE_*` vars mirroring `PLAUSIBLE_*` pattern |

---

## 5. Locked Decisions D1–D4

This section is the normative record. Later sprints implement these decisions verbatim.

### D1 — Room created immediately on publish

**Decision:** Publishing an Idea, Group, or Project **immediately and atomically creates its
Matrix room** (and, for a Community, its Space). There is no separate "create chat" step and no
room-less published object.

- Impact: publishing flow = public page + room in one transaction (§2.1 step 4).
- Implication for Auth/infra: room creation is server-side and requires a Matrix service
  account; the publish API must call the homeserver on the same transaction.

### D2 — Creator control = standard Matrix room ownership

**Decision:** The creator's control over a room is **standard Matrix room ownership**, exercised
through Element: invite/remove members, assign roles (moderator/admin), room settings, pin
messages, archive the room. No custom permission/moderation system in the MVP.

- The creator is the room owner from publish (D1).
- Moderation capabilities used by guides (e.g. the `moderation` guide) map onto Element's
  built-in roles — no custom moderation UI.

### D3 — Single Explore screen with object-type toggle

**Decision:** Discovery is **one Explore screen** with an object-type toggle
(**People / Ideas / Groups / Projects**) plus **location and group-type facets reusing the SEO
taxonomy** (`GroupTypeKey`: `startup | creative | political | meetup | small-business`, plus the
reserved `ideas` variant — `apps/web/lib/seo/locationData.ts`).

- One route, one screen, one toggle — not four separate discovery surfaces.
- Facets reuse the SEO taxonomy so Explore and `/location` pages stay coherent (same group-type
  vocabulary, same city/region/country hierarchy from the Sprint 11 dataset).
- Explore is the Discover step of the core loop (§2).

### D4 — Element is the default chat client (UPDATED)

**Decision (UPDATED in planning 2026-08-15):** Element is the **default chat client for the MVP
across mobile, web, and desktop** (Element Web on web, Element mobile app on iOS/Android,
Element Desktop on desktop). Element is **opened via DEEP LINK** from the JoinOrigin app on web
and mobile — **no inline embed** (Q8, signed off 2026-08-15). No custom chat UI in the MVP.

- Supersedes any earlier narrower reading ("Element Web only"). The update was locked in
  planning on 2026-08-15 and is recorded here verbatim.
- §4.2 details the per-surface behavior, including the deep-link opening mode (Q8).

---

## 6. Content-Impact Audit (Contract for the Later Content-Update Sprint)

**Scope rule:** this section is a **high-level delta audit only** — a contract for the later
content-update sprint (deferred in §7). It does **not** draft replacement copy, does not list
per-string edits, and does not change any locale JSON. Each delta below names the affected
surface and the required change direction; the content-update sprint owns the actual copy.

### 6.1 The 7 SEO guides — shift center of gravity to the digital connect→join→room model

**Surfaces:** `apps/web/lib/seo/content/en/guide/*.ts` — `start-a-community`,
`organize-a-meetup`, `first-10-members`, `find-a-co-founder`, `keep-a-community-active`,
`hybrid-communities`, `moderation` (and the `/guides` hub).

**Delta direction:** all 7 guides should shift their center of gravity from
"community + events" to the **digital connect → join → room** model: the JoinOrigin value
proposition is finding/joining/starting groups and communicating in a creator-controlled room;
in-person events are downstream. The existing honest framing ("JoinOrigin does not run local
events") stays; the *emphasis* moves from venue/event logistics toward the digital loop.

- High-level deltas per guide (direction only):
  - `start-a-community` — emphasize: publish the group → room auto-created → members join via
    link; the venue/format guidance stays but as downstream consequence.
  - `organize-a-meetup` — reposition: meetups are what a group *does after* forming; the
    digital connect→join→room path comes first.
  - `first-10-members` — emphasize invite links and the room as the joining surface.
  - `find-a-co-founder` — emphasize: idea page + room as the place co-founder conversations
    happen.
  - `keep-a-community-active` — emphasize room activity/feed as the retention surface.
  - `hybrid-communities` — emphasize: the room connects the online and (downstream) in-person
    parts.
  - `moderation` — emphasize: creator control = Matrix room ownership (D2), roles in Element.
- No replacement copy drafted here; the content-update sprint reworks intros/sections/steps.

### 6.2 `/docs` — REMOVE self-host/hosting messaging (Q9)

**Surface:** `apps/web/app/docs/` (`docs-view.tsx` + `en.json` `docs.*` keys, FAQ entries such
as "Is JoinOrigin self-hostable?").

**Delta direction (UPDATED by product sign-off on Q9, 2026-08-15 — changed from *disambiguate*
to *remove*):** **REMOVE self-host/hosting messaging from public copy entirely.** Product copy
should **not discuss hosting** — no "nothing to self-host", no "Can I self-host?" FAQ entry
about the reference stack, no disambiguation between the hosted product and the self-hostable
reference stack. The open-source reference stack note (Plausible, Synapse in
`docker-compose.yml`) may remain in **internal docs only** (README/internal architecture docs);
public marketing/docs copy **drops hosting talk** — the hosting/self-host topic is deferred and
revisited later. The content-update sprint removes/deletes the hosting FAQ entries and wording
rather than expanding them.

### 6.3 "Room" terminology pinned to Matrix room

**Surface:** all marketing/product copy where "room" or chat-like terms appear.

**Delta direction:** the word **room** is pinned to **Matrix room** everywhere it is used in
product copy; "chat channel", "group chat", "conversation space" are not used for the
communication surface. The term should appear in Features/Docs copy consistently with §0
terminology. (Also the SEO `/location` variant label "Community meetups & events" for the
`meetup` group type is *not* changed by this pin — it is a group-type taxonomy label, not a room
term; §8 Q4 (signed off) keeps the label as-is.)

### 6.4 Homepage / Features / Community — minimal deltas

**Surfaces:** `apps/web/app/` home, `/features` (`features-view.tsx`), `/community`.

**Delta direction:** minimal. The core-objects cards on `/features` already match the §3
mapping (profiles/ideas/communities/communication/feed/projects/companies/opportunities) — keep
them. Homepage and Community copy should only gain the **connect→join→room ordering** where it
conflicts with event-first framing, and the room terminology (6.3). No structural redesign, no
new sections, no copy rewrite beyond what the ordering requires.

### 6.5 Surfaces NOT in scope for the content-update sprint

- `/about`, `/contact`, `/privacy`, `/terms` — no product-model deltas expected (unless the
  product sign-off on §8 changes scope).
- `/location`, `/guides`, `/glossary` page *structure* — content engine structure stays; only
  the guide content direction (6.1) applies.
- Locale JSONs — the content-update sprint may add keys if it adds copy, but **this document
  does not define them**; key-parity discipline (21 locales) applies to that sprint.

---

## 7. Deferred / Separate Sprints

The product screens are intentionally **deferred to separate sprints** so each sprint has a
single build-ready contract. Ordering below is the planned sequence (subject to PM/sprint-master
scheduling); each sprint consumes this document + §3/§4 mappings.

| Sprint / track | Scope (consumes this doc) | Key dependency |
|----------------|---------------------------|----------------|
| **Auth** | Sign up, log in, session, Matrix user provisioning (User → Matrix User per §4.1) | prerequisite for every product screen |
| **Explore / Search** | Explore screen (S5) with object-type toggle + location/group-type facets (D3); search/filter implementation | Auth (joins are member actions) |
| **Matrix infra** | Synapse homeserver in `app/docker-compose.yml` (Plausible pattern), Element Web/mobile/desktop wiring (D4), federation to matrix.org, room/space creation service (D1) | Auth (provisioning); can start in parallel with Auth for the compose/service layer |
| **Content updates** | §6 delta audit — guides re-centering, `/docs` hosting-messaging **removal** (Q9), room terminology, minimal homepage/features/community deltas | After product model is implemented (copy must match live behavior) |

Out of scope for all of the above (per whitepaper phases): Companies and Opportunities screens
(Phase 2/3), events platform (never core, §1), custom chat UI (D4), AI collaboration (Phase 4),
federation beyond the matrix.org fallback (Phase 5).

---

## 8. Product Sign-Off — Open Questions Answered (Q1–Q10)

The questions below were **open for product sign-off** at initial authoring (TASK-323, which
deliberately provided **no recommended defaults**). All ten were **answered by product sign-off
on 2026-08-15** (TASK-324). Each answer is a **locked input** for the deferred sprints (§7) —
later sprints implement these answers verbatim. The sign-off supersedes the "questions only"
state: where a question referenced a §6 delta direction, that direction has been updated in the
body of this document.

- **Q1 — Explore data source & indexation.** What is the initial population of Explore
  (People / Ideas / Groups / Projects)? Are Explore results and public pages indexable/searchable
  by default, or do creators opt in to public visibility?
  **Answer:** the initial population of Explore is the **current generated content** (the
  Sprint 11/12 SEO content engine's location/variant/guide content) — no user-generated seed is
  required before the Explore/Content sprints. Explore results and public pages are
  **indexable/searchable by default**; **creators can opt out** of public visibility.

- **Q2 — Join semantics.** Does joining require an account (Auth) always, or can a visitor join
  a room anonymously/link-only for the MVP? What happens to a join when the room is archived
  (D2 archive) — is membership preserved?
  **Answer:** **anonymous join is allowed for the MVP** — a visitor can join a room via
  link/invite without an Auth account. **Membership is preserved when the room is archived**
  (archiving does not drop members).

- **Q3 — Room naming and URL scheme.** What is the public URL scheme for Idea/Group/Project
  pages and their rooms (e.g. `/idea/<slug>`, `/group/<slug>`, `/project/<slug>`)? Do public
  pages mirror the Sprint 11/12 `/location/<country>/<region>/<city>` pattern or use a
  flat object namespace?
  **Answer:** the URL scheme is **deferred to an architect** (a dedicated URL-scheme design
  task before the Explore/Public-page sprints), with a **leaning preference for a flat object
  namespace**: `/idea/<slug>`, `/group/<slug>`, `/project/<slug>` — not the nested
  `/location/<country>/<region>/<city>` pattern.

- **Q4 — `meetup` group-type label.** The SEO taxonomy label for the `meetup` group type is
  "Community meetups & events". With the clarified model (in-person downstream), should this
  label change, and if so to what?
  **Answer:** the **`meetup` group-type label stays** — "Community meetups & events" is
  unchanged. Connections, group chat, and coordination continue to flow through Matrix/Element;
  the label is a group-type taxonomy label, not a product-model claim.

- **Q5 — Feed composition.** Does the Feed screen aggregate only rooms the member belongs to,
  or also public discovery content? What post types (updates, opportunities, events,
  announcements) are in MVP feed scope?
  **Answer:** the Feed screen aggregates **room content PLUS public discovery content**. All
  post types are in MVP feed scope: **updates, opportunities, events, announcements**.

- **Q6 — Room ↔ object lifecycle.** When an Idea/Group/Project is archived or deleted in
  JoinOrigin, what happens to its Matrix room/Space (retain-and-lock, rename-with-suffix, or
  remove)? Who may trigger it — only the creator/room owner?
  **Answer:** on archive/delete the **creator/room owner has full control** over the object's
  room (no platform-imposed action). The MVP **may offer a prompt** (retain-and-lock /
  rename-with-suffix / remove) but keeps it **minimal for MVP** — expanded later.

- **Q7 — Space structure for Communities.** For a Community (Space), is the MVP structure
  "one Space + one main room", or "one Space + main room + per-object rooms" from day one? When
  does a sub-object (Idea/Project) inside a community get its own room vs. using the main room?
  **Answer:** **one Space + one main room for the MVP** (matches the whitepaper Initial MVP:
  Communities + chat + feed). Sub-object (Idea/Project) rooms are **added naturally as
  sub-objects are published** — D1 auto-creation applies per object, so each published
  sub-object gets its own room rather than sharing the main room.

- **Q8 — Element embedding depth.** Is Element embedded inline in the JoinOrigin web app
  (iframe/embedded client) or opened as a separate window/app from the JoinOrigin app (deep
  link)? The same question applies on mobile (embedded SDK vs. handoff to the Element app).
  **Answer:** Element is opened via **DEEP LINK** — **no inline embed** on **web and mobile**.
  The JoinOrigin app hands off to Element (Element Web in a new context/tab on web; the Element
  mobile app on iOS/Android). No embedded SDK/iframe in the MVP (see §4.2/D4).

- **Q9 — Self-host messaging.** The `/docs` disambiguation (6.2) will state the product is
  hosted while the open-source stack self-hosts components (Plausible, Synapse). Is that the
  intended public framing, and should the FAQ gain a "Can I self-host?" entry about the
  reference stack?
  **Answer:** **REMOVE self-host/hosting messaging from public copy entirely** (defer; revisit
  later). Product copy should not discuss hosting; the open-source reference stack note may
  remain in **internal docs only**. Public marketing/docs copy drops hosting talk — this changes
  §6.2's delta direction from *disambiguate* to *remove*.

- **Q10 — Notifications.** Are notifications (Matrix push) part of the MVP room surface, or do
  they arrive in a later sprint? Who controls notification defaults — user or room owner?
  **Answer:** notifications are **deferred to a later sprint** — Matrix push is not part of the
  MVP room surface. (Control of notification defaults is likewise deferred with them.)

---

## 9. Document Consistency & Sources

This document is consistent with the locked planning decisions (Sprint 13 planning session,
2026-08-15) and with the **product sign-off on §8 (Q1–Q10, 2026-08-15, TASK-324)**, and with:

- **`app/docs/ORIGIN-WHITEPAPER.md`** — Core Objects, Communication Architecture (Matrix),
  Matrix Mapping, Matrix/JoinOrigin Responsibilities, Initial MVP, Phases.
- **`/features` screen** (`features-view.tsx` + `en.json` `common.objects.*`) — the eight core
  objects and roadmap phases.
- **`sprint-11-seo-content-engine.md`** — the URL scheme, group-type taxonomy, and idea-page
  variant that D3 reuses.
- **Sprint 12 merged master (`ff79314`)** — the SEO content engine, 7 guides, `/docs` FAQ
  copy, and docker-compose Plausible pattern that §4/§6 build on.

**Status:** design contract only — zero implementation files edited by this role.
