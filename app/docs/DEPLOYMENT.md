# Deployment Guide

> **Parent:** [Architecture Overview](ARCHITECTURE.md) — Platform layer model, component map, dependency flow.

## Purpose

This guide covers every supported deployment target for the Universal Worker Platform (UWP). From local development on a laptop to multi-region cloud deployments, the platform is designed to be portable across infrastructure. The core principle is **Local First** — the same Docker Compose stack that powers local development also serves as the foundation for self-hosted and cloud deployments.

## Deployment Target Matrix

| Target | Complexity | Cost | Scaling | Use Case |
|---|---|---|---|---|
| **Local (Docker Compose)** | Minimal | Free | None (single node) | Development, prototyping |
| **Self-Hosted (VPS)** | Low | $5–$50/mo | Vertical | Personal projects, small teams |
| **Self-Hosted (Dedicated)** | Medium | $50–$200/mo | Vertical + GPU | ML workloads, high throughput |
| **Self-Hosted (Home Lab)** | Medium-High | $0–$50/mo (power) | Vertical + horizontal | Full control, data sovereignty |
| **AWS** | High | Variable | Elastic | Enterprise, multi-region |
| **DigitalOcean** | Low-Medium | $6–$200/mo | Vertical + managed DB | Simplicity-focused teams |
| **Hetzner** | Low-Medium | $4–$100/mo | Vertical | EU-based, cost-effective |
| **Azure** | High | Variable | Elastic | Enterprise Microsoft ecosystem |
| **Google Cloud** | High | Variable | Elastic + serverless | AI/ML workloads, Cloud Run |
| **Oracle Cloud** | Free tier available | $0–$100/mo | Vertical | Free ARM instances, budget |
| **Cloudflare** | Low | $0–$25/mo | Edge (Workers, D1, R2) | Edge-first, globally distributed |
| **Fly.io** | Low | $0–$50/mo | Horizontal (auto) | Simple global deployment |
| **Railway** | Very Low | $5–$50/mo | Auto | Zero-config, fastest setup |
| **Render** | Low | $0–$50/mo | Auto | Managed infrastructure |
| **Vercel** | Very Low | $0–$50/mo | Serverless | Front-end components, API routes |
| **Netlify** | Very Low | $0–$50/mo | Serverless | Static + serverless functions |

---

## 1. Local Deployment (Docker Compose)

The reference deployment. Used for development and as the foundation for all other targets.

### Stack

| Service | Image | Port | Replicas |
|---|---|---|---|
| Reverse Proxy | `traefik:v3.0` | 80, 443, 8080 | 1 |
| PostgreSQL | `postgres:16-alpine` | 5432 | 1 |
| Redis | `redis:7-alpine` | 6379 | 1 |
| MinIO | `minio/minio:latest` | 9000, 9001 | 1 |
| Qdrant | `qdrant/qdrant:latest` | 6333, 6334 | 1 |
| Mailpit | `axllent/mailpit:latest` | 1025, 8025 | 1 |
| LocalStack | `localstack/localstack:3.0` | 4566 | 1 |
| Worker Platform | `uwp/worker-platform:prod` | 3000 | 1 |
| Agent Console | `uwp/agent-console:prod` | 3001 | 1 |

### Quick Deploy

```bash
git clone <repo-url> uwp && cd uwp/app
cp infra/.env.example infra/.env.production
# Edit .env.production: set strong passwords, disable debug endpoints
docker compose -f infra/docker-compose.yml up -d
```

### Configuration

```bash
# infra/.env.production
UWP_ENV=production
POSTGRES_PASSWORD=<secure-random-password>
REDIS_PASSWORD=<secure-random-password>
MINIO_ROOT_PASSWORD=<secure-random-password>
```

### Production Hardening

