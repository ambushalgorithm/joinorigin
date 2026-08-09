# Governance Framework

> **Parent:** [ARCHITECTURE.md](ARCHITECTURE.md) — platform layer model and component map

## Purpose

Defines the governance framework for the Universal Worker Platform (UWP). Covers Role-Based Access Control (RBAC), approval gates, audit logging, resource and cost limits, and the enforcement architecture (PAP/PDP/PEP/PIP). Governance is centralized in the Worker Platform layer and enforced independently at every platform boundary.

This document implements the contracts defined in `arch-uwp-governance-model` (TASK-005) and references the architecture contracts in `arch-uwp-topology` (TASK-001).

---

## 1. Governance Principles

| Principle | Description |
|---|---|
| **Governance Is Mandatory** | Every autonomous action in the UWP must be observable, auditable, reproducible, and governed. No subsystem operates without governance controls. |
| **Zero Trust** | No actor (worker, user, service) is trusted implicitly. Every action requires explicit authorization at every platform layer. |
| **Least Privilege** | Actors receive only the minimum permissions necessary to complete their assigned task. Permissions are scoped to task duration. |
| **Defense in Depth** | Governance is enforced independently at every platform layer — Gateway, Orchestrator, Worker Runtime, Memory, Tool Registry, Infrastructure. |
| **Immutable Audit** | All governance decisions, permission grants, and action logs are append-only and immutable once written. |
| **Deny by Default** | If no explicit `allow` exists for an action, the action is denied. Default posture is deny-all. |
| **Explicit Deny Overrides Allow** | A `deny` at any scope overrides all `allow` grants at narrower scopes. |

---

## 2. Role-Based Access Control (RBAC)

### 2.1 Role Definitions

| Role | Scope | Capabilities |
|---|---|---|
| **`admin`** | Global | Full platform administration. Create/update/deprecate policies. Assign roles. Manage tenants. Override any governance decision. Access all audit logs. |
| **`operator`** | Tenant | Worker lifecycle management. Resource allocation. Monitoring and incident response. Approve high-cost or high-risk actions. Approve secret access. Manage quotas. |
| **`developer`** | Project | Worker registration. Task submission. Tool binding. Context management. Approve new worker registrations. Manage project conventions. |
| **`auditor`** | Global (read-only) | Audit log access. Compliance reporting. Policy review. Security posture assessment. No write or execute permissions. |
| **`worker`** | Task-scoped | Execute assigned task. Access granted tools. Read task-scoped memory. Write task artifacts. Update task status. Permissions expire on task completion. |
| **`service`** | Component | Inter-service API calls. Event publishing. Health reporting. Registration and discovery queries. No task execution capability. |

### 2.2 Permission Structure

```
Permission = {
  principal:     "<actor-id>"
  action:        "<verb>"            — read | write | execute | administer | approve
  resource:      "<urn>"             — urn:uwp:{tenant}:{project}:{resource-type}:{resource-id}
  scope:         "<scope>"          — global | tenant | project | workspace | task
  constraints:   { ... }            — time-window, ip-range, cost-limit, mfa-required
  grant:         "allow" | "deny"
}
```

### 2.3 Resource URN Schema

```
urn:uwp:{tenant}:{project}:{resource-type}:{resource-id}
```

| Resource Type | Example |
|---|---|
| `task` | `urn:uwp:acme:project-x:task:task-789` |
| `context` | `urn:uwp:acme:project-x:context:session-abc` |
| `worker` | `urn:uwp:acme:project-x:worker:worker-abc123` |
| `tool` | `urn:uwp:acme:project-x:tool:github-api` |
| `secret` | `urn:uwp:acme:secret:github-token` |
| `artifact` | `urn:uwp:acme:project-x:artifact:artifact-001` |
| `policy` | `urn:uwp:acme:policy:pol-auto-toolset-v1` |
| `infra` | `urn:uwp:acme:project-x:infra:workspace:ws-001` |

