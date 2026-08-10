# JoinOrigin Phase 4 — AI Collaboration Layer — Architecture Patterns

> **Parent:** [architecture-patterns-index.md](architecture-patterns-index.md) — the combined pattern index
> **Sources:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md) (Phase 4), [ARCHITECTURE.md](../ARCHITECTURE.md) (UWP skeleton), [phase-1-patterns.md](phase-1-patterns.md)…[phase-3-patterns.md](phase-3-patterns.md)

## 1. Phase Overview

**Goal:** Provide AI-powered assistance across the network.

**Success Metric:** AI becomes an active participant in communities and projects. AI enhances the network — it does not replace it (whitepaper principle).

**Features in scope:**

| Feature | Description |
|---|---|
| AI Community Assistants | Answer questions, summarize, moderate in communities |
| AI Project Coordinators | Track tasks, surface blockers, draft updates |
| AI Recruiting | Score candidates, shortlist for talent marketplace |
| AI Opportunity Matching | Semantic matching of opportunities to members |
| AI Knowledge Search | Semantic (vector) retrieval over community knowledge |
| AI Collaboration Agents | Goal-driven agents operating inside governance bounds |

**Additional technology (from ORIGIN-WHITEPAPER.md):** Cortex + Cortex Agent Runtime (agent orchestration), OpenAI/Anthropic models (managed), local models via Ollama/vLLM (self-hosted), Qdrant (vector store).

---

## 2. Long-Term Stable Architecture Patterns

Phase 4 inherits every Phase 1–3 pattern. It adds AI-specific patterns that are stable through Phase 5 and beyond.

### PAT-4.1 AI Agents Are UWP Workers

**Intent:** AI assistants and agents must be first-class participants in the platform — governed, context-aware, observable — not ad-hoc API scripts.

**Solution:** Every AI agent implements the UWP `IWorker` interface (register, accept, execute, onProgress, complete, cancel, pause, resume) exactly like human or CLI workers. The Cortex Agent Runtime is the agent hosting provider behind the Worker contract; agents execute tasks inside isolated workspaces (PAT-1.6) and produce artifacts.

**Design rules:**
- Agents are interchangeable workers — the platform does not privilege model or vendor.
- Agents accept tasks via the Task API, stream progress, and emit artifacts; nothing bypasses the worker lifecycle.
- Agent identity is a governed principal with URN (`urn:jo:{tenant}:agent:{id}`), permissions, and audit trail.
- GATE-10 applies: agents never call tools directly; all invocations flow through the platform proxy/tool registry.

**Consequences:** The same planning, evaluation, governance, and audit machinery that manages human work governs AI work. Phase 5 federation treats remote agents as remote workers.

---

### PAT-4.2 Model Abstraction Behind a Model Gateway

**Intent:** No feature may depend on a specific model vendor; models must be swappable and mixable.

**Solution:** A `ModelProvider` contract sits behind a model gateway: managed providers (OpenAI, Anthropic) and local providers (Ollama/vLLM) register the same interface. Routing policy (cost, latency, capability, privacy) selects the model per task; the model gateway is the only place that knows model identities.

**Design rules:**
- Feature code requests capabilities (summarize, classify, embed, chat), not model names.
- Local models are first-class for privacy-sensitive data (community docs, equity discussions) — data sovereignty via provider selection.
- Model calls are logged/audited (input/output hashing per tool governance).
- Fallbacks and timeouts are provider-level concerns, enforced by the gateway.

**Consequences:** New models join by registering a provider; no feature changes. Phase 5 federated AI composes remote model gateways.

---

### PAT-4.3 Retrieval-Augmented Generation over Qdrant

**Intent:** AI knowledge search must ground answers in community/company knowledge with citations — not in model parametric memory.

**Solution:** Qdrant is the `VectorStoreProvider` behind `ServiceProviderContract:VectorStore`. Knowledge documents (posts, docs, resolved threads, project artifacts) are embedded and indexed; retrieval happens at query time; generated answers cite retrieved chunks. The same pipeline powers AI Community Assistants and AI Knowledge Search.

**Design rules:**
- Documents enter the vector index only through the existing event/projection machinery (PAT-2.2), keeping provenance.
- Embeddings are model-agnostic at the application layer (embedding provider behind ModelProvider).
- Retrieved chunks are logged with query hash for audit and improvement.
- Access control is applied at retrieval time (retrieve only what the requester may see).

**Consequences:** Phase 5 cross-community knowledge search and federation extend the same RAG pipeline with new document scopes.

---

### PAT-4.4 Governance-Bounded Agent Actions (Human-in-the-Loop)

**Intent:** AI must be useful without being reckless; every consequential agent action is authorized and auditable.

**Solution:** All agent tool calls pass through the Tool Registry + Governance (PAT-1.5). Read/classify/retrieve actions run under the agent's scoped permissions; write/send/recruit/approve actions require approval gates. Agent actions produce governance audit events identical to human actions.

**Design rules:**
- Deny-by-default applies to agents as to humans.
- Cost thresholds (model spend) trigger approval gates (ADR-4.4).
- Agents can be paused/cancelled via the worker lifecycle; a community/admin kill switch is a governance policy.
- Every agent message that reaches users is identifiable as AI ("transparency by default").

**Consequences:** Phase 5 reputation systems can weight AI vs human contributions; trust remains auditable end-to-end.

---

### PAT-4.5 AI Memory Reuses the Six Memory Domains

**Intent:** AI agents must remember context across turns without inventing a parallel memory system.

**Solution:** Agents read/write the existing six memory domains (PAT-1.4): Session Memory for conversation, Knowledge Memory for community learnings, Task Memory for assignments, Artifact Memory for produced documents. Context snapshots (UWP §6.2) prevent drift during long agent tasks.