- Set all passwords to randomly generated 64-character strings
- Restrict Traefik dashboard to localhost only
- Disable MinIO console publicly accessible port
- Set `MP_SMTP_AUTH_ACCEPT_ANY=0` and configure real SMTP credentials
- Remove LocalStack (use real cloud services or mock at edge)
- Enable Docker daemon `live-restore` and `log-opts max-size`
- Mount persistent volumes on high-performance storage (NVMe)

---

## 2. Self-Hosted Deployments

### 2.1 VPS (Single Server)

Targets: Linode, DigitalOcean Droplet, Hetzner Cloud, Vultr, OVH, any Ubuntu/Debian VPS.

**Recommended minimum:** 2 vCPU, 4 GB RAM, 40 GB SSD.

```bash
# 1. Provision server
ssh root@<vps-ip>

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker

# 3. Clone and deploy
git clone <repo-url> /opt/uwp
cd /opt/uwp/app
cp infra/.env.example infra/.env.production
# Edit secrets
docker compose -f infra/docker-compose.prod.yml up -d

# 4. Configure firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable

# 5. Set up TLS (Let's Encrypt)
# Traefik auto-provisions certs if configured with ACME resolver
# Add to compose file:
#   - "--certificatesresolvers.letsencrypt.acme.email=admin@example.com"
#   - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
#   - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
```

**Docker Compose production overrides** (`infra/docker-compose.prod.yml`):

```yaml
services:
  reverse-proxy:
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - uwp-letsencrypt:/letsencrypt
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"

  worker-platform:
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "2"
          memory: 2g
        reservations:
          cpus: "1"
          memory: 512m

  postgres:
    restart: unless-stopped

  redis:
    restart: unless-stopped
```

### 2.2 Dedicated Server / Bare Metal

Targets: Hetzner dedicated, OVH dedicated, Equinix Metal, on-premises hardware.

Same deployment pattern as VPS, plus:

- **Database:** Consider running PostgreSQL on the host (not containerized) for performance. Use separate disks for WAL and data.
- **Redis:** Run on host for lower latency. Configure `maxmemory-policy allkeys-lru`.
- **Storage:** MinIO on host with RAID array. Use XFS filesystem with `pquota` mount option.
- **GPU Support:** If running ML workers, install NVIDIA Container Toolkit and add `--gpus all` to worker containers.
- **Backups:** Schedule `pg_dump`, MinIO mirror (`mc mirror`), and Redis `BGSAVE` to offsite storage.

```bash
# Dedicated server provisioning script
# scripts/provision-dedicated.sh
apt update && apt upgrade -y
apt install -y postgresql-16 redis-server nginx certbot

# PostgreSQL tuning for dedicated hardware
# /etc/postgresql/16/main/conf.d/uwp.conf
shared_buffers = 4GB
effective_cache_size = 12GB
maintenance_work_mem = 1GB
wal_buffers = 64MB
work_mem = 64MB
max_worker_processes = 8
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
```

### 2.3 Home Lab

Targets: Raspberry Pi cluster, NUC farm, repurposed hardware, Proxmox, TrueNAS Scale.

**Architecture options:**

| Setup | Control Plane | Workers | Storage |
|---|---|---|---|
| **Minimal (1 node)** | All services on one machine | Same node, limited concurrency | Local disk |
| **Standard (3 nodes)** | Postgres + Redis on node 1, Worker Platform on nodes 2-3 | Distributed | MinIO on node 1, NFS share |
| **K3s Cluster** | Postgres + Redis as StatefulSets, Worker Platform as Deployments | Auto-scheduled | Longhorn or local-path provisioner |

