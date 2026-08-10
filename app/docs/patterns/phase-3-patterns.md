# JoinOrigin Phase 3 — Company Formation & Opportunity Network — Architecture Patterns

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md) (Phase 3), [ARCHITECTURE.md](../ARCHITECTURE.md) (UWP skeleton), [phase-1-patterns.md](phase-1-patterns.md), [phase-2-patterns.md](phase-2-patterns.md)

## 1. Phase Overview

**Goal:** Enable members to build organizations and businesses together.

**Success Metric:** Companies and organizations are formed directly through JoinOrigin.

**Features in scope:**

| Feature | Description |
|---|---|
| Company Profiles | Formal org profiles with ownership structure |
| Team Management | Roles, permissions, reporting lines inside companies |
| Venture Formation | Multi-step, workflow-driven company creation |
| Investment Communities | Capital, equity, and investor coordination |
| Resource Sharing | Shared docs, assets, infrastructure between members |
| Talent Marketplace | Roles/positions matched to members |

**Additional technology (from ORIGIN-WHITEPAPER.md):** Temporal (workflow engine), object storage + versioning (documents), Passkeys + WebAuthn (identity expansion).

---

## 2. Long-Term Stable Architecture Patterns

Phase 3 inherits every Phase 1/2 pattern. It introduces long-running workflows, document versioning, and identity expansion as stable patterns that remain through Phases 4–5.

### PAT-3.1 Long-Running Workflow Orchestration (Temporal)

**Intent:** Company formation, venture creation, and talent placement are multi-step, human-in-the-loop, durable processes. They must survive restarts, wait days for user input, and remain auditable.

**Solution:** Temporal is the `WorkflowProvider` implementing a `WorkflowContract`. Formation is modeled as a durable workflow (steps: charter → members → roles → documents → approval → published). Workflows are versioned; steps can be manual (human approval) or automatic (validation, checks).

**Design rules:**
- Business workflows live in the Worker Platform layer; Temporal is a swappable provider.
- Every workflow step is idempotent; retries are safe by design.
- Manual steps are approval gates through the Governance framework (PAT-1.5), not ad-hoc toggles.
- Workflow state is separate from the social graph; the company aggregate is the system of record for results.

**Consequences:** Phase 4 AI coordinators drive the same workflow machinery with agent steps; Phase 5 global formations span regions without re-architecting the orchestration.

---

### PAT-3.2 Durable Document Management with Versioning

**Intent:** Company documents (charters, agreements, plans) need versioning, provenance, and access control.

**Solution:** Documents are aggregates that reference immutable objects in the ObjectStore (PAT-2.4). Each document version is a content-addressed object; the aggregate tracks the version chain, author, and approval state. Document history is immutable (UWP Artifact Memory semantics).

**Design rules:**
- Document content is immutable; edits create new versions (copy-on-write).
- Version metadata is in the database; blobs live in S3-compatible storage.
- Access is governed per company role (see PAT-3.4).
- Sign-off/approval on versions flows through governance approval gates.

**Consequences:** Phase 5 open APIs and federation expose the same versioned document model; audit-ready by construction.

---

### PAT-3.3 Ownership and Equity as a Controlled Ledger

**Intent:** Company ownership and equity must be consistent, auditable, and safe — a legal-grade ledger, not a forum feature.

**Solution:** Ownership is an append-only ledger aggregate: issuance, transfer, and dilution events are recorded; current holdings are a derived read model. No user or worker mutates ownership in place.

**Design rules:**
- Ledger events are immutable and signed (hash-chained, matching the UWP audit log).
- Holdings derivation is deterministic from event history.
- Approval gates (multi-party for transfers) are mandatory.
- Ledger access is scoped by company role and governance policy.

**Consequences:** Investment communities (Phase 3) and future venture tooling reuse the ledger; Phase 5 reputation can reference verified contributions without exposing private equity.

---

### PAT-3.4 Hierarchical RBAC per Company (Scoped Governance)

**Intent:** Company roles (owner, admin, member, investor) must map cleanly onto the existing deny-by-default governance model.

**Solution:** The Phase 1 RBAC (PAT-1.5) extends with resource-scoped roles: `urn:jo:{tenant}:company:{id}:role:{role}`. The Governance permission engine resolves role inheritance (owner ⊃ admin ⊃ member) and enforces at the orchestrator layer; audit logging covers every role grant/revoke.

**Design rules:**
- Roles are resources with URNs, not strings in feature code.
- Role grants are audited events (who granted what to whom, when).
- Company-scoped permissions override community defaults only where policy explicitly allows.
- All role checks go through the Governance API — never inline in modules.

**Consequences:** Talent marketplace and resource sharing reuse the same role model; Phase 5 cross-company collaboration composes scoped roles without new machinery.

---

### PAT-3.5 Passkeys/WebAuthn as Second Authentication Provider

**Intent:** Company formation touches money and legal identity; passwordless, phishing-resistant authentication is required.

**Solution:** WebAuthn passkeys become an additional `AuthProvider` behind the gateway authN contract (Phase 1 ADR-1.8). Passkeys are first-class credentials; the gateway accepts OIDC and WebAuthn and issues the same Bearer token model downstream.

**Design rules:**
- Credential verification is a provider behind a contract — never inline.
- Session model unchanged for downstream services.
- Recovery flows are governed (no silent account takeover).
- Audit logs record authentication method used per action.

