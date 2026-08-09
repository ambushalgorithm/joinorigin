# Platform Services

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

Platform Services are the concrete provider implementations that back the Universal Worker Platform's persistence, caching, messaging, storage, search, vector, and email capabilities. Each service implements a ServiceProviderContract defined in the Worker Platform contracts layer. Services are swappable — changing PostgreSQL to MySQL requires only a new provider registered under the same contract, with zero changes to the Worker Platform or Application layers.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Provider implementations: database, cache, queue, object storage, search, vector storage, email |
| `tests/` | Provider-specific integration tests (e.g., PostgreSQL integration, Redis integration) |
| `config.*` | Provider configurations (connection strings, pool sizes, TTLs — injected at runtime, not hardcoded) |
| `README.md` | This file — self-documentation and service registry |

## Contracts

### Implements

Each service implements a ServiceProviderContract defined in `../contracts/`:

| Service | Implements Contract | Reference Provider |
|---|---|---|
| Database | `ServiceProviderContract:Database` | PostgreSQL (pgBouncer connection pool) |
| Cache | `ServiceProviderContract:Cache` | Redis (ACL + TLS) |
| Queue | `ServiceProviderContract:Queue` | BullMQ (Redis-backed) |
| Object Storage | `ServiceProviderContract:ObjectStore` | MinIO (S3-compatible) |
| Search | `ServiceProviderContract:Search` | Elasticsearch-compatible (Provider TBD) |
| Vector Storage | `ServiceProviderContract:VectorStore` | Qdrant (REST + gRPC) |
| Email | `ServiceProviderContract:Email` | SMTP (Provider TBD) |

### Depends On

- **Infrastructure** (`../infra/README.md`): Container runtime, networking, volumes, observability stack. Platform Services run on infrastructure but have no dependency on Worker Platform or Application layers (DEP-06).
- **Contracts** (`../contracts/README.md`): Each service implements a provider contract defined there. The contract is the interface; the service is the implementation.

### Exposes

- **Service-specific REST APIs:** Each service exposes a REST proxy for operations (query, cache, queue, storage, search, vector, email).
- **Health/Readiness/Metrics:** Every service MUST expose `/health`, `/ready`, `/metrics`, and `/openapi.json` endpoints (GATE-INT-01).

## Service Registry

### 1. Database Service (PostgreSQL)

| Property | Value |
|---|---|
| **Protocol** | PostgreSQL Wire Protocol (pgBouncer connection pool) |
| **Port** | 5432 |
| **Auth** | SCRAM-SHA-256 / TLS |
| **Access Mode** | Read-write (primary), Read-only (replicas) |

**REST Proxy:**
- `POST /api/v1/db/query` — Parameterized SQL execution
- `POST /api/v1/db/transaction` — Multi-statement transaction
- `GET /api/v1/db/schema` — Current schema dump
- `POST /api/v1/db/migrate` — Apply migration (goose-compatible)

**Consumer Contract:**
- Queries MUST be parameterized — no string interpolation.
- Schema version MUST match worker manifest.
- Connection pooling via pgBouncer (min 2, max 20 connections per worker).
- Migration scripts versioned in repository, applied in CI before deploy.

### 2. Cache Service (Redis)

| Property | Value |
|---|---|
| **Protocol** | Redis Serialization Protocol (RESP) |
| **Port** | 6379 |
| **Auth** | ACL + TLS |

**REST Proxy:**
- `GET /api/v1/cache/{key}` — Read value
- `PUT /api/v1/cache/{key}` — Write with TTL
- `DELETE /api/v1/cache/{key}` — Invalidate
- `POST /api/v1/cache/pipeline` — Batch operations

**Consumer Contract:**
- Key format: `{domain}:{entity}:{id}` (e.g., `session:abc123:state`).
- All writes MUST specify TTL — no unbounded keys.
- Cache misses MUST be handled gracefully (cache is never source of truth).
- Max key size: 512 bytes; max value size: 1 MiB.
- Namespace per tenant via key prefix enforcement at proxy layer.

### 3. Queue Service (BullMQ)

| Property | Value |
|---|---|
| **Protocol** | BullMQ (Redis-backed job queue) |
| **Backend** | Redis (shared with Cache, logically isolated by prefix) |

**REST Proxy:**
- `POST /api/v1/queue/{name}/job` — Enqueue job
- `GET /api/v1/queue/{name}/job/{id}` — Job status
- `DELETE /api/v1/queue/{name}/job/{id}` — Cancel job
- `GET /api/v1/queue/{name}/stats` — Queue metrics

**Consumer Contract:**
- Jobs MUST have unique idempotency key (deduplication).
- Workers declare queue affinity at startup.
- Max attempts per job: 3 (configurable per queue).
- Dead letter queue suffix: `{queue-name}:dlq`.
- Priority levels: 1 (low) to 10 (critical).
- Job TTL: 24h for pending, 7d for completed.

