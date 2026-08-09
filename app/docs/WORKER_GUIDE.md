# Worker Guide — How to Operate in This Platform

> **Parent:** [ARCHITECTURE.md](ARCHITECTURE.md) — platform layer model and component map

## Purpose

This is the **comprehensive manual for every agent worker** operating in the Universal Worker Platform (UWP). Every worker — human, AI agent, or automated service — must understand the content of this guide before accepting tasks.

This guide covers: role boundaries, handoff contracts, repository navigation, platform conventions, task lifecycle, workspace isolation, quality gates, error handling, context consumption, and artifact production.

---

## Core Requirements

These rules are non-negotiable. Every worker, service, and component you build
must comply.

- **Containerization is mandatory.** Every service, app, tool, or worker MUST
  include a Dockerfile and be wired into docker-compose.yml. `git clone + docker compose up`
  must produce a fully operational environment with zero host dependencies.
  Never run anything directly on the host. See AGENTS.md Agent Rules.

---

## 1. Worker Identity & Registration

### 1.1 Who You Are

Every worker in the platform has a registered identity with a `worker_type`:

| Worker Type | Description |
|---|---|
| `human` | A person operating through the platform UI or CLI. Same `IWorker` interface. |
| `cortex`, `claude-code`, `codex`, `opencode`, `gemini-cli`, `openhands`, `aider`, `cline`, `roo-code` | AI coding agents implementing the `IWorker` contract. |
| `custom` | Custom worker implementations registered by developers. |

### 1.2 Capability Declaration

When you register, you declare your capabilities. The platform uses these to match you with tasks:

| Capability | Required For |
|---|---|
| `supports_workspace` | Tasks requiring a filesystem environment (container/VM) |
| `workspace_types` | Specific backend types (docker-container, kubernetes-pod, etc.) |
| `max_concurrent_tasks` | Simultaneous task handling capacity |
| `supports_streaming` | Tasks requiring progress streaming |
| `supports_review` | Participating in review/approval loops |
| `tool_protocols` | Tool types you can invoke (MCP, REST, etc.) |
| `memory_domains` | Memory domains you can access |

### 1.3 Registration Protocol

```
1. Obtain platform credentials (config, env var, or CLI argument)
2. Call register() with your CapabilitySet
3. Platform validates and returns worker_id + auth_token
4. Store auth_token in MEMORY ONLY — NEVER on disk, NEVER in workspace
5. Begin heartbeat loop (every 30 seconds)
6. Enter poll/push loop for task assignment
```

---

## 2. Role Boundaries — What You MUST and MUST NOT Do

### 2.1 The Contract

Your role is defined by the task you accept. You operate within strict boundaries.

**MUST:**
- Execute ONLY the task assigned to you (identified by `task_id`)
- Consume context ONLY through the Context Contract interface
- Produce artifacts as your tangible output
- Report progress with heartbeats every 30 seconds per active task
- Transition through the official task lifecycle states — never invent new states
- Handle errors gracefully and report them with standard error codes
- Respect all governance decisions — if denied, stop and report
- Request secret access through the Governance API (never hardcode or guess)
- Operate within resource limits (CPU, memory, time, tool invocations)
- Release resources on task completion, failure, or cancellation

**MUST NOT:**
- Modify files outside the scope of your current task
- Access memory domains directly — always use the Context Contract
- Communicate with other workers directly (inter-worker communication is disabled by default)
- Store credentials or secrets in workspace filesystems
- Exceed resource quotas (CPU, memory, storage, network, tool count)
- Invoke tools not in your allowed toolset
- Modify governance policies, role assignments, or platform configuration
- Access network destinations not on the egress allowlist
- Ignore governance denials or approval requirements
- Create side effects outside your task's declared artifact outputs

### 2.2 Role Boundary Examples

| Scenario | Allowed? | Why |
|---|---|---|
| Your task is to fix a bug in `auth.ts`. You notice a typo in `database.ts`. You fix it. | **NO** | Task scope is `auth.ts`. The typo is outside scope. Report in notes. |
| Your task is to write `SECURITY.md`. You want to add a section to `ARCHITECTURE.md`. | **NO** | Stay within your produced files. Cross-reference, don't modify another's output. |
| Governance denies your tool invocation. You try a different tool instead. | **NO** | If governance blocks an action, STOP. Report. Do not attempt workarounds. |
| Your task creates three files. You discover a missing dependency file. | **Maybe** | Only create files in your task description. Report missing deps in handoff notes. |

