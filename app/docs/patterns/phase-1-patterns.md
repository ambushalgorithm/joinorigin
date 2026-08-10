# JoinOrigin Phase 1 — Community Foundation (MVP) — Architecture Patterns

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md) (Phase 1), [ARCHITECTURE.md](../ARCHITECTURE.md) (UWP skeleton), [WHITEPAPER.md](../WHITEPAPER.md)

## 1. Phase Overview

**Goal:** Create a network where people can join, communicate, and build relationships.

**Success Metric:** Users join communities and communicate regularly. Phase 1 is not about building features — it is about building relationships. If people are not joining communities and talking every day, nothing in Phases 2–5 matters. The network must come first.

**Features in scope:**

| Feature | Description |
|---|---|
| Authentication | Sign up, login, session management |
| User Profiles | Identity, experience, interests, skills |
| Communities | Groups organized around interests, industries, goals |
| Real-Time Chat | Community rooms via Matrix |
| Direct Messages | One-to-one and small-group Matrix messaging |
| Basic Feed | Posts, updates, discussions |
| Community Discovery | Browse, search, join communities |

**Tech stack (from ORIGIN-WHITEPAPER.md):** React + TypeScript + Tailwind + PWA (frontend); Node.js + NestJS + PostgreSQL + Redis (backend); Matrix Protocol + Matrix Homeserver + embedded Matrix client UI (communication); Docker + Docker Compose + Caddy + Hetzner (infrastructure).

---

## 2. Long-Term Stable Architecture Patterns

The patterns in this section are **binding for all five phases**. They are derived from the Universal Worker Platform (UWP) skeleton (`app/docs/ARCHITECTURE.md`) and are the stable substrate on which every later phase builds. Later phase documents extend these patterns; they never replace them.

### PAT-1.1 Strict Six-Layer Contract-Driven Architecture

**Intent:** Keep dependency flow acyclic and one-way so the platform can grow to global scale without rework.

**Context:** JoinOrigin will evolve from a chat-plus-feed MVP to a federation-ready social operating system. Layers that leak implementation details upward become impossible to swap later.

**Solution (from UWP skeleton §1–§4):**

```
┌──────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER (L6)   React PWA, web UI, embedded client   │
│                           imports ONLY Platform Contracts      │
├──────────────────────────────────────────────────────────────┤
│  WORKER PLATFORM (L5)    NestJS services, governance, memory,  │
│                          planning, contracts                   │
│                           depends on ServiceProviderContracts  │
├──────────────────────────────────────────────────────────────┤
│  PLATFORM SERVICES (L4)  PostgreSQL, Redis, Matrix, storage,   │
│                          search, vectors, email                │
│                           implements ServiceProviderContracts  │
├──────────────────────────────────────────────────────────────┤
│  AUTOMATION & DELIVERY (L3)  CI/CD — orthogonal, dormant in    │
│                              production                        │
├──────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE (L2)     Docker, networking, volumes,          │
│                          observability                         │
├──────────────────────────────────────────────────────────────┤
│  DEPLOYMENT (L1)         Caddy, Hetzner, env definitions,      │
│                          secrets                                │
└──────────────────────────────────────────────────────────────┘
```

**Design rules (binding):**
- DEP-01: Application imports contracts only — never provider libraries.
- DEP-03/04: Worker Platform depends on `ServiceProviderContract`, never on a concrete provider (e.g., `pg` client, `redis` client).
- DEP-10: Contracts live in the layer that defines them, never in the consumer.
- GATE-01/02: No application file imports a Platform Services file; no platform file imports a provider-specific library.

**Consequences:** Every cross-layer interaction goes through a stable interface. Swapping PostgreSQL for MySQL, or the Matrix homeserver for a native chat service, requires a provider change only — zero application changes.

**UWP mapping:** Layer model, dependency rules DEP-01…DEP-10, contract validity gates GATE-01…GATE-10 from `ARCHITECTURE.md` §2–§4, §11.

---

### PAT-1.2 Provider Registry (Services Are Swappable by Configuration)

**Intent:** No JoinOrigin feature may depend on a concrete service implementation.

**Solution:** A runtime `ProviderRegistry` maps contract → implementation at startup. In Phase 1 the registry binds: `DatabaseProvider → PostgreSQL`, `CacheProvider → Redis`, `QueueProvider → BullMQ`, plus a `CommunicationProvider → Matrix`. Future phases add storage, search, vector, and email providers without touching application code.

**Design rules:**
- GATE-04: Provider Registry is the ONLY mechanism for resolving service implementations.
- Registration is declarative (config/registry), never hardcoded per feature.
- Health/readiness/metrics endpoints are mandatory for every provider (GATE-INT-01).

**Consequences:** Phase 2+ service additions (OpenSearch, S3, PostHog) are drop-in provider registrations. Migration risk is contained at the registry boundary.

---

### PAT-1.3 Social Graph Is the Product; Communication Is a Provider

**Intent:** Keep the network of people and relationships as the primary asset, while treating chat as infrastructure.

**Solution (from ORIGIN-WHITEPAPER.md):** JoinOrigin owns identity, profiles, communities, feed, reputation, discovery, and the social graph. Matrix provides DMs, community chat, presence, group messaging, and notifications.

