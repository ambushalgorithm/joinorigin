# Security Architecture

> **Parent:** [ARCHITECTURE.md](ARCHITECTURE.md) — platform layer model and component map

## Purpose

Defines the security architecture for the Universal Worker Platform (UWP). Covers secret management, authentication, authorization, container image integrity, defense-in-depth layering, network micro-segmentation, data encryption, and the threat model. All security controls are centralized in the Worker Platform layer and enforced independently at every platform boundary.

---

## 1. Security Principles

| Principle | Description |
|---|---|
| **Zero Trust** | No actor (worker, user, service) is trusted implicitly. Every action requires explicit authentication and authorization at every platform layer. |
| **Least Privilege** | Actors receive only the minimum permissions necessary to complete their assigned task. Permissions are scoped to task duration. |
| **Defense in Depth** | Security is enforced independently at every platform layer — Gateway, Orchestrator, Worker Sandbox, Secrets, Network, Data. A bypass at one layer does not compromise others. |
| **Secure by Default** | All services start in a deny-all posture. Access is explicitly granted via governance policy. |
| **No Secrets on Disk** | Platform credentials, API keys, and auth tokens are never written to workspace filesystems. |
| **Immutable Audit** | All security-relevant events are logged to an append-only, tamper-evident audit trail. |

---

## 2. Defense-in-Depth Architecture

Security controls are deployed at six independent layers. Each layer enforces its own checks — failure or bypass at one layer does not compromise security at others.

```
LAYER 1 — GATEWAY: API Gateway / AuthN
  - TLS 1.3 termination (minimum)
  - Authentication enforcement (OIDC, OAuth, Passkeys, mTLS)
  - Rate limiting per principal (token bucket)
  - IP allowlist/denylist
  - JWT/OAuth token validation

LAYER 2 — ORCHESTRATION: Governance PDP/PEP
  - Authorization check on every action
  - Approval gating for sensitive operations
  - Resource quota enforcement
  - Cost budget enforcement

LAYER 3 — WORKER SANDBOX: Isolated Execution
  - Container-based isolation (Docker/Podman)
  - Minimal base images (distroless)
  - Read-only root filesystem (tmpfs for scratch)
  - No host network access (internal bridge only)
  - Seccomp + AppArmor/SELinux profiles enforced
  - Drop all Linux capabilities; add only required
  - No privileged mode
  - Image signature verification before execution

LAYER 4 — SECRETS: External Vault / Secrets Manager
  - Secrets referenced by URN, never inlined in code
  - Short-lived credential injection (STS / Vault tokens)
  - All secret access logged and audited
  - Credentials never persisted to worker context or disk

LAYER 5 — NETWORK: Micro-segmentation
  - Workers in isolated network namespaces
  - Egress only to pre-approved endpoints (allowlist)
  - Inter-worker communication disabled by default
  - DNS restricted to internal resolver
  - eBPF / iptables-based rate limiting per worker

LAYER 6 — DATA: Encryption Everywhere
  - In-transit: TLS 1.3 minimum, mTLS for internal mesh
  - At-rest: AES-256-GCM for storage, logs, artifacts
  - Memory contexts encrypted between invocations
  - Database connection: SCRAM-SHA-256 + TLS
```

### Per-Layer Enforcement Checks

| Layer | Checks Performed |
|---|---|
| **Gateway** | AuthN (valid token), Rate Limit, TLS valid, IP allowlist |
| **Orchestrator** | AuthZ (permission check), Resource Quota, Cost Estimate, Approval Gate |
| **Worker Sandbox** | Resource Enforcement (cgroups), Filesystem Isolation, Network Policy, Seccomp Profile, Image Signature Verification |
| **Secrets** | Access Authorization, TTL Enforcement, Access Audit Logging |
| **Network** | Network Allowlist (egress), Storage Quota, DNS Restriction, Process Capability Drop |
| **Data** | Encryption at rest verification, TLS version enforcement, Key rotation scheduling |

No layer may skip a check. Any failed check results in action rejection with full audit logging.

---

## 3. Authentication

The platform supports four authentication protocols. The appropriate protocol is selected based on the actor type and use case.

### 3.1 Authentication Providers

| Provider | Protocol | Actor Type | Use Case |
|---|---|---|---|
| **OIDC Provider** (Auth0, Okta, Keycloak) | OpenID Connect | Human users | Human user login, session management, identity federation |
| **OAuth 2.0** | OAuth 2.0 (Authorization Code + PKCE) | Service accounts, tools | Service-to-service authentication, tool authorization, API access |
| **Passkeys** (WebAuthn/FIDO2) | FIDO2/WebAuthn | Human users | Passwordless authentication, phishing-resistant MFA |
| **mTLS** | X.509 Mutual TLS | Internal services | Service mesh authentication, component-to-component communication |