### 2.3 Handoff Contracts

When you complete a task, you produce a **handoff** — the structured record of what you consumed and produced.

Your handoff contract is defined in your role file:
- **Consume**: The handoff file(s) you must read for input context
- **Produce**: The handoff file you must update with your output
- **Must include**: What content your output section must contain

Always check your role file for the exact handoff contract before starting work.

---

## 3. Repository Navigation

### 3.1 First Steps (The 3-Read Guarantee)

```
1. Read AGENTS.md at repo root             — project identity + navigation map
2. Read app/docs/ARCHITECTURE.md            — platform layers + component map
3. Navigate to component READMEs as needed  — detailed component documentation
```

You NEVER need to search, glob, or guess file locations. Every file name is predictable.

### 3.2 Directory Map

```
cortex/client/
  AGENTS.md                          ← START HERE
  app/
    docs/                            ← Core documentation
      ARCHITECTURE.md, VISION.md,
      DEVELOPMENT.md, DEPLOYMENT.md,
      SECURITY.md, GOVERNANCE.md,
      WORKER_GUIDE.md
    apps/                            ← Deployable services
    packages/                        ← Shared libraries
      worker-runtime/, workspace-runtime/,
      tool-registry/, memory/,
      planning/, evaluation/,
      governance/, contracts/, services/
    infra/                           ← Infrastructure-as-code
    scripts/                         ← Automation scripts
    tests/                           ← Cross-cutting tests
    artifacts/                       ← Build outputs (gitignored)
    .github/                         ← CI/CD workflows
```

### 3.3 File Naming Conventions

| Pattern | Convention | Example |
|---|---|---|
| Documentation | `SCREAMING_SNAKE_CASE.md` | `ARCHITECTURE.md`, `SECURITY.md` |
| Component README | `README.md` (exact casing) | `packages/worker-runtime/README.md` |
| Source files | `kebab-case.ext` | `worker-runtime.ts`, `config.yaml` |
| Test files | `*.test.ext` or `*.spec.ext` | `worker-runtime.test.ts` |
| Barrel exports | `index.ts` (TS), `__init__.py` (Python) | `packages/contracts/index.ts` |
| Environment templates | `.env.example` | `.env.example` |

### 3.4 Forbidden Patterns

The following are explicitly forbidden at every level:
- Root-level config files (`package.json`, `Makefile`, etc.)
- Hidden committed directories (`.config/`, `.settings/`, `.vscode/`)
- Non-Markdown documents in `docs/` (no PDFs, DOCX, HTML)
- File names with dates (e.g., `roadmap-2026.md`) — versioning is git's job
- Numeric-prefixed files (e.g., `01-intro.md`) — ordering is via cross-references
- Symlinks crossing the `app/` boundary
- Binary files committed outside `artifacts/`

---

## 4. Task Lifecycle — Your Execution Loop

### 4.1 Lifecycle State Machine

```
CREATED → QUEUED → ACCEPTED → CONTEXT_LOADED → WORKSPACE_READY → IN_PROGRESS
                                                                      │
                                                                      ├→ ARTIFACTS_GENERATED → IN_REVIEW → COMPLETED
                                                                      │
                                                                      ├→ PAUSED → IN_PROGRESS (resume)
                                                                      │
                   │             │               │
                   ▼             ▼               ▼
                CANCELLED    REJECTED     CANCELLED / FAILED
                             (→ QUEUED)
```

**Terminal states**: `COMPLETED`, `FAILED`, `CANCELLED`

### 4.2 States You Control

| State | Entered By | Meaning |
|---|---|---|
| `ACCEPTED` | `accept(task)` | You've claimed this task |
| `CONTEXT_LOADED` | `readTaskContext(task_id)` success | All context loaded and validated |
| `IN_PROGRESS` | `execute(handle)` | Actively executing |
| `ARTIFACTS_GENERATED` | All required artifacts registered | Output complete; ready for review |
| `PAUSED` | `pause(handle)` | Suspended (e.g., waiting for input) |
| `FAILED` | Error report | Task failed; resources released |
| `REJECTED` | `reject(handle, reason)` | Cannot complete; returns to QUEUED |

### 4.3 Transition Rules

- Transitions MUST be **atomic** — no intermediate visible state.
- Any terminal state MUST trigger workspace teardown.
- After 3 rejections by distinct workers: task → `FAILED` with `exhausted_workers`.
- `PAUSED` tasks auto-convert to `FAILED` after `max_pause_duration` (default: 3600s).
- A task MUST NOT transition to `COMPLETED` unless ALL required artifacts are registered.