```bash
# K3s deployment
curl -sfL https://get.k3s.io | sh -
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# Apply manifests
kubectl apply -k infra/k8s/overlays/home-lab/

# Access dashboard
kubectl proxy
open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

**Home lab specifics:**
- Use `zfs` for data integrity on storage volumes
- Configure UPS monitoring for graceful shutdown
- Set up Tailscale or WireGuard for secure remote access
- Use local DNS (Pi-hole or CoreDNS) for service discovery
- Monitor power consumption with Shelly or similar smart plugs

---

## 3. Cloud Providers

### 3.1 AWS

**Services used:**

| AWS Service | UWP Component |
|---|---|
| ECS Fargate + EC2 | Worker Platform, Agent Console (containers) |
| RDS (PostgreSQL) | Relational database |
| ElastiCache (Redis) | Cache, message queue |
| S3 | Object storage (artifacts, logs) |
| OpenSearch Service | Full-text search |
| OpenSearch Serverless (vector) | Vector storage (alternative to Qdrant) |
| SES | Email delivery |
| Secrets Manager | Credential management |
| ALB + ACM | Load balancing + TLS |
| CloudWatch + X-Ray | Observability |

**Infrastructure as Code (Terraform):**

```hcl
# infra/terraform/aws/main.tf
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "uwp-${var.environment}"
  cidr   = "10.0.0.0/16"
  azs    = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  enable_nat_gateway = true
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  identifier = "uwp-${var.environment}"
  engine     = "postgres"
  engine_version = "16"
  instance_class = var.db_instance_class
  allocated_storage = 100
  storage_encrypted = true
  db_name  = "uwp"
  username = var.db_username
  password = random_password.db.result
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  subnet_ids = module.vpc.private_subnets
  backup_retention_period = 30
  deletion_protection = var.environment == "production"
}

module "elasticache" {
  source = "terraform-aws-modules/elasticache/aws"
  cluster_id = "uwp-${var.environment}"
  engine     = "redis"
  node_type  = var.redis_node_type
  num_cache_nodes = var.environment == "production" ? 3 : 1
  subnet_ids = module.vpc.private_subnets
}

resource "aws_s3_bucket" "artifacts" {
  bucket = "uwp-artifacts-${var.environment}-${data.aws_caller_id.current.account_id}"
}

module "ecs" {
  source = "terraform-aws-modules/ecs/aws"
  cluster_name = "uwp-${var.environment}"
  fargate_capacity_providers = {
    FARGATE = { default_capacity_provider_strategy = { weight = 100 } }
  }
}
```

**Deploy:**

```bash
cd infra/terraform/aws
terraform init
terraform plan -var-file="environments/${ENV}.tfvars"
terraform apply -var-file="environments/${ENV}.tfvars"
```

### 3.2 DigitalOcean

**Services used:**

| DO Product | UWP Component |
|---|---|
| App Platform | Worker Platform, Agent Console |
| Managed PostgreSQL | Relational database |
| Managed Redis | Cache |
| Spaces (S3-compatible) | Object storage |
| Droplets | Custom service hosting |

```bash
# Deploy with doctl + Docker Compose on a Droplet
doctl compute droplet create uwp-prod \
  --image docker-20-04 \
  --size s-4vcpu-8gb \
  --region nyc3 \
  --ssh-keys <your-key-id>

# Or use App Platform spec
# infra/do/app.yaml
name: uwp
services:
  - name: worker-platform
    dockerfile_path: infra/Dockerfile.worker-platform
    source_dir: /
    http_port: 3000
    instance_count: 2
    instance_size_slug: professional-xs
    envs:
      - key: DATABASE_URL
        value: ${db.DATABASE_URL}
      - key: REDIS_URL
        value: ${redis.REDIS_URL}
databases:
  - name: db
    engine: PG
    version: "16"
    size: db-s-2vcpu-4gb
  - name: redis
    engine: REDIS
    size: db-s-1vcpu-1gb
```

### 3.3 Hetzner Cloud

Best value cloud option with EU data residency.

```bash
# Provision with hcloud CLI
hcloud server create \
  --name uwp-prod \
  --type cx32 \
  --image ubuntu-24.04 \
  --location nbg1 \
  --ssh-key <your-key>

# Or deploy to managed Kubernetes
hcloud network create --name uwp-net --ip-range 10.0.0.0/16
hcloud k8s create --name uwp-cluster --network uwp-net --node-type cx32

