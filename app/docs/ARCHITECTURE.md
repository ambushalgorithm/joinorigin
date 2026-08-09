# Universal Worker Platform — Architecture

> **Parent:** None. This document is the **canonical architecture reference** for the Universal Worker Platform. It is the second document every agent reads after `AGENTS.md`.

---

## 1. Architecture Overview

The Universal Worker Platform (UWP) is a layered, contract-driven system for running governed, context-aware knowledge workers. It is organized into **six layers** with strict, one-way dependency flow. Every cross-layer interaction passes through a defined contract interface. No layer leaks implementation details upward.

### 1.1 Architecture at a Glance

```
┌──────────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER          Worker assemblies, agent workflows,   │
│  (Layer 6)                  custom tool plugins                   │
│                              depends on: Platform Contracts only  │
├──────────────────────────────────────────────────────────────────┤
│  WORKER PLATFORM LAYER      Runtime, workspace, memory, planning, │
│  (Layer 5 - CORE)           evaluation, governance, contracts     │
│                              depends on: ServiceProviderContracts │
├──────────────────────────────────────────────────────────────────┤
│  PLATFORM SERVICES LAYER    PostgreSQL, Redis, MinIO, Qdrant,     │
│  (Layer 4)                  BullMQ, Search, Email                 │
│                              implements: ServiceProviderContracts │
├──────────────────────────────────────────────────────────────────┤
│  AUTOMATION & DELIVERY      CI/CD, test harnesses, artifacts      │
│  (Layer 3 - orthogonal)     active during build/deploy cycles     │
├──────────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER       Container runtime, networking,        │
│  (Layer 2)                  compute, volumes, observability       │
├──────────────────────────────────────────────────────────────────┤
│  DEPLOYMENT LAYER           Environment configs, service          │
│  (Layer 1)                  discovery, scaling, secrets           │
└──────────────────────────────────────────────────────────────────┘
```

### 1.2 Key Architectural Properties

| Property | Description |
|---|---|
| **Strict layering** | Upper layers depend only on interfaces from lower layers |
| **Contract-driven** | All cross-layer communication passes through defined contracts |
| **Provider-independent** | Platform Services are swappable via the Provider Registry |
| **Governance at every layer** | Authorization, audit, and resource limits enforced independently at each layer |
| **Context as first-class asset** | Six memory domains with snapshot isolation and immutable provenance |
| **Portable** | The `app/` directory is self-contained and copiable into any repository |
| **Self-documenting** | Every directory has a README; every concept has one canonical definition |

---

## 2. Platform Layer Model

Six layers, each with a single responsibility and strict dependency rules.

| Layer | Position | Responsibility | Opacity |
|---|---|---|---|
| **Application** | Top (Layer 6) | Business-specific worker assemblies, agent workflows, custom tool plugins | Opaque to platform internals |
| **Worker Platform** | Core (Layer 5) | Runtime, workspace, memory, planning, evaluation, governance, tool registry, platform contracts | Internal implementation opaque to apps; contracts transparent |
| **Platform Services** | Provider (Layer 4) | Concrete service implementations: database, cache, queue, storage, search, vectors, email | Opaque to app layer — accessed ONLY through Worker Platform abstractions |
| **Automation & Delivery** | Build/CI (Layer 3) | Build pipelines, test harnesses, artifact management, release orchestration | Opaque in production — active during dev/deploy cycles only |
| **Infrastructure** | Host (Layer 2) | Container runtime, networking, compute, volumes, monitoring | Fully opaque to all upper layers |
| **Deployment** | Operations (Layer 1) | Environment definitions, service discovery, scaling policies, secrets management | Fully opaque to all upper layers |

---

## 3. Component Topology

### 3.1 Application Layer (Layer 6)

| Component | Description | External/Internal |
|---|---|---|
| Worker Assemblies | Business-logic workers composed of tasks, context, and artifacts | External (built by platform consumers) |
| Agent Workflows | DAGs of workers + evaluation loops | External |
| Custom Tool Plugins | Domain-specific tools registered into the Tool Registry | External |

**Application layer imports**: `@uwp/contracts` only. Application code MUST NOT import from Platform Services, Infrastructure, or Deployment.

### 3.2 Worker Platform Layer (Layer 5 — Core)