### 2.4 Permission Inheritance

- **Deny-by-Default**: No explicit `allow` → action denied.
- **Explicit Deny Overrides Allow**: A `deny` at any scope overrides all `allow` grants at narrower scopes.
- **Scope Hierarchy**: `global > tenant > project > workspace > task`. Broader-scope permissions propagate to narrower scopes unless explicitly denied.
- **Task-Scoped Duration**: Worker permissions are granted only for the duration of the assigned task. Revoked on task completion, failure, or timeout.

### 2.5 Policy Evaluation Order

```
1. Explicit DENY at any scope     → DENY (stop, override everything)
2. Explicit ALLOW at any scope    → ALLOW (if no matching deny)
3. Role-based ALLOW               → ALLOW (if role includes permission)
4. Default DENY                   → DENY (fallback)
```

---

## 3. Approval Framework

### 3.1 Approval Triggers

| Trigger | Threshold | Approver | MFA Required |
|---|---|---|---|
| **Cost threshold** | Estimated task cost > project budget × 0.1 | `operator` | No |
| **High-risk tool access** | Worker requests `execute-shell`, `network-egress`, `secret-access` | `operator` | Yes |
| **Resource scale-up** | Worker requests > 2× default quota | `operator` | No |
| **New worker registration** | First deployment of new worker type in project | `developer` + `operator` | Yes |
| **Secret access** | Worker requests read access to any named secret | `operator` | Yes |
| **Cross-tenant access** | Action crosses tenant boundary | `admin` | Yes |
| **Policy change** | Create, update, or deprecate any governance policy | `admin` | Yes |
| **Role assignment** | Granting `admin` or `operator` role | `admin` | Yes |

### 3.2 Approval Lifecycle

```
REQUEST → PENDING APPROVAL → APPROVED → EXECUTED
                │
                ├→ DENIED (terminal, audit-logged)
                │
                └→ EXPIRED (timeout 24h, auto-denied)
```

### 3.3 Approval Decision Logic

```
evaluate_approval(request):
  1. Check explicit deny → if yes: DENY immediately
  2. Check auto-approval policy → if matches: APPROVE (log reason)
  3. Check approval thresholds → if below all thresholds: APPROVE
  4. Otherwise → PENDING: route to designated approver(s)
  5. If pending > 24h → EXPIRED (auto-deny)
```

### 3.4 Auto-Approval Policy

Actions matching ALL of these criteria are auto-approved:

1. Task cost < project budget × 0.01 (1%)
2. Worker uses only pre-approved tool set (no high-risk tools)
3. Resource request within default quota
4. Action within same tenant and project scope
5. Worker has successfully completed > 10 tasks in the project (trust gradient)

### 3.5 Approval API

```
POST   /governance/v1/approve                        — Submit approval request
PUT    /governance/v1/approvals/{id}/approve          — Approver approves
PUT    /governance/v1/approvals/{id}/deny             — Approver denies
GET    /governance/v1/approvals/{id}                  — Get approval status
GET    /governance/v1/approvals?status=pending         — List pending approvals
```

---

## 4. Audit Logging

### 4.1 Mandatory Audit Events

| Event Category | Required Fields | Retention |
|---|---|---|
| **AuthN** (authentication) | actor, method, ip, success/fail, timestamp | 7 years |
| **AuthZ** (authorization) | actor, action, resource, decision, policy-id, timestamp | 7 years |
| **Approval** | request-id, approver, decision, rationale, timestamp | 7 years |
| **Task Lifecycle** | task-id, worker-id, status transitions, timestamps | 3 years |
| **Resource** | resource-type, action (allocate/release), quantity, cost, timestamp | 3 years |
| **Secret Access** | actor, secret-ref (name only, never value), action, timestamp | 7 years |
| **Tool Invocation** | actor, tool-name, input-hash, output-hash, duration, exit-code, timestamp | 3 years |
| **Policy Change** | policy-id, change-type, old-hash, new-hash, actor, timestamp | Permanent |
| **Configuration** | component, key, old-hash, new-hash, actor, timestamp | 3 years |

