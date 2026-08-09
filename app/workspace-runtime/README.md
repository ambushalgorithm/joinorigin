# Workspace Runtime

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical platform architecture overview

## Purpose

The Workspace Runtime manages isolated execution environments (workspaces) where workers operate on tasks. It provisions environments on demand, binds them to workers, enforces resource limits and isolation guarantees, presents a standardized filesystem layout to workers, extracts produced artifacts during teardown, and cleans up all resources when tasks terminate. Every workspace is ephemeral — only artifacts persist. It is the sandbox manager for the Worker Platform layer (Layer 5).

## Directory Map

| Path | Purpose |
|------|---------|
| `src/` | Workspace Runtime implementation source code |
| `tests/` | Unit and integration tests for the runtime |
| `index.ts` | Public API barrel export (entrypoint) |
| `README.md` | This file — self-documenting component guide |

## Contracts

### Implements

- **Workspace Provisoner**: Accepts workspace requests (type, config, resource limits), creates the environment via the appropriate backend, verifies health, returns workspace credentials (see [arch-uwp-worker-contract §6.7](#)).
- **Workspace Lifecycle Manager**: Manages the workspace state machine: `PROVISIONING` → `READY` → `ACTIVE` → `DRAINING` → `TERMINATED` (or `FAILED`). Enforces lifecycle transitions.
- **Isolation Enforcer**: Guarantees process isolation, filesystem isolation, network isolation, resource isolation, credential isolation per workspace. No workspace accesses another workspace's resources (see [arch-uwp-worker-contract §6.8](#)).
- **Artifact Extractor**: During DRAINING, scans `/workspace/artifacts/` for declared artifacts, extracts content to ArtifactMemory, then destroys the workspace (see [arch-uwp-worker-contract §6.6, §6.9](#)).
- **Orphan Reaper**: Runs every 60s to identify and destroy workspaces belonging to gone/crashed workers or with expired lifetimes.

### Depends On

- **[Worker Runtime](../worker-runtime/README.md)**: Requests workspace provisioning at the appropriate point in the task lifecycle, receives workspace credentials, binds worker to workspace.
- **[Governance Services](../governance/README.md)**: Resource quota enforcement (CPU, memory, disk, network), cost limits, approval gates for above-default resource requests.
- **[Context Contract](../contracts/README.md)**: Artifact extraction during DRAINING writes to ArtifactMemory through the Context Contract.
- **Container/VM Backends**: Docker Engine, Kubernetes, AWS ECS, AWS Fargate, Google Cloud Run, hypervisors (KVM, Firecracker) — depending on the workspace type requested.
- **[Infrastructure Layer](../infra/README.md)**: Container runtimes, networking, volume management.

### Exposes

- **Workspace Provisioning API**: `POST /api/v1/workspaces` — request a new workspace for a task
- **Workspace Status API**: `GET /api/v1/workspaces/{id}` — query provisioning state and health
- **Workspace Teardown API**: `DELETE /api/v1/workspaces/{id}` — manually trigger DRAINING → TERMINATED
- **Workspace Bind API**: `POST /api/v1/workspaces/{id}/bind` — bind a worker to a ready workspace
- **Health Check Endpoints**: `/health`, `/ready`, `/metrics` — standard platform observability

## Concepts

- **Workspace**: A single-task, single-worker, fully isolated execution environment. One workspace per task (1:1 binding). Ephemeral — destroyed on task completion and never reused. Contains a standardized filesystem at `/workspace` with `source/`, `artifacts/`, `deps/`, and `tmp/` directories (see [arch-uwp-worker-contract §6.1, §6.6](#)).

- **Workspace Type**: The runtime backend that hosts the workspace. Eight types are supported: `docker-container`, `docker-compose`, `remote-docker-host`, `vm`, `kubernetes-pod`, `ecs-task`, `fargate-task`, `cloud-run`. Each type provides different isolation boundaries and is suited for different use cases (see [arch-uwp-worker-contract §6.3](#)).

- **Workspace Lifecycle**: `PROVISIONING` (environment being created) → `READY` (provisioned, healthy, unbound) → `ACTIVE` (worker executing inside) → `DRAINING` (worker finished, extracting artifacts, releasing resources) → `TERMINATED` (all resources freed, destroyed). `FAILED` is a terminal state for provisioning or operational failures (see [arch-uwp-worker-contract §6.2](#)).

- **Isolation Guarantees**: Seven mandatory guarantees per workspace: process isolation (no cross-workspace process access), filesystem isolation (no cross-workspace filesystem access except declared mounts), network isolation (no inter-workspace communication without explicit policy), resource isolation (CPU/memory/disk/network limits enforced per workspace), credential isolation (no platform credentials or auth tokens in workspace filesystems — env vars only), artifact extraction (only `/workspace/artifacts/` content persists), and audit logging (all lifecycle events recorded) (see [arch-uwp-worker-contract §6.8](#)).

- **Workspace Filesystem Contract**: Every workspace MUST present a standardized filesystem at `/workspace` with: `/workspace/source/` (read-only, relevant source code), `/workspace/artifacts/` (read/write, output directory extracted during DRAINING), `/workspace/deps/` (read-only, runtime dependencies), `/workspace/tmp/` (read/write, ephemeral scratch cleared on termination). Workers MUST NOT write outside `artifacts/` and `tmp/` (see [arch-uwp-worker-contract §6.6](#)).

- **Resource Limits**: Configurable per workspace: CPU (default 2.0 cores, max 16.0), memory (default 2048 MB, max 65536 MB), disk (default 10240 MB, max 102400 MB), network egress (default 100 Mbps, max 1000 Mbps), max runtime (default 3600s, max 86400s), max idle (default 900s, max 3600s). Defaults are configurable per tenant/project via governance policy (see [arch-uwp-worker-contract §6.5](#)).

- **Workspace Teardown Guarantee**: Every terminal task state (COMPLETED, FAILED, CANCELLED) MUST trigger workspace teardown. Teardown sequence: extract artifacts → destroy workspace → release resources → mark TERMINATED. An orphan workspace reaper runs every 60s to catch workspaces from crashed/disconnected workers. This guarantee is non-negotiable (see [arch-uwp-worker-contract §6.9, Constraint N3](#)).

## Supported Workspace Environments

### 1. Docker Container (`docker-container`)

**Runtime:** Docker Engine  
**Isolation Boundary:** Container (Linux namespaces, cgroups v2)  
**Use Case:** Local development, single-machine CI, reference implementation  

The Docker container workspace type is the primary environment for the reference implementation. Each task gets a dedicated container with the specified image, resource limits enforced via cgroups, and network isolation via bridge networking. Containers are created on-demand and destroyed on task completion.

**Key characteristics:**
- Fastest provisioning (typically < 10s, timeout: 120s)
- Namespace-based isolation (not full VM isolation — suitable for trusted workloads)
- Security: read-only root filesystem (tmpfs for scratch), seccomp + AppArmor/SELinux profiles, drop all capabilities, no privileged mode, no host network access
- Filesystem: overlay volumes per workspace; no persistence between invocations
- Image integrity: signed images (Cosign/Notary), digest verification before pull
- Best for: trusted code execution, build pipelines, code review, documentation generation

### 2. Docker Compose (`docker-compose`)

**Runtime:** Docker Compose (multi-container orchestration on a single host)  
**Isolation Boundary:** Multi-container with shared internal network, cgroups per container  
**Use Case:** Multi-service applications, integration tests requiring databases/caches  

Each workspace is a complete Docker Compose stack with multiple containers sharing an internal network. Workers can spin up databases, caches, and dependent services alongside their primary execution container.

**Key characteristics:**
- Provisioning timeout: 180s (multi-container startup)
- Containers within the compose stack can communicate internally but are isolated from other workspaces
- Ideal for integration tests that need PostgreSQL, Redis, or other Platform Services running locally
- Resource limits apply to the aggregate of all containers in the stack
- All containers in the stack are torn down together on task completion

### 3. Remote Docker Host (`remote-docker-host`)

**Runtime:** Remote Docker Engine (TLS-authenticated connection)  
**Isolation Boundary:** Host-level (dedicated build machine)  
**Use Case:** Offloading heavy builds to dedicated machines, isolating untrusted but non-VM workloads  

Workspaces are provisioned on a remote Docker host accessed over mutually-authenticated TLS. This keeps the platform host clean and allows scaling build capacity independently.

**Key characteristics:**
- Connection over TLS 1.3 with client certificate authentication
- Remote host can be a dedicated physical machine or cloud VM
- Host-level isolation — no container escape risk to the platform machine
- Provisioning depends on remote host availability; timeout: 120s
- Best for: CPU/memory-intensive builds, workloads requiring specialized hardware (GPU), isolating build from runtime

### 4. Virtual Machine (`vm`)

**Runtime:** Hypervisor (KVM, Firecracker)  
**Isolation Boundary:** Full VM (hardware virtualization)  
**Use Case:** Untrusted code execution, kernel-level work, maximum security isolation  

Each workspace is a full virtual machine with its own kernel, providing the strongest isolation boundary available. Use this type when executing code that requires kernel access or when running untrusted workloads that demand hardware-level isolation.

**Key characteristics:**
- Slowest provisioning (timeout: 300s)
- Full VM isolation — no shared kernel with host
- MicroVM support via Firecracker for faster cold starts (< 125ms)
- Guest image must be pre-built and signed
- Best for: executing arbitrary user-submitted code, kernel module testing, security research, malware analysis

### 5. Kubernetes Pod (`kubernetes-pod`)

**Runtime:** Kubernetes (pod-based scheduling)  
**Isolation Boundary:** Pod (Linux namespaces, cgroups, NetworkPolicy)  
**Use Case:** Production CI/CD, multi-tenant platforms, enterprise deployments  

Workspaces are provisioned as Kubernetes pods in a dedicated namespace. Each task runs in its own pod with network policies, resource quotas, and pod security standards enforced.

**Key characteristics:**
- Requires a running Kubernetes cluster (GKE, EKS, AKS, or on-prem)
- Pod scheduling handled by the cluster scheduler; resource requests/limits set per pod
- Network isolation via NetworkPolicy (default deny, explicit allowlist for egress)
- Persistent volumes can be mounted for cache/dependency sharing (read-only)
- Pod Security Standards: `restricted` profile (no privilege escalation, non-root user, seccomp, read-only root filesystem)
- Image pull policy: Always (with digest pinning for reproducibility)
- Best for: production-grade multi-tenant worker platforms, scaling workloads across nodes, organizations already running Kubernetes

### 6. ECS Task (`ecs-task`)

**Runtime:** AWS ECS (Elastic Container Service)  
**Isolation Boundary:** Task-level (awsvpc network mode, per-task ENI)  
**Use Case:** AWS-native workloads, organizations in the AWS ecosystem  

Each workspace provisioned as an ECS task with its own Elastic Network Interface (ENI) in `awsvpc` mode, providing task-level network isolation. Integrates natively with AWS security groups, IAM roles, and CloudWatch.

**Key characteristics:**
- Requires AWS infrastructure: ECS cluster, VPC, subnets, security groups
- awsvpc network mode — each task gets its own ENI with dedicated security group
- IAM task roles for fine-grained AWS service access
- Logs stream to CloudWatch Logs
- Auto-scaling integration via ECS Service Auto Scaling
- Best for: AWS-native organizations, workloads needing AWS service integration (S3, DynamoDB, SQS), compliance regimes requiring VPC isolation

### 7. Fargate Task (`fargate-task`)

**Runtime:** AWS Fargate (serverless container platform)  
**Isolation Boundary:** Serverless container (Firecracker microVM per task)  
**Use Case:** Serverless execution, no cluster management, pay-per-use  

Workspaces run as Fargate tasks — serverless containers without managing the underlying EC2 instances. Each Fargate task runs on its own Firecracker microVM, providing hardware-level isolation between tasks.

**Key characteristics:**
- No cluster to manage — Fargate handles infrastructure
- Firecracker microVM isolation (stronger than namespace-only)
- Billed per vCPU-second and GB-second of memory used
- Cold start: typically 30-60s for container startup
- AWS VPC networking with ENI per task (like ECS)
- Maximum task size: 16 vCPU / 120 GB memory / 20 GB ephemeral storage
- Best for: variable workloads, cost-sensitive environments, teams that don't want to manage clusters

### 8. Cloud Run (`cloud-run`)

**Runtime:** Google Cloud Run (serverless container platform)  
**Isolation Boundary:** Serverless container (gVisor sandbox)  
**Use Case:** HTTP-driven serverless workloads, GCP-native deployments  

Workspaces are provisioned as Cloud Run jobs (or services for HTTP-driven interaction). Cloud Run uses gVisor as the sandbox, providing application-kernel-level isolation. Each execution runs in its own gVisor sandbox with no shared state.

**Key characteristics:**
- Requires Google Cloud project with Cloud Run API enabled
- gVisor sandbox — user-space kernel intercepting syscalls (stronger than namespace isolation)
- Jobs mode for batch workloads (tasks); Services mode for HTTP-driven workers
- Execution timeout: 60 minutes maximum (configured via `max_runtime_seconds`)
- Billed per 100ms of vCPU and GiB-second of memory
- Autoscales to zero — no cost when idle
- Built-in revision history, traffic splitting, and rollback
- Best for: GCP-native organizations, bursty/sporadic workloads, cost optimization with scale-to-zero

## Implementation Guidance

### What someone building a Workspace Runtime needs to know

1. **Every workspace is 1:1 with a task.** A workspace serves exactly one task for exactly one worker. No pooling, no reuse. Isolation guarantees depend on this. After the task reaches a terminal state, the workspace is destroyed.

2. **The filesystem contract is mandatory.** Every workspace, regardless of backend type, MUST present `/workspace/source/`, `/workspace/artifacts/`, `/workspace/deps/`, and `/workspace/tmp/` with the correct permissions. Workers depend on these paths being present and correctly structured.

3. **Artifact extraction during DRAINING is critical.** The DRAINING state exists primarily to give the platform time to extract artifacts from `/workspace/artifacts/` before destroying the environment. The platform MUST scan this directory for all declared artifacts and persist them to ArtifactMemory. After extraction, destroy the workspace immediately.

4. **The orphan reaper must be reliable.** Workers can crash, disconnect, or be killed. The reaper (running every 60s) must identify workspaces with dead workers or expired lifetimes and destroy them. Without the reaper, resources leak indefinitely.

5. **Resource limits are enforced at the earliest layer.** CPU and memory via cgroups (or the backend's equivalent). Disk via filesystem quotas. Network via allowlist egress rules. Never trust the worker to self-limit — enforce at the infrastructure level.

6. **Backend selection is transparent to workers.** Workers request a workspace type, but the provisioning logic selects the appropriate backend. A worker that declares `workspace_types: ["docker-container", "kubernetes-pod"]` can be provisioned on either. The platform chooses based on workload requirements, cost, and availability.

7. **Credentials never enter the workspace filesystem.** Auth tokens, API keys, database credentials — injected as environment variables only, via the Governance API's credential injection. Secrets referenced by URN, never inlined. Workspaces have no access to the platform's secret store.

8. **Provisioning has timeouts and retries.** Container types: 120s timeout, VM types: 300s timeout. On provisioning failure, retry up to 2 times with exponential backoff. After that, mark the workspace (and task) as FAILED.

9. **Isolation strength varies by backend — choose appropriately.** `docker-container` provides namespace isolation (suitable for trusted code). `vm` and `fargate-task` provide hardware-level isolation (suitable for untrusted code). `cloud-run` provides gVisor application-kernel isolation. Match the isolation level to the task's trust level.

10. **Network isolation is default-deny.** Workspaces cannot communicate with each other unless explicitly permitted by network policy. Egress is allowlisted to pre-approved endpoints only. DNS is restricted to the internal resolver.

11. **Teardown is guaranteed and enforced.** Even if the worker crashes, the workspace is torn down. Even if the platform restarts, orphaned workspaces are reaped. No resource leaks. This is Non-Negotiable Constraint N3 from the Worker Contract.

12. **Container images must be signed and verified.** Worker images must be signed (Cosign/Notary). Image digest (SHA256) recorded in the audit log per task execution. Base images must come from allowlisted registries. No unsigned images execute.

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [Worker Runtime](../worker-runtime/README.md), [Governance Services](../governance/README.md), [Infrastructure](../infra/README.md)
- **Children:** `src/`, `tests/`
