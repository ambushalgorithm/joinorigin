# Universal Worker Platform — Vision & Mission

> **Parent:** [ARCHITECTURE.md](ARCHITECTURE.md) — the canonical platform architecture reference.

## Problem Statement

Knowledge work increasingly depends on autonomous agents — AI-powered workers that read context, invoke tools, produce artifacts, and collaborate in directed acyclic graphs of execution. Current approaches suffer from four critical failures:

1. **Vendor Lock-In.** Workers are built to a single vendor's SDK, making them non-portable across models, platforms, and environments. Switching providers requires rewriting the entire worker stack.

2. **Context Amnesia.** Every worker invocation starts from scratch. Session state, project conventions, learned patterns, and prior artifacts are either discarded or manually reconstructed. Context does not outlive the model that produced it.

3. **Governance Vacuum.** Autonomous agents operate without auditable boundaries. There is no unified mechanism to control what workers can do, what resources they can access, what budget they can consume, or who approved their actions. Security is an afterthought.

4. **Infrastructure Chaos.** Every team builds its own worker runtime, workspace isolation, tool registry, and deployment pipeline. There is no portable, self-documenting reference implementation that can be copied into any project and used immediately.

The **Universal Worker Platform (UWP)** exists to solve these four problems in a single, portable, zero-configuration reference implementation.

## Vision

**A world where any agent — human or AI — can be onboarded as a governed, context-aware worker in any project, regardless of model, vendor, or infrastructure.**

Workers are interchangeable. Context is permanent. Governance is universal. The platform is portable.

## Mission

Provide a portable, self-documenting reference implementation of an agent-orchestrated worker platform that:

- Runs knowledge workers in isolated, resource-constrained workspaces
- Persists context as a first-class asset that outlives models, vendors, and sessions
- Enforces governance — permissions, approvals, audit, budgets — at every platform layer
- Exposes a single, stable contract surface so applications never depend on specific providers
- Ships as a self-contained `app/` directory that can be copied into any repository and used immediately

## Core Principles

### 1. Context Is the Asset, Not the Model

Context — project memory, knowledge, artifacts, conversation history — is the permanent asset of the platform. Models, vendors, and workers are transient. Every piece of context is versioned, immutable, provenance-tracked, and survives any model or platform change.

### 2. Contracts Over Providers

Every external dependency (database, cache, queue, storage, search, vectors, email) is accessed through a stable interface contract. The concrete provider is resolved at startup through a Provider Registry. Swapping PostgreSQL for MySQL requires a new provider implementation — zero changes in application code or platform logic.

### 3. Governance Is Mandatory, Not Optional

Every action in the platform is authorized, logged, and auditable. Governance is enforced independently at every layer — gateway, orchestrator, worker runtime, memory, tool registry, infrastructure. No subsystem operates without governance controls. Zero trust by default.

### 4. Isolation by Default

Every worker invocation runs in an isolated workspace — container, VM, or serverless environment — with explicit resource limits, network policies, and capability drops. Workers cannot access each other's state. Artifacts are extracted from workspaces; workspace filesystems are ephemeral.

### 5. Portable and Self-Documenting

The entire platform ships as a single `app/` directory. A fresh agent can clone the repository, read `AGENTS.md`, navigate to `docs/ARCHITECTURE.md`, and understand the full system — no configuration, no installation, no prior knowledge required. Every directory has a `README.md`. Every concept has one canonical definition.

### 6. Workers Are Interchangeable

Human workers, AI workers, CLI agents, and custom worker implementations all share the same `IWorker` interface. The platform dispatches tasks to any worker that satisfies the capability requirements. No worker type is privileged.

### 7. Layer Isolation With Strict Dependencies

The platform is organized into six layers with a strict top-down dependency graph. Upper layers depend only on interfaces defined by lower layers. No circular dependencies. No layer leaks implementation details upward.

### 8. The Feedback Loop Is Closed

Every task execution enriches the platform's knowledge base. Evaluation services analyze worker outputs, extract patterns and anti-patterns, update knowledge memory, and inform future planning. The platform continuously improves through use.

## Target Audience

The UWP serves three primary audiences:

| Audience | Use Case |
|---|---|
| **Platform Builders** | Reference architecture for building governed, context-aware worker systems |
| **Agent Developers** | A standard `IWorker` contract and runtime for onboarding new agent types |
| **Project Teams** | A portable, self-documenting skeleton to structure AI-assisted software projects |

## Scope

The **reference implementation skeleton** (Sprint 01) establishes:

- Complete platform architecture documentation (this file, plus ARCHITECTURE.md)
- Layer model with strict dependency rules
- Worker contract (canonical `IWorker` interface and task lifecycle)
- Context system (six memory domains with snapshot isolation)
- Governance framework (RBAC, approvals, audit, resource limits)
- Integration contracts (tool protocols, service interfaces, API contracts)
- Repository standard (directory conventions, file naming, agent auto-discovery)
- A self-documenting `app/` skeleton with component READMEs

The reference implementation is a **blueprint and contract surface**, not a production runtime. Production implementations map the contracts to concrete infrastructure.

## Navigation

- **Next:** [ARCHITECTURE.md](ARCHITECTURE.md) — the complete platform architecture
- **Up:** [DEVELOPMENT.md](DEVELOPMENT.md) (when created)
- **Related:** [SECURITY.md](SECURITY.md), [GOVERNANCE.md](GOVERNANCE.md), [WORKER_GUIDE.md](WORKER_GUIDE.md)
