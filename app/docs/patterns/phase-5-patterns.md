# JoinOrigin Phase 5 — Global Collaboration Network — Architecture Patterns

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md) (Phase 5), [ARCHITECTURE.md](../ARCHITECTURE.md) (UWP skeleton), [phase-1-patterns.md](phase-1-patterns.md)…[phase-4-patterns.md](phase-4-patterns.md)

## 1. Phase Overview

**Goal:** Become the default platform for forming communities, projects, companies, and opportunities.

**Success Metric:** JoinOrigin becomes a self-sustaining ecosystem where relationships continuously generate new projects, companies, and opportunities.

**Features in scope:**

| Feature | Description |
|---|---|
| Global Communities | Communities operating across regions/languages |
| Multi-Language Support | i18n/l10n for UI, content, and AI |
| Advanced Reputation Systems | Portable, multi-signal reputation |
| Cross-Community Collaboration | Projects/companies spanning communities |
| Open APIs | Public, versioned, governed APIs |
| Federation & Decentralized Identity | Interoperability with other instances/standards |

---

## 2. Long-Term Stable Architecture Patterns

Phase 5 inherits every Phase 1–4 pattern. It adds openness, federation, and scale patterns — the final stable layer of the platform.

### PAT-5.1 Open, Versioned, Governed API Surface

**Intent:** The platform's value compounds when third parties can build on it — but only with governance, rate limits, and version stability.

**Solution:** Public APIs are versioned (`/api/v1/` … per GATE-07), documented via OpenAPI 3.1, and exposed through the API gateway. API access is granted via API keys/tokens issued through governance, with per-key rate limits, quotas, and audit. The Tool Registry serves as the discovery surface for public endpoints.

**Design rules:**
- Versioning is URI-based; breaking changes require a new version, never in-place mutation.
- Every public endpoint is governed (authN + authZ + rate limit + audit) — no ungoverned read paths.
- Pagination, idempotency keys, and error contracts are uniform across APIs.
- Public APIs never expose internal URNs/ledger internals; a public contract maps them.

**Consequences:** The same governance machinery that protects human/AI actions protects the open ecosystem; audit covers external consumers.

---

### PAT-5.2 Federation via Open Protocols

**Intent:** JoinOrigin must interoperate with other instances and standards — user sovereignty over lock-in.

**Solution:** Federation builds on the Phase 1 Matrix decision (PAT-1.3): Matrix federation already joins rooms/spaces across homeservers. The social graph gains federation edges (memberships, follows, shared communities) via ActivityPub-compatible or Matrix-federated events. Federated entities are addressed by global URNs with instance scoping (`urn:jo:instance:{instance-id}:community:{id}`).

**Design rules:**
- Federated data is replicated only as projections; each instance's social graph remains sovereign.
- Federation events are governed: remote requests carry credentials; deny-by-default for unknown instances.
- Outbound federation is opt-in per community/company (sovereignty).
- Conflict resolution follows instance-local authority (the instance that owns the aggregate wins).

**Consequences:** The network grows without centralizing; Phase 4 AI agents can operate on federated data behind the same contracts.

---

### PAT-5.3 Decentralized Identity (DIDs/Verifiable Credentials)

**Intent:** Users own their identity and can prove attributes (skills, reputation, memberships) across platforms without account silos.

**Solution:** The AuthProvider abstraction (ADR-1.8, ADR-3.5) extends with a Decentralized Identity provider: users hold DIDs; the platform issues/verifies Verifiable Credentials (VCs) for reputation, memberships, and contributions. The ledger (PAT-3.3) can issue verifiable claims without exposing private equity.

**Design rules:**
- DID resolution and VC verification are provider-behind-contract operations.
- VCs are user-held; JoinOrigin signs claims, users present them elsewhere.
- Privacy: claims are selective-disclosure; no global identifier dumps.
- Audit logs verification events (who verified which claim, when).