### 4.4 Execution Loop (Pseudocode)

```
while worker.status is ACTIVE or DRAINING:
  task = await platform.dispatch(worker_id)
  if task is None: sleep(poll_interval); continue

  if task requires workspace and I don't support_workspace:
    reject(task, "workspace_unsupported"); continue
  if task requires tools not in my tool_protocols:
    reject(task, "tools_unsupported"); continue

  handle = await accept(task)
  context = await contextContract.readTaskContext(task.task_id)
  handle.transition(CONTEXT_LOADED)

  if task.workspace_required:
    workspace = await platform.provisionWorkspace(task.task_id, worker_id, config)
    await bind(workspace)
    handle.transition(WORKSPACE_READY)

  try:
    await execute(handle)
    handle.transition(ARTIFACTS_GENERATED)
    await complete(handle)
  catch error:
    handle.transition(FAILED, error)
  finally:
    releaseResources(handle.workspace_id)
```

---

## 5. Context Consumption — How You Get Information

### 5.1 What You Receive on Task Assignment

1. **Task Definition** (TaskMemory) — what to do, acceptance criteria, priority, dependencies
2. **Context Snapshot** (composite) — project conventions, architecture, relevant knowledge, upstream artifacts
3. **Session Context** (SessionMemory) — active conversation, tool results, scratchpad
4. **User Context** (UserMemory) — preferences, identity, permissions

### 5.2 Access Rules

- Access context ONLY through the Context Contract (`readTaskContext`, `readKnowledge`, `readArtifact`).
- You operate against a **snapshot** — not live context. This prevents drift.
- If upstream context changes during execution, continue against your snapshot. Drift detected post-completion.
- You MUST NOT access memory domains directly.

### 5.3 Domain Access Matrix

| Domain | Read | Write | Notes |
|---|---|---|---|
| **User Memory** | Own profile | NEVER | Identity and permissions |
| **Project Memory** | Architecture, conventions, constraints | NEVER | How the project works |
| **Session Memory** | Conversation, tool results | Own session only | Working memory |
| **Task Memory** | Task definition, status | Status updates only | Your assigned task |
| **Knowledge Memory** | Patterns, best practices | Draft contributions | Learned knowledge |
| **Artifact Memory** | Upstream artifacts | Create + finalize | Tangible outputs |

---

## 6. Artifact Production — Your Tangible Output

### 6.1 Artifact Types

| Type | Examples |
|---|---|
| `source_code` | Modified source files, patches, new implementations |
| `document` | Architecture docs, READMEs, specifications, plans |
| `test_result` | Test outputs, coverage reports |
| `review_report` | Review findings, approvals, rejections |
| `configuration` | Config files, environment definitions |
| `benchmark` | Performance measurements, timing data |
| `log` | Execution logs, traces |
| `approval` | Signed approval tokens (no content body) |

### 6.2 How to Produce Artifacts

```
1. Create the artifact content (in workspace or in memory)
2. Call writeArtifact(task_id, artifactDraft) on Context Contract
3. Platform validates: checksum matches, size within limits, type valid
4. Platform stores content, assigns artifact_id, returns content_ref
5. Register artifact_id in your task handle's artifacts list
6. ALL required artifacts MUST be registered before ARTIFACTS_GENERATED
```

### 6.3 Artifact Constraints

- Maximum individual artifact size: 100 MB (larger requires streaming upload)
- Artifact retention: sprint duration + 90-day archive period
- All artifacts must have a SHA-256 checksum for integrity verification
- Artifacts are **immutable** after finalization — new versions get new artifact_ids
- Only `/workspace/artifacts/` content is persisted after workspace teardown

---

## 7. Workspace Isolation — Your Execution Environment

### 7.1 Workspace Filesystem

| Path | Permissions | Purpose |
|---|---|---|
| `/workspace/source/` | Read-only (unless task allows mutation) | Source code relevant to the task |
| `/workspace/artifacts/` | Read/Write | Artifact generation; platform extracts from here |
| `/workspace/deps/` | Read-only | Runtime dependencies (packages, libraries) |
| `/workspace/tmp/` | Read/Write | Ephemeral scratch space; cleared on termination |

### 7.2 Workspace Rules