This is the central layer. All platform logic lives here.

| Component | Sub-components | Description |
|---|---|---|
| **Worker Runtime** | Task Queue Consumer, Worker Lifecycle Manager, Artifact Pipeline | Accepts task descriptions, instantiates workers, manages execution lifecycle, produces artifacts |
| **Workspace Runtime** | Sandbox Manager, Filesystem Layer, Network Policy Controller | Provides isolated execution environments per worker invocation |
| **Tool Registry** | Tool Catalog, Tool Resolver, Tool Sandboxing | Central registry of all available tools; resolves tool names to implementations; enforces tool-level permissions |
| **Memory Services** | Short-Term Memory Store, Long-Term Memory Store, Context Assembler, Memory Compactor | Manages conversation context, episodic memory, semantic memory across worker invocations |
| **Planning Services** | Task Decomposer, Dependency Resolver, Parallelism Optimizer | Breaks high-level goals into executable task DAGs |
| **Evaluation Services** | Output Validator, Quality Scorer, Feedback Loop | Evaluates worker outputs against acceptance criteria; triggers retry/revision loops |
| **Governance Services** | Permission Engine, Approval Gate, Audit Logger, Rate Limiter | Enforces who can do what; logs all actions; gates sensitive operations behind approval |
| **Platform Contracts** | WorkerContract, WorkspaceContract, ToolContract, MemoryContract, PlanningContract, EvaluationContract, GovernanceContract, ServiceProviderContract | Interfaces applications code against; the ONLY surface area visible from the Application layer |

### 3.3 Platform Services Layer (Layer 4)

| Service | Reference Provider | Implements |
|---|---|---|
| Relational Database | PostgreSQL | ServiceProviderContract:Database |
| Cache | Redis | ServiceProviderContract:Cache |
| Message Queue | BullMQ (Redis-backed) | ServiceProviderContract:Queue |
| Object Storage | MinIO (S3-compatible) | ServiceProviderContract:ObjectStore |
| Full-Text Search | (Provider TBD) | ServiceProviderContract:Search |
| Vector Storage | Qdrant | ServiceProviderContract:VectorStore |
| Email | (Provider TBD) | ServiceProviderContract:Email |

### 3.4 Automation & Delivery Layer (Layer 3)

| Component | Description |
|---|---|
| CI Pipeline Definitions | Build, lint, typecheck, unit-test, integration-test stages |
| Artifact Registry | Stores versioned build artifacts |
| Release Orchestrator | Promotes artifacts through environments |
| Test Harness | E2E test runner, benchmark suite, load testing |

### 3.5 Infrastructure Layer (Layer 2)

| Component | Description |
|---|---|
| Container Runtime | Docker or compatible OCI runtime |
| Network Layer | Internal service mesh, ingress/egress rules |
| Volume Manager | Persistent volume provisioning |
| Observability Stack | Metrics (Prometheus), logs (Loki), traces (Tempo) |

### 3.6 Deployment Layer (Layer 1)

| Component | Description |
|---|---|
| Environment Definitions | dev, staging, production configs |
| Service Discovery | Internal DNS, service mesh registration |
| Scaling Policies | HPA, VPA, KEDA rules |
| Secrets Manager | Encrypted secret injection at deploy time |

---

## 4. Dependency Flow

```
┌─────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER                                          │
│  depends on: Platform Contracts (interfaces ONLY)            │
│  MUST NOT depend on: any other layer                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ imports contracts
┌──────────────────────────▼──────────────────────────────────┐
│  WORKER PLATFORM LAYER (CORE)                               │
│  depends on: ServiceProviderContracts (interfaces ONLY)      │
│  MUST NOT depend on: specific providers (PostgreSQL, Redis)  │
│  Internal deps: Runtime→Workspace, Memory→Planning, etc.     │
└──────────────────────────┬──────────────────────────────────┘
                           │ imports provider contracts
┌──────────────────────────▼──────────────────────────────────┐
│  PLATFORM SERVICES LAYER                                    │
│  depends on: Infrastructure (host resources)                │
│  MUST NOT depend on: Worker Platform or Application          │
│  Implements: ServiceProviderContracts                        │
└──────────────────────────┬──────────────────────────────────┘
                           │ runs on
┌──────────────────────────▼──────────────────────────────────┐
│  INFRASTRUCTURE LAYER                                       │
│  depends on: nothing (foundational)                          │
└─────────────────────────────────────────────────────────────┘
```

