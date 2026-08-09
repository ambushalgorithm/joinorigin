# Automation & Delivery

> **Parent:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — platform layer model and component topology

## Purpose

The Automation & Delivery component owns the continuous integration, continuous deployment, and automated validation pipeline for the Universal Worker Platform. It is an orthogonal layer that touches every other platform layer during build, test, and deploy cycles, and is dormant during production runtime. It handles CI/CD across multiple platforms (GitHub Actions, Jenkins, GitLab CI, ArgoCD, FluxCD, CircleCI, Buildkite), runs automated validation suites (unit, integration, E2E, linting, security scanning), orchestrates agent-driven code review, and manages artifact promotion through environments.

## Directory Map

| Path | Purpose |
|------|---------|
| `ci/` | CI pipeline definitions (platform-specific: GitHub Actions, Jenkins, GitLab CI, CircleCI, Buildkite) |
| `cd/` | CD pipeline definitions (ArgoCD, FluxCD, release orchestration) |
| `validation/` | Automated validation scripts: linting, typechecking, unit tests, integration tests, E2E tests |
| `security/` | Security scanning: dependency audit, SAST, container image scanning, secret detection |
| `review/` | Agent-driven code review automation and quality gate definitions |
| `scripts/` | Shared automation scripts referenced by pipeline definitions |
| `tests/` | Cross-cutting test suites (integration, E2E, load, smoke) and test fixtures |
| `README.md` | This file — self-documentation and contracts |

## Contracts

### Implements

- **AutomationContract**: Orchestrates build, test, package, and deploy stages across all platform layers. Defined in the Worker Platform contracts (see [ARCHITECTURE.md](../docs/ARCHITECTURE.md) Section 2.2).
- **Pipeline Contract**: Standardized pipeline interface that each CI/CD platform (GitHub Actions, Jenkins, GitLab CI, etc.) conforms to. Ensures consistent build/test/deploy behavior regardless of platform.

### Depends On

- **All platform components** (`../worker-runtime/`, `../workspace-runtime/`, `../memory/`, `../tool-registry/`, `../governance/`, `../planning/`, `../evaluation/`, `../contracts/`, `../services/`): Automation builds, tests, and packages every component.
- **Infrastructure** (`../infra/`): Container build contexts, Dockerfiles, compose files, Kubernetes manifests used during CI/CD.
- **Deployment** (`../infra/`): Environment configurations, scaling policies, secret references consumed by CD pipelines.
- **Artifacts** (`../artifacts/`): Build outputs are stored here; CD promotes them through environments.
- **Governance** (`../governance/`): Approval gates for production deployment, audit logging of CI/CD actions, secret access for pipeline credentials.

### Exposes

- **CI pipeline**: Build → Lint → Typecheck → Unit Tests → Build Artifacts (blocking merge gate)
- **CD pipeline**: Tag → Push artifacts → Deploy to staging (automatic) → Deploy to production (approval-gated)
- **Release pipeline**: Version bump → Changelog generation → GitHub Release → Production deployment (manual dispatch)
- **Security scan pipeline**: Dependency audit → SAST → Container image scan → Secret detection (weekly + manual)
- **Documentation check pipeline**: Markdown lint → Link validation → Spelling check (PR gate for docs changes)
- **Agent review pipeline**: Automated code review via agent workers → Quality gate evaluation → Review report generation

## CI/CD Platforms

### GitHub Actions

Primary CI/CD platform for the reference implementation. All workflows live in `.github/workflows/`.

| Workflow | Trigger | Gating | Actions |
|---|---|---|---|
| `ci.yml` | Every PR; every push to `main` | BLOCKS merge if fails | Lint → Typecheck → Unit Tests (all packages) → Build (all apps) |
| `cd.yml` | Merge to `main` or `release/*` | None (must succeed after CI) | Build → Tag → Push artifacts → Deploy to staging |
| `release.yml` | Manual dispatch (`workflow_dispatch`) | Requires CI passing on release branch | Version bump → Changelog → GitHub Release → Production deploy (gated) |
| `security-audit.yml` | Weekly schedule + manual dispatch | Advisory (does not block merge) | Dependency audit → SAST → Output to Security tab |
| `docs-check.yml` | PR when `docs/` changes | BLOCKS merge if fails | Markdown lint → Link validation → Spelling check |

