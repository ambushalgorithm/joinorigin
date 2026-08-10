# Architecture Patterns Index — JoinOrigin (Phases 1–5)

> **Parent:** [docs/README.md](../README.md) — documentation index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [WHITEPAPER.md](../WHITEPAPER.md)

## Purpose

This index is the single entry point to JoinOrigin's long-term stable architecture patterns. It links one pattern document per roadmap phase (1–5), each of which covers two things:

1. **Long-term stable architectural patterns** — the binding design patterns that persist across the platform's lifetime, derived from the Universal Worker Platform (UWP) skeleton.
2. **Detailed design decisions per phase** — ADR-style records that capture what was decided, the alternatives considered, and the rationale.

Every pattern in these documents traces back to the UWP skeleton (`app/docs/ARCHITECTURE.md`) and the JoinOrigin vision ([`ORIGIN-WHITEPAPER.md`](../ORIGIN-WHITEPAPER.md)). Phase 1 patterns are binding on all later phases; later phases extend, never replace, earlier patterns.

## Directory Map

| Document | Phase | Theme |
|---|---|---|
| [architecture-patterns-index.md](architecture-patterns-index.md) | — | **This file** — combined index |
| [phase-1-patterns.md](phase-1-patterns.md) | 1 — Community Foundation (MVP) | Six-layer architecture, provider registry, social-graph-is-the-product, Matrix, memory domains, governance, workspaces, self-documentation, aggregates, authN |
| [phase-2-patterns.md](phase-2-patterns.md) | 2 — Collaboration Layer | Aggregate composition, search projections, outbox notifications, object storage, reputation read models, matching jobs, analytics stream |
| [phase-3-patterns.md](phase-3-patterns.md) | 3 — Company Formation & Opportunity Network | Workflow orchestration (Temporal), versioned documents, ownership ledger, hierarchical RBAC, passkeys, talent marketplace, resource grants |
| [phase-4-patterns.md](phase-4-patterns.md) | 4 — AI Collaboration Layer | AI as UWP workers, model gateway, RAG over Qdrant, governed agent actions, AI memory domains, evaluation loop, MCP tooling |
| [phase-5-patterns.md](phase-5-patterns.md) | 5 — Global Collaboration Network | Open APIs, federation, decentralized identity, portable reputation, cross-community edges, multi-language, multi-region scale |

## Pattern Taxonomy

The stable patterns form a coherent system. Reading order matters: Phase 1 establishes the substrate; each phase adds a layer of capability on top.

### Phase 1 — Foundation Patterns (binding on all phases)

| ID | Pattern | One-line intent |
|---|---|---|
| PAT-1.1 | Strict Six-Layer Contract-Driven Architecture | Acyclic one-way dependencies; contracts at every boundary |
| PAT-1.2 | Provider Registry | Services are swappable by configuration, never hardcoded |
| PAT-1.3 | Social Graph Is the Product; Communication Is a Provider | The network of people is the asset; Matrix is infrastructure |
| PAT-1.4 | Context as a First-Class Asset | Six memory domains outlive any model/session |
| PAT-1.5 | Governance at Every Layer | Deny-by-default, audit, approvals enforced independently per layer |
| PAT-1.6 | Workspace Isolation and Artifact Extraction | Ephemeral sandboxes; only declared outputs persist |
| PAT-1.7 | Self-Documenting Repository and Root Minimalism | ≤3 reads to understand any component |
| PAT-1.8 | Single Source of Truth per Aggregate | One owning service per core object |

### Phase 2 — Collaboration Patterns

| ID | Pattern | One-line intent |
|---|---|---|
| PAT-2.1 | Aggregates Grow by Composition | New objects attach to the graph, never rewrite it |
| PAT-2.2 | Search Index as a Projection | OpenSearch derives from events; rebuildable |
| PAT-2.3 | Notifications via Outbox + Queue Fan-Out | Reliable at-least-once delivery, decoupled senders |
| PAT-2.4 | Object Storage Behind a Contract | S3-compatible files with presigned, governed access |
| PAT-2.5 | Reputation as a Derived Read Model | Scores from auditable events, never edited in place |
| PAT-2.6 | Matching as Offline, Batched, Re-runnable Jobs | Best-effort, explainable, non-blocking |
| PAT-2.7 | Analytics as an Orthogonal Event Stream | Non-blocking, PII-conscious product telemetry |

### Phase 3 — Organization Patterns