**Consequences:** Phase 5 decentralized identity (DIDs/VCs) builds on the same provider abstraction without changing application code.

---

### PAT-3.6 Talent Marketplace as Search + Matching Projection

**Intent:** Roles and candidates must be matched without duplicating Phase 2 search/matching machinery.

**Solution:** Company roles are searchable documents in the OpenSearch projection (PAT-2.2); candidate matching reuses the matching-job pattern (PAT-2.6) with company-scoped signals. The marketplace UI reads projections only.

**Design rules:**
- Roles are company-scoped aggregates; the index is a projection.
- Candidate suggestions are approval-gated and consent-aware (extends ADR-2.6).
- Placement events feed the ownership ledger only through governed workflows (PAT-3.1).

**Consequences:** Phase 4 AI recruiting becomes another signal source on the same pipeline.

---

### PAT-3.7 Resource Sharing via ObjectStore + Grants

**Intent:** Shared files and assets between members/companies need access grants that are revocable and audited.

**Solution:** Resource sharing extends ObjectStore (PAT-2.4) with grant records: a resource grants access to a principal (user, community, company) for a duration, recorded in the audit log. Grants are stored as governance resources, not in storage ACLs alone.

**Design rules:**
- Grants are revocable; revocation is immediate at the enforcement point.
- Presigned URLs are issued only after grant checks (short-lived, scoped).
- Sharing events are audited.
- Grants compose with company roles (PAT-3.4).

**Consequences:** Phase 5 open APIs reuse grants for API-scoped access; no new authorization machinery.

---

## 3. Detailed Design Decisions — Phase 3

### ADR-3.1 Temporal as the Workflow Engine

| | |
|---|---|
| **Decision** | Adopt Temporal (self-hosted) as the workflow provider for company formation and venture workflows. |
| **Alternatives** | Build a state machine in Postgres; use BullMQ-only orchestration; adopt Camunda/Zeebe. |
| **Rationale** | Temporal gives durable execution, built-in retries/timeouts, human-task support, and visibility — exactly what multi-day formation workflows need; matches the whitepaper's "Workflow Engine: Temporal". Provider stays behind WorkflowContract. |
| **Superseded by** | Remains the workflow backbone through Phases 4–5. |

### ADR-3.2 Content-Addressed, Copy-on-Write Documents

| | |
|---|---|
| **Decision** | Document blobs are immutable, content-addressed objects; edits create new versions (PAT-3.2). |
| **Alternatives** | In-place overwrite of a single blob per document. |
| **Rationale** | Immutability gives audit, diffing, and disaster recovery for legal-grade documents; content-addressing dedupes shared resources. |
| **Superseded by** | Federation (Phase 5) reads the same version chain. |

### ADR-3.3 Append-Only Ownership Ledger

| | |
|---|---|
| **Decision** | Equity/ownership is an append-only ledger; holdings are derived (PAT-3.3). |
| **Alternatives** | Current-state ownership table with in-place updates. |
| **Rationale** | Legal-grade auditability; transfer history is required for investment communities and later governance; hash-chaining matches the UWP audit standard. |
| **Superseded by** | Phase 5 reputation can reference verified contributions off the ledger. |

### ADR-3.4 Passkeys Added, Not Replacing OIDC

| | |
|---|---|
| **Decision** | WebAuthn passkeys join OIDC as a parallel authentication provider (PAT-3.5). |
| **Alternatives** | Passwordless-only; retain passwords only. |
| **Rationale** | Phased identity expansion per whitepaper; avoids a forced migration while enabling phishing resistance for formation flows. |
| **Superseded by** | Phase 5 decentralized identity composes with both. |

### ADR-3.5 Company Roles Are Governance Resources

| | |
|---|---|
| **Decision** | Company roles/teams are resources in the Governance model (PAT-3.4), enforced centrally. |
| **Alternatives** | Per-company role tables checked inline in feature modules. |
| **Rationale** | "Governance implemented once, enforced everywhere" (ROADMAP design decision); one audit trail; no scattered authZ. |
| **Superseded by** | Cross-company collaboration in Phase 5 composes these roles. |

### ADR-3.6 Formation Approvals Are Mandatory Human Gates

| | |
|---|---|
| **Decision** | Formation workflow steps that create legal/ownership effects require explicit human approval via governance approval gates. |
| **Alternatives** | Fully automatic formation. |
| **Rationale** | Legal and trust implications; aligns with the UWP approval framework and "people first" sovereignty. |
| **Superseded by** | Phase 4 AI may *propose* steps; humans still approve legal/ownership effects. |

---

## 4. Phase Gate

- Members create company profiles, manage teams/roles, and form ventures through durable Temporal workflows with human approval gates.
- Documents are versioned, immutable, content-addressed, and access-governed.
- Ownership/equity is an append-only, audited ledger with derived holdings.
- WebAuthn passkeys work as a second authentication provider.
- Talent marketplace and resource sharing reuse search/matching/object-store patterns; no duplicate machinery.
- All Phase 1/2 patterns and gates still hold (GATE-01…GATE-10).

---

## 5. Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Prev:** [phase-2-patterns.md](phase-2-patterns.md)
- **Next:** [phase-4-patterns.md](phase-4-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [GOVERNANCE.md](../GOVERNANCE.md), [SECURITY.md](../SECURITY.md)
