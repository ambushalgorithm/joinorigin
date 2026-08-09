# Universal Worker Platform (UWP)

## An Open Standard for Human and Intelligent Worker Collaboration

### Version

1.0

### Status

Community Reference Architecture

### Tagline

Build Once. Run Anywhere. Work Together.

---

# Executive Summary

The Universal Worker Platform (UWP) is an open-source, local-first, provider-independent platform for building, deploying, operating, and continuously improving software systems through collaboration between human and intelligent workers.

UWP provides a common architecture, repository structure, runtime model, deployment strategy, governance framework, automation layer, and worker lifecycle that allows software to be created and maintained by both humans and AI-powered workers.

The platform is designed to solve a fundamental problem emerging in modern software development:

There is currently no standard operating environment where humans and intelligent workers can collaborate using shared infrastructure, shared memory, shared context, shared governance, and shared deployment workflows.

Every project reinvents the same architecture.

Every AI tool introduces its own conventions.

Every cloud provider introduces its own ecosystem.

Every development team rebuilds the same operational foundation.

UWP exists to provide a common foundation.

The platform is centered around work.

Work is performed by workers.

Workers may be:

* Humans
* Cortex
* Claude Code
* Codex
* OpenCode
* Gemini CLI
* OpenHands
* Aider
* Cline
* Roo Code
* Future intelligent systems

The platform does not care who performs the work.

The platform provides the environment required for work to be performed safely, consistently, and repeatably.

---

# The Problem

Software development is becoming increasingly fragmented.

Teams must choose:

* Programming frameworks
* Databases
* Deployment systems
* Cloud providers
* Agent frameworks
* AI models
* Memory systems
* Tooling ecosystems
* CI/CD platforms
* Infrastructure providers

Meanwhile intelligent workers are becoming increasingly capable.

Workers can now:

* Design systems
* Write code
* Generate tests
* Review pull requests
* Deploy applications
* Analyze production systems
* Generate documentation
* Improve existing software

Despite this, there is no universally accepted platform that allows human and intelligent workers to collaborate using shared operational standards.

The result is:

* Vendor lock-in
* Repeated infrastructure work
* Inconsistent repositories
* Poor portability
* Limited interoperability
* Difficulty onboarding humans and AI workers

---

# Mission

Create a universal platform where:

* Humans and intelligent workers collaborate
* Projects remain portable
* Infrastructure remains replaceable
* Workers remain replaceable
* Knowledge remains persistent
* Development remains local-first
* Deployment remains simple
* Governance remains enforceable
* Software continuously improves through recursive feedback loops

---

# Core Principles

## Principle 1: Work Is The Primary Primitive

Applications are not the primary abstraction.

Models are not the primary abstraction.

Workers are not the primary abstraction.

Work is the primary abstraction.

Everything becomes:

```text
Task
→ Context
→ Workspace
→ Worker
→ Artifacts
→ Review
→ Completion
```

Applications become systems that create and consume work.

---

## Principle 2: Workers Are Replaceable

Workers are implementations.

The platform is the foundation.

The platform must never depend on:

* Claude Code
* Codex
* Cortex
* LangGraph
* OpenAI
* Anthropic
* Gemini
* CrewAI
* AutoGen

Workers may change.

The platform remains stable.

---

## Principle 3: Context Outlives Models

Models evolve.

Vendors change.

Workers change.

Context survives.

The platform prioritizes:

* Documentation
* Memory
* Artifacts
* Knowledge
* Architecture
* Governance
* History

Context is a permanent asset.

---

## Principle 4: Local First

Every project must run locally.

Cloud providers are deployment targets.

The local environment is the source of truth.

Every contributor should be able to execute:

```bash
git clone
docker compose up
```

and become productive immediately.

---

## Principle 5: Provider Independence

Applications depend on platform contracts.

Never directly on providers.

Providers become interchangeable implementations.

---

## Principle 6: Governance Is Mandatory

Autonomous systems require accountability.

Every action must be:

* Observable
* Auditable
* Reproducible
* Governed

---

# Platform Architecture

```text
Universal Worker Platform
│
├── Application Layer
│
├── Worker Platform
│
├── Platform Services
│
├── Automation & Delivery Layer
│
├── Infrastructure Layer
│
└── Deployment Layer
```

---

# Application Layer

Applications consume platform capabilities.

Examples:

* SaaS products
* Internal tools
* APIs
* Mobile backends
* AI applications
* Trading systems
* Research platforms
* Knowledge systems

