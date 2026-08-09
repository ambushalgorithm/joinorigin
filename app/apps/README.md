# Applications

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical architecture overview and layer model

## Purpose

The `apps/` directory contains all runnable, independently deployable application services built on the Universal Worker Platform. Each application is a self-contained assembly of workers, agent workflows, and custom tool plugins that solve a specific business domain. Applications live at Layer 6 (Application Layer) and depend exclusively on Platform Contracts — they never import from Platform Services, Infrastructure, or Deployment layers.

## Directory Map

| Path | Purpose |
|---|---|
| `saas-platform/` | Multi-tenant SaaS product backend (example: CRM, ERP, analytics) |
| `internal-tools/` | Internal operational tools (admin dashboards, data pipelines) |
| `api-gateway/` | Public-facing REST and GraphQL API services |
| `mobile-backend/` | Mobile application backends (push notifications, sync, auth) |
| `ai-applications/` | AI-native applications (RAG pipelines, agent orchestrators, LLM proxies) |
| `trading-systems/` | Financial trading systems (market data, order execution, risk management) |
| `research-platforms/` | Research and experimentation platforms (data analysis, model training, simulation) |
| `knowledge-systems/` | Knowledge management systems (document indexing, semantic search, Q&A) |

Every application subdirectory follows the standard component structure:
```
apps/<app-name>/
  src/                  # Application source code
  tests/                # Application-specific tests (unit, integration)
  index.ts              # Entrypoint
  README.md             # Self-documenting application guide
  package.json          # Dependencies and scripts
  tsconfig.json         # TypeScript configuration
  .env.example          # Environment variable template
```

## Contracts

### Implements
- **Worker Assemblies**: Business-logic workers composed of tasks, context, and artifacts (see [worker-runtime/README.md](../worker-runtime/README.md))
- **Agent Workflows**: DAGs of workers with evaluation loops (see [planning/README.md](../planning/README.md))
- **Custom Tool Plugins**: Domain-specific tools registered into the Tool Registry (see [tool-registry/README.md](../tool-registry/README.md))

### Depends On
- **Platform Contracts** (`@uwp/contracts`): `WorkerContract`, `WorkspaceContract`, `ToolContract`, `MemoryContract`, `PlanningContract`, `EvaluationContract`, `GovernanceContract` — the ONLY visible surface from the Application layer per [DEP-01 and DEP-02](../docs/ARCHITECTURE.md#3-dependency-flow)

### Exposes
- Deployable service artifacts with independent lifecycles
- Domain-specific worker implementations
- Application-scoped configuration and environment definitions

## Concepts

- **Worker Assembly**: A composable unit of business logic — one or more workers wired together with context, task definitions, and artifact pipelines. Packaged as a deployable service.
- **Agent Workflow**: A directed acyclic graph (DAG) of worker invocations with evaluation and feedback loops. Defines the execution topology for an application.
- **Custom Tool Plugin**: A domain-specific tool (e.g., a proprietary API client, a specialized data processor) registered in the platform Tool Registry and callable by workers within the application scope.
- **Independently Deployable**: Each application subdirectory has its own entrypoint, dependency manifest, and deployment configuration. Applications share packages through the `packages/` directory but deploy independently.

## Application Types

### SaaS Products
Public-facing multi-tenant platforms. Characteristics: tenant isolation via context domains, usage-based governance (rate limiting, cost tracking), subscription-tiered feature gates.

### Internal Tools
Platform-internal operational tools. Characteristics: admin access patterns, batch processing workers, dashboard aggregation via GraphQL, governance approval for destructive operations.

### APIs
REST and GraphQL API services for external consumers. Characteristics: OpenAPI 3.1 spec at `/openapi.json`, JWT/OAuth authentication, rate-limited per API key, metrics at `/metrics`.

### Mobile Backends
Backend-for-frontend services for mobile applications. Characteristics: push notification workers (WebSocket), offline sync via queue workers, token-based auth with refresh, bandwidth-optimized artifact delivery.

### AI Applications
AI-native platforms built on the UWP. Characteristics: LLM worker integration via MCP tools, RAG pipelines using Vector Storage + Knowledge Memory, agent orchestrator workflows with evaluation loops, model-agnostic context persistence.

### Trading Systems
High-throughput, low-latency financial systems. Characteristics: event-stream workers (WebSocket market data), deterministic order-execution workers, compliance workers with mandatory governance gates, immutable audit trail.

### Research Platforms
Experimentation and analysis platforms. Characteristics: long-running compute workers (workspace type: `vm` for untrusted code), reproducible context snapshots, benchmark artifact type, knowledge extraction from results.

### Knowledge Systems
Document indexing, semantic search, and knowledge retrieval. Characteristics: Search + Vector Storage integration, knowledge worker pipelines (ingest → embed → index → retrieve), confidence-scored knowledge entries, deprecation-based knowledge lifecycle.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview
- **Related:** [packages/README.md](../packages/README.md), [examples/README.md](../examples/README.md), [docs/WORKER_GUIDE.md](../docs/WORKER_GUIDE.md)
- **Children:** Individual application directories (e.g., `saas-platform/`, `internal-tools/`, `ai-applications/`)
