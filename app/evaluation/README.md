# Evaluation Services

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

Evaluation Services validate worker outputs against acceptance criteria and generate quality signals, patterns, and heuristics that enrich the platform's Knowledge Memory. They close the feedback loop: worker execution produces artifacts, evaluation assesses quality, and the resulting insights improve future planning and execution. Evaluation is the "quality gate" of the platform's closed-loop cycle: Context → Planning → Execution → Evaluation → Context.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Implementation: output validator, quality scorer, cost analyzer, performance analyzer, reliability analyzer, regression detector, pattern extractor |
| `tests/` | Unit and integration tests for scoring, analysis, and feedback generation |
| `config.*` | Evaluation configuration (acceptance thresholds, scoring weights, regression baselines) |
| `README.md` | This file — self-documentation and contracts |

## Contracts

### Implements

- **EvaluationContract** (`../contracts/README.md`): The canonical interface applications code against for output validation, quality scoring, and feedback generation.

### Depends On

- **Memory Services** (`../memory/README.md`): Reads Task Memory (task definition, status, context snapshot used), Artifact Memory (worker outputs, quality signals), and Knowledge Memory (expected patterns, known anti-patterns). Writes Knowledge Memory (new patterns, updated heuristics, confidence adjustments), Artifact quality signals, and Task status updates.
- **Context System** (see `../memory/README.md` — Context-Contract Interface): Evaluation services interact with the context-contract as both consumers and producers (see TASK-004, arch-uwp-context-system §5.3).
- **Governance Services** (`../governance/README.md`): Authorization for mutating quality signals and knowledge entries.

### Exposes

- **Evaluation API** (`/api/v1/evaluation`): Submit artifacts for evaluation, retrieve quality reports, query evaluation history per task or sprint.

## Evaluation Pipeline

```
Artifacts + Task Definition
       │
       ▼
   Output Validator        ← checks artifacts against acceptance criteria
       │
       ▼
   Quality Scorer          ← assigns quantitative quality metrics (0.0–1.0)
       │
       ├──→ Cost Analyzer        ← compares actual cost vs. estimated budget
       ├──→ Performance Analyzer ← benchmarks execution time, memory, tool calls
       ├──→ Reliability Analyzer ← tracks retry rates, failure modes, drift
       └──→ Regression Detector  ← compares against prior task baselines
       │
       ▼
   Pattern Extractor       ← identifies patterns, anti-patterns, and heuristics
       │
       ▼
   Feedback Generator      ← writes QualitySignals + KnowledgeMemory entries
       │
       ▼
   Re-queue Decision       ← if quality below threshold: trigger rework or re-assignment
```

## Feedback Loop — "Evaluation Generates Additional Work"

Evaluation is not a terminal step — it is a generative one. Evaluation outputs create new work:

```
Worker Execution → Artifacts
                         │
                         ▼
              ┌─────────────────────┐
              │   EVALUATION        │
              │                     │
              │  1. Quality Score   │──→ If FAIL: re-queue task for rework
              │  2. Pattern Extract │──→ New Knowledge entries (future planning)
              │  3. Cost Analysis   │──→ Budget alerts, quota adjustments
              │  4. Regression      │──→ Flag systemic degradation
              │  5. Drift Detection │──→ Re-queue if context changed mid-task
              └─────────────────────┘
                         │
                         ▼
              Updated Knowledge Memory → Better Future Planning → Higher Quality Artifacts
```

This feedback loop ensures the platform continuously improves: each cycle produces both artifacts AND enriches the knowledge base, making future planning and execution more informed.

## Evaluation Dimensions

### Quality Scoring

Measures artifact quality against task acceptance criteria on a 0.0–1.0 scale.

| Signal | Description |
|--------|-------------|
| `acceptance_pass_rate` | Fraction of acceptance criteria satisfied |
| `lint_score` | Static analysis compliance (if applicable) |
| `test_pass_rate` | Fraction of tests passing (if applicable) |
| `coverage_delta` | Change in code coverage from baseline |
| `review_status` | Human or automated review outcome |

### Cost Analysis

Compares actual execution cost against estimated budget.

| Metric | Purpose |
|--------|---------|
| `estimated_vs_actual_cost` | Budget accuracy tracking |
| `cost_per_artifact` | Efficiency metric |
| `cost_overrun_frequency` | Detects systemic underestimation |
| `tool_cost_breakdown` | Identifies expensive tool dependencies |

### Performance Analysis

Benchmarks execution characteristics against task type baselines.

| Metric | Purpose |
|--------|---------|
| `execution_duration_vs_estimate` | Planning accuracy feedback |
| `memory_peak_vs_limit` | Resource efficiency |
| `tool_invocations_count` | Complexity indicator |
| `retry_count` | Reliability indicator |

### Reliability Analysis

Tracks failure patterns and retry behavior.

| Metric | Purpose |
|--------|---------|
| `first_attempt_success_rate` | Worker/task pairing effectiveness |
| `retry_success_rate` | Value of retry vs. fresh assignment |
| `failure_mode_distribution` | Identifies common failure categories |
| `time_between_failures` | Stability metric |

### Regression Detection