Applications should focus on business functionality rather than infrastructure concerns.

---

# Worker Platform

The Worker Platform enables intelligent workers to perform useful work.

## Worker Runtime

Defines the worker contract.

Every worker must be capable of:

* Accepting tasks
* Consuming context
* Accessing memory
* Using tools
* Operating workspaces
* Generating artifacts
* Reporting progress
* Completing work

---

## Workspace Runtime

Workers execute inside isolated workspaces.

Supported environments:

* Docker Containers
* Docker Compose
* Remote Docker Hosts
* Virtual Machines
* Kubernetes Pods
* ECS Tasks
* Fargate Tasks
* Cloud Run
* Future sandbox technologies

Workspaces provide:

* Filesystem access
* Source code
* Runtime dependencies
* Build systems
* Artifact generation

---

## Tool Registry

Workers interact with systems through tools.

Examples:

* Filesystem Tools
* Git Tools
* Browser Automation
* Database Tools
* Deployment Tools
* API Tools
* MCP Tools
* Internal Platform Tools

Tools are:

* Discoverable
* Versioned
* Governed
* Auditable

---

## Memory Services

Memory is a platform service.

Memory domains include:

* User Memory
* Project Memory
* Session Memory
* Task Memory
* Knowledge Memory
* Artifact Memory

---

## Planning Services

Planning services provide:

* Task decomposition
* Prioritization
* Scheduling
* Dependency analysis
* Work coordination

---

## Evaluation Services

Evaluation services provide:

* Quality scoring
* Cost analysis
* Performance analysis
* Reliability analysis
* Regression detection

Evaluation generates additional work.

---

## Governance Services

Governance controls:

* Permissions
* Approval policies
* Security constraints
* Resource limits
* Cost limits
* Audit logging

---

# AI Framework Integration Layer

UWP does not require any specific AI framework.

However, workers may utilize AI frameworks internally.

Supported examples include:

## Agent Frameworks

* LangChain
* LangGraph
* CrewAI
* AutoGen
* LlamaIndex
* Semantic Kernel
* OpenAI Agents SDK
* PydanticAI
* DSPy
* Haystack

## Coding Agent Frameworks

* Cortex
* Claude Code
* Codex
* OpenCode
* OpenHands
* Aider
* Cline
* Roo Code
* Gemini CLI
* Cursor Agents
* Windsurf Agents

## Tool Protocols

* Model Context Protocol (MCP)
* OpenAPI
* GraphQL
* REST
* gRPC
* WebSockets

These frameworks are implementation details of workers rather than dependencies of the platform.

---

# Platform Services

## Database Services

Reference Database:

PostgreSQL

Supported Examples:

* PostgreSQL
* MySQL
* MariaDB
* SQLite
* CockroachDB
* MongoDB
* DynamoDB

---

## Cache Services

Reference Cache:

Redis

Supported Examples:

* Redis
* Valkey
* Memcached

---

## Queue Services

Reference Queue:

Redis / BullMQ

Supported Examples:

* BullMQ
* RabbitMQ
* Kafka
* NATS
* AWS SQS
* Google Pub/Sub

---

## Object Storage

Reference Storage:

MinIO

Supported Examples:

* MinIO
* AWS S3
* Cloudflare R2
* Backblaze B2
* Google Cloud Storage
* Azure Blob Storage

---

## Search Services

Reference Search:

PostgreSQL Full Text Search

Supported Examples:

* PostgreSQL Search
* OpenSearch
* Elasticsearch

---

## Vector Storage

Reference Vector Store:

Qdrant

Supported Examples:

* Qdrant
* pgvector
* Pinecone
* Weaviate
* Milvus
* Chroma

---

## Email Services

Development:

Mailpit

Production:

* SMTP
* Resend
* AWS SES
* SendGrid
* Postmark

---

# AI Model Ecosystem

Supported examples include:

## Frontier Models

* OpenAI GPT Series
* Anthropic Claude Series
* Google Gemini Series
* xAI Grok

## Open Models

* Llama
* Mistral
* DeepSeek
* Qwen
* Phi

## Local Inference

* Ollama
* vLLM
* LM Studio
* llama.cpp

## Routing Providers

* OpenRouter
* LiteLLM

Models are replaceable.

The platform never depends on a specific model.

---

# Repository Standard

Every UWP repository follows a predictable structure.

