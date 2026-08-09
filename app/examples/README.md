# Examples

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical architecture overview and layer model

## Purpose

The `examples/` directory contains reference implementations, example configurations, and walkthrough applications that demonstrate how to build, deploy, and operate applications on the Universal Worker Platform. Each example is a minimal, self-contained application that illustrates exactly one pattern, integration, or workflow. Examples serve as the bridge between architecture documentation and production application code.

## Directory Map

| Path | Purpose |
|---|---|
| `hello-worker/` | Minimal worker: single task, no workspace, returns "hello world" artifact |
| `multi-step-pipeline/` | Multi-step worker pipeline with DAG dependencies and artifact handoff |
| `tool-integration/` | Worker using MCP and REST tools with Tool Registry discovery |
| `governance-gates/` | Example showing approval gates, permission checks, and audit logging |
| `memory-domains/` | Demonstrates context consumption across all six memory domains |
| `api-gateway/` | REST and GraphQL API backed by worker-orchestrated business logic |
| `saas-multi-tenant/` | Multi-tenant SaaS application with tenant isolation via context domains |
| `trading-bot/` | Event-stream trading worker with WebSocket market data and governance gates |
| `knowledge-rag/` | RAG pipeline: ingest → embed → index → retrieve using Vector Storage and Search |
| `workspace-isolation/` | Demonstrates workspace types (docker-container, kubernetes-pod, vm) with resource limits |
| `ci-cd-pipeline/` | Example CI/CD workflow that builds, tests, and deploys a worker application |
| `trace-example/` | Distributed tracing across worker invocations with W3C Trace Context |

Each example is self-contained:
```
examples/<example-name>/
  README.md             # Step-by-step walkthrough
  src/                  # Example source code
  tests/                # Example tests
  config/               # Configuration files
  docker-compose.yml    # Local runtime dependencies
  .env.example          # Required environment variables
```

## Contracts

### Implements
- Reference implementations of `IWorker` interface (see [worker-runtime/README.md](../worker-runtime/README.md))
- Example `WorkerContract` bindings for different application types
- Demonstrations of platform pattern usage: context consumption, artifact production, tool invocation

### Depends On
- **Platform Contracts** (`@uwp/contracts`): All examples import from platform contracts only — demonstrating DEP-01 and DEP-02 compliance
- **Infrastructure** (`../infra/`): Docker Compose files in examples reference infrastructure definitions for local runtime dependencies

### Exposes
- Runnable example applications that verify platform functionality
- Copyable patterns for building production applications
- Integration test scenarios for CI validation

## Example Index by Goal

| Goal | Start Here |
|---|---|
| Build my first worker | `hello-worker/` — simplest possible worker, ~30 lines |
| Chain workers together | `multi-step-pipeline/` — DAG of 3 workers with artifact handoff |
| Add a tool to my worker | `tool-integration/` — MCP tool discovery and invocation |
| Add governance controls | `governance-gates/` — permissions, cost checks, approval flows |
| Use platform memory | `memory-domains/` — read and write across all six domains |
| Build an API backend | `api-gateway/` — REST/GraphQL endpoints backed by workers |
| Build a SaaS app | `saas-multi-tenant/` — tenant isolation, usage governance, per-tenant context |
| Build a financial app | `trading-bot/` — event streams, deterministic execution, audit trail |
| Build an AI app (RAG) | `knowledge-rag/` — embed → index → search → generate pipeline |
| Isolate untrusted code | `workspace-isolation/` — VM/container sandbox configuration |
| Set up CI/CD | `ci-cd-pipeline/` — GitHub Actions workflow for worker deployment |
| Debug with tracing | `trace-example/` — end-to-end distributed trace across 3 workers |

## Getting Started

1. Start platform infrastructure:
   ```bash
   docker compose -f ../infra/compose/docker-compose.dev.yml up -d
   ```

2. Run any example:
   ```bash
   cd examples/hello-worker
   npm install
   npm run dev
   ```

3. Read the example's README.md for a step-by-step walkthrough.

## Example Design Principles

1. **Minimal**: Each example demonstrates exactly ONE concept. No combined examples that require understanding two patterns simultaneously.
2. **Runnable**: Every example ships with a `docker-compose.yml` for its dependencies. `npm install && npm run dev` must work with zero additional setup.
3. **Documented**: Every example has a README.md with: what it demonstrates, prerequisites, step-by-step instructions, expected output, and links to the production implementation.
4. **Contract-Compliant**: All examples follow DEP-01 and DEP-02. They import from platform contracts only — never from service internals.
5. **Tested**: Each example includes tests that verify the example works. These tests also serve as integration tests for the platform itself.
6. **Copyable**: Examples are structured so a developer can copy an example directory, rename it, and start building a production application.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview
- **Related:** [apps/README.md](../apps/README.md), [packages/README.md](../packages/README.md), [docs/WORKER_GUIDE.md](../docs/WORKER_GUIDE.md), [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md)
- **Children:** `hello-worker/`, `multi-step-pipeline/`, `tool-integration/`, `governance-gates/`, `memory-domains/`, `api-gateway/`, `saas-multi-tenant/`, `trading-bot/`, `knowledge-rag/`, `workspace-isolation/`, `ci-cd-pipeline/`, `trace-example/`
