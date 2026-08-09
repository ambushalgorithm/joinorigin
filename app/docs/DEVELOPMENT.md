# Development Guide

> **Parent:** [Architecture Overview](ARCHITECTURE.md) — Platform layer model, component map, dependency flow.

## Purpose

This guide covers local development setup for the Universal Worker Platform (UWP). It defines the Docker Compose reference stack, tooling, workflows, and repo structure conventions. The core principle is **Local First** — any developer can go from `git clone` to a fully productive environment in under 15 minutes.

## Quick Start

```bash
git clone <repo-url> uwp
cd uwp/app

# Start the full platform stack
docker compose up -d

# Verify all services are healthy
docker compose ps

# View logs
docker compose logs -f
```

That is it. No package installation, no build step, no environment variable hunting. Docker Compose provisions the entire platform stack.

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Docker | 24.0+ | Container runtime |
| Docker Compose | 2.20+ | Multi-service orchestration |
| Git | 2.40+ | Version control |
| Bash or Zsh | Any | Terminal environment |
| GNU Make (optional) | 4.0+ | Convenience targets |

No language-specific toolchains (Node.js, Python, Go, Rust) are required on the host. Everything runs inside containers.

## Docker Compose Reference Stack

The reference stack is defined in `infra/docker-compose.dev.yml` and provisions all platform services required for full-stack local development.

### Service Catalog

| Service | Image | Port | Purpose | Layer |
|---|---|---|---|---|
| **Reverse Proxy** | `traefik:v3.0` | 80, 443, 8080 | TLS termination, routing, load balancing | Infrastructure |
| **PostgreSQL** | `postgres:16-alpine` | 5432 | Relational database, schema migrations | Platform Services |
| **Redis** | `redis:7-alpine` | 6379 | Cache, session store, message broker | Platform Services |
| **MinIO** | `minio/minio:latest` | 9000, 9001 | S3-compatible object storage | Platform Services |
| **Qdrant** | `qdrant/qdrant:latest` | 6333, 6334 | Vector storage and similarity search | Platform Services |
| **Mailpit** | `axllent/mailpit:latest` | 1025, 8025 | Email capture and testing (dev) | Platform Services |
| **LocalStack** | `localstack/localstack:3.0` | 4566 | AWS service emulation (SQS, SNS, Lambda) | Platform Services |
| **Worker Platform** | `uwp/worker-platform:dev` | 3000 | Runtime, workspace, memory, governance | Worker Platform |
| **Agent Console** | `uwp/agent-console:dev` | 3001 | Agent interaction terminal, task monitor | Application |
| **Observability** | `grafana/otel-lgtm:latest` | 3002, 4317, 4318 | Metrics, logs, traces (Grafana, Loki, Tempo, Prometheus) | Infrastructure |

### Networking

All services communicate over an internal Docker network (`uwp-net`). Worker sandboxes are attached to an isolated bridge network (`uwp-sandbox`) with no host access and restricted egress. The reverse proxy handles TLS termination and routes traffic to the appropriate service based on hostname or path prefix.

### Volumes & Persistence

| Volume | Purpose | Notes |
|---|---|---|
| `uwp-pgdata` | PostgreSQL data directory | Persistent across restarts |
| `uwp-redis` | Redis append-only file | Session recovery |
| `uwp-minio` | MinIO object data | Artifact storage |
| `uwp-qdrant` | Qdrant vector storage | Embedding persistence |
| `uwp-sessions` | Worker session state | Mounted to Worker Platform container |

### Environment File

Copy the template and customize for your workstation:

```bash
cp infra/.env.example infra/.env
```

Required variables:

```bash
# Platform
UWP_ENV=development
UWP_PORT=3000

# Database
POSTGRES_USER=uwp
POSTGRES_PASSWORD=uwp-dev
POSTGRES_DB=uwp

# Redis
REDIS_PASSWORD=uwp-dev

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# Mailpit (no auth in development)
MP_SMTP_AUTH_ACCEPT_ANY=1

# LocalStack
LOCALSTACK_AUTH_TOKEN=test
```

### Compose File Reference