**Secrets**: `${{ secrets.SECRET_NAME }}` only. Never hardcoded. Scripts over 20 lines go to `scripts/`.

### Jenkins

Declarative pipeline (`Jenkinsfile`) at `ci/jenkins/Jenkinsfile`. Supports on-premise CI/CD when GitHub Actions is not available or when self-hosted runners are required.

Pipeline stages mirror GitHub Actions workflows:
```
Checkout → Lint → Typecheck → Unit Tests → Build → Push Artifacts
                                                         → Deploy Staging (on main merge)
                                                         → Deploy Production (manual, gated)
```

Jenkins-specific features:
- Agent labels for platform-specific builds (linux/amd64, linux/arm64)
- Artifact archiving to Jenkins artifact store
- Test report publishing (JUnit XML)
- Parallel stage execution for independent test suites
- Blue Ocean UI for pipeline visualization

### GitLab CI

GitLab CI/CD configuration at `ci/gitlab/.gitlab-ci.yml`. For teams using GitLab as their primary SCM.

Stages:
```
stages:
  - lint
  - test
  - build
  - security
  - deploy-staging
  - deploy-production
```

GitLab-specific features:
- GitLab Container Registry integration
- Environment-specific variables (staging, production)
- Manual approval jobs for production deployment
- Merge request pipeline optimization
- SAST/Dependency Scanning templates via GitLab Ultimate

### ArgoCD

GitOps-based continuous delivery for Kubernetes deployments. Configuration at `cd/argocd/`.

Application manifests:
- `argocd/applications/staging.yaml` — Staging environment application set
- `argocd/applications/production.yaml` — Production environment application set
- `argocd/projects/uwp-project.yaml` — ArgoCD project with source repos, destinations, and RBAC

Sync policies:
- **Staging**: Automated sync (auto-sync + auto-prune + self-heal)
- **Production**: Manual sync (requires operator approval via governance)

### FluxCD

Alternative GitOps CD for teams using Flux. Configuration at `cd/flux/`.

Components:
- `flux/sources/` — GitRepository and HelmRepository source definitions
- `flux/kustomizations/` — Kustomization definitions per environment
- `flux/alerts/` — Notification configuration (Slack, Teams, webhook)

Flux-specific features:
- Automated image updates (image automation controller)
- SOPS integration for encrypted secrets in git
- Multi-tenancy support via tenant-specific Kustomizations

### CircleCI

CircleCI configuration at `ci/circleci/.circleci/config.yml`. For teams using CircleCI as their primary CI platform.

Workflows:
```
lint-and-test:
  jobs:
    - lint
    - typecheck
    - unit-test (parallel matrix across packages)
    - integration-test

build-and-deploy:
  requires: lint-and-test
  jobs:
    - build-artifacts
    - deploy-staging
    - hold-production (manual approval)
    - deploy-production (requires hold)
```

CircleCI-specific features:
- Dynamic config via path filtering
- Orb usage for common tasks (node, docker, security scanning)
- Test splitting for parallel execution
- Scheduled pipelines for nightly builds

### Buildkite

Buildkite pipeline configuration at `ci/buildkite/pipeline.yml`. For teams using Buildkite with hybrid CI (self-hosted agents + cloud orchestration).