### 4. Object Storage Service (MinIO)

| Property | Value |
|---|---|
| **Protocol** | S3-compatible API (AWS Signature V4) |
| **Port** | 9000 (API), 9001 (Console) |
| **Auth** | Access Key + Secret Key + TLS |

**REST Proxy:**
- `PUT /{bucket}/{key}` — Upload object
- `GET /{bucket}/{key}` — Download object
- `DELETE /{bucket}/{key}` — Remove object
- `HEAD /{bucket}/{key}` — Object metadata
- `POST /{bucket}` — Create bucket (admin)

**Consumer Contract:**
- Bucket naming: `{tenant}-{purpose}` (auto-provisioned per tenant).
- Workers have scoped access to their project bucket only.
- Presigned URLs for external consumers (expiry: 5min upload, 15min download).
- Max object size: 5 GiB (multipart upload threshold: 5 MiB).
- Lifecycle rules auto-expire temp objects (prefix: `tmp/`).
- Encryption: AES-256 server-side; integrity: SHA-256 checksum verified on GET.

### 5. Search Service (Elasticsearch-compatible)

| Property | Value |
|---|---|
| **Protocol** | Elasticsearch REST API |
| **Port** | 9200 |
| **Auth** | API Key / Basic Auth + TLS |

**Endpoints:**
- `POST /{index}/_search` — Search query
- `POST /{index}/_doc` — Index document
- `GET /{index}/_doc/{id}` — Get document
- `DELETE /{index}/_doc/{id}` — Delete document
- `POST /{index}/_bulk` — Bulk operations

**Consumer Contract:**
- Index naming: `{domain}-v{version}-{date}` (e.g., `artifacts-v1-20260619`).
- Search queries MUST have timeout (max 30s).
- Reindex strategy: alias-swap for zero-downtime schema migrations.

### 6. Vector Storage Service (Qdrant)

| Property | Value |
|---|---|
| **Protocol** | Qdrant REST API + gRPC API |
| **Port** | 6333 (REST), 6334 (gRPC) |
| **Auth** | API Key + TLS |

**Endpoints:**
- `PUT /collections/{name}` — Create collection
- `DELETE /collections/{name}` — Drop collection
- `PUT /collections/{name}/points` — Upsert points
- `POST /collections/{name}/points/search` — Vector search
- `POST /collections/{name}/points/recommend` — Recommendation

**Consumer Contract:**
- Collection naming: `{domain}-{model}-{dim}d` (e.g., `docs-all-MiniLM-384d`).
- Default distance metric: Cosine.
- Batch upsert: max 1000 points per call.
- Search returns top-K with similarity scores.
- Payload filtering supports must/should/must_not clauses.

### 7. Email Service

| Property | Value |
|---|---|
| **Protocol** | REST (internal) → SMTP (external) |
| **Auth** | Service API Key + TLS |

**Endpoints:**
- `POST /api/v1/email/send` — Send email
- `GET /api/v1/email/status/{id}` — Delivery status
- `POST /api/v1/email/template` — Create/update template
- `GET /api/v1/email/templates` — List templates

**Consumer Contract:**
- Templates use Handlebars syntax with HTML auto-escaping.
- Rate limit: 100 emails/min per tenant.
- Max recipients per email: 50.
- Retry on transient SMTP failures: 3x with exponential backoff.
- Attachment max: 10 MiB total per email.

## Provider Independence Architecture

Platform Services achieve provider independence through the Provider Registry pattern:

```
Application Layer → imports contracts only (@uwp/contracts)
                            │
Worker Platform → Provider Registry resolves contract → implementation
                            │
                 ┌──────────┼──────────┐
                 │          │          │
           PostgreSQL    Redis      MinIO
           Provider      Provider   Provider
                 │          │          │
           implements  implements  implements
           Database    Cache       ObjectStore
           Contract    Contract    Contract
```

**Key principles:**
1. Applications import **contracts** (TypeScript interfaces), never provider modules.
2. The **Provider Registry** in the Worker Platform maps contracts to implementations at startup.
3. Provider implementations live here in `services/` and are registered via configuration, not hardcoded.
4. Swapping a provider = changing the registry binding only; zero application code changes.
5. Provider-specific configuration (connection strings, credentials) lives in the Deployment layer, injected at runtime — never hardcoded in service code.

## Service Requirements

Every Platform Service MUST satisfy:

| Requirement | Description |
|---|---|
| **Health Endpoint** | `GET /health` → `{ status: "ok"\|"degraded"\|"down", uptime_s, version, checks }` |
| **Readiness Endpoint** | `GET /ready` → `{ ready: boolean, dependencies: map<string, boolean> }` |
| **Metrics Endpoint** | `GET /metrics` → Prometheus text format |
| **OpenAPI Spec** | `GET /openapi.json` → OpenAPI 3.1 spec document |
| **ServiceProviderContract** | Implements the full interface defined in `../contracts/providers/` |
| **TLS 1.3** | All endpoints require TLS 1.3 minimum |
| **Structured Logging** | JSON format: `{ timestamp, level, service, trace_id, msg }` |
| **Tracing** | W3C Trace Context propagation via `traceparent` header |

