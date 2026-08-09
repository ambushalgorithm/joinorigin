# Changelog

All notable changes to the Universal Worker Platform reference implementation will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

### Added
- Architecture contracts for all seven platform subsystems:
  - Platform layer topology, component map, and dependency flow (TASK-001)
  - Repository structure, directory conventions, file naming, and CI layout (TASK-002)
  - Worker interface, task lifecycle, runtime contract, and workspace isolation (TASK-003)
  - Context system: six memory domains, context persistence, knowledge flow (TASK-004)
  - Governance framework: permissions, approvals, audit logging, security boundaries (TASK-005)
  - Integration model: tool protocols, component interfaces, API contracts (TASK-006)
  - Agent auto-discovery: AGENTS.md specification, self-documentation conventions (TASK-007)
- Root platform documentation: README.md, ROADMAP.md, TASKS.md, CHANGELOG.md (TASK-008)
- `app/` directory structure following the white paper repository standard

### Changed
- None (initial release)

### Deprecated
- None (initial release)

### Removed
- None (initial release)

### Fixed
- None (initial release)

### Security
- Governance architecture defines zero-trust, least-privilege model
- Worker sandboxing contract specifies container isolation, seccomp, and network policies
- Audit logging design uses append-only, tamper-evident storage
- Secrets management architecture — secrets never touch worker disk or context

---

## Version Policy

| Component | When to Increment |
|---|---|
| **Major** (X.0.0) | Backward-incompatible architecture changes, contract removals |
| **Minor** (X.Y.0) | New platform contracts, new component implementations, new documentation |
| **Patch** (X.Y.Z) | Bug fixes, documentation corrections, performance improvements |

## Release Cadence

- **Sprint releases**: At the end of each sprint, all completed tasks are bundled into a minor version release.
- **Hotfix releases**: Critical fixes between sprints are released as patch versions.
- **Major releases**: Reserved for breaking architecture changes — gates on full architecture review.

## [0.1.0] — Sprint 01 (Current)

- Architecture phase complete: 7 contracts spanning topology, repository, worker, context, governance, integration, and agent discovery
- Design phase in progress: root documentation and component README skeleton
- Planned: review phase (TASK-017 through TASK-019)