Pipeline steps:
```yaml
steps:
  - label: ":eslint: Lint"
    command: "scripts/ci/lint.sh"
  - label: ":typescript: Typecheck"
    command: "scripts/ci/typecheck.sh"
  - label: ":jest: Unit Tests"
    command: "scripts/ci/unit-tests.sh"
  - label: ":docker: Build"
    command: "scripts/ci/build.sh"
    branches: "main release/*"
  - label: ":rocket: Deploy"
    command: "scripts/ci/deploy.sh"
    branches: "main"
    concurrency: 1
    concurrency_group: "deploy"
```

Buildkite-specific features:
- Agent targeting by queue tags (e.g., `queue=uwp-build`)
- Artifact sharing between steps
- Concurrency control for deployment steps
- Conditional steps based on branch patterns

## Automated Validation

### Unit Testing

- **Scope**: Per-component, co-located with source code (e.g., `src/worker-runtime.test.ts`)
- **Framework**: Vitest (preferred) or Jest with TypeScript transform
- **Execution**: Part of `ci.yml` — all packages run in parallel
- **Coverage threshold**: 80% line coverage for Worker Platform packages, 70% for Platform Services
- **Contract**: Every public contract function MUST have at least one unit test for the happy path and one for each error case

### Integration Testing

- **Scope**: Layer boundaries — tests that cross component boundaries via contracts
- **Location**: `tests/integration/` per layer boundary
- **Examples**:
  - Worker submits authorization check → Governance PDP evaluates → response verified
  - Tool invocation → Tool Registry resolves → Governance validates → tool executed
  - Task created → Orchestrator schedules → Worker executes → Artifact produced
- **Execution**: CI runs after unit tests; CD runs integration smoke tests before staging deploy

### End-to-End (E2E) Testing

- **Scope**: Complete user/worker workflows across all platform layers
- **Location**: `tests/e2e/`
- **Examples**:
  - Fresh agent → reads AGENTS.md → navigates to component README → builds → runs worker
  - Submit task → orchestrator schedules → worker executes with sandbox → produces artifact → evaluation validates
  - Deploy entire platform → run health checks → submit smoke test task → verify audit log
- **Execution**: CI on schedule (nightly) + manual dispatch; required before production deploy

### Linting

- **TypeScript/JavaScript**: ESLint with standard plugin set (must match conventions in [DEVELOPMENT.md](../docs/DEVELOPMENT.md))
- **Markdown**: markdownlint enforcing documentation conventions
- **YAML/JSON**: yamllint and jsonlint for pipeline configs
- **Dockerfiles**: hadolint for best-practice violations
- **Commit messages**: commitlint validating Conventional Commits format
- **Execution**: All PRs; blocks merge on failure

### Security Scanning

| Scan Type | Tool | Frequency | Blocks Merge |
|---|---|---|---|
| Dependency audit | `npm audit` / `pip-audit` / OWASP | Every PR + weekly schedule | Advisory only |
| SAST | Semgrep / CodeQL | Every PR | Advisory only |
| Container image scan | Trivy / Grype | Every build + weekly schedule | Blocks production deploy |
| Secret detection | Gitleaks / truffleHog | Every PR | BLOCKS merge |
| License compliance | FOSSA / license-checker | Weekly schedule | Advisory only |

Vulnerability response:
- **Critical/High**: Must be resolved before next release. Auto-creates Jira/GitHub issue.
- **Medium**: Tracked in backlog, resolved within sprint.
- **Low**: Acknowledged, resolved within 2 sprints.

## Agent Review

Automated code review via agent workers integrated into the CI pipeline.

### Review Workflow

```
PR Opened
    │
    ▼
CI: Lint → Typecheck → Unit Tests (blocking gate)
    │
    ▼
Agent Review Worker triggered (non-blocking, parallel)
    │
    ├── Review 1: Architectural compliance (does this PR violate layer boundaries?)
    ├── Review 2: Contract compliance (are new interfaces matching existing contracts?)
    ├── Review 3: Code quality (anti-patterns, complexity, duplication)
    └── Review 4: Security (obvious vulns, secret leaks, unsafe patterns)
    │
    ▼
Review report posted as PR comment with summary + per-file findings
    │
    ▼
Human reviewer uses agent report to inform review decision
```

