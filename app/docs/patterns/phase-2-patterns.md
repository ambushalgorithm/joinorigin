# JoinOrigin Phase 2 — Collaboration Layer — Architecture Patterns

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md) (Phase 2), [ARCHITECTURE.md](../ARCHITECTURE.md) (UWP skeleton), [phase-1-patterns.md](phase-1-patterns.md)

## 1. Phase Overview

**Goal:** Transform communities into active collaboration networks.

**Success Metric:** Communities create projects and recruit members. Conversations from Phase 1 convert into structured collaboration.

**Features in scope:**

| Feature | Description |
|---|---|
| Projects | Collaborative initiatives with members, tasks, discussions, goals |
| Teams | Sub-groups within communities/projects |
| Events | Meetings, hackathons, workshops |
| Opportunity Boards | Jobs, partnerships, investments, contracts |
| Co-Founder Matching | Suggest complementary members for ventures |
| Member Reputation | Contribution signals, endorsements |
| Enhanced Search | Full-text + faceted search across people, posts, projects |

**Additional technology (from ORIGIN-WHITEPAPER.md):** OpenSearch (search), S3-compatible object storage (files), push + email notifications, PostHog (analytics).

---

## 2. Long-Term Stable Architecture Patterns

Phase 2 patterns inherit every Phase 1 pattern (PAT-1.1 … PAT-1.8). The following patterns are added or deepened in this phase and remain stable through Phases 3–5.

### PAT-2.1 Aggregates Grow by Composition, Not Inheritance

**Intent:** Projects, Teams, Events, and Opportunities attach to the existing social graph without rewriting Phase 1 aggregates.

**Solution:** Each new object is its own aggregate root owned by its own NestJS module behind a contract (PAT-1.8). Cross-aggregate relationships (Project → Community, Team → Project, Opportunity → Community) are edges in the social graph, not foreign keys scattered across feature code.

**Design rules:**
- A new aggregate MUST register its own module and contract; it MUST NOT reach into another aggregate's tables.
- Membership/ownership is expressed as graph edges with URN addressing (`urn:jo:{tenant}:{community}:project:{id}`).
- Project lifecycle reuses the UWP task-lifecycle state machine shape (CREATED → … → COMPLETED / ARCHIVED).

**Consequences:** Phase 3 companies and Phase 5 cross-community collaboration are added as more aggregates with zero changes to Phase 1/2 write paths.

---

### PAT-2.2 Search Index as a Projection (OpenSearch)

**Intent:** Search must be fast, faceted, and consistent with the social graph without loading the primary database.

**Solution:** OpenSearch is a `SearchProvider` implementing `ServiceProviderContract:Search`. The social graph publishes domain events; a search projection service consumes them (via the BullMQ queue) and maintains the index.

**Design rules:**
- The primary store remains the source of truth; the index is always rebuildable from event history.
- Faceted fields (skills, location, community, project type) are first-class in the index schema from day one.
- Search is read-only; all writes flow through the owning aggregate.
- Delete/tombstone events must reach the index (no orphaned documents).

**Consequences:** Phase 3 talent marketplace and Phase 4 AI knowledge search reuse the same index pipeline with new document types — no new search machinery.

---

### PAT-2.3 Notifications via Outbox + Queue Fan-Out

**Intent:** Reliable, ordered, at-least-once delivery of push and email notifications without coupling senders to delivery infrastructure.

**Solution:** The UWP outbox pattern: every notifiable mutation writes a notification event to an outbox table in the same transaction as the mutation; a dispatcher reads the outbox and publishes to BullMQ; consumers send via push provider and email provider (both behind contracts).

**Design rules:**
- Outbox write is transactional with the source mutation (no lost notifications on crash).
- Delivery is at-least-once; consumers are idempotent by event ID.
- Preferences (push vs email, frequency, per-community mute) are User Memory — never hardcoded.
- Email provider implements `ServiceProviderContract:Email`; push provider is a new contract.

**Consequences:** Phase 3 workflow events (formation steps) and Phase 4 AI-generated digests reuse the same fan-out with zero changes to the outbox machinery.

---

### PAT-2.4 Object Storage Behind a Contract (S3-Compatible)

**Intent:** Files (avatars, attachments, project docs) live in S3-compatible storage accessed only through `ServiceProviderContract:ObjectStore`.

**Solution:** MinIO (or Backblaze/R2/Cloudflare) as the reference provider; presigned URLs for direct upload/download so file traffic never proxies through the API tier.

**Design rules:**
- Applications never read/write bucket keys directly — only via the ObjectStore contract.
- Object keys are content-addressed or versioned (`{tenant}/{type}/{id}/{version}/{sha}`) to support Phase 3 document versioning.
- Access is governed: presigned URLs are short-lived and scoped to the requesting principal's URN.
- Malware/type scanning is a platform service, not per-feature.

**Consequences:** Phase 3 document management and Phase 5 open APIs reuse the same storage contract; provider swap (MinIO → R2) is configuration-only.

---

### PAT-2.5 Reputation as a Derived Read Model

**Intent:** Reputation must be transparent, auditable, and cheap to read while remaining immune to write-path corruption.

**Solution:** Reputation is computed from events (contributions, endorsements, community roles, project completions) into a materialized read model. The event log is the source of truth; the reputation store is a projection (same machinery as PAT-2.2).

**Design rules:**
- Reputation scores are derived, never user-editable directly.
- Every reputation input is an auditable event with provenance.
- Score weights are configuration (governance policy), not code.
- Community-level reputation is scoped per community; global reputation aggregates communities.

**Consequences:** Phase 5 "advanced reputation systems" extends the same event→score pipeline with new signals; nothing in the core changes.

