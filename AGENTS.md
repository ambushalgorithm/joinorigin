# Universal Worker Platform (UWP)

> A reference implementation of an agent-orchestrated worker platform
> that runs knowledge workers, governance, and automation in a portable
> containerized environment.

## Agent First Steps

1. Read this file (you are here). This orients you to the project.
2. Read `app/docs/ARCHITECTURE.md` — the canonical architecture overview.
3. From ARCHITECTURE.md, navigate to any component README as needed.

## Architecture Navigation

```
AGENTS.md (you are here)
  ├─ app/README.md
  ├─ app/ROADMAP.md
  ├─ app/TASKS.md
  ├─ app/CHANGELOG.md
  └─ app/docs/ARCHITECTURE.md  ← START HERE
       ├─ app/docs/VISION.md
       ├─ app/docs/DEVELOPMENT.md
       ├─ app/docs/DEPLOYMENT.md
       ├─ app/docs/SECURITY.md
       ├─ app/docs/GOVERNANCE.md
       ├─ app/docs/WORKER_GUIDE.md
       ├─ app/docs/README.md
       ├─ app/worker-runtime/README.md
       ├─ app/workspace-runtime/README.md
       ├─ app/memory/README.md
       ├─ app/tool-registry/README.md
       ├─ app/governance/README.md
       ├─ app/planning/README.md
       ├─ app/evaluation/README.md
       ├─ app/contracts/README.md
       ├─ app/services/README.md
       ├─ app/automation/README.md
       ├─ app/apps/README.md
       ├─ app/packages/README.md
       ├─ app/infra/README.md
       ├─ app/scripts/README.md
       ├─ app/tests/README.md
       ├─ app/artifacts/README.md
       ├─ app/examples/README.md
       └─ app/.github/README.md
```

## Documentation Conventions

Every directory has a `README.md`. Every README.md follows this contract:

1. **Breadcrumb header** — first line links back to the parent doc
2. **Purpose** — what this component does, in 1 paragraph
3. **Directory Map** — what files/dirs live here and why
4. **Contracts** — interfaces, APIs, or protocols this component exposes or consumes
5. **Navigation footer** — links to parent, siblings, and children

A fresh agent can navigate the entire architecture by reading <= 3 files from AGENTS.md.

## Component Map

| Concept / Component   | Documentation                             |
|-----------------------|-------------------------------------------|
| Architecture overview | `app/docs/ARCHITECTURE.md`                |
| Project vision        | `app/docs/VISION.md`                      |
| Development workflow  | `app/docs/DEVELOPMENT.md`                 |
| Deployment            | `app/docs/DEPLOYMENT.md`                  |
| Security model        | `app/docs/SECURITY.md`                    |
| Governance model      | `app/docs/GOVERNANCE.md`                  |
| Worker contract       | `app/docs/WORKER_GUIDE.md`                |
| Documentation Index   | `app/docs/README.md`                      |
| Worker runtime        | `app/worker-runtime/README.md`            |
| Workspace runtime     | `app/workspace-runtime/README.md`         |
| Memory system         | `app/memory/README.md`                    |
| Tool registry         | `app/tool-registry/README.md`             |
| Governance engine     | `app/governance/README.md`                |
| Planning Services     | `app/planning/README.md`                  |
| Evaluation Services   | `app/evaluation/README.md`                |
| Platform Contracts    | `app/contracts/README.md`                 |
| Platform Services     | `app/services/README.md`                  |
| Automation & CI/CD    | `app/automation/README.md`                |
| Applications          | `app/apps/README.md`                      |
| Shared packages       | `app/packages/README.md`                  |
| Infrastructure        | `app/infra/README.md`                     |
| Scripts & tooling     | `app/scripts/README.md`                   |
| Test suites           | `app/tests/README.md`                     |
| Build artifacts       | `app/artifacts/README.md`                 |
| Examples              | `app/examples/README.md`                  |
| CI/CD workflows       | `app/.github/README.md`                   |
| Project roadmap       | `app/ROADMAP.md`                          |
| Task tracker          | `app/TASKS.md`                            |
| Release changelog     | `app/CHANGELOG.md`                        |

## Agent Rules

- NEVER modify files outside the scope of your current task.
- ALWAYS start navigation from `app/docs/ARCHITECTURE.md` when exploring.
- NEVER create new documentation files without updating the navigation map.
- ALWAYS follow the README.md contract when creating new component directories.
- PATHS are relative — do not hardcode absolute paths.
- READMEs are self-documenting — they must explain their component without
  requiring the agent to read source code first.
- ALWAYS containerize every component you build. Every service, app, tool, or
  worker MUST include a Dockerfile and be wired into docker-compose.yml.
  git clone + docker compose up must produce a fully operational environment
  with zero host dependencies. Never run anything directly on the host.

## Portability

This repo is designed to be copied. The `app/` directory is self-contained.
To use UWP in your project:

1. Copy `app/` into your repo root.
2. Point your `AGENTS.md` at `app/docs/ARCHITECTURE.md`.
3. Done. Zero configuration. Your agent now has full access.