```text
repo/
│
├── AGENTS.md
├── README.md
├── ROADMAP.md
├── TASKS.md
├── CHANGELOG.md
│
├── docs/
│   ├── VISION.md
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   ├── GOVERNANCE.md
│   └── WORKER_GUIDE.md
│
├── apps/
├── packages/
├── infra/
├── scripts/
├── tests/
├── artifacts/
│
└── .github/
```

---

# Worker Context Layer

Examples:

* AGENTS.md
* CLAUDE.md
* opencode.json
* .cursorrules
* .windsurfrules

These files provide operational context to workers.

---

# Automation & Delivery Layer

Automation is a first-class capability.

---

## Continuous Integration

Supported examples:

* GitHub Actions
* Jenkins
* GitLab CI
* CircleCI
* Buildkite

---

## Automated Validation

Every change should support:

* Unit Tests
* Integration Tests
* End-to-End Tests
* Linting
* Formatting
* Type Checking
* Security Scanning
* Build Validation

---

## Agent Review

Workers may participate in:

* Code Review
* Architecture Review
* Security Review
* Documentation Review
* Test Generation

---

## Continuous Deployment

Supported examples:

* GitHub Actions
* ArgoCD
* FluxCD
* Jenkins
* GitLab Deployments

Capabilities:

* Build
* Test
* Deploy
* Rollback
* Preview Environments

---

# Worker Development Lifecycle (WDL)

The Worker Development Lifecycle extends the traditional Software Development Lifecycle.

```text
Objective
↓
Planning
↓
Task Creation
↓
Worker Assignment
↓
Implementation
↓
Testing
↓
Review
↓
Approval
↓
Deployment
↓
Monitoring
↓
Evaluation
↓
Improvement
↓
Task Generation
↓
Repeat
```

The lifecycle is recursive.

Operational feedback continuously generates new work.

---

# Local Development Environment

Reference Stack

```text
Docker Compose
│
├── Applications
├── PostgreSQL
├── Redis
├── MinIO
├── Qdrant
├── Mailpit
├── LocalStack
├── Reverse Proxy
└── Worker Platform
```

Startup command:

```bash
docker compose up
```

Target onboarding time:

Less than 15 minutes.

---

# Infrastructure Layer

Infrastructure is defined as code.

Recommended:

* Terraform
* OpenTofu
* Pulumi
* AWS CDK

Infrastructure provisions:

* Networking
* Compute
* Databases
* Storage
* Secrets
* Monitoring
* DNS

---

# Deployment Layer

## Local

Docker Compose

## Self Hosted

Docker Compose

Examples:

* VPS
* Dedicated Servers
* Home Labs
* Colocation

## Cloud Providers

Supported examples:

* AWS
* DigitalOcean
* Hetzner
* Azure
* Google Cloud
* Oracle Cloud
* Cloudflare

## Platform Providers

Supported examples:

* Fly.io
* Railway
* Render
* Vercel
* Netlify

Applications should not require modification when moving between deployment targets.

---

# Observability

Supported examples:

* OpenTelemetry
* Prometheus
* Grafana
* Jaeger
* LangSmith
* Phoenix
* Datadog
* Sentry

Observability should exist across:

* Applications
* Workers
* Infrastructure
* Automation Pipelines

---

# Security

Supported examples:

* Vault
* AWS Secrets Manager
* Doppler
* 1Password
* OIDC
* OAuth
* OpenID Connect
* Passkeys

Security must be integrated throughout the platform.

---

# Reference Implementation

The UWP repository serves as the reference implementation.

```text
uwp/
│
├── worker-runtime/
├── workspace-runtime/
├── memory/
├── tool-registry/
├── governance/
├── automation/
├── apps/
├── packages/
├── infra/
└── examples/
```

Reference Technology Choices:

* Worker Runtime: Cortex
* Agent Framework: LangGraph
* Database: PostgreSQL
* Cache: Redis
* Queue: BullMQ
* Storage: MinIO
* Vector Store: Qdrant
* Runtime: Docker Compose
* Infrastructure: Terraform
* Tool Protocol: MCP
* CI/CD: GitHub Actions

These are recommendations, not requirements.

---

# Vision

The future of software development is neither human-only nor AI-only.

The future is collaborative.

The Universal Worker Platform provides a shared operating environment where humans and intelligent workers build, operate, maintain, deploy, monitor, and continuously improve software systems together.

Workers become interchangeable.

Applications become portable.

Infrastructure becomes replaceable.

Knowledge becomes persistent.

Governance becomes enforceable.

Work becomes the universal abstraction.

The Universal Worker Platform exists to make that future practical, portable, and open.