# Kubernetes manifests in infra/k8s/overlays/hetzner/
kubectl apply -k infra/k8s/overlays/hetzner/
```

### 3.4 Azure

**Services used:**

| Azure Service | UWP Component |
|---|---|
| Azure Container Apps | Worker Platform |
| Azure Database for PostgreSQL | Relational database |
| Azure Cache for Redis | Cache |
| Azure Blob Storage | Object storage |
| Azure AI Search | Full-text + vector search |
| Azure Communication Services | Email |
| Azure Key Vault | Secrets management |
| Application Gateway + CDN | Load balancing + edge |

```hcl
# infra/terraform/azure/main.tf (OpenTofu-compatible)
terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
  }
}

resource "azurerm_resource_group" "uwp" {
  name     = "uwp-${var.environment}"
  location = var.location
}

resource "azurerm_container_app_environment" "uwp" {
  name                = "uwp-${var.environment}"
  resource_group_name = azurerm_resource_group.uwp.name
  location            = azurerm_resource_group.uwp.location
}

resource "azurerm_postgresql_flexible_server" "uwp" {
  name                = "uwp-${var.environment}"
  resource_group_name = azurerm_resource_group.uwp.name
  location            = azurerm_resource_group.uwp.location
  version             = "16"
  sku_name            = var.db_sku
  storage_mb          = 65536
  zone                = "1"
}
```

### 3.5 Google Cloud

**Services used:**

| GCP Service | UWP Component |
|---|---|
| Cloud Run | Worker Platform (serverless) |
| Cloud SQL (PostgreSQL) | Relational database |
| Memorystore (Redis) | Cache |
| Cloud Storage | Object storage |
| Vertex AI Vector Search | Vector storage |
| SendGrid (via Marketplace) | Email |
| Secret Manager | Credential management |
| Cloud Load Balancing + CDN | Edge routing |
| Cloud Operations | Observability |

```bash
# Deploy Worker Platform to Cloud Run
gcloud run deploy worker-platform \
  --image gcr.io/${PROJECT}/uwp-worker-platform:${VERSION} \
  --platform managed \
  --region us-central1 \
  --memory 2Gi \
  --cpu 2 \
  --concurrency 10 \
  --max-instances 10 \
  --set-env-vars "DATABASE_URL=postgresql://..." \
  --set-secrets "REDIS_URL=redis-url:latest" \
  --allow-unauthenticated
```

### 3.6 Oracle Cloud (OCI)

Notable for its **Always Free Tier** which includes:
- 4 ARM-based Ampere A1 cores, 24 GB RAM (across instances)
- 200 GB block storage
- 10 TB outbound data transfer/month

```bash
# Create an Always-Free ARM instance
oci compute instance launch \
  --shape VM.Standard.A1.Flex \
  --shape-config '{"ocpus":4,"memoryInGBs":24}' \
  --image-id <ubuntu-24.04-arm-image-ocid> \
  --subnet-id <subnet-ocid> \
  --ssh-authorized-keys-file ~/.ssh/id_rsa.pub

# Then follow the VPS deployment steps above
# Replace Docker images with ARM-compatible variants:
#   postgres:16-alpine → supports ARM
#   redis:7-alpine → supports ARM
#   qdrant/qdrant:latest → supports ARM
```

### 3.7 Cloudflare

Edge-first deployment using Cloudflare's global network.

**Services used:**

| Cloudflare Product | UWP Component |
|---|---|
| Workers | Agent Console edge logic |
| D1 | Lightweight relational database |
| R2 | Object storage (S3-compatible, zero egress) |
| Vectorize | Vector storage |
| Queues | Message queue |
| Workers KV | Session/cache storage |
| Email Routing | Email handling |
| Zero Trust (Access) | Authentication |
| Pages | Documentation hosting |

```bash
# Deploy with Wrangler
npx wrangler deploy