### 4.1 Strict Dependency Rules

| Rule ID | Rule |
|---|---|
| DEP-01 | Application layer MUST ONLY import from Platform Contracts |
| DEP-02 | Application layer MUST NOT import any file from Platform Services, Infrastructure, or Deployment |
| DEP-03 | Worker Platform MUST ONLY depend on ServiceProviderContracts (not concrete providers) |
| DEP-04 | Worker Platform MUST NOT import provider-specific libraries |
| DEP-05 | Platform Services MAY depend on Infrastructure primitives |
| DEP-06 | Platform Services MUST NOT depend on Worker Platform or Application |
| DEP-07 | Infrastructure MUST NOT depend on any upper layer |
| DEP-08 | Automation & Delivery MAY touch any layer for build/test/deploy purposes |
| DEP-09 | No circular dependencies between layers |
| DEP-10 | Contracts live in the layer that defines them, never in the layer that consumes them |

### 4.2 Orthogonal Layers

- **Automation & Delivery (Layer 3)**: Touches all layers during CI/CD. Dormant in production.
- **Deployment (Layer 1)**: Configures all layers above. Separated from Infrastructure because "how it runs" ≠ "how it's configured."

---

## 5. Layer Boundary Contracts

### 5.1 Application ↔ Worker Platform Boundary

Applications interact with the platform exclusively through Platform Contracts:

```
APPLICATION                    │  WORKER PLATFORM
                               │
  import { WorkerContract }    │  export interface WorkerContract {
    from '@uwp/contracts'      │    execute(task: Task): Promise<Artifact>
                               │    validate(input: Input): ValidationResult
  const worker: WorkerContract │  }
    = runtime.bind(MyWorker)   │
```

**Available Contracts:**
- `WorkerContract` — task execution, validation
- `WorkspaceContract` — environment provisioning
- `ToolContract` — tool discovery and invocation
- `MemoryContract` — context read/write
- `PlanningContract` — work decomposition
- `EvaluationContract` — quality assessment
- `GovernanceContract` — permissions, approvals, audit

### 5.2 Worker Platform ↔ Platform Services Boundary

The Provider Registry resolves interfaces to concrete implementations at startup:

```
WORKER PLATFORM               │  PLATFORM SERVICES
                              │
  import { DatabaseProvider } │  class PostgresProvider
    from './contracts'        │    implements DatabaseProvider {
                              │      // Concrete PostgreSQL logic
  const db: DatabaseProvider  │  }
    = providerRegistry        │
      .resolve('database')    │  providerRegistry
                              │    .register('database',
                              │      PostgresProvider)
```

**ServiceProviderContracts:**
- `Database` — parameterized SQL execution, transactions, migrations
- `Cache` — key-value storage with TTL
- `Queue` — job queuing with priorities, deduplication, DLQ
- `ObjectStore` — S3-compatible blob storage
- `Search` — full-text search with index management
- `VectorStore` — vector embeddings with similarity search
- `Email` — templated email delivery

### 5.3 Provider Independence (Swap Without Rebuild)

```
                     ┌──────────────────────┐
                     │   APPLICATION LAYER   │
                     │  import { X } from    │
                     │    '@uwp/contracts'    │
                     └──────────┬────────────┘
                                │ depends on interfaces
                     ┌──────────▼────────────┐
                     │ PROVIDER REGISTRY      │
                     │ Map<Contract,Provider> │
                     │ resolve(contract): P   │
                     └──────────┬────────────┘
                                │ resolves to
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
   ┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
   │ PostgreSQL   │      │  Redis      │      │  MinIO      │
   │ Provider     │      │  Provider   │      │  Provider   │
   └──────────────┘      └─────────────┘      └─────────────┘
```

---

## 6. Core Architecture Contracts

### 6.1 Worker Contract

> **Canonical definition:** `worker-runtime/README.md` (Worker Runtime) and `workspace-runtime/README.md` (Workspace Runtime)

Every worker implements the `IWorker` interface:

