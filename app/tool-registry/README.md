# Tool Registry

> **Parent:** [app/docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview

## Purpose

The Tool Registry is the central discovery mechanism for all tools available to workers in the Universal Worker Platform. It serves as the single source of truth for tool identity, capabilities, schema, version history, health status, and governance tier. Workers discover and resolve tools exclusively through the registry — no tool endpoint is ever hardcoded. The registry enforces protocol compliance at registration time and filters discovery results by the caller's permission scope.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Implementation: tool catalog, resolver, sandboxing, heartbeat monitor, version manager |
| `tests/` | Unit and integration tests for registration, discovery, resolution, and deprecation |
| `config.*` | Registry configuration (cache TTLs, heartbeat intervals, deprecation grace periods) |

## Contracts

### Implements
- **ToolContract** (`contracts/tool-contract.ts`): The canonical interface applications code against for tool registration and discovery.
- **Tool Registry Discovery Protocol** (defined in [docs/ARCHITECTURE.md §6.4](../docs/ARCHITECTURE.md)): Registration, discovery, heartbeat, deprecation, and schema resolution.

### Depends On
- **Governance Services** (`../governance/README.md`): Permission checks for tool invocation. Governance tiers (`open`, `restricted`, `admin_only`) are enforced at registry discovery and invocation time.
- **Platform Services** (`../services/README.md`): PostgreSQL (tool index, version history), Redis (discovery cache).
- **Worker Runtime** (`../worker-runtime/README.md`): Workers declare desired tool capabilities at startup; the registry validates and grants access.

### Exposes
- **Registry API** (`/api/v1/registry`): Full REST API for tool registration, discovery, resolution, heartbeat, version management, and deprecation.
- **MCP Proxy** (`/api/v1/mcp/{tool_id}/invoke`): Platform proxy for MCP tool invocations, enforcing governance checks before forwarding to tool providers.
- **REST Proxy** (`/api/v1/tools/{tool_id}/invoke`): Platform proxy for REST tool invocations with schema validation and governance gating.
- **Schema Service** (`/api/v1/registry/tools/{tool_id}/versions/{v}/schema`): Input/output JSON Schema retrieval for code generation and validation.

## Tool Lifecycle

Every tool passes through a governed lifecycle:

```
REGISTERED → ACTIVE → DEPRECATED → RETIRED
                ↘ EXPERIMENTAL (sandboxed)
```

| State | Description | Discovery Visible | Invocable |
|---|---|---|---|
| `active` | Fully available, health check passing | Yes | Yes |
| `experimental` | Available for testing, may change/break | Yes (flagged) | Yes (governance gated) |
| `degraded` | Health check failing, operational but unreliable | Yes (flagged) | Yes (with warning) |
| `deprecated` | Scheduled for removal, migration advised | Only if explicitly queried | Yes (with deprecation warning) |
| `retired` | Removed from service, historical record only | No | No |

## Registration Protocol

Tools are registered via an idempotent API call keyed on `tool_id`. Registration declares the tool's identity, protocols, schemas, rate limits, and governance tier.

### Registration Schema

| Field | Required | Description |
|---|---|---|
| `tool_id` | Yes | UUIDv7, provider-assigned, idempotency key |
| `name` | Yes | Globally unique, kebab-case (e.g., `filesystem`, `github-api`) |
| `display_name` | Yes | Human-readable label |
| `description` | Yes | 1–2000 characters describing what the tool does |
| `category` | Yes | Enum: `filesystem`, `git`, `browser`, `database`, `deployment`, `api`, `mcp`, `internal` |
| `protocols` | Yes | Array of `{ protocol: "mcp" \| "rest" \| "graphql" \| "grpc" \| "websocket", versions: [...] }` |
| `provider` | Yes | Service endpoint URL |
| `auth_required` | Yes | Whether the tool requires authentication |
| `rate_limits` | Yes | `{ requests_per_sec, burst }` |
| `governance_tier` | Yes | `open`, `restricted`, or `admin_only` |
| `tags` | No | Up to 20 tags for filtering |

### Version Schema (per entry in `versions[]`)

| Field | Description |
|---|---|
| `version` | Semver string (major.minor.patch) |
| `protocol` | Protocol identifier (e.g., `mcp`, `rest`) |
| `input_schema` | JSON Schema object for input validation |
| `output_schema` | JSON Schema object for output validation |
| `endpoint` | Connection endpoint for this version |
| `changelog` | Human-readable change notes |
| `published_at` | ISO-8601 timestamp |
| `min_worker_version` | Minimum worker version required (semver or null) |

```
POST /api/v1/registry/tools          — Register or update (idempotent)
DELETE /api/v1/registry/tools/{id}    — Soft-deregister (marks retired)
POST /api/v1/registry/tools/{id}/heartbeat — Prevent degraded marking (30s TTL)
POST /api/v1/registry/tools/{id}/deprecate — Deprecate a specific version
```

## Discovery Protocol

Workers discover tools through a filtered, permission-scoped query. The registry returns only tools at or below the caller's governance tier. Results are cached in Redis (10s TTL for listings, 30s for individual tool details).

```
GET /api/v1/registry/discover
  ?category={c}&protocol={p}&governance={g}&tags={t1,t2}&status=active&limit=50

Response:
  tools: [{ tool_id, name, display_name, description, category,
            protocols[], latest_version, governance_tier, tags[], health }]
  next_cursor: string | null

GET /api/v1/registry/tools/{tool_id}          — Full tool detail with all versions
GET /api/v1/registry/resolve/{tool_name}       — Resolve by name alias
GET /api/v1/registry/tools/{id}/versions/{v}/schema — Get JSON Schema for code generation
```

### Discovery Cache Strategy

| Cache | TTL | Invalidation Trigger |
|---|---|---|
| Tool listing (filtered) | 10s | Any register/deregister/deprecate event |
| Individual tool detail | 30s | Version update, health change |
| Worker local cache | 5s (recommended) | Stale-after-TTL, refetch on miss |

## Versioning Model

Tool versions follow strict Semantic Versioning with lifecycle signaling.

### Semver Policy

| Bump | When |
|---|---|
| **Major** (X.0.0) | Breaking input/output schema changes, protocol change, endpoint migration |
| **Minor** (X.Y.0) | New optional parameters, new protocol added, backward-compatible schema extension |
| **Patch** (X.Y.Z) | Bug fix, performance improvement, documentation update |

### Deprecation Flow

1. Tool provider calls `POST /registry/tools/{id}/deprecate` with `reason`, `migration_url`, and `sunset_date`.
2. Deprecated version appears in discovery with a `deprecated` flag and `sunset_date`.
3. API responses for deprecated versions include `Deprecation` and `Sunset` HTTP headers.
4. Minimum 1 sprint cycle (2 weeks) between deprecation and retirement.
5. On or after `sunset_date`, the version transitions to `retired` and is excluded from discovery.

## Protocol Support

The Tool Registry supports five protocols. Every registered tool MUST declare which protocols it implements.

### Protocol Matrix

| Protocol | Use Case | Transport | Schema Format | Governance Tier |
|---|---|---|---|---|
| **MCP** (Model Context Protocol) | AI agent tool discovery and execution | JSON-RPC 2.0 over stdio/SSE/Streamable HTTP | JSON Schema | Tier 1 — Mandatory for all tools |
| **REST / OpenAPI 3.1** | Platform service CRUD, admin endpoints, public APIs | HTTP/1.1, HTTP/2 | OpenAPI 3.1 YAML/JSON | Tier 1 — Mandatory for all platform services |
| **gRPC** | High-performance internal service-to-service calls | HTTP/2, Protocol Buffers | Proto3 | Tier 2 — Optional, for latency-critical paths |
| **WebSockets** | Real-time events, task status streaming, health monitoring | WS/WSS | JSON Message Schema | Tier 1 — Mandatory for event streams |
| **GraphQL** | Complex cross-domain data queries, dashboard aggregation | HTTP/1.1 | GraphQL SDL | Tier 2 — Optional, for query-heavy domains |

### Protocol Governance Tiers

| Tier | Requirement | Enforcement |
|---|---|---|
| **Tier 1 — Mandatory** | All services/tools at this layer MUST implement the protocol | Blocked at registry registration if missing |
| **Tier 2 — Optional** | Services/tools MAY implement if their use case warrants | Validated if declared; omitted if not |
| **Tier 3 — Deprecated** | Protocol on deprecation path, no new consumers | Registered tools flagged, migration timeline enforced |

### MCP Tool Contract

All tools registered with protocol `mcp` MUST implement:

1. **JSON-RPC 2.0 Methods:**
   - `tools/list` — Return tool capabilities
   - `tools/call` — Execute tool with given arguments
   - `resources/list` — Available resources (optional)
   - `resources/read` — Read a specific resource (optional)

2. **Tool Manifest:**
   ```json
   {
     "name": "tool-name",
     "version": "1.0.0",
     "description": "...",
     "inputSchema": { /* JSON Schema */ },
     "outputSchema": { /* JSON Schema */ },
     "annotations": {
       "destructive": false,
       "idempotent": true,
       "readOnly": false,
       "estimatedCost": "low" | "medium" | "high",
       "requiresApproval": false
     }
   }
   ```

3. **Transport Options:** stdio (local/same-host), SSE (streaming), Streamable HTTP (remote).

4. **Invocation via Platform Proxy:**
   ```
   POST /api/v1/mcp/{tool_id}/invoke
     Request:  { method, arguments, session_id, trace_id }
     Response: { content: [{ type, text?, data?, mimeType? }], isError }
     Stream:   event: progress { percent, message }
               event: result   { content[], isError }
   ```

### REST Tool Contract

Tools registered with protocol `rest` MUST expose:

1. **OpenAPI 3.1 Spec** at `/openapi.json`
2. **Invocation via Platform Proxy:**
   ```
   POST /api/v1/tools/{tool_id}/invoke
     Request:  { method, path, headers?, query?, body?, trace_id }
     Response: { status, headers, body }
   ```

## Worker-Tool Interaction Model

```
Worker  →  1. DISCOVER tools (filtered by permission)
       →  2. RESOLVE tool schema + endpoint
       →  3. GOVERNANCE permission check per invocation
       →  4. INVOKE tool via platform proxy (if allowed)
       →  5. LOG audit for every invocation
```

- Workers declare desired tool capabilities at startup via `POST /api/v1/workers/{id}/capabilities`.
- The registry grants access with a TTL (default 1 hour). Workers MUST refresh before expiry.
- Failed refresh → tool access revoked immediately.
- All tool invocations MUST flow through the platform proxy. Workers never call tool providers directly (GATE-INT-06).

## Implementation Guidance

### What to build

1. **Tool Catalog (PostgreSQL-backed):** Stores the canonical tool index with full version history (JSONB column for versions array). Must support filtered queries (by category, protocol, governance tier, tags, status) with cursor-based pagination. Must enforce uniqueness on tool name.

2. **Tool Resolver:** Resolves a tool name to its full detail including the latest active version. Must return version history, schema, endpoint, and rate limits. Must validate that the requested version is not retired.

3. **Registration Service:** Idempotent registration (POST with tool_id as idempotency key). Validates protocol declarations against required tier (rejects if Tier 1 protocol is missing). Validates JSON Schema syntax for input/output schemas. Validates semver format for all version entries.

4. **Discovery Service with Permission Filtering:** Filters discovery results by the caller's governance tier (extracted from JWT scope). Caches filtered results in Redis with short TTL (10s) and event-driven invalidation. Supports multi-filter queries (category, protocol, tags, status).

5. **Heartbeat Monitor:** Background service that tracks the last heartbeat timestamp for every registered tool. Tools that fail to heartbeat within the grace period (default 90s) are automatically marked `degraded`. Tools degraded for >1 hour without heartbeat are candidates for auto-retirement (admin-configurable).

6. **Version Manager:** Supports version history queries, semver comparison (for worker min_version checks), and deprecation workflow. Deprecated versions must include `reason`, `migration_url`, and `sunset_date`. Auto-transition to `retired` on or after sunset_date.

7. **MCP Proxy:** Accepts worker invocations at `/api/v1/mcp/{tool_id}/invoke`, validates governance permissions, forwards the JSON-RPC call to the tool provider's MCP endpoint, and returns the response. Supports both synchronous and SSE-streaming response modes. Logs every invocation to the audit log.

8. **REST Proxy:** Accepts worker invocations at `/api/v1/tools/{tool_id}/invoke`, validates governance permissions, validates input against the tool's declared JSON Schema, forwards the HTTP request to the tool provider, and returns the response. Logs every invocation to the audit log.

9. **Schema Service:** Exposes tool input/output schemas as JSON Schema documents for code generation and client-side validation. Must serve the schema for any non-retired version.

### Key design constraints

- **Registry is the sole discovery mechanism (GATE-INT-05).** No hardcoded tool endpoints anywhere in the platform. If a tool is not registered, it does not exist.
- **Workers never call tools directly (GATE-INT-06).** All invocations flow through the platform proxy, which enforces governance checks and logs every call.
- **Tool registration is idempotent.** Re-registration with the same `tool_id` updates the tool's metadata and version history.
- **Governance tiers are enforced at discovery, not at invocation.** Tools above the caller's tier are excluded from discovery results. At invocation time, an additional check validates that the tool has not been restricted since discovery.
- **Heartbeat is mandatory.** Tools that do not heartbeat are automatically degraded. Tools that remain degraded are candidates for retirement.
- **Deprecated tools remain indexed but excluded from default discovery.** Consumers must explicitly query for deprecated tools.
- **Retired tools are never fully deleted** — they remain in the audit log and tool history for provenance.

### Integration points

- **Governance PDP** must authorize every registration, discovery (filtering by tier), and invocation. The registry calls `/api/v1/governance/permissions/check` for each invocation.
- **Worker Runtime** calls `POST /api/v1/workers/{id}/capabilities` at worker startup. The registry validates and grants tool access with TTL.
- **Audit Log** receives a log entry for every tool invocation, including: tool_id, worker_id, input hash, output hash, duration, exit code, and cost.
- **Observability:** Prometheus metrics for `tool_invocations_total{tool, status}`, `registry_discovery_queries_total`, `tool_heartbeats_total`, `registry_cache_hit_ratio`.
- **Provider endpoints** must expose their declared protocol(s) at the endpoint specified in registration. The registry does not proxy health checks — heartbeat is a separate POST to the registry directly.

## Concepts

- **Tool Catalog:** The authoritative, PostgreSQL-backed index of all registered tools with full version history.
- **Governance Tier:** Access classification for tools: `open` (any worker), `restricted` (approved workers only), `admin_only` (platform administrators). Enforced at discovery and invocation.
- **Heartbeat:** A periodic POST from a tool provider (every 30s) confirming liveness. Missing heartbeats cause automatic degradation.
- **Platform Proxy:** The intermediary layer that all tool invocations pass through, enforcing governance checks, schema validation, and audit logging.
- **Tool Sandboxing:** Runtime isolation enforced at the Worker Runtime layer, not the registry. The registry declares what permission level a tool requires; the runtime enforces it.

## Navigation

- **Up:** [app/docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [app/memory/README.md](../memory/README.md), [app/worker-runtime/README.md](../worker-runtime/README.md), [app/governance/README.md](../governance/README.md), [app/planning/README.md](../planning/README.md)
- **Architecture contracts:** See [docs/ARCHITECTURE.md §6.4](../docs/ARCHITECTURE.md) for integration model
