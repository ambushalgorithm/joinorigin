# Worker Runtime

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical platform architecture overview

## Purpose

The Worker Runtime is the execution engine of the Universal Worker Platform. It accepts task descriptions from the platform scheduler, instantiates workers via the `IWorker` interface contract, manages the full execution lifecycle (from task acceptance through context loading, workspace provisioning, execution, review, and completion), and produces artifacts as the durable output of each task. It is the central runtime component in the Worker Platform layer (Layer 5).

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Worker Runtime implementation source code |
| `tests/` | Unit and integration tests for the runtime |
| `index.ts` | Public API barrel export (entrypoint) |
| `README.md` | This file — self-documenting component guide |

## Contracts

### Implements

- **Worker Lifecycle Manager**: Manages worker registration/deregistration, health monitoring, heartbeat tracking, graceful shutdown (see [arch-uwp-worker-contract §1, §4](#)).
- **Task Queue Consumer**: Accepts task dispatch, performs pre-flight capability matching, binds tasks to capable workers (see [arch-uwp-worker-contract §3](#)).
- **Artifact Pipeline**: Orchestrates artifact generation, registration, validation, and finalization flow through the Context Contract (see [arch-uwp-worker-contract §5](#)).
- **Progress & Reporting**: Enforces heartbeat protocol (30s per active task, 30s global), streams progress reports, detects stalled/unhealthy workers (see [arch-uwp-worker-contract §7](#)).
- **Execution Loop**: Runs the canonical worker execution loop: accept → context → workspace → execute → artifacts → review → complete (see [arch-uwp-worker-contract §4.2](#)).

### Depends On

- **[Workspace Runtime](../workspace-runtime/README.md)**: Provisions and manages isolated execution environments per task invocation (Docker containers, Kubernetes pods, ECS/Fargate tasks, Cloud Run).
- **[Context Contract](../contracts/README.md)**: The sole interface for workers to read task context, write artifacts, update task status, and contribute knowledge. Defined in [arch-uwp-context-system §4](../docs/ARCHITECTURE.md).
- **[Governance Services](../governance/README.md)**: Permission checks, approval gates, audit logging — enforced at the Worker Runtime boundary before task execution and tool invocation.
- **[Tool Registry](../tool-registry/README.md)**: Tool discovery and resolution for workers declaring tool capabilities.
- **[Memory Services](../memory/README.md)**: Context snapshots, session memory, knowledge memory — all accessed through the Context Contract interface only.

### Exposes

- **Worker Registration API**: `POST /api/v1/workers` — register a worker with its CapabilitySet
- **Task Dispatch API**: `POST /api/v1/tasks/{id}/invoke` — enqueue and route a task to a suitable worker
- **Worker Status API**: `GET /api/v1/workers/{id}/status` — query worker state (ACTIVE, BUSY, DRAINING, etc.)
- **Progress Streaming**: WebSocket channel for real-time progress reports per task
- **Task Lifecycle Endpoints**: Status queries, cancellation, artifact listing per task

## Concepts

- **Worker**: Any entity implementing the `IWorker` interface contract. Can be an AI agent, human, or custom runtime. Every worker has a `worker_type` (e.g., `opencode`, `claude-code`, `human`), a `CapabilitySet` describing its abilities, and an identity registered with the platform (see [arch-uwp-worker-contract §1](#)).

- **CapabilitySet**: A declaration of what a worker can do — workspace support, workspace types it can operate in, max concurrent tasks, tool protocols, streaming support, review participation, and memory domain access. Workers MUST NOT over-claim capabilities (see [arch-uwp-worker-contract §1.2](#)).

- **IWorker Interface**: The canonical contract every worker MUST implement. Defines 12 methods: `register()`, `deregister()`, `health()`, `accept(task)`, `reject(handle, reason)`, `execute(handle)`, `onProgress(handle)`, `onStatusChange(handle)`, `complete(handle)`, `cancel(handle)`, `pause(handle)`, `resume(handle)`. Human workers use the same interface — only `worker_type` differs (see [arch-uwp-worker-contract §2](#)).

- **Task Lifecycle**: A state machine of 14 states from `CREATED` → `QUEUED` → `ACCEPTED` → `CONTEXT_LOADED` → `WORKSPACE_READY` → `IN_PROGRESS` → `ARTIFACTS_GENERATED` → `IN_REVIEW` → `COMPLETED`. Terminal states: `COMPLETED`, `FAILED`, `CANCELLED`. No worker may invent new states (see [arch-uwp-worker-contract §3](#)).

- **TaskHandle**: An opaque reference created when a worker accepts a task. Tracks the task's current state, registered artifacts, context snapshot binding, and workspace binding throughout execution.

- **Artifact**: The durable, immutable output of task execution. Types include `source_code`, `document`, `test_result`, `review_report`, `configuration`, `benchmark`, `log`, `approval`. Produced via `writeArtifact()` on the Context Contract, finalized via `finalizeArtifact()`. Artifacts are the ONLY persistent output — workspace content is ephemeral (see [arch-uwp-worker-contract §5.2](#)).

- **Heartbeat Protocol**: Workers emit a progress report per active task every 30s and a global WorkerStatus heartbeat every 30s. Missing task heartbeat for 120s → task marked STALLED. Missing global heartbeat for 90s → worker marked UNHEALTHY. Tasks of unhealthy workers are reassigned (see [arch-uwp-worker-contract §7.2](#)).

- **Shutdown Sequence**: Workers set status to `DRAINING`, complete in-flight tasks (max `drain_timeout`, default 300s), cancel any remaining, call `deregister()`, stop heartbeat, exit. On SIGTERM, workers initiate this sequence immediately. Platform reaper destroys orphaned workspaces (see [arch-uwp-worker-contract §4.3, §6.9](#)).

- **Worker Statuses**: `STARTING` (registration in progress), `ACTIVE` (healthy, accepting tasks), `BUSY` (at concurrency limit), `DRAINING` (shutting down, completing in-flight), `INACTIVE` (deregistered or heartbeat lost), `UNHEALTHY` (health check failing) (see [arch-uwp-worker-contract §2.3](#)).

## Implementation Guidance

### What someone building a Worker Runtime needs to know

1. **You are implementing the `IWorker` contract interface.** Every method in the interface (12 total) must be implemented. The platform treats every worker — human, AI agent, or custom runtime — identically through this interface.

2. **The Task Lifecycle is authoritative.** You must implement the 14-state state machine exactly as defined. No invented states, no invalid transitions. `CANCELLED` must be valid from any pre-terminal state. `REJECTED` tasks return to `QUEUED`; after 3 rejections they transition to `FAILED`.

3. **Context access goes through one door.** Workers MUST NOT access any memory domain directly. All context reads go through `readTaskContext()`, all writes through `writeArtifact()`, `updateTaskStatus()`, `contributeKnowledge()`, and `logContextDiff()`. This is enforced by the Context Contract (see TASK-004 in ARCHITECTURE.md).

4. **Workspaces are ephemeral — artifacts are permanent.** Everything in a workspace filesystem is destroyed on `TERMINATED`. Only content extracted from `/workspace/artifacts/` during DRAINING persists. Workers write artifacts to `/workspace/artifacts/` and register them via the Context Contract.

5. **Heartbeats are mandatory.** Without them, the platform considers your worker dead and reassigns its tasks. Implement both per-task heartbeats (every 30s) and global heartbeats (every 30s).

6. **Credentials never touch disk.** Auth tokens are held in memory only. Workspaces receive context via environment variables, never from files. Secrets injection flows through the Governance API with short-lived credentials.

7. **Registration is the gate.** A worker MUST complete `register()` successfully before accepting any tasks. Registration is idempotent — re-registration updates capabilities. Workers declare their `CapabilitySet` accurately — over-claiming is detected and rejected.

8. **Graceful shutdown is required.** On SIGTERM, set status to DRAINING, complete in-flight tasks, cancel remaining after drain_timeout, call deregister(), stop heartbeat, exit. This prevents orphaned tasks.

9. **Every terminal task state triggers workspace teardown.** COMPLETED, FAILED, CANCELLED — the platform MUST tear down the workspace. An orphan workspace reaper runs every 60s to clean up after crashed/disconnected workers.

10. **The platform is worker-type agnostic.** New worker types register by implementing `IWorker`. The platform MUST NOT depend on any specific worker framework. This is the platform's most fundamental contract constraint (Non-Negotiable Constraint N1).

11. **Pre-flight checks before execution.** Before executing a task, validate: does the worker support workspaces (if task requires one)? Are the task's required tools a subset of the worker's tool capabilities? Reject immediately if not — don't fail mid-execution.

12. **Error handling follows standard error codes.** Use the 10 standard error codes (e.g., `context_load_failed`, `workspace_lost`, `execution_timeout`, `tool_unavailable`). Each error code specifies whether the task is retryable and by whom.

## Contract Validity Gates

These gates must hold for every Worker Runtime implementation:

- [ ] GATE-WORKER-01: Implements ALL 12 methods of the `IWorker` interface
- [ ] GATE-WORKER-02: Respects the task lifecycle state machine — no invented states, no invalid transitions
- [ ] GATE-WORKER-03: Reports progress (heartbeat) every 30s per active task
- [ ] GATE-WORKER-04: Consumes context ONLY through the Context Contract interface
- [ ] GATE-WORKER-05: Produces artifacts through the Context Contract `writeArtifact` method
- [ ] GATE-WORKER-06: NEVER stores platform credentials in workspace filesystems
- [ ] GATE-WORKER-07: Handles SIGTERM gracefully with drain, deregister, exit sequence
- [ ] GATE-WORKER-08: Capability declaration accurately reflects abilities — no over-claiming
- [ ] GATE-WORKER-09: Workspace teardown triggered for every terminal task state, even on crash/disconnect
- [ ] GATE-WORKER-10: Platform does not depend on any specific worker type

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [Workspace Runtime](../workspace-runtime/README.md), [Memory Services](../memory/README.md), [Tool Registry](../tool-registry/README.md), [Governance Services](../governance/README.md)
- **Children:** `src/`, `tests/`