```yaml
# infra/docker-compose.dev.yml
version: "3.9"

services:
  # --- Infrastructure ---
  reverse-proxy:
    image: traefik:v3.0
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - uwp-net

  # --- Platform Services ---
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-uwp}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-uwp-dev}
      POSTGRES_DB: ${POSTGRES_DB:-uwp}
    ports:
      - "5432:5432"
    volumes:
      - uwp-pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-uwp}"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - uwp-net

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-uwp-dev}
    ports:
      - "6379:6379"
    volumes:
      - uwp-redis:/data
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - uwp-net

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER:-minioadmin}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD:-minioadmin}
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - uwp-minio:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - uwp-net

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - uwp-qdrant:/qdrant/storage
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/health"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - uwp-net

  mailpit:
    image: axllent/mailpit:latest
    ports:
      - "1025:1025"
      - "8025:8025"
    environment:
      MP_SMTP_AUTH_ACCEPT_ANY: "1"
    networks:
      - uwp-net

  localstack:
    image: localstack/localstack:3.0
    ports:
      - "4566:4566"
    environment:
      SERVICES: s3,sqs,sns,lambda,secretsmanager
      PERSISTENCE: 1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - uwp-localstack:/var/lib/localstack
    networks:
      - uwp-net

  # --- Worker Platform ---
  worker-platform:
    build:
      context: ..
      dockerfile: infra/Dockerfile.worker-platform
      target: development
    ports:
      - "3000:3000"
    environment:
      UWP_ENV: development
      DATABASE_URL: postgresql://${POSTGRES_USER:-uwp}:${POSTGRES_PASSWORD:-uwp-dev}@postgres:5432/${POSTGRES_DB:-uwp}
      REDIS_URL: redis://default:${REDIS_PASSWORD:-uwp-dev}@redis:6379
      MINIO_ENDPOINT: minio:9000
      MINIO_ACCESS_KEY: ${MINIO_ROOT_USER:-minioadmin}
      MINIO_SECRET_KEY: ${MINIO_ROOT_PASSWORD:-minioadmin}
      QDRANT_URL: http://qdrant:6333
      SMTP_HOST: mailpit
      SMTP_PORT: 1025
      LOCALSTACK_ENDPOINT: http://localstack:4566
    volumes:
      - ..:/app
      - uwp-sessions:/data/sessions
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      minio:
        condition: service_healthy
      qdrant:
        condition: service_healthy
    networks:
      - uwp-net
      - uwp-sandbox

  # --- Application ---
  agent-console:
    build:
      context: ..
      dockerfile: infra/Dockerfile.agent-console
      target: development
    ports:
      - "3001:3001"
    environment:
      WORKER_PLATFORM_URL: http://worker-platform:3000
    depends_on:
      - worker-platform
    networks:
      - uwp-net

  # --- Observability ---
  otel-lgtm:
    image: grafana/otel-lgtm:latest
    ports:
      - "3002:3000"
      - "4317:4317"
      - "4318:4318"
    volumes:
      - uwp-grafana:/data/grafana
      - uwp-prometheus:/data/prometheus
    networks:
      - uwp-net

networks:
  uwp-net:
    driver: bridge
  uwp-sandbox:
    driver: bridge
    internal: true
    driver_opts:
      com.docker.network.bridge.enable_icc: "false"

volumes:
  uwp-pgdata:
  uwp-redis:
  uwp-minio:
  uwp-qdrant:
  uwp-localstack:
  uwp-sessions:
  uwp-grafana:
  uwp-prometheus:
```

## Repository Structure

```
app/
├── docs/               ← Core platform documentation (you are here)
├── apps/               ← Deployable applications and services
│   └── agent-console/  ← Agent interaction terminal
├── packages/           ← Shared libraries, SDKs, reusable modules
│   ├── contracts/      ← Platform contracts (interfaces)
│   ├── worker-runtime/ ← Task queue consumer, lifecycle manager
│   ├── workspace-runtime/ ← Sandbox manager, filesystem layer
│   ├── tool-registry/  ← Tool catalog, resolver, sandboxing
│   ├── memory/         ← STM, LTM, context assembler
│   ├── planning/       ← Task decomposer, dependency resolver
│   ├── evaluation/     ← Output validator, quality scorer
│   ├── governance/     ← Permission engine, approval gate, audit logger
│   └── services/       ← Provider implementations (PostgreSQL, Redis, MinIO, etc.)
├── infra/              ← Dockerfiles, Compose files, Kubernetes manifests
├── scripts/            ← Build, deploy, and utility automation scripts
├── tests/              ← Integration tests, E2E tests, test fixtures
├── artifacts/          ← Build outputs (gitignored)
└── .github/            ← CI/CD workflows, PR/issue templates
```