Compares current task execution against historical baselines for the same task type.

| Detection | Trigger |
|-----------|---------|
| `quality_regression` | Quality score drops >0.1 below running average |
| `performance_regression` | Duration increases >50% over baseline |
| `cost_regression` | Cost increases >30% over baseline |
| `coverage_regression` | Test coverage drops below threshold |

## Post-Task vs. Post-Sprint Evaluation

Evaluation runs at two cadences:

### Post-Task (immediate)

- Validate artifact quality against acceptance criteria.
- Generate quality signals on the artifact.
- Extract patterns/anti-patterns → Knowledge Memory.
- Trigger re-queue if quality gate fails (feedback loop).

### Post-Sprint (aggregate)

- Aggregate quality metrics across all sprint tasks.
- Identify systemic issues (e.g., "3 of 5 frontend tasks had lint failures").
- Update Knowledge Memory heuristics (e.g., "decrease frontend task estimate by 20%").
- Produce sprint quality report for next sprint planning.

## Drift Detection

When a task completes, evaluation services compare the worker's ContextSnapshot (frozen at assignment time) against current context state:

- **Drift below threshold:** Task accepted as valid. Outputs integrated normally.
- **Drift above threshold:** Task may be re-queued with updated context. The original worker's outputs are flagged for review but not discarded — they may be partially applicable.

Drift is measured across: project conventions, architecture decisions, knowledge entries, and upstream artifact versions.

## Concepts

- **Quality Score:** A composite 0.0–1.0 metric aggregating acceptance criteria pass rate, lint compliance, test pass rate, and review outcome.
- **Feedback Loop:** The generative cycle where evaluation outputs (quality signals, patterns, heuristics) become inputs to future planning and execution. Evaluation creates work.
- **Regression Detection:** Comparison of current task execution metrics against historical baselines to detect systemic degradation in quality, performance, or cost.
- **Drift Detection:** Comparison of the ContextSnapshot used during execution against current context state to detect stale-task scenarios.
- **Pattern Extraction:** The process of deriving reusable patterns, anti-patterns, and heuristics from task outcomes and writing them to Knowledge Memory.
- **Re-queue Decision:** The evaluation gate that determines whether a failed or drifted task should be retried by the same worker, reassigned to a different worker, or accepted with caveats.

## Implementation Guidance

### What to build

1. **Output Validator:** Compares worker artifacts against task acceptance criteria. Supports both automated checks (lint, test, coverage, schema validation) and human review integration. Produces a structured validation report.

2. **Quality Scorer:** Aggregates multiple quality signals into a composite score (0.0–1.0) with configurable weights per signal. Writes quality signals to Artifact Memory metadata.

3. **Cost Analyzer:** Computes actual task cost (CPU time + memory time + tool invocations + network egress) and compares against the estimated budget. Flags over-budget tasks for review. Updates cost estimation heuristics in Knowledge Memory.

4. **Performance Benchmarker:** Records execution metrics (duration, memory peak, tool count, retry count) and compares against task-type baselines stored in Knowledge Memory. Updates baselines on statistically significant deviations.

5. **Reliability Tracker:** Maintains per-worker and per-task-type reliability statistics. Detects degradation patterns (e.g., worker X has increasing failure rate). Feeds reliability data back to planning for worker selection.

6. **Regression Detector:** Compares current execution against historical baselines across quality, performance, cost, and coverage dimensions. Flags regressions above configured thresholds. Produces regression reports for sprint retrospectives.

7. **Pattern Extractor:** Analyzes task outcomes to identify reusable patterns (successful approaches), anti-patterns (failure modes), and heuristics (estimation corrections). Writes extracted knowledge to Knowledge Memory as draft entries pending governance approval.

### Key design constraints

- Evaluation services read context through the context-contract interface only — never touch memory stores directly.
- Quality signals are written to Artifact Memory metadata — artifacts themselves are immutable after finalization.
- Knowledge contributions enter as draft entries — governance must approve before they influence future planning.
- Re-queue decisions must be recorded in Task Memory with reasoning — no silent retries.
- Evaluation is asynchronous — it runs after task completion, not during execution. Streaming progress evaluation is a future enhancement.

### Integration points

- **Memory Services** (`../memory/README.md`): Reads Task, Artifact, and Knowledge Memory. Writes Knowledge Memory entries, Artifact quality signals, and Task status updates.
- **Planning Services** (`../planning/README.md`): Provides quality heuristics and patterns that inform future task decomposition and estimation.
- **Governance Services** (`../governance/README.md`): Authorization for quality signal mutations and knowledge approvals.
- **Worker Runtime** (`../worker-runtime/README.md`): Receives re-queue instructions when evaluation gates fail.
- **Context System** (see `../memory/README.md`): Uses context-contract for all read/write operations; compares snapshots for drift detection.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [planning/README.md](../planning/README.md), [memory/README.md](../memory/README.md), [contracts/README.md](../contracts/README.md), [governance/README.md](../governance/README.md), [worker-runtime/README.md](../worker-runtime/README.md)
- **Architecture contracts:** arch-uwp-context-system (TASK-004 §5.3–5.4), arch-uwp-topology (TASK-001 §2.2)
