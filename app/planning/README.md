# Planning Services

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

Planning Services decompose high-level project goals into executable task DAGs. They consume the full context layer (Project Memory, Knowledge Memory, Artifact Memory, User Memory) to produce prioritized, dependency-ordered work units assigned to workers. Planning is the "intake" step of the closed-loop platform cycle: Context → Planning → Execution → Evaluation → Context.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Implementation: task decomposer, dependency resolver, parallelism optimizer, effort estimator, role assigner |
| `tests/` | Unit and integration tests for decomposition, dependency analysis, and scheduling |
| `config.*` | Planning-specific configuration (heuristic weights, decomposition strategies, default priorities) |
| `README.md` | This file — self-documentation and contracts |

## Contracts

### Implements

- **PlanningContract** (`../contracts/README.md`): The canonical interface applications code against for task decomposition, dependency resolution, and work scheduling.

### Depends On

- **Memory Services** (`../memory/README.md`): Reads Project Memory (goals, constraints, conventions, architecture decisions, sprint history), Knowledge Memory (past patterns, heuristics, anti-patterns from evaluation), Artifact Memory (current codebase state, test results, coverage), and User Memory (team roster, roles, preferences). Writes Task Memory entries (decomposed work units), Project Memory decisions (ADR entries), and optional Knowledge Memory contributions.
- **Context System** (see `../memory/README.md` — Context-Contract Interface): Planning services interact with the context-contract as both consumers and producers (see TASK-004, arch-uwp-context-system §5).
- **Governance Services** (`../governance/README.md`): Authorization for creating and mutating task definitions. Task assignments must respect RBAC role boundaries.

### Exposes

- **Planning API** (`/api/v1/planning`): Decompose goals into tasks, resolve dependencies, parallelize independent work, estimate effort, assign worker roles.

## Planning Pipeline

```
Project Goals (from Project Memory)
       │
       ▼
   Task Decomposer       ← reads Project Memory, Knowledge Memory, Artifact Memory
       │
       ▼
   Dependency Resolver   ← builds DAG of tasks, detects parallelizable work
       │
       ▼
   Effort Estimator      ← assigns priority and estimated duration per task
       │
       ▼
   Role Assigner         ← matches tasks to worker roles and model requirements
       │
       ▼
   Schedule Producer     ← outputs prioritized, ordered task queue → Task Memory
```

## How Planning Consumes Context

Planning services are specialized workers that consume context to produce work decomposition (see TASK-004, arch-uwp-context-system §5.1). On activation, planning services:

1. **Read Project Memory** — goals, constraints, conventions, architecture decisions, sprint history. These define the "what" and "how" of the work.
2. **Read Knowledge Memory** — ranked patterns, heuristics, and anti-patterns from past evaluation cycles. These inform decomposition strategy (e.g., "UI tasks should be scoped to ≤1 day each").
3. **Read Artifact Memory** — current state of the codebase, past test results, coverage reports. These ground planning in reality rather than assumptions.
4. **Read User Memory** — team roster, roles, preferences, trust scores. These determine who can be assigned what.

The output is a set of `TaskMemory` entries with defined dependencies, priorities, acceptance criteria, and role assignments — ready for dispatch to workers.

## Feedback Loop Integration

Planning is the first step in the platform's closed loop:

```
Context (current state)
    │
    ▼
Planning: reads context → produces TaskMemory entries
    │
    ▼
Workers: consume TaskMemory + ContextSnapshot → produce Artifacts
    │
    ▼
Evaluation: reads Artifacts + Tasks → produces QualitySignals + Knowledge updates
    │
    ▼
Updated Context (enriched with new Knowledge)
    │
    ▼
Next Planning Cycle (with better heuristics)
```

Each evaluation cycle enriches Knowledge Memory, making future planning more informed.

## Concepts

- **Task Decomposer:** The component that breaks high-level goals into atomic, executable task definitions with acceptance criteria.
- **Dependency Resolver:** The component that analyzes task inputs/outputs to build a directed acyclic graph (DAG) of execution order, identifying parallelizable work.
- **Parallelism Optimizer:** The component that identifies independent task branches in the DAG, enabling concurrent execution of workers with no dependency edges.
- **Context Snapshot Isolation:** Planning produces task definitions; each assigned worker receives an immutable ContextSnapshot frozen at assignment time, preventing context drift during execution (see `../memory/README.md` — Context Snapshots).
- **Effort Estimator:** Assigns priority (low/medium/high/critical) and estimated duration per task based on historical knowledge and artifact complexity.
- **Role Assigner:** Matches task requirements (tools needed, workspace type, memory domains) to available worker roles and model capabilities.

## Implementation Guidance

### What to build

1. **Goal-to-Task Decomposer:** Accepts a high-level goal specification and produces a list of atomic task definitions. Uses Knowledge Memory patterns to guide decomposition granularity. Supports both automated (heuristic) and assisted (PM-guided) decomposition modes.

2. **Dependency Graph Builder:** Analyzes task inputs/outputs to construct a DAG. Detects circular dependencies and rejects invalid decompositions. Identifies parallel branches for concurrent execution.

3. **Priority and Effort Estimator:** Assigns priority levels and estimated durations using heuristics from Knowledge Memory and historical task completion data. Supports manual override by PM.

4. **Role-Aware Dispatcher:** Matches tasks to worker roles based on required capabilities (tool protocols, workspace types, memory domains). Respects worker availability (max concurrent tasks, health status) and RBAC role boundaries.

5. **Sprint Planning Interface:** Aggregates task definitions into sprint plans. Tracks burndown and velocity. Produces sprint retrospectives as Knowledge Memory contributions.

### Key design constraints

- Planning services read context through the context-contract interface only — never touch memory stores directly.
- Task definitions are written to Task Memory through the context-contract, ensuring provenance tracking.
- Dependencies declared at task creation; no runtime dependency resolution (planning is pre-execution).
- Planning decisions are recorded as ADR entries in Project Memory for auditability.
- Planning is idempotent — re-planning with the same inputs produces consistent outputs (deterministic decomposition).

### Integration points

- **Memory Services** (`../memory/README.md`): Reads Project, Knowledge, Artifact, and User Memory domains. Writes Task Memory entries and Project Memory decisions.
- **Governance Services** (`../governance/README.md`): Authorization checks before mutating project or task state.
- **Evaluation Services** (`../evaluation/README.md`): Consumes evaluation-produced Knowledge to inform future planning heuristics.
- **Worker Runtime** (`../worker-runtime/README.md`): Dispatches planned tasks to registered workers via the platform scheduler.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [memory/README.md](../memory/README.md), [evaluation/README.md](../evaluation/README.md), [contracts/README.md](../contracts/README.md), [governance/README.md](../governance/README.md), [worker-runtime/README.md](../worker-runtime/README.md)
- **Architecture contracts:** arch-uwp-context-system (TASK-004), arch-uwp-topology (TASK-001 §2.2, §5)