Each directory under `apps/` and `packages/` has a `README.md` that follows the [self-documentation conventions](ARCHITECTURE.md).

## Development Workflows

### Day-to-Day

```bash
# Start the platform (first run builds images)
docker compose -f infra/docker-compose.dev.yml up -d

# Watch logs from a specific service
docker compose -f infra/docker-compose.dev.yml logs -f worker-platform

# Rebuild after dependency changes
docker compose -f infra/docker-compose.dev.yml build --no-cache worker-platform

# Stop everything
docker compose -f infra/docker-compose.dev.yml down

# Stop and remove volumes (clean reset)
docker compose -f infra/docker-compose.dev.yml down -v
```

### Writing a Worker

Workers are composed inside the `apps/` directory. See [WORKER_GUIDE.md](WORKER_GUIDE.md) for the full contract.

1. Create a new directory under `apps/<worker-name>/`
2. Implement the `IWorker` interface from `packages/contracts/`
3. Register capabilities in `apps/<worker-name>/manifest.json`
4. The Worker Platform auto-discovers workers via the Tool Registry

### Running Tests

```bash
# Unit tests for a specific package
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform \
  npm test -- --workspace=packages/worker-runtime

# All unit tests
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform \
  npm test

# Integration tests (require running services)
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform \
  npm run test:integration

# E2E tests (full stack)
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform \
  npm run test:e2e
```

### Linting & Type Checking

```bash
# Lint all packages
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform npm run lint

# Type check
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform npm run typecheck

# Format check
docker compose -f infra/docker-compose.dev.yml run --rm worker-platform npm run format:check
```

### Accessing Platform Services

| Service | Local URL | Admin Console |
|---|---|---|
| PostgreSQL | `localhost:5432` | Any client (psql, DBeaver) |
| Redis | `localhost:6379` | `redis-cli -h localhost` |
| MinIO | `localhost:9000` | `http://localhost:9001` |
| Qdrant | `localhost:6333` | `http://localhost:6333/dashboard` |
| Mailpit | `localhost:1025` | `http://localhost:8025` |
| LocalStack | `localhost:4566` | Web UI at `https://app.localstack.cloud` |
| Worker Platform | `localhost:3000` | `http://localhost:3000/health` |
| Agent Console | `localhost:3001` | `http://localhost:3001` |
| Grafana | `localhost:3002` | `http://localhost:3002` (admin/admin) |
| Traefik Dashboard | `localhost:8080` | `http://localhost:8080/dashboard` |

## Tooling Reference

### Required (containerized)
| Tool | Container Image | Purpose |
|---|---|---|
| TypeScript/Node.js | `node:20-alpine` | Worker Platform runtime |
| PostgreSQL Client | `postgres:16-alpine` | Database migrations, seeding |
| Redis CLI | `redis:7-alpine` | Cache inspection, queue debugging |
| AWS CLI | `amazon/aws-cli:latest` | LocalStack interaction |

### Optional (host-installed)
| Tool | Purpose |
|---|---|
| `direnv` | Auto-load `.env` when entering project directory |
| `jq` | JSON processing in scripts |
| `yq` | YAML processing in scripts |
| `httpie` / `curl` | API testing from host |
| `watchexec` | File-watch based auto-reload |

## Onboarding Checklist (Target: Under 15 Minutes)

