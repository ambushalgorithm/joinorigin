# Memory Services

> **Parent:** [app/docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

Memory Services are the unified, persistent context layer for the Universal Worker Platform. They implement the principle that **Context Outlives Models**: context is a permanent asset while models, vendors, and workers are transient. Workers access and update memory exclusively through the context-contract interface — they never touch a memory store directly. Memory is versioned, searchable, snapshot-isolated, and fully survivable across worker changes, session crashes, and platform migrations.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Implementation: domain stores, context assembler, compactor, snapshot engine, persistence adapters |
| `tests/` | Unit and integration tests for all memory operations |
| `config.*` | Memory-specific configuration (TTL defaults, storage backends, encryption keys) |

## Contracts

### Implements
- **MemoryContract** (`contracts/memory-contract.ts`): The canonical interface applications code against for all memory operations.
- **Context-Contract Interface** (defined in [docs/ARCHITECTURE.md §6.2](../docs/ARCHITECTURE.md)): Read and write operations for task context, knowledge, artifacts, project state, and user preferences. This is the ONLY interface workers use to access memory.

### Depends On
- **Governance Services** (`../governance/README.md`): Authorization checks for every read/write operation. No memory access without permission validation.
- **Platform Services** (`../services/README.md`): Database (PostgreSQL), Cache (Redis), Object Storage (MinIO), Vector Storage (Qdrant), Search (Elasticsearch) for persistence backends across hot/warm/cold/frozen layers.
- **Worker Runtime** (`../worker-runtime/README.md`): Task assignment triggers context snapshot creation; task completion triggers artifact finalization.

### Exposes
- **Context API** (`/api/v1/context`): Create, read, update, versioned-history query for all context domains. JSON Merge Patch semantics with optimistic concurrency.
- **Artifact API** (`/api/v1/artifacts`): Register, upload (presigned URL), download, list, and soft-delete artifacts with SHA-256 integrity verification.
- **Knowledge Query Interface**: Ranked, tag-filtered, confidence-weighted knowledge retrieval for planning and worker consumption.
- **Snapshot Engine**: Creates point-in-time immutable context snapshots at task assignment time, preventing context drift during execution.

## Memory Domain Definitions

Six domains form the complete memory model. Every domain has a defined scope, lifecycle, ownership model, and access pattern.

### 1. User Memory

- **Scope:** Identity, preferences, permissions, history, personalization profiles for a single human or service-account user.
- **Lifecycle:** Created at first platform interaction. Persists indefinitely. Archived (never deleted) on deactivation.
- **Ownership:** The user. Workers read but never mutate identity/permission fields. Preferences mutable via explicit user action or admin.
- **Access Pattern:** Read-heavy. Workers read during task initialization. Planning services read to inform decomposition.
- **Key Fields:** `user_id`, `display_name`, `email`, `auth_providers[]`, `preferences`, `role_assignments[]`, `interaction_history`, `trust_score`.
- **Persistence:** Strongly consistent. User data is the root of the identity tree — all other domains link back to a user.

### 2. Project Memory

- **Scope:** Goals, constraints, standards, conventions, architecture decisions, team topology, long-lived configuration.
- **Lifecycle:** Created at project init. Persists for project lifetime. Archived on closure. Supports fork/clone lineage.
- **Ownership:** The project (collective team). Project lead authorizes structural mutations.
- **Access Pattern:** Read-heavy by all workers in the project. Mutations during sprint planning and architecture updates.
- **Key Fields:** `project_id`, `name`, `description`, `repository_uri`, `team`, `architecture`, `conventions`, `constraints`, `decisions` (ADR log), `sprint_history[]`.
- **Persistence:** Strongly consistent. Authoritative source for "how we work" and "what we're building."

### 3. Session Memory

- **Scope:** Ephemeral context for a single interaction window (CLI, web, API session). In-flight state, current focus, conversation thread, transient tool results.
- **Lifecycle:** Created at session start. Destroyed/archived at end. TTL: 24h idle → archive, 7d → prune. Sessions may be pinned for long-running ops.
- **Ownership:** The session initiator. Workers read/write within their session scope.
- **Access Pattern:** Read/Write-heavy. This is the "working memory" — high churn, low latency.
- **Key Fields:** `session_id`, `user_id`, `project_id`, `tool_results[]`, `conversation`, `active_task_id`, `context_stack`, `scratchpad`, `created_at`, `last_active_at`, `ttl_seconds`.
- **Persistence:** Eventually consistent, low-latency store (Redis / in-memory with WAL). Promoted to long-term on close if marked "save."

### 4. Task Memory

- **Scope:** Input, output, status, assignment, dependencies for a single unit of work. The atomic execution unit.
- **Lifecycle:** Created during planning. Persists through execution: pending → assigned → in-progress → completed | failed | cancelled. Archived after sprint closeout.
- **Ownership:** Assigned worker owns execution state. PM owns definition and acceptance criteria.
- **Access Pattern:** Read by workers during execution. Written on completion. Read by review/evaluation post-execution.
- **Key Fields:** `task_id`, `sprint_id`, `project_id`, `title`, `description`, `acceptance_criteria[]`, `status` (enum: 8 states), `assigned_role`, `assigned_model`, `priority`, `dependencies[]`, `artifacts_produced[]`, `context_snapshot`, `attempts[]`.
- **Persistence:** Strongly consistent. Task memory is the execution ledger — every action traces back to a task.

### 5. Knowledge Memory

- **Scope:** Curated, indexed, searchable knowledge: documentation, patterns, best practices, learned heuristics, reference implementations, model training data.
- **Lifecycle:** Continuously updated from planning, evaluation, and human contribution. Version history with deprecation markers.
- **Ownership:** The platform. Governance controls insertion and deprecation. Workers contribute via context-contract.
- **Access Pattern:** Read-heavy. Workers query during execution. Planning services query to decompose. Evaluation services query to validate.
- **Key Fields:** `knowledge_id`, `type` (enum: 6 types), `title`, `content`, `tags[]`, `source` (provenance), `confidence` (0.0–1.0), `usage_count`, `success_rate`, `version`, `deprecated`.
- **Persistence:** Strongly consistent with versioned history. Old versions never deleted, only deprecated. Enables "time travel" for context reconstruction.

### 6. Artifact Memory

- **Scope:** Tangible outputs: code files, configuration, test results, logs, build artifacts, generated documentation, reports, benchmark data.
- **Lifecycle:** Created during task execution. Immutable once finalized. Archived on sprint closeout. Logs/test results pruned by TTL.
- **Ownership:** Producing worker during execution. Transfers to project on completion. Governance controls retention and access.
- **Access Pattern:** Write-heavy during execution. Read-heavy during review, evaluation, and future task context.
- **Key Fields:** `artifact_id`, `task_id`, `sprint_id`, `project_id` (provenance chain), `type` (enum: 9 types), `mime_type`, `size_bytes`, `content_hash` (SHA-256), `path`, `status` (draft/final/archived), `lineage`, `quality_signals`.
- **Persistence:** Content-addressable store (CAS) for deduplication. Strong consistency for metadata. Append-only after finalization.

## Context Persistence Model — "Context Outlives Models"

### Design Principles

| Principle | Description |
|---|---|
| **Context as First-Class Asset** | Context is stored, versioned, searchable, and survivable independent of any model, worker, or session. No context is ever lost. |
| **Immutable Provenance** | Every mutation records: who changed it, when, via which worker/model, under which task. Full provenance chain always available. |
| **Model Independence** | Context stored in model-agnostic formats (JSON/YAML for metadata, CAS for artifacts). Workers access via context-contract only. |
| **Gradual Re-Comprehension** | Fresh workers receive progressive disclosure: summary → relevant subset → full detail. No need to load entire context on session start. |
| **Time-Travel Capability** | Any past state reconstructable via versioned history and immutable provenance. Enables audit, rollback, and what-if analysis. |

### Persistence Layers

```
Layer 1: Hot Context   → In-memory (Session Memory, active Task Memory)
Layer 2: Warm Context  → Low-latency store (active Project Memory, recent Knowledge, recent Artifacts)
Layer 3: Cold Context  → Long-term store (historical Sessions, archived Tasks, deprecated Knowledge, archived Artifacts)
Layer 4: Frozen Context → Compressed archive (closed projects, very old sessions, pruned logs)
```

- **Promotion:** Hot → Warm on session checkpoint (every N minutes). Warm → Cold on sprint closeout. Cold → Frozen by TTL.
- **Demotion:** On-demand thaw of cold/frozen for audit, analysis, or knowledge retrieval.
- **Consistency:** Hot/Warm eventually consistent with strong consistency within a single session. Cold/Frozen immutable.

### Context Snapshots

- A point-in-time, immutable copy of all relevant memory domains for a task at assignment time.
- Created when: task assigned to worker, session checkpoints, or sprint gates.
- **Purpose:** Prevents context drift — workers operate against stable snapshots even if upstream context changes.
- **Contents:** Project Memory (architecture, conventions, constraints), relevant Knowledge, Task definition, upstream Artifacts.
- **Drift detection:** Evaluation services compare snapshot against post-task context state. Drift above threshold → task may be re-queued.

### Survivability Guarantees

- **Model changes:** Context in model-agnostic formats. Survives model vendor switches.
- **Vendor changes:** No vendor-specific metadata in context layer.
- **Worker changes:** Task reassignment loads fresh snapshot into new worker with full provenance.
- **Session crashes:** Session memory checkpointed to warm layer; reconstructed from last checkpoint on recovery.
- **Platform migration:** Portable formats with documented schemas. Export/import pipelines are platform infrastructure.

## Context-Contract Interface Specification

The context-contract is the ONLY interface through which workers access and update memory. It enforces authorization, immutability, provenance tracking, and snapshot isolation.

### Read Operations

| Operation | Returns | Authorization |
|---|---|---|
| `readTaskContext(task_id)` | TaskContext (task + snapshot + session) | Assigned worker, PM, reviewer |
| `readKnowledge(query)` | KnowledgeMemory.Entry[] (ranked) | Any worker |
| `readArtifact(artifact_id)` | ArtifactMemory.Entry + content_ref | Any worker in project |
| `readProjectContext(project_id)` | ProjectMemory.Entry | Any worker in project |
| `readUserContext(user_id)` | UserMemory.Entry | Worker (own), governance (all) |

### Write Operations

| Operation | Purpose | Authorization |
|---|---|---|
| `writeArtifact(task_id, draft)` | Creates artifact in draft status | Assigned worker |
| `finalizeArtifact(artifact_id, signals)` | Marks artifact final (immutable after) | Producing worker |
| `updateTaskStatus(task_id, update)` | Updates task status | Assigned worker (status), PM (definition) |
| `contributeKnowledge(entry)` | Draft knowledge for review | Any worker (draft), governance (approve) |
| `logContextDiff(task_id, diff)` | Records read/write set for drift detection | Assigned worker |

### Authorization Matrix

| Domain | Read | Write (Create) | Write (Mutate) | Archive/Delete |
|---|---|---|---|---|
| User | worker (own), governance (all) | admin only | admin only | admin (soft delete) |
| Project | any worker in project | PM, governance | PM, governance | governance (archive) |
| Session | session owner | session owner | session owner only | TTL auto-prune |
| Task | assigned worker, PM, reviewer | PM (create), worker (status) | worker (status only) | sprint closeout (archive) |
| Knowledge | any worker | worker (draft), governance (approve) | governance only | governance (deprecate) |
| Artifact | any worker in project | assigned worker (draft → final) | NEVER (immutable after finalize) | TTL policy or governance |

### Provenance Guarantee

Every mutation records: `actor` (worker_id, model_id, session_id), `timestamp` (ISO-8601), `operation` (method called), `inputs` (cryptographic hash), `outputs` (cryptographic hash). This provenance chain is immutable and queryable for audit, compliance, and quality analysis.

## Implementation Guidance

### What to build

1. **Domain Store Interfaces:** Abstract base interfaces for each of the six memory domains. Each domain store must support CRUD, versioned history, and TTL-based lifecycle management. Start with in-memory implementations; back with PostgreSQL + Redis as the platform matures.

2. **Context Assembler:** The component that composes a `ContextSnapshot` from multiple domain stores. On task assignment, it reads User Memory (preferences), Project Memory (architecture, conventions, constraints), Knowledge Memory (relevant entries ranked by confidence × usage), and Artifact Memory (upstream dependency artifacts), merges them into a single immutable snapshot object, and assigns it to the task.

3. **Memory Compactor:** Periodically promotes data across persistence layers (Hot → Warm, Warm → Cold, Cold → Frozen). Must respect configured TTLs per domain. Must produce compressed, portable archive formats for frozen layers. Must support on-demand "thaw" of cold/frozen context.

4. **Snapshot Engine:** Creates point-in-time copies of context for task assignment. Must be atomic — no partial snapshots. Must version each snapshot with a monotonic counter. Must support comparison between snapshots (drift detection).

5. **Persistence Adapters:** Pluggable backends per layer:
   - Hot: Redis or in-memory with write-ahead log.
   - Warm: PostgreSQL with JSONB columns for flexible domain schemas.
   - Cold: MinIO (S3-compatible) object storage with JSON dump format.
   - Frozen: Compressed tar/parquet archives on MinIO.

6. **Context-Contract API Gateway:** Exposes the read/write operations defined above as REST endpoints (`/api/v1/context`, `/api/v1/artifacts`). Must integrate with Governance PEP for authorization on every call. Must implement JSON Merge Patch semantics for context updates with optimistic concurrency (version field).

7. **Artifact CAS (Content-Addressable Store):** Deduplication via SHA-256 content hashing. Presigned URL generation for upload/download. Lifecycle rules for auto-expiry of temp objects. Streaming upload support for large artifacts (>100 MB).

### Key design constraints

- **No worker touches a domain store directly.** Every access flows through the context-contract interface. This enforces authorization, provenance, and snapshot isolation at a single choke point.
- **Artifacts are immutable after finalize.** Once `finalizeArtifact()` succeeds, the artifact content and metadata are append-only. New versions get new `artifact_id` values.
- **Knowledge is never deleted, only deprecated.** Old knowledge entries remain queryable for audit and time-travel. Deprecation records a `replacement_knowledge_id`.
- **Snapshots are immutable.** Once created, a context snapshot is never modified. If context changes during execution, a new task may need a fresh snapshot.
- **Encryption at rest for all layers** (AES-256-GCM). Encryption in transit via TLS 1.3.
- **Model-agnostic storage formats.** No model-specific embeddings, token counts, or vendor metadata in the persistence layer. All such data lives in a separate model-metadata domain if needed.
- **Provenance is mandatory and automatic.** The context-contract records provenance on every mutation — implementers must not bypass it.

### Integration points

- **Governance PEP** must authorize every context-contract operation. The memory component calls `/api/v1/governance/permissions/check` before executing reads or writes.
- **Planning Services** read Project Memory, Knowledge Memory, and Artifact Memory to decompose work. They write Task Memory entries.
- **Evaluation Services** read Task Memory and Artifact Memory to validate quality. They write Knowledge Memory (patterns, heuristics) and Artifact quality signals.
- **Worker Runtime** triggers snapshot creation on task assignment and artifact finalization on task completion.
- **Observability:** Prometheus metrics for `context_operations_total{domain, operation}`, `snapshot_creation_duration_seconds`, `artifact_upload_bytes_total`.

## Concepts

- **Context Snapshot:** A point-in-time, immutable copy of all relevant memory domains for a task at assignment time. Prevents context drift.
- **Context Diff:** A structured record of what context was read and what was produced during a task execution. Used by evaluation services for drift detection.
- **Memory Compactor:** The component that promotes data across hot/warm/cold/frozen layers per TTL policy.
- **Content-Addressable Store (CAS):** Storage where objects are identified by their content hash (SHA-256), enabling automatic deduplication.
- **Provenance Chain:** The immutable, cryptographically-signed log of every memory mutation — who, when, what operation, with what inputs/outputs.

## Navigation

- **Up:** [app/docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [app/tool-registry/README.md](../tool-registry/README.md), [app/worker-runtime/README.md](../worker-runtime/README.md), [app/governance/README.md](../governance/README.md), [app/evaluation/README.md](../evaluation/README.md), [app/planning/README.md](../planning/README.md)
- **Architecture contracts:** See [docs/ARCHITECTURE.md §6.2](../docs/ARCHITECTURE.md) for context system and [docs/ARCHITECTURE.md §6.4](../docs/ARCHITECTURE.md) for integration model
