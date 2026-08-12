# syntax=docker/dockerfile:1
#
# JoinOrigin web — multi-stage Docker build (Next.js standalone output).
#
# Build context: monorepo root (`app/` — the directory that contains
# package.json, pnpm-lock.yaml, pnpm-workspace.yaml, apps/, packages/).
#
# Stages:
#   deps    — pnpm install (frozen lockfile, filtered to @joinorigin/web)
#   builder — `next build` → emits apps/web/.next/standalone
#   runner  — minimal image: standalone server + traced node_modules,
#             static assets + public dir (Next.js does NOT copy these
#             into standalone output — we do it here).
#
# Runtime: `node apps/web/server.js` from /app (server.js chdirs to its own
# dir, so `process.cwd()` inside the container is /app/apps/web).

# ---------- deps: install workspace deps with pnpm ----------
FROM node:22-slim AS deps
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN npm install -g pnpm@10.30.3

# Copy only the manifests first so the pnpm layer can be cached.
# `.npmrc` pins `node-linker=hoisted` (flat node_modules) — it MUST be copied
# so pnpm produces the same layout as the host (a different linker here would
# split styled-components into two instances and break the ThemeProvider
# context during prerender).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json
COPY apps/mobile/package.json apps/mobile/package.json
COPY packages/design/package.json packages/design/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY tests/e2e/package.json tests/e2e/package.json

# Install only what @joinorigin/web needs (itself + design/ui workspace deps).
# --frozen-lockfile guarantees the committed pnpm-lock.yaml is honored.
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --filter @joinorigin/web...

# ---------- builder: compile the web app ----------
FROM node:22-slim AS builder
WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@10.30.3

# Reuse the deps node_modules (workspace symlinks included) to avoid a
# second full install, then bring in the full source tree.
# COPY --from=deps copies the entire deps filesystem — the filtered pnpm
# install creates node_modules under the root AND under each workspace
# package (@joinorigin/design, @joinorigin/ui) that the web build resolves.
COPY --from=deps /app/ ./
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time.
# They can be overridden with `docker build --build-arg ...`.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3100
ARG NEXT_PUBLIC_SITE_DOMAIN=joinorigin.com
ARG NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://analytics.joinorigin.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_DOMAIN=$NEXT_PUBLIC_SITE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_API_HOST=$NEXT_PUBLIC_PLAUSIBLE_API_HOST

RUN pnpm --filter @joinorigin/web build

# ---------- runner: minimal standalone runtime ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3100
ENV HOSTNAME=0.0.0.0

# Run as a non-root user (same gid/uid convention as the Next.js docs).
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone server + traced node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# Client-side static chunks (not included in standalone output).
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
# Public assets (favicon set, fonts, og images, partner logos).
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Writable waitlist CSV dir — the /api/leads route appends rows here.
RUN mkdir -p /app/apps/web/data && chown nextjs:nodejs /app/apps/web/data

USER nextjs
EXPOSE 3100

CMD ["node", "apps/web/server.js"]
