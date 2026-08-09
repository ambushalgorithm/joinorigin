# Platform Contracts

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

This directory contains the complete set of Platform Contracts — the TypeScript interface definitions, API contracts, and protocol specifications that form the ONLY visible surface area between platform layers. Applications code against contracts, never against concrete implementations. The Worker Platform depends only on ServiceProviderContracts, never on specific providers. Every cross-layer interaction passes through a contract defined here.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Interface definitions, type declarations, contract validation utilities |
| `tests/` | Contract conformance tests (structural typing, schema validation) |
| `config.*` | Contract version registry, deprecation policy configuration |
| `README.md` | This file — self-documentation and contract index |

## Contracts

### Implements

Contracts are **interface definitions** — they do not implement logic. They define the shape, type signatures, and behavioral contracts that Worker Platform components and Platform Service providers must satisfy.

### Depends On

Contracts are the foundational layer of the platform's type system. They depend on:
- **Nothing within the platform** — contracts define interfaces, not implementations. They may depend on standard TypeScript type primitives and shared utility types.
- Contracts are consumed by: Application layer (DEP-01), Worker Platform components, Platform Service providers.

### Exposes

Contracts expose the following canonical interfaces. Each is the single source of truth for its domain — no duplicate definitions, no alternative interfaces.

## Contract Index

### Worker Platform Contracts (Layer 5)

The Application layer codes against these contracts exclusively. They are the ONLY visible surface from the Worker Platform to the Application layer (DEP-01).

| Contract | File | Purpose | Consumed By |
|---|---|---|---|
| **WorkerContract** | `worker-contract.ts` | Worker identity, registration, lifecycle, task acceptance/execution/completion | Application layer (worker assemblies), Worker Runtime |
| **WorkspaceContract** | `workspace-contract.ts` | Workspace provisioning, isolation, binding, teardown | Application layer, Workspace Runtime |
| **ToolContract** | `tool-contract.ts` | Tool registration, discovery, invocation, versioning, deprecation | Application layer, Tool Registry |
| **MemoryContract** | `memory-contract.ts` | Context read/write, snapshot creation, artifact registration, knowledge contribution | Application layer, Memory Services |
| **PlanningContract** | `planning-contract.ts` | Goal decomposition, dependency resolution, task scheduling, effort estimation | Application layer, Planning Services |
| **EvaluationContract** | `evaluation-contract.ts` | Output validation, quality scoring, cost/performance/reliability analysis, regression detection | Application layer, Evaluation Services |
| **GovernanceContract** | `governance-contract.ts` | Permission checks, approval gating, audit logging, resource/cost limits, secret access | Application layer, Governance Services |

### Service Provider Contracts (Layer 4)

The Worker Platform depends on these contracts to access platform services. No Worker Platform component imports a provider-specific library (DEP-03, DEP-04).

| Contract | File | Purpose | Implemented By |
|---|---|---|---|
| **ServiceProviderContract:Database** | `providers/database.ts` | Relational database operations (query, transaction, migration) | PostgreSQL provider (`../services/README.md`) |
| **ServiceProviderContract:Cache** | `providers/cache.ts` | Key-value cache with TTL (get, set, delete, pipeline) | Redis provider (`../services/README.md`) |
| **ServiceProviderContract:Queue** | `providers/queue.ts` | Job queue (enqueue, status, cancel, stats) | BullMQ provider (`../services/README.md`) |
| **ServiceProviderContract:ObjectStore** | `providers/object-store.ts` | Object storage (upload, download, delete, presigned URLs) | MinIO provider (`../services/README.md`) |
| **ServiceProviderContract:Search** | `providers/search.ts` | Full-text search (index, search, bulk operations) | Elasticsearch-compatible provider (`../services/README.md`) |
| **ServiceProviderContract:VectorStore** | `providers/vector-store.ts` | Vector storage and similarity search (collections, upsert, search, recommend) | Qdrant provider (`../services/README.md`) |
| **ServiceProviderContract:Email** | `providers/email.ts` | Email sending (send, status, templates) | SMTP provider (`../services/README.md`) |

## Contract Usage Pattern

### Application → Worker Platform (DEP-01, DEP-02)

```typescript
// Application layer: import ONLY contracts
import { WorkerContract } from '@uwp/contracts';
import { WorkspaceContract } from '@uwp/contracts';
// NEVER: import { PostgresClient } from '@uwp/services'; // VIOLATES DEP-02
```

Applications code against contract interfaces. The Provider Registry in the Worker Platform resolves implementations at startup. Applications have zero knowledge of concrete providers.

### Worker Platform → Platform Services (DEP-03, DEP-04)

```typescript
// Worker Platform: import ONLY provider contracts
import { DatabaseProvider } from './contracts/providers/database';
// NEVER: import pg from 'pg'; // VIOLATES DEP-03
// NEVER: import { Redis } from 'ioredis'; // VIOLATES DEP-04
```

The Provider Registry maps provider contracts to concrete implementations registered by Platform Services at startup. Swapping PostgreSQL for MySQL requires only a new provider implementation — zero changes in Worker Platform or Application code.