# wrangler.toml
name = "uwp"
main = "apps/edge-worker/src/index.ts"
compatibility_date = "2025-06-01"

[[d1_databases]]
binding = "DB"
database_name = "uwp-db"
database_id = "<d1-database-id>"

[[r2_buckets]]
binding = "ARTIFACTS"
bucket_name = "uwp-artifacts"

[[vectorize]]
binding = "VECTOR_INDEX"
index_name = "uwp-vectors"

[[queues.producers]]
binding = "TASK_QUEUE"
queue = "uwp-tasks"
```

---

## 4. Platform Providers

### 4.1 Fly.io

Best for global deployment with minimal configuration. Fly.io runs apps in Firecracker microVMs close to users.

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch
flyctl launch
# Creates fly.toml automatically

# fly.toml
app = "uwp-worker-platform"
primary_region = "iad"

[build]
  dockerfile = "infra/Dockerfile.worker-platform"

[env]
  DATABASE_URL = "postgresql://..."
  REDIS_URL = "redis://..."

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 1024

# Scale globally
flyctl scale count 3 --region iad
flyctl scale count 2 --region fra
flyctl scale count 1 --region sin

# Attach Fly Postgres
flyctl postgres create --name uwp-db --region iad
flyctl postgres attach --app uwp-worker-platform uwp-db

# Attach Fly Redis
flyctl redis create --name uwp-cache --region iad
flyctl redis attach --app uwp-worker-platform uwp-cache
```

### 4.2 Railway

Fastest zero-config startup. Auto-detects Dockerfiles and provisions infrastructure.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy from repo
railway login
railway init
railway link

# Add services via dashboard or CLI
railway add
# Select: PostgreSQL, Redis, Volume

# Deploy
railway up

# Scale
railway up --service worker-platform

# Environment variables are set via dashboard or
railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**Railway auto-provisions:**
- PostgreSQL (from their plugin marketplace)
- Redis (from their plugin marketplace)
- Shared persistent volumes per service
- Public URL with TLS
- GitHub auto-deploy on push to main

### 4.3 Render

Managed infrastructure with a simple dashboard.

```yaml
# render.yaml (Blueprint spec)
services:
  - type: web
    name: worker-platform
    env: docker
    dockerfilePath: infra/Dockerfile.worker-platform
    plan: standard
    healthCheckPath: /health
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: uwp-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          name: uwp-redis
          type: redis
          property: connectionString

  - type: web
    name: agent-console
    env: docker
    dockerfilePath: infra/Dockerfile.agent-console
    plan: standard

databases:
  - name: uwp-db
    databaseName: uwp
    plan: starter
    postgresMajorVersion: 16

  - name: uwp-redis
    plan: starter
```

```bash
# Deploy via Blueprint (automatic from repo)
# Connect repo in Render dashboard → deploys on push
```

### 4.4 Vercel