## Concepts

- **Provider Registry:** The runtime indirection mechanism in the Worker Platform that maps `ServiceProviderContract` interfaces to concrete service implementations at startup. Enables provider swap without rebuild.
- **ServiceProviderContract:** An interface defined in the Worker Platform (`../contracts/README.md`) that a Platform Service must fully implement. The Worker Platform depends only on the contract, never on the provider library (DEP-03).
- **Provider Independence:** The architectural property that allows swapping a service backend (e.g., PostgreSQL → MySQL) by changing only the provider registration, with zero changes to Worker Platform or Application code.
- **REST Proxy:** Each service exposes a REST API as the primary access pattern. Workers and platform components access services through these proxied endpoints, never through direct provider connections.
- **Health/Readiness/Metrics:** The mandatory observability contract that every Platform Service must implement. Enables the platform to monitor, route, and scale services uniformly.

## Component Topology Reference

This service directory maps to the Platform Services layer (Layer 4) as defined in the platform topology (see TASK-001, arch-uwp-topology §2.3). The services serve as concrete backends for the Worker Platform layer (Layer 5) components:

| Worker Platform Component | Consumed Services |
|---|---|
| Memory Services | Database, Cache, Object Storage, Vector Storage, Search |
| Tool Registry | Database, Cache |
| Governance Services | Database (audit log, policy store) |
| Planning Services | Database (task store), Cache (planning state) |
| Evaluation Services | Database (quality store), Cache (baseline cache) |
| Worker Runtime | Queue (task dispatch) |

## Implementation Guidance

### What to build

1. **Database Provider (PostgreSQL):** Implements `DatabaseProvider` interface. Connection pooling via pgBouncer. Parameterized query execution. Schema migration support. Read replicas for query-heavy workloads.

2. **Cache Provider (Redis):** Implements `CacheProvider` interface. ACL authentication. Key prefix namespace enforcement. Pipeline for batch operations. TTL enforcement on all writes.

3. **Queue Provider (BullMQ):** Implements `QueueProvider` interface. Redis-backed job queue with priority levels, retry with backoff, dead letter queue, and idempotency via job keys.

4. **Object Storage Provider (MinIO):** Implements `ObjectStoreProvider` interface. S3-compatible API with presigned URLs, multipart uploads, server-side encryption, and lifecycle policies for auto-expiry.

5. **Search Provider (Elasticsearch-compatible):** Implements `SearchProvider` interface. Full-text search with index aliasing, zero-downtime reindex, and configurable analyzers.

6. **Vector Storage Provider (Qdrant):** Implements `VectorStoreProvider` interface. Collection management, vector upsert with payloads, similarity search with cosine distance, and recommendation queries.

7. **Email Provider (SMTP):** Implements `EmailProvider` interface. Template rendering (Handlebars), rate limiting, retry with exponential backoff, and delivery status tracking.

### Key design constraints

- **No provider-specific libraries in Worker Platform.** Service providers are the ONLY place where provider-specific dependencies (pg, ioredis, @qdrant/js-client-rest) are imported.
- **Connection strings injected at runtime.** Never hardcoded in service code. Supplied by the Deployment layer via environment variables or secrets manager.
- **Every service exposes a health endpoint.** The platform relies on health/readiness/metrics for routing and auto-scaling.
- **Services are independently deployable.** Each service can be deployed, scaled, and updated independently. They communicate only through their defined APIs.
- **Stateless where possible.** Stateful services (database, cache) persist data externally. Service instances themselves should be replaceable without data loss.

### Integration points

- **Provider Registry** (`../worker-runtime/README.md`): Services register themselves with the Provider Registry at startup, mapping their implementation to the contract they satisfy.
- **Contracts** (`../contracts/README.md`): Each service implements exactly one ServiceProviderContract. The contract defines the interface; the service provides the implementation.
- **Infrastructure** (`../infra/README.md`): Services run on infrastructure (containers, networking, volumes) defined in infra/.
- **Deployment** (see `../infra/README.md`): Environment-specific configuration (connection strings, credentials, scaling parameters) injected at deploy time.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [contracts/README.md](../contracts/README.md), [infra/README.md](../infra/README.md), [memory/README.md](../memory/README.md), [tool-registry/README.md](../tool-registry/README.md), [worker-runtime/README.md](../worker-runtime/README.md)
- **Architecture contracts:** arch-uwp-topology (TASK-001 §2.3, §5), arch-uwp-integration-model (TASK-006 §2.2)