- [ ] **Minute 0-2:** Clone the repository and `cd app/`
- [ ] **Minute 2-4:** Copy `infra/.env.example` to `infra/.env`, review defaults
- [ ] **Minute 4-5:** Run `docker compose -f infra/docker-compose.dev.yml up -d`
- [ ] **Minute 5-8:** Wait for health checks (all services green: `docker compose ps`)
- [ ] **Minute 8-9:** Verify Worker Platform health: `curl http://localhost:3000/health`
- [ ] **Minute 9-11:** Read [ARCHITECTURE.md](ARCHITECTURE.md) for the platform overview
- [ ] **Minute 11-13:** Explore a component README: `cat packages/worker-runtime/README.md`
- [ ] **Minute 13-15:** Run the test suite: `docker compose run worker-platform npm test`

After 15 minutes, you should have:
- A running local platform with all services
- Understanding of the architecture layers
- Ability to navigate the repository
- Passing test suite confirming your environment works

## Provider Swap (Changing Platform Services)

The UWP uses provider independence architecture. You can swap any service implementation without changing application code:

```bash
# Example: Swap PostgreSQL for MySQL
# 1. Add MySQL service to docker-compose.dev.yml
# 2. Implement DatabaseProvider for MySQL in packages/services/
# 3. Update provider registry binding
# 4. Restart

# No changes in Worker Platform or Application layers
```

All service providers implement contracts defined in `packages/contracts/` and are resolved via the Provider Registry at startup.

## Debugging

```bash
# Attach to a running Worker Platform container
docker compose -f infra/docker-compose.dev.yml exec worker-platform sh

# View PostgreSQL query log
docker compose -f infra/docker-compose.dev.yml exec postgres \
  psql -U uwp -c "SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;"

# Inspect Redis keys
docker compose -f infra/docker-compose.dev.yml exec redis redis-cli -a uwp-dev KEYS '*'

# Browse MinIO objects
open http://localhost:9001  # Login with minioadmin / minioadmin

# View captured emails
open http://localhost:8025

# OpenTelemetry traces
open http://localhost:3002/explore  # Grafana with Tempo trace search
```

## Environment Parity

The development environment mirrors production in these critical dimensions:

| Dimension | Dev | Production |
|---|---|---|
| Database engine | PostgreSQL 16 | PostgreSQL 16 |
| Cache engine | Redis 7 | Redis 7 |
| Object storage protocol | S3 (MinIO) | S3 (AWS/GCS/MinIO) |
| Vector store engine | Qdrant | Qdrant |
| Message queue backend | Redis (BullMQ) | Redis (BullMQ) |
| Container runtime | Docker | Docker / Kubernetes |
| Observability | Grafana LGTM | Grafana LGTM |

The only differences are scale (single instance vs. replicas) and security configurations (dev-local passwords vs. secret-managed credentials). Core behavior is identical.

## CI/CD Integration

Local development integrates seamlessly with CI:

1. **Pre-push run**: `docker compose -f infra/docker-compose.dev.yml run worker-platform npm run ci-check`
2. **CI workflow** (`.github/workflows/ci.yml`) runs the same command with production-like config
3. **CD workflow** (`.github/workflows/cd.yml`) tags and pushes images built from the same Dockerfiles

The `npm run ci-check` script runs: lint → typecheck → unit tests → build — in that order, failing fast.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Port conflict | Another service using 3000/5432/6379 | Change ports in `infra/.env` |
| Build failure | Docker image cache stale | `docker compose build --no-cache worker-platform` |
| Postgres not ready | Health check failing | `docker compose logs postgres`, check disk space |
| Redis auth error | Password mismatch | Verify `REDIS_PASSWORD` in `infra/.env` |
| MinIO upload fails | Bucket not provisioned | Check MinIO init script in `scripts/minio-init.sh` |
| Qdrant 503 | Storage permission issue | `chmod 777` on vol or set `QDRANT__STORAGE__SNAPSHOTS_MODE: disabled` |
| Container exits immediately | Missing env vars | `docker compose config` to validate; check `.env` |
| Worker platform can not reach services | Network not joined | All services on `uwp-net`; verify with `docker compose exec worker-platform ping postgres` |

## Navigation

- **Up:** [Architecture Overview](ARCHITECTURE.md)
- **Related:** [Deployment Guide](DEPLOYMENT.md), [Security Policy](SECURITY.md), [Worker Guide](WORKER_GUIDE.md)