### 4.2 Audit Log Entry Schema

```json
{
  "log_id": "uuid-v7",
  "timestamp": "2026-06-19T12:00:00.000Z",
  "event_category": "AuthZ",
  "actor": {
    "id": "worker-abc123",
    "type": "worker",
    "session_id": "sess-xyz789"
  },
  "action": "tool:invoke",
  "resource": {
    "urn": "urn:uwp:acme:project-x:tool:github-api",
    "type": "tool"
  },
  "request": {
    "id": "req-456",
    "parameters_hash": "sha256:abc123..."
  },
  "decision": {
    "result": "allow",
    "policy_id": "pol-auto-toolset-v1",
    "reason": "Tool in pre-approved toolset"
  },
  "execution": {
    "duration_ms": 1234,
    "exit_code": 0,
    "cost": { "currency": "USD", "amount": 0.0002 }
  },
  "trace": {
    "trace_id": "trace-789",
    "span_id": "span-012",
    "parent_span_id": "span-345"
  },
  "immutable": true,
  "signature": "ed25519:sig-data..."
}
```

### 4.3 Audit Log Requirements

- **Immutability**: Append-only storage. No modifications or deletions.
- **Structured**: JSON format with validated schema.
- **Tamper-Evident**: Ed25519 cryptographic hash chain linking entries.
- **Queryable**: By time range, actor, action, resource-urn, event-category, trace-id.
- **Exportable**: To external SIEM via streaming (Kafka) or batch (S3 export, JSON Lines).
- **Retention**: Enforced per event category with auto-archive to cold storage.

### 4.4 Archive Architecture

```
Workers → Governance API → Audit Writer → Hot Store (90d, low-latency)
                                               │
                                               ▼
                                        Cold Archive (S3/Blob, 7yr)
```

### 4.5 Audit Log Query API

```
GET /governance/v1/audit
  ?start_time=<ISO-8601>
  &end_time=<ISO-8601>
  &actor_id=<string>
  &action=<string>
  &resource_urn=<string>
  &event_category=<string>
  &trace_id=<string>
  &limit=<int, default 100>
  &cursor=<opaque-cursor>
```

---

## 5. Resource Limits

### 5.1 Resource Quota Model

| Resource | Default Per-Task | Hard Maximum | Enforcement Layer |
|---|---|---|---|
| **CPU** | 1 vCPU | 4 vCPU | cgroups v2 |
| **Memory** | 512 MB | 4 GB | cgroups v2 |
| **Storage (scratch)** | 1 GB | 10 GB | Filesystem quotas |
| **Network egress** | 100 MB | 1 GB | eBPF / iptables |
| **Execution time** | 300s (5 min) | 3600s (1 hr) | Orchestrator (SIGALRM → SIGKILL) |
| **Tool invocations** | 50 | 500 | Governance API counter |
| **Concurrent tasks** | 1 | 10 (per worker) | Orchestrator semaphore |
| **API rate** | 10 req/s | 100 req/s | Gateway token bucket |

### 5.2 Quota Check API

```
POST /governance/v1/limits/check

Request:
{
  "task_id": "task-789",
  "worker_id": "worker-abc123",
  "resources": {
    "cpu_cores": 2, "memory_mb": 1024,
    "storage_gb": 5, "timeout_seconds": 600
  }
}

Response (200 — within limits):
{ "within_limits": true, "allocated": {...}, "remaining_quota": {...} }

Response (422 — exceeded):
{ "within_limits": false, "violations": [...] }
```

### 5.3 Quota Escalation

| Event | Action |
|---|---|
| Exceeds soft limit | Warning logged; task continues |
| Exceeds hard limit | Task terminated; `resource:exceeded` audit |
| 3+ exceedances in 60-min window | Worker flagged; auto-quota reduction (50%) |
| Flagged 2+ times | Worker suspended pending admin review |