| Method | Purpose |
|---|---|
| `register()` | Register with capabilities |
| `deregister()` | Gracefully deregister |
| `health()` | Return current status |
| `accept(task)` | Accept a task, create handle |
| `reject(handle, reason)` | Refuse a task |
| `execute(handle)` | Execute the task |
| `onProgress(handle)` | Stream progress updates |
| `complete(handle)` | Finalize with artifacts |
| `cancel(handle)` | Cancel execution |
| `pause(handle)` | Suspend execution |
| `resume(handle)` | Resume paused execution |

**Task Lifecycle State Machine:**
```
CREATED → QUEUED → ACCEPTED → CONTEXT_LOADED → WORKSPACE_READY → IN_PROGRESS
                                                                      │
                                                                      ├→ ARTIFACTS_GENERATED → IN_REVIEW → COMPLETED
                                                                      │
                                                                      ├→ PAUSED → IN_PROGRESS (resume)
                                                                      │
                                                                      └→ FAILED / CANCELLED (terminal)
```

**Workspace Isolation:** Workers run in isolated workspaces with resource limits:
- CPU, memory, disk, network enforced via cgroups/container policies
- Read-only root filesystem (tmpfs for scratch)
- No host network access (internal bridge only)
- All capabilities dropped by default
- Artifacts extracted from `/workspace/artifacts/` after execution
- Workspace fully destroyed on task completion

### 6.2 Context System Contract

> **Canonical definition:** `memory/README.md` (Memory Services)

The platform defines **six memory domains** as a unified, persistent context layer:

| Domain | Scope | Lifecycle | Owner |
|---|---|---|---|
| **User Memory** | Identity, preferences, permissions | Permanent (archive on deactivation) | The user |
| **Project Memory** | Goals, constraints, conventions, ADRs | Project lifetime | The project team |
| **Session Memory** | Ephemeral per-interaction context | TTL: 24h idle → archive | Session initiator |
| **Task Memory** | Input, output, status per work unit | Sprint duration + archive | Assigned worker / PM |
| **Knowledge Memory** | Patterns, heuristics, best practices | Continuously updated, never deleted | The platform |
| **Artifact Memory** | Tangible worker outputs (code, config, logs) | Immutable after finalization | Producing worker (during task) → project |

**Core Principle: Context Outlives Models.** Context is stored in model-agnostic formats with full provenance tracking. Workers access context only through the Context Contract interface — never directly.

**Persistence Layers:**
- **Hot Context** — In-memory (Session Memory, active Task Memory)
- **Warm Context** — Low-latency store (active Project Memory, recent Knowledge)
- **Cold Context** — Long-term store (historical sessions, archived tasks)
- **Frozen Context** — Compressed archive (closed projects, pruned logs)

**Context Snapshots:** When a task is assigned, an immutable snapshot of all relevant context is created. The worker operates against the snapshot — not live context — preventing drift during execution.

**Knowledge Flow:**
```
Planning → Tasks + Snapshots → Workers → Artifacts → Evaluation → Knowledge
                                                                    │
                                                                    ▼
                             Updated Knowledge → Better Planning → Better Tasks
```

### 6.3 Governance Contract

> **Canonical definition:** `governance/README.md` (Governance Services) and `docs/GOVERNANCE.md`

Governance is enforced at every platform layer:

| Layer | Governance Checks |
|---|---|
| **Gateway** | AuthN (valid token), Rate Limit, TLS, IP allowlist |
| **Orchestrator** | AuthZ (permission check), Resource Quota, Cost Estimate, Approval Gate |
| **Worker Runtime** | Resource Enforcement (cgroups), Filesystem Isolation, Network Policy, Seccomp Profile, Image Signature |
| **Memory** | Scope Validation, Encryption at Rest, Access Log |
| **Tool Registry** | Tool Allowlist, Rate Limit per Tool, Input/Output Hash Logging |

**RBAC Model:**
- **Deny-by-Default**: No explicit allow → denied
- **Explicit Deny Overrides Allow**
- **Task-Scoped Duration**: Worker permissions granted only for task duration
- **Resource URNs**: `urn:uwp:{tenant}:{project}:{resource-type}:{resource-id}`

**Audit:** All governance decisions are logged to an append-only, tamper-evident audit log with cryptographic hash chaining. Log categories: AuthN, AuthZ, Approval, Task Lifecycle, Resource, Secret Access, Tool Invocation, Policy Change, Configuration.

