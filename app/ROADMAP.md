# UWP Roadmap

> **Parent:** [README.md](README.md) — Project overview and navigation

## Overview

This roadmap defines the phased implementation of the Universal Worker Platform reference implementation. Each phase gates on the successful completion of its predecessor. Architecture contracts defined in Phase 1 are binding on all subsequent phases.

```
Phase 1 (Architecture)  →  Phase 2 (Design)  →  Phase 3 (Review)
       Completed               In Progress            Pending
                                                        │
                              Phase 4 ←─────────────────┘
                              (Core Runtime)
                                   │
                              Phase 5 ←─────────────────┐
                              (Platform Services)         │
                                   │                      │
                              Phase 6                     │
                              (Integration & Testing)     │
                                   │                      │
                              Phase 7                     │
                              (Production Hardening)      │
```

---

## Phase 1: Architecture — Complete

**Sprint:** Sprint 01  
**Status:** Complete  
**Date:** 2026-06-19

Define all platform architecture contracts. These are binding on every subsequent phase.

| Task | Contract | Status |
|---|---|---|
| TASK-001 | Platform layers, component topology, dependency flow, boundaries | Complete |
| TASK-002 | Repository structure, directory conventions, file naming, CI layout | Complete |
| TASK-003 | Worker interface, task/context/artifact lifecycle, runtime contract | Complete |
| TASK-004 | Memory domains, context persistence, knowledge flow | Complete |
| TASK-005 | Governance framework — permissions, approvals, audit, security boundaries | Complete |
| TASK-006 | Tool protocols, component interfaces, API contracts | Complete |
| TASK-007 | AGENTS.md auto-discovery, self-documentation conventions | Complete |

**Phase Gate:** All seven architecture contracts complete and cross-referenced in `agent-core/handoffs/univeral-worker-platform/design.md`.

---

## Phase 2: Design — In Progress

**Sprint:** Sprint 01  
**Status:** In Progress  
**Target:** Complete all root docs, platform docs, and component READMEs

Create complete documentation skeleton: root platform documents, component READMEs, and CI/CD templates. Every directory must be self-documenting.

| Task | Output | Status |
|---|---|---|
| TASK-008 | README.md, ROADMAP.md, TASKS.md, CHANGELOG.md | In Progress |
| TASK-009 | docs/VISION.md, docs/ARCHITECTURE.md | Pending |
| TASK-010 | docs/DEVELOPMENT.md, docs/DEPLOYMENT.md | Pending |
| TASK-011 | docs/SECURITY.md, docs/GOVERNANCE.md, docs/WORKER_GUIDE.md | Pending |
| TASK-012 | worker-runtime/, workspace-runtime/ READMEs | Pending |
| TASK-013 | memory/, tool-registry/ READMEs | Pending |
| TASK-014 | governance/, automation/ READMEs | Pending |
| TASK-015 | apps/, packages/, infra/ READMEs | Pending |
| TASK-016 | scripts/, tests/, artifacts/, .github/ + CI templates | Pending |

**Phase Gate:** All documentation and component READMEs complete. Every directory under `app/` has a README.md.

---

## Phase 3: Review — Pending

**Sprint:** Sprint 01  
**Status:** Pending

End-to-end validation of all architecture and documentation. Reviewers verify coherence, completeness, and the zero-configuration agent discovery path.

| Task | Focus | Status |
|---|---|---|
| TASK-017 | Validate architecture docs for coherence and completeness | Pending |
| TASK-018 | Validate component READMEs for clarity and contract precision | Pending |
| TASK-019 | End-to-end validation — fresh agent clone → read → navigate → understand | Pending |

**Phase Gate:** Review report passes with no critical gaps. Fix loops cap at 3 iterations.

---

## Phase 4: Core Worker Platform Runtime

**Sprint:** Sprint 02 (planned)  
**Status:** Not Started

Implement the core Worker Platform layer — the runtime engine that accepts tasks, provisions workspaces, manages worker lifecycle, and produces artifacts.

**Components to implement:**
- `packages/contracts/` — All platform contracts as TypeScript interfaces
- `packages/worker-runtime/` — Task queue consumer, worker lifecycle manager, artifact pipeline
- `packages/workspace-runtime/` — Sandbox manager (Docker container backend), filesystem layer, network policy controller
- `packages/memory/` — STM, LTM, context assembler, memory compactor
- `packages/planning/` — Task decomposer, dependency resolver, parallelism optimizer
- `packages/evaluation/` — Output validator, quality scorer, feedback loop

**Phase Gate:** Platform can accept a task via `IWorker.execute()`, provision a Docker workspace, collect artifacts, and report completion.

---

## Phase 5: Platform Services

**Sprint:** Sprint 03 (planned)  
**Status:** Not Started

Implement concrete provider services behind the ServiceProviderContracts. The Provider Registry resolves implementations at startup.

**Services to implement:**
- `packages/services/database/` — PostgreSQL provider implementing `DatabaseProvider`
- `packages/services/cache/` — Redis provider implementing `CacheProvider`
- `packages/services/queue/` — BullMQ provider implementing `QueueProvider`
- `packages/services/storage/` — MinIO (S3) provider implementing `ObjectStoreProvider`
- `packages/services/vector/` — Qdrant provider implementing `VectorStoreProvider`

**Phase Gate:** All services registered in Provider Registry. Worker Platform operates against contracts. Swapping a provider requires only configuration change.

---

## Phase 6: Integration & Testing

**Sprint:** Sprint 04 (planned)  
**Status:** Not Started

Full-stack integration: tool registry, governance engine, automation pipeline, end-to-end tests.

**Components to implement:**
- `packages/tool-registry/` — Tool catalog, resolver, sandboxing
- `packages/governance/` — Permission engine, approval gates, audit logger, rate limiter
- `apps/` — Example worker assemblies (reference apps)
- `.github/workflows/ci.yml` — CI pipeline (lint → typecheck → unit → build)
- `tests/` — End-to-end test suite spanning all layers

**Phase Gate:** Full CI pipeline passes. Governance enforces permissions at every layer. Tool registry discovers and invokes tools via MCP and REST.

---

## Phase 7: Production Hardening

**Sprint:** Sprint 05 (planned)  
**Status:** Not Started

Performance optimization, security hardening, observability, production deployment.

**Focus areas:**
- Observability stack (Prometheus metrics, Loki logs, Tempo traces)
- Performance benchmarking and optimization
- Security audit and penetration testing
- Production deployment manifests (Kubernetes, scaling policies)
- Documentation finalization and external review

**Phase Gate:** Platform passes security audit. Benchmark suite runs within performance budgets. Production manifests deploy to staging automatically via CD.

---

## Design Decisions

| Decision | Rationale |
|---|---|
| Phases gate sequentially | Each phase builds on completed architecture contracts; backtracking is expensive |
| Reference implementation target: 5 sprints | Scoped to a functional skeleton that exercises every contract and layer boundary |
| All contracts binding from Phase 1 forward | Prevents drift between architecture definition and implementation |
| Provider swapability is a Phase 5 gate | Ensures the Provider Registry architecture works before any provider is hard-coded |
| Governance is implemented once, enforced everywhere | Centralized governance model prevents scattered authorization logic |