## Contract Governance

### Versioning Policy

| Bump | When |
|---|---|
| **Major** (X.0.0) | Backward-incompatible: removing a method, changing a required parameter, changing return type |
| **Minor** (X.Y.0) | Backward-compatible: new optional method, new optional parameter, new contract |
| **Patch** (X.Y.Z) | Documentation fix, type narrowing that doesn't break consumers |

### Deprecation Policy

- Breaking changes require **deprecation notice** with a minimum 1-sprint-cycle grace period.
- Deprecated contracts emit compile-time warnings (TypeScript `@deprecated` JSDoc tag).
- Deprecated contracts remain available for the grace period; removed in the next major version.
- All contract changes are recorded in the architecture decision log (ADR) in Project Memory.

### Contract Validation Gates

Every contract must pass:
- **Structural typing validation:** Interfaces are structurally sound — no `any` types, no circular references, no ambiguous overloads.
- **Consumer compatibility:** Existing consumers of the previous version compile without changes for minor/patch bumps.
- **Provider compliance:** At least one provider implements each ServiceProviderContract.
- **Documentation:** Every method has a JSDoc comment describing preconditions, postconditions, and error modes.

## Relationship to Integration Model

Platform Contracts are the interface half of the platform's integration model. The other half — protocol specifications (REST endpoints, MCP methods, message schemas) — is defined in the Tool Registry (`../tool-registry/README.md`) and implemented by Platform Services (`../services/README.md`). Together, contracts and protocols form the complete integration surface (see TASK-006, arch-uwp-integration-model).

## Concepts

- **Platform Contract:** A TypeScript interface that defines the type shape and behavioral contract for a platform component. Contracts are the ONLY mechanism for cross-layer communication.
- **Provider Registry:** The runtime indirection mechanism that maps ServiceProviderContracts to concrete provider implementations at startup. Enables provider swap without rebuild.
- **Contract Boundary Enforcement:** The rule that applications and platform components MUST only import from contracts — never from concrete implementations. Enforced at build time (lint rules) and runtime (Provider Registry).
- **ServiceProviderContract:** A contract defined by the Worker Platform and implemented by a Platform Service. The Worker Platform depends only on the contract interface, never on the provider library.
- **Contract Versioning:** Semantic versioning applied to contracts. Major bumps for breaking changes, minor for additions, patch for fixes. Deprecation with grace period before removal.
- **Protocol Specification:** The wire-level complement to a contract — defines REST endpoints, MCP methods, message schemas, and transport details. Defined in the integration model (arch-uwp-integration-model).

## Implementation Guidance

### What to build

1. **Worker Platform Contracts (7 interfaces):** Define the full `WorkerContract`, `WorkspaceContract`, `ToolContract`, `MemoryContract`, `PlanningContract`, `EvaluationContract`, and `GovernanceContract` interfaces. Each interface should be a single TypeScript file with JSDoc-documented methods matching the architecture specifications in ARCHITECTURE.md.

2. **Service Provider Contracts (7 interfaces):** Define `DatabaseProvider`, `CacheProvider`, `QueueProvider`, `ObjectStoreProvider`, `SearchProvider`, `VectorStoreProvider`, and `EmailProvider` interfaces under `providers/`. Each should specify the minimal operation set required by the Worker Platform.

3. **Contract Validation Utilities:** TypeScript type-level tests that verify structural compatibility. Lint rules that prevent imports from provider-specific modules (enforcing DEP-02, DEP-03, DEP-04).

4. **Barrel Exports:** An `index.ts` that re-exports all contracts as the `@uwp/contracts` package surface. Applications import from this single entry point.

### Key design constraints

- **Contracts live in the layer that defines them, never in the layer that consumes them (DEP-10).** Worker Platform contracts are defined here. Application layer consumes them but does not define them.
- **No implementation logic in contracts.** Contracts are pure TypeScript interfaces and type declarations — no classes, no functions, no runtime code.
- **No provider-specific types in Worker Platform contracts.** `DatabaseProvider.query()` returns generic `QueryResult`, not `pg.QueryResult`.
- **Every contract method must declare its error contract** — what exceptions or error codes can be thrown and under what conditions.
- **Contracts are the canonical source of truth.** If a contract and a README disagree about an interface, the contract file wins. READMEs reference, they do not redefine.

### Integration points

- **Worker Platform components** implement contracts defined here (e.g., Memory Services implements `MemoryContract`).
- **Platform Services** implement provider contracts defined here (e.g., PostgreSQL provider implements `DatabaseProvider`).
- **Application layer** imports only from `@uwp/contracts` — never from individual component directories.
- **Provider Registry** (`../worker-runtime/README.md`) resolves provider contracts to concrete implementations at startup.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [tool-registry/README.md](../tool-registry/README.md), [services/README.md](../services/README.md), [planning/README.md](../planning/README.md), [evaluation/README.md](../evaluation/README.md), [governance/README.md](../governance/README.md)
- **Architecture contracts:** arch-uwp-integration-model (TASK-006), arch-uwp-topology (TASK-001 §2.2, §4)
