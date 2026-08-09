# Shared Packages

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical architecture overview and layer model

## Purpose

The `packages/` directory contains all shared libraries, SDKs, and reusable modules consumed by applications in `apps/` and external consumers. Each package is a versioned, independently buildable unit with a published contract. Packages implement the Worker Platform (Layer 5) and Platform Services (Layer 4) layers — they provide contracts, runtimes, and provider implementations but are NOT deployable services themselves.

## Directory Map

| Path | Purpose | Layer |
|---|---|---|
| `contracts/` | Platform Contracts — all interfaces governing cross-layer communication | Layer 5 |
| `worker-runtime/` | Worker Runtime — task queue consumer, lifecycle manager, artifact pipeline | Layer 5 |
| `workspace-runtime/` | Workspace Runtime — sandbox manager, filesystem layer, network policy controller | Layer 5 |
| `tool-registry/` | Tool Registry — tool catalog, resolver, sandboxing | Layer 5 |
| `memory/` | Memory Services — STM, LTM, context assembler, memory compactor | Layer 5 |
| `planning/` | Planning Services — task decomposer, dependency resolver, parallelism optimizer | Layer 5 |
| `evaluation/` | Evaluation Services — output validator, quality scorer, feedback loop | Layer 5 |
| `governance/` | Governance Services — permission engine, approval gate, audit logger, rate limiter | Layer 5 |
| `services/` | Platform Services — provider implementations (database, cache, queue, storage) | Layer 4 |
| `sdk/` | Client SDK — developer-facing library for building workers and applications | Layer 5 |

Every package follows the standard component structure:
```
packages/<package-name>/
  src/                  # Package source code
  tests/                # Unit and integration tests (co-located)
  index.ts              # Public API barrel export
  README.md             # API documentation and usage guide
  package.json          # Dependencies and scripts
  tsconfig.json         # TypeScript configuration
```

## Contracts

### Implements
- **Platform Contracts** (`packages/contracts/`): Defines all interfaces — `WorkerContract`, `WorkspaceContract`, `ToolContract`, `MemoryContract`, `PlanningContract`, `EvaluationContract`, `GovernanceContract`, `ServiceProviderContract`. These interfaces are the canonical boundary between application and platform code per [DEP-03 and DEP-04](../docs/ARCHITECTURE.md#3-dependency-flow).
- **ServiceProviderContracts**: `DatabaseProvider`, `CacheProvider`, `QueueProvider`, `ObjectStoreProvider`, `SearchProvider`, `VectorStoreProvider`, `EmailProvider` — implemented by packages in `services/`.

### Depends On
- **Nothing above Layer 5**: Worker Platform packages depend only on ServiceProviderContracts (interfaces), never on concrete providers per [DEP-03](../docs/ARCHITECTURE.md#3-dependency-flow).
- **Platform Services** (`packages/services/`): Depend on Infrastructure primitives (networking, volumes) per [DEP-05](../docs/ARCHITECTURE.md#3-dependency-flow).

### Exposes
- Versioned public APIs via barrel exports (`index.ts`)
- TypeScript type definitions for all contracts
- Consumer-facing SDK (`packages/sdk/`) for building workers

## Concepts

- **Barrel Export**: Each package exposes its entire public API through a single `index.ts` file. Consumers import ONLY from the barrel — internal files are opaque. Example: `import { WorkerContract } from '@uwp/contracts'`.
- **Provider Registry**: The runtime indirection layer that maps contract interfaces to concrete provider implementations. Registered at startup via configuration — swapping a provider (e.g., PostgreSQL to MySQL) requires only a registry binding change with zero application code changes. See [arch-uwp-topology Section 5](../docs/ARCHITECTURE.md).
- **Contract-First Development**: Packages define their interface contract BEFORE implementation. Every package's `index.ts` exports ONLY the contract types and factory functions — internal implementation detail files are never in the export path.
- **Versioned Contract**: Every package follows SemVer. Breaking interface changes require major version increment. The `contracts/` package is the most stability-critical — its interfaces are the platform's backward-compatibility surface.

## Creating a Package

1. Create the directory: `mkdir -p packages/<package-name>/{src,tests}`
2. Define the contract in `packages/<package-name>/src/types.ts`
3. Export the public API in `packages/<package-name>/index.ts`
4. Write the README.md following the self-documentation contract:
   ```markdown
   # <Package Name>
   > **Parent:** [packages/README.md](README.md) — shared packages overview

   ## Purpose
   ## Directory Map
   ## Contracts
     ### Implements
     ### Depends On
     ### Exposes
   ## Concepts
   ## Navigation
   ```
5. Register the package in the package manifest if applicable
6. Add unit tests co-located in `tests/` (file pattern: `*.test.ts`)

## Consuming a Package

Application code in `apps/` imports from packages using barrel-export paths:
```typescript
// Correct — imports from the public API barrel
import { WorkerContract } from '@uwp/contracts'
import { createWorker } from '@uwp/sdk'

// FORBIDDEN — imports internal implementation files (violates DEP-02)
// import { PostgresClient } from '@uwp/services/postgres/client'
```

Packages are consumed via the platform's dependency management. Never use relative `../` paths across the `apps/` / `packages/` boundary.

## Dependency Rules

| Rule | Description |
|---|---|
| PKG-01 | Packages in Layer 5 MUST NOT import from Layer 4 (Platform Services) except through provider interfaces |
| PKG-02 | Packages in Layer 4 MUST NOT import from Layer 5 (Worker Platform) or Layer 6 (Application) |
| PKG-03 | Every package MUST export a typed public API through its barrel (`index.ts`) |
| PKG-04 | Internal implementation details MUST NOT appear in the barrel export |
| PKG-05 | Breaking contract changes require a SemVer major version bump |
| PKG-06 | No circular dependencies between packages |

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview
- **Related:** [apps/README.md](../apps/README.md), [infra/README.md](../infra/README.md), [docs/WORKER_GUIDE.md](../docs/WORKER_GUIDE.md)
- **Children** (all located flat at `app/` level): [`../contracts/README.md`](../contracts/README.md), [`../worker-runtime/README.md`](../worker-runtime/README.md), [`../workspace-runtime/README.md`](../workspace-runtime/README.md), [`../tool-registry/README.md`](../tool-registry/README.md), [`../memory/README.md`](../memory/README.md), [`../planning/README.md`](../planning/README.md), [`../evaluation/README.md`](../evaluation/README.md), [`../governance/README.md`](../governance/README.md), [`../services/README.md`](../services/README.md)