**Approval Framework:** Sensitive operations trigger approval gates — cost thresholds, high-risk tool access, resource scale-up, secret access, new worker registration.

### 6.4 Integration Contracts

> **Canonical definition:** `tool-registry/README.md` (Tool Registry)

**Tool Protocols:**

| Protocol | Use Case | Governance Tier |
|---|---|---|
| **MCP** (Model Context Protocol) | AI agent tool discovery/execution | Tier 1 — Mandatory |
| **REST / OpenAPI 3.1** | Platform service CRUD, admin APIs | Tier 1 — Mandatory |
| **GraphQL** | Complex cross-domain queries | Tier 2 — Optional |
| **gRPC** | High-performance internal service calls | Tier 2 — Optional |
| **WebSockets** | Real-time events, task streaming | Tier 1 — Mandatory |

**API Contracts (all at `/api/v1/`):**

| API | Path | Purpose |
|---|---|---|
| Worker API | `/api/v1/workers/{id}/*` | Task invocation, status, configuration |
| Task API | `/api/v1/tasks/*` | CRUD, listing, pagination, cancellation |
| Context API | `/api/v1/context/*` | Read/write/merge context with optimistic concurrency |
| Artifact API | `/api/v1/artifacts/*` | Upload, download, metadata, listing |
| Governance API | `/api/v1/governance/*` | Permission checks, audit logging, approvals, quotas, costs |
| Tool Registry API | `/api/v1/registry/*` | Tool registration, discovery, deprecation, heartbeat |
| Health API | `/health`, `/ready`, `/metrics` | Liveness, readiness, Prometheus metrics |

**Worker-Tool Interaction Flow:**
```
Worker → Discovery (Registry) → Resolve (Schema + Endpoint) → Permission Check (Governance)
                                                                  │
                                                                  ▼ Allow
                                                            Invoke Tool → Result
                                                                  │
                                                                  ▼
                                                            Log Audit (Governance)
```

---

## 7. Repository Structure & Conventions

> **Canonical definition:** `AGENTS.md` (repo root) and component READMEs

### 7.1 Root Minimalism

```
cortex/client/
  AGENTS.md          ← THE ONLY ROOT FILE. Agent auto-discovery entry point.
  app/               ← All platform components live here.
```

Nothing else at root. No `package.json`, `tsconfig.json`, `.editorconfig`, `Makefile`. All configuration lives inside `app/`.

### 7.2 App Directory Tree

| Directory | Purpose | Layer Mapping |
|---|---|---|
| `docs/` | Core documentation (VISION, ARCHITECTURE, etc.) | Cross-cutting |
| `apps/` | Deployable services, worker assemblies | Application (Layer 6) |
| `packages/` | Package slot registry documenting all Worker Platform (L5) and Platform Services (L4) component slots | Cross-cutting (documentation) |
| `infra/` | Dockerfiles, compose files, Kubernetes manifests | Infrastructure (Layer 2) + Deployment (Layer 1) |
| `scripts/` | Build, deploy, and utility automation | Automation & Delivery (Layer 3) |
| `tests/` | Integration tests, E2E tests, test fixtures | Automation & Delivery (Layer 3) |
| `artifacts/` | Build outputs (gitignored) | Automation & Delivery (Layer 3) |
| `.github/` | CI/CD workflows, PR/issue templates | Automation & Delivery (Layer 3) |

### 7.3 Component Directory Pattern

```
<package-name>/              ← Flat at app/ level (no packages/ nesting)
  src/                  ← Source code
  tests/                ← Unit and integration tests (co-located)
  index.ts              ← Public API barrel export
  README.md             ← Self-documenting component guide
  package.json          ← Dependencies and scripts
  tsconfig.json         ← TypeScript config
```

**Invariant:** Every component directory MUST have a `README.md` that answers: what is this, how to use it, what it depends on, where its contract is defined.

### 7.4 File Naming Conventions

- Directories: `kebab-case` (e.g., `worker-runtime`, `tool-registry`)
- Core documentation: `SCREAMING_SNAKE_CASE` (e.g., `VISION.md`, `ARCHITECTURE.md`)
- Component READMEs: exactly `README.md`
- Source files: framework convention (e.g., `*.ts`, `*.py`)
- Test files: `*.test.ts` or `*.spec.ts` (co-located with source)
- No numeric prefixes, no dates in filenames
- All documentation in Markdown only

