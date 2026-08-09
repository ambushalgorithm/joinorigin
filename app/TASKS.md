# UWP Task List

> **Parent:** [README.md](README.md) — Project overview and navigation

## Purpose

This file tracks all tasks across sprints. Agents read this to understand what is currently in progress, what is completed, and what is pending. Humans use this for sprint planning and progress tracking.

## Task States

| State | Meaning |
|---|---|
| `open` | Defined but not yet assigned or started |
| `in-progress` | Actively being worked on |
| `review` | Output produced, awaiting review |
| `complete` | Done and verified |
| `blocked` | Cannot proceed — dependency unmet or issue unresolved |
| `cancelled` | No longer needed |

## Task Fields

Every task entry must include:

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique task identifier (TASK-NNN) |
| `sprint` | Yes | Sprint this task belongs to |
| `phase` | Yes | Architecture, Design, Review, Implementation, Testing |
| `role` | Yes | Sub-agent role responsible for execution |
| `title` | Yes | Short description of the deliverable |
| `acceptance_criteria` | Yes | Measurable conditions for completion |
| `depends_on` | No | Task IDs that must complete before this can start |
| `artifacts` | Yes | Files or documents this task produces |
| `priority` | Yes | `critical`, `high`, `medium`, `low` |
| `assigned_model` | No | Model assigned (if applicable) |
| `status` | Yes | Current state |

---

## Sprint 01: UWP Reference Implementation Skeleton

### Phase 1: Architecture

| ID | Title | Role | Priority | Depends On | Artifacts | Status |
|---|---|---|---|---|---|---|
| TASK-001 | Platform layers, topology, dependency flow | arch-uwp-topology | critical | — | design.md (topology contracts) | complete |
| TASK-002 | Repository structure and conventions | arch-uwp-repo-standard | critical | — | design.md (repo-standard contracts) | complete |
| TASK-003 | Worker interface and lifecycle contract | arch-uwp-worker-contract | critical | — | design.md (worker-contract) | complete |
| TASK-004 | Context system and memory domains | arch-uwp-context-system | critical | — | design.md (context-system contracts) | complete |
| TASK-005 | Governance framework | arch-uwp-governance-model | critical | — | design.md (governance contracts) | complete |
| TASK-006 | Tool protocols and API contracts | arch-uwp-integration-model | critical | — | design.md (integration contracts) | complete |
| TASK-007 | AGENTS.md discovery and self-documentation | arch-uwp-agent-entry | critical | — | design.md (agent-entry contracts) | complete |

### Phase 2: Design

| ID | Title | Role | Priority | Depends On | Artifacts | Status |
|---|---|---|---|---|---|---|
| TASK-008 | Root docs (README, ROADMAP, TASKS, CHANGELOG) | design-uwp-root-docs | high | Phase 1 complete | README.md, ROADMAP.md, TASKS.md, CHANGELOG.md | complete |
| TASK-009 | VISION.md, ARCHITECTURE.md | design-uwp-vision-arch | high | Phase 1 complete | docs/VISION.md, docs/ARCHITECTURE.md | open |
| TASK-010 | DEVELOPMENT.md, DEPLOYMENT.md | design-uwp-dev-deploy | high | TASK-009 | docs/DEVELOPMENT.md, docs/DEPLOYMENT.md | open |
| TASK-011 | SECURITY.md, GOVERNANCE.md, WORKER_GUIDE.md | design-uwp-security-gov | high | TASK-009 | docs/SECURITY.md, docs/GOVERNANCE.md, docs/WORKER_GUIDE.md | open |
| TASK-012 | Worker and workspace component READMEs | design-uwp-worker-workspace | high | Phase 1 complete | packages/worker-runtime/README.md, packages/workspace-runtime/README.md | open |
| TASK-013 | Memory and tool registry component READMEs | design-uwp-memory-tools | high | Phase 1 complete | packages/memory/README.md, packages/tool-registry/README.md | open |
| TASK-014 | Governance and automation component READMEs | design-uwp-gov-auto | high | Phase 1 complete | packages/governance/README.md, automation/README.md | open |
| TASK-015 | Apps, packages, infra READMEs | design-uwp-apps-packages | high | Phase 1 complete | apps/README.md, packages/README.md, infra/README.md | open |
| TASK-016 | Scripts, tests, artifacts, CI READMEs and templates | design-uwp-infra-ci | high | Phase 1 complete | scripts/README.md, tests/README.md, artifacts/.gitkeep, .github/ + templates | open |

### Phase 3: Review

| ID | Title | Role | Priority | Depends On | Artifacts | Status |
|---|---|---|---|---|---|---|
| TASK-017 | Architecture documentation review | review-uwp-architecture | critical | Phase 2 gates | review-report.md (architecture section) | open |
| TASK-018 | Component README review | review-uwp-components | critical | Phase 2 gates | review-report.md (components section) | open |
| TASK-019 | Holistic end-to-end validation | review-uwp-holistic | critical | TASK-017, TASK-018 | review-report.md (holistic section) | open |

---

## Sprint 02: Core Worker Platform Runtime (Planned)

| ID | Title | Role | Priority | Depends On | Artifacts | Status |
|---|---|---|---|---|---|---|
| TASK-020 | Platform contracts (TypeScript interfaces) | TBD | critical | Sprint 01 gates | packages/contracts/ | open |
| TASK-021 | Worker runtime implementation | TBD | critical | TASK-020 | packages/worker-runtime/ | open |
| TASK-022 | Workspace runtime (Docker sandbox) | TBD | critical | TASK-020 | packages/workspace-runtime/ | open |
| TASK-023 | Memory services (STM, LTM, context assembler) | TBD | high | TASK-020 | packages/memory/ | open |
| TASK-024 | Planning services | TBD | high | TASK-020, TASK-023 | packages/planning/ | open |
| TASK-025 | Evaluation services | TBD | high | TASK-020, TASK-023 | packages/evaluation/ | open |

---

## Adding New Tasks

When adding a task to any sprint:

1. Assign a unique `TASK-NNN` ID with the next available number.
2. Fill all required fields.
3. Link dependencies to existing task IDs.
4. Set priority: `critical` if it blocks downstream work, `high` if required for phase gate, `medium` for quality improvements, `low` for nice-to-have.
5. List the exact file paths this task will produce under `artifacts`.
6. Update `depends_on` for any task that depends on this one.

## Task Lifecycle

```
open → in-progress → review → complete
       ↘ blocked → open (when unblocked)
              ↘ cancelled
```

- A task enters `in-progress` when a sub-agent is spawned and assigned.
- A task enters `review` when the sub-agent completes and produces its artifacts.
- A task enters `complete` when the reviewer (Phase 3) accepts the output.
- A task enters `blocked` if a dependency is not yet `complete`.
- A task enters `cancelled` if no longer needed.