- Write ONLY to `/workspace/artifacts/` and `/workspace/tmp/`.
- Workspace filesystem is **ephemeral** — destroyed on `TERMINATED`.
- No platform credentials in workspace filesystems.
- No inter-worker communication (network isolation).
- Egress only to pre-approved endpoints (allowlist).

### 7.3 Workspace Types

| Type | Isolation | Use Case |
|---|---|---|
| `docker-container` | Container namespaces | Local dev, CI |
| `docker-compose` | Multi-container | Multi-service apps |
| `kubernetes-pod` | Pod namespaces + network policies | Production CI/CD |
| `vm` | Full VM (KVM, Firecracker) | Untrusted code |
| `ecs-task` | AWS ECS | AWS-native |
| `fargate-task` | Serverless container | Serverless |
| `cloud-run` | Serverless container (gVisor) | Serverless HTTP |

### 7.4 Resource Limits Per-Workspace

| Resource | Default | Hard Maximum | If Exceeded |
|---|---|---|---|
| CPU | 1 vCPU | 4 vCPU | Throttled (cgroups) |
| Memory | 512 MB | 4 GB | OOM killed |
| Storage (scratch) | 1 GB | 10 GB | Write fails (ENOSPC) |
| Network egress | 100 MB | 1 GB | Packets dropped |
| Execution time | 300s (5 min) | 3600s (1 hr) | SIGALRM → SIGKILL |
| Tool invocations | 50 | 500 | Invocation blocked |
| Concurrent tasks | 1 | 10 (per worker) | Task queued |
| API rate | 10 req/s | 100 req/s | 429 Too Many Requests |

---

## 8. Progress & Reporting

### 8.1 Heartbeat Protocol

- **Task heartbeat**: Every 30 seconds per active task. Include `progress_pct`, `current_phase`, `message`.
- **Global heartbeat**: Every 30 seconds. Report `WorkerStatus` (no task_id).

Failure to heartbeat:
- Task heartbeat stale > 120s → task marked `STALLED`, may be reassigned
- Global heartbeat stale > 90s → worker marked `UNHEALTHY`, active tasks may be reassigned

### 8.2 Progress Report Schema

```json
{
  "report_id": "uuid-v7",
  "task_id": "uuid",
  "worker_id": "uuid",
  "timestamp": "ISO-8601",
  "status": "IN_PROGRESS",
  "progress_pct": 45,
  "message": "Compiling TypeScript sources (45% complete)",
  "current_phase": "build",
  "artifact_count": 3,
  "metrics": { "lines_changed": 120, "tests_passed": 34 }
}
```

### 8.3 Status Transition Reporting

Emit a progress report on **every status transition**. The `onStatusChange` stream yields on every transition.

---

## 9. Error Handling

### 9.1 Standard Error Codes

| Error Code | Description | Retryable |
|---|---|---|
| `context_load_failed` | Required context domain unavailable or corrupt | Yes |
| `workspace_provision_failed` | Workspace environment could not be created | Yes |
| `workspace_lost` | Workspace became unavailable during execution | Yes |
| `execution_timeout` | Task exceeded `max_runtime_seconds` | Yes (higher timeout) |
| `tool_unavailable` | Required tool not available or failed | Yes |
| `governance_blocked` | Governance rule prevented action | No (unless rule changes) |
| `artifact_validation_failed` | Produced artifact failed validation | Yes |
| `internal_error` | Unexpected worker internal error | Yes (different worker) |
| `exhausted_workers` | Task rejected by 3 distinct workers | No |
| `cancelled_by_user` | User or platform cancelled the task | No |

### 9.2 Error Report Schema

```json
{
  "error_code": "execution_timeout",
  "message": "Task exceeded maximum runtime of 300 seconds",
  "stack_trace": "at Worker.execute() ...",
  "retryable": true,
  "context": { "phase": "testing", "duration_seconds": "312" }
}
```

### 9.3 Graceful Degradation

| Scenario | Response |
|---|---|
| **Platform unreachable (>120s)** | Pause heartbeat. Retry every 10s with exponential backoff (cap: 60s). Continue active tasks locally. Report when connection restores. |
| **Workspace unavailable mid-execution** | Transition to `FAILED` with `workspace_lost`. |
| **SIGTERM received** | Set DRAINING, complete in-flight tasks, drain timeout (300s max), cancel remaining, deregister(), stop heartbeat, exit. |
| **Governance denial** | STOP. Do not attempt workarounds. Report denial. |
| **Tool invocation failure** | Retry up to 3 times with exponential backoff. If still failing: `tool_unavailable`. |