---

### PAT-2.6 Matching as an Offline, Batched, Re-runnable Job

**Intent:** Co-founder matching and opportunity recommendations are best-effort, explainable, and re-runnable — never blocking interactive flows.

**Solution:** Matching runs as a UWP worker job (scheduled via queue): it reads profiles/opportunities, computes compatibility signals, and writes match candidates back to a materialized table consumed by the UI. Inputs include skills, interests, community overlap, and (Phase 2 optional) simple embeddings.

**Design rules:**
- Matching jobs are idempotent and re-runnable (same inputs → same candidates).
- Every candidate carries the signal breakdown for explainability ("matched on Rust + startup interest in AI Builders").
- Candidates are approval-gated before surfacing (respect privacy expectations — see ADR-2.6).

**Consequences:** Phase 4 AI opportunity matching upgrades the signal source (embeddings, LLM scoring) behind the same job pattern.

---

### PAT-2.7 Analytics as an Orthogonal Event Stream (PostHog)

**Intent:** Product analytics must not couple to domain code or slow the write path.

**Solution:** PostHog is an `AnalyticsProvider` contract; domain modules emit analytics events on the queue; a consumer forwards them to PostHog. Domain code never blocks on analytics delivery.

**Design rules:**
- Analytics events are emitted, not awaited; delivery is best-effort.
- PII is minimized/consented at the source per governance policy.
- Metrics dashboards are derived from the analytics store, not the social graph.

**Consequences:** Phase 5 open API usage metrics and reputation analytics reuse the same stream.

---

## 3. Detailed Design Decisions — Phase 2

### ADR-2.1 OpenSearch over PostgreSQL FTS

| | |
|---|---|
| **Decision** | Full-text + faceted search implemented with OpenSearch as a projection (PAT-2.2). |
| **Alternatives** | PostgreSQL full-text search; Elasticsearch; Algolia SaaS. |
| **Rationale** | OpenSearch is the UWP reference SearchProvider; rich faceting; self-hosted fits the open-architecture principle; projection keeps primary DB load bounded. |
| **Superseded by** | Phase 4 adds Qdrant for vector similarity; OpenSearch remains for lexical/faceted search. |

### ADR-2.2 BullMQ on Redis as the Event Backbone

| | |
|---|---|
| **Decision** | BullMQ (Redis-backed) is the queue for outbox dispatch, projections, notifications, and matching jobs. |
| **Alternatives** | Kafka; RabbitMQ; in-process async. |
| **Rationale** | Matches UWP QueueProvider (BullMQ); one Redis already exists from Phase 1; sufficient throughput for Phase 2; Kafka path remains open behind the queue contract if Phase 5 telemetry demands it. |
| **Superseded by** | Only if cross-region streaming (Phase 5) requires Kafka — behind the same contract. |

### ADR-2.3 Projects/Teams/Events Live Inside the Community Graph

| | |
|---|---|
| **Decision** | Projects, teams, and events are aggregates scoped to a community (URN `urn:jo:{tenant}:{community}:project:{id}`), not global objects. |
| **Alternatives** | Global project entities with community membership tables. |
| **Rationale** | Communities are the primary organizational unit (whitepaper principle); scoped URNs keep governance, tenancy, and discovery simple; cross-community collaboration in Phase 5 re-roots the edge, not the aggregate. |
| **Superseded by** | Phase 5 cross-community collaboration (ADR-5.x) adds edges across community boundaries. |

### ADR-2.4 Reputation Starts Event-Sourced, Not Score-Only

| | |
|---|---|
| **Decision** | Persist reputation-relevant events (contribution, endorsement, completion) and derive scores. |
| **Alternatives** | Direct score columns updated in place. |
| **Rationale** | Auditability and Phase 5 advanced reputation need the event history; deriving scores is cheap at Phase 2 scale and the machinery is already needed for search projections. |
| **Superseded by** | Extended, not replaced, in Phase 5. |

### ADR-2.5 Email and Push via Contracts with Idempotent Consumers

| | |
|---|---|
| **Decision** | Notification delivery implemented as idempotent consumers behind `ServiceProviderContract:Email` and a push contract; outbox guarantees delivery. |
| **Alternatives** | Direct SMTP/FCM calls from feature code. |
| **Rationale** | Keeps features provider-agnostic; idempotency prevents duplicate emails on retry; aligns with GATE-10 (no direct external calls from workers). |
| **Superseded by** | Phase 4 AI digests reuse the same consumers. |

### ADR-2.6 Privacy by Default in Matching

| | |
|---|---|
| **Decision** | Co-founder matching and opportunity suggestions require explicit discoverability preferences; matching never reveals private data to non-mutual parties without consent. |
| **Alternatives** | Match everything visible by default. |
| **Rationale** | "People first" and user sovereignty principles; reduces spam and trust erosion; aligns with governance deny-by-default. |
| **Superseded by** | Phase 4 AI matching inherits the same consent model. |

---

## 4. Phase Gate

- Communities create projects, form teams, run events, and publish opportunities.
- Search (OpenSearch projection) indexes people, posts, projects, and opportunities with facets.
- Notifications deliver via outbox → queue → push/email, idempotent and preference-aware.
- Files upload/download via presigned S3 URLs; no file traffic through the API tier.
- Reputation derives from auditable events.
- PostHog analytics stream flows without blocking the write path.
- No Phase 1 pattern or contract was violated in the Phase 2 implementation (gates GATE-01…GATE-10 hold).

---

## 5. Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Prev:** [phase-1-patterns.md](phase-1-patterns.md)
- **Next:** [phase-3-patterns.md](phase-3-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md)
