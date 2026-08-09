# Artifacts

> **Parent:** [Architecture Overview](../docs/ARCHITECTURE.md) — platform layer model, component map, dependency rules

## Purpose

The `artifacts/` directory is the platform's generated output repository. It holds all build outputs, compiled bundles, generated documentation, test result reports, code coverage reports, benchmark results, and CI-produced assets. This directory is fully `.gitignore`d (content is never committed) and is populated exclusively by build pipelines, CI workflows, and tooling scripts. Artifacts produced during development (e.g., local builds) share this directory.

## Directory Map

| Path | Purpose |
|------|---------|
| `build/` | Compiled output: dist/ bundles, compiled binaries per package |
| `docs/` | Generated documentation: API docs, typedoc output, architecture diagrams |
| `test-results/` | Test output: JUnit XML, JSON reports, test run summaries |
| `coverage/` | Code coverage: Istanbul/nyc reports, coverage XML, HTML reports |
| `benchmarks/` | Benchmark results: performance measurements, comparison reports |
| `security/` | Security scan output: npm audit reports, SAST findings, dependency graphs |
| `lint/` | Linter output: ESLint reports, Prettier check results |
| `packages/` | Package artifacts: `.tgz` files, npm pack output |

## Contracts

### Implements
- **Artifact Pipeline (Automation Layer 3):** This directory is the local artifact store for build outputs before they are promoted to the platform's Artifact Memory (see [arch-uwp-context-system](../docs/ARCHITECTURE.md#arch-uwp-context-system) §1.6 Artifact Memory).

### Depends On
- **`scripts/`**: Build, test, and CI scripts write their outputs here.
- **`.github/workflows/`**: CI workflows archive and upload artifacts from this directory as workflow artifacts.
- **`packages/`**: Each package's build step produces output written here.

### Exposes
- **Build outputs**: Compiled code ready for deployment or packaging.
- **Test results**: Aggregated test run reports for CI dashboards.
- **Coverage reports**: Code coverage data for quality gates.
- **Security reports**: Dependency audit and SAST findings for review.

## Concepts

- **Git-ignored**: The entire directory (except `.gitkeep`) is added to `.gitignore`. Artifacts are build outputs, not source code — they must never be committed.
- **CI-accessible**: CI workflows read from and write to this directory. Workflow `actions/upload-artifact` source paths point here.
- **Clean build**: `scripts/build/clean.sh` removes all contents. Every CI run starts from a clean state.
- **Artifact naming convention**: `{package-name}-{version}-{build-id}.{ext}` (e.g., `worker-runtime-1.0.0-ci-abc123.tar.gz`).
- **Promotion path**: Local `artifacts/` → CI artifact upload → Artifact Registry → Platform Artifact Memory (see [Artifact API Contract](../docs/ARCHITECTURE.md#34-artifact-api-contract)).

## Navigation

- **Up:** [Architecture Overview](../docs/ARCHITECTURE.md)
- **Related:** [CI/CD Setup](../.github/README.md), [Scripts](../scripts/README.md), [Tests](../tests/README.md), [Infrastructure](../infra/README.md)
- **Children:** `build/`, `docs/`, `test-results/`, `coverage/`, `benchmarks/`, `security/`, `lint/`, `packages/`