---

## 6. Cost Limits

### 6.1 Budget Model

| Scope | Budget Type | Enforced By |
|---|---|---|
| **Tenant** | Monthly hard cap | Governance API |
| **Project** | Monthly soft cap | Governance API |
| **Task** | Per-task estimate | Orchestrator (pre-flight) |

### 6.2 Cost Enforcement

| Stage | Check | Action |
|---|---|---|
| **Pre-flight** | `estimated_cost > remaining_budget`? | REJECT task |
| **In-flight** | `running_cost > task_budget × 1.5`? | SOFT-TERMINATE (SIGTERM, 30s grace) |
| **Post-flight** | Actual cost deducted; over-budget flagged | Report generated; cost optimization review |

### 6.3 Cost Calculation

```
TaskCost = CPU_time_cost + Memory_time_cost + Tool_invocation_cost + Network_egress_cost
```

Default rates (configurable per tenant):
- CPU: $0.00001/vCPU-second
- Memory: $0.000005/MB-second
- Tool invocation: tool-defined (default: $0.0001/call)
- Network egress: $0.01/GB

### 6.4 Cost Check API

```
POST /governance/v1/costs/check

Request:
{
  "task_id": "task-789",
  "project_id": "project-x",
  "estimated_cost": { "amount": 1.50, "currency": "USD" }
}

Response:
{
  "within_budget": false,
  "estimated_cost": { "amount": 1.50, "currency": "USD" },
  "project_remaining_budget": { "amount": 0.75, "currency": "USD" },
  "requires_approval": true,
  "reason": "Estimated cost exceeds remaining project budget"
}
```

---

## 7. Enforcement Architecture (PAP/PDP/PEP/PIP)

### 7.1 Component Definitions

| Component | Full Name | Responsibility |
|---|---|---|
| **PAP** | Policy Administration Point | Create, update, version, deprecate governance policies |
| **PDP** | Policy Decision Point | Evaluate policies; return allow/deny/pending_approval |
| **PEP** | Policy Enforcement Point | Intercept actions, call PDP, enforce result |
| **PIP** | Policy Information Point | Provide context to PDP (actor attributes, resource state) |

### 7.2 Enforcement Flow

```
Actor → PEP (intercept) → PDP (evaluate) → PIP (fetch context)
                                              │
                                              ▼
                                    Decision: allow | deny | pending
                                              │
                            ┌─────────────────┼─────────────────┐
                            ▼                 ▼                  ▼
                          DENY              ALLOW            PENDING
                        (reject +         (execute +        (queue for
                         audit log)        audit log)        approval)
```

### 7.3 Per-Layer PEPs

| Platform Layer | PEP Implementation |
|---|---|
| **Gateway** | API middleware: JWT/OAuth validation, rate limits, IP allowlist |
| **Orchestrator** | Pre-task checks: permission, quota, cost estimate, approval gates |
| **Worker Runtime** | Container sandbox: cgroups, seccomp, network policy, capability drop |
| **Memory** | Context access guard: read/write only for owning task's scope |
| **Tool Registry** | Tool invocation guard: allowed-toolset check, rate limit, audit log |
| **Infrastructure** | Network policy, filesystem read-only, process isolation |

### 7.4 Policy Definition Format (YAML)

```yaml
policy:
  id: "pol-auto-toolset-v1"
  version: 1
  description: "Auto-approve tool invocations within pre-approved toolset"
  effect: "allow"
  conditions:
    - field: "action"
      operator: "equals"
      value: "tool:invoke"
    - field: "resource.urn"
      operator: "matches"
      value: "urn:uwp:*:*:tool:*"
    - field: "context.tool_in_preapproved_set"
      operator: "equals"
      value: true
  priority: 100
  immutable: false
```

### 7.5 Policy Management API