---

## 8. Data Flow

### 8.1 Complete Request Path

```
User/API Request
    │
    ▼
[Gateway] ─────────── AuthN, Rate Limiting, TLS
    │
    ▼
[Orchestrator] ───── AuthZ, Quota Check, Cost Estimate, Approval Gate
    │
    ▼
[Worker Runtime] ──── Context Loading (ContextSnapshot)
    │                   │
    ▼                   ▼
[Workspace Runtime] ── Workspace Provisioning → ACTIVE
    │
    ▼
[Worker] ──────────── Execute Task (tool invocations via Tool Registry)
    │                   │
    ▼                   ▼
[Evaluation] ──────── Output Validation, Quality Scoring
    │
    ▼
Response + Artifacts + Audit Log
```

### 8.2 Context Flow Between Workers

```
[Planning Service]
    │ produces: Tasks with context snapshots
    ▼
[Worker A] ── produces: Artifacts + Status + Knowledge
    │
    ▼
[Context Bus] ── updates Task Memory, Artifact Memory, Knowledge Memory
    │
    ▼
[Worker B] ── consumes: ContextSnapshot + upstream Artifacts + relevant Knowledge
    │
    ▼
[Evaluation] ── produces: Quality signals + Knowledge updates → Feedback Loop
```

### 8.3 Data Tenancy

| Scope | Boundary |
|---|---|
| **Tenant** | Isolated data namespace, separate credentials, separate billing |
| **Project** | Within tenant; shared memory, shared artifact store |
| **Session** | Within project and user; ephemeral state, TTL-bounded |
| **Task** | Within session and project; scoped context snapshot, scoped permissions |

---

## 9. Security Architecture

Security is enforced at every layer. See `docs/SECURITY.md` for the full security model.

```
┌─────────────────────────────────────────────────┐
│  EDGE: TLS 1.3, OIDC/OAuth, Rate Limiting       │
├─────────────────────────────────────────────────┤
│  ORCHESTRATION: PDP/PEP, RBAC, Approval Gates    │
├─────────────────────────────────────────────────┤
│  WORKER SANDBOX: cgroups, seccomp, read-only FS │
├─────────────────────────────────────────────────┤
│  SECRETS: External Vault, short-lived tokens     │
├─────────────────────────────────────────────────┤
│  NETWORK: Micro-segmentation, egress allowlists  │
├─────────────────────────────────────────────────┤
│  DATA: AES-256-GCM at rest, TLS 1.3 in transit  │
└─────────────────────────────────────────────────┘
```

Key principles:
- **Zero Trust**: No actor trusted implicitly
- **Least Privilege**: Task-scoped permissions, revoked on completion
- **Defense in Depth**: Independent enforcement at every layer
- **Secrets Never Persisted**: Credentials injected at invocation, never stored in workspaces

---

## 10. Core Design Decisions

| Decision | Rationale |
|---|---|
| Contracts in Worker Platform, not Application | Platform owns its interface surface; apps consume, don't define |
| Provider Registry as runtime indirection | Enables swap without rebuild; supports multi-provider during migration |
| Orthogonal Automation layer | CI/CD is a development concern, not runtime; should not couple to production |
| Infrastructure + Deployment as separate layers | Infrastructure is "what runs"; Deployment is "how it's configured"; distinct lifecycles |
| Governance centralized in Worker Platform | Single enforcement point; no governance logic scattered across apps or providers |
| Context snapshots for task isolation | Prevents drift during execution; enables audit and conflict detection |
| AGENTS.md as sole root file | Zero-configuration agent discovery; single entry point for navigation |
| Self-documenting directories (README.md contract) | Every agent knows where to find documentation without searching |
| Canonical concept definitions (no duplication) | Prevents documentation drift; one definition, many references |
| Workspace ephemerality with artifact extraction | Clean execution environment every time; only declared outputs persist |

---

## 11. Contract Validity Gates

These gates must hold for every component in the platform:

