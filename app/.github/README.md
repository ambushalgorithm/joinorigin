# CI/CD Setup

> **Parent:** [Architecture Overview](../docs/ARCHITECTURE.md) — platform layer model, component map, dependency rules

## Purpose

This directory contains the GitHub-native CI/CD pipeline definitions, PR/issue templates, and repository governance files for the Universal Worker Platform. Every workflow enforces a specific quality gate: CI blocks broken code from merging, CD orchestrates artifact delivery, and security scanning runs continuously. This directory implements the Automation & Delivery layer (Layer 3) of the platform topology.

## Directory Map

| Path | Purpose |
|------|---------|
| `workflows/ci.yml` | Continuous Integration — lint, typecheck, unit tests, build, security scan |
| `workflows/deploy.yml` | Continuous Deployment — build, tag, push images, deploy to staging |
| `PULL_REQUEST_TEMPLATE.md` | PR description template with checklist for reviewers |
| `CODEOWNERS` | Ownership map by directory — auto-assigns reviewers |
| `dependabot.yml` | Automated dependency update configuration |
| `ISSUE_TEMPLATE/bug_report.md` | Standardized bug report form |
| `ISSUE_TEMPLATE/feature_request.md` | Standardized feature request form |
| `ISSUE_TEMPLATE/architecture_proposal.md` | Architecture Decision Record proposal template |

## Workflow Summary

| Workflow | Trigger | Gating | Actions |
|----------|---------|--------|---------|
| `ci.yml` | Every PR; every push to `main` | **BLOCKS merge** if fails | Lint → Typecheck → Unit Tests → Build → Security Audit |
| `deploy.yml` | Merge to `main` or `release/*` | Manual approval for production | Build → Tag → Push to registry → Deploy to staging |

## CI/CD Principles

1. **CI is the merge gate.** No PR may merge without passing `ci.yml` in its entirety. No exceptions.
2. **CD runs after merge.** Staging deployment is automatic on merge to `main`. Production deployment is gated behind approval.
3. **Scripts, not inline code.** Workflows invoke scripts from `scripts/ci/`. No inline script block exceeds 20 lines (per [repo standard §5 CI Principles](../docs/ARCHITECTURE.md)).
4. **Secrets never committed.** All credentials, tokens, and keys are referenced via `${{ secrets.SECRET_NAME }}`.
5. **Artifacts archived.** CI build outputs and test results are uploaded as workflow artifacts and stored in `artifacts/`.
6. **Deterministic builds.** Every CI run starts from a clean checkout. Build outputs are reproducible.

## Required GitHub Secrets

| Secret | Purpose |
|--------|---------|
| `CONTAINER_REGISTRY` | Docker registry URL (e.g., `ghcr.io/owner/repo`) |
| `REGISTRY_USERNAME` | Registry authentication username |
| `REGISTRY_PASSWORD` | Registry authentication token or password |
| `DEPLOY_KEY_STAGING` | SSH key or API token for staging deployment |
| `DEPLOY_KEY_PRODUCTION` | SSH key or API token for production deployment |

## Navigation

- **Up:** [Architecture Overview](../docs/ARCHITECTURE.md)
- **Related:** [Scripts](../scripts/README.md), [Tests](../tests/README.md), [Artifacts](../artifacts/README.md), [Infrastructure](../infra/README.md), [Deployment Guide](../docs/DEPLOYMENT.md)
- **Children:** `workflows/ci.yml`, `workflows/deploy.yml`, `PULL_REQUEST_TEMPLATE.md`, `CODEOWNERS`, `dependabot.yml`, `ISSUE_TEMPLATE/`