```
JoinOrigin User      →  Matrix User
JoinOrigin Community →  Matrix Space
JoinOrigin Chat Room →  Matrix Room
```

**Design rules:**
- The communication layer is accessed through `CommunicationProvider`; the app never talks to the Matrix homeserver directly.
- The social graph (memberships, follows, memberships) lives in PostgreSQL under JoinOrigin ownership — it is the source of truth.
- Matrix state is a projection; on homeserver failure, the social graph remains intact.

**Consequences:** Chat can be replaced, federated, or augmented (Phase 5 federation) without rewriting the social graph. This is the single most important stability decision in Phase 1.

---

### PAT-1.4 Context as a First-Class Asset (Six Memory Domains)

**Intent:** Every user, community, and session keeps durable context that outlives any single request, worker, or model.

**Solution (from UWP skeleton §6.2):**

| Domain | Phase 1 instantiation | Lifecycle |
|---|---|---|
| User Memory | Profile, preferences, permissions | Permanent |
| Project Memory | Community goals, conventions | Community lifetime |
| Session Memory | Ephemeral per-interaction context | 24h idle → archive |
| Task Memory | Feed-post, message processing state | Short-lived |
| Knowledge Memory | Platform patterns, heuristics | Never deleted |
| Artifact Memory | Posts, uploads, generated content | Immutable after finalize |

**Design rules:**
- Context is stored in model-agnostic formats with provenance tracking.
- Workers/services access context only through the Context Contract interface.
- Snapshots are taken at task assignment to prevent drift during execution.

**Consequences:** Phase 4 AI assistants inherit complete community context without a rebuild; the "context outlives models" principle is established from day one.

---

### PAT-1.5 Governance at Every Layer

**Intent:** Authorization, audit, and resource limits are enforced independently at each layer — never centralized in scattered checks.

**Solution (from UWP skeleton §6.3):** Gateway (authN, rate limit, TLS), Orchestrator (authZ, quotas, approvals), Worker/Service Runtime (resource enforcement), Memory (scope validation, encryption), Tool Registry (allowlist, per-tool rate limit).

**Phase 1 RBAC model:**
- Deny-by-default: no explicit allow → denied.
- Explicit deny overrides allow.
- Resource URNs: `urn:jo:{tenant}:{community}:{resource-type}:{resource-id}`.
- Audit log: append-only, tamper-evident, hash-chained.

**Design rules:**
- GATE-08: All governed endpoints require Bearer token authentication.
- Every mutation to profile/community/feed is audited.
- Approval gates introduced in Phase 3 for sensitive operations (formation, payments).

**Consequences:** Community moderation (Phase 2+), company formation approvals (Phase 3), and AI action authorization (Phase 4) all use the same governance machinery.

---

### PAT-1.6 Workspace Isolation and Artifact Extraction

**Intent:** All background work (feed indexing, notification fan-out, image processing) runs in isolated, ephemeral workspaces; only declared outputs persist.

**Solution (from UWP skeleton §6.1):** Workers run in containers with CPU/memory/disk/network limits, read-only root filesystem, no host network, capabilities dropped; artifacts extracted from `/workspace/artifacts/`; workspace destroyed on completion.

**Design rules:**
- No worker writes to persistent state outside the artifact pipeline.
- Secrets are injected at invocation time, never stored in the workspace.

**Consequences:** Background processing in every phase runs safely; a compromised job cannot touch the social graph or other tenants.

---

### PAT-1.7 Self-Documenting Repository and Root Minimalism

**Intent:** Any fresh agent or engineer can navigate the entire platform by reading ≤ 3 files.

**Solution (from UWP skeleton §7):**
- Root holds only `AGENTS.md` (auto-discovery entry point); everything else lives under `app/`.
- Every directory has a `README.md` with breadcrumb header, purpose, directory map, contracts, navigation footer.
- One canonical definition per concept; all other references are links.

**Design rules:**
- GATE-06: Every component directory has a README.md.
- No numeric prefixes, no dates in filenames; `kebab-case` directories, `SCREAMING_SNAKE_CASE` for core docs.

**Consequences:** The pattern docs you are reading, and every future component, stay discoverable and coherent across all five phases.

---

### PAT-1.8 Single Source of Truth per Aggregate

**Intent:** Each core object (User, Community, Post, Membership) has exactly one owning service and one canonical store.

**Solution:** NestJS modules own their aggregate in PostgreSQL; other modules read via the owning module's contract, never by direct table access. Feeds are materialized read models derived from events.

**Design rules:**
- One aggregate root per write path (e.g., `CommunityService` owns communities).
- Cross-aggregate reads go through contract APIs, not shared DB access.
- Event-driven propagation (via queue) for projections such as the feed.

**Consequences:** Phase 2 Projects/Teams and Phase 3 Companies slot in as new aggregates without entangling existing write paths.

---

## 3. Detailed Design Decisions — Phase 1

Decision records are binding for the phase and long-term stable unless explicitly superseded in a later phase doc.

### ADR-1.1 Adopt Matrix as the Communication Layer