### 3.2 Token Format

All authenticated sessions use JWTs with claims including: `sub`, `iss`, `aud`, `exp`, `iat`, `jti`, `scope`, `actor_type`, `tenant_id`, `project_id`.

### 3.3 Token Lifecycle

| Token Type | TTL | Rotation | Storage |
|---|---|---|---|
| **Session Token** (human) | 24 hours | On refresh (sliding window) | Secure HTTP-only cookie or memory |
| **Worker Auth Token** | 1 hour | On expiry (renewal) | Memory only; never on disk |
| **Service Account Token** | 30 days | Manual rotation | Vault / Secrets Manager |
| **Tool OAuth Token** | Provider-defined | Per OAuth refresh flow | Vault (encrypted) |

### 3.4 Multi-Factor Authentication (MFA)

MFA is **required** for: secret access (read/list/rotate), policy changes (create/update/deprecate), user role assignment changes, cross-tenant operations, and production deployment approval. MFA methods: Passkeys (primary), TOTP (fallback), hardware security key (FIDO2).

---

## 4. Authorization

Authorization is enforced by the Governance Services component. See [GOVERNANCE.md](GOVERNANCE.md) for the complete authorization framework, including:

- Role-Based Access Control (RBAC) with role definitions
- Permission structure with URN schema
- Deny-by-default with explicit deny override
- Scope hierarchy: global > tenant > project > workspace > task
- Task-scoped permission duration (revoked on task completion)

### 4.1 Authorization Flow

```
Actor → PEP (intercept action) → PDP (evaluate policy) → PIP (fetch context)
         ↓
    Decision: allow | deny | pending-approval
```

All authorization decisions are logged to the audit trail with full context.

---

## 5. Secret Management

Secrets are managed exclusively through external secret stores. Secrets are **never** stored in source code, configuration files, environment files, or worker context.

### 5.1 Secret Providers

| Provider | Use Case | Integration |
|---|---|---|
| **HashiCorp Vault** | Primary secret store. API keys, database credentials, TLS certificates, service account tokens. | Vault Agent sidecar or API (token-auth or kubernetes-auth) |
| **AWS Secrets Manager** | AWS-native secret storage with automatic rotation. RDS credentials, AWS API keys. | IAM role-based access, automatic rotation schedules |
| **Doppler** | Developer-local secret synchronization. Local development, preview environments. | Doppler CLI or API, environment-specific configs |
| **Environment Variables** | Local development ONLY. Never in staging or production. | `.env` files (`.gitignore`d, never committed) |

### 5.2 Secret Reference Format

Secrets are referenced by URN — never inlined in code, config, or context:

```
urn:uwp:{tenant}:secret:{secret-name}
```

Example: `urn:uwp:acme:secret:github-token`

### 5.3 Secret Access Protocol

1. Worker requests secret access via Governance API (`POST /governance/v1/secrets/access`) with `task_id`, `worker_id`, `secret_urn`, `access_type`, and `justification`
2. Governance validates worker authorization, task scope, and justification
3. On approval, Governance returns a short-lived, wrapped credential with a TTL (default: 300 seconds)
4. Worker uses credential for the TTL duration only
5. Credential expires automatically; no cleanup required
6. All access attempts (granted and denied) are audit-logged

### 5.4 Secret Constraints

- Secret values are **never logged**. Audit entries reference the secret URN only.
- Secret values are **never stored in worker context, workspace filesystem, or task memory**.
- Workers receive only **short-lived, wrapped tokens** with TTL ≤ task duration + 60s grace.
- All environment variable injection at deploy time uses encrypted channels.
- Secret access during local development uses Doppler or `.env` files (`.gitignore`d).

---

## 6. Container Image Integrity

All container images used by workers must pass integrity verification before execution.

### 6.1 Image Signing

- Worker images **MUST** be signed using Cosign or Notary.
- Signatures are stored in the OCI registry alongside the image.
- Image registry **MUST** enforce signature verification before allowing image pull.

### 6.2 Image Verification Flow

1. Task requires a workspace with a specific container image
2. Orchestrator requests image pull from container runtime
3. Container runtime verifies: signature is valid and trusted, signer identity matches, digest matches signature
4. If verification fails: image pull is REJECTED, task transitions to FAILED
5. If verification passes: image digest (SHA256) is recorded in audit log
6. Worker container starts from verified image

### 6.3 Image Requirements

| Requirement | Enforcement |
|---|---|
| Signed image (Cosign/Notary) | Registry admission — blocked if unsigned |
| Allowlisted base image registry | Policy check — blocked if from untrusted registry |
| Minimal base image (distroless preferred) | Best practice; flagged in security scan |
| No `latest` tag in production | CI gate — blocked at deploy |
| Pinned to SHA256 digest in production | CI gate — blocked at deploy |
| Vulnerability scan passed (Trivy/Grype) | CI gate — blocked if CRITICAL CVEs |