**Consequences:** Reputation and identity become portable (whitepaper "portable identities"); lock-in is avoided by design.

---

### PAT-5.4 Advanced Reputation as Portable, Multi-Signal Scores

**Intent:** Reputation must be nuanced, portable, and trustworthy — not a single like-count.

**Solution:** The Phase 2 event-derived reputation (PAT-2.5) extends with: multi-signal scoring (contribution quality via PAT-4.6 evaluation, verified skills via VCs, community tenure, project outcomes), cross-community aggregation, and decay/recency weighting. Scores are verifiable claims that users can present externally via VCs.

**Design rules:**
- Score components are transparent and configurable (governance policy).
- Global reputation is an aggregation of scoped scores, never a secret black box.
- Reputation claims are signed (audit chain) so they can be verified without joining JoinOrigin.
- Anti-gaming: evaluation feedback loop and human review sample (PAT-4.6) feed anomaly detection.

**Consequences:** Trust crosses instance boundaries; the moat is the relationship graph, not proprietary data.

---

### PAT-5.5 Cross-Community Collaboration via Edges, Not New Aggregates

**Intent:** Projects and companies spanning communities must work without duplicating aggregates.

**Solution:** The Phase 2/3 aggregates (PAT-2.3, ADR-2.3) keep their owning community/company; cross-community collaboration adds graph edges between aggregates and shared projections (search, knowledge, artifacts). A project in Community A can draw members from Community B through governed membership edges.

**Design rules:**
- Each aggregate retains exactly one owner; cross-community links are edges with provenance.
- Shared projections (search, RAG) compose scoped data under each requester's permissions.
- Governance scope applies per edge: a cross-community member has exactly the grants granted, no implicit transitive access.

**Consequences:** Global communities and federated collaboration reuse existing machinery; no aggregate re-architecture.

---

### PAT-5.6 Multi-Language as a Platform Concern

**Intent:** Global adoption requires i18n/l10n across UI, content, notifications, and AI — without per-feature translation hacks.

**Solution:** Internationalization is a platform service: UI strings via standard i18n catalogs; user content via translation provider (human or AI behind ModelProvider with quality gates); AI responses generated in the user's language. Language preference is User Memory (PAT-1.4).

**Design rules:**
- All user-facing strings route through i18n catalogs from day one; no hardcoded strings in features.
- Translation is a provider behind a contract; AI translation uses the same governance/cost controls as other model calls (ADR-4.4).
- Locale affects search ranking (language-aware facets) and notification formatting.

**Consequences:** New languages join by catalog + provider; AI stays coherent across languages via the memory domains.

---

### PAT-5.7 Scale and Multi-Region Operations

**Intent:** Global growth requires horizontal scale, regional deployment, and resilience — without breaking the portable, self-documenting architecture.

**Solution:** The Deployment layer (L1) adds multi-region manifests (Kubernetes) alongside the Phase 1 Docker Compose contract (ADR-1.5). Stateless services scale horizontally; the social graph shards by tenant/region; observability (Prometheus/Loki/Tempo) provides cross-region visibility. The Provider Registry resolves region-local providers (e.g., regional S3/Qdrant).

