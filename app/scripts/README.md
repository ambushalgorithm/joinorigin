# Scripts

> **Parent:** [Architecture Overview](../docs/ARCHITECTURE.md) — platform layer model, component map, dependency rules

## Purpose

The `scripts/` directory contains all automation, tooling, and build utility scripts for the Universal Worker Platform. Scripts live here when they span multiple packages, serve CI/CD pipelines, or provide developer workflow automation. Application logic and library code belong in `apps/` or `packages/` — never here.

## Directory Map

| Path | Purpose |
|------|---------|
| `build/` | Multi-package build orchestration, compilation scripts |
| `db/` | Database migration runners, seed scripts, schema validation |
| `ci/` | CI helper scripts invoked by `.github/workflows/` |
| `test/` | Test orchestrators, E2E runner entry points, coverage aggregators |
| `docker/` | Docker image build helpers, registry push scripts |
| `release/` | Version bump, changelog generation, release tagging |
| `dev/` | Local dev environment setup, dependency installation, workspace initialization |

## Contracts

### Implements
- **Automation Layer (Layer 3):** Scripts are the execution surface of the Automation & Delivery layer defined in the [platform topology](../docs/ARCHITECTURE.md).

### Depends On
- **`packages/`**: Scripts invoke package-level build, test, and lint commands through package.json scripts.
- **`infra/`**: Docker and deployment scripts reference infrastructure definitions.
- **`.github/workflows/`**: CI scripts are invoked from workflow YAML files (no inline scripts > 20 lines per [repo standard CI principles](../docs/ARCHITECTURE.md)).

### Exposes
- **Build**: `scripts/build/build-all.sh` — builds all packages and apps
- **Test**: `scripts/test/run-all-tests.sh` — runs unit, integration, and E2E suites
- **Lint**: `scripts/ci/lint-all.sh` — runs linting across all packages
- **Typecheck**: `scripts/ci/typecheck-all.sh` — runs type checking across all packages
- **Security**: `scripts/ci/security-scan.sh` — runs dependency audit and SAST scan
- **DB**: `scripts/db/migrate.sh` — applies database migrations
- **Docker**: `scripts/docker/build-push.sh` — builds and pushes Docker images

## Concepts

- **Command encapsulation**: Every per-package command (`npm run build`) is called from a script, not inlined in workflow YAML. This keeps workflows under 20 lines of script content.
- **Idempotent scripts**: All scripts must be safe to run repeatedly without side effects.
- **Exit code discipline**: Scripts return `0` for success, non-zero for failure. CI gates on exit codes.
- **No-inline threshold**: Workflows invoke scripts via `run: bash scripts/ci/lint-all.sh` — never embed shell logic directly.

## Navigation

- **Up:** [Architecture Overview](../docs/ARCHITECTURE.md)
- **Related:** [CI/CD Setup](../.github/README.md), [Tests](../tests/README.md), [Artifacts](../artifacts/README.md), [Infrastructure](../infra/README.md)
- **Children:** `build/`, `db/`, `ci/`, `test/`, `docker/`, `release/`, `dev/`