**Design rules:**
- Agent context is assembled by the Context Assembler from the same contracts as human workers.
- Model-agnostic formats: no model-specific prompt state stored in memory.
- Memory compaction runs per policy (TTL, size) — never deletes Knowledge Memory.

**Consequences:** "Context outlives models" holds: replacing the model vendor keeps all agent memory intact. Phase 5 federated agents exchange context via contracts, not private state.

---

### PAT-4.6 Evaluation Feedback Loop for AI Quality

**Intent:** AI output quality must be measured, improved, and observable — matching the UWP evaluation services.

**Solution:** Evaluation Services (Output Validator, Quality Scorer, Feedback Loop) grade agent outputs against acceptance criteria; high-scoring patterns promote to Knowledge Memory; low-scoring outputs trigger revision/retry loops (bounded). Quality signals feed dashboards and prompt/policy tuning.

**Design rules:**
- Evaluation is automated (validators) plus sampled human review for critical domains (recruiting, legal).
- Feedback is recorded as knowledge events, not hidden prompt patches.
- Retry loops are bounded (max iterations) to cap cost.

**Consequences:** Phase 5 advanced reputation and cross-community AI reuse the same evaluation pipeline.

---

### PAT-4.7 Agent Tooling via MCP with Tiered Protocols

**Intent:** Agents discover and invoke platform tools (search, DB read, docs, notifications) through a standard protocol.

**Solution:** The Tool Registry (UWP §6.4) exposes tools via MCP (Tier 1 mandatory) for agents, alongside REST/WebSockets for interactive use. Agents discover tools through the registry, resolve schemas, and invoke through the platform proxy — never hardcoded endpoints.

**Design rules:**
- Tool registration, heartbeat, deprecation lifecycle via Registry API.
- Per-tool allowlist and rate limits (governance tier).
- Tool invocation input/output hash logging (audit).
- New AI tools in Phase 4 are just registry entries; no new machinery.

**Consequences:** Phase 5 open APIs and federated agents use the same registry, keeping one tool surface.

---

## 3. Detailed Design Decisions — Phase 4

### ADR-4.1 Cortex as the Agent Runtime Host

| | |
|---|---|
| **Decision** | Adopt Cortex + Cortex Agent Runtime as the agent orchestration layer hosting AI workers behind the Worker contract. |
| **Alternatives** | Build custom agent loop; embed agent logic in each service; use LangChain-only orchestration. |
| **Rationale** | Matches the whitepaper's AI infrastructure (Cortex); provides the durable, governed agent runtime the UWP Worker contract expects; keeps agents swappable workers. |
| **Superseded by** | Remains the agent runtime through Phase 5; federation may add remote runtimes behind the same contract. |

### ADR-4.2 Hybrid Model Strategy: Managed + Local

| | |
|---|---|
| **Decision** | Support OpenAI and Anthropic for high-capability tasks; Ollama/vLLM for privacy-sensitive and cost-controlled tasks; route via ModelProvider. |
| **Alternatives** | Managed-only; local-only. |
| **Rationale** | Balances capability, cost, and data sovereignty (community/company confidentiality). Local models keep sensitive formation/equity data on-premise. |
| **Superseded by** | New providers register; strategy persists. |

### ADR-4.3 Qdrant as the Vector Store

| | |
|---|---|
| **Decision** | Qdrant is the vector store for RAG and semantic matching. |
| **Alternatives** | pgvector on PostgreSQL; Milvus; Weaviate. |
| **Rationale** | Matches whitepaper (Qdrant); dedicated vector engine scales independently of the social graph; UWP `VectorStoreProvider` contract keeps it swappable. |
| **Superseded by** | None — vector store contract persists; provider could change behind it. |

### ADR-4.4 Cost Governance for AI (Budget Gates)

| | |
|---|---|
| **Decision** | Model spend is a governance resource: per-community/per-company budgets, per-task cost estimates, approval gates above thresholds (UWP §6.3 cost model). |
| **Alternatives** | Unlimited AI spend; per-seat billing only. |
| **Rationale** | AI at network scale is a real cost center; budget gates prevent runaway spend while keeping AI participatory. |
| **Superseded by** | Phase 5 billing/federation cost sharing builds on the same cost model. |

### ADR-4.5 AI Transparency and Consent

| | |
|---|---|
| **Decision** | AI participation is labeled (agent identity in every user-facing message); members can opt out of AI contact; AI memory of a user requires the user's consent. |
| **Alternatives** | Undifferentiated AI messages; no opt-out. |
| **Rationale** | "People first" and sovereignty principles; preserves trust as AI scales; required by governance/audit posture. |
| **Superseded by** | Phase 5 reputation and open APIs inherit the consent model. |

---

## 4. Phase Gate

- AI community assistants and project coordinators operate as governed UWP workers with full lifecycle, audit, and evaluation.
- RAG knowledge search returns cited answers from Qdrant-scoped to the requester's permissions.
- Model routing (OpenAI/Anthropic/local) works via the ModelProvider contract; no feature knows model identities.
- Every agent action passes governance; cost budgets and approval gates enforced; AI messages are transparently labeled.
- Agent memory lives in the six memory domains; context outlives any model vendor.
- All Phase 1–3 patterns and gates still hold (GATE-01…GATE-10).

---

## 5. Navigation

- **Up:** [architecture-patterns-index.md](architecture-patterns-index.md)
- **Prev:** [phase-3-patterns.md](phase-3-patterns.md)
- **Next:** [phase-5-patterns.md](phase-5-patterns.md)
- **Related:** [ORIGIN-WHITEPAPER.md](../ORIGIN-WHITEPAPER.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [WORKER_GUIDE.md](../WORKER_GUIDE.md)
