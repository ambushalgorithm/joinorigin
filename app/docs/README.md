# Documentation Index

> **Parent:** [app/README.md](../README.md) — platform entry point and architecture summary

## Purpose

This directory contains the Universal Worker Platform's core documentation suite. Every document is a self-contained, Markdown-formatted reference covering a distinct aspect of the platform. This README serves as the navigation index — listing every document with its purpose and target audience, enabling agents and humans to find the right document in a single read.

## Directory Map

| Path | Purpose |
|------|---------|
| `design/` | Build-ready design specs for product surfaces (e.g., Sprint 3 homescreen) — see `design/README.md` |
| `ARCHITECTURE.md` | Canonical architecture reference — layer model, component topology, dependency flow, contracts, design decisions |
| `VISION.md` | Project vision, problem statement, mission, audience, core principles, scope |
| `DEVELOPMENT.md` | Development environment setup, build, test, contribution workflow, Docker Compose stack |
| `DEPLOYMENT.md` | Deployment targets, environment definitions, IaC examples, release process, cost comparison |
| `SECURITY.md` | Security model, threat model, vulnerability reporting, authentication model, 6-layer defense architecture |
| `GOVERNANCE.md` | RBAC model, URN schema, approval framework, audit logging, resource/cost limits, enforcement architecture |
| `WORKER_GUIDE.md` | How to build and run a worker — IWorker interface, task lifecycle, context consumption, artifact production |
| `README.md` | This file — documentation index and navigation guide |

## Document Descriptions

### ARCHITECTURE.md — Canonical Architecture Reference

**Audience:** All agents, developers, architects.

**Sections:**
1. Project Identity and Overview
2. Platform Layer Model (6 layers with strict dependency rules)
3. Component Topology Map (all components across all layers)
4. Dependency Flow (strict top-down acyclic graph with DEP-01 through DEP-10)
5. Layer Boundary Contracts (Application ↔ Worker Platform, Worker Platform ↔ Services)
6. Context Persistence Model (6 memory domains, 4 persistence layers, snapshot isolation)
7. Design Decisions & Rationale (key architectural choices with justification)
8. Provider Independence Architecture (Provider Registry pattern)
9. Integration Model (5 tool protocols, MCP, REST, gRPC, WebSockets, GraphQL)
10. Governance Architecture (RBAC, approval framework, audit logging, resource/cost limits)
11. Security Boundaries (6-layer defense-in-depth, secret management, auth providers)
12. Repository Structure (root minimalism, directory conventions, file naming)
13. Navigation Map (full documentation tree)

**Read this first.** It is the canonical starting point for understanding the platform.

---

### VISION.md — Project Vision and Principles

**Audience:** All stakeholders, new contributors, PMs.

**Contents:** Why the UWP exists, what problem it solves, the mission statement, target audience, scope boundaries, and the 8 core design principles that guide all architecture decisions.

Read this to understand the "why" behind the platform.

---

### DEVELOPMENT.md — Development Workflow and Environment

**Audience:** Developers setting up their environment, CI/CD engineers, new contributors.

**Contents:** Prerequisites, local development setup, Docker Compose stack (10 services), build commands, test commands, linting and typechecking, contribution workflow, provider swap guide, debugging tips, and onboarding checklist.

Read this to get the platform running locally.

---

### DEPLOYMENT.md — Deployment Guide

**Audience:** DevOps engineers, SREs, operators.

**Contents:** 14 deployment targets (local Docker, VPS, Kubernetes, AWS ECS, GCP Cloud Run, etc.), environment definitions (dev, staging, production), IaC examples, release process, environment promotion pipeline, scaling policies, cost comparison across targets.

Read this to deploy the platform to any target environment.

---

### SECURITY.md — Security Model and Policies

**Audience:** Security engineers, auditors, all developers.

**Contents:** Security architecture (6-layer defense-in-depth), threat model, vulnerability reporting process, authentication providers (OIDC, OAuth 2.0, Passkeys, mTLS), authorization model, secret management (Vault, Doppler), container image signing (Cosign), network micro-segmentation, encryption standards (TLS 1.3, AES-256-GCM), and compliance mappings.

Read this to understand the platform's security posture.

---

### GOVERNANCE.md — Governance Framework

**Audience:** Platform administrators, PMs, security auditors.

