# Infrastructure

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — canonical architecture overview and layer model

## Purpose

The `infra/` directory contains all infrastructure-as-code (IaC) definitions, container configurations, and deployment manifests. This directory implements the Infrastructure Layer (Layer 2) and Deployment Layer (Layer 1) of the UWP architecture. Infrastructure is fully opaque to all upper layers — applications and workers never import from or reference infrastructure directly.

## Directory Map

| Path | Purpose |
|---|---|
| `Caddyfile` | Caddy reverse proxy for `analytics.qa1.joinorigin.co` — path-based HTTP Basic Auth for the Plausible dashboard (public `/js/*` + `/api/event`, protected dashboard) |
| `clickhouse/` | ClickHouse server overrides (thread-control fix for the Plausible event store) |
| `docker/` | Dockerfiles for all platform services and application containers |
| `compose/` | Docker Compose files for local development and CI environments |
| `kubernetes/` | Kubernetes manifests (deployments, services, configmaps, ingress) |
| `terraform/` | Terraform / OpenTofu modules for cloud provisioning |
| `pulumi/` | Pulumi infrastructure-as-code definitions |
| `cdk/` | AWS CDK / CDKTF stack definitions |
| `networking/` | VPC, subnet, security group, load balancer, and DNS configurations |
| `compute/` | Container runtime (Docker/OCI), VM, serverless compute definitions |
| `databases/` | Database provisioning and configuration (PostgreSQL, Redis, Qdrant) |
| `storage/` | Object storage (MinIO/S3), persistent volumes, backup policies |
| `secrets/` | Secrets manager configuration (Vault, Doppler, AWS Secrets Manager) |
| `monitoring/` | Observability stack (Prometheus, Loki, Tempo, Grafana) |
| `dns/` | DNS zone files, service discovery configuration, internal and external routing |
| `policies/` | Network policies, RBAC, pod security policies, OPA/Kyverno rules |

## Contracts

### Implements
- **Container Runtime**: Docker or compatible OCI runtime — defined in `docker/Dockerfile.*` and `compose/docker-compose.*.yml`
- **Network Layer**: Internal service mesh, ingress/egress rules — defined in `networking/` and `kubernetes/network-policies/`
- **Volume Manager**: Persistent volume provisioning — defined in `storage/` and `kubernetes/persistent-volumes/`
- **Observability Stack**: Metrics (Prometheus), logs (Loki), traces (Tempo) — defined in `monitoring/`
- **Service Discovery**: Internal DNS, service mesh registration — defined in `dns/` and `kubernetes/services/`
- **Scaling Policies**: HPA, VPA, KEDA rules — defined in `kubernetes/autoscaling/`
- **Secrets Manager**: Encrypted secret injection at deploy time — defined in `secrets/`