### Agent Review Rules

- Agent review is **non-blocking** — it informs but does not gate merge.
- Agent review findings carry a confidence score (0.0–1.0). Findings below 0.7 confidence are marked "suggestion."
- Agent review MUST NOT modify code — it only reports findings.
- Agent review reports link to canonical concepts (e.g., "violates DEP-02: see [ARCHITECTURE.md](../docs/ARCHITECTURE.md) Section 3").

### Review Categories

| Category | What It Checks | Confidence Threshold |
|---|---|---|
| Architectural compliance | Layer boundary violations, import rule violations, dependency direction | 0.9 |
| Contract compliance | Interface conformance, missing required methods, schema changes without versioning | 0.85 |
| Code quality | Cyclomatic complexity, function length, duplication, dead code, missing tests | 0.7 |
| Security | Hardcoded secrets, unsafe eval, missing input validation, insecure protocols | 0.95 |
| Documentation | Missing README updates, contract changes without doc updates, dead links | 0.8 |

## Continuous Deployment

### Environment Promotion Pipeline

```
Build Artifacts (versioned, immutable)
    │
    ▼
Deploy to DEV (automatic on every `main` commit)
    │
    └── Smoke Tests (must pass)
    │
    ▼
Deploy to STAGING (automatic on merge to `main`)
    │
    └── Integration Smoke Tests (must pass)
    │
    ▼
Hold Gate: Approval Required (operator via governance `approve` endpoint)
    │
    ▼
Deploy to PRODUCTION (canary → blue/green → full rollout)
    │
    └── Health Checks + Rollback Plan (automatic rollback on health check failure)
```

### Deployment Strategies

| Strategy | Environment | Description |
|---|---|---|
| **Direct deploy** | DEV | Replace all instances immediately. Fast feedback, no cost of redundancy. |
| **Rolling update** | STAGING | Update instances one-by-one. Validates zero-downtime behavior before production. |
| **Blue/Green** | PRODUCTION | Deploy new version alongside old, switch traffic via load balancer. Instant rollback by switching back. |
| **Canary** | PRODUCTION | Deploy to subset of instances, verify health, gradually increase traffic. Safe for high-risk changes. |

### Rollback

- Automatic rollback if health checks fail within 5 minutes of deploy.
- Manual rollback available via `rollback` job in CD pipeline — re-deploys previous artifact version.
- Rollback is audit-logged (governance, event category: configuration).

## Implementation Guidance

### Getting Started

1. **Start with GitHub Actions** — It is the reference implementation's primary CI/CD. Set up `ci.yml` first as the merge gate.
2. **Run linting and typechecking before unit tests** — Fast failures prevent wasting CI minutes on tests that would fail on style/type errors.
3. **Keep pipeline scripts in `scripts/ci/`** — Workflow YAML files should invoke scripts, not contain inline logic. See the REPO-STANDARD (Section 5) in [ARCHITECTURE.md](../docs/ARCHITECTURE.md) — no inline scripts exceeding 20 lines.
4. **Publish artifacts with SHA256 digests** — Every build artifact must have a verified digest for image integrity (required by governance).

### Implementation Order

1. **CI Pipeline (`ci.yml`)** — Lint → Typecheck → Unit Tests → Build. This is the merge gate. Start here.
2. **Validation scripts** — `scripts/ci/lint.sh`, `scripts/ci/typecheck.sh`, `scripts/ci/unit-tests.sh`, `scripts/ci/build.sh`. These are invoked by all CI platforms.
3. **Security scanning** — Add `security-audit.yml` with dependency audit and secret detection. Secret detection MUST block merge.
4. **CD Pipeline (`cd.yml`)** — Tag → Push artifacts → Deploy to staging. Add production hold gate.
5. **Alternative CI/CD platforms** — Jenkins, GitLab CI, CircleCI, Buildkite configurations. Each should invoke the same `scripts/ci/*` scripts for consistency.
6. **GitOps (ArgoCD/FluxCD)** — Define Kubernetes application manifests and sync policies. Integrate with governance approval gates.
7. **Agent review integration** — Wire agent review workers into the CI pipeline. Start with architectural compliance checks (highest value).
8. **Release pipeline** — Version bump, changelog generation, GitHub Release creation. Manual dispatch only.
9. **E2E tests** — Nightly schedule. Add pre-production E2E smoke test gate.