**Design rules:**
- Regional deployment is configuration, not code: same image, region-specific provider bindings.
- Data residency is a governance policy (which regions hold which tenants' data).
- The compose dev contract remains the local standard; K8s is an additional target, not a replacement.
- Cross-region queues/streams use the queue contract (Kafka path if needed, ADR-2.2).

**Consequences:** The platform scales by adding regions; the six-layer architecture and contracts remain untouched.

---

### PAT-5.8 Ecosystem Self-Sustainability Loop

**Intent:** The network must continuously generate new projects, companies, and opportunities from existing relationships.

**Solution:** The UWP feedback loop (Planning → Tasks → Workers → Artifacts → Evaluation → Knowledge → Better Planning) applies at the network level: opportunity discovery, AI matching (PAT-4.x), and cross-community edges surface collaboration candidates; every collaboration creates artifacts that enrich Knowledge Memory and reputation. The network becomes the primary asset; tools evolve around it (whitepaper principle).

**Design rules:**
- Discovery surfaces are projections over governed data (no hidden access).
- AI suggestions are consent-aware and approval-gated (ADR-4.5).
- Loop health is observable: engagement, formation, and outcome metrics via the analytics stream (PAT-2.7).

**Consequences:** Growth compounds; the platform's moat is the relationship graph, as stated in the whitepaper.

---

## 3. Detailed Design Decisions — Phase 5

### ADR-5.1 Public APIs Are a First-Class Product Surface

| | |
|---|---|
| **Decision** | Ship a governed public API surface (versioned, OpenAPI 3.1, rate-limited, audited) as a core deliverable. |
| **Alternatives** | Internal APIs only; public APIs with no governance. |
| **Rationale** | Open architecture principle; ecosystem growth; the API surface is the platform's productized edge. |
| **Superseded by** | None — public API contract is the long-term integration surface. |

### ADR-5.2 Federation Built on Matrix + Scoped Graph Edges

| | |
|---|---|
| **Decision** | Federate communication via Matrix federation; federate graph/data via scoped, projection-only events with instance sovereignty. |
| **Alternatives** | Build a custom global event bus; ActivityPub-only for everything. |
| **Rationale** | Reuses the Phase 1 Matrix investment; keeps the social graph sovereign per instance; open-standard alignment. |
| **Superseded by** | Standards may evolve, but the federation-via-projections principle is stable. |

### ADR-5.3 DIDs/VCs Behind the AuthProvider Contract

| | |
|---|---|
| **Decision** | Decentralized identity is another AuthProvider; DIDs/VCs compose with OIDC and WebAuthn. |
| **Alternatives** | Replace existing auth with DIDs-only. |
| **Rationale** | User sovereignty and portability without forcing migration; provider abstraction keeps all three coexisting. |
| **Superseded by** | None — the provider model is the stable envelope for identity evolution. |

### ADR-5.4 Kubernetes as an Additional Target, Not a Replacement

| | |
|---|---|
| **Decision** | Add K8s manifests for multi-region production while preserving Docker Compose as the dev/small-deploy contract. |
| **Alternatives** | K8s-only; compose-only forever. |
| **Rationale** | Scale and multi-region demands; portability and simplicity of compose remain for self-hosters (sovereignty). |
| **Superseded by** | Target set may grow (managed platforms), never replacing compose. |

### ADR-5.5 Reputation Portability via Signed Claims

| | |
|---|---|
| **Decision** | Reputation and verified attributes are issued as signed verifiable claims usable off-platform. |
| **Alternatives** | Keep reputation platform-internal only. |
| **Rationale** | "Portable identities" and user ownership; lets users carry trust across the ecosystem and beyond. |
| **Superseded by** | Claim schemas may evolve with standards. |

---

## 4. Phase Gate

- Public APIs are live, versioned, documented, rate-limited, and fully audited.
- Federation works across instances (Matrix rooms/spaces + scoped graph projections) with instance sovereignty and opt-in.
- Decentralized identity (DIDs/VCs) coexists with OIDC/WebAuthn behind the AuthProvider contract.
- Reputation is portable, multi-signal, and verifiable as signed claims.
- Cross-community projects/companies operate via governed edges; no aggregate duplication.
- Multi-language is a platform service; new languages are catalog + provider additions.
- Multi-region deployment runs the same images with region-local providers; compose remains the dev contract.
- All Phase 1–4 patterns and gates still hold (GATE-01…GATE-10). The network is the product; everything else is infrastructure.

---

## 5. Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Prev:** [phase-4-patterns.md](phase-4-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [DEPLOYMENT.md](../DEPLOYMENT.md), [SECURITY.md](../SECURITY.md)