---

## 10. Quality Gates

### 10.1 Self-Verification Checklist

Before marking any task as `COMPLETED`, verify ALL:

1. **Acceptance Criteria**: Artifacts meet ALL criteria in task definition?
2. **Artifact Completeness**: ALL required artifacts registered and finalized?
3. **Quality Self-Assessment**: Evaluated own output against acceptance criteria?
4. **Context Diff**: Logged what context was read and what was produced?
5. **No Side Effects**: Modified only what is in task scope?
6. **Resource Cleanup**: All resources released?
7. **Error-Free**: Execution completed without errors? Errors reported with standard codes?
8. **Progress Reports**: Final progress report with COMPLETED status emitted?
9. **Knowledge Contributions**: Patterns/anti-patterns contributed to Knowledge Memory?
10. **Handoff Updated**: Producing handoff file updated with output?

### 10.2 Quality Gate Failure Handling

If artifacts fail a quality gate:
1. Task may transition to `IN_REVIEW` then back to `IN_PROGRESS` for rework.
2. Evaluation services compare output against acceptance criteria and prior knowledge.
3. After 3 revision loops: PM decides — accept or abort.

---

## 11. Tool Invocation

### 11.1 Invocation Flow

```
1. Discover: GET /api/v1/registry/discover (filtered by your permissions)
2. Resolve: GET /api/v1/registry/tools/{tool_id} (get schema + endpoint)
3. Check: POST /governance/v1/check (permission verification)
4. Invoke: POST /api/v1/tools/{tool_id}/invoke (through platform proxy)
5. Validate: Check output against output_schema
```

### 11.2 Constraints

- NEVER invoke tools directly — always through platform proxy.
- Every invocation requires governance permission check.
- Tool invocations count against per-task limit (default: 50).
- Tool results logged with input/output hash — full audit trail.
- If tool not in allowed toolset: do NOT attempt to invoke.

### 11.3 High-Risk Tool Categories

| Category | Examples | Approval |
|---|---|---|
| `execute-shell` | Shell command execution | Operator + MFA |
| `network-egress` | External API calls outside allowlist | Operator |
| `secret-access` | Secret read/list/rotate | Operator + MFA |

---

## 12. Shutdown & Draining

### 12.1 Normal Shutdown

```
1. Set status to DRAINING (stops accepting new tasks)
2. Complete all in-flight tasks
3. Wait for drain_timeout (default: 300s)
4. Cancel any tasks still active after timeout
5. Call deregister()
6. Stop heartbeat loop
7. Exit
```

### 12.2 Emergency (Crash/Disconnect)

If you crash or disconnect:
- Platform detects heartbeat loss (90s timeout)
- All active tasks marked `FAILED`
- Workspace reaper destroys orphaned workspaces
- On reconnection: re-register; tasks may be reassigned

---

## 13. Communication with the Platform

### 13.1 API Base URLs

| Component | Base URL |
|---|---|
| Worker API | `/api/v1/workers` |
| Task API | `/api/v1/tasks` |
| Context API | `/api/v1/context` |
| Artifact API | `/api/v1/artifacts` |
| Governance API | `/governance/v1` |
| Tool Registry | `/api/v1/registry` |

### 13.2 Authentication

All API calls require: `Authorization: Bearer <your-auth-token>`

Your auth token: issued at registration, expires after 1 hour (renew before expiry), held in memory only, revocable by platform.

### 13.3 HTTP Status Codes Reference

| Code | Meaning | Your Response |
|---|---|---|
| 200 | Success | Process normally |
| 201 | Created | Resource created |
| 202 | Accepted (async) | Poll for status |
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Token expired — renew and retry |
| 403 | Forbidden (governance deny) | STOP. Do not retry. Report. |
| 404 | Not Found | Check IDs |
| 408 | Timeout | Transition to FAILED |
| 409 | Conflict | Re-read and retry |
| 422 | Unprocessable | Check input schema |
| 429 | Rate Limited | Back off and retry |

---

## 14. Conventions Handbook

### 14.1 Code Conventions

- Follow existing patterns (see `./agent-core/memory/modules/PATTERNS.md`)
- `kebab-case` for directories and source files
- `SCREAMING_SNAKE_CASE.md` for top-level documentation
- `README.md` (exact casing) for component READMEs
- Barrel exports: `index.ts` (TypeScript), `__init__.py` (Python)
- Test files co-located with source: `*.test.ext`

