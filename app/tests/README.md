# Tests

> **Parent:** [Architecture Overview](../docs/ARCHITECTURE.md) — platform layer model, component map, dependency rules

## Purpose

The `tests/` directory contains cross-cutting test suites that span multiple packages or services. Unit tests live co-located with source code in each `packages/*/tests/` directory. This directory holds integration tests, end-to-end (E2E) tests, load tests, smoke tests, and shared test fixtures. It also defines the linting, formatting, and type-checking conventions enforced across the platform.

## Directory Map

| Path | Purpose |
|------|---------|
| `integration/` | Integration tests across package boundaries — validates contracts between components |
| `e2e/` | End-to-end tests — full stack scenarios simulating real worker execution flows |
| `load/` | Load and stress tests — validates platform behavior under concurrent task execution |
| `smoke/` | Smoke tests — quick sanity checks run after every deployment |
| `fixtures/` | Shared test fixtures, mock data, sample tasks, context snapshots |
| `mocks/` | Mock implementations of platform services for isolated testing |
| `coverage/` | Aggregated code coverage reports (gitignored; populated by CI) |
| `results/` | Aggregated test result reports (gitignored; populated by CI) |

## Contracts

### Implements
- **Test Harness (Automation Layer 3):** Tests validate that component implementations satisfy their [architecture contracts](../docs/ARCHITECTURE.md) and [integration model contracts](../docs/ARCHITECTURE.md#arch-uwp-integration-model).

### Depends On
- **`packages/`**: Unit tests in each package must pass before integration tests run.
- **`contracts/`**: Integration tests validate [Platform Contracts](../contracts/README.md) — WorkerContract, WorkspaceContract, ToolContract, etc.
- **`infra/`**: E2E tests run against a full platform deployment defined in infra/.
- **`scripts/ci/`**: Test orchestrator scripts invoked from CI workflows.

### Exposes
- **Integration test suite**: Validates cross-component contracts (e.g., Worker Runtime → Tool Registry → Governance API).
- **E2E test suite**: Simulates complete worker task execution from planning through artifact production.
- **Linting standards**: ESLint + Prettier configurations enforced at the platform level.
- **Type-checking standards**: TypeScript strict mode enforced across all packages.

## Concepts

- **Test layering**: Unit tests (co-located with source) → Integration tests (layer boundaries) → E2E tests (full stack). Each layer gates the next.
- **Contract validation**: Integration tests specifically validate the API contracts defined in [arch-uwp-integration-model](../docs/ARCHITECTURE.md#arch-uwp-integration-model) — every endpoint must have a corresponding test.
- **Snapshot testing**: Context snapshots (see [arch-uwp-context-system](../docs/ARCHITECTURE.md#arch-uwp-context-system)) are used as test fixtures to validate worker behavior against stable context.
- **Error contract enforcement**: Every API error response must match its declared error contract (see [Integration Model §3.1 Worker API Contract](../docs/ARCHITECTURE.md)).
- **CI gate hierarchy**: Lint → Typecheck → Unit tests → Build → Integration tests → E2E tests. Each stage gates the next in CI.

## Test Structure

### Integration Tests

Integration tests validate that components interact correctly across layer boundaries as defined in the [dependency flow](../docs/ARCHITECTURE.md#3-dependency-flow). Each test file corresponds to a contract boundary:

- `integration/worker-runtime.tool-registry.test.ts` — Worker invokes tools via Tool Registry
- `integration/tool-registry.governance.test.ts` — Tool Registry enforces governance permissions
- `integration/memory.planning.test.ts` — Memory Services feed Planning Services
- `integration/contracts.services.test.ts` — Platform Contracts resolve to Service Providers

### E2E Tests

End-to-end tests simulate complete task execution flows:

- `e2e/worker-lifecycle.test.ts` — Worker registration → task acceptance → execution → artifact production → completion
- `e2e/governance-approval.test.ts` — Task requiring approval → approval flow → execution → audit log verification
- `e2e/context-persistence.test.ts` — Context survives worker restart, session recovery, model change

### Linting, Formatting, Type Checking

- **Linting**: ESLint with platform-shared config. Run: `scripts/ci/lint-all.sh`
- **Formatting**: Prettier with platform-shared config. Run: `scripts/ci/format-check.sh`
- **Type checking**: TypeScript strict mode. Run: `scripts/ci/typecheck-all.sh`
- All three are enforced as merge gates in CI (see [ci.yml](../.github/workflows/ci.yml)).

## Navigation

- **Up:** [Architecture Overview](../docs/ARCHITECTURE.md)
- **Related:** [CI/CD Setup](../.github/README.md), [Scripts](../scripts/README.md), [Artifacts](../artifacts/README.md), [Contracts](../contracts/README.md)
- **Children:** `integration/`, `e2e/`, `load/`, `smoke/`, `fixtures/`, `mocks/`