### Depends On
- **Nothing**: Infrastructure is foundational (Layer 2). It does not depend on any upper layer. All configuration is self-contained per [DEP-07](../docs/ARCHITECTURE.md#3-dependency-flow).

### Exposes
- Runtime environments (dev, staging, production) for all platform components
- Network topology and service mesh for inter-component communication
- Storage backends for artifacts, databases, caches, and queues
- Secret injection endpoints for governance-controlled credential delivery
- Observability pipelines for metrics, logging, and distributed tracing

## Infrastructure-as-Code Tools

### Terraform / OpenTofu (`terraform/`)
Declarative cloud resource provisioning. Use for: AWS/GCP/Azure resources, IAM policies, managed databases, DNS records.
```
terraform/
  main.tf              # Provider configuration
  variables.tf          # Input variables
  outputs.tf            # Output values
  modules/              # Reusable Terraform modules
  environments/         # Per-environment tfvars (dev.tfvars, staging.tfvars, prod.tfvars)
```
Conventions: use Terraform 1.6+ / OpenTofu 1.7+, remote state in S3/GCS, state locking via DynamoDB/Cloud Storage, `terraform fmt` on every change.

### Pulumi (`pulumi/`)
Infrastructure-as-code using general-purpose programming languages (TypeScript, Python, Go). Use for: complex provisioning logic, dynamic resource creation, multi-cloud abstractions.
```
pulumi/
  Pulumi.yaml           # Project definition
  Pulumi.<stack>.yaml   # Stack configuration
  index.ts              # Entry point (TypeScript)
  src/                  # Resource definitions
```
Conventions: use Pulumi Automation API for CI/CD integration, stack tags for environment tracking, secret encryption via Pulumi ESC or cloud KMS.

### AWS CDK / CDKTF (`cdk/`)
Cloud-native infrastructure definitions for AWS. CDKTF for Terraform-based multi-cloud CDK.
```
cdk/
  cdk.json              # CDK app definition
  bin/                  # App entry points
  lib/                  # Construct definitions
```
Conventions: use CDK v2, synthesize to CloudFormation or Terraform, snapshot tests for construct validation.

## Provisioning Domains

### Networking
- VPC / Virtual Network with public and private subnets
- Security groups / firewall rules: least-privilege, deny-by-default
- Load balancers: ALB/NLB for HTTP/gRPC, internal-only for service mesh
- DNS: Route 53 / Cloud DNS, internal `.uwp.local` zone for service discovery
- eBPF / Cilium for micro-segmentation and network observability

### Compute
- Container runtime: Docker Engine or containerd via OCI runtime spec
- Orchestration: Kubernetes (EKS, GKE, AKS) or Docker Compose (local dev)
- Serverless: Fargate, Cloud Run for event-driven workers
- VM isolation: Firecracker microVMs for untrusted code execution
- Resource limits per task: 1 vCPU default / 4 vCPU max, 512 MB default / 4 GB max

### Databases
- PostgreSQL: provisioned via Terraform module or Kubernetes operator (CloudNativePG)
- Redis: for caching and BullMQ queue backend
- Qdrant: vector database for semantic search and knowledge retrieval
- Connection strings injected via Secrets Manager at deploy time — never committed

### Storage
- Object Storage: MinIO (local dev / on-prem) or S3 (cloud) for artifacts and backups
- Persistent Volumes: Kubernetes PVCs with CSI drivers for stateful services
- Lifecycle policies: auto-expire temp objects (prefix: `tmp/`), archive after TTL
- Encryption: AES-256-GCM at rest, TLS 1.3 in transit

### Secrets
- HashiCorp Vault: primary secret store for API keys, database credentials, certificates
- Doppler: local development secret sync
- AWS Secrets Manager / GCP Secret Manager: cloud-native secret rotation
- Secrets referenced by URN (`urn:uwp:{tenant}:secret:{name}`) — never inlined
- Workers receive short-lived credentials (STS / Vault wrapped tokens) at invocation time

### Monitoring
- Prometheus: metrics collection with UWP-specific exporters (task state transitions, tool invocations, governance checks)
- Loki: structured JSON log aggregation from all platform components
- Tempo: distributed tracing with W3C Trace Context propagation
- Grafana: dashboards for platform health, cost, governance, and task throughput
- Alerting: Alertmanager rules for platform SLO violations

### DNS
- External DNS: public-facing service discovery (e.g., `api.uwp.example.com`)
- Internal DNS: `.uwp.local` zone for inter-service communication (e.g., `worker-runtime.uwp.local`)
- DNS restriction: worker sandboxes restricted to internal resolver only — no arbitrary external DNS
- Certificate management: cert-manager with Let's Encrypt for TLS certificates

## Analytics Hardening — Plausible Access Control + ClickHouse Threads (Sprint 17)

### Plausible dashboard access control (`Caddyfile`)

The self-hosted Plausible dashboard on `analytics.qa1.joinorigin.co` is
protected with HTTP Basic Auth in [`Caddyfile`](./Caddyfile). The policy is
path-based so browser tracking keeps working without credentials:

| Path | Policy | Why |
|---|---|---|
| `/js/*` (`/js/script.js`, …) | public | tracker script loaded by every visitor's browser |
| `/api/event` | public | pageview / event ingestion POSTed by the script |
| `/`, `/sites/*`, `/settings`, `/login`, other `/api/*` | Basic Auth | dashboard + stats API |

Registration is closed as well: `PLAUSIBLE_DISABLE_REGISTRATION=true` is the
default in `docker-compose.yml` and `apps/web/.env.example` (TASK-401).

### ClickHouse ~714-thread root cause + fix (`clickhouse/config.d/`)

**Root cause** (verified empirically against `clickhouse/clickhouse-server:24.12-alpine`
and the v24.12.6.70-stable source in `programs/server/Server.cpp`):

1. **Dominant** — oversized defaults for the per-connection + background pools.
   Every protocol server (HTTP 8123, native TCP 9000, ...) runs on one
   `Poco::ThreadPool` sized `max(max_connections)` — default **4096** — with
   idle threads retained for **60s**. Plausible's ClickHouse HTTP client churns
   through keep-alive connections; each open connection holds a pool thread
   (`HTTPHandler`), so the count climbs with every ingestion burst and never
   drains (locally: 700 connections -> 1371 threads, retained indefinitely).
   On top of that, ClickHouse 24.12 pre-creates 512 `BgSchPool` threads at
   startup (`background_schedule_pool_size` default is 512; the `128` in the
   image's `config.xml` is inside a comment) — an idle instance already sits
   at ~670 threads.

**Fix:** [`clickhouse/config.d/thread-control.xml`](./clickhouse/config.d/thread-control.xml)
is mounted into `plausible_events_db` (see `docker-compose.yml`) and bounds the
per-connection + background + query pools:
`max_connections=200`, `keep_alive_timeout=1`,
`max_concurrent_queries=100`, `max_thread_pool_size=256`,
`max_thread_pool_free_size=64`, `background_schedule_pool_size=64`.

**Verification:** reproduced locally with the same connection-churn workload
against the default vs fixed config — see the TASK-401 PR notes for
before/after thread counts.

## Local Development

For local development, use Docker Compose:
```bash
# Start all platform services
docker compose -f infra/compose/docker-compose.dev.yml up -d

# Start specific services
docker compose -f infra/compose/docker-compose.dev.yml up -d postgres redis minio qdrant

# Stop and clean up
docker compose -f infra/compose/docker-compose.dev.yml down -v
```

## File Naming Conventions

| Pattern | Convention | Example |
|---|---|---|
| Dockerfiles | `Dockerfile.<target>` | `Dockerfile.worker-runtime` |
| Compose files | `docker-compose.<env>.yml` | `docker-compose.dev.yml` |
| Kubernetes manifests | `kebab-case.yaml` | `worker-runtime-deployment.yaml` |
| Terraform files | `main.tf`, `variables.tf`, `outputs.tf` | N/A |
| Environment files | `.env.<env>.example` | `.env.production.example` |

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform architecture overview
- **Related:** [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md), [docs/SECURITY.md](../docs/SECURITY.md), [packages/README.md](../packages/README.md)
- **Children:** `docker/`, `compose/`, `kubernetes/`, `terraform/`, `pulumi/`, `cdk/`, `networking/`, `compute/`, `databases/`, `storage/`, `secrets/`, `monitoring/`, `dns/`, `policies/`