---

## 7. Worker Sandbox Isolation

Every worker executes inside an isolated sandbox. See [WORKER_GUIDE.md](WORKER_GUIDE.md) for workspace lifecycle details.

### 7.1 Sandbox Requirements

| Requirement | Implementation |
|---|---|
| Process isolation | Container namespaces (PID, UTS, mount, IPC, cgroup) |
| Filesystem isolation | Read-only rootfs; writable `/workspace/tmp/` (tmpfs); artifacts extracted from `/workspace/artifacts/` only |
| Network isolation | Private network namespace; bridge network with egress allowlist only |
| Capability restriction | Drop ALL capabilities; add only explicitly required |
| System call filtering | Seccomp profile (allowlist); default: deny dangerous syscalls |
| Resource limits | cgroups v2: CPU, memory, I/O, PID limits enforced |
| Privilege restriction | No privileged containers; no host PID/network/IPC access |
| Device restriction | No host device access; /dev limited to null, zero, random, urandom |

### 7.2 Workspace Credential Isolation

- **No platform credentials** in workspace filesystems (auth tokens, API keys).
- **No secret values** written to workspace disk. Secrets exist only as short-lived environment variables.
- **No worker auth tokens** in workspace. Worker auth token is held in platform runtime memory only.
- Workspace environment variables are injected at container start and **never persisted**.

---

## 8. Network Security

### 8.1 Network Architecture

```
Internet
    │
    ▼
EXTERNAL LOAD BALANCER / REVERSE PROXY
  - TLS termination (TLS 1.3)
  - DDoS protection
  - WAF (Web Application Firewall)
    │
    ▼
API GATEWAY (AuthN + Rate Limiting)
    │
    ▼
INTERNAL SERVICE MESH (mTLS)
    │
    ▼
WORKER NETWORK (isolated bridge network)
  - Each worker: isolated network namespace
  - Egress: allowlist ONLY
  - Inter-worker: DENY by default
  - DNS: internal resolver only
```

### 8.2 Egress Policy

Workers have **no unrestricted internet access**. Egress is controlled by an explicit allowlist:

| Destination | Protocol | Port | Purpose |
|---|---|---|---|
| Platform API | HTTPS | 443 | Governance checks, context read/write, progress reporting |
| Tool endpoints (registry-approved) | HTTPS / gRPC | Varies | Approved tool invocations |
| Package registries (allowlisted) | HTTPS | 443 | Dependency installation (PyPI, npm, crates.io — per project config) |
| Internal DNS | UDP/TCP | 53 | Service discovery |

All other egress is **denied by default**.

### 8.3 Transport Security

| Communication Path | Protocol | Minimum Version |
|---|---|---|
| External client → Gateway | TLS | 1.3 |
| Gateway → Internal Services | mTLS | 1.3 |
| Worker → Platform API | mTLS | 1.3 |
| Worker → External Tools | TLS | 1.3 |
| Platform → Database (PostgreSQL) | TLS | 1.3 |
| Platform → Cache (Redis) | TLS | 1.3 |

---

## 9. Data Encryption

### 9.1 Encryption States

| State | Algorithm | Key Management |
|---|---|---|
| **In-Transit** | TLS 1.3 (AES-256-GCM or ChaCha20-Poly1305) | Automated certificate rotation (cert-manager or ACM) |
| **At-Rest — Storage** | AES-256-GCM | KMS-managed keys (AWS KMS, Vault Transit) |
| **At-Rest — Database** | AES-256 (PostgreSQL TDE or filesystem-level LUKS) | KMS-managed per-tenant keys |
| **At-Rest — Artifacts** | AES-256-GCM (server-side encryption) | Per-bucket KMS keys |
| **At-Rest — Audit Logs** | AES-256-GCM | Separate KMS key for audit immutability |
| **At-Rest — Backups** | AES-256-GCM | KMS-managed backup keys |
| **Memory Contexts** | AES-256-GCM | Ephemeral per-session keys (not persisted) |

### 9.2 Key Management

- All encryption keys are managed by a Key Management Service (Vault Transit, AWS KMS, or equivalent).
- Keys are **never** hardcoded, committed to the repository, or stored alongside encrypted data.
- Key rotation is automated: TLS certificates (90-day), database encryption keys (annual), artifact keys (per-environment on deploy).
- Key compromise procedure: immediate rotation, audit trail review, incident response triggered.

---

## 10. Audit & Monitoring

### 10.1 Security Event Categories