| | |
|---|---|
| **Decision** | Use Matrix (open protocol, self-hosted homeserver, embedded Matrix client UI) for real-time chat, DMs, presence, notifications. |
| **Alternatives** | Build native WebSocket chat; use Discord/ Slack-style hosted APIs; use XMPP. |
| **Rationale** | Open protocol, decentralized, mature ecosystem, self-hostable, E2EE, mobile support, long-term flexibility. Communication is not the product — the social graph is. Matrix gives Phase 5 federation for free. |
| **Superseded by** | Never — core strategic decision. |

### ADR-1.2 NestJS + TypeScript Monolith-First with Module Boundaries

| | |
|---|---|
| **Decision** | Backend is a NestJS monolith with strict module boundaries mirroring the UWP six-layer model; no microservices in Phase 1. |
| **Alternatives** | Microservices from day one; serverless functions; Go/Java backend. |
| **Rationale** | Matches the whitepaper stack (Node.js, NestJS, TypeScript); single deployable keeps the MVP fast while contract boundaries preserve the future split option. The Provider Registry keeps services swappable without physical separation. |
| **Superseded by** | Module-boundary contract remains; physical decomposition possible in Phase 5 if telemetry demands it. |

### ADR-1.3 PostgreSQL as Primary Store, Redis as Cache/Queue Backing

| | |
|---|---|
| **Decision** | PostgreSQL (with pgBouncer pooling) is the source of truth for the social graph; Redis backs cache, rate limiting, and BullMQ queues. |
| **Alternatives** | MySQL, Mongo, in-memory only. |
| **Rationale** | Relational integrity for memberships/follows; ACID transactions for the social graph; Redis is the UWP reference cache/queue provider. |
| **Superseded by** | Phase 2 adds OpenSearch for search and S3 for objects; PostgreSQL remains the system of record. |

### ADR-1.4 PWA-First Frontend on React + TypeScript + Tailwind

| | |
|---|---|
| **Decision** | Frontend is a Progressive Web App (React, TypeScript, Tailwind) with an embedded Matrix client UI; React Native planned for mobile later. |
| **Alternatives** | Native mobile first; server-rendered pages only. |
| **Rationale** | Single codebase for web+mobile reach; installable PWA maximizes day-one engagement; matches whitepaper stack. |
| **Superseded by** | Phase 5 multi-language and federation extend the same frontend; no rewrite. |

### ADR-1.5 Docker Compose + Caddy + Hetzner as the Deployment Target

| | |
|---|---|
| **Decision** | Ship as Docker Compose services with Caddy as TLS/ingress edge, deployed to a Hetzner VM. |
| **Alternatives** | Kubernetes from day one; managed PaaS. |
| **Rationale** | Zero host dependencies; cheap, predictable single-node start; Caddy provides automatic TLS and the gateway authN layer. UWP infra layer keeps the migration path to K8s open (Phase 5). |
| **Superseded by** | Phase 5 adds multi-region/K8s manifests; compose remains the local-dev contract. |

### ADR-1.6 Feeds as Materialized Read Models

| | |
|---|---|
| **Decision** | The feed is a projection updated via queue events (BullMQ), not a live query over the social graph. |
| **Alternatives** | Direct SQL joins per feed request. |
| **Rationale** | Feed read traffic dominates; materialized projections keep reads O(1)-ish and isolate feed spikes from write path. |
| **Superseded by** | Phase 2 replaces the feed projection source with OpenSearch-derived rankings; pattern unchanged. |

### ADR-1.7 URN-Based Resource Addressing from Day One

| | |
|---|---|
| **Decision** | Every resource is addressed by `urn:jo:{tenant}:{community}:{type}:{id}` from the first schema. |
| **Alternatives** | Numeric IDs only; UUIDs without tenant scoping. |
| **Rationale** | Enables tenancy, audit, and cross-community addressing in later phases without a migration. |
| **Superseded by** | Extended with company/opportunity types in Phase 3. |

### ADR-1.8 AuthN via OIDC/OAuth with Bearer Tokens at the Gateway

| | |
|---|---|
| **Decision** | Authentication uses OIDC/OAuth 2.0 flows; all governed endpoints require Bearer tokens (GATE-08). |
| **Alternatives** | Session cookies only; no gateway authN. |
| **Rationale** | UWP gateway contract (authN at the edge, authZ deeper); token-based auth scales to mobile PWA and Phase 5 open APIs. |
| **Superseded by** | Phase 3 adds Passkeys/WebAuthn as a second factor/provider. |

---

## 4. Phase Gate

- Users can sign up, build profiles, join communities, post to a feed, and chat in real time (rooms + DMs via Matrix).
- All traffic flows through the six-layer contract boundaries; no provider library leaks above Layer 4.
- Provider Registry resolves PostgreSQL, Redis, BullMQ, and Matrix providers at startup.
- Audit log records every governed mutation; deny-by-default RBAC is enforced.
- `git clone + docker compose up` produces a fully operational Phase 1 environment with zero host dependencies.

---

## 5. Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Next:** [phase-2-patterns.md](phase-2-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [GOVERNANCE.md](../GOVERNANCE.md)