```
GET    /governance/v1/policies                     — List all policies
POST   /governance/v1/policies                     — Create policy (admin only)
PUT    /governance/v1/policies/{policy_id}         — Update policy (admin only)
DELETE /governance/v1/policies/{policy_id}         — Deprecate policy (never delete)
GET    /governance/v1/policies/{policy_id}/versions — List policy versions
```

---

## 8. Governance API Contract

**Base:** `https://{gateway}/governance/v1`
**Auth:** `Bearer <token>` (OAuth 2.0 / OIDC JWT)

### 8.1 Authorization Check

```
POST /governance/v1/check

Request:
{
  "actor_id": "worker-abc123",
  "actor_type": "worker",
  "action": "tool:invoke",
  "resource_urn": "urn:uwp:acme:project-x:tool:github-api",
  "context": {
    "task_id": "task-789",
    "project_id": "project-x",
    "tenant_id": "acme",
    "estimated_cost": { "amount": 0.0002, "currency": "USD" }
  }
}

Response (200 — Allowed):
{ "request_id": "...", "decision": "allow", "reason": "...",
  "policy_id": "...", "permissions_granted": [...], "constraints": {...} }

Response (200 — Pending):
{ "request_id": "...", "decision": "pending_approval", "reason": "...",
  "approval_id": "...", "approvers_required": [...], "approval_timeout": "..." }

Response (403 — Denied):
{ "request_id": "...", "decision": "deny", "reason": "...", "policy_id": "..." }
```

### 8.2 Secret Access Request

```
POST /governance/v1/secrets/access

Request:
{
  "task_id": "task-789",
  "worker_id": "worker-abc123",
  "secret_urn": "urn:uwp:acme:secret:github-token",
  "access_type": "read",
  "justification": "Required to push artifacts to repository"
}

Response:
{
  "granted": true,
  "credential": {
    "type": "vault:wrapped-token",
    "token": "hvs.CAESI...",
    "ttl_seconds": 300,
    "renewable": false
  }
}
```

---

## 9. Cross-Cutting Governance Checklist

Every action flowing through the platform must pass ALL applicable checks at each layer:

| # | Layer | Check | On Failure |
|---|---|---|---|
| 1 | Gateway | AuthN — valid token? | 401 |
| 2 | Gateway | Rate Limit — within limits? | 429 |
| 3 | Gateway | TLS — minimum version 1.3? | Connection refused |
| 4 | Orchestrator | AuthZ — permission exists? | 403 |
| 5 | Orchestrator | Resource Quota — within limits? | 422 |
| 6 | Orchestrator | Cost Estimate — within budget? | 422 or pending |
| 7 | Orchestrator | Approval Gate — approved? | 202 pending |
| 8 | Worker Runtime | cgroups applied? | Container blocked |
| 9 | Worker Runtime | Seccomp enforced? | Container blocked |
| 10 | Worker Runtime | Image signature verified? | Pull rejected |
| 11 | Memory | Task owns this context? | 403 |
| 12 | Tool Registry | Tool in allowed set? | 403 |
| 13 | Infrastructure | Egress allowed? | Connection dropped |

---

## 10. Governance Contract Compliance

Any implementation claiming to implement this governance model MUST:

1. Reject all actions not explicitly allowed (deny-by-default)
2. Log every authorization decision to the audit log
3. Enforce resource limits at the earliest possible layer
4. Never store or log secret values (only URNs)
5. Support the full Governance API contract
6. Maintain an append-only, tamper-evident audit log
7. Enforce container sandbox isolation
8. Verify container image signatures before execution
9. Enforce MFA for secret access, policy changes, and role assignments
10. Support PAP/PDP/PEP/PIP enforcement architecture

---

## Navigation

- **Up:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Related:** [SECURITY.md](SECURITY.md) — authentication, secrets, sandbox, defense-in-depth
- **Related:** [WORKER_GUIDE.md](WORKER_GUIDE.md) — worker lifecycle, workspace isolation
- **Related:** [DEVELOPMENT.md](DEVELOPMENT.md) — contribution workflow and quality gates
