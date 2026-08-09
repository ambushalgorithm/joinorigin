# Universal Worker Platform (UWP)

> **Parent:** [AGENTS.md](../AGENTS.md) — Project entry point and agent auto-discovery

## Purpose

The Universal Worker Platform is a reference implementation of an agent-orchestrated worker platform that runs knowledge workers, governance, and automation in a portable containerized environment. This `app/` directory contains the complete platform — all components, libraries, infrastructure definitions, tests, and documentation — in a self-contained, portable bundle.

## Quick Start

```sh
# 1. Clone and navigate
git clone <repo-url> && cd <repo>

# 2. Read the architecture (agents start here)
cat app/docs/ARCHITECTURE.md

# 3. Build all packages
cd app && npm install && npm run build

# 4. Run the platform locally
docker compose -f app/infra/docker-compose.dev.yml up

# 5. Run tests
cd app && npm test
```

## Architecture Summary

The UWP organizes into six layers with strict dependency flow:

| Layer | Position | Responsibility |
|---|---|---|
| **Application** | Top (Layer 6) | Worker assemblies, agent workflows, custom tool plugins |
| **Worker Platform** | Core (Layer 5) | Runtime, workspace, memory, planning, evaluation, governance, contracts |
| **Platform Services** | Provider (Layer 4) | Concrete service implementations (database, cache, queue, storage) |
| **Automation & Delivery** | Build/CI (Layer 3) | CI pipelines, test harnesses, artifact management, release orchestration |
| **Infrastructure** | Host (Layer 2) | Container runtime, networking, compute, volumes, observability |
| **Deployment** | Operations (Layer 1) | Environment definitions, service discovery, scaling, secrets management |

**Canonical architecture:** [app/docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — always start there.

**Key architectural properties:**
- Layers communicate through contracts (TypeScript interfaces), never direct imports
- The Provider Registry in the Worker Platform resolves services to implementations at startup
- Applications depend only on Platform Contracts — zero knowledge of providers or infrastructure
- Context outlives models — all memory domains persist independently of worker or vendor
- Governance is centralized in the Worker Platform with per-layer enforcement points

## Directory Map

| Path | Purpose |
|---|---|
| `docs/` | Core documentation: VISION.md, ARCHITECTURE.md, WHITEPAPER.md, DEVELOPMENT.md, DEPLOYMENT.md, SECURITY.md, GOVERNANCE.md, WORKER_GUIDE.md |
| `apps/` | Runnable, independently deployable services |
| `packages/` | Shared libraries, SDKs, reusable modules — including all Worker Platform components |
| `infra/` | Dockerfiles, compose files, Kubernetes manifests, infrastructure configuration |
| `scripts/` | Build, deploy, database migration, and utility automation scripts |
| `tests/` | Cross-cutting integration tests, E2E tests, test fixtures, load tests |
| `artifacts/` | Build outputs and generated assets (gitignored except `.gitkeep`) |
| `.github/` | CI/CD workflows, PR/issue templates, CODEOWNERS, dependabot config |

## Contracts

### Implements
- **Root Documentation Contract**: This README is the entry point for human and agent navigation into `app/`. It implements the [README.md contract](docs/ARCHITECTURE.md) defined in the self-documentation conventions.

### Depends On
- **Architecture Documentation** (`docs/ARCHITECTURE.md`): Canonical layer model, component map, dependency rules — all descriptions in this README defer to ARCHITECTURE.md as authority.
- **AGENTS.md** (`../AGENTS.md`): The sole root-file entry point. Agents navigate from AGENTS.md → this README → docs/ARCHITECTURE.md.

### Exposes
- **Navigation tree**: From this README, any agent can reach every component README and platform document in ≤ 3 file reads.
- **Quick Start commands**: Minimum steps to build, test, and run the platform locally.
- **Component inventory**: Directory Map and Component Reference tables for O(1) lookups.

## Concepts

- **Worker**: A registered entity that implements the `IWorker` interface — accepts tasks, executes within a workspace, produces artifacts. Human and AI workers share the same interface.
- **Platform Contract**: A TypeScript interface defining the boundary between layers. Applications import contracts, never implementations.
- **Provider Registry**: The central runtime indirection that maps contracts to concrete service implementations at startup.
- **Context Snapshot**: An immutable point-in-time copy of all relevant memory domains, created at task assignment to prevent context drift.
- **Artifact**: The only persistent output of worker execution — source code, configuration, test results, documentation, reports. All workspace content is ephemeral.

## Navigation

- **Up:** [AGENTS.md](../AGENTS.md)
- **Related:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/VISION.md](docs/VISION.md), [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- **Children:** [docs/](docs/), [apps/](apps/), [packages/](packages/), [infra/](infra/), [scripts/](scripts/), [tests/](tests/)