Best for hosting UI components, API routes, and edge functions that compose with the Worker Platform backend.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3",
      "maxDuration": 60
    }
  },
  "crons": [
    {
      "path": "/api/cron/session-gc",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Vercel services mapping:**

| Vercel Product | UWP Component |
|---|---|
| Serverless Functions | Lightweight API endpoints |
| Edge Functions | Auth middleware, rate limiting |
| Edge Config | Feature flags, runtime config |
| KV (Redis-compatible) | Session store, cache |
| Postgres (Neon) | Relational database |
| Blob | Artifact storage |

### 4.5 Netlify

Best for static documentation, admin dashboards, and serverless API routes.

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "apps/admin-console/dist"

[functions]
  directory = "apps/admin-console/netlify/functions"

[[edge_functions]]
  path = "/api/*"
  function = "api-gateway"

[build.environment]
  WORKER_PLATFORM_URL = "https://worker-platform.fly.dev"
```

**Netlify services mapping:**

| Netlify Product | UWP Component |
|---|---|
| Functions | API endpoints, webhooks |
| Edge Functions | Auth, redirects, geo-routing |
| Blobs | Artifact storage |
| Connect (Neon DB) | Relational database |
| Forms | User submission handling |
| Identity | User authentication |

---

## 5. Infrastructure as Code

### 5.1 Terraform

Industry standard. HCL syntax. Largest provider ecosystem.

```bash
# Structure
infra/terraform/
├── main.tf              # Root module
├── variables.tf         # Input variables
├── outputs.tf           # Output values
├── modules/
│   ├── networking/      # VPC, subnets, firewalls
│   ├── database/        # PostgreSQL (RDS / Cloud SQL / DO Managed)
│   ├── cache/           # Redis (ElastiCache / Memorystore)
│   ├── storage/         # Object storage (S3 / GCS / Spaces)
│   ├── compute/         # ECS / Cloud Run / Kubernetes
│   └── observability/   # Monitoring, alerts, dashboards
└── environments/
    ├── dev/
    ├── staging/
    └── production/
```

### 5.2 OpenTofu

Fork of Terraform (pre-BSL). Drop-in replacement. Same HCL syntax.

```bash
# Install OpenTofu
curl -fsSL https://get.opentofu.org/install.sh | sh

# Works identically to Terraform
tofu init
tofu plan
tofu apply
```

### 5.3 Pulumi

IaC in familiar programming languages (TypeScript, Python, Go, C#, Java).

```typescript
// infra/pulumi/index.ts
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const environment = config.require("environment");

// VPC
const vpc = new aws.ec2.Vpc("uwp", {
  cidrBlock: "10.0.0.0/16",
  enableDnsHostnames: true,
  tags: { Environment: environment },
});

// RDS PostgreSQL
const db = new aws.rds.Instance("uwp-db", {
  engine: "postgres",
  engineVersion: "16",
  instanceClass: "db.t3.medium",
  allocatedStorage: 100,
  storageEncrypted: true,
  skipFinalSnapshot: environment !== "production",
});

// ECS Fargate Service
const cluster = new aws.ecs.Cluster("uwp");
const taskDefinition = new aws.ecs.TaskDefinition("worker-platform", {
  family: "uwp-worker-platform",
  cpu: "1024",
  memory: "2048",
  networkMode: "awsvpc",
  requiresCompatibilities: ["FARGATE"],
  executionRoleArn: executionRole.arn,
  containerDefinitions: JSON.stringify([{
    name: "worker-platform",
    image: "uwp/worker-platform:latest",
    portMappings: [{ containerPort: 3000 }],
    environment: [
      { name: "DATABASE_URL", value: db.endpoint.apply(e => `postgresql://...`) },
    ],
  }]),
});
```

### 5.4 AWS CDK

Infrastructure as TypeScript/Python/etc. with CloudFormation under the hood.

```typescript
// infra/cdk/lib/uwp-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class UWPStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'UwpVpc', { maxAzs: 3 });

    const db = new rds.DatabaseInstance(this, 'UwpDb', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_16 }),
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
    });

    const cluster = new ecs.Cluster(this, 'UwpCluster', { vpc });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'WorkerPlatform', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('../..', {
          file: 'infra/Dockerfile.worker-platform',
        }),
        environment: {
          DATABASE_URL: db.secret?.secretValue.unsafeUnwrap() || '',
        },
      },
    });
  }
}
```

---

## 6. Deployment Checklist

### Pre-Deploy (Any Target)

- [ ] All secrets are generated (64+ char random strings), never committed
- [ ] `.env.production` has been reviewed — no default passwords
- [ ] Database migrations have been tested against the target PostgreSQL version
- [ ] Docker images have been built, tagged, and pushed to a registry
- [ ] Health check endpoint (`/health`) is configured and returns valid JSON
- [ ] Readiness check endpoint (`/ready`) verifies all upstream dependencies
- [ ] Observability pipeline (metrics, logs, traces) is configured
- [ ] TLS certificates are provisioned or auto-provision plan is in place
- [ ] Backup strategy is documented and tested (restore from backup in under 30 min)
- [ ] Rollback procedure is documented

### Post-Deploy (Any Target)

- [ ] `GET /health` returns `200 OK` with all checks passing
- [ ] `GET /ready` returns `200 OK` with all dependencies `true`
- [ ] Smoke test: create a task, execute, verify artifact produced
- [ ] Observability: metrics are flowing to dashboards
- [ ] Audit log: first entries are recording
- [ ] Backup: first scheduled backup has completed successfully

---

## 7. Cost Comparison

Approximate monthly costs for a small production deployment (2 vCPU, 4 GB RAM equivalent):

| Target | Compute | Database | Cache | Storage | Total (Est.) |
|---|---|---|---|---|---|
| Local | $0 | $0 | $0 | $0 | $0 |
| VPS (Hetzner CX32) | $13 | Included | Included | Included | $13/mo |
| VPS (DO Droplet) | $24 | Included | Included | Included | $24/mo |
| AWS (ECS Fargate + RDS + ElastiCache + S3) | $35 | $35 | $15 | $2 | $87/mo |
| DigitalOcean (App Platform + Managed DB) | $12 | $30 | $15 | $5 | $62/mo |
| Fly.io (3 regions) | $25 | $15 (Fly PG) | $6 (Upstash) | $5 (Tigris) | $51/mo |
| Railway | $20 | $10 | $5 | $1 | $36/mo |
| Render | $25 | $20 | $10 | $0.50 | $55.50/mo |
| GCP (Cloud Run + Cloud SQL) | $30 | $40 | $20 | $3 | $93/mo |
| Oracle Cloud (Always Free) | $0 | $0 | $0 | $0 | $0/mo |
| Home Lab (electricity only) | $0 (existing) | $0 | $0 | $0 | $10/mo (power) |

---

## 8. Migration Between Targets

The UWP is designed for portability. The Provider Registry architecture means you can migrate infrastructure without code changes:

```bash
# Migrate from local to VPS
# 1. Dump databases on source
pg_dump -U uwp -h localhost -p 5432 uwp > uwp-dump.sql
# 2. Copy S3 objects
mc mirror local/artifacts remote/artifacts
# 3. Restore on target
psql -U uwp -h <vps-ip> -p 5432 uwp < uwp-dump.sql
# 4. Update provider registry config
#    Change DATABASE_URL, REDIS_URL, MINIO_ENDPOINT
# 5. Redeploy with same images, new config
docker compose up -d
```

Zero application code changes. The platform consumes contracts, not concrete services.

---

## 9. Security Across Deployment Targets

| Concern | Local | Self-Hosted | Cloud | Platform |
|---|---|---|---|---|
| TLS Termination | Traefik (self-signed/mkcert) | Traefik (Let's Encrypt) | ALB / Cloud LB | Platform-managed |
| Database Encryption | N/A | Filesystem LUKS or zfs encryption | Provider-managed (enabled) | Provider-managed |
| Secret Storage | `.env` file | `.env` file (0600 permissions) | Secrets Manager / Vault | Platform environment |
| Network Isolation | Docker networks | Docker + UFW/iptables | VPC + Security Groups | Platform VPC |
| Container Sandbox | Docker seccomp + no-new-privileges | Docker seccomp + AppArmor | Platform-managed | Platform-managed |
| Audit Log Integrity | Local append-only file | Local + offsite sync | CloudTrail + S3 WORM | Platform audit |

For full security architecture, see [SECURITY.md](SECURITY.md).

---

## Navigation

- **Up:** [Architecture Overview](ARCHITECTURE.md)
- **Related:** [Development Guide](DEVELOPMENT.md), [Security Policy](SECURITY.md), [Governance Model](GOVERNANCE.md)