| ID | Pattern | One-line intent |
|---|---|---|
| PAT-3.1 | Long-Running Workflow Orchestration | Durable, human-in-the-loop formation via Temporal |
| PAT-3.2 | Durable Document Management with Versioning | Immutable, content-addressed document versions |
| PAT-3.3 | Ownership and Equity as a Controlled Ledger | Append-only, signed, auditable equity ledger |
| PAT-3.4 | Hierarchical RBAC per Company | Company roles as governed URN resources |
| PAT-3.5 | Passkeys/WebAuthn as Second Auth Provider | Phishing-resistant identity behind the auth contract |
| PAT-3.6 | Talent Marketplace as Search + Matching Projection | Roles and candidates via existing machinery |
| PAT-3.7 | Resource Sharing via ObjectStore + Grants | Revocable, audited access grants |

### Phase 4 — AI Patterns

| ID | Pattern | One-line intent |
|---|---|---|
| PAT-4.1 | AI Agents Are UWP Workers | Agents run the same lifecycle/governance as humans |
| PAT-4.2 | Model Abstraction Behind a Model Gateway | Features request capabilities, never model names |
| PAT-4.3 | Retrieval-Augmented Generation over Qdrant | Grounded, cited answers with retrieval-time ACLs |
| PAT-4.4 | Governance-Bounded Agent Actions | Human-in-the-loop for consequential AI actions |
| PAT-4.5 | AI Memory Reuses the Six Memory Domains | No parallel memory system; context outlives models |
| PAT-4.6 | Evaluation Feedback Loop for AI Quality | Measured, improving, observable AI output |
| PAT-4.7 | Agent Tooling via MCP with Tiered Protocols | Registry-based tool discovery/invocation |

### Phase 5 — Global Patterns

| ID | Pattern | One-line intent |
|---|---|---|
| PAT-5.1 | Open, Versioned, Governed API Surface | Ecosystem growth with governance |
| PAT-5.2 | Federation via Open Protocols | Interoperability with instance sovereignty |
| PAT-5.3 | Decentralized Identity (DIDs/VCs) | User-owned, portable identity |
| PAT-5.4 | Advanced Reputation as Portable Multi-Signal Scores | Verifiable, transparent trust |
| PAT-5.5 | Cross-Community Collaboration via Edges | Collaboration without aggregate duplication |
| PAT-5.6 | Multi-Language as a Platform Concern | i18n as service, not per-feature hacks |
| PAT-5.7 | Scale and Multi-Region Operations | Region-local providers, same images |
| PAT-5.8 | Ecosystem Self-Sustainability Loop | The network continuously generates opportunity |

## Contracts

### Implements
- **Self-Documentation Contract** (UWP §7): every document in this directory follows the README contract — breadcrumb header, purpose, directory map, navigation footer.

### Depends On
- **UWP Architecture** (`../ARCHITECTURE.md`): layer model, dependency rules DEP-01…DEP-10, contracts, gates GATE-01…GATE-10, memory domains, governance, tool protocols.
- **JoinOrigin Vision** (`../ORIGIN-WHITEPAPER.md`): phases, features, tech stack, and guiding principles (People First, Communities Drive Growth, Collaboration Creates Value, Open Architecture, Ownership and Sovereignty).

### Exposes
- **Phase pattern documents**: one per roadmap phase, each self-contained with patterns + ADR records.
- **Stable decision trail**: ADR-1.1…ADR-5.5 across the phase docs — a running, auditable record of why the architecture is the way it is.

## How to Use

1. **New architect/engineer**: read this index, then `phase-1-patterns.md` (the substrate), then the phase matching your work.
2. **Working on Phase N**: read all patterns ≤ N; your design must satisfy every prior pattern and gate.
3. **Challenging a decision**: cite the ADR you want to change and record the supersession in the phase doc — never silently deviate.
4. **Verifying coherence**: run the contract gates from `ARCHITECTURE.md` §11; the pattern docs add no gates of their own, they inherit the UWP gate set.

## Navigation

- **Up:** [docs/README.md](../README.md)
- **Children:** [phase-1-patterns.md](phase-1-patterns.md), [phase-2-patterns.md](phase-2-patterns.md), [phase-3-patterns.md](phase-3-patterns.md), [phase-4-patterns.md](phase-4-patterns.md), [phase-5-patterns.md](phase-5-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [WHITEPAPER.md](../WHITEPAPER.md)