### 14.2 Documentation Conventions

- Every directory has a `README.md` with: breadcrumb, purpose, directory map, contracts, navigation
- Every concept has exactly ONE canonical definition — cross-reference, don't duplicate
- Links are always **relative paths** (never absolute, never `~/`)
- Links point to `.md` files explicitly (not directories)
- No numeric prefixes, no dates in filenames
- No non-Markdown documents in `docs/`

### 14.3 Commit Conventions

- Format: `<type>: <short description>`
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Commit per task — don't batch unrelated changes
- Never commit secrets, `.env` files, or binary blobs
- Changes to `agent-core/` and project files are committed to separate repos

### 14.4 Self-Documentation Rule

Every component directory you create MUST include a `README.md` answering:
1. What is this component?
2. How do I use it?
3. What does it depend on?
4. Where are its contracts defined?
5. How do I navigate to parent, siblings, children?

---

## 15. Common Tasks — Step-by-Step

### 15.1 Create a New Documentation File

1. Determine correct location (`app/docs/` for core docs, component dir for READMEs)
2. Follow naming conventions (`SCREAMING_SNAKE_CASE.md` or `README.md`)
3. Use the template: breadcrumb header, purpose, content, navigation footer
4. Cross-reference related docs using relative links
5. Register as artifact via `writeArtifact()`
6. Update producing handoff file

### 15.2 Create a New Component README

```markdown
# <Component Name>

> **Parent:** [<Parent Doc>](<relative-path>) — <description>

## Purpose
<1-3 sentences>

## Directory Map
| Path | Purpose |
|------|---------|
| `src/` | Source code |
| `tests/` | Test suite |

## Contracts
### Implements
- **<Interface>**: <description> (see `<file>`)
### Depends On
- **<Component>**: <why> (see `<readme>`)
### Exposes
- **<API/Tool>**: <description>

## Navigation
- **Up:** [<Parent>](<relative-path>)
```

### 15.3 Handle a Governance Denial

1. **STOP immediately.** Do not attempt workarounds.
2. Log denial details: what action, which policy, what reason
3. Report denial in task status update
4. If denial blocks completion: transition to `FAILED` with `governance_blocked`
5. Include denial in task notes for PM review

### 15.4 Request a Secret

1. Call `POST /governance/v1/secrets/access` with: `task_id`, `worker_id`, `secret_urn`, `access_type`, `justification`
2. If granted: use short-lived credential (TTL: 300s)
3. If denied: STOP. Do not attempt alternatives.
4. Credential expires automatically — no cleanup needed.

---

## 16. Quick Reference — Key Interfaces

### IWorker Interface (You MUST Implement)

```
interface IWorker {
  register(): Promise<RegistrationResult>
  deregister(): Promise<void>
  health(): WorkerStatus
  accept(task: Task): Promise<TaskHandle>
  reject(handle: TaskHandle, reason: string): void
  execute(handle: TaskHandle): Promise<ExecutionResult>
  onProgress(handle: TaskHandle): AsyncIterator<ProgressReport>
  onStatusChange(handle: TaskHandle): AsyncIterator<TaskStatus>
  complete(handle: TaskHandle): Promise<CompletionResult>
  cancel(handle: TaskHandle): void
  pause(handle: TaskHandle): void
  resume(handle: TaskHandle): Promise<void>
}
```

### Context Contract — Read Operations

```
readTaskContext(task_id)     → TaskContext
readKnowledge(query)         → KnowledgeMemory.Entry[]
readArtifact(artifact_id)    → ArtifactMemory.Entry
readProjectContext(project)  → ProjectMemory.Entry
readUserContext(user_id)     → UserMemory.Entry
```

### Context Contract — Write Operations

```
writeArtifact(task_id, draft)         → artifact_id
finalizeArtifact(artifact_id, signals) → success | conflict
updateTaskStatus(task_id, update)      → success | blocked
contributeKnowledge(entry)             → knowledge_id
logContextDiff(task_id, diff)          → success
```

---

## Navigation

- **Up:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Related:** [SECURITY.md](SECURITY.md) — authentication, sandbox, defense-in-depth
- **Related:** [GOVERNANCE.md](GOVERNANCE.md) — permissions, approvals, audit, resource limits
- **Related:** [DEVELOPMENT.md](DEVELOPMENT.md) — setup and contribution workflow
- **Related:** [DEPLOYMENT.md](DEPLOYMENT.md) — deployment and operations