### Platform Consistency Principle

All CI/CD platforms MUST invoke the same validation scripts. This ensures consistent builds regardless of which platform executes the pipeline:

```
GitHub Actions ──┐
Jenkins ─────────┤
GitLab CI ───────┼──→ scripts/ci/lint.sh
CircleCI ────────┤    scripts/ci/typecheck.sh
Buildkite ───────┘    scripts/ci/unit-tests.sh
                      scripts/ci/build.sh
```

Platform-specific YAML handles only: trigger definitions, secret injection, artifact storage, and environment routing. All logic lives in shared scripts.

### Testing Strategy

- **Unit tests**: Run in CI on every PR. Must pass for merge.
- **Integration tests**: Run in CI after unit tests. Must pass for merge.
- **E2E tests**: Run nightly. Must pass before production release.
- **Load tests**: Run before production release for performance-sensitive components.
- **Smoke tests**: Run immediately after deploy to any environment. Must pass or automatic rollback triggers.

### Key Design Decisions

- **CI is the merge gate, not human review** — Automated checks (lint, typecheck, unit tests, security) must pass before a PR can be merged. Human review is additive, not substitutive.
- **Staging deploys automatically, production requires approval** — CD moves fast to staging for testing but gates production behind governance approval.
- **Shared scripts, platform-specific triggers** — Validation logic is shared across CI/CD platforms. Only trigger definitions and secret handling are platform-specific.
- **Agent review is non-blocking** — It informs human reviewers but never blocks merge. The goal is augmentation, not automation of code review.
- **Secrets in CI/CD** — Pipeline credentials are injected via platform-native secret stores (GitHub Secrets, Jenkins Credentials, GitLab CI Variables, Vault). Never hardcoded, never in logs.

### Non-Negotiable Constraints

1. `ci.yml` MUST block merge on failure — no PR merges without green CI.
2. Secret detection MUST block merge on any finding — no exceptions.
3. All pipeline logic over 20 lines MUST be in `scripts/`, not inline in workflow YAML.
4. Production deployment MUST require governance approval — no automatic production deploys.
5. All build artifacts MUST be versioned and have SHA256 digests — for image integrity verification.
6. Rollback MUST be tested in staging before it's trusted in production — practice rollbacks regularly.
7. E2E smoke tests MUST pass before any production deployment proceeds.

### Integration Points

| Integration | Direction | Description |
|---|---|---|
| Governance | Automation → Governance | Production deploy approval via governance `/approve` endpoint |
| Artifact Registry | Automation → Artifacts | Push versioned build artifacts with SHA256 digests |
| Container Registry | Automation → Infra | Push signed container images (Cosign/Notary) |
| Secrets Manager | Automation → Deploy | Inject secrets into deployment environments |
| Observability | Automation → Infra | CI/CD metrics (build time, deploy frequency, failure rate) to Prometheus |
| Agent Workers | Agent Review → Worker Runtime | Spawn review workers during CI for automated code review |

## Navigation

- **Up:** [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- **Related:** [ci/](ci/), [cd/](cd/), [scripts/](scripts/), [governance/README.md](../governance/README.md), [infra/README.md](../infra/README.md)
- **Children:** `ci/` (CI definitions), `cd/` (CD definitions), `validation/` (validation scripts), `security/` (security scanning), `review/` (agent review), `tests/` (cross-cutting test suites)