| Event Category | Examples | Retention |
|---|---|---|
| **Authentication** | Login success/failure, token issuance, token expiration, MFA events | 7 years |
| **Authorization** | Permission check (allow/deny), policy evaluation results | 7 years |
| **Secret Access** | Secret read, list, rotate, create, delete (URN only, never value) | 7 years |
| **Policy Change** | Policy create, update, deprecate | Permanent |
| **Configuration** | Component config changes, environment variable changes | 3 years |
| **Task Lifecycle** | Task state transitions, worker assignment, workspace create/destroy | 3 years |
| **Resource** | Resource allocation, deallocation, quota exceedance | 3 years |
| **Tool Invocation** | Tool name, input hash, output hash, duration, exit code | 3 years |

### 10.2 Security Monitoring

- **Real-time alerts** on: authentication failures (3+ in 5 min), denied authorization attempts, secret access by unknown actors, policy changes, CRITICAL CVE detection.
- **Dashboards**: auth success/failure rates, tool invocation patterns, resource utilization anomalies, secret access frequency.
- **SIEM integration**: audit logs exportable to external SIEM via structured streaming (Kafka) or batch (S3 export).

---

## 11. Threat Model

### 11.1 Threat Actors

| Actor | Capability | Mitigation |
|---|---|---|
| **Malicious worker** | Attempts unauthorized actions, data exfiltration, resource abuse | Sandbox isolation, tool allowlist, egress allowlist, resource quotas, audit logging |
| **Compromised tool** | Returns malicious data, exfiltrates context | Input/output hashing, tool sandboxing, response validation, tool capability scoping |
| **External attacker** | Attempts to access platform API | Gateway auth, rate limiting, TLS, WAF, IP allowlist |
| **Insider (developer)** | Accidental or intentional misconfiguration | RBAC, approval gates, audit logging, policy-as-code |
| **Supply chain** | Compromised base image or dependency | Image signing, vulnerability scanning, SBOM, dependency pinning |

### 11.2 Incident Response

1. **Detection**: Automated alert or manual report
2. **Containment**: Suspend affected workers, revoke tokens, isolate network segments
3. **Investigation**: Query audit logs, review tool invocation history, inspect artifacts
4. **Remediation**: Patch vulnerability, rotate secrets, update policies
5. **Post-Incident**: Update threat model, improve detection rules, share findings

---

## 12. Security Scan Pipeline

Integrated into CI/CD (`.github/workflows/security-audit.yml`):

| Scan | Tool | Frequency | Action on Failure |
|---|---|---|---|
| **Dependency audit** | `npm audit`, `pip-audit`, `cargo-audit` | Every PR, weekly schedule | Advisory (report) |
| **SAST (Static Analysis)** | Semgrep, CodeQL | Every PR | Blocks if HIGH/CRITICAL |
| **Container vulnerability** | Trivy, Grype | Every image build | Blocks if CRITICAL CVEs |
| **Secret detection** | Gitleaks, truffleHog | Every PR, pre-commit | Blocks |
| **IaC scanning** | Checkov, tfsec | Every PR touching `infra/` | Blocks if HIGH/CRITICAL |
| **License compliance** | FOSSA, license-checker | Weekly schedule | Advisory (report) |

---

## 13. Compliance Framework Alignment

The security architecture aligns with the following frameworks:

| Framework | Relevant Controls |
|---|---|
| **SOC 2** | Access control, audit logging, encryption, incident response, change management |
| **ISO 27001** | A.9 (Access Control), A.10 (Cryptography), A.12 (Operations Security), A.16 (Incident Management) |
| **NIST 800-53** | AC (Access Control), AU (Audit), SC (System & Communications Protection), SI (System & Information Integrity) |
| **OWASP Top 10** | Broken Access Control, Cryptographic Failures, Injection, Security Misconfiguration |

---

## 14. Security Contract Compliance

Any implementation claiming to implement this security architecture MUST:

1. Enforce TLS 1.3 minimum for all external and internal communication.
2. Never persist secret values or credentials to workspace filesystems.
3. Verify container image signatures before worker execution.
4. Run every worker in an isolated sandbox (container, VM, or pod) with seccomp and no privileged mode.
5. Enforce egress allowlist — no unrestricted internet access from workers.
6. Encrypt all data at rest with AES-256-GCM and KMS-managed keys.
7. Log all security-relevant events to an append-only, tamper-evident audit trail.
8. Support OIDC, OAuth 2.0, and Passkeys (FIDO2) for authentication.
9. Enforce MFA for secret access, policy changes, and production deployments.
10. Rotate all TLS certificates and encryption keys on a defined schedule.

---

## Navigation

- **Up:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Related:** [GOVERNANCE.md](GOVERNANCE.md) — authorization, audit, approval framework
- **Related:** [WORKER_GUIDE.md](WORKER_GUIDE.md) — workspace isolation and sandbox lifecycle
- **Related:** [DEPLOYMENT.md](DEPLOYMENT.md) — secrets injection at deploy time