| Gate | Description |
|---|---|
| **GATE-01** | No Application file imports from a Platform Services file |
| **GATE-02** | No Worker Platform file imports a provider-specific library |
| **GATE-03** | Every Platform Service implements a contract defined in Worker Platform |
| **GATE-04** | Provider Registry is the ONLY mechanism for resolving service implementations |
| **GATE-05** | All cross-layer communication passes through contracts |
| **GATE-06** | Every component directory has a README.md |
| **GATE-07** | Every API contract uses URI versioning (`/api/v{N}/`) |
| **GATE-08** | All governed endpoints require Bearer token authentication |
| **GATE-09** | Tool Registry is the sole discovery mechanism — no hardcoded tool endpoints |
| **GATE-10** | Workers never call tools directly — all invocations flow through the platform proxy |

---

## 12. Navigation Map

This is the complete documentation topology. Every node is a file that exists or will exist in the reference implementation.

```
AGENTS.md (repo root)
  └─ docs/ARCHITECTURE.md  ← YOU ARE HERE
       ├─ VISION.md
       ├─ DEVELOPMENT.md
       ├─ DEPLOYMENT.md
       ├─ SECURITY.md
       ├─ GOVERNANCE.md
       ├─ WORKER_GUIDE.md
       ├─ ../worker-runtime/README.md
       ├─ ../workspace-runtime/README.md
       ├─ ../memory/README.md
       ├─ ../tool-registry/README.md
       ├─ ../planning/README.md
       ├─ ../evaluation/README.md
       ├─ ../governance/README.md
       ├─ ../contracts/README.md
       ├─ ../services/README.md
       ├─ ../apps/README.md
       ├─ ../infra/README.md
       ├─ ../scripts/README.md
       ├─ ../tests/README.md
       └─ ../.github/README.md
```

### 12.1 Entry Points by Goal

| Goal | Start Here |
|---|---|
| Understand the platform architecture | **This file** (`ARCHITECTURE.md`) |
| Understand the vision and principles | `VISION.md` |
| Set up a development environment | `DEVELOPMENT.md` |
| Deploy the platform | `DEPLOYMENT.md` |
| Write a worker | `WORKER_GUIDE.md` → `../worker-runtime/README.md` |
| Add a tool | `../tool-registry/README.md` |
| Understand governance | `GOVERNANCE.md` → `../governance/README.md` |
| Understand security model | `SECURITY.md` |
| Add a service provider | `../services/README.md` |
| Contribute code | `DEVELOPMENT.md` |
| Review architecture coherence | This file → all cross-referenced READMEs |

### 12.2 Navigation Properties

- **3-Read Guarantee**: Any documentation leaf is reachable in ≤ 3 file reads from `AGENTS.md`.
- **Breadcrumb Headers**: Every README.md has a parent link in its header.
- **Back Links**: Every README.md has a "Up" link in its navigation footer.
- **Canonical Definitions**: Every concept has exactly one definition location. All references are links.

---

## 13. Cross-Reference Index

| Concept | Canonical Location |
|---|---|
| Platform layers and dependency rules | `ARCHITECTURE.md` §2–4 (this file) |
| Worker interface contract | `../worker-runtime/README.md` |
| Workspace isolation model | `../workspace-runtime/README.md` |
| Context system (memory domains) | `../memory/README.md` |
| Tool registry and protocols | `../tool-registry/README.md` |
| Governance framework | `../governance/README.md` + `GOVERNANCE.md` |
| Planning and task decomposition | `../planning/README.md` |
| Evaluation and quality | `../evaluation/README.md` |
| Platform contracts (interfaces) | `../contracts/README.md` |
| Service provider implementations | `../services/README.md` |
| Repository conventions | `ARCHITECTURE.md` §7 (this file) |
| Agent auto-discovery | `AGENTS.md` (repo root) |
| Development setup | `DEVELOPMENT.md` |
| Deployment guide | `DEPLOYMENT.md` |
| Security model | `SECURITY.md` |
| Worker authoring guide | `WORKER_GUIDE.md` |

---

## Architecture Document Meta

- **Version**: 1.0.0 (Sprint 01)
- **Status**: Reference implementation skeleton
- **Authored**: 2026-06-19
- **Role**: design-uwp-vision-arch (TASK-009)
- **Next document to read**: `docs/VISION.md`