**Contents:** Governance principles (mandatory, zero trust, least privilege, defense in depth, immutable audit), RBAC model with 6 roles, resource URN schema, permission structure and inheritance, approval framework with triggers and lifecycle, audit logging schema and retention, resource limits and quotas, cost model, budget enforcement, governance enforcement architecture (PAP/PDP/PEP/PIP), and Governance API contract.

Read this to understand who can do what and how all actions are authorized and audited.

---

### WORKER_GUIDE.md — Worker Development Guide

**Audience:** Worker developers, agent integrators.

**Contents:** IWorker interface specification (full method contracts with preconditions/postconditions), task lifecycle state machine (14 states), context consumption model, artifact production model, workspace isolation (8 workspace types), heartbeat protocol, error handling and error codes, graceful degradation, and complete worker implementation example.

Read this to build a new worker or integrate an existing agent.

---

## Documentation Conventions

All documents in this directory follow these conventions:

1. **Markdown only** — no PDF, DOCX, HTML, or other formats. All content is plain Markdown readable by agents and humans alike.
2. **SCREAMING_SNAKE_CASE** — standardized platform docs use uppercase with underscores (e.g., `ARCHITECTURE.md`, `SECURITY.md`).
3. **No numeric prefixes** — ordering is implicit through cross-references, not file names.
4. **No dates in filenames** — versioning is git's job, not file names.
5. **Self-contained** — each document can be read independently, with cross-references linking to related documents for deeper exploration.
6. **Breadcrumb header** — every document includes a `> **Parent:**` link to its parent in the documentation tree.
7. **Single canonical definition** — concepts are defined in exactly one document. Other documents reference by link, never by repetition.

## Navigation

### For new agents
1. Start at `AGENTS.md` (repo root).
2. Follow the navigation map to this `docs/` directory.
3. Read `ARCHITECTURE.md` first — it is the canonical architecture reference.
4. Navigate to specific documents as needed by your task.

### For humans
1. Read `VISION.md` to understand why the platform exists.
2. Read `ARCHITECTURE.md` to understand how it's built.
3. Read `DEVELOPMENT.md` to start contributing.
4. Read `WORKER_GUIDE.md` to build your first worker.

### For auditors
1. Read `SECURITY.md` for the threat model and security posture.
2. Read `GOVERNANCE.md` for the authorization and audit framework.
3. Read `ARCHITECTURE.md` for the complete component and dependency map.

## Related Documentation

Beyond this directory, the following self-documenting component READMEs cover specific platform subsystems:

| Component | README | Layer |
|---|---|---|
| Worker Runtime | `../worker-runtime/README.md` | Layer 5 (Worker Platform) |
| Workspace Runtime | `../workspace-runtime/README.md` | Layer 5 (Worker Platform) |
| Memory Services | `../memory/README.md` | Layer 5 (Worker Platform) |
| Tool Registry | `../tool-registry/README.md` | Layer 5 (Worker Platform) |
| Planning Services | `../planning/README.md` | Layer 5 (Worker Platform) |
| Evaluation Services | `../evaluation/README.md` | Layer 5 (Worker Platform) |
| Governance Services | `../governance/README.md` | Layer 5 (Worker Platform) |
| Platform Contracts | `../contracts/README.md` | Layer 5 (Worker Platform) |
| Platform Services | `../services/README.md` | Layer 4 (Platform Services) |
| Infrastructure | `../infra/README.md` | Layer 2 (Infrastructure) |
| Automation | `../automation/README.md` | Layer 3 (Automation & Delivery) |

## Concepts

- **Canonical Reference:** The single, authoritative document for a given topic. Other documents reference it by link, never by repetition.
- **Navigation Map:** The tree of documentation files, starting from AGENTS.md, that an agent follows to reach any piece of documentation in ≤ 3 reads.
- **Self-Documentation:** The convention that every directory has a README.md that explains what lives there, what contracts it implements/depends on/exposes, and how to navigate to related components.
- **3-Read Guarantee:** The architectural property that any documentation leaf can be reached from AGENTS.md in ≤ 3 file reads.

## Navigation

- **Up:** [app/README.md](../README.md)
- **Related:** [ARCHITECTURE.md](ARCHITECTURE.md), [VISION.md](VISION.md), [DEVELOPMENT.md](DEVELOPMENT.md), [DEPLOYMENT.md](DEPLOYMENT.md), [SECURITY.md](SECURITY.md), [GOVERNANCE.md](GOVERNANCE.md), [WORKER_GUIDE.md](WORKER_GUIDE.md)
